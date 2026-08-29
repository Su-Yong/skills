#!/usr/bin/env python3
"""Validate feature-planner v7 living spec pairs and inspect implementation slices.

Commands:
  validate <english-spec>
  status <english-spec>
  review-ready <english-spec>
  ready <english-spec>
  check-scope <english-spec> <WSx> --changed <path> [<path> ...]
  check-patch <english-spec> <WSx> --changed <path> [<path> ...]
      [--new <path> ...] --production-added-lines <n>
      [--dependency <name>] [--shared-abstraction <name>]

The parser expects the exact technical tables from assets/spec-template.md.
Only the Python standard library is required.
"""

from __future__ import annotations

import argparse
import fnmatch
import json
import re
from dataclasses import dataclass
from pathlib import Path, PurePosixPath
from typing import Sequence

CONTROL_RE = re.compile(r"<!--\s*feature-planner-control\s*(\{.*?\})\s*-->", re.DOTALL)
FENCED_CODE_RE = re.compile(r"```.*?```", re.DOTALL)
INLINE_CODE_RE = re.compile(r"`[^`\n]*`")
BASIC_PLACEHOLDER_RE = re.compile(
    r"\b(?:TBD|TODO|TO BE DECIDED|PLACEHOLDER)\b|\bhandle appropriately\b|\bas needed\b",
    re.IGNORECASE,
)
ANGLE_RE = re.compile(r"<([^>\n]+)>")
ALLOWED_HTML_RE = re.compile(
    r"^/?(?:br|details|summary|code|pre|kbd|sub|sup|em|strong)(?:\s+[^>]*)?/?$",
    re.IGNORECASE,
)
HANGUL_RE = re.compile(r"[\uac00-\ud7a3]")
NUMBERED_H2_RE = re.compile(r"^##\s+(\d+)\.", re.MULTILINE)
WINDOWS_ABSOLUTE_RE = re.compile(r"^[A-Za-z]:[/\\]")
ISO_TIMESTAMP_RE = re.compile(
    r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$"
)

DECISION_ID_RE = re.compile(r"^D-\d{3}$")
QUESTION_ID_RE = re.compile(r"^Q-\d{3}$")
DECISION_ID_TOKEN_RE = re.compile(r"(?<![A-Z0-9-])D-\d{3}(?!\d)")
QUESTION_ID_TOKEN_RE = re.compile(r"(?<![A-Z0-9-])Q-\d{3}(?!\d)")
REUSE_ID_RE = re.compile(r"^R-\d{3}$")
STRATEGY_ID_RE = re.compile(r"^STRAT-\d+$")
STRATEGY_HEADING_RE = re.compile(r"^###\s+(STRAT-\d+)\b", re.MULTILINE)
CHANGE_ID_RE = re.compile(r"^CH-\d{3}$")
SLICE_ID_RE = re.compile(r"^WS\d+$")
REQUIREMENT_ID_RE = re.compile(r"(?<![A-Z0-9-])(?:FR|NFR|AC)-\d{3}(?!\d)")
REQUIREMENT_DEF_RE = re.compile(
    r"^\s*[-*]\s+\*\*((?:FR|NFR|AC)-\d{3})\s*:\*\*\s*(\S.*)$",
    re.MULTILINE,
)
GENERIC_ID_RE = re.compile(r"(?<![A-Z0-9-])(?:D|Q)-\d{3}(?!\d)")

ALLOWED_STATES = {"refining", "ready", "implementing", "blocked", "complete"}
ALLOWED_NEXT = {
    "answer_questions",
    "review_final_draft",
    "await_implementation_request",
    "implement",
    "targeted_refinement",
    "none",
}
ALLOWED_GATE = {"not_ready", "required", "confirmed_none"}
ALLOWED_IMPLEMENTATION_DIRECTION = {"preserve", "user-approved-divergence"}
ALLOWED_SLICE_STATUS = {"pending", "in_progress", "verified", "blocked", "skipped"}
ALLOWED_DECISION_SOURCE = {"user", "repository", "agent"}
ALLOWED_DECISION_REVIEW = {"confirmed", "not-required", "review-needed", "overridden"}
ALLOWED_DECISION_STATUS = {"open", "resolved", "superseded"}
ALLOWED_QUESTION_STATUS = {"open", "answered", "withdrawn"}
ALLOWED_CHANGE_KIND = {"production", "test", "config", "migration", "generated", "docs"}
ALLOWED_CHANGE_ACTION = {"reuse", "extend", "edit", "add", "remove"}
ALLOWED_CHANGE_DIRECTION = {"preserve", "approved-divergence"}
NONE_VALUES = {"", "none", "-", "—", "n/a"}

SNAPSHOT_COLUMNS = ["Review item", "Current value"]
SNAPSHOT_REQUIRED_ITEMS = [
    "Lifecycle",
    "Outcome",
    "Recommended implementation",
    "Planned production targets",
    "Expected additions",
    "Work plan",
    "Open questions",
    "Agent decisions to review",
    "Last material change",
]
PATTERN_COLUMNS = ["Area", "Current pattern", "Evidence", "Must preserve"]
REUSE_COLUMNS = ["ID", "Existing asset", "Evidence", "Planned use"]
DECISION_COLUMNS = [
    "ID",
    "Domain",
    "Decision",
    "Source",
    "Rationale or Evidence",
    "Impact",
    "User review",
    "Status",
]
QUESTION_COLUMNS = [
    "ID",
    "Domain",
    "Decision needed",
    "Why it matters",
    "Recommendation",
    "Linked decision",
    "Status",
    "Resolution",
]
CHANGE_COLUMNS = [
    "ID",
    "Kind",
    "Target",
    "Symbol",
    "Action",
    "Existing anchor",
    "Required change",
    "Why necessary",
    "Slice",
    "Direction",
]
BUDGET_COLUMNS = [
    "Slice",
    "Max changed files",
    "Max production files",
    "Max new production files",
    "Max production added lines",
    "New dependencies",
    "New shared abstractions",
]
WORK_COLUMNS = [
    "ID",
    "Goal",
    "Depends on",
    "Parallel group",
    "Change IDs",
    "Write scope",
    "Do not touch",
    "Covers",
    "Validation",
    "Status",
]
REVISION_COLUMNS = ["Revision", "Timestamp", "Trigger", "Changes", "Decision IDs", "Question IDs"]
REQUIRED_HEADINGS = [
    "## 1. Review Snapshot",
    "## 2. Outcome and Scope",
    "## 3. Repository Pattern Baseline",
    "## 4. Decisions and Questions",
    "## 5. Requirements and Acceptance Criteria",
    "## 6. Implementation Strategy and Direction",
    "## 7. Modification Map and Change Budget",
    "## 8. Work Plan",
    "## 9. Validation, Rollout, and Risk",
    "## 10. Revision and Progress",
]


@dataclass(frozen=True)
class PatternRow:
    area: str
    current_pattern: str
    evidence: str
    must_preserve: str


@dataclass(frozen=True)
class ReuseItem:
    id: str
    existing_asset: str
    evidence: str
    planned_use: str


@dataclass(frozen=True)
class Decision:
    id: str
    domain: str
    decision: str
    source: str
    rationale: str
    impact: str
    user_review: str
    status: str


@dataclass(frozen=True)
class Question:
    id: str
    domain: str
    decision_needed: str
    why_it_matters: str
    recommendation: str
    linked_decision: str | None
    status: str
    resolution: str


@dataclass(frozen=True)
class Change:
    id: str
    kind: str
    target: str
    symbol: str
    action: str
    existing_anchor: str
    required_change: str
    why_necessary: str
    slice_id: str
    direction: str


@dataclass(frozen=True)
class Budget:
    slice_id: str
    max_changed_files: int | None
    max_production_files: int | None
    max_new_production_files: int | None
    max_production_added_lines: int | None
    new_dependencies: tuple[str, ...]
    new_shared_abstractions: tuple[str, ...]


@dataclass(frozen=True)
class Slice:
    id: str
    goal: str
    depends_on: tuple[str, ...]
    parallel_group: str
    change_ids: tuple[str, ...]
    write_scope: tuple[str, ...]
    do_not_touch: tuple[str, ...]
    covers: tuple[str, ...]
    validation: str
    status: str


@dataclass(frozen=True)
class Revision:
    revision: int | None
    timestamp: str
    trigger: str
    changes: str
    decision_ids: tuple[str, ...]
    question_ids: tuple[str, ...]


@dataclass
class SpecData:
    path: Path
    text: str
    control: dict[str, object]
    snapshot: dict[str, str]
    patterns: list[PatternRow]
    reuse_items: list[ReuseItem]
    decisions: list[Decision]
    questions: list[Question]
    requirements: dict[str, str]
    strategies: set[str]
    changes: list[Change]
    budgets: list[Budget]
    slices: list[Slice]
    revisions: list[Revision]


def empty_spec(path: Path) -> SpecData:
    return SpecData(path, "", {}, {}, [], [], [], [], {}, set(), [], [], [], [])


def clean_cell(value: str) -> str:
    value = value.strip().replace(r"\|", "|")
    if len(value) >= 2 and value.startswith("`") and value.endswith("`"):
        value = value[1:-1]
    return value.strip()


def split_values(value: str) -> tuple[str, ...]:
    if clean_cell(value).lower() in NONE_VALUES:
        return ()
    parts = re.split(r"\s*(?:,|;|<br\s*/?>)\s*", value, flags=re.IGNORECASE)
    return tuple(clean_cell(part) for part in parts if clean_cell(part))


def parse_nonnegative_int(value: str, errors: list[str], label: str) -> int | None:
    cleaned = clean_cell(value)
    try:
        parsed = int(cleaned)
    except ValueError:
        errors.append(f"{label}: expected a non-negative integer, found {cleaned!r}")
        return None
    if parsed < 0:
        errors.append(f"{label}: expected a non-negative integer, found {parsed}")
        return None
    return parsed


def parse_positive_int(value: str, errors: list[str], label: str) -> int | None:
    parsed = parse_nonnegative_int(value, errors, label)
    if parsed is not None and parsed < 1:
        errors.append(f"{label}: expected an integer >= 1, found {parsed}")
        return None
    return parsed


def parse_markdown_row(line: str) -> list[str]:
    stripped = line.strip()
    if not stripped.startswith("|") or not stripped.endswith("|"):
        return []
    cells = re.split(r"(?<!\\)\|", stripped[1:-1])
    return [cell.strip().replace(r"\|", "|") for cell in cells]


def is_separator_row(cells: Sequence[str]) -> bool:
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell.replace(" ", "")) for cell in cells)


def parse_table(
    text: str,
    columns: list[str],
    errors: list[str],
    label: str,
    table_name: str,
) -> list[dict[str, str]]:
    lines = text.splitlines()
    header_index: int | None = None
    for index, line in enumerate(lines):
        if parse_markdown_row(line) == columns:
            header_index = index
            break
    if header_index is None:
        errors.append(f"{label}: missing {table_name} table with exact technical columns")
        return []
    if header_index + 1 >= len(lines) or not is_separator_row(parse_markdown_row(lines[header_index + 1])):
        errors.append(f"{label}: {table_name} table is missing a separator row")
        return []

    rows: list[dict[str, str]] = []
    for line in lines[header_index + 2 :]:
        stripped = line.strip()
        if stripped.startswith("##") or stripped.startswith("###"):
            break
        cells = parse_markdown_row(line)
        if not cells:
            if rows:
                break
            continue
        if len(cells) != len(columns):
            errors.append(f"{label}: malformed {table_name} row: {stripped}")
            continue
        rows.append(dict(zip(columns, cells)))
    if not rows:
        errors.append(f"{label}: {table_name} table must contain at least one row")
    return rows


def parse_control(text: str, errors: list[str], label: str) -> dict[str, object]:
    matches = CONTROL_RE.findall(text)
    if not matches:
        errors.append(f"{label}: missing feature-planner-control block")
        return {}
    if len(matches) > 1:
        errors.append(f"{label}: expected one feature-planner-control block, found {len(matches)}")
    try:
        value = json.loads(matches[0])
    except json.JSONDecodeError as exc:
        errors.append(f"{label}: invalid control JSON: {exc}")
        return {}
    if not isinstance(value, dict):
        errors.append(f"{label}: control block must be a JSON object")
        return {}
    return value


def parse_snapshot(text: str, errors: list[str], label: str) -> dict[str, str]:
    rows = parse_table(text, SNAPSHOT_COLUMNS, errors, label, "Review Snapshot")
    result: dict[str, str] = {}
    for row in rows:
        key = clean_cell(row["Review item"])
        value = clean_cell(row["Current value"])
        if key in result:
            errors.append(f"{label}: duplicate Review Snapshot item {key!r}")
        result[key] = value
    return result


def parse_patterns(text: str, errors: list[str], label: str) -> list[PatternRow]:
    rows = parse_table(text, PATTERN_COLUMNS, errors, label, "Current Pattern")
    return [
        PatternRow(
            area=clean_cell(row["Area"]),
            current_pattern=clean_cell(row["Current pattern"]),
            evidence=clean_cell(row["Evidence"]),
            must_preserve=clean_cell(row["Must preserve"]),
        )
        for row in rows
    ]


def parse_reuse_items(text: str, errors: list[str], label: str) -> list[ReuseItem]:
    rows = parse_table(text, REUSE_COLUMNS, errors, label, "Reuse Inventory")
    return [
        ReuseItem(
            id=clean_cell(row["ID"]).upper(),
            existing_asset=clean_cell(row["Existing asset"]),
            evidence=clean_cell(row["Evidence"]),
            planned_use=clean_cell(row["Planned use"]),
        )
        for row in rows
    ]


def parse_decisions(text: str, errors: list[str], label: str) -> list[Decision]:
    rows = parse_table(text, DECISION_COLUMNS, errors, label, "Decision Ledger")
    return [
        Decision(
            id=clean_cell(row["ID"]).upper(),
            domain=clean_cell(row["Domain"]),
            decision=clean_cell(row["Decision"]),
            source=clean_cell(row["Source"]).lower(),
            rationale=clean_cell(row["Rationale or Evidence"]),
            impact=clean_cell(row["Impact"]),
            user_review=clean_cell(row["User review"]).lower(),
            status=clean_cell(row["Status"]).lower(),
        )
        for row in rows
    ]


def parse_questions(text: str, errors: list[str], label: str) -> list[Question]:
    rows = parse_table(text, QUESTION_COLUMNS, errors, label, "Question Register")
    questions: list[Question] = []
    for row in rows:
        linked_raw = clean_cell(row["Linked decision"])
        linked = None if linked_raw.lower() in NONE_VALUES else linked_raw.upper()
        questions.append(
            Question(
                id=clean_cell(row["ID"]).upper(),
                domain=clean_cell(row["Domain"]),
                decision_needed=clean_cell(row["Decision needed"]),
                why_it_matters=clean_cell(row["Why it matters"]),
                recommendation=clean_cell(row["Recommendation"]),
                linked_decision=linked,
                status=clean_cell(row["Status"]).lower(),
                resolution=clean_cell(row["Resolution"]),
            )
        )
    return questions


def parse_requirements(text: str, errors: list[str], label: str) -> dict[str, str]:
    requirements: dict[str, str] = {}
    for match in REQUIREMENT_DEF_RE.finditer(text):
        req_id = match.group(1)
        description = match.group(2).strip()
        if req_id in requirements:
            errors.append(f"{label}: duplicate requirement definition {req_id}")
        elif not description:
            errors.append(f"{label}: empty requirement definition {req_id}")
        else:
            requirements[req_id] = description
    if not any(item.startswith("FR-") for item in requirements):
        errors.append(f"{label}: define at least one FR- requirement using the required syntax")
    if not any(item.startswith("AC-") for item in requirements):
        errors.append(f"{label}: define at least one AC- acceptance criterion using the required syntax")
    return requirements


def normalize_pattern(pattern: str) -> str:
    value = clean_cell(pattern).replace("\\", "/")
    while value.startswith("./"):
        value = value[2:]
    return str(PurePosixPath(value)) if value else value


def parse_changes(text: str, errors: list[str], label: str) -> list[Change]:
    rows = parse_table(text, CHANGE_COLUMNS, errors, label, "Modification Map")
    return [
        Change(
            id=clean_cell(row["ID"]).upper(),
            kind=clean_cell(row["Kind"]).lower(),
            target=normalize_pattern(row["Target"]),
            symbol=clean_cell(row["Symbol"]),
            action=clean_cell(row["Action"]).lower(),
            existing_anchor=clean_cell(row["Existing anchor"]),
            required_change=clean_cell(row["Required change"]),
            why_necessary=clean_cell(row["Why necessary"]),
            slice_id=clean_cell(row["Slice"]).upper(),
            direction=clean_cell(row["Direction"]).lower(),
        )
        for row in rows
    ]


def parse_budgets(text: str, errors: list[str], label: str) -> list[Budget]:
    rows = parse_table(text, BUDGET_COLUMNS, errors, label, "Change Budget")
    budgets: list[Budget] = []
    for row in rows:
        slice_id = clean_cell(row["Slice"]).upper()
        budgets.append(
            Budget(
                slice_id=slice_id,
                max_changed_files=parse_nonnegative_int(
                    row["Max changed files"], errors, f"{label}: budget {slice_id} Max changed files"
                ),
                max_production_files=parse_nonnegative_int(
                    row["Max production files"], errors, f"{label}: budget {slice_id} Max production files"
                ),
                max_new_production_files=parse_nonnegative_int(
                    row["Max new production files"],
                    errors,
                    f"{label}: budget {slice_id} Max new production files",
                ),
                max_production_added_lines=parse_nonnegative_int(
                    row["Max production added lines"],
                    errors,
                    f"{label}: budget {slice_id} Max production added lines",
                ),
                new_dependencies=split_values(row["New dependencies"]),
                new_shared_abstractions=split_values(row["New shared abstractions"]),
            )
        )
    return budgets


def parse_slices(text: str, errors: list[str], label: str) -> list[Slice]:
    rows = parse_table(text, WORK_COLUMNS, errors, label, "Work Plan")
    slices: list[Slice] = []
    for row in rows:
        covers = tuple(dict.fromkeys(REQUIREMENT_ID_RE.findall(clean_cell(row["Covers"]))))
        slices.append(
            Slice(
                id=clean_cell(row["ID"]).upper(),
                goal=clean_cell(row["Goal"]),
                depends_on=tuple(item.upper() for item in split_values(row["Depends on"])),
                parallel_group=clean_cell(row["Parallel group"]),
                change_ids=tuple(item.upper() for item in split_values(row["Change IDs"])),
                write_scope=tuple(normalize_pattern(item) for item in split_values(row["Write scope"])),
                do_not_touch=tuple(normalize_pattern(item) for item in split_values(row["Do not touch"])),
                covers=covers,
                validation=clean_cell(row["Validation"]),
                status=clean_cell(row["Status"]).lower(),
            )
        )
    return slices


def parse_revisions(text: str, errors: list[str], label: str) -> list[Revision]:
    rows = parse_table(text, REVISION_COLUMNS, errors, label, "Design Revision History")
    revisions: list[Revision] = []
    for row in rows:
        revision = parse_positive_int(row["Revision"], errors, f"{label}: revision row")
        revisions.append(
            Revision(
                revision=revision,
                timestamp=clean_cell(row["Timestamp"]),
                trigger=clean_cell(row["Trigger"]),
                changes=clean_cell(row["Changes"]),
                decision_ids=tuple(item.upper() for item in split_values(row["Decision IDs"])),
                question_ids=tuple(item.upper() for item in split_values(row["Question IDs"])),
            )
        )
    return revisions


def load_spec(path: Path, errors: list[str], label: str) -> SpecData:
    if not path.exists():
        errors.append(f"{label}: file not found: {path}")
        return empty_spec(path)
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        errors.append(f"{label}: file is not valid UTF-8: {path}")
        return empty_spec(path)
    return SpecData(
        path=path,
        text=text,
        control=parse_control(text, errors, label),
        snapshot=parse_snapshot(text, errors, label),
        patterns=parse_patterns(text, errors, label),
        reuse_items=parse_reuse_items(text, errors, label),
        decisions=parse_decisions(text, errors, label),
        questions=parse_questions(text, errors, label),
        requirements=parse_requirements(text, errors, label),
        strategies=set(STRATEGY_HEADING_RE.findall(text)),
        changes=parse_changes(text, errors, label),
        budgets=parse_budgets(text, errors, label),
        slices=parse_slices(text, errors, label),
        revisions=parse_revisions(text, errors, label),
    )


def derived_mirror_path(source: Path) -> Path:
    if source.name.endswith(".ko.md"):
        raise ValueError("pass the English source spec, not the Korean mirror")
    if source.suffix.lower() != ".md":
        raise ValueError("the English source spec must end in .md")
    return source.with_name(f"{source.stem}.ko.md")


def unresolved_placeholders(text: str) -> list[str]:
    scrubbed = CONTROL_RE.sub("", text)
    scrubbed = FENCED_CODE_RE.sub("", scrubbed)
    scrubbed = INLINE_CODE_RE.sub("", scrubbed)
    found = {match.group(0) for match in BASIC_PLACEHOLDER_RE.finditer(scrubbed)}
    for match in ANGLE_RE.finditer(scrubbed):
        inner = match.group(1).strip()
        if inner.startswith("!--") or ALLOWED_HTML_RE.fullmatch(inner):
            continue
        found.add(match.group(0))
    return sorted(found)


def relative_path_error(value: str, *, allow_glob: bool) -> str | None:
    raw = clean_cell(value)
    normalized = raw.replace("\\", "/")
    if not normalized:
        return "is empty"
    if normalized.startswith("/") or WINDOWS_ABSOLUTE_RE.match(raw):
        return "must be repository-relative"
    parts = PurePosixPath(normalized).parts
    if ".." in parts:
        return "must not contain '..'"
    if normalized in {".", "./"}:
        return "must be more specific than the repository root"
    if not allow_glob and any(char in normalized for char in "*?"):
        return "must be an exact path without glob characters"
    return None


def declared_path_matches(actual: Path, declared: str) -> bool:
    declared_n = normalize_pattern(declared)
    actual_n = actual.as_posix()
    return actual_n == declared_n or actual_n.endswith("/" + declared_n)


def path_matches(actual: str, pattern: str) -> bool:
    actual_n = normalize_pattern(actual)
    pattern_n = normalize_pattern(pattern)
    if not any(char in pattern_n for char in "*?"):
        return actual_n == pattern_n
    if fnmatch.fnmatchcase(actual_n, pattern_n):
        return True
    if pattern_n.endswith("/**"):
        prefix = pattern_n[:-3].rstrip("/")
        return actual_n == prefix or actual_n.startswith(prefix + "/")
    return actual_n == pattern_n


def static_prefix(pattern: str) -> str:
    pattern_n = normalize_pattern(pattern)
    if not any(char in pattern_n for char in "*?"):
        return pattern_n
    wildcard_positions = [pattern_n.find(char) for char in "*?[" if char in pattern_n]
    if wildcard_positions:
        pattern_n = pattern_n[: min(wildcard_positions)]
    return pattern_n.rstrip("/")


def patterns_may_overlap(left: str, right: str) -> bool:
    left_n = normalize_pattern(left)
    right_n = normalize_pattern(right)
    if path_matches(left_n, right_n) or path_matches(right_n, left_n):
        return True
    left_prefix = static_prefix(left_n)
    right_prefix = static_prefix(right_n)
    if not left_prefix or not right_prefix:
        return True
    return (
        left_prefix == right_prefix
        or left_prefix.startswith(right_prefix + "/")
        or right_prefix.startswith(left_prefix + "/")
    )


def validate_control(
    spec: SpecData,
    errors: list[str],
    label: str,
    *,
    review_ready: bool,
) -> None:
    control = spec.control
    if not control:
        return
    required = {
        "workflow",
        "state",
        "source_spec",
        "korean_mirror",
        "spec_revision",
        "reviewed_revision",
        "selected_strategy",
        "implementation_direction",
        "direction_decision_id",
        "minimal_change_policy",
        "final_domain_gate",
        "open_question_ids",
        "active_slices",
        "next_action",
    }
    missing = sorted(required - set(control))
    if missing:
        errors.append(f"{label}: control block missing keys: {', '.join(missing)}")

    workflow = control.get("workflow")
    state = control.get("state")
    next_action = control.get("next_action")
    gate = control.get("final_domain_gate")
    direction = control.get("implementation_direction")

    if workflow != "feature-planner/v7":
        errors.append(f"{label}: workflow must be 'feature-planner/v7'")
    if state not in ALLOWED_STATES:
        errors.append(f"{label}: invalid state: {state!r}")
    if next_action not in ALLOWED_NEXT:
        errors.append(f"{label}: invalid next_action: {next_action!r}")
    if gate not in ALLOWED_GATE:
        errors.append(f"{label}: invalid final_domain_gate: {gate!r}")
    if direction not in ALLOWED_IMPLEMENTATION_DIRECTION:
        errors.append(f"{label}: invalid implementation_direction: {direction!r}")
    if control.get("minimal_change_policy") != "strict":
        errors.append(f"{label}: minimal_change_policy must be 'strict'")

    revision = control.get("spec_revision")
    if not isinstance(revision, int) or isinstance(revision, bool) or revision < 1:
        errors.append(f"{label}: spec_revision must be an integer >= 1")
        revision_value: int | None = None
    else:
        revision_value = revision

    reviewed = control.get("reviewed_revision")
    if reviewed is not None and (
        not isinstance(reviewed, int) or isinstance(reviewed, bool) or reviewed < 1
    ):
        errors.append(f"{label}: reviewed_revision must be null or an integer >= 1")
    elif isinstance(reviewed, int) and revision_value is not None and reviewed > revision_value:
        errors.append(f"{label}: reviewed_revision cannot exceed spec_revision")

    selected_strategy = control.get("selected_strategy")
    if not isinstance(selected_strategy, str) or not STRATEGY_ID_RE.fullmatch(selected_strategy):
        errors.append(f"{label}: selected_strategy must match STRAT-<number>")
    elif selected_strategy not in spec.strategies:
        errors.append(f"{label}: selected_strategy {selected_strategy!r} has no matching strategy heading")

    active = control.get("active_slices")
    if not isinstance(active, list) or not all(isinstance(item, str) for item in active):
        errors.append(f"{label}: active_slices must be a JSON array of slice IDs")
        active_ids: list[str] = []
    else:
        active_ids = [item.upper() for item in active]
        if len(active_ids) != len(set(active_ids)):
            errors.append(f"{label}: active_slices contains duplicates")
        for item in active_ids:
            if not SLICE_ID_RE.fullmatch(item):
                errors.append(f"{label}: invalid active slice ID {item!r}")

    open_questions = control.get("open_question_ids")
    if not isinstance(open_questions, list) or not all(isinstance(item, str) for item in open_questions):
        errors.append(f"{label}: open_question_ids must be a JSON array of question IDs")
        open_ids: list[str] = []
    else:
        open_ids = [item.upper() for item in open_questions]
        if len(open_ids) != len(set(open_ids)):
            errors.append(f"{label}: open_question_ids contains duplicates")
        for item in open_ids:
            if not QUESTION_ID_RE.fullmatch(item):
                errors.append(f"{label}: invalid open question ID {item!r}")

    if review_ready:
        if state != "refining":
            errors.append(f"{label}: review-ready requires state 'refining'")
        if open_ids:
            errors.append(f"{label}: review-ready requires no open_question_ids")
        if next_action != "review_final_draft" or gate != "required":
            errors.append(
                f"{label}: review-ready requires next_action 'review_final_draft' and gate 'required'"
            )
        if reviewed is not None:
            errors.append(f"{label}: review-ready requires reviewed_revision null")
        if active_ids:
            errors.append(f"{label}: review-ready requires no active_slices")
        return

    if state == "refining":
        if active_ids:
            errors.append(f"{label}: refining state requires no active_slices")
        if reviewed is not None:
            errors.append(f"{label}: refining state requires reviewed_revision null")
        if open_ids:
            if next_action != "answer_questions" or gate != "not_ready":
                errors.append(
                    f"{label}: refining with open questions requires answer_questions and gate 'not_ready'"
                )
        elif next_action != "review_final_draft" or gate != "required":
            errors.append(
                f"{label}: refining with no open questions requires review_final_draft and gate 'required'"
            )
    elif state == "ready":
        if next_action not in {"await_implementation_request", "implement"}:
            errors.append(f"{label}: ready state requires await_implementation_request or implement")
        if gate != "confirmed_none" or open_ids or active_ids:
            errors.append(
                f"{label}: ready state requires confirmed gate and no open questions or active slices"
            )
        if revision_value is not None and reviewed != revision_value:
            errors.append(f"{label}: ready state requires reviewed_revision == spec_revision")
    elif state == "implementing":
        if next_action != "implement" or gate != "confirmed_none" or open_ids:
            errors.append(
                f"{label}: implementing state requires implement, confirmed gate, and no open questions"
            )
        if revision_value is not None and reviewed != revision_value:
            errors.append(f"{label}: implementing state requires reviewed_revision == spec_revision")
    elif state == "blocked":
        if next_action != "targeted_refinement":
            errors.append(f"{label}: blocked state requires next_action targeted_refinement")
    elif state == "complete":
        if next_action != "none" or gate != "confirmed_none" or open_ids or active_ids:
            errors.append(
                f"{label}: complete state requires none, confirmed gate, and no open/active IDs"
            )
        if revision_value is not None and reviewed != revision_value:
            errors.append(f"{label}: complete state requires reviewed_revision == spec_revision")


def validate_snapshot(spec: SpecData, errors: list[str], label: str) -> None:
    snapshot = spec.snapshot
    missing = [item for item in SNAPSHOT_REQUIRED_ITEMS if item not in snapshot]
    if missing:
        errors.append(f"{label}: Review Snapshot missing items: {', '.join(missing)}")
        return
    for item in SNAPSHOT_REQUIRED_ITEMS:
        if not snapshot.get(item, "").strip():
            errors.append(f"{label}: Review Snapshot item {item!r} is empty")

    control = spec.control
    if not control:
        return
    state = str(control.get("state", ""))
    revision = control.get("spec_revision")
    lifecycle = snapshot.get("Lifecycle", "")
    if state and state not in lifecycle:
        errors.append(f"{label}: Review Snapshot Lifecycle must include state {state!r}")
    if isinstance(revision, int) and str(revision) not in lifecycle:
        errors.append(f"{label}: Review Snapshot Lifecycle must include revision {revision}")
    selected = str(control.get("selected_strategy", ""))
    if selected and selected not in snapshot.get("Recommended implementation", ""):
        errors.append(
            f"{label}: Review Snapshot Recommended implementation must include {selected}"
        )

    open_control = {
        str(item).upper()
        for item in control.get("open_question_ids", [])
        if isinstance(item, str)
    }
    open_snapshot = set(QUESTION_ID_TOKEN_RE.findall(snapshot.get("Open questions", "")))
    if open_control != open_snapshot:
        errors.append(
            f"{label}: Review Snapshot open questions {sorted(open_snapshot)} must equal control {sorted(open_control)}"
        )

    review_needed = {
        item.id
        for item in spec.decisions
        if item.status == "resolved" and item.user_review == "review-needed"
    }
    review_snapshot = set(DECISION_ID_TOKEN_RE.findall(snapshot.get("Agent decisions to review", "")))
    if review_needed != review_snapshot:
        errors.append(
            f"{label}: Review Snapshot agent decisions {sorted(review_snapshot)} must equal review-needed decisions {sorted(review_needed)}"
        )

    planned_targets = snapshot.get("Planned production targets", "")
    production_changes = [
        item for item in spec.changes if item.kind == "production" and item.action != "reuse"
    ]
    missing_targets = sorted(
        item.id
        for item in production_changes
        if item.target not in planned_targets or item.symbol not in planned_targets
    )
    if missing_targets:
        errors.append(
            f"{label}: Review Snapshot Planned production targets omits target/symbol for: "
            + ", ".join(missing_targets)
        )

    additions = snapshot.get("Expected additions", "")
    new_production = [item.target for item in production_changes if item.action == "add"]
    missing_new = sorted(path for path in new_production if path not in additions)
    if missing_new:
        errors.append(
            f"{label}: Review Snapshot Expected additions omits new production files: "
            + ", ".join(missing_new)
        )
    if not new_production and not re.search(r"(?:new production files|\uc0c8 \ud504\ub85c\ub355\uc158 \ud30c\uc77c)\s*:\s*(?:0|none)", additions, re.IGNORECASE):
        errors.append(
            f"{label}: Review Snapshot Expected additions must state zero new production files"
        )
    dependencies = sorted({name for budget in spec.budgets for name in budget.new_dependencies})
    abstractions = sorted({name for budget in spec.budgets for name in budget.new_shared_abstractions})
    for name in dependencies:
        if name not in additions:
            errors.append(f"{label}: Review Snapshot Expected additions omits dependency {name!r}")
    for name in abstractions:
        if name not in additions:
            errors.append(f"{label}: Review Snapshot Expected additions omits shared abstraction {name!r}")

    work_plan = snapshot.get("Work plan", "")
    missing_slices = sorted(item.id for item in spec.slices if item.id not in work_plan)
    if missing_slices:
        errors.append(
            f"{label}: Review Snapshot Work plan omits slice IDs: {', '.join(missing_slices)}"
        )
    if isinstance(revision, int) and str(revision) not in snapshot.get("Last material change", ""):
        errors.append(f"{label}: Last material change must identify revision {revision}")


def validate_patterns(patterns: list[PatternRow], errors: list[str], label: str) -> None:
    for index, row in enumerate(patterns, 1):
        if not all((row.area, row.current_pattern, row.evidence, row.must_preserve)):
            errors.append(f"{label}: Current Pattern row {index} has an empty field")
        if row.evidence.lower() in NONE_VALUES:
            errors.append(f"{label}: Current Pattern row {index} must cite repository evidence")


def validate_reuse_items(items: list[ReuseItem], errors: list[str], label: str) -> None:
    seen: set[str] = set()
    for item in items:
        if not REUSE_ID_RE.fullmatch(item.id):
            errors.append(f"{label}: invalid reuse ID {item.id!r}")
        if item.id in seen:
            errors.append(f"{label}: duplicate reuse ID {item.id}")
        seen.add(item.id)
        if not item.existing_asset or not item.evidence or not item.planned_use:
            errors.append(f"{label}: reuse item {item.id} has an empty field")
        if item.evidence.lower() in NONE_VALUES:
            errors.append(f"{label}: reuse item {item.id} must cite a concrete path or symbol")


def validate_decisions(
    decisions: list[Decision],
    control: dict[str, object],
    errors: list[str],
    label: str,
    *,
    review_ready: bool,
) -> None:
    seen: set[str] = set()
    for item in decisions:
        if not DECISION_ID_RE.fullmatch(item.id):
            errors.append(f"{label}: invalid decision ID {item.id!r}")
        if item.id in seen:
            errors.append(f"{label}: duplicate decision ID {item.id}")
        seen.add(item.id)
        if item.source not in ALLOWED_DECISION_SOURCE:
            errors.append(f"{label}: decision {item.id} has invalid source {item.source!r}")
        if item.user_review not in ALLOWED_DECISION_REVIEW:
            errors.append(
                f"{label}: decision {item.id} has invalid User review {item.user_review!r}"
            )
        if item.status not in ALLOWED_DECISION_STATUS:
            errors.append(f"{label}: decision {item.id} has invalid status {item.status!r}")
        if not all((item.domain, item.decision, item.rationale, item.impact)):
            errors.append(f"{label}: decision {item.id} has an empty material field")

        if item.status == "superseded":
            if item.user_review != "overridden":
                errors.append(
                    f"{label}: superseded decision {item.id} requires User review 'overridden'"
                )
            continue
        if item.user_review == "overridden":
            errors.append(
                f"{label}: non-superseded decision {item.id} cannot use User review 'overridden'"
            )
        if item.source == "repository" and (
            item.status != "resolved" or item.user_review != "not-required"
        ):
            errors.append(
                f"{label}: repository decision {item.id} must be resolved with User review 'not-required'"
            )
        if item.source == "user" and item.status == "resolved" and item.user_review != "confirmed":
            errors.append(
                f"{label}: resolved user decision {item.id} requires User review 'confirmed'"
            )
        if item.source == "agent" and item.status == "resolved" and item.user_review not in {
            "review-needed",
            "confirmed",
        }:
            errors.append(
                f"{label}: resolved agent decision {item.id} requires review-needed or confirmed"
            )
        if item.user_review == "review-needed" and item.source != "agent":
            errors.append(
                f"{label}: only agent decisions may use User review 'review-needed' ({item.id})"
            )

    state = control.get("state") if control else None
    if review_ready or state in {"ready", "implementing", "complete"}:
        open_items = [item.id for item in decisions if item.status == "open"]
        if open_items:
            errors.append(f"{label}: review/final state contains open decisions: {', '.join(open_items)}")
    if state in {"ready", "implementing", "complete"}:
        pending_review = [
            item.id
            for item in decisions
            if item.status == "resolved" and item.user_review == "review-needed"
        ]
        if pending_review:
            errors.append(
                f"{label}: reviewed state contains agent decisions still needing review: {', '.join(pending_review)}"
            )


def validate_questions(
    questions: list[Question],
    decisions: list[Decision],
    control: dict[str, object],
    errors: list[str],
    label: str,
    *,
    review_ready: bool,
) -> None:
    seen: set[str] = set()
    decision_map = {item.id: item for item in decisions}
    open_rows: set[str] = set()
    for item in questions:
        if not QUESTION_ID_RE.fullmatch(item.id):
            errors.append(f"{label}: invalid question ID {item.id!r}")
        if item.id in seen:
            errors.append(f"{label}: duplicate question ID {item.id}")
        seen.add(item.id)
        if item.status not in ALLOWED_QUESTION_STATUS:
            errors.append(f"{label}: question {item.id} has invalid status {item.status!r}")
        if not all(
            (
                item.domain,
                item.decision_needed,
                item.why_it_matters,
                item.recommendation,
                item.resolution,
            )
        ):
            errors.append(f"{label}: question {item.id} has an empty material field")
        if item.status == "open":
            open_rows.add(item.id)
            if item.linked_decision is not None:
                errors.append(f"{label}: open question {item.id} must have Linked decision None")
        elif item.status == "answered":
            if item.linked_decision is None:
                errors.append(f"{label}: answered question {item.id} must link a decision")
            else:
                decision = decision_map.get(item.linked_decision)
                if decision is None:
                    errors.append(
                        f"{label}: question {item.id} links undefined decision {item.linked_decision}"
                    )
                elif decision.status != "resolved":
                    errors.append(
                        f"{label}: answered question {item.id} must link a resolved decision"
                    )
        elif item.status == "withdrawn" and item.resolution.lower() in NONE_VALUES:
            errors.append(f"{label}: withdrawn question {item.id} must explain the withdrawal")

    control_open = {
        str(item).upper()
        for item in control.get("open_question_ids", [])
        if isinstance(item, str)
    } if control else set()
    if open_rows != control_open:
        errors.append(
            f"{label}: open Question Register rows {sorted(open_rows)} must equal control open_question_ids {sorted(control_open)}"
        )

    state = control.get("state") if control else None
    if review_ready or state in {"ready", "implementing", "complete"}:
        if open_rows:
            errors.append(f"{label}: review/final state contains open questions: {', '.join(sorted(open_rows))}")


def validate_changes(
    changes: list[Change],
    requirements: dict[str, str],
    control: dict[str, object],
    decisions: list[Decision],
    errors: list[str],
    label: str,
) -> None:
    seen: set[str] = set()
    for item in changes:
        if not CHANGE_ID_RE.fullmatch(item.id):
            errors.append(f"{label}: invalid change ID {item.id!r}")
        if item.id in seen:
            errors.append(f"{label}: duplicate change ID {item.id}")
        seen.add(item.id)
        if item.kind not in ALLOWED_CHANGE_KIND:
            errors.append(f"{label}: change {item.id} has invalid kind {item.kind!r}")
        if item.action not in ALLOWED_CHANGE_ACTION:
            errors.append(f"{label}: change {item.id} has invalid action {item.action!r}")
        if item.direction not in ALLOWED_CHANGE_DIRECTION:
            errors.append(f"{label}: change {item.id} has invalid direction {item.direction!r}")
        if path_error := relative_path_error(item.target, allow_glob=False):
            errors.append(f"{label}: change {item.id} target {item.target!r} {path_error}")
        if not item.symbol or not item.existing_anchor or not item.required_change or not item.why_necessary:
            errors.append(f"{label}: change {item.id} has an empty material field")
        if item.existing_anchor.lower() in NONE_VALUES:
            errors.append(f"{label}: change {item.id} must cite an existing anchor")
        if not SLICE_ID_RE.fullmatch(item.slice_id):
            errors.append(f"{label}: change {item.id} has invalid slice ID {item.slice_id!r}")
        necessity_ids = set(REQUIREMENT_ID_RE.findall(item.why_necessary))
        if item.action != "reuse" and not necessity_ids:
            errors.append(
                f"{label}: change {item.id} Why necessary must cite at least one FR-/NFR-/AC- ID"
            )
        undefined = sorted(necessity_ids - set(requirements))
        if undefined:
            errors.append(
                f"{label}: change {item.id} Why necessary cites undefined IDs: {', '.join(undefined)}"
            )

    if not control:
        return
    direction = control.get("implementation_direction")
    decision_id = control.get("direction_decision_id")
    decision_map = {item.id: item for item in decisions}
    divergent = [item.id for item in changes if item.direction == "approved-divergence"]

    if direction == "preserve":
        if decision_id is not None:
            errors.append(f"{label}: preserve direction requires direction_decision_id null")
        if divergent:
            errors.append(
                f"{label}: preserve direction cannot contain approved-divergence rows: {', '.join(divergent)}"
            )
    elif direction == "user-approved-divergence":
        if not isinstance(decision_id, str) or not DECISION_ID_RE.fullmatch(decision_id):
            errors.append(
                f"{label}: user-approved-divergence requires direction_decision_id matching D-###"
            )
        else:
            decision = decision_map.get(decision_id)
            if decision is None:
                errors.append(f"{label}: direction_decision_id {decision_id} is not defined")
            elif (
                decision.source != "user"
                or decision.status != "resolved"
                or decision.user_review != "confirmed"
            ):
                errors.append(
                    f"{label}: direction decision {decision_id} must be resolved/confirmed with source 'user'"
                )
        if not divergent:
            errors.append(f"{label}: user-approved-divergence requires at least one divergent change row")


def validate_budgets(
    budgets: list[Budget],
    changes: list[Change],
    errors: list[str],
    warnings: list[str],
    label: str,
) -> None:
    seen: set[str] = set()
    changes_by_slice: dict[str, list[Change]] = {}
    for change in changes:
        changes_by_slice.setdefault(change.slice_id, []).append(change)

    for budget in budgets:
        if not SLICE_ID_RE.fullmatch(budget.slice_id):
            errors.append(f"{label}: invalid budget slice ID {budget.slice_id!r}")
        if budget.slice_id in seen:
            errors.append(f"{label}: duplicate budget row for {budget.slice_id}")
        seen.add(budget.slice_id)
        if None in {
            budget.max_changed_files,
            budget.max_production_files,
            budget.max_new_production_files,
            budget.max_production_added_lines,
        }:
            continue

        owned = [item for item in changes_by_slice.get(budget.slice_id, []) if item.action != "reuse"]
        changed_targets = {item.target for item in owned}
        production_targets = {item.target for item in owned if item.kind == "production"}
        new_production_targets = {
            item.target for item in owned if item.kind == "production" and item.action == "add"
        }

        if budget.max_changed_files < len(changed_targets):
            errors.append(
                f"{label}: budget {budget.slice_id} Max changed files {budget.max_changed_files} "
                f"is below its {len(changed_targets)} mapped targets"
            )
        if budget.max_production_files < len(production_targets):
            errors.append(
                f"{label}: budget {budget.slice_id} Max production files {budget.max_production_files} "
                f"is below its {len(production_targets)} mapped production targets"
            )
        if budget.max_new_production_files < len(new_production_targets):
            errors.append(
                f"{label}: budget {budget.slice_id} Max new production files "
                f"{budget.max_new_production_files} is below its {len(new_production_targets)} mapped additions"
            )
        if production_targets and budget.max_production_added_lines == 0:
            warnings.append(
                f"{label}: budget {budget.slice_id} has production changes but a zero added-line alarm; "
                "confirm the slice is removal-only"
            )


def dependency_cycle(slices: list[Slice]) -> list[str] | None:
    graph = {item.id: set(item.depends_on) for item in slices}
    visiting: set[str] = set()
    visited: set[str] = set()
    stack: list[str] = []

    def visit(node: str) -> list[str] | None:
        if node in visiting:
            start = stack.index(node)
            return stack[start:] + [node]
        if node in visited:
            return None
        visiting.add(node)
        stack.append(node)
        for dep in graph.get(node, set()):
            if dep in graph:
                cycle = visit(dep)
                if cycle:
                    return cycle
        stack.pop()
        visiting.remove(node)
        visited.add(node)
        return None

    for node in graph:
        cycle = visit(node)
        if cycle:
            return cycle
    return None


def slice_changes(slice_item: Slice, changes: list[Change]) -> list[Change]:
    change_map = {item.id: item for item in changes}
    return [change_map[item] for item in slice_item.change_ids if item in change_map]


def slices_conflict(left: Slice, right: Slice, changes: list[Change]) -> bool:
    left_targets = {item.target for item in slice_changes(left, changes) if item.action != "reuse"}
    right_targets = {item.target for item in slice_changes(right, changes) if item.action != "reuse"}
    if left_targets & right_targets:
        return True
    for left_scope in left.write_scope:
        for right_scope in right.write_scope:
            if patterns_may_overlap(left_scope, right_scope):
                return True
    return False


def parallel_conflicts(items: list[Slice], changes: list[Change]) -> list[str]:
    conflicts: list[str] = []
    for index, left in enumerate(items):
        for right in items[index + 1 :]:
            if slices_conflict(left, right, changes):
                conflicts.append(f"{left.id}<->{right.id}")
    return conflicts


def validate_slices(
    slices: list[Slice],
    changes: list[Change],
    budgets: list[Budget],
    requirements: dict[str, str],
    control: dict[str, object],
    errors: list[str],
    label: str,
) -> None:
    seen: set[str] = set()
    defined_change_ids = {item.id for item in changes}
    change_map = {item.id: item for item in changes}
    budget_ids = {item.slice_id for item in budgets}
    all_covered: set[str] = set()

    for item in slices:
        if not SLICE_ID_RE.fullmatch(item.id):
            errors.append(f"{label}: invalid slice ID {item.id!r}")
        if item.id in seen:
            errors.append(f"{label}: duplicate slice ID {item.id}")
        seen.add(item.id)
        if item.status not in ALLOWED_SLICE_STATUS:
            errors.append(f"{label}: slice {item.id} has invalid status {item.status!r}")
        if not item.goal or not item.validation:
            errors.append(f"{label}: slice {item.id} must have a goal and validation")
        if not item.change_ids:
            errors.append(f"{label}: slice {item.id} must own at least one Change ID")
        for change_id in item.change_ids:
            if not CHANGE_ID_RE.fullmatch(change_id):
                errors.append(f"{label}: slice {item.id} has invalid change ID {change_id!r}")
            elif change_id not in defined_change_ids:
                errors.append(f"{label}: slice {item.id} references undefined change {change_id}")
            elif change_map[change_id].slice_id != item.id:
                errors.append(
                    f"{label}: slice {item.id} references {change_id}, but its Modification Map owner is "
                    f"{change_map[change_id].slice_id}"
                )
        if item.id not in budget_ids:
            errors.append(f"{label}: slice {item.id} has no Change Budget row")
        for dep in item.depends_on:
            if not SLICE_ID_RE.fullmatch(dep):
                errors.append(f"{label}: slice {item.id} has invalid dependency {dep!r}")
            if dep == item.id:
                errors.append(f"{label}: slice {item.id} cannot depend on itself")
        for scope in item.write_scope:
            if path_error := relative_path_error(scope, allow_glob=True):
                errors.append(f"{label}: slice {item.id} Write scope {scope!r} {path_error}")
        for scope in item.do_not_touch:
            if path_error := relative_path_error(scope, allow_glob=True):
                errors.append(f"{label}: slice {item.id} Do not touch {scope!r} {path_error}")
        if not item.covers:
            errors.append(f"{label}: slice {item.id} must cover at least one requirement or AC")
        for req_id in item.covers:
            if req_id not in requirements:
                errors.append(f"{label}: slice {item.id} covers undefined ID {req_id}")
        all_covered.update(item.covers)

        owned_changes = [change_map[cid] for cid in item.change_ids if cid in change_map]
        for change in owned_changes:
            necessary_ids = set(REQUIREMENT_ID_RE.findall(change.why_necessary))
            missing = sorted(necessary_ids - set(item.covers))
            if missing:
                errors.append(
                    f"{label}: slice {item.id} does not cover IDs cited by {change.id}: {', '.join(missing)}"
                )
            if change.action != "reuse" and not any(
                path_matches(change.target, scope) for scope in item.write_scope
            ):
                errors.append(
                    f"{label}: change {change.id} target {change.target!r} is outside slice {item.id} Write scope"
                )
            if any(path_matches(change.target, scope) for scope in item.do_not_touch):
                errors.append(
                    f"{label}: change {change.id} target {change.target!r} matches slice {item.id} Do not touch"
                )

    defined_slice_ids = {item.id for item in slices}
    for item in slices:
        unknown = sorted(set(item.depends_on) - defined_slice_ids)
        if unknown:
            errors.append(f"{label}: slice {item.id} has unknown dependencies: {', '.join(unknown)}")

    for change in changes:
        owners = [item.id for item in slices if change.id in item.change_ids]
        if owners != [change.slice_id]:
            errors.append(
                f"{label}: change {change.id} must be referenced exactly once by owner {change.slice_id}; "
                f"found {owners or 'none'}"
            )

    extra_budgets = sorted(budget_ids - defined_slice_ids)
    if extra_budgets:
        errors.append(f"{label}: Change Budget has rows for undefined slices: {', '.join(extra_budgets)}")

    uncovered = sorted(set(requirements) - all_covered)
    if uncovered:
        errors.append(f"{label}: requirements not covered by any slice: {', '.join(uncovered)}")

    if cycle := dependency_cycle(slices):
        errors.append(f"{label}: slice dependency cycle: {' -> '.join(cycle)}")

    active = control.get("active_slices") if control else []
    active_ids = {str(item).upper() for item in active} if isinstance(active, list) else set()
    in_progress = {item.id for item in slices if item.status == "in_progress"}
    if active_ids != in_progress:
        errors.append(
            f"{label}: active_slices {sorted(active_ids)} must equal in_progress rows {sorted(in_progress)}"
        )

    if control.get("state") == "complete":
        unfinished = [item.id for item in slices if item.status not in {"verified", "skipped"}]
        if unfinished:
            errors.append(f"{label}: complete state has unfinished slices: {', '.join(unfinished)}")

    if len(in_progress) > 1:
        active_items = [item for item in slices if item.id in in_progress]
        groups = {item.parallel_group for item in active_items}
        if len(groups) != 1 or next(iter(groups)).strip().lower() == "serial":
            errors.append(f"{label}: multiple active slices require one non-Serial parallel group")
        conflicts = parallel_conflicts(active_items, changes)
        if conflicts:
            errors.append(f"{label}: active parallel slices have scope/target conflicts: {', '.join(conflicts)}")


def validate_revisions(
    revisions: list[Revision],
    decisions: list[Decision],
    questions: list[Question],
    control: dict[str, object],
    errors: list[str],
    label: str,
) -> None:
    numbers: list[int] = []
    decision_ids = {item.id for item in decisions}
    question_ids = {item.id for item in questions}
    for row in revisions:
        if row.revision is not None:
            numbers.append(row.revision)
        if not ISO_TIMESTAMP_RE.fullmatch(row.timestamp):
            errors.append(
                f"{label}: revision {row.revision or '?'} timestamp must be ISO-8601 with timezone"
            )
        if not row.trigger or not row.changes:
            errors.append(f"{label}: revision {row.revision or '?'} requires Trigger and Changes")
        invalid_decisions = sorted(set(row.decision_ids) - decision_ids)
        invalid_questions = sorted(set(row.question_ids) - question_ids)
        if invalid_decisions:
            errors.append(
                f"{label}: revision {row.revision or '?'} references undefined decisions: {', '.join(invalid_decisions)}"
            )
        if invalid_questions:
            errors.append(
                f"{label}: revision {row.revision or '?'} references undefined questions: {', '.join(invalid_questions)}"
            )
        for item in row.decision_ids:
            if not DECISION_ID_RE.fullmatch(item):
                errors.append(f"{label}: revision row has invalid decision ID {item!r}")
        for item in row.question_ids:
            if not QUESTION_ID_RE.fullmatch(item):
                errors.append(f"{label}: revision row has invalid question ID {item!r}")

    if numbers:
        if len(numbers) != len(set(numbers)):
            errors.append(f"{label}: Design Revision History contains duplicate revisions")
        if numbers != sorted(numbers):
            errors.append(f"{label}: Design Revision History must be in ascending revision order")
        if numbers[0] != 1:
            errors.append(f"{label}: Design Revision History must start at revision 1")
        expected = list(range(1, max(numbers) + 1))
        if numbers != expected:
            errors.append(f"{label}: Design Revision History must contain each revision without gaps")
        control_revision = control.get("spec_revision") if control else None
        if isinstance(control_revision, int) and max(numbers) != control_revision:
            errors.append(
                f"{label}: highest Design Revision History row {max(numbers)} must equal spec_revision {control_revision}"
            )


def validate_pair(
    source_path: Path,
    *,
    review_ready: bool = False,
) -> tuple[SpecData, SpecData, list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    try:
        mirror_path = derived_mirror_path(source_path)
    except ValueError as exc:
        errors.append(str(exc))
        empty = empty_spec(source_path)
        return empty, empty, errors, warnings

    source = load_spec(source_path, errors, "English source")
    mirror = load_spec(mirror_path, errors, "Korean mirror")

    for heading in REQUIRED_HEADINGS:
        if source.text and heading not in source.text:
            errors.append(f"English source: missing required heading {heading!r}")

    if mirror.text:
        section_order = NUMBERED_H2_RE.findall(mirror.text)
        if section_order[:10] != [str(item) for item in range(1, 11)]:
            errors.append("Korean mirror: numbered section order must be 1 through 10")
        if len(HANGUL_RE.findall(mirror.text)) < 20:
            errors.append("Korean mirror: expected a substantive Korean translation")

    for spec, label in ((source, "English source"), (mirror, "Korean mirror")):
        if spec.text:
            placeholders = unresolved_placeholders(spec.text)
            if placeholders:
                errors.append(
                    f"{label}: unresolved placeholder or vague phrase(s): " + ", ".join(placeholders[:10])
                )
        validate_control(spec, errors, label, review_ready=review_ready)
        validate_snapshot(spec, errors, label)
        validate_patterns(spec.patterns, errors, label)
        validate_reuse_items(spec.reuse_items, errors, label)
        validate_decisions(
            spec.decisions,
            spec.control,
            errors,
            label,
            review_ready=review_ready,
        )
        validate_questions(
            spec.questions,
            spec.decisions,
            spec.control,
            errors,
            label,
            review_ready=review_ready,
        )
        validate_changes(spec.changes, spec.requirements, spec.control, spec.decisions, errors, label)
        validate_budgets(spec.budgets, spec.changes, errors, warnings, label)
        validate_slices(
            spec.slices,
            spec.changes,
            spec.budgets,
            spec.requirements,
            spec.control,
            errors,
            label,
        )
        validate_revisions(
            spec.revisions,
            spec.decisions,
            spec.questions,
            spec.control,
            errors,
            label,
        )

    if source.control and mirror.control and source.control != mirror.control:
        errors.append("Control JSON must be identical in English source and Korean mirror")

    if source.control:
        declared_source = str(source.control.get("source_spec", ""))
        declared_mirror = str(source.control.get("korean_mirror", ""))
        if declared_source and not declared_path_matches(source_path, declared_source):
            errors.append(
                f"Control source_spec {declared_source!r} does not match supplied path {source_path.as_posix()!r}"
            )
        if declared_mirror and not declared_path_matches(mirror_path, declared_mirror):
            errors.append(
                f"Control korean_mirror {declared_mirror!r} does not match derived path {mirror_path.as_posix()!r}"
            )

    if [row.evidence for row in source.patterns] != [row.evidence for row in mirror.patterns]:
        errors.append("Korean mirror: Current Pattern Evidence cells must preserve English technical values")

    if [item.id for item in source.reuse_items] != [item.id for item in mirror.reuse_items]:
        errors.append("English source and Korean mirror must preserve Reuse Inventory ID order")
    elif source.reuse_items and mirror.reuse_items:
        for left, right in zip(source.reuse_items, mirror.reuse_items):
            if left.existing_asset != right.existing_asset or left.evidence != right.evidence:
                errors.append(
                    f"Korean mirror: {left.id} Existing asset and Evidence must preserve English technical values"
                )

    if [item.id for item in source.decisions] != [item.id for item in mirror.decisions]:
        errors.append("English source and Korean mirror must preserve Decision Ledger ID order")
    elif source.decisions and mirror.decisions:
        for left, right in zip(source.decisions, mirror.decisions):
            for field in ("source", "user_review", "status"):
                if getattr(left, field) != getattr(right, field):
                    errors.append(
                        f"Korean mirror: {left.id} field {field!r} must preserve the English technical value"
                    )

    if [item.id for item in source.questions] != [item.id for item in mirror.questions]:
        errors.append("English source and Korean mirror must preserve Question Register ID order")
    elif source.questions and mirror.questions:
        for left, right in zip(source.questions, mirror.questions):
            for field in ("linked_decision", "status"):
                if getattr(left, field) != getattr(right, field):
                    errors.append(
                        f"Korean mirror: {left.id} field {field!r} must preserve the English technical value"
                    )

    if list(source.requirements) != list(mirror.requirements):
        errors.append("English source and Korean mirror must preserve requirement ID order")

    if source.strategies != mirror.strategies:
        errors.append("English source and Korean mirror must preserve strategy IDs")

    if [item.id for item in source.changes] != [item.id for item in mirror.changes]:
        errors.append("English source and Korean mirror must preserve Modification Map ID order")
    elif source.changes and mirror.changes:
        technical_fields = (
            "kind",
            "target",
            "symbol",
            "action",
            "existing_anchor",
            "slice_id",
            "direction",
        )
        for left, right in zip(source.changes, mirror.changes):
            for field in technical_fields:
                if getattr(left, field) != getattr(right, field):
                    errors.append(
                        f"Korean mirror: {left.id} field {field!r} must preserve the English technical value"
                    )

    if source.budgets != mirror.budgets:
        errors.append("English source and Korean mirror must preserve every Change Budget value")

    if [item.id for item in source.slices] != [item.id for item in mirror.slices]:
        errors.append("English source and Korean mirror must preserve Work Plan slice ID order")
    elif source.slices and mirror.slices:
        technical_fields = (
            "depends_on",
            "parallel_group",
            "change_ids",
            "write_scope",
            "do_not_touch",
            "covers",
            "validation",
            "status",
        )
        for left, right in zip(source.slices, mirror.slices):
            for field in technical_fields:
                if getattr(left, field) != getattr(right, field):
                    errors.append(
                        f"Korean mirror: {left.id} field {field!r} must preserve the English technical value"
                    )

    source_revision_technical = [
        (item.revision, item.timestamp, item.decision_ids, item.question_ids) for item in source.revisions
    ]
    mirror_revision_technical = [
        (item.revision, item.timestamp, item.decision_ids, item.question_ids) for item in mirror.revisions
    ]
    if source_revision_technical != mirror_revision_technical:
        errors.append(
            "English source and Korean mirror must preserve revision numbers, timestamps, and referenced IDs"
        )

    return source, mirror, errors, warnings


def print_result(errors: list[str], warnings: list[str], *, label: str = "Spec validation") -> None:
    if errors:
        print(f"{label}: FAIL")
        for error in errors:
            print(f"ERROR: {error}")
    else:
        print(f"{label}: PASS")
    for warning in warnings:
        print(f"WARN: {warning}")


def ready_slices(slices: list[Slice]) -> list[Slice]:
    satisfied = {item.id for item in slices if item.status in {"verified", "skipped"}}
    return [
        item
        for item in slices
        if item.status == "pending" and set(item.depends_on).issubset(satisfied)
    ]


def cmd_validate(args: argparse.Namespace) -> int:
    _, _, errors, warnings = validate_pair(Path(args.spec))
    print_result(errors, warnings)
    return 1 if errors else 0


def cmd_review_ready(args: argparse.Namespace) -> int:
    source, _, errors, warnings = validate_pair(Path(args.spec), review_ready=True)
    print_result(errors, warnings, label="Review-ready validation")
    if errors:
        return 1
    pending = [
        item
        for item in source.decisions
        if item.status == "resolved" and item.user_review == "review-needed"
    ]
    if pending:
        print("Agent decisions to present at the final review:")
        for item in pending:
            print(f"- {item.id}: {item.decision} — {item.impact}")
    else:
        print("Agent decisions to present at the final review: none")
    return 0


def cmd_status(args: argparse.Namespace) -> int:
    source, _, errors, warnings = validate_pair(Path(args.spec))
    print_result(errors, warnings, label="Living spec validation")
    if errors:
        return 1
    control = source.control
    print("Living spec status:")
    print(f"- path: {source.path.as_posix()}")
    print(f"- state: {control.get('state')}")
    print(f"- revision: {control.get('spec_revision')}")
    print(f"- reviewed revision: {control.get('reviewed_revision')}")
    print(f"- strategy: {control.get('selected_strategy')}")
    print(f"- direction: {control.get('implementation_direction')}")
    open_questions = [item for item in source.questions if item.status == "open"]
    print("- open questions: " + (", ".join(item.id for item in open_questions) or "None"))
    pending = [
        item
        for item in source.decisions
        if item.status == "resolved" and item.user_review == "review-needed"
    ]
    print("- agent decisions to review: " + (", ".join(item.id for item in pending) or "None"))
    production_targets = [
        item.target for item in source.changes if item.kind == "production" and item.action != "reuse"
    ]
    print("- planned production targets: " + (", ".join(production_targets) or "None"))
    new_production = [
        item.target
        for item in source.changes
        if item.kind == "production" and item.action == "add"
    ]
    print("- planned new production files: " + (", ".join(new_production) or "None"))
    print(f"- work slices: {len(source.slices)}")
    print(f"- next action: {control.get('next_action')}")
    return 0


def cmd_ready(args: argparse.Namespace) -> int:
    source, _, errors, warnings = validate_pair(Path(args.spec))
    if not errors and source.control.get("state") not in {"ready", "implementing"}:
        errors.append(
            f"implementation readiness requires state ready or implementing, found {source.control.get('state')!r}"
        )
    print_result(errors, warnings)
    if errors:
        return 1

    ready = ready_slices(source.slices)
    if not ready:
        print("Ready slices: none")
        return 0

    print("Ready slices:")
    for item in ready:
        budget = next((row for row in source.budgets if row.slice_id == item.id), None)
        budget_text = ""
        if budget and budget.max_changed_files is not None:
            budget_text = (
                f", max_files={budget.max_changed_files}, "
                f"max_prod_lines={budget.max_production_added_lines}"
            )
        print(f"- {item.id}: {item.goal} [group={item.parallel_group}{budget_text}]")

    groups: dict[str, list[Slice]] = {}
    for item in ready:
        group = item.parallel_group.strip()
        if group and group.lower() != "serial":
            groups.setdefault(group, []).append(item)

    candidates = [
        (name, items)
        for name, items in groups.items()
        if len(items) > 1 and not parallel_conflicts(items, source.changes)
    ]
    if candidates:
        print("Target- and scope-disjoint parallel candidates:")
        for name, items in candidates:
            print(f"- {name}: {', '.join(item.id for item in items)}")
        print("NOTE: The main agent must still confirm stable shared interfaces and independent validation.")
    else:
        print("Parallel candidates: none; execute serially unless the main agent proves safety.")
    return 0


def scope_errors_for(
    source: SpecData, target: Slice, changed: Sequence[str]
) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    normalized_changed: list[str] = []
    owned_writable = {
        item.target for item in slice_changes(target, source.changes) if item.action != "reuse"
    }

    for raw in changed:
        if path_error := relative_path_error(raw, allow_glob=False):
            errors.append(f"{raw}: {path_error}")
            continue
        normalized = normalize_pattern(raw)
        normalized_changed.append(normalized)
        if any(path_matches(normalized, pattern) for pattern in target.do_not_touch):
            errors.append(f"{normalized}: matches Do not touch scope")
        elif not any(path_matches(normalized, pattern) for pattern in target.write_scope):
            errors.append(f"{normalized}: outside allowed Write scope")
        elif normalized not in owned_writable:
            errors.append(
                f"{normalized}: no non-reuse Modification Map row owned by {target.id}"
            )
    return errors, list(dict.fromkeys(normalized_changed))


def get_target_slice(source: SpecData, slice_id: str) -> Slice | None:
    wanted = slice_id.upper()
    return next((item for item in source.slices if item.id == wanted), None)


def require_implementation_state(source: SpecData, errors: list[str]) -> None:
    state = source.control.get("state") if source.control else None
    if state not in {"ready", "implementing"}:
        errors.append(f"implementation command requires state ready or implementing, found {state!r}")


def cmd_check_scope(args: argparse.Namespace) -> int:
    source, _, errors, warnings = validate_pair(Path(args.spec))
    require_implementation_state(source, errors)
    if errors:
        print_result(errors, warnings)
        return 1

    target = get_target_slice(source, args.slice)
    if target is None:
        print(f"Scope check: FAIL\nERROR: unknown slice {args.slice.upper()}")
        return 1

    scope_errors, normalized = scope_errors_for(source, target, args.changed)
    if scope_errors:
        print("Scope check: FAIL")
        for error in scope_errors:
            print(f"ERROR: {error}")
        return 1

    print(f"Scope check: PASS ({target.id})")
    for path in normalized:
        print(f"- {path}")
    return 0


def cmd_check_patch(args: argparse.Namespace) -> int:
    source, _, errors, warnings = validate_pair(Path(args.spec))
    require_implementation_state(source, errors)
    if errors:
        print_result(errors, warnings)
        return 1

    target = get_target_slice(source, args.slice)
    if target is None:
        print(f"Patch check: FAIL\nERROR: unknown slice {args.slice.upper()}")
        return 1
    budget = next((row for row in source.budgets if row.slice_id == target.id), None)
    if budget is None:
        print(f"Patch check: FAIL\nERROR: no budget for {target.id}")
        return 1

    patch_errors, changed = scope_errors_for(source, target, args.changed)
    new_paths: list[str] = []
    for raw in args.new or []:
        if path_error := relative_path_error(raw, allow_glob=False):
            patch_errors.append(f"new file {raw}: {path_error}")
            continue
        normalized = normalize_pattern(raw)
        new_paths.append(normalized)
        if normalized not in changed:
            patch_errors.append(f"new file {normalized}: must also be listed in --changed")
    new_paths = list(dict.fromkeys(new_paths))

    owned = {item.target: item for item in slice_changes(target, source.changes) if item.action != "reuse"}
    for path in changed:
        row = owned.get(path)
        if row and row.action == "add" and path not in new_paths:
            patch_errors.append(f"{path}: Modification Map action is add but file was not reported in --new")
    for path in new_paths:
        row = owned.get(path)
        if row is None:
            continue
        if row.action != "add":
            patch_errors.append(f"{path}: reported as new but Modification Map action is {row.action!r}, not 'add'")

    production_targets = {item.target for item in owned.values() if item.kind == "production"}
    production_changed = [path for path in changed if path in production_targets]
    new_production = [path for path in new_paths if path in production_targets]

    if budget.max_changed_files is not None and len(changed) > budget.max_changed_files:
        patch_errors.append(f"changed files {len(changed)} exceed budget {budget.max_changed_files}")
    if budget.max_production_files is not None and len(production_changed) > budget.max_production_files:
        patch_errors.append(
            f"production files {len(production_changed)} exceed budget {budget.max_production_files}"
        )
    if (
        budget.max_new_production_files is not None
        and len(new_production) > budget.max_new_production_files
    ):
        patch_errors.append(
            f"new production files {len(new_production)} exceed budget {budget.max_new_production_files}"
        )
    if (
        budget.max_production_added_lines is not None
        and args.production_added_lines > budget.max_production_added_lines
    ):
        patch_errors.append(
            f"production added lines {args.production_added_lines} exceed expansion alarm "
            f"{budget.max_production_added_lines}; revise the spec rather than compressing code"
        )

    actual_dependencies = tuple(dict.fromkeys(args.dependency or []))
    actual_abstractions = tuple(dict.fromkeys(args.shared_abstraction or []))
    unexpected_dependencies = sorted(set(actual_dependencies) - set(budget.new_dependencies))
    unexpected_abstractions = sorted(set(actual_abstractions) - set(budget.new_shared_abstractions))
    if unexpected_dependencies:
        patch_errors.append(f"unapproved new dependencies: {', '.join(unexpected_dependencies)}")
    if unexpected_abstractions:
        patch_errors.append(
            f"unapproved new shared abstractions: {', '.join(unexpected_abstractions)}"
        )

    if patch_errors:
        print("Patch check: FAIL")
        for error in patch_errors:
            print(f"ERROR: {error}")
        return 1

    print(f"Patch check: PASS ({target.id})")
    print(f"- changed files: {len(changed)}/{budget.max_changed_files}")
    print(f"- production files: {len(production_changed)}/{budget.max_production_files}")
    print(f"- new production files: {len(new_production)}/{budget.max_new_production_files}")
    print(
        f"- production added lines: {args.production_added_lines}/{budget.max_production_added_lines}"
    )
    print("- new dependencies: " + (", ".join(actual_dependencies) if actual_dependencies else "None"))
    print(
        "- new shared abstractions: "
        + (", ".join(actual_abstractions) if actual_abstractions else "None")
    )
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    validate = subparsers.add_parser("validate", help="validate the current English/Korean living pair")
    validate.add_argument("spec", help="path to the English source spec")
    validate.set_defaults(func=cmd_validate)

    status = subparsers.add_parser("status", help="print a concise user-review status for the living pair")
    status.add_argument("spec", help="path to the English source spec")
    status.set_defaults(func=cmd_status)

    review = subparsers.add_parser(
        "review-ready", help="verify the complete plan before asking the final domain question"
    )
    review.add_argument("spec", help="path to the English source spec")
    review.set_defaults(func=cmd_review_ready)

    ready = subparsers.add_parser(
        "ready", help="list dependency-ready slices and disjoint parallel candidates"
    )
    ready.add_argument("spec", help="path to the English source spec")
    ready.set_defaults(func=cmd_ready)

    scope = subparsers.add_parser(
        "check-scope", help="verify changed files against one slice scope and Modification Map"
    )
    scope.add_argument("spec", help="path to the English source spec")
    scope.add_argument("slice", help="work-slice ID, for example WS2")
    scope.add_argument("--changed", nargs="+", required=True, help="repository-relative changed paths")
    scope.set_defaults(func=cmd_check_scope)

    patch = subparsers.add_parser(
        "check-patch", help="verify one slice's actual patch against its scope and change budget"
    )
    patch.add_argument("spec", help="path to the English source spec")
    patch.add_argument("slice", help="work-slice ID, for example WS2")
    patch.add_argument("--changed", nargs="+", required=True, help="repository-relative changed paths")
    patch.add_argument("--new", nargs="*", default=[], help="subset of changed paths that are new files")
    patch.add_argument(
        "--production-added-lines",
        type=int,
        required=True,
        help="added lines in production-kind targets for this slice diff",
    )
    patch.add_argument(
        "--dependency", action="append", default=[], help="new dependency name; repeat when needed"
    )
    patch.add_argument(
        "--shared-abstraction",
        action="append",
        default=[],
        help="new shared abstraction name; repeat when needed",
    )
    patch.set_defaults(func=cmd_check_patch)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if getattr(args, "production_added_lines", 0) < 0:
        raise SystemExit("--production-added-lines must be non-negative")
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())
