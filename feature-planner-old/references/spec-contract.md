# Living Spec Contract

The artifact exists throughout refinement, not only at the end. It is one authoritative English source plus one synchronized Korean review mirror. The pair contains current design, questions, decisions, implementation plan, revision history, and progress so the user and all agents share one durable source of truth.

## 1. Paths and Authority

- Prefer an existing repository convention; otherwise use `docs/specs/YYYY-MM-DD-<slug>-spec.md`.
- Insert `.ko` before `.md` for the Korean mirror.
- Create both files before the first clarification question after focused repository inspection.
- The English file is authoritative for workers and reviewers.
- Update English first, then synchronize Korean before showing or asking the user.

## 2. Control Block

Place identical JSON near the top of both files:

```markdown
<!-- feature-planner-control
{
  "workflow": "feature-planner/v7",
  "state": "refining",
  "source_spec": "docs/specs/YYYY-MM-DD-example-spec.md",
  "korean_mirror": "docs/specs/YYYY-MM-DD-example-spec.ko.md",
  "spec_revision": 3,
  "reviewed_revision": null,
  "selected_strategy": "STRAT-1",
  "implementation_direction": "preserve",
  "direction_decision_id": null,
  "minimal_change_policy": "strict",
  "final_domain_gate": "not_ready",
  "open_question_ids": ["Q-003"],
  "active_slices": [],
  "next_action": "answer_questions"
}
-->
```

Allowed values:

- `state`: `refining`, `ready`, `implementing`, `blocked`, `complete`.
- `implementation_direction`: `preserve`, `user-approved-divergence`.
- `minimal_change_policy`: `strict`.
- `final_domain_gate`: `not_ready`, `required`, `confirmed_none`.
- `next_action`: `answer_questions`, `review_final_draft`, `await_implementation_request`, `implement`, `targeted_refinement`, `none`.
- `open_question_ids`: exact IDs of Question Register rows whose status is `open`.
- `reviewed_revision`: `null` while the current design is not reviewed; otherwise the current integer `spec_revision`.

State consistency:

| State | Required control state |
| --- | --- |
| `refining` with open questions | `next_action: answer_questions`, gate `not_ready`, `reviewed_revision: null`, no active slices |
| `refining` with no open questions | `next_action: review_final_draft`, gate `required`, `reviewed_revision: null`, no active slices |
| `ready` | next action `await_implementation_request` or `implement`; gate confirmed; no open/active IDs; reviewed revision equals current revision |
| `implementing` | next action `implement`; gate confirmed; reviewed revision equals current revision; active IDs equal `in_progress` slices |
| `blocked` | next action `targeted_refinement`; record the exact gap and preserve unaffected verified slices |
| `complete` | next action `none`; gate confirmed; reviewed revision equals current revision; no open/active IDs |

Direction consistency:

- `preserve` requires `direction_decision_id: null` and every Modification Map row to use `preserve`.
- `user-approved-divergence` requires `direction_decision_id` to reference a resolved, confirmed `user` decision and at least one Modification Map row to use `approved-divergence`.
- Approval applies only to listed divergent rows.

Increment `spec_revision` when design content changes. Progress-only status changes do not require an increment. Any material edit after review clears `reviewed_revision` and returns the pair to refinement or targeted refinement.

## 3. Required Sections and Stable IDs

Copy `assets/spec-template.md`. Both documents include all ten numbered sections.

Use stable IDs:

- decisions: `D-001`;
- questions: `Q-001`;
- reuse entries: `R-001`;
- requirements: `FR-001`, `NFR-001`;
- acceptance criteria: `AC-001`;
- strategies: `STRAT-1`;
- modifications: `CH-001`;
- slices: `WS1`.

Define requirements with:

```markdown
- **FR-001:** Required behavior.
- **NFR-001:** Reliability, security, compatibility, style-fidelity, performance, or operational constraint.
- **AC-001:** Binary or measurable completion evidence.
```

Every requirement and acceptance criterion must be covered by at least one slice. The current plan must be concrete even while questions are open; do not use `TBD`, vague placeholders, or empty tables.

## 4. Review Snapshot

Keep the top snapshot concise and current. It must show:

- lifecycle state and revision;
- current outcome and selected strategy;
- planned production targets and symbols;
- expected new production files, dependencies, and shared abstractions;
- slice count/order and parallel candidates;
- open question IDs;
- active agent decisions with `User review: review-needed`;
- last material revision delta.

The snapshot is for user orientation. The detailed tables remain authoritative.

## 5. Repository Pattern Baseline and Reuse Inventory

Use these columns exactly:

```markdown
| Area | Current pattern | Evidence | Must preserve |
| --- | --- | --- | --- |
| Service ownership | Transactions stay in the domain service. | `src/orders/service.py::apply_action` | Keep routes thin and reuse the domain error path. |
```

Evidence names concrete paths or symbols near the target behavior.

Reuse Inventory columns:

```markdown
| ID | Existing asset | Evidence | Planned use |
| --- | --- | --- | --- |
| R-001 | Existing action validator | `src/orders/validation.py::validate_action` | Call it before the transition. |
```

## 6. Decision Ledger

Use these columns exactly:

```markdown
| ID | Domain | Decision | Source | Rationale or Evidence | Impact | User review | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D-001 | Implementation | Extend the existing service method. | agent | Closest analogous path is `src/orders/service.py::refund`. | Keeps the production patch to one file. | review-needed | resolved |
```

Allowed values:

- `Source`: `user`, `repository`, `agent`.
- `User review`: `confirmed`, `not-required`, `review-needed`, `overridden`.
- `Status`: `open`, `resolved`, `superseded`.

Rules:

- `repository` decisions are resolved facts and use `not-required`.
- Current `user` decisions use `confirmed`.
- Current `agent` decisions use `review-needed` until explicitly accepted or the final gate is confirmed.
- Superseded decisions remain for audit with `overridden`.
- Ready, implementing, and complete specs may contain no `open` or `review-needed` current decisions.
- A project-direction approval must be a resolved, confirmed `user` decision.

Translate Domain, Decision, Rationale/Evidence, and Impact in Korean. Preserve ID, Source, User review, and Status exactly.

## 7. Question Register

Use these columns exactly:

```markdown
| ID | Domain | Decision needed | Why it matters | Recommendation | Linked decision | Status | Resolution |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Q-001 | API | Choose the public cancellation contract. | It changes route surface and client compatibility. | Extend the existing action endpoint. | None | open | Awaiting user answer. |
```

Allowed statuses: `open`, `answered`, `withdrawn`.

Rules:

- `open` rows appear exactly in `open_question_ids` and have `Linked decision: None`.
- `answered` rows link to one resolved current decision and state the answer.
- `withdrawn` rows explain why the question no longer affects the plan.
- The recommendation must match the current provisional plan.
- Before FINAL_REVIEW, no row may remain `open`.

Preserve ID, Linked decision, and Status exactly in the Korean mirror.

## 8. Implementation Strategy, Modification Map, and Budget

The selected strategy heading matches `selected_strategy`. State exact direction, control/data flow, reused assets, why no smaller conforming approach works, limitations accepted to avoid broader architecture, explicit exclusions, compatibility/migration/rollout posture, and any user-approved divergence.

Modification Map columns:

```markdown
| ID | Kind | Target | Symbol | Action | Existing anchor | Required change | Why necessary | Slice | Direction |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CH-001 | production | `src/orders/service.py` | `OrderService.apply_action` | extend | `src/orders/service.py::OrderService.refund` | Add the cancellation branch. | Implements FR-001 without a new owner. | WS1 | preserve |
```

Allowed values:

- `Kind`: `production`, `test`, `config`, `migration`, `generated`, `docs`.
- `Action`: `reuse`, `extend`, `edit`, `add`, `remove`.
- `Direction`: `preserve`, `approved-divergence`.

Targets are exact repository-relative paths. Every non-reuse row belongs to one slice and cites a defined requirement/acceptance ID in `Why necessary`. `reuse` authorizes no write.

Change Budget columns:

```markdown
| Slice | Max changed files | Max production files | Max new production files | Max production added lines | New dependencies | New shared abstractions |
| --- | --- | --- | --- | --- | --- | --- |
| WS1 | 2 | 1 | 0 | 25 | None | None |
```

Each slice has one row. Budgets are the smallest realistic expansion alarms, not compression targets.

## 9. Work Plan

Use these columns exactly:

```markdown
| ID | Goal | Depends on | Parallel group | Change IDs | Write scope | Do not touch | Covers | Validation | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WS1 | Add validated cancellation behavior | None | Serial | CH-001, CH-002 | `src/orders/service.py`, `tests/orders/test_service.py` | `src/shared/**` | FR-001, NFR-001, AC-001 | `pytest tests/orders/test_service.py` | pending |
```

Statuses: `pending`, `in_progress`, `verified`, `blocked`, `skipped`.

Use repository-relative paths/globs, never absolute paths or `..`. Multiple active slices require one proven-safe non-Serial group with no dependency, scope, or target conflict.

## 10. Design Revision History

Use these columns exactly:

```markdown
| Revision | Timestamp | Trigger | Changes | Decision IDs | Question IDs |
| --- | --- | --- | --- | --- | --- |
| 3 | 2026-07-14T12:00:00+09:00 | user-answer | Applied the API choice and revised CH-001/WS1. | D-004 | Q-002 |
```

Rules:

- Revisions start at 1 and increase without duplication.
- The highest row equals `spec_revision`.
- Every material question round or correction creates one row.
- Decision and question references must exist or be `None`.
- Preserve Revision, Timestamp, Decision IDs, and Question IDs in Korean.

Implementation Progress Record remains separate and records state/slice transitions without implying a design revision.

## 11. Korean Mirror

The mirror is a substantive Korean translation for user review. Keep these technical values identical:

- control JSON;
- all stable IDs;
- paths, globs, symbols, commands, API/schema names, states, sources, review/status values, dependencies, parallel groups, and budgets;
- Current Pattern Evidence;
- Reuse Inventory Existing asset and Evidence;
- Modification Map technical columns;
- Work Plan technical columns;
- revision technical columns.

If the files disagree, fix English first, then synchronize Korean.

## 12. Validation Commands

Draft/current-state validation:

```bash
python <skill-path>/scripts/specctl.py validate docs/specs/example-spec.md
```

User-facing status summary:

```bash
python <skill-path>/scripts/specctl.py status docs/specs/example-spec.md
```

Review-ready validation before the final question:

```bash
python <skill-path>/scripts/specctl.py review-ready docs/specs/example-spec.md
```

Implementation readiness and slice commands:

```bash
python <skill-path>/scripts/specctl.py ready docs/specs/example-spec.md
python <skill-path>/scripts/specctl.py check-scope docs/specs/example-spec.md WS1 --changed <paths...>
python <skill-path>/scripts/specctl.py check-patch docs/specs/example-spec.md WS1 --changed <paths...> --production-added-lines <n>
```
