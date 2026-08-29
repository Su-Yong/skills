# <Feature Name> — Living Implementation Specification

<!-- feature-planner-control
{
  "workflow": "feature-planner/v7",
  "state": "refining",
  "source_spec": "docs/specs/YYYY-MM-DD-feature-spec.md",
  "korean_mirror": "docs/specs/YYYY-MM-DD-feature-spec.ko.md",
  "spec_revision": 1,
  "reviewed_revision": null,
  "selected_strategy": "STRAT-1",
  "implementation_direction": "preserve",
  "direction_decision_id": null,
  "minimal_change_policy": "strict",
  "final_domain_gate": "not_ready",
  "open_question_ids": ["Q-001"],
  "active_slices": [],
  "next_action": "answer_questions"
}
-->

> This pair is a living design. It is updated before every clarification question. The English file is authoritative for implementation; the Korean file is the synchronized user-review mirror.

## 1. Review Snapshot

| Review item | Current value |
| --- | --- |
| Lifecycle | `refining`, revision 1, not yet user-reviewed |
| Outcome | <Current concrete outcome> |
| Recommended implementation | `STRAT-1` — <one-sentence current plan> |
| Planned production targets | `<path>::<symbol>` |
| Expected additions | New production files: 0; dependencies: None; shared abstractions: None |
| Work plan | <slice count, order, and safe parallel candidates> |
| Open questions | `Q-001` |
| Agent decisions to review | `D-002` — <short decision> |
| Last material change | Revision 1 — <what was added or changed> |

## 2. Outcome and Scope

### Outcome

<Describe the observable result and who receives it.>

### In Scope

- <Concrete behavior or deliverable.>

### Out of Scope / Non-Goals

- <Behavior, cleanup, refactor, system, or follow-up work excluded from this feature.>

### Users and Primary Flow

1. <Actor and precondition.>
2. <Action.>
3. <Observable result.>

### Current Assumptions and Constraints

- <Repository, compatibility, operational, or policy constraint. Cite decision IDs where relevant.>

## 3. Repository Pattern Baseline

### Current Pattern

| Area | Current pattern | Evidence | Must preserve |
| --- | --- | --- | --- |
| <Ownership/flow/testing/etc.> | <What the nearest analogous code does> | `<path>::<symbol>` | <Specific convention that the implementation must preserve> |

### Reuse Inventory

| ID | Existing asset | Evidence | Planned use |
| --- | --- | --- | --- |
| R-001 | `<existing symbol or asset>` | `<path>::<symbol>` | <How the plan reuses or extends it> |

## 4. Decisions and Questions

### Decision Ledger

| ID | Domain | Decision | Source | Rationale or Evidence | Impact | User review | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D-001 | <Domain> | <Current decision> | repository | `<path>::<symbol>` | <Behavior or implementation impact> | not-required | resolved |
| D-002 | <Domain> | <Agent-selected low-risk detail> | agent | <Repository-supported rationale> | <Patch or behavior impact> | review-needed | resolved |

### Question Register

| ID | Domain | Decision needed | Why it matters | Recommendation | Linked decision | Status | Resolution |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Q-001 | <Domain> | <Precise user choice> | <Affected behavior/risk/patch shape> | <Current preservation-first recommendation> | None | open | Awaiting user answer. |

## 5. Requirements and Acceptance Criteria

### Functional Requirements

- **FR-001:** <Required behavior.>

### Non-Functional Requirements

- **NFR-001:** The implementation must preserve the nearest existing project architecture and style and introduce no unnecessary production code, files, dependencies, or abstractions.

### Acceptance Criteria

- **AC-001:** <Binary or measurable evidence of completion.>

### Edge and Failure Cases

- <Input/state> → <required result>.

## 6. Implementation Strategy and Direction

### STRAT-1 — <Strategy Name>

- **Direction:** `preserve`
- **Current approach:** <Smallest control/data flow satisfying the current design.>
- **Existing flow to reuse:** <R-IDs and named anchors.>
- **Why this is minimal:** <Why no smaller repository-conventional implementation is sufficient.>
- **Behavior-preserving limitations:** <Tradeoffs accepted to avoid broader architecture.>
- **Explicit exclusions:** <Cleanup, refactors, files, systems, behavior, or alternate patterns that must not change.>
- **Compatibility and migration posture:** <Backward compatibility, migration, rollout, and rollback implications.>
- **Direction approval:** None. <Or cite a resolved confirmed user decision and exact approved divergence.>
- **Open-question sensitivity:** <Which current plan elements would change for each open Q-ID, or “None”.>

### Material Alternatives Considered

| Strategy | Direction | Benefit | Additional code or risk | Decision |
| --- | --- | --- | --- | --- |
| <STRAT-x or descriptive alternative> | preserve/user-approved-divergence | <Benefit> | <Extra files, abstractions, migration, or risk> | rejected/provisional/user-approved |

## 7. Modification Map and Change Budget

### Modification Map

| ID | Kind | Target | Symbol | Action | Existing anchor | Required change | Why necessary | Slice | Direction |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CH-001 | production | `src/example/service.py` | `ExampleService.run` | extend | `src/example/service.py::ExampleService.other_method` | <Smallest required edit> | Implements FR-001 and NFR-001. | WS1 | preserve |
| CH-002 | test | `tests/example/test_service.py` | `test_run_behavior` | extend | `tests/example/test_service.py::test_other_behavior` | <Focused test case> | Proves AC-001. | WS1 | preserve |

### Change Budget

| Slice | Max changed files | Max production files | Max new production files | Max production added lines | New dependencies | New shared abstractions |
| --- | --- | --- | --- | --- | --- | --- |
| WS1 | 2 | 1 | 0 | 25 | None | None |

The production-line budget is an expansion alarm, not a compression target. Revise the design if the clear minimal implementation exceeds it.

## 8. Work Plan

| ID | Goal | Depends on | Parallel group | Change IDs | Write scope | Do not touch | Covers | Validation | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WS1 | <One coherent, independently verifiable checkpoint> | None | Serial | CH-001, CH-002 | `src/example/service.py`, `tests/example/test_service.py` | `src/unrelated/**` | FR-001, NFR-001, AC-001 | `<focused command or manual check>` | pending |

### Parallelization Rationale

<Explain why each non-Serial group has independent dependencies, modification targets, interfaces, and validation. Use Serial when uncertain.>

### Final Integration

<Commands or evidence that verify interactions across slices and all acceptance criteria.>

## 9. Validation, Rollout, and Risk

### Validation Plan

- <Focused tests, builds, static checks, and manual evidence mapped to requirement or AC IDs.>

### Minimality and Style-Fidelity Review

- <How the reviewer will confirm every production change is necessary, reuse is real, budgets are respected, and local style is preserved.>

### Rollout and Rollback

<Feature flag, deployment/migration order, monitoring, rollback, or “No special rollout” with evidence.>

### Risks and Mitigations

| Risk | Impact | Mitigation or Evidence |
| --- | --- | --- |
| <Risk> | <Impact> | <Mitigation> |

## 10. Revision and Progress

### Design Revision History

| Revision | Timestamp | Trigger | Changes | Decision IDs | Question IDs |
| --- | --- | --- | --- | --- | --- |
| 1 | <ISO-8601 timestamp> | initial-repository-design | <Created the first concrete implementation hypothesis and question set.> | D-001, D-002 | Q-001 |

### Implementation Progress Record

| Timestamp | Spec revision | Slice | State | Evidence or Notes |
| --- | --- | --- | --- | --- |
| <ISO-8601 timestamp> | 1 | — | refining | Living pair created before the first clarification question. |
