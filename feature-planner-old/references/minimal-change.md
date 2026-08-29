# Minimal-Change Policy

This policy is authoritative for implementation strategy, slice design, worker delegation, and diff acceptance.

## 1. Objective

Deliver the requested behavior with the least new production code and the smallest reviewable change that remains clear, correct, and consistent with the repository. Minimality does not mean dense code, skipped validation, or hidden behavior. It means no implementation surface beyond what the approved outcome requires.

## 2. Preservation Order

Evaluate options in this order and stop at the first sufficient one:

1. Use existing behavior, configuration, data, or an extension point with no production-code change.
2. Reuse an existing function, component, service, hook, command, schema, fixture, or test helper.
3. Extend the nearest existing owner with a narrow branch or parameter that matches its current style.
4. Add a small local implementation beside the nearest analogous code.
5. Add a local helper only when it removes real duplication introduced by the approved feature and matches local practice.
6. Add a shared abstraction, new layer, dependency, framework, or replacement pattern only after explicit user approval of a project-direction change.

Do not choose a later option because it looks cleaner, more generic, or more future-proof in isolation.

## 3. What “Current Project Direction” Means

Use the closest relevant code, not a generic industry preference. Record evidence for:

- ownership and module boundaries;
- entry points and control/data flow;
- state and persistence ownership;
- naming, typing, validation, error, retry, and concurrency patterns;
- component, styling, routing, and data-fetch conventions;
- test location, fixture style, mocking level, and assertion style;
- dependency and configuration choices;
- applicable root and nested `AGENTS.md`, ADRs, and local documentation.

Prefer the nearest analogous implementation and its tests. When local conventions conflict, the convention closest to the target directory and behavior wins unless the user approves a direction change.

## 4. Forbidden by Default

Unless required by the approved spec, do not:

- refactor, rename, reorder, reformat, or document unrelated code;
- replace an incumbent pattern or move ownership between layers;
- create a generic framework, base class, registry, adapter, wrapper, utility, or shared helper for hypothetical reuse;
- add a new dependency when an existing dependency or small local implementation suffices;
- add a new production file when the nearest owner can absorb the behavior cleanly;
- duplicate an existing helper, component, validation rule, error type, fixture, or test setup;
- add compatibility layers, defensive branches, flags, logging, metrics, comments, or configuration not required by the contract;
- expand tests into redundant matrices or new scaffolding when focused cases and existing helpers prove the acceptance criteria.

Preserve unrelated user changes exactly.

## 5. Direction-Change Gate

Treat an option as a project-direction change when it would materially:

- introduce or remove an architectural layer;
- move state, persistence, authorization, validation, or transaction ownership;
- replace or bypass an established component/service/data-access pattern;
- add a production dependency, framework, shared abstraction, central registry, or new public contract family;
- rewrite a substantial existing path or require a migration across unrelated modules;
- establish a new pattern future code would be expected to follow.

Do not silently select that option. Ask the user with repository evidence:

1. **Preserve direction — recommended default.** Describe the smallest conforming patch, its limitations, and exact modification surface.
2. **Change direction.** Describe the proposed new direction, concrete benefit, migration or maintenance cost, compatibility risk, and broader modification surface.
3. **Another constraint.** Let the user specify a different boundary.

A direction change requires a resolved decision whose `Source` is `user`. Record it in the control block and limit the approved divergence to exact modification-map rows. Approval is not permission for unrelated modernization.

## 6. Required Design Evidence

Before the final review question, the living English spec must contain:

- a **Repository Pattern Baseline** identifying the current direction and what must remain unchanged;
- a **Reuse Inventory** naming existing assets the implementation will call or extend;
- a selected strategy classified as `preserve` or `user-approved-divergence`;
- a **Modification Map** identifying exact target paths and symbols, action, existing anchor, required change, necessity, owner slice, and direction;
- a per-slice **Change Budget** bounding changed files, production files, new production files, production additions, dependencies, and shared abstractions.

Use exact files and symbols whenever repository inspection can identify them. Broad directory globs are scopes, not substitutes for a modification design.

## 7. Living Design Evidence

The preservation-first recommendation must be visible in the living spec before the user answers each material question. Keep the current exact targets, reused anchors, expected additions, and budget in the document even when the recommendation is provisional. Record any low-risk implementation choice made by the agent as a reviewable agent decision; do not hide it as an assumption.

When a user correction invalidates the current minimal path, remove the obsolete path from the active Modification Map and slices rather than leaving multiple implementations authorized. Preserve the old choice only in the decision and revision history.

## 8. Change Budget Rules

Budgets are expansion alarms:

- Set the smallest realistic budget supported by the design. Default new production files, dependencies, and shared abstractions to none.
- `Max production added lines` is an estimate for detecting an unexpectedly large implementation. Never compress code, combine unrelated responsibilities, or reduce clarity to fit it.
- A worker must stop before an unapproved budget expansion and return `PATCH_BUDGET_GAP`.
- The main agent may correct an obviously inaccurate estimate without asking only when repository evidence proves the same approved strategy and direction remain intact. Otherwise use targeted refinement; ask the user when the expansion changes direction, maintenance burden, public behavior, or risk.

## 9. Minimality Acceptance Review

After correctness checks, perform a deletion-oriented review:

- Can any changed file be removed from the patch?
- Can any new production line, branch, helper, type, comment, configuration key, or test fixture be removed while all requirements still pass?
- Does an existing asset already provide the behavior?
- Did the patch copy a pattern instead of calling or extending it?
- Did it introduce an abstraction with one caller or speculative extension points?
- Did it touch code only for cleanup, aesthetics, consistency outside the target, or future work?
- Does the code look native to the nearest existing implementation?

Reject or trim the patch when the answer exposes unnecessary work. Keep enough focused tests and validation to prove the contract; minimize implementation surface, not evidence quality.
