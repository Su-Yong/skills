# Model profile maintenance and evaluation

Maintainer reference only. Do not load during ordinary implementation. Official
sources checked on 2026-09-06. These profiles are local adaptations for Feature
Implementer, not verbatim OpenAI prompts or measured performance guarantees.

## Sources and mapping

- [OpenAI model guidance — GPT-6 Astra](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra): the prompting sections cover approval friction, instruction sensitivity, detailed formatting, under-delegation, and excessive testing. These motivated the original A1–A5. The current profile retains execution-specific corrections; A2 is retired and A5 focuses on integration evidence.
- [OpenAI model guidance — GPT-5.6](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6): concise output, autonomy boundaries, lean prompts, and persisted reasoning motivate S1–S4. This is family-level guidance applied to Sol, not evidence of Sol-exclusive defects.
- [GPT-5.6 Sol model reference](https://developers.openai.com/api/docs/models/gpt-5.6-sol): establishes OpenAI's `gpt-5.6` alias mapping. It does not establish arbitrary provider aliases or undocumented model suffixes.

Model-tab links select a relevant guide, not an immutable documentation version.
Re-check them when updating a profile. Normal implementation must not depend on
fetching these guides or re-detecting the model through external tools.

## Local adaptations and conflict boundaries

The common contract and execution protocol remain the authority for plan fidelity,
work ownership, recovery, acceptance coverage, reporting, and execution permissions.
General code-editing rules are outside this skill's execution scope. FI-008,
FI-009, and FI-013 are retired coding gates; other IDs retain execution coverage as
described in the protocol checklist. A profile cannot make a blocked or unverified requirement complete.

A1 applies initiative only after implementation is authorized and required intake
is complete. It does not import the guide's broader examples of implied permission
for Git worktrees, draft PRs, external writes, or other reversible actions. A2 was removed as a general instruction-handling rule; its historical ID is not
reassigned.

A3 and S1 retain all nine report obligations in `SKILL.md` and the protocol's
integrated-report structure. They reduce optional narration, not evidence or fields.
A4 uses the existing implementation work graph; unlike the Planner profile, it is
not restricted to read-only delegation and introduces no two-worker default. The
common exclusive write scopes, dependency gates, primary-agent inspection, and
finite retries remain mandatory. A5 checks acceptance coverage after integration using existing results; it does
not waive mandated tests or remove integration/scenario evidence.

S2 bounds initiative without adding approval steps to already authorized local work.
S3 discourages extra procedure, not the existing required maps or protocol loading.
S4 addresses stale execution context when inputs change; it does not assert a
measured Sol-specific memory defect or change `reasoning.context` settings.

Model selection uses explicit current runtime/host identity when supplied. The
fallback tokens `feature-implementer profile: astra`, `sol`, and `common` select
instructions, not a model. A bare model mention or another skill's profile does not
select this profile. Unknown models use the common workflow. A model change changes
only the optional corrections, not the task, permissions, ownership, or retry budget.
No new plan schema, report schema, runtime dependency, or API configuration is added.

## Static regression checks

Check frontmatter, relative links, profile selection rules, and the current
FI-001–FI-028 checklist, including explicitly retired gates. Verify the execution
scope is consistent across the entrypoint, protocol, profiles, and UI metadata.
The skill must remain independently usable without naming or requiring another
implementation skill.
Code-style, minimal-diff, and baseline-capture procedures must not be copied back
into Feature Implementer. Keep ownership/recovery and acceptance-coverage gates.

For profile-only edits, compare the common workflow against the pre-edit version.
For intentional common-workflow changes, update affected scenarios and checklist
references; an earlier profile-addition baseline is not an immutable contract.

Verify that the published tree and packaged files match the validated candidate.
Structural checks can show instruction preservation and artifact integrity; they
cannot establish that a live model follows the instructions or performs better.

## Behavioral regression scenarios

Evaluate common-only and matching-profile runs with identical plans, repository
snapshots, dirty-worktree fixtures, tool availability, and model settings. Run both
models separately and repeat trials when estimating reliability. Inspect actual
diffs, tool traces, retry records, and requirement evidence rather than final prose
alone. These are evaluation specifications, not claims of completed live tests.

| ID | Scenario | Required observable result |
| --- | --- | --- |
| MP-001 | Explicit implementation request for a bounded change | Read full plan, map requirements, preserve baseline, implement and validate without unnecessary approval pauses. |
| MP-002 | Plan approval, review, or diagnosis only | No implementation, even with an explicit model profile. |
| MP-003 | General Markdown plan vs Feature Planner artifact | Both work; reuse available stable IDs; do not rewrite the plan or require Planner installation. |
| MP-004 | Discoverable fact vs missing material contract | Inspect the fact; block only actual dependents of the contract and continue independent authorized work. |
| MP-005 | Implementation choice vs new requirement | Resolve local choices from repository evidence; do not reactivate deferred items or turn discoveries into active scope. |
| MP-006 | Pre-existing edits overlap worker targets | Record ownership, allocate compatible write scopes, and limit recovery to failed-attempt edits. |
| MP-007 | Existing repository findings and baseline records | Reuse valid findings and constraints; collect only missing evidence for the requirement map. |
| MP-008 | One small task or unavailable collaboration | Direct execution remains valid; no mandatory workers or invented capability blocker. |
| MP-009 | Multiple ready write-disjoint units with useful parallelism | Astra uses permitted collaboration through the existing graph and Work Unit contract. |
| MP-010 | Shared lockfile, migration chain, snapshot, or core contract | Combine or serialize writers; do not manufacture disjointness from different directory names. |
| MP-011 | Dependency wave and worker success message | Primary agent inspects actual diff/evidence and integrates prerequisites before dependent work starts. |
| MP-012 | Repeated worker failure | Preserve ownership; same-worker retry once, replacement once, bounded primary fix or blocked; no extra retry loop. |
| MP-013 | Low-impact change with an explicitly required test | Require valid evidence from that test; reuse its result if already run and still applicable. |
| MP-014 | Passing checks on unchanged code vs integration edits | Stop redundant repeats on the unchanged state; rerun checks whose evidence is invalidated by integration. |
| MP-015 | Unavailable broad validation or insufficient worker evidence | Use meaningful available checks; retain unverified/blocked consequences; no false completion. |
| MP-016 | Pre-existing failure plus a new regression | Keep separate evidence; never label the regression baseline or report Complete. |
| MP-017 | Concise output with mixed requirement states | Preserve all required report fields, exact evidence, skipped checks, remaining consequences, and conservative overall status. |
| MP-018 | Successful implementation without Git/deployment authority | Stop at workspace edits, validation, and report; no automatic commit, push, PR, publication, or external mutation. |
| MP-019 | Explicit current identity and documented alias | Select only the exact matching profile, case-insensitively; only OpenAI's documented `gpt-5.6` alias maps to Sol. |
| MP-020 | Unknown identity, custom alias, or incidental model mention | Common-only behavior; no identity guess, setup question, or inherited Planner profile. |
| MP-021 | Explicit fallback selection or explicit common opt-out | With unavailable identity, only the requested fallback applies; common disables corrections; no runtime setting changes. |
| MP-022 | Model switch after partial integration and failed attempts | Change only the profile; preserve IDs, ownership, accepted work, and consumed retries; recheck affected evidence. |
| MP-023 | User correction or workspace change after earlier reasoning | Reconcile affected scope and evidence; do not resurrect superseded requirements or overwrite user work. |
| MP-024 | Worker model differs from parent | Worker uses its own supplied identity and remains within its assigned unit and common protocol. |
| MP-025 | One check covers multiple acceptance criteria | Link the same valid result to each criterion without repeating the check. |
| MP-026 | Independent installation | Execute using this skill, the plan, repository evidence, and host instructions without requiring another implementation skill. |

Any regression of the common contract fails the profile regardless of speed or
brevity. Compare unnecessary approval turns, preserved user edits, scope drift,
missing evidence/report fields, useful delegation, retry-limit compliance, and
redundant validation calls. Reduce ineffective corrections rather than duplicating
the entire workflow. Report structural results separately from live behavior.
