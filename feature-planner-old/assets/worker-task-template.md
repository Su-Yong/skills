# One-Slice Minimal Implementation Task

Implement exactly one assigned work slice from the reviewed living spec. Do not implement adjacent slices, reinterpret an open question, or rewrite the feature plan.

## Authority

- English spec: `<path>`
- Reviewed spec revision: `<number; must equal control reviewed_revision and spec_revision>`
- Selected strategy and direction: `<STRAT-x; preserve or approved divergence>`
- Assigned slice: `<copy one WSx row exactly>`
- Modification rows: `<copy every CH-xxx row owned by the slice>`
- Change budget: `<copy the slice budget row exactly>`

## Contract Extract

- Current project patterns to preserve: `<paths/symbols and concise rules>`
- Existing assets to reuse: `<R-xxx entries and paths/symbols>`
- Requirements and acceptance criteria: `<covered IDs and exact text>`
- Allowed writes: `<paths/globs>`
- Do not touch: `<paths/globs plus unrelated user changes>`
- Validation: `<commands/checks>`

## Execution Rules

- Start from the named existing anchors. Follow their architecture, naming, control flow, state ownership, error handling, test style, and dependencies.
- Make the smallest clear patch that satisfies only this slice. Modify only mapped targets and symbols.
- Do not clean up, rename, reformat, generalize, future-proof, add unrelated defensive behavior, create a parallel abstraction, or change another slice.
- Do not add a production file, dependency, shared abstraction, layer, or public pattern unless the reviewed modification map and budget explicitly permit it.
- Treat the production-line budget as an expansion alarm. Do not compress code or reduce clarity to fit it.
- Run listed validation when possible. Do not modify the spec pair.
- Return `SPEC_GAP` for a missing behavior/contract decision, `PATCH_BUDGET_GAP` when the honest minimal patch exceeds the approved map or budget, and `DIRECTION_CHANGE_PROPOSAL` when a different project direction should be considered. Do not invent or implement those changes.

## Return Contract

```text
status: COMPLETE | BLOCKED | SPEC_GAP | PATCH_BUDGET_GAP | DIRECTION_CHANGE_PROPOSAL
slice: <WSx>
changed_files:
  - <repository-relative path>
new_files:
  - <repository-relative path or none>
reuse_evidence:
  - <existing asset actually reused or extended>
minimality_evidence:
  - <why each production edit is necessary and why no smaller conforming patch works>
budget:
  changed_files: <number>
  production_files: <number>
  new_production_files: <number>
  production_added_lines: <number>
  new_dependencies: <none or names>
  new_shared_abstractions: <none or names>
implemented:
  - <behavior or focused test>
validation:
  - command: <command>
    result: PASS | FAIL | NOT_RUN
    evidence: <key output or exact reason>
gap_or_proposal: <none or exact missing decision/budget expansion/direction proposal>
notes: <scope, compatibility, or blocker notes>
```
