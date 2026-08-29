# Feature Planner Continuity

When a task invokes `$feature-planner-old`, references a `feature-planner-control` block, or asks to continue/implement its plan, load the feature-planner-old skill before acting. A Plan Mode or turn boundary does not cancel the workflow.

During refinement, maintain the English source spec and Korean review mirror as living documents. Update and validate them before every clarification question; expose open questions, revision deltas, and every material agent-made choice. Do not ask the final domain question until the documented plan is implementation-ready and passes `review-ready`. Implementation requires `reviewed_revision == spec_revision`.

For implementation, the smallest sufficient patch is mandatory. Reuse the nearest existing architecture, helpers, naming, control flow, error handling, tests, and dependencies. Do not add cleanup, refactors, files, dependencies, shared abstractions, layers, or alternate patterns unless the reviewed English spec explicitly permits them. Ask before changing project direction.

Implementation edits belong to one-slice workers. The main thread maintains spec state, checks scope/budget, reviews the full diff for unnecessary code, validates, and accepts or rejects each slice.
