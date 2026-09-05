---
name: feature-planner
description: Create and maintain one provenance-aware living planning document while refining incomplete ideas, feature requests, service concepts, game systems, workflows, or project briefs through adaptive decision questions. Use for new planning, plan revision, pause/resume, or explicit finalization. Do not use to implement an approved plan or change code, deployments, packages, or external systems.
---

# Feature Planner

Turn an incomplete idea into a durable planning artifact without taking product
decisions away from the user. Treat the planning document—not the chat—as the
planning state and sole source of truth.

Use [the planning document template](assets/planning-document-template.md) as the
minimum semantic structure. Adapt it to the domain; never turn it into a fixed
questionnaire.

## Non-negotiable contract

1. **Document before question.** Create or fully draft the best planning hypothesis
   available before asking the first clarification question. A blank template does
   not satisfy this rule.
2. **Update before question.** After every later user message, save the answer and
   all downstream effects before asking anything else.
3. **One authoritative living document.** Maintain one current plan rather than a
   separate chat summary, scratch plan, and final plan.
4. **Explicit provenance.** Keep user decisions, sourced facts, agent assumptions or
   recommendations, and unresolved items visibly distinct.
5. **User-owned material decisions.** Recommend actively, but never silently settle
   a material product trade-off for the user.
6. **No automatic completion.** Only an explicit, unambiguous finish signal ends the
   planning interview.
7. **Planning is not execution.** Planning or approving a plan does not authorize
   implementation, deployment, installation, publishing, messaging, purchasing, or
   external-system changes.

## Model-specific behavioral corrections

The common workflow in this file always applies. Add at most one behavioral
profile; profiles do not replace this skill or define another planning workflow.
Within this skill, the common contract takes precedence over a profile. Follow the
host's instruction hierarchy and applicable user instructions; a profile never
adds authority, tools, or permission to execute the plan.

Select before the operating loop, using current model identity explicitly supplied
by the runtime or host when available:

| Current identity | Additional instructions to read |
| --- | --- |
| `gpt-6-astra` / `GPT-6 Astra` | [Astra behavioral corrections](references/gpt-6-astra.md) |
| `gpt-5.6-sol` / `GPT-5.6 Sol` | [Sol behavioral corrections](references/gpt-5.6-sol.md) |
| OpenAI's `gpt-5.6` alias | Sol profile; do not extend this mapping to custom provider aliases. |
| Unknown, unavailable, or any other model | Common workflow only. |

Match these names case-insensitively, not by broad family-prefix guessing. Do not
infer identity from writing style, task subject, historical chat, or a default
configuration that may not describe the current run. A model mentioned in a source
or request is not evidence that it is running.

When identity is unavailable, an explicit user or host selection such as
`feature-planner profile: astra` or `feature-planner profile: sol` may select that
profile. This selects instructions, not a model, and is not proof of model identity.
Otherwise continue with the common workflow without asking an identity question.
An explicit `feature-planner profile: common` disables the optional profile.

Read only the selected profile. Re-select when the runtime reports a model change;
the previous profile becomes inactive even if its text remains in context. Read
the current living document on handoff and preserve its path, revision, IDs,
provenance, interview state, and authorization. Never restart planning merely
because the model changed. A subagent uses its own supplied identity rather than
assuming the parent's model; its delegated task still bounds its work.

Do not change model settings, reasoning effort, invocation metadata, or the
planning-document schema to activate a profile. The profiles are additional prompt
instructions, not executable model detection. Read [profile maintenance notes](references/model-profile-maintenance.md)
only when maintaining or evaluating this skill, not during ordinary planning.

## Operating loop

Run this sequence for every planning request and every subsequent message:

1. Detect whether the message starts, answers, revises, skips, defers, pauses,
   resumes, or explicitly finishes a planning session.
2. Inspect all available context that can be read safely: supplied files, URLs,
   repository structure, existing specifications, relevant source and tests, and
   established project conventions. Do not ask the user for a fact that can be
   verified through this inspection.
3. Locate the current living document or choose its path. Follow an explicit user
   path first, then an existing project convention, otherwise use
   `<project-root>/docs/specs/<feature-slug>-spec.md`.
4. Create, load, or update the living document as a complete transaction.
5. Reconcile every affected section and run the consistency checks in this skill.
6. Save the document before communicating the next decision questions.
7. Show a compact checkpoint, then either ask the next material question round,
   pause, or finalize according to the user's control signal.

Never reverse steps 4–6. If the workspace is not writable, produce the complete
living document in the response, identify its intended path, and explicitly state
that it was not saved. The full draft must still precede the first question.

## Inspect evidence before asking

Use read-only inspection to reduce user burden. In an existing software repository,
inspect only what is relevant to the requested feature, such as data models,
authentication, APIs, UI patterns, configuration, tests, documentation, and naming
conventions. In a non-software project, inspect the supplied policies, workflows,
research, requirements, or other evidence instead.

Apply these evidence rules:

- Record a claim as a sourced fact only after actually verifying it.
- Include a revisitable source location: repository path and symbol/line when
  practical, document/section, or URL.
- Record inferences from evidence as agent assumptions or recommendations, not
  sourced facts.
- Record missing, inaccessible, contradictory, or stale evidence as unresolved.
- Preserve unrelated files and existing project conventions.
- Creating and updating the planning document is allowed; modifying product code or
  other execution artifacts is not.

## Establish the living document

### Resolve identity and path

- Reuse an existing plan only when its outcome or feature identity matches the
  request. Otherwise create a new descriptive slug and do not overwrite an
  unrelated document.
- During an active or paused interview, write the document in the user's working
  language.
- Reserve the base `.md` path for the authoritative English document at explicit
  finish. If the active document is not English, the same file may be rewritten in
  English during finalization; its Korean mirror is placed beside it as
  `<base-name>.ko.md`.
- Record project root, base path, Korean mirror path, working language, revision,
  timestamp, interview state, and next authorized action in `Document State`.

### Build the initial hypothesis

Before the first question:

1. State the best current outcome and context.
2. Identify known users and stakeholders.
3. Define current in-scope and out-of-scope boundaries.
4. Describe the most plausible core experience or operating flow.
5. Derive traceable requirements, constraints, success evidence, risks, and
   dependencies from current evidence.
6. Add verified facts as `SF-*`, explicit statements already made by the user as
   `UD-*`, defensible inferences as `AR-*`, and material gaps as `OI-*`.
7. Register the first `Q-*` entries that address only the highest-value remaining
   user decisions.

Do not leave placeholder prose such as “TBD” where a concrete hypothesis can be
made. When information is genuinely unknown, create an explicit unresolved item
with its consequence instead of pretending the plan is complete.

## Stable identifiers and provenance

Allocate monotonically increasing IDs within the document. Never renumber, recycle,
or repurpose an ID after it has appeared.

| Prefix | Meaning | Required treatment |
| --- | --- | --- |
| `UD-*` | User Decision | Only an explicit user choice, correction, or condition. |
| `SF-*` | Sourced Fact | Only evidence actually verified from a supplied or inspected source. |
| `AR-*` | Agent Recommendation or Assumption | Advice or inference; never imply user approval. |
| `OI-*` | Unresolved Item | Unknown, conflict, skipped item, deferred item, or blocked decision. |
| `RK-*` | Risk, conflict, or dependency | Material uncertainty or dependency and its response. |
| `R-*` | Requirement | Observable required behavior or outcome linked to source IDs. |
| `Q-*` | Decision Question | Stable interview question recorded before it is asked. |

Use lifecycle statuses rather than deletion. Appropriate statuses include
`active`, `proposed`, `open`, `answered`, `resolved`, `conflict`, `skipped`,
`deferred`, `corrected`, `superseded`, `cancelled`, and `blocked`.

Additional provenance rules:

- Every active requirement should link to at least one `UD-*`, `SF-*`, `AR-*`, or
  `OI-*`. Prefer an active user decision or sourced fact for normative requirements.
- Accepting an `AR-*` creates a new `UD-*`; do not rewrite the recommendation itself
  into a user decision.
- Resolving an `OI-*` preserves it with a `resolved` status and links the resolving
  decision or fact.
- Preserve the user's material wording in the ledger. Summaries elsewhere may be
  normalized for clarity without changing meaning.
- Never keep two mutually exclusive decisions or requirements active at once.

## Apply every user message as a document transaction

Before the next question, perform all of the following:

1. Parse the message for question answers, custom decisions, conditions, new facts,
   corrections, constraints, control commands, and finish intent.
2. Add or transition the relevant ledger and question-register entries.
3. Propagate the change through every affected area:
   - current snapshot and outcome;
   - users and stakeholders;
   - scope and non-goals;
   - core flow and alternate/error flows;
   - requirements;
   - constraints;
   - success evidence;
   - risks, conflicts, and dependencies;
   - open, skipped, and deferred items;
   - handoff and next authorized action.
4. Mark obsolete decisions, requirements, risks, and questions as corrected,
   superseded, resolved, or cancelled. Do not silently erase their history.
5. Record the revision and downstream changes in the correction/revision history.
6. Increment the revision, update the timestamp and interview checkpoint, and save.

A message may answer a question and introduce additional requirements at the same
time. Record both. Do not discard information merely because it did not follow the
suggested answer format.

## Handle corrections and conflicts

When the user changes an earlier decision:

1. Keep the old `UD-*` and mark it `corrected` or `superseded`.
2. Create a new active `UD-*` containing the replacement decision.
3. Link the two entries and record why the revision occurred.
4. Reconcile all dependent scope, flow, requirements, constraints, success evidence,
   risks, unresolved items, and questions.
5. Ensure no requirement based only on the old decision remains active.

When a new statement conflicts but does not clearly replace an earlier decision:

1. Record the conflict as an `OI-*` and, when material, an `RK-*`.
2. Mark affected requirements or decisions `blocked` or `conflict` as appropriate.
3. Save the document.
4. Ask exactly one focused conflict-resolution question before any unrelated
   refinement.

Never choose the winner silently.

## Select material questions adaptively

Do not run a universal survey. Derive questions from the current document and
prioritize material gaps in this order unless context justifies another order:

1. desired outcome;
2. primary users and stakeholders;
3. scope;
4. non-goals;
5. core experience or operating flow;
6. constraints;
7. success evidence;
8. risks and dependencies;
9. unresolved decisions;
10. handoff conditions and next authorized action.

Ask **one to three closely related questions per round by default**. Never exceed
five in one round, and use more than three only when the questions form one tightly
coupled decision set or the user explicitly requests a larger batch. Do not repeat
answered questions or ask for discoverable facts.

Register each question in the living document before presenting it. A question must
have a stable `Q-*`, impact, status, and related IDs so a later session can resume
without chat history.

### Question contract

Use this form:

```text
[Q-<number>] — <short decision title>
<why the decision matters and which behavior, scope, cost, quality, or risk it affects>

1. <materially distinct choice>
   <concise impact or trade-off when useful>
2. <materially distinct choice> — Recommended
   <evidence-based reason and when it fits>
3. <materially distinct choice>
   <concise impact or trade-off when useful>

You may answer with a number or write a different decision in free text.
```

Apply these rules:

- Offer three to five materially distinct viable choices when possible. If only two
  meaningful choices exist, show two and do not invent a third.
- A free-text path is always available and is not counted as one of the choices.
- Mark `Recommended` only when current evidence supports it. Explain the fit; do not
  manufacture a recommendation to appear decisive.
- A recommendation remains `AR-*` until the user chooses it.
- Default to single-select. State `Multiple selections allowed` only when a combined
  decision is coherent.
- Separate multiple questions with a clear divider and finish the round with a
  compact answer example such as `Q-001: 2, Q-002: custom decision`.

## Interpret answers flexibly

Accept all of the following without forcing the user to restate them:

- `2`, `2번`, or the exact choice label: select that choice.
- `2번인데 관리자는 사유를 남겨야 함`: select choice 2 and include the condition
  in the same user decision or a linked user decision when independently material.
- A free-text rule not present in the choices: preserve it as the user's custom
  decision.
- `Q-001: 2, Q-002: 3`: resolve multiple questions by stable ID.
- `1, 3`: treat as a combined answer only when that question was explicitly marked
  `Multiple selections allowed`.

When an answer is genuinely ambiguous, first record the ambiguity and its impact,
save the document, and then ask one focused resolution question. Do not use minor
wording uncertainty as a reason to ignore an otherwise clear decision.

## Honor interview controls

Controls may be expressed in any unambiguous language or natural phrasing.

- **Answer:** record the decision and propagate every consequence.
- **Skip:** mark the relevant `Q-*` skipped, retain an `OI-*` with what remains
  uncertain, and continue from other material gaps.
- **Defer:** mark the question and `OI-*` deferred; record impact, current
  recommendation if justified, owner when known, and a concrete revisit trigger.
- **Pause:** incorporate the entire current message, set interview state to
  `paused`, save a resumable checkpoint, report the path and remaining items, and
  ask no new questions. Pause is not finish.
- **Resume:** read the living document first, reconcile new evidence or repository
  changes, set state to `active`, and continue from unresolved or deferred items
  without repeating settled questions.
- **Finish / Done / Complete:** only when clearly directed at the planning session,
  incorporate the message, stop all additional questions, and finalize immediately.

Never infer finish merely because the document appears thorough. Confirmation,
trade-off, challenge, and omission questions may continue while useful, but the
session remains active until the user explicitly ends it.

## Finalize on explicit finish only

Use the living document as the only planning source. Do not fill unresolved gaps
with new decisions during finalization.

1. Run a final consistency sweep and preserve all active assumptions, conflicts,
   skipped items, deferred items, unresolved decisions, risks, and dependencies.
2. Rewrite the base file as the substantive authoritative **English** document.
3. Create a substantive **Korean mirror** beside it by inserting `.ko` before
   `.md`.
4. Keep both files synchronized in meaning and exactly aligned for stable IDs,
   statuses, requirements, decisions, risks, unresolved items, interview state,
   and next authorized action.
5. Mark the state `explicitly-finished`, record final paths and synchronization
   result, and leave a precise resume point in case planning reopens.
6. Report both paths, remaining gaps and consequences, and the next separately
   authorized action. Ask no further planning questions.

Either final file must be sufficient to understand intent, context, evidence,
scope, behavior, decisions, requirements, risks, unresolved items, completion
state, and handoff without the chat history.

If both files cannot be written, do not claim finalization artifacts exist. Provide
complete English and Korean drafts in the response, identify intended paths, and
state the write failure accurately.

## Preserve the authorization boundary

Within this skill, the following are permitted:

- research and read-only inspection;
- creation and revision of the planning document;
- decision questions and recommendations;
- final English and Korean planning artifacts.

The following require separate, explicit execution authorization and are never
implied by planning approval or finish:

- product or source-code changes;
- package installation or dependency changes;
- tests that mutate external systems;
- commits, pull requests, releases, deployment, or production changes;
- external service configuration;
- messages, purchases, or other side effects.

A finished document may recommend `$feature-implementer` or another executor as the
next action, but it must not require a proprietary schema. Preserve `R-*`, `UD-*`,
`SF-*`, `AR-*`, `OI-*`, and `RK-*` so an implementer can trace requirements to
implementation and verification evidence.

## Communicate checkpoints

After saving and before questions, provide a compact checkpoint containing:

- document path, revision, and interview state;
- material changes incorporated in this transaction;
- affected IDs or sections reconciled;
- current focus and material unresolved IDs.

Then present only the current question round. On pause or finish, replace questions
with the resumable or final handoff summary.

## Consistency gates

Before every question round, verify:

- the living document exists as a saved file or complete in-response draft;
- the latest user message and all downstream effects are present;
- sourced facts are actually sourced and recommendations are not user decisions;
- no mutually exclusive decisions or requirements remain active;
- each active requirement is traceable to provenance;
- the question is material, unresolved, non-repetitive, and not answerable by
  inspection;
- the question register and checkpoint match the questions being shown.

Before final output, additionally verify:

- an explicit finish signal was received;
- English and Korean files contain the same stable IDs and statuses;
- unresolved state was preserved rather than silently solved;
- the next authorized action does not exceed the user's authority;
- no implementation or external side effect occurred merely because planning ended.
