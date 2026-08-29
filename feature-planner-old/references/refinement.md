# Refinement and Implementation Design

Use this guide to discover the feature contract and the smallest project-conventional implementation. Use `living-spec.md` for document lifecycle and `minimal-change.md` for preservation rules.

## 1. Inspect Before Asking

Inspect only the surfaces needed to make current questions concrete:

- applicable `AGENTS.md`, ADRs, prior specs, and local docs;
- the nearest analogous entry point and primary flow;
- the owners of business logic, state, persistence, authorization, validation, and errors;
- reusable functions, components, hooks, services, schemas, fixtures, and test helpers;
- focused tests and commands that validate the area;
- relevant configuration, rollout, migration, and compatibility anchors.

Record concrete paths and symbols. Prefer one to three close exemplars over a broad survey. Use read-only explorer subagents only for separable mapping. Do not ask the user for repository facts you can establish yourself.

## 2. Build the Current Implementation Hypothesis

Before each question round, update the living spec with:

1. **Current pattern** — how the closest comparable behavior works.
2. **Must preserve** — ownership, flow, style, contracts, and dependencies that should remain.
3. **Reuse inventory** — existing assets to call or extend.
4. **Current recommended flow** — the smallest concrete entry-to-validation path.
5. **Exact modification hypothesis** — files, symbols, actions, exclusions, and budgets.
6. **Slice hypothesis** — small independently reviewable checkpoints.
7. **Potential divergence** — why changing project direction might be materially better, if applicable.

This is a real current plan, not a set of blank fields. If an open question changes it, the Question Register must state what would change.

## 3. Materiality Test

Ask the user only when the answer can change one or more of:

- observable behavior, users, UX states, or success evidence;
- public API, data model, persistence, migration, or compatibility;
- permissions, privacy, audit, abuse controls, or secrets;
- validation, errors, retries, idempotency, concurrency, ordering, or recovery;
- configuration, observability, rollout, rollback, or operational risk;
- current module ownership or project direction;
- exact target files/symbols, new artifacts, or patch budget;
- slice boundaries, dependencies, parallel safety, or acceptance evidence.

Resolve naming, formatting, file placement, and similar details yourself when the nearest local convention supplies a safe reversible answer. Record those choices as agent decisions when they materially affect the plan.

## 4. Question Contract

Ask one to four related questions per round. Each question must contain:

1. **Repository evidence** — what the inspected code and current document establish.
2. **Current recommendation** — the smallest option that preserves project direction.
3. **Material alternatives** — only options with different behavior, risk, maintenance cost, or direction.
4. **Document impact** — which decision, requirement, modification, budget, or slice IDs would change.
5. **One precise request** — a choice the user can answer without guessing hidden implementation context.

Example:

```markdown
The current plan in revision 4 extends
`src/orders/service.ts::apply_action`, matching the existing transaction and
error path. It changes one production file and adds no dependency. This is
recorded in D-006, CH-001, and WS1.

Which public contract should the finalized design use?

1. Extend `POST /orders/:id/actions` — recommended; keeps the existing route family and current one-file production budget.
2. Add `POST /orders/:id/cancel` — clearer standalone contract, but adds a route and client contract and changes CH-001/WS1.
3. Another contract — describe the required difference.
```

Avoid generic prompts such as “How should this work?” when repository evidence supports concrete options.

## 5. Decision Provenance

Use stable `D-001`, `D-002`, ... IDs.

- User answers become `Source: user`, `User review: confirmed`.
- Concrete repository facts become `Source: repository`, `User review: not-required`.
- Low-risk agent choices become `Source: agent`, `User review: review-needed` until final confirmation.
- Superseded choices remain in the ledger with `Status: superseded`, `User review: overridden`.

Do not use agent choice to decide public behavior, security semantics, irreversible migration, production dependency, material scope, or project-direction change.

## 6. Preservation and Direction Gate

Classify the current strategy:

- `preserve` — follows the closest established ownership, flow, dependencies, and style;
- `user-approved-divergence` — intentionally changes project direction after explicit approval.

Select the preservation path as the current recommendation when it is sufficient. If a divergence may be better, document both paths and ask before selecting it. Include exact benefits, extra files/layers/dependencies, migration surface, compatibility risk, and long-term consequence.

If the user rejects the divergence, record it as a rejected alternative or non-goal so workers cannot reintroduce it.

## 7. Modification Design Gate

For each intended write, define a Modification Map row with:

- exact repository-relative target file;
- target symbol or `file-level`;
- action: `reuse`, `extend`, `edit`, `add`, or `remove`;
- nearest existing anchor to follow;
- smallest required change;
- requirement-backed necessity;
- owner slice;
- direction classification.

A `reuse` row authorizes no write. A new production file requires an `add` row, analogous anchor, explicit budget, and—when it changes project direction—user approval. Do not use broad directory globs when inspection can identify exact files.

Set the smallest realistic per-slice Change Budget. Default new production files, dependencies, and shared abstractions to `None`. Production-line estimates are expansion alarms, not code-compression targets.

## 8. Slice Design Gate

Slice by independently reviewable behavior and write ownership.

Each `WSx` must:

- deliver one coherent checkpoint;
- own specific `CH-xxx` rows;
- have bounded write scope and explicit exclusions;
- cover named `FR-`, `NFR-`, and/or `AC-` IDs;
- have focused validation that can pass before unrelated later work;
- leave the repository coherent;
- be small enough for a fast implementation → review → correction loop;
- have a budget small enough to expose over-implementation quickly.

Split again when one worker would cross unrelated modules, unstable contracts, several new abstractions, or validation that depends on unrelated work. Keep tests with the behavior they validate when practical.

Use a non-Serial parallel group only when slices have no dependency path, modification targets/scopes are disjoint, shared interfaces are already stable, and validation is independent. When uncertain, use `Serial`.

## 9. Review-Ready Gate

The document is ready for the final user question only when it states without placeholders:

- outcome, scope, non-goals, users, and observable behavior;
- requirements and binary or measurable acceptance criteria;
- relevant API, data, state, permission, failure, concurrency, compatibility, and rollout contracts;
- repository baseline and reuse inventory;
- selected strategy and direction, including user approval for any divergence;
- exact modification map, exclusions, and conservative budgets;
- small work slices with dependencies, scopes, coverage, validation, and justified parallel groups;
- validation, rollback, and material risks;
- no open Question Register row or open Decision Ledger row.

The full plan must already be written in both documents. Run `specctl.py review-ready` before asking the final domain question.

## 10. Targeted Refinement

During implementation, reopen only the discovered gap. Preserve unaffected decisions and verified slices.

Use targeted refinement when:

- required behavior or a contract is missing;
- an exact target or owner differs from repository reality;
- the honest minimal patch exceeds the reviewed budget;
- a new file, dependency, abstraction, or layer appears necessary;
- preserving direction is materially worse and divergence should be considered.

Update the living pair and show the revision delta before asking the targeted question. Any material change clears `reviewed_revision`. Resume only after the changed revision is explicitly reviewed. Re-run the broad final domain gate only when scope is materially expanded or redefined.
