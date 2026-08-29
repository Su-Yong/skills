# Implementation Orchestration

Use this guide only for a reviewed living spec pair. The main agent orchestrates and verifies; implementation workers edit source code one slice at a time.

## 1. Entry Gate

Before implementation:

1. Read the authoritative English spec in full.
2. Confirm the control block has:
   - `workflow: feature-planner/v7`;
   - `state: ready` or `implementing`;
   - `reviewed_revision == spec_revision`;
   - `final_domain_gate: confirmed_none`;
   - no open question IDs;
   - no active `review-needed` agent decisions.
3. Run `specctl.py validate` and stop on any failure.
4. Run `specctl.py ready` to identify dependency-ready slices and target/scope-disjoint parallel candidates.
5. Inspect the working tree and preserve unrelated user changes.

Do not start from a stale revision or silently translate a chat update into implementation. Material plan changes belong in the living pair and require review first.

## 2. Slice Scheduling

A slice may start only when:

- its status is `pending`;
- every dependency is `verified` or justified `skipped`;
- its Modification Map rows and budget are exact;
- the working tree does not contain an unresolved conflicting change;
- the main agent has confirmed its validation can run at the checkpoint.

Assign exactly one slice per implementation worker. Keep tests with the behavior they validate when practical.

Parallelize only when all candidate slices:

- share one non-Serial parallel group;
- have no dependency path between them;
- own disjoint exact modification targets and non-overlapping write scopes;
- do not concurrently modify migrations, schemas, generated registries, lockfiles, central exports, or unstable shared interfaces;
- have independent focused validation;
- can be integrated and reviewed immediately after both finish.

When uncertain, execute serially. Faster review loops are more important than speculative parallelism.

## 3. Worker Delegation

Use `assets/worker-task-template.md`. Pass:

- exact English spec path and reviewed revision;
- one `WSx` row;
- its owned `CH-xxx` rows;
- its Change Budget;
- relevant baseline and reuse entries;
- covered requirement and acceptance text;
- allowed writes and do-not-touch scope;
- focused validation;
- unrelated working-tree changes that must be preserved.

The worker may implement only the assigned slice. It must not edit the spec pair or delegate recursively.

## 4. Per-Slice Verification Loop

After a worker returns:

1. **Read the report and full diff.** Do not accept a summary without inspecting actual changes.
2. **Classify every changed file.** Each must be owned by a non-reuse Modification Map row for the slice.
3. **Run scope validation.** Use `specctl.py check-scope` with all changed paths.
4. **Run patch-budget validation.** Use `specctl.py check-patch`, including new files, production added lines, dependencies, and shared abstractions.
5. **Verify repository-pattern fidelity.** Compare the patch with the named anchors and nearest analogous tests.
6. **Perform deletion-oriented minimality review.** Remove or reject code not required by a mapped requirement/acceptance criterion.
7. **Run focused validation.** Execute the slice command and the smallest relevant static/build checks.
8. **Use a read-only reviewer** when available for correctness, regression, style fidelity, and over-implementation.
9. **Accept or repair.** Mark `verified` only after all gates pass. Otherwise send the same worker precise findings and request the smallest correction.
10. **Update progress.** Change English slice/control/progress state first, then synchronize Korean. Progress-only changes do not increment `spec_revision`.

Passing tests alone is insufficient. A correct but unnecessary abstraction, file, dependency, branch, or cleanup is a failed slice.

## 5. Worker Result Routing

- **COMPLETE** — run the full verification loop.
- **BLOCKED** — record the environmental or dependency blocker; do not claim completion.
- **SPEC_GAP** — pause the affected slice and enter targeted refinement.
- **PATCH_BUDGET_GAP** — inspect whether the current strategy is still minimal. If the estimate alone was wrong and repository evidence proves the same reviewed design, update the pair and obtain review of the new revision before resuming. Otherwise refine.
- **DIRECTION_CHANGE_PROPOSAL** — do not implement it. Show the user the preservation option and direction-changing option with exact extra surface and risk.

Allow at most two correction cycles for the same finding set. Then re-slice, reassign, or refine instead of replaying the same request.

## 6. Targeted Refinement During Implementation

1. Pause only affected slices and preserve independent verified work.
2. State the gap, repository evidence, affected IDs, and smallest conforming recommendation.
3. Update the English living spec before asking; increment `spec_revision`, clear `reviewed_revision`, synchronize Korean, and show the delta.
4. Ask only questions required for the affected domain.
5. Apply the answer to decisions, requirements, strategy/direction, modifications, budgets, acceptance criteria, risks, and affected slices.
6. Run state validation and review-readiness for the changed revision.
7. Obtain explicit review of the changed revision. For a narrow targeted answer, the answer itself may confirm the affected revision; for material scope expansion, rerun the broad final domain gate.
8. Restore `reviewed_revision == spec_revision`, validate strictly, and resume from the affected ready slice.

Never resume from a spec revision the user has not had an opportunity to inspect.

## 7. Final Integration

After all required slices are verified:

- run cross-slice and repository-level checks required by the plan;
- verify every acceptance criterion has evidence;
- perform one final deletion-oriented review across the complete feature;
- confirm no redundant file, helper, abstraction, dependency, formatting churn, or rejected direction change remains;
- verify compatibility, rollout/rollback, and unresolved risks;
- set `state: complete`, clear `active_slices`, set `next_action: none`, and synchronize both specs.

Lead the final response with the implemented outcome. Then report material file changes, reuse/minimality evidence, validation, slice/spec status, and real limitations. Do not repeat the full design document.
