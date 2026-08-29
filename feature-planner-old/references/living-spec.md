# Living Spec Workflow

Use this guide during REFINE, FINAL_REVIEW, and any targeted refinement. Its purpose is to make the evolving design inspectable and correctable before implementation.

## 1. Document-Before-Question Invariant

After the first focused repository inspection, create both files before asking a clarification question:

- authoritative English source: `<slug>-spec.md`;
- Korean review mirror: `<slug>-spec.ko.md`.

Before every later question, the pair must already contain the current best answer to all of these:

- what is being built and what is excluded;
- what repository patterns and reusable assets were found;
- what the user decided;
- what the agent decided and why;
- what remains open and why it matters;
- the currently recommended implementation flow;
- exact planned files/symbols and minimal actions;
- expected change budget and work slices;
- validation, rollout, rollback, and risks.

A question may change that plan, but the user must be able to inspect the plan that the agent is currently recommending before answering.

## 2. First Draft Checkpoint

Before the first question:

1. Inspect enough of the nearest analogous flow and tests to form a concrete preservation-first hypothesis.
2. Select repository-conventional spec paths.
3. Create the English source from `assets/spec-template.md` and a synchronized Korean mirror.
4. Set:
   - `workflow: feature-planner/v7`;
   - `state: refining`;
   - `spec_revision: 1`;
   - `reviewed_revision: null`;
   - `final_domain_gate: not_ready`;
   - `next_action: answer_questions`;
   - `open_question_ids` to the first question IDs.
5. Write a complete current hypothesis rather than placeholders. Open choices belong in the Question Register; the rest of the document shows the recommended outcome if that recommendation is selected.
6. Add revision-history row 1 and run `specctl.py validate`.
7. Show the user the paths, revision, key design footprint, agent choices awaiting review, and first question batch.

If the repository cannot be written, present the full draft pair in the response and identify the intended paths. Do not pretend files were created.

## 3. Per-Round Transaction

Treat each question round as one document transaction.

### Before asking

1. Incorporate all repository evidence and prior answers.
2. Update the current strategy, modification map, budget, slices, and validation consequences.
3. Add or revise Question Register rows.
4. Add every material agent-made choice to the Decision Ledger.
5. Increment `spec_revision` when the design, questions, or decision set materially changes.
6. Append one Design Revision History row describing the delta and affected IDs.
7. Update the Review Snapshot.
8. Synchronize the Korean mirror.
9. Run `specctl.py validate` and optionally `specctl.py status`.

### Then show and ask

The question message is a **document checkpoint**, not a chat-only summary. Use this shape in the user’s language:

```text
Design revision <N> updated
Documents: <English path>, <Korean path>

Current review snapshot
<render the current Review Snapshot values from the documents>

Changed document rows
<render the exact changed Decision Ledger, Question Register, Modification Map,
Change Budget, or Work Plan rows; use IDs and the document wording>

Agent decisions awaiting review
<render every active review-needed agent decision with ID, choice, evidence/rationale,
and implementation impact, or “None”>

Questions
<Q-ID, repository evidence, recommendation, alternatives, and the exact document
sections/IDs affected by the answer>
```

Always show the current Review Snapshot and the exact rows materially changed in this revision. Do not replace them with a vague prose recap. The user must be able to challenge a decision by stable ID without opening the files. Do not paste unchanged sections or the entire document unless requested; provide both paths so the complete English source and Korean mirror remain inspectable.

### After the answer

Apply the answer and every downstream consequence before the next question. Never acknowledge an answer in chat while leaving the design stale.

## 4. Decision Provenance

Use the Decision Ledger sources precisely:

- `user` — the user explicitly selected or corrected the decision;
- `repository` — the decision is a concrete fact established by code, tests, instructions, or local docs;
- `agent` — the agent selected a low-risk, reversible, repository-supported implementation detail without asking.

An agent decision must include:

- the exact chosen behavior or implementation detail;
- repository evidence or rationale;
- its effect on files, behavior, risk, or patch size;
- `User review: review-needed` until the user explicitly accepts it or confirms the final domain gate.

List all active `review-needed` decisions in the Review Snapshot. Do not hide them in prose.

An agent decision may not authorize a project-direction change, material public behavior, security/permission semantics, irreversible migration, production dependency, or substantial scope expansion. Ask the user instead.

## 5. User Correction Protocol

The user may challenge any fact, decision, strategy, file target, slice, or budget by referring to the documents or describing the issue.

When corrected:

1. Identify affected decision, question, requirement, strategy, change, budget, slice, validation, risk, and rollout IDs.
2. Preserve history:
   - mark the old decision `superseded` with `User review: overridden`;
   - create a new resolved `user` decision with a new stable ID;
   - mark an obsolete question `withdrawn` or `answered` with the resolution.
3. Recompute the current design from the correction; do not patch only the sentence the user noticed.
4. Remove obsolete modification rows and slice work. Do not leave both old and new implementation paths authorized.
5. Increment `spec_revision`, append a revision-history row, update the snapshot, and synchronize Korean.
6. Revalidate and show the exact design delta before the next question.

Never silently rewrite an agent decision as though the user had always selected it.

## 6. Question Register

Create a stable `Q-001`, `Q-002`, ... row for each material question.

- `open` — awaiting an answer; must appear in `open_question_ids`.
- `answered` — resolved by a current Decision Ledger row.
- `withdrawn` — no longer material; explain why.

The current recommended answer must be visible in the row and reflected in the provisional strategy. This lets the user understand what the agent would implement if the recommendation is accepted.

## 7. Revision Discipline

Increment `spec_revision` when any of these changes:

- outcome, scope, requirement, acceptance criterion, or non-goal;
- decision or question content/status;
- repository baseline or reuse plan that changes implementation;
- selected strategy or direction;
- modification target/action, budget, slice, dependency, or validation;
- rollout, rollback, risk, or compatibility contract.

Do not increment for implementation progress-only status changes.

Every revision must have one Design Revision History row. `reviewed_revision` remains `null` while refining. A ready/implementing/complete spec requires `reviewed_revision == spec_revision`.

## 8. Final Review Checkpoint

Do not ask the final domain question until:

- every Question Register row is `answered` or `withdrawn`;
- no decision is `open`;
- the current design is complete and internally consistent;
- the exact modification map, budgets, slices, and validation plan are ready for workers;
- `specctl.py review-ready <english-spec>` passes.

Set the control block to:

```json
{
  "state": "refining",
  "reviewed_revision": null,
  "final_domain_gate": "required",
  "open_question_ids": [],
  "next_action": "review_final_draft"
}
```

Present the documents and summarize:

- current outcome and non-goals;
- selected implementation strategy and why it is minimal;
- production files/symbols to change;
- any new file, dependency, shared abstraction, migration, or direction divergence;
- slice order and safe parallel candidates;
- material risks and rollout;
- every agent decision still marked `review-needed`.

Then ask whether the user wants to refine any domain or documented decision. A “none” answer accepts the current revision, including the visible agent decisions.

## 9. Transition After “None”

Do not regenerate the plan. Perform only the review-state transition:

1. Change active agent decisions from `review-needed` to `confirmed`.
2. Set `reviewed_revision` equal to the unchanged `spec_revision`.
3. Set `final_domain_gate: confirmed_none`.
4. Set `state: ready`.
5. Set `next_action` to `implement` when implementation is already authorized, otherwise `await_implementation_request`.
6. Append a progress record for the review confirmation; a material revision-history row is not required because the design did not change.
7. Synchronize Korean and run strict `specctl.py validate`.

Any material edit after this transition increments `spec_revision`, clears `reviewed_revision`, and returns to refinement or targeted refinement before implementation can continue.
