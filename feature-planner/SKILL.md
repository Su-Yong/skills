---
name: feature-planner
description: Refine an incomplete idea, brief, feature, or project through repeated questions while maintaining a durable planning document. Use when the user wants help making a plan concrete; do not use merely to implement an already-approved plan.
---

# Feature Planner

Maintain one self-contained plan that reflects the user's evolving intent without
taking over their decisions. Use [the planning document template](assets/planning-document-template.md)
for the working document and final pair, adapting it to the domain instead of
forcing a fixed questionnaire.

## Create the Document Before Asking

1. Read supplied material and safely inspect discoverable workspace facts. Do not
   ask the user for facts that can be inspected, and preserve unrelated files and
   existing document conventions.
2. Resolve the active workspace or project root from the supplied material and
   discoverable repository structure; otherwise use the current working directory.
   Store planning documents under `<root>/docs/specs/`, creating that directory
   when needed. Follow an existing filename convention there or use a descriptive
   `<feature-slug>-spec.md` name. Do not overwrite an unrelated document. A path
   explicitly requested by the user for the current plan overrides this default.
   If the intended location is not writable, draft the complete document in the
   response, state its intended `docs/specs/` path, and do not claim it was saved.
3. Before the first question, create or fully draft one living document in the
   user's language. Fill it with the best current planning hypothesis rather than
   placeholders, and mark uncertainty explicitly.
4. Show a compact checkpoint with the path, outcome, material changes, and
   unresolved topics; then ask one to three related material questions.

The initial document must exist as a file or full in-response draft before any
question.

## Keep One Authoritative Living Document

Before every later question round, update the document with all effects of the
latest message: answers, corrections, evidence, decisions, requirements, scope,
risks, deferred items, and open questions. Never let it lag behind a question.

Keep provenance visible with stable entries:

- **User decision:** explicitly selected or corrected by the user.
- **Sourced fact:** only a fact actually established by supplied material or
  completed read-only inspection; cite the file, URL, or other source precisely
  enough to revisit it. Otherwise keep it as an agent assumption or unresolved item.
- **Agent assumption or recommendation:** an inference or suggested default,
  never presented as user-approved fact.
- **Unresolved item:** unknown, conflicting, skipped, or deferred information,
  including its consequence.

For a correction, preserve the earlier entry as `superseded` or `corrected`, add
the new user decision, and reconcile every affected section so obsolete scope,
requirements, risks, and questions are no longer active.

## Run Adaptive Question Rounds

Ask one to three closely related questions per round. Prioritize material gaps in
outcome, users, scope and non-goals, core flow, constraints, success evidence,
risks, unresolved decisions, and handoff. Apparent completeness is not a finish
signal: continue with useful confirmation, trade-off, or challenge questions until
the user explicitly finishes, without repeating settled questions.

Every question must follow this choice-plus-free-text contract:

- Give it a stable `Q-ID` and briefly explain why the decision affects behavior,
  scope, cost, or risk.
- Offer three to five numbered, materially distinct viable choices by default,
  each with one concise impact or trade-off. If only two meaningful choices exist,
  show two, explain why, and do not invent a third.
- Keep a free-text path separate from the numbered choices; `Other decision` does
  not count as a choice. Never imply that the list is exhaustive.
- Mark one or more choices `(Recommended)` only when supported by current evidence,
  separate recommendations from user decisions, and state when each fits. Order
  multiple recommendations by evidence strength; if none is supported, stay
  neutral.
- Default to single choice. When a combination is genuinely meaningful, label the
  question `Multiple selections allowed` and treat selected numbers as one decision.
- End by inviting a number, one or more numbers when multi-select is explicit, or
  the user's own decision in free text.

Interpret answers without forcing them into the listed choices:

- A bare number, `N번`, or exact choice label selects that choice. Number plus prose
  selects it as the base and records the prose as a constraint or adjustment.
- Preserve unmatched free text verbatim as the user's custom decision.
- For several questions, recommend `Q-ID: answer` mappings such as
  `Q-001: 2, Q-002: custom decision`, but accept unambiguous natural language.
- For `Multiple selections allowed`, accept forms such as `1, 3` as one combined
  decision unless the user explicitly separates them.
- If an answer is ambiguous or conflicts with an earlier decision, first update
  the document with that state, then ask exactly one focused resolution question
  before unrelated refinement.

Apply user controls after updating the document:

- **Answer:** record it with provenance and propagate its consequences.
- **Skip:** mark the item skipped and state what remains uncertain because of it.
- **Defer:** retain the item with its consequence and a useful revisit trigger.
- **Pause:** update the document, provide its path and a resumable checkpoint, and
  stop asking questions without marking the plan finished.
- **Resume:** read the living document first, reconcile any new context, update it,
  and continue the interview from its unresolved state.
- **Explicit finish:** when the user clearly says `finish`, `done`, `complete`, or
  an unambiguous equivalent in the user's language, stop asking and finalize
  immediately. If intent is ambiguous, keep the interview active.

## Finalize Only on Explicit Finish

Use the living document as the sole planning source. Do not invent answers, refuse
completion because gaps remain, or silently resolve conflicts.

1. Rewrite the base Markdown file, if necessary, as the authoritative English
   final document.
2. Create a substantive Korean mirror beside it by inserting `.ko` before `.md`.
   Keep the same IDs, statuses, requirements, decisions, risks, unresolved items,
   and next authorized action in both files.
3. Mark the interview explicitly finished while preserving every remaining
   assumption, conflict, skipped or deferred item, and risk.
4. Make either file sufficient to resume without chat history: include intent,
   evidence, scope, behavior, decisions, requirements, unresolved items,
   completion state, and handoff.
5. Report both paths, remaining gaps, and the next authorized action.

## Preserve Authorization Boundaries

Planning, answering, approving, or finishing does not authorize implementation,
publishing, messaging, purchasing, deployment, installation, or external-system
changes. Record them only as next actions unless separately and unambiguously
authorized, and never broaden that authority during finalization.
