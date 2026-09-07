---
name: feature-implementer
description: Implement a planning document faithfully and quickly in an existing repository using active subagent parallelism, readable code, and requirement-level verification. Use for explicit requests to implement a plan or specification, not planning-only, review-only, diagnosis-only, feasibility-only, or architecture-advice requests.
---

# Feature Implementer

Convert a sufficiently concrete planning document into verified repository changes,
regardless of its author or planning tool.

Treat the planning document as the source of intended behavior and the repository as
the source of current technical truth.

This skill owns plan intake, requirement tracking, work allocation, integration,
code readability, acceptance evidence, and completion reporting.

## Optimize for three core values

1. **Plan fidelity.** Match the plan's behavior, scope, constraints, and acceptance
   criteria to actual implementation and evidence. Resolve omissions and unintended
   changes before claiming completion.
2. **Fast implementation.** Actively use subagents to implement as much work in
   parallel as useful. Agree producer outputs and consumer inputs first so runtime
   dependencies need not serialize coding. Optimize elapsed time through integration
   and validation, including coordination and rework.
3. **Human-readable code.** Give similar responsibilities consistent names,
   structure, and control flow; keep code for the same concern together. Add comments
   only for non-obvious reasons or constraints behind hacky or tricky implementations.

Improve speed while satisfying fidelity and readability. Preserve existing user
work, evidence-based completion, and independence from other skills as conditions
supporting all three values.

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
4. **Track work ownership.** Distinguish pre-existing changes from each execution
   unit's edits so integration and recovery affect only owned work.
5. **Keep primary-agent ownership.** The primary agent owns the entire requirement
   map, work graph, shared workspace, integration, validation, and final status.
6. **Treat worker reports as claims, not evidence.** Inspect the actual workspace diff
   and validation output before accepting delegated work.
7. **Report uncertainty honestly.** Implementation, validation, and completion are
   separate states. Never present blocked, unverified, or regressed work as complete.
8. **Separate coding from integration prerequisites.** A stable boundary contract
   can release producer and consumer implementation together. Wait only where actual
   predecessor results or shared writes are necessary.

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
records. Preserve requirement IDs, ownership, agreed boundary contracts and their
owners/revisions, coding and integration prerequisites, in-flight work, code patterns,
integration state, retry counts, evidence classifications, and authorization.
Recheck evidence affected by intervening changes; do not restart work or reset
recovery limits just because the model changed. Missing ownership or evidence is
not proof of a clean workspace or successful validation. A worker selects using its
own supplied identity, not an assumed copy of the parent's model, and remains
bounded by its assigned work unit.

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

## Build the requirement-to-evidence map

Before editing a Git repository, inspect the relevant current staged and unstaged
diffs and untracked files. Treat pre-existing changes as user-owned and preserve
their contents and staging state through implementation and validation. Do not use
reset, revert, clean, automatic stash, checkout/restore, or broad formatting and
file moves to discard or overwrite unowned work. For other repositories, inspect
the relevant starting file state directly. Block only genuine unresolved conflicts.

Resolve each requirement's implementation target from relevant repository evidence
and applicable instructions. Use available workspace and validation records,
collecting missing evidence as needed. Inspect relevant source, tests, helpers, public
contracts, and local code patterns to choose targets and concern boundaries. Record
overlap between planned work and existing edits for ownership and scheduling. If a
material conflict remains, block only its dependent work.

For each requirement, identify:

```text
Requirement and provenance
→ implementation target and plan constraints
→ coding prerequisites, integration prerequisites, and boundary contracts
→ ownership conflicts, local code patterns, and concern boundaries
→ acceptance criterion and evidence source
```

Keep this map tied to the active plan. An implementation choice does not create a
new requirement or reactivate a deferred item. For ordinary plans, the map remains
internal; do not rewrite the source document to add execution metadata.

## Organize for parallel implementation

Actively find and delegate useful parallel implementation units within permitted
tools and available worker capacity. Include dependent features whose coding can
be separated by agreeing their boundary contracts first.

For `A → B → C`, agree A's output with B's input and B's output with C's input,
including relevant behavior and error semantics. Establish any necessary shared
declarations under one owner, then dispatch A, B, and C to disjoint write scopes.
Integrate actual implementations as they become ready. A downstream coder need not
wait for the upstream implementation to finish.

Use the plan and repository to settle local implementation choices. Do not invent
missing material product, API, or data semantics to unlock parallel work. When a
real predecessor result is needed to decide the next implementation, perform that
minimal prerequisite first and keep independent work moving.

Never assign concurrent writers to the same file, tightly coupled symbol, migration
chain, generated artifact, shared snapshot, or core type declaration. Assign shared
edits to one owner or serialize those edits while the remaining units progress.

Direct execution fits a small bounded change whose coordination cost exceeds its
benefit, work that cannot be separated by contracts, or unavailable collaboration.
Briefly record the actual reason for direct or sequential work. Worker count is not
a goal; unavailable workers alone do not block work the primary agent can perform.
Use independent read-only review when complexity or risk makes it useful.

Read [the execution protocol](references/execution-protocol.md) completely before
editing whenever the run uses workers, shared boundary contracts, worker recovery,
nontrivial integration, or complex validation. A direct low-risk bounded change may
follow this file alone, but all invariants still apply.

## Implement and integrate under primary ownership

Implement the active requirement map and integrate results against its contracts
and dependencies.

When workers are used:

- define a work unit with linked requirements, separate coding and integration
  prerequisites, agreed boundary contracts and their owner/revision, exclusive write
  scope, read-only context, existing changes to preserve, constraints, acceptance
  criteria, and validation commands;
- give each worker the shared-workspace ownership boundaries and applicable
  repository instructions, along with common code patterns and concern boundaries;
- dispatch ready write-disjoint units as capacity becomes available, without waiting
  for unrelated work to finish a wave;
- coordinate contract changes with affected producers and consumers; workers must
  not change shared assumptions unilaterally;
- inspect actual diffs, code readability, and validation results before accepting
  delegated work; and
- connect ready real implementations and verify their boundary behavior. Fixtures
  or stubs may support isolated development, but do not prove actual integration.

The primary agent owns contracts, scheduling, bottleneck resolution, and integration.
It can also implement or validate work outside active workers' write scopes. Keep
integration waits distinct from permission to start downstream coding.

Apply the finite recovery sequence defined in the execution protocol: inspect the
failure, safely isolate only invalid edits owned by the attempt, retry the same
worker once, retry a different worker once, allow the primary agent to perform only
a small mechanical or integration fix, and otherwise mark the unit `blocked`.
Never loop indefinitely or weaken acceptance criteria to claim success.

## Make the code readable through its structure

Apply these rules during implementation and inspect them in the integrated diff:

- Match names, declaration structure, branching, and error handling across similar
  responsibilities using applicable repository conventions and nearby examples.
- Keep data and logic that change for the same reason close together. Separate
  distinct concerns and keep each function or block at a coherent abstraction level.
- Use useful local structure without forcing unrelated domains into a common
  abstraction merely because their code looks similar. Limit tidying to the active
  implementation and necessary integration scope.
- Express ordinary behavior through names and structure. Add comments only when
  unavoidable hacky workarounds or tricky logic have non-obvious reasons or
  constraints; describe why, and a known removal condition when helpful.

Fix confusing structure before adding explanatory prose. Formatting, lint success,
comment counts, and code size do not establish readability.

## Link validation evidence to acceptance

Reuse checks performed during code implementation. This workflow adds coverage
accounting: every required acceptance criterion needs relevant evidence, and
cross-unit contracts and plan scenarios must be covered where applicable. Run
additional validation when that coverage is missing or integration has invalidated
an earlier result. Link valid results to all criteria they cover.

Compare actual behavior with every active requirement for omissions, changed
semantics, or out-of-scope additions. Verify real producer/consumer boundaries and
planned scenarios; passing stub checks or one broad command does not establish
whole-plan fidelity. Review the code's shape and concern grouping as well as tests.

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
keeps the affected requirement and overall outcome non-complete until resolved.
Evidence from another workspace state is reusable only if intervening changes have
not invalidated it.

## Decide completion requirement by requirement

Every required item must end with implementation and evidence status. Use one overall
outcome:

- **Complete:** every required item is verified, no plan mismatch or new regression
  remains, and changed code meets the readability and comment rules.
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
4. an execution summary covering direct and parallel work, agreed boundary
   contracts, coding versus integration prerequisites, reasons for sequential work,
   worker ownership, retries, and primary integration when applicable;
5. validation evidence with commands or observations, results, and skipped checks;
6. baseline failures separated from regressions introduced by this run;
7. blocked or unverified items with exact consequences;
8. residual risks and the smallest useful next action;
9. the authorization boundary, including requested follow-up actions that were not
   performed; and
10. the code readability review: consistent patterns, concern grouping, and reasons
    for any remaining hacky or tricky implementation.

Scale the report to the work without dropping fidelity, execution, or readability
evidence. When evaluating speed, use measured elapsed time through integration and
validation, including coordination, waits, recovery, and rework. Compare only runs
that meet the same fidelity and readability criteria. Do not claim unmeasured speedups
or rerun the task serially solely to produce a comparison.

## Stop at the authorized boundary

Unless the user separately and unambiguously authorizes them, stop after workspace
edits and validation. Do not:

- create, amend, rewrite, rebase, merge, or otherwise alter commits or branches;
- push, open or update pull requests, create releases, or change remotes;
- deploy, publish, install globally, purchase, send messages, or mutate external
  services, trackers, or production configuration.

Mention such actions only as possible next steps. Never broaden authority merely
because implementation or validation succeeded.
