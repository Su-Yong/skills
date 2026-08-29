---
name: feature-planner-old
description: Use when the user invokes `$feature-planner-old`, asks to refine a feature into an implementation-ready plan, references a `feature-planner-control` spec, or asks to continue or implement a feature-planner plan. Maintain a living English `*-spec.md` plus Korean `*.ko.md` from the first question onward; update the pair before every question with repository evidence, user choices, explicit agent-made decisions, exact minimal-change targets, budgets, and small worker slices. The final question is asked only after that documented plan is implementation-ready. Then orchestrate one-slice workers and verify the smallest project-conventional patch. Ask before changing the project direction.
---

# Feature Planner

Turn an ambiguous feature request into a user-reviewable living design, then implement the smallest verified patch that follows the current project.

## Non-Negotiable Outcomes

- **The design exists before the first clarification question.** After focused repository inspection, create the English source spec and Korean review mirror. Never keep the evolving plan only in chat.
- **Update the design before every question.** The documents must already reflect all known facts, the current recommended implementation, affected files/symbols, provisional slices, open questions, and every agent-made choice.
- **Expose agent judgment.** Record each material choice made without a direct user answer as `Source: agent`, with rationale, impact, and `User review: review-needed`. Never present an agent choice as a user choice or repository fact.
- **Corrections are first-class.** When the user finds a wrong assumption or choice, preserve the audit trail, supersede the old decision, record the replacement, and update every affected requirement, strategy, modification, budget, slice, and validation item.
- **The final question reviews an implementation-ready document.** Before asking it, the pair must contain the complete implementation plan and pass the review-ready validator. A “none” answer changes review/control state only; it must not trigger a new planning pass.
- **Minimum code is a correctness criterion.** Prefer no production change, then reuse, then a narrow extension of the nearest existing owner. Add files, dependencies, shared abstractions, layers, or new patterns only when the reviewed spec explicitly permits them.
- **Preserve project direction by default.** Follow the closest local architecture, naming, control flow, state ownership, error handling, tests, and dependencies. Ask before replacing or bypassing those patterns.
- Finalize one authoritative English source and one synchronized Korean mirror. Workers and reviewers use the English source.
- Delegate implementation edits to bounded one-slice workers. The main agent owns refinement, document state, orchestration, diff/minimality review, validation, and acceptance.

Read `references/minimal-change.md` whenever choosing an implementation approach, writing modification rows, delegating code, or reviewing a diff.

## Authorization

- Planning, refining, reviewing, explaining, or diagnosing authorizes repository inspection and writes to the living spec pair, not implementation-file edits.
- Build, change, fix, start, continue, implement, or “go ahead” authorizes in-scope implementation only after the pair is reviewed and `state: ready`.
- Read files, use read-only explorers, maintain the pair, inspect diffs, and run non-destructive validation without separate approval.
- Ask before destructive actions, external writes, irreversible migrations, production dependency additions, material scope expansion, or a project-direction change.

## Workflow Routing

Infer the workflow from the request and control block. Do not ask the user to choose a mode.

1. **REFINE** — the pair does not exist, open questions remain, agent choices still need review, or the documented implementation design is incomplete.
2. **FINAL_REVIEW** — no material question remains and the current document is implementation-ready, but the final domain gate is not confirmed.
3. **IMPLEMENT** — the current spec revision is user-reviewed, validated, and implementation is authorized.
4. **TARGETED_REFINE** — implementation exposed a specific behavior, target, budget, or direction gap; reopen only that domain and keep unaffected verified work.

A decision is material when it can change observable behavior, a public contract, persistence, permission/security, failure/concurrency semantics, compatibility/rollout, module ownership, project direction, exact modification targets, patch size, slice boundaries, or acceptance evidence.

## REFINE

Read `references/living-spec.md`, `references/refinement.md`, and `references/minimal-change.md`.

1. Inspect the nearest analogous production path and tests. Resolve repository facts before asking the user.
2. Choose the spec paths and create both living documents before the first clarification question. Use `assets/spec-template.md` as the English structure and translate it into the Korean mirror.
3. Build the current best preservation-first design. It may be provisional, but it must be concrete and internally coherent—never placeholders or a chat-only outline.
4. Before each question batch, update English first, synchronize Korean, increment `spec_revision` for material changes, append a revision-history row, update the Review Snapshot, and run draft validation.
5. Record user answers, repository facts, and agent decisions with distinct sources. Agent decisions remain visibly reviewable until explicitly corrected or accepted by the final gate.
6. Show a document checkpoint in the user’s language: both paths, revision, current Review Snapshot, exact materially changed rows, all agent choices awaiting review, and open question IDs. The user must be able to correct the plan by stable ID without opening the files. Then ask one to four related, repository-informed questions.
7. Apply each answer and all cascading design changes to the pair before asking the next question. If the user corrects the document, use the correction protocol in `references/living-spec.md`.
8. Continue until no material question remains and the pair contains the complete minimal implementation strategy, modification map, budgets, small slices, and validation plan. Then enter FINAL_REVIEW.

## FINAL_REVIEW

Read `references/spec-contract.md` and `references/living-spec.md`.

1. Set the pair to the review checkpoint: `state: refining`, no open questions, `final_domain_gate: required`, and `next_action: review_final_draft`.
2. Run `python <skill-path>/scripts/specctl.py review-ready <english-spec>`. Fix every failure before asking the final question.
3. Present the current revision and a compact review summary: outcome, selected strategy, production targets, new files/dependencies/abstractions, slice order/parallel candidates, risks, and all `review-needed` agent decisions. Point to both documents.
4. Ask, in the user’s language: whether any additional domain or any documented decision should be refined; tell the user to answer “none” when the document is correct.
5. If the user identifies a problem, reopen only the affected domain, update the pair, and repeat FINAL_REVIEW.
6. If the user says none, mark remaining agent decisions `confirmed`, set `reviewed_revision` equal to `spec_revision`, set `final_domain_gate: confirmed_none`, and transition to `ready`. Do not redesign the plan at this point.
7. Run strict `specctl.py validate`. If implementation is authorized and edits are available, enter IMPLEMENT; otherwise provide a durable `$feature-planner-old Implement <english-spec>` handoff.

## IMPLEMENT

Read `references/implementation.md`, `references/minimal-change.md`, and the authoritative English spec in full. Do not replace it with a broader chat-only plan.

1. Require `reviewed_revision == spec_revision`, validate the pair, and query ready slices with `specctl.py ready`.
2. Assign exactly one ready slice to each implementation worker using `assets/worker-task-template.md`.
3. Parallelize only proven-independent slices with disjoint mapped targets, stable shared interfaces, and independent validation.
4. For every worker result, inspect the full diff; run scope and patch-budget checks; verify reuse, project-pattern fidelity, and deletion-oriented minimality; then run focused validation. Passing tests is insufficient when the patch is larger than necessary.
5. If a worker needs an unplanned target, dependency, abstraction, budget expansion, or direction change, do not let it improvise. Enter TARGETED_REFINE when material.
6. Mark a slice `verified` only after correctness, scope, minimality, style fidelity, and validation pass. Update English progress first, then Korean.
7. Run final integration checks and set the pair to `complete` only after every required slice is verified.

If no worker-subagent mechanism exists, do not silently implement in the main thread. Report the blocker and provide prepared one-slice worker prompts.

## Completion Bar

Finish only when the current reviewed spec revision validates; every requirement and acceptance criterion is covered; every required slice is verified or explicitly blocked/skipped with rationale; all writes match the modification map and budget; the patch follows existing project direction and style; no unnecessary production code, file, dependency, abstraction, or unrelated edit remains; relevant checks pass or exact limitations are recorded; and control/progress state matches reality.

## Resources

- `references/living-spec.md` — document-before-question loop, visible agent decisions, corrections, revisioning, and final review.
- `references/refinement.md` — evidence-led questions, implementation design, slicing, and materiality.
- `references/minimal-change.md` — preservation hierarchy, direction-change gate, budgets, and minimality review.
- `references/spec-contract.md` — bilingual authority, lifecycle state, exact tables, and validators.
- `references/implementation.md` — delegation, patch acceptance, repair routing, and completion.
- `assets/spec-template.md` — living/final English source structure.
- `assets/worker-task-template.md` — bounded one-slice worker task.
- `assets/AGENTS.feature-planner.md` — optional persistent continuity rule.
- `assets/codex-agents/` — optional GPT-5.6 implementer and reviewer configs.
- `scripts/specctl.py` — state-aware pair, review-readiness, question, coverage, scope, and budget checks.
