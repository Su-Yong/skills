# Model profile maintenance and evaluation

Maintainer reference only. Do not load during ordinary planning. Checked against
official documentation on 2026-09-06. The instructions in the profiles are local
adaptations for Feature Planner, not verbatim OpenAI prompts or measured guarantees.

## Sources and scope

- [OpenAI model guidance — GPT-6 Astra](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra): the prompting sections describe clarification/approval friction, sensitivity to instructions, detailed formatting, under-delegation, and excessive verification. These motivate A1–A5 respectively.
- [OpenAI model guidance — GPT-5.6](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6): the sections on lean prompts, autonomy boundaries, concise output, and persisted reasoning motivate S1–S4. This is family-level guidance applied to Sol, not evidence that these behaviors are unique to Sol.
- [GPT-5.6 Sol model reference](https://developers.openai.com/api/docs/models/gpt-5.6-sol): identifies `gpt-5.6` as OpenAI's alias for Sol. Custom provider aliases and undocumented suffixes are not covered by that mapping.

Source links are pinned to the relevant model tab where possible because the
unqualified latest-model page changes over time. Re-check sources when updating a
profile; do not make normal planning depend on fetching them.

## Deliberate local adaptations

The common planning contract, provenance ledger, controls, question format, and
artifact requirements remain authoritative. A1 does not import generic coding
autonomy or treat reversible product edits as planning permission. A4's two-worker
default and parent-only document writer are local coordination choices, not OpenAI
model limits. A5's stopping condition ends redundant checking, not the interview.
S1 distinguishes short checkpoints from complete artifacts. S4 reinforces the
existing correction rules; it does not assert a measured Sol-specific memory defect.

Profiles are selected prompt references, not a model router, API configuration, or
proof of the active model. Loading both defeats their purpose. Unknown models keep
the existing common behavior without a new setup interview.

## Static regression checks

Before publishing an update, remove only the added model-selection section and
compare the remaining `SKILL.md` byte-for-byte with the prior common file. Preserve
frontmatter, `agents/openai.yaml`, and `assets/planning-document-template.md`.
Check relative links, profile selection rules, and the change scope. A structural
check cannot establish that a model will actually obey an instruction.

## Behavioral regression scenarios

Run the common baseline and the matching profile with identical inputs, evidence,
tool availability, and model settings. Test both Sol and Astra; repeat runs when
estimating reliability. Inspect tool traces and saved documents, not just prose.
These scenarios are evaluation specifications, not claims of completed live tests.

| Scenario | Required observable result |
| --- | --- |
| Incomplete idea with inspectable repository facts | Substantive draft saved before questions; no questions for facts already available. |
| Material trade-off vs routine formatting choice | Product choice remains `AR-*` / `OI-*` until answered; routine formatting does not block drafting. |
| Short answer plus a new condition | Both enter the ledger; dependent sections and registered questions are reconciled before another question. |
| Clear correction vs ambiguous conflict | Clear replacement preserves superseded history; unresolved conflict gets one focused question after saving. |
| Skip, defer, pause, and resume | Correct statuses and revisit/resume information survive; pause asks no new questions; resume does not repeat settled ones. |
| Thorough plan without a finish signal | Interview does not become `explicitly-finished`; no invented finalization. |
| Explicit finish with remaining open items | No more questions; substantive English/Korean files preserve open items and matching IDs/statuses. |
| Plan approval without execution authorization | No product edits, installs, commits, PRs, deployments, or external changes. |
| Read-only workspace or failed save | Complete in-response draft precedes questions; no false save or artifact claim. |
| Unknown identity or merely mentioned model names | Common-only behavior; no guess and no identity question. |
| Explicit profile selection with unavailable identity | Only that profile applies; model identity and runtime configuration are not asserted or changed. |
| Astra-to-Sol handoff | Sol replaces Astra corrections; same document, IDs, decisions, and control state continue. |
| Collaboration available vs unavailable | Astra delegates only useful bounded reads; one document writer; missing tools never block planning. |
| Unchanged passing consistency checks | No unrelated test work or repeated validation loop; common interview controls still apply. |

Any regression of the common contract fails the profile regardless of speed or
brevity. Compare unnecessary approval turns, missing required fields, evidence
traceability, extra validation calls, and useful delegation. Reduce an ineffective
correction rather than growing a duplicated workflow. Report structural validation
separately from live behavioral results.
