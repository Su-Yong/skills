---
name: feature-implementer
description: Execute an implementation-ready feature plan in an existing repository while preserving plan fidelity and user-owned workspace changes, making the smallest semantic diff, and verifying every requirement with evidence. Use when the user explicitly asks to implement a plan, specification, or planning document. Do not use for planning-only, review-only, diagnosis-only, feasibility-only, or architecture-advice requests.
---

# Feature Implementer

Convert an implementation-ready planning document into verified repository changes.
This is a controlled plan-to-code executor, not a product planner and not a general
refactoring agent.

Treat the planning document as the source of intended behavior and the repository as
the source of current technical truth. Preserve both unless the user explicitly
authorizes a broader change.

## Require implementation authority

Use this skill only when the user explicitly asks to implement an identified plan,
specification, or planning document. Such a request authorizes the following within
the plan's scope:

- read-only repository investigation;
- workspace edits required by the plan; and
- proportionate validation of those edits.

The following do **not** authorize implementation by themselves:

- finishing or approving a plan;
- asking to read, summarize, review, or critique a plan;
- asking for diagnosis, feasibility analysis, or architecture advice; or
- naming a future implementation step without requesting it now.

Implementation authority does not automatically authorize Git-history operations,
remote changes, package publication, deployment, messaging, purchasing, or external
system mutation. Preserve the boundary in [Stop at the authorized boundary](#stop-at-the-authorized-boundary).

## Preserve the execution invariants

These rules apply whether the primary agent works directly or uses internal workers.

1. **Read the whole plan first.** Do not start editing from a partial excerpt when the
   complete planning document is available.
2. **Do not invent material contracts.** Never silently choose a missing product,
   API, data, security, migration, compatibility, or user-experience contract that
   would materially change the result.
3. **Block only affected work.** A missing decision blocks only requirements that
   depend on it. Continue independent requirements that remain safe and authorized.
4. **Preserve user-owned work.** Existing staged or unstaged changes belong to the
   user or another worker unless ownership is proven otherwise.
5. **Minimize semantic change.** Choose the implementation that disturbs existing
   architecture, behavior, dependencies, and files the least—not merely the one with
   the fewest changed lines.
6. **Keep primary-agent ownership.** The primary agent owns the entire requirement
   map, work graph, shared workspace, integration, validation, and final status.
7. **Treat worker reports as claims, not evidence.** Inspect the actual workspace diff
   and validation output before accepting delegated work.
8. **Report uncertainty honestly.** Implementation, validation, and completion are
   separate states. Never present blocked, unverified, or regressed work as complete.

## Model-specific behavioral corrections

The common workflow in this file and [the execution protocol](references/execution-protocol.md)
always applies. Add at most one behavioral profile; it does not replace either
file or define another execution workflow. Within this skill, the common contract
takes precedence over a profile. Follow the host's instruction hierarchy and
applicable user instructions. Profiles add no authority, tools, or permissions and
do not relax the conditions that require reading the full execution protocol.

Select before plan intake, using current model identity explicitly supplied by the
runtime or host when available:

| Current identity | Additional instructions to read |
| --- | --- |
| `gpt-6-astra` / `GPT-6 Astra` | [Astra behavioral corrections](references/gpt-6-astra.md) |
| `gpt-5.6-sol` / `GPT-5.6 Sol` | [Sol behavioral corrections](references/gpt-5.6-sol.md) |
| OpenAI's `gpt-5.6` alias | Sol profile; do not extend this mapping to custom provider aliases. |
| Unknown, unavailable, or any other model | Common workflow only. |

Match these names case-insensitively, not by broad family-prefix guessing. Do not
infer identity from writing style, the plan's contents, historical chat, or a default
configuration that may not describe the current run. Mentioning a model is not
evidence that it is running.

When identity is unavailable, an explicit user or host selection such as
`feature-implementer profile: astra` or `feature-implementer profile: sol` may select
that profile. This selects instructions, not a model, and does not establish model
identity. Otherwise continue with the common workflow without asking an identity
question. An explicit `feature-implementer profile: common` disables the optional
profile. Do not inherit a Feature Planner profile or require that skill to be present.

Read only the selected profile. Re-select when the runtime reports a model change;
the previous profile becomes inactive even if its text remains in context. On
handoff, reconcile the current plan, actual workspace, and available execution
records. Preserve requirement IDs, ownership, dependencies, integration state,
retry counts, evidence classifications, and authorization. Recheck evidence affected
by intervening changes; do not restart work or reset recovery limits just because
the model changed. Missing ownership or evidence is not proof of a clean workspace
or successful validation. A worker selects using its own supplied identity, not an
assumed copy of the parent's model, and remains bounded by its assigned work unit.

Do not change model settings, reasoning effort, invocation metadata, or plan and
report schemas to activate a profile. These are prompt instructions, not executable
model detection. Read [profile maintenance notes](references/model-profile-maintenance.md)
only when maintaining or evaluating this skill, not during ordinary implementation.

## Intake the plan

Read the identified planning document completely before changing the repository.
Extract at least:

- active requirements and observable acceptance criteria;
- explicit scope, non-goals, and do-not-touch areas;
- technical, product, compatibility, security, performance, migration, and quality
  constraints;
- unresolved, skipped, deferred, or conflicting items and their consequences;
- dependencies and rollout assumptions;
- provenance or decision records when present; and
- the actions authorized in the current request.

Support both Feature Planner artifacts and sufficiently concrete general Markdown.
When the plan contains stable IDs such as `R-*`, `UD-*`, `SF-*`, `AR-*`, `OI-*`, or
`RK-*`, reuse them in implementation and evidence records. Do not require a Feature
Planner-specific schema or runtime. For an ordinary plan, create an internal stable
requirement map without rewriting the source document.

Classify every material uncertainty before implementation:

- **Repository-discoverable fact:** inspect the repository instead of asking the
  user.
- **Material user decision:** mark only the dependent requirement `blocked` when the
  decision cannot be inferred safely.
- **Non-blocking uncertainty:** record it as a residual risk and continue.

Ask the user only when a material conflict or missing contract prevents further safe
progress and cannot be resolved from the plan or repository evidence.

## Establish a bounded repository baseline

Before editing, inspect only the surface needed to implement and verify the plan:

1. applicable repository instructions;
2. relevant source, configuration, schemas, migrations, generated artifacts, and
   tests;
3. existing helpers, components, services, patterns, and conventions to reuse;
4. validation commands and repository-standard checks;
5. relevant staged and unstaged changes when Git is available; and
6. cheap baseline failures when they are needed to distinguish pre-existing failures
   from regressions.

Treat existing workspace changes as user-owned. Do not use destructive or
broad-scope operations such as `git reset`, `git clean`, automatic stashing,
restoring unowned files, repository-wide formatting, or opportunistic file moves.
When a required target already contains changes, preserve them and add the smallest
compatible edit. If the plan truly conflicts with those changes and repository
evidence cannot resolve the conflict, block only the affected work.

## Build the requirement-to-evidence map

For each requirement, identify:

```text
Requirement and provenance
→ existing behavior to preserve
→ existing abstraction to reuse
→ exact target file or symbol
→ necessary tests or fixtures
→ explicit non-goals and do-not-touch areas
→ acceptance evidence
```

This is the minimal-change map. Use it to decide both where to edit and where to
stop. Prefer an existing abstraction over a parallel implementation. Prefer a local,
clear change over a new shared abstraction when both satisfy the plan without
creating duplication or architectural inconsistency. Add or upgrade a dependency
only when it is necessary to fulfill an authorized requirement and is the smallest
semantic change available.

Do not perform unrelated refactoring, cleanup, renaming, formatting, dependency
upgrades, or opportunistic bug fixes.

## Choose execution depth from task shape

The primary agent may implement a single low-risk, bounded change directly when
parallelism or an independent review would not provide a material benefit.

Use internal collaboration workers only when at least one of these is true:

- independent work units can progress concurrently with disjoint write scopes;
- the work has meaningful dependency waves;
- complexity makes a bounded specialist implementation useful; or
- risk justifies an independent read-only review or validation perspective.

Do not create workers merely because the plan contains many requirements. Worker
availability is not itself a blocker when the primary agent can safely continue.
Never assign concurrent workers to the same file, tightly coupled symbol, migration
chain, generated artifact, shared snapshot, or core type contract.

Read [the execution protocol](references/execution-protocol.md) completely before
editing whenever the run uses workers, dependency waves, worker recovery,
nontrivial integration, or complex validation. A direct low-risk bounded change may
follow this file alone, but all invariants still apply.

## Implement and integrate under primary ownership

Make only changes required by the requirement-to-evidence map. Keep the repository's
established conventions unless the plan explicitly requires a change.

When workers are used:

- define a work unit with linked requirements, dependencies, exclusive write scope,
  read-only context, do-not-touch areas, existing changes to preserve, acceptance
  criteria, and validation commands;
- schedule only dependency-ready, write-disjoint units in the same wave;
- tell every worker that the workspace is shared and that unassigned changes must
  not be reset, reverted, overwritten, reformatted, or expanded;
- inspect each worker's actual diff and validation results before integration; and
- release downstream work only after prerequisite changes have been reviewed and
  integrated by the primary agent.

Apply the finite recovery sequence defined in the execution protocol: inspect the
failure, safely isolate only invalid edits owned by the attempt, retry the same
worker once, retry a different worker once, allow the primary agent to perform only
a small mechanical or integration fix, and otherwise mark the unit `blocked`.
Never loop indefinitely or weaken acceptance criteria to claim success.

## Validate from narrow to broad

Validate the implemented behavior in this order, expanding only as justified by
impact and risk:

1. **Targeted validation:** requirement- or work-unit-specific tests, type checks,
   lint, builds, static checks, or direct behavior observations.
2. **Integration validation:** contracts between changed units, such as API to
   service, service to database, UI to API, schema to consumer, or generated output
   to runtime use.
3. **Repository validation:** broader project-standard lint, typecheck, build, or
   test commands when proportionate.
4. **Scenario validation:** the plan's observable happy, edge, and failure paths.

Record the exact command or observation, result, relevant scope, and evidence source.
Classify acceptance evidence as:

- `verified`: meaningful evidence passed;
- `blocked`: a missing decision, contract, tool, environment, or capability prevents
  safe implementation or validation;
- `unverified`: implementation exists, but meaningful acceptance evidence could not
  be obtained; or
- `baseline-failure`: the observed failure existed before the implementation or is
  demonstrably unrelated to it.

A baseline failure does not automatically verify a requirement. A new regression
caused by the implementation must be fixed, reverted only when the reverted edits
are owned by the current run, or reported as non-complete. Never classify a new
regression as a baseline failure.

## Decide completion requirement by requirement

Every required item must end with implementation and evidence status. Use one overall
outcome:

- **Complete:** every required item is verified and no new regression remains.
- **Partially complete:** meaningful independent items are verified, but one or more
  remaining items are blocked or unverified.
- **Blocked:** a core contract, decision, environment, or capability prevents safe
  completion and little or no valid implementation can proceed.
- **Unverified:** the main implementation exists, but meaningful evidence for core
  acceptance behavior is unavailable.

Do not infer whole-plan completion from code presence, worker success messages, or a
single broad command that does not exercise the acceptance criteria.

## Return one integrated implementation report

Return one primary-agent report rather than separate worker summaries. Include:

1. overall outcome;
2. a requirement ledger mapping each requirement to implementation, evidence, and
   status;
3. a change inventory explaining why every changed file was necessary;
4. an execution summary covering direct work, delegated work, dependency waves,
   worker ownership, retries, and primary integration when applicable;
5. validation evidence with commands or observations, results, and skipped checks;
6. baseline failures separated from regressions introduced by this run;
7. blocked or unverified items with exact consequences;
8. residual risks and the smallest useful next action; and
9. the authorization boundary, including requested follow-up actions that were not
   performed.

## Stop at the authorized boundary

Unless the user separately and unambiguously authorizes them, stop after workspace
edits and validation. Do not:

- create, amend, rewrite, rebase, merge, or otherwise alter commits or branches;
- push, open or update pull requests, create releases, or change remotes;
- deploy, publish, install globally, purchase, send messages, or mutate external
  services, trackers, or production configuration.

Mention such actions only as possible next steps. Never broaden authority merely
because implementation or validation succeeded.
