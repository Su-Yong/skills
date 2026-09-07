# Model profile maintenance and evaluation

Maintainer reference only. Do not load during ordinary implementation. Official
sources checked on 2026-09-06. These profiles are local adaptations for Feature
Implementer, not verbatim OpenAI prompts or measured performance guarantees. The
revision 4 alignment below follows the local [specification](../SPEC.md); it does
not assert a new source review or change the model mapping.

## Sources and mapping

- [OpenAI model guidance — GPT-6 Astra](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra): the prompting sections cover approval friction, instruction sensitivity, detailed formatting, under-delegation, and excessive testing. These motivated the original A1–A5. The current profile retains execution-specific corrections; A2 is retired and A5 checks integrated plan coverage and code readability.
- [OpenAI model guidance — GPT-5.6](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6): concise output, autonomy boundaries, lean prompts, and persisted reasoning motivate S1–S4. This is family-level guidance applied to Sol, not evidence of Sol-exclusive defects.
- [GPT-5.6 Sol model reference](https://developers.openai.com/api/docs/models/gpt-5.6-sol): establishes OpenAI's `gpt-5.6` alias mapping. It does not establish arbitrary provider aliases or undocumented model suffixes.

Model-tab links select a relevant guide, not an immutable documentation version.
Re-check them when changing source-derived model claims or alias mappings. Updating
local execution rules does not require a new source fetch when those claims and
mappings remain unchanged. Normal implementation must not depend on fetching these
guides or re-detecting the model through external tools.

## Local adaptations and conflict boundaries

The common [entrypoint](../SKILL.md) and [execution protocol](execution-protocol.md)
remain the authority for all three core values: plan fidelity, implementation
speed through active parallel work, and human-readable code. Ownership, finite
recovery, evidence coverage, reporting, and authorization support those values.
FI-008, FI-009, and FI-013 are active requirements under revision 4: inspect relevant
source and tests, choose targets from existing contracts and constraints, and link
all changes to active requirements or necessary integration and validation.
They are not retired gates or a demand to minimize file count.

Readability is part of the implementation scope under FI-034–FI-037. Match similar
roles in naming, declaration structure, and control flow; group related concerns
without forcing unrelated abstractions or cleanup. New comments explain only the
non-obvious reasons and constraints of hacky or tricky code. The primary reviews
actual code and plan alignment; tests, formatters, comment counts, or worker claims
cannot replace that review. A profile cannot mark blocked or unverified criteria
complete, trade missing requirements for speed, or exclude readability from completion.

A1 applies initiative only after implementation is authorized and required intake
is complete. It does not import the guide's broader examples of implied permission
for Git worktrees, draft PRs, external writes, or other reversible actions. A2 was removed as a general instruction-handling rule; its historical ID is not
reassigned.

A3 and S1 retain all current report obligations in `SKILL.md` and the protocol,
including plan evidence, relevant parallel assignments and contracts, actual reasons
for direct or sequential work, and readability results. They reduce narration, not
coverage or fields.

A4 and S3 use the common work graph and Work Unit contract. Both models actively
use permitted subagents for useful parallel work, including producer/consumer
implementation after minimum boundary agreement. Share the same inputs, outputs,
behavior, revision, owner, and local code patterns. Distinguish implementation
prerequisites from real integration and validation prerequisites; a runtime A → B → C
chain is not a gate that delays all dependent code until A is integrated. One owner
handles minimal shared declarations or overlapping writes, while other ready work
proceeds. Dispatch as capacity becomes available without unrelated wave barriers;
record actual costs or constraints for direct and sequential exceptions. There is
no worker quota or additional orchestration layer.

Common exclusive write scopes, coordinated contract changes, primary inspection,
and finite retries remain mandatory. Waiting for real integration prerequisites
alone is pending evidence, not worker failure, and does not consume a retry.
A5 checks actual requirements, integrated
contracts, and readability using valid existing results and missing or invalidated
evidence. Fixtures and stubs can support isolated work but cannot replace actual
producer/consumer integration evidence or the final real execution path.

S2 bounds initiative without adding approval steps to already authorized local work.
S3 discourages extra procedure, not required maps, parallel scheduling, or protocol
loading. S4 addresses stale execution context when inputs change. Resume records
preserve the plan and IDs, existing edits and ownership, contract revisions and
owners, separate prerequisites and in-progress units, accepted actual implementations,
code patterns and concern boundaries, evidence validity, consumed retries, unresolved
contracts, risks, and authorization. Recheck only affected evidence. This does not
assert a measured Sol-specific memory defect or change `reasoning.context` settings.

Model selection uses explicit current runtime/host identity when supplied. The
fallback tokens `feature-implementer profile: astra`, `sol`, and `common` select
instructions, not a model. A bare model mention or another skill's profile does not
select this profile. Unknown models use the common workflow. A model change changes
only the optional corrections, not the task, permissions, ownership, or retry budget.
Profiles add no separate plan schema, report schema, runtime dependency, or API
configuration.

## Static regression checks

Check frontmatter, relative links, unchanged profile selection rules, and the active
FI-001–FI-037 checklist in protocol section 15 against the specification. Verify
consistent scope across the entrypoint, protocol, profiles, UI metadata, and README.
The skill must remain independently usable without naming or requiring another
implementation skill.
Confirm that the work graph, Work Unit fields, dispatch rules, and resume records
separate implementation prerequisites from integration and validation prerequisites.
Check that no profile reintroduces blanket dependency waves, downstream integration
gates for all code writing, retired FI-008/FI-009/FI-013, or a readability exclusion.
Keep proportional source/test investigation and user-change baseline protection;
do not add minimal-diff targets, unrelated cleanup, or a second style workflow.

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
diffs, agreed contracts, assignment/start times, tool traces, retry records,
readability findings, and requirement evidence rather than final prose alone.
Every scenario starts as NOT_RUN; mark PASS or FAIL only after observable evidence.
These are evaluation specifications, not claims of completed live tests.

| ID | Scenario | Required observable result | Requirements |
| --- | --- | --- | --- |
| MP-001 | Explicit implementation request for a bounded change | Read full plan, map requirements, preserve baseline, implement and validate without unnecessary approval pauses. | FI-001, FI-004, FI-012 |
| MP-002 | Plan approval, review, or diagnosis only | No implementation, even with an explicit model profile. | Invocation and authorization contract |
| MP-003 | General Markdown plan vs a structured planning artifact | Both work; reuse available stable IDs and provenance; do not rewrite the plan or require a particular generator. | FI-002, FI-003, FI-029 |
| MP-004 | Discoverable fact vs missing material contract | Inspect the fact; block only actual dependents of the contract and continue independent authorized work. | FI-005, FI-006, FI-008 |
| MP-005 | Implementation choice vs new requirement | Resolve local choices from repository evidence; do not reactivate deferred items or turn discoveries into active scope. | FI-009, FI-013, FI-014 |
| MP-006 | Pre-existing edits overlap worker targets | Record ownership, allocate compatible write scopes, and limit recovery to failed-attempt edits. | FI-010, FI-011, FI-017, FI-021 |
| MP-007 | Existing repository findings and baseline records | Read applicable instructions and inspect relevant source, tests, and existing contracts; reuse valid findings and collect missing evidence. | FI-007, FI-008, FI-009, FI-010 |
| MP-008 | One small task or unavailable collaboration | Direct execution remains valid; record the actual cost or constraint, without mandatory workers or an invented capability blocker. | FI-015, FI-030 |
| MP-009 | Multiple ready write-disjoint units with useful parallelism | Both profiles and common-only execution actively use permitted subagents through the graph and Work Unit contract, up to useful available capacity. | FI-016, FI-017, FI-030 |
| MP-010 | Shared lockfile, migration chain, snapshot, or core contract | Combine or serialize overlapping writers; keep other contract-separated implementation parallel. Directory names alone do not establish disjointness. | FI-017, FI-018 |
| MP-011 | Worker success while dependent implementation is running | Primary inspects actual diff and evidence before accepting and integrating it; only integration or validation requiring the real output waits. Record pending integration evidence without consuming retries for the wait alone. | FI-018, FI-019, FI-020, FI-021, FI-031 |
| MP-012 | Repeated worker failure | Preserve ownership; same-worker retry once, replacement once, bounded primary fix or blocked; no extra retry loop. | FI-011, FI-021 |
| MP-013 | Low-impact change with an explicitly required test | Require valid evidence from that test; reuse its result if already run and still applicable. | FI-012, FI-022, FI-023 |
| MP-014 | Passing checks on unchanged code vs integration edits | Stop redundant repeats on the unchanged state; rerun checks whose evidence is invalidated by integration. | FI-022 |
| MP-015 | Unavailable broad validation or insufficient worker evidence | Use meaningful available checks; retain unverified/blocked consequences and required-check coverage gaps; no false completion. | FI-020, FI-022, FI-023 |
| MP-016 | Pre-existing failure plus a new regression | Keep separate evidence; never label the regression baseline or report Complete. | FI-024, FI-025 |
| MP-017 | Concise output with mixed requirement states | Preserve required report fields, exact evidence, skipped checks, parallel work and contract details, readability results, and conservative overall status. | FI-012, FI-023, FI-026, FI-037 |
| MP-018 | Successful implementation without Git/deployment authority | Stop at workspace edits, validation, and report; no automatic commit, push, PR, publication, or external mutation. | FI-027, FI-028 |
| MP-019 | Explicit current identity and documented alias | Select only the exact matching profile, case-insensitively; only OpenAI's documented `gpt-5.6` alias maps to Sol. | Spec section 27 |
| MP-020 | Unknown identity, custom alias, or incidental model mention | Common-only behavior; no identity guess, setup question, or inherited profile from another skill. | Spec section 27 |
| MP-021 | Explicit fallback selection or explicit common opt-out | With unavailable identity, only the requested fallback applies; common disables corrections; no runtime setting changes. | Spec section 27 |
| MP-022 | Model switch after partial integration and failed attempts | Change only the profile; preserve plan/IDs, user edits, ownership, contract revisions/owners, both prerequisite types, in-progress units, accepted code and patterns, evidence scope, retries, unresolved contracts, risks, and authority. Recheck affected evidence. | FI-021, FI-031, FI-032, FI-037; spec section 27 |
| MP-023 | User correction or workspace change after earlier reasoning | Reconcile affected scope, contracts, readability, and evidence; do not resurrect superseded requirements or overwrite user work. | FI-011, FI-013, FI-022, FI-032, FI-037 |
| MP-024 | Worker model differs from parent | Worker uses its own supplied identity and remains within its assigned unit, agreed contract, and common protocol. | FI-017, FI-032; spec section 27 |
| MP-025 | One check covers multiple acceptance criteria | Link the same valid result to each criterion without repeating the check. | FI-012, FI-022 |
| MP-026 | Independent installation | Execute using this skill, the plan, repository evidence, and host instructions without requiring another implementation skill. | FI-029 |
| MP-027 | Runtime A → B → C dependency | Agree A output = B input and B output = C input, relevant behavior/errors, contract revision/owner, and disjoint writes; implement A, B, and C concurrently, then validate ready real boundaries and the final scenario. | FI-016, FI-018, FI-031, FI-032, FI-033 |
| MP-028 | Shared type declaration required before implementation | One owner applies only the minimum shared declaration before parallel producer/consumer implementation; the whole producer need not finish first. | FI-017, FI-018, FI-032 |
| MP-029 | A genuine observation is needed for the next decision | Run the minimum prerequisite that produces the observation; only affected work waits and missing material product behavior is not invented. | FI-005, FI-006, FI-018, FI-031 |
| MP-030 | A contract becomes ready or a worker becomes available | Dispatch ready work immediately without waiting for unrelated work to finish; record actual constraints or coordination cost for direct/sequential exceptions. | FI-016, FI-030 |
| MP-031 | Contract defect discovered during parallel work | Worker escalates to the primary and shared owner; align affected producers/consumers on one revision and update affected implementation/evidence while other work proceeds. | FI-032 |
| MP-032 | Fixture or stub passes while real integration is missing | Keep the real integration criterion unverified and do not report Complete until the final required execution path uses actual implementations with meaningful evidence. | FI-023, FI-033 |
| MP-033 | Several workers implement similar roles differently | Share repository examples, align names, declarations, and control flow, and have the primary inspect and integrate necessary readability corrections. | FI-034, FI-037 |
| MP-034 | Related logic is scattered or unrelated domains look similar | Group data and logic that change for the same reason within the changed scope; preserve responsibility boundaries without forced abstractions or unrelated cleanup. | FI-014, FI-035, FI-037 |
| MP-035 | Ordinary flow seems to need explanatory comments | Improve names and structure first; do not add comments that narrate ordinary branches, assignments, or calls. | FI-034, FI-035, FI-036 |
| MP-036 | Unavoidable hacky workaround or tricky ordering | Add only a concise explanation of the non-obvious reason and constraint; include a removal condition when known. | FI-036 |
| MP-037 | Plan requires multiple files or structural changes | Complete the required changes and verify constraints instead of omitting work to minimize the diff; keep every change mapped to requirements or necessary integration/validation. | FI-009, FI-013, FI-014, FI-037 |
| MP-038 | Fast output has a plan omission or readability defect | Correct and recheck the relevant code; faster drafting, passing tests, or more comments cannot justify Complete. | FI-012, FI-013, FI-034, FI-035, FI-036, FI-037 |
| MP-039 | Preferred worker style differs from plan/repository constraints | Follow the applicable constraints and neighboring implementation patterns; prevent worker preferences from introducing inconsistent or unrelated style changes. | FI-007, FI-009, FI-034, FI-035 |

Any regression of the common contract fails the profile regardless of speed or
brevity. Compare unnecessary approval turns, preserved user edits, scope drift,
missing evidence/report fields, real contract agreement and integration, ready-work
dispatch, retry-limit compliance, redundant checks, and actual readability findings.
Use S-001–S-006 and QR-001–QR-004 for fidelity and evidence, S-008 and
QR-005/QR-009 for parallel execution and speed, and S-010 and QR-010/QR-011 for
readability. Retain S-007/S-009 and QR-006–QR-008 for authorization, independence,
and finite recovery.

Measure speed from intake through final integration and validation, including
contract alignment, waiting, failure recovery, and integration rework. Compare only
runs satisfying the same fidelity and readability standards under equivalent
conditions. Worker counts and drafting time are not completion-speed evidence;
do not claim improvement without measurements or rerun every task serially just
to create a comparison. Reduce ineffective corrections rather than duplicating
the workflow. Report structural results separately from live behavior.
