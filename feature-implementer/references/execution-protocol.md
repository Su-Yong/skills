# Feature Implementer Execution Protocol

This protocol defines the detailed execution model for complex Feature Implementer
runs. Read it completely before editing when the work uses internal workers,
dependency waves, finite recovery, nontrivial integration, or complex validation.
For a small direct change, its invariants still apply even when the full protocol is
not loaded.

The protocol optimizes for:

```text
Plan Fidelity
+ Work Ownership
+ Adaptive Execution
+ Requirement Traceability
+ Evidence-based Validation
+ Strict Authorization Boundary
```

## 0. Sources of truth and precedence

Use two complementary sources of truth:

- **Planning document:** desired behavior, scope, non-goals, constraints, acceptance
  criteria, unresolved decisions, provenance, and authorized next action.
- **Repository evidence:** current architecture, behavior, code conventions,
  available abstractions, validation commands, baseline state, and existing user
  changes.

Do not use either source to silently override higher-priority runtime instructions or
explicit user authorization. When the plan and repository evidence materially
conflict, record the conflict and block only the affected requirement unless an
unambiguous safe interpretation exists.

An explicit implementation request authorizes repository investigation, workspace
edits, and validation within the plan's scope. It does not automatically authorize
Git-history changes, remote operations, deployment, publication, installation,
purchasing, messaging, or external-system mutation.

## 1. Normalize the planning document

### 1.1 Read the complete source

Read the entire identified planning document before editing. Record:

- source path or URL;
- title, revision, language, and completion state when present;
- current implementation authorization;
- active requirements;
- acceptance criteria and success evidence;
- scope and non-goals;
- constraints and compatibility commitments;
- risks and dependencies;
- unresolved, skipped, deferred, corrected, superseded, or conflicting items; and
- provenance or decision records.

Do not start from a summary when the complete source is available. Do not treat a
plan's explicit finish as implementation authority; the user's current request must
authorize implementation separately.

### 1.2 Support planner and general Markdown inputs

For a Feature Planner artifact, preserve stable identifiers such as:

- requirements: `R-*`;
- user decisions: `UD-*`;
- sourced facts: `SF-*`;
- agent recommendations or assumptions: `AR-*`;
- unresolved items: `OI-*`; and
- risks: `RK-*`.

Reuse these IDs in work units, code-change explanations, tests, and final evidence.
Do not invoke or depend on a Feature Planner runtime.

For a sufficiently concrete general Markdown plan, create an internal stable map:

- implementation requirements: `IR-*`;
- acceptance criteria: `IAC-*`;
- constraints: `IC-*`;
- non-goals: `ING-*`; and
- unresolved items: `IOI-*`.

These IDs exist only for execution traceability. Do not rewrite the user's source
plan merely to add them.

### 1.3 Create the requirement ledger

Create one record per active requirement:

```text
Requirement ID:
Statement:
Source / provenance:
Required or optional:
Acceptance criteria:
Constraints:
Dependencies:
Related non-goals / do-not-touch areas:
Unresolved decisions:
Authorized actions:
Implementation target: pending
Evidence target: pending
Implementation status: pending
Evidence status: pending
```

Inactive, corrected, or superseded requirements remain useful context but must not be
implemented as active scope unless the plan explicitly reactivates them.

### 1.4 Classify gaps without inventing contracts

For every missing detail, choose exactly one path:

1. **Discoverable technical fact** — inspect relevant repository evidence.
2. **Material user-owned contract** — mark dependent requirements `blocked` when the
   plan and repository cannot establish it safely.
3. **Non-blocking implementation choice** — resolve from repository evidence
   and record any consequence for requirement coverage or dependencies.
4. **Residual uncertainty** — continue, but record the uncertainty and consequence.

Material contracts include product behavior, public API meaning, data retention or
deletion semantics, authorization policy, migration guarantees, security posture,
compatibility promises, and user-visible failure behavior. Do not silently choose
among materially different outcomes.

A gap in one requirement does not stop independent work. Propagate the blocked state
only through actual dependencies.

## 2. Reuse repository findings and ownership records

Inspect relevant repository evidence and applicable instructions to resolve
implementation targets. Reuse available records and collect missing evidence.
Bring these findings into the execution record:

- instructions that constrain plan scope, validation, or authorized actions;
- target symbols and available validation commands;
- pre-existing changes overlapping planned units;
- edits owned by each unit and any unresolved ownership conflict; and
- baseline check evidence needed to classify later failures.

Missing baseline evidence is not proof of a clean workspace or a pre-existing
failure. An ownership conflict blocks the affected write scope, not independent
units. Reconcile ownership after concurrent changes, integration, or recovery.

## 3. Build the Requirement-to-Evidence Map

Create one map per requirement, reusing existing implementation records:

```text
Requirement ID and provenance:
Required behavior and acceptance criteria:
Target file(s) / symbol(s):
Plan constraints and non-goals:
Do-not-touch paths or behavior:
Ownership overlap:
Dependencies:
Acceptance evidence:
```

This map connects the intended behavior to execution and evidence. Use it to
allocate work, check plan coverage, and identify the stopping point for each requirement.

## 4. Build the work graph and choose execution depth

### 4.1 Identify work units and dependencies

Group requirement maps into implementation units. Two requirements may share a unit
when they are tightly coupled in the same file, contract, migration, generated
artifact, or validation path. Do not split tightly coupled work merely to create
parallelism.

Represent dependencies as a directed acyclic graph when possible:

```text
prerequisite unit
      ↓
dependent implementation
      ↓
integration or scenario validation
```

Cycles usually indicate that units should be combined or that an interface contract
must be established first.

### 4.2 Direct execution

The primary agent should work directly when the task is:

- one bounded change;
- low risk;
- small enough to understand and validate as a unit;
- concentrated in one tightly coupled write surface; or
- unlikely to gain material speed or quality from delegation.

A direct task still requires requirement mapping, work ownership, acceptance
evidence, and an integrated report.

### 4.3 Delegated execution

Use internal collaboration workers only when delegation has a concrete benefit:

- independent write-disjoint units can progress concurrently;
- dependency waves provide useful parallelism;
- a complex bounded subsystem benefits from specialist implementation; or
- risk justifies an independent read-only reviewer or validator.

Do not delegate solely because there are many checklist items. Do not make worker
availability a blocker when the primary agent can safely own the work.

A read-only review worker may inspect overlapping paths because it has no write
scope. Concurrent write workers must remain disjoint.

## 5. Define each Work Unit

Use this contract for every delegated unit and for complex direct units:

```text
ID:
Goal:
Linked requirements:
Dependencies:
Exclusive write scope:
Read-only context:
Do not touch:
Existing changes to preserve:
Implementation constraints:
Acceptance criteria:
Validation commands:
Expected report:
```

### 5.1 Exclusive write scope rules

The exclusive write scope must be precise and enforceable. Concurrent units must not
write to the same:

- file;
- tightly coupled symbol or public contract;
- migration chain;
- generated artifact;
- shared snapshot or golden file;
- package or lockfile;
- central registry; or
- core type definition and its generated outputs.

Directory-wide ownership is allowed only when the unit genuinely owns the entire
directory. Read-only context may overlap freely.

If several units must modify the same file or contract, combine them or serialize
them through dependencies.

### 5.2 Required worker context

Every worker assignment must state that:

- the workspace is shared and unrelated changes may appear while it runs;
- it owns only the listed write scope;
- its changes must remain attributable to its assigned scope and preserve listed
  pre-existing and concurrent work;
- it follows applicable repository instructions and reports into the existing
  requirement map and work graph;
- it must not spawn additional agents unless the primary agent explicitly delegates
  that coordination responsibility;
- it must run the specified targeted validation; and
- its report must identify changed files, requirement coverage, validation evidence,
  blocked items, unverified items, and baseline observations.

## 6. Execute dependency waves

Schedule only units whose dependencies have been integrated and reviewed.

Example:

```text
Wave 1
A: schema or core contract

Wave 2
B: API implementation
C: repository or UI implementation

Wave 3
D: integration and scenario validation
```

Within a wave:

- write scopes must be disjoint;
- no unit may depend on another unit in the same wave unless the dependency is
  read-only and already stable;
- the primary agent keeps enough attention for shared-workspace monitoring and
  integration; and
- downstream work is not released merely because a worker reports success.

After each wave, the primary agent must inspect and integrate prerequisite changes
before scheduling dependent work.

## 7. Inspect and integrate worker results

A worker's completion statement is not evidence. Before accepting a result, the
primary agent must inspect the actual workspace and verify:

1. changed paths stay inside the assigned write scope;
2. user-owned and other workers' changes remain present;
3. the semantic diff satisfies linked requirements;
4. non-goals and do-not-touch areas remain intact;
5. applicable repository constraints are satisfied;
6. dependency assumptions remain valid;
7. validation output is relevant, reproducible, and trustworthy; and
8. downstream units still have correct prerequisites.

Rerun important targeted checks when the worker output is incomplete, ambiguous, or
high risk.

If two valid results conflict, do not discard either wholesale. Resolve an obvious
small integration issue directly. Otherwise redefine ownership and create a bounded
serialized reconciliation unit.

## 8. Apply finite worker recovery

A worker attempt fails when it:

- cannot satisfy a required acceptance criterion;
- produces invalid or out-of-scope changes;
- damages user-owned or other worker changes;
- violates a material constraint or non-goal;
- lacks trustworthy validation; or
- reports success while the workspace does not support the claim.

Use this finite recovery sequence:

```text
Initial worker attempt
        │
        ├─ success → inspect, validate, integrate
        │
        └─ failure
              ↓
Primary agent investigates failure and workspace ownership
              ↓
Isolate or remove only invalid edits owned by that attempt
              ↓
Retry the same worker once with corrected context
        │
        ├─ success → inspect, validate, integrate
        │
        └─ failure
              ↓
Retry once with a different worker and updated context
        │
        ├─ success → inspect, validate, integrate
        │
        └─ failure
              ↓
Small mechanical or integration fix only?
        │                         │
       yes                       no
        │                         │
Primary agent fixes        mark unit blocked
```

Before cleaning a failed attempt, establish ownership. Remove only edits created by
that attempt and only when doing so cannot erase valid user or worker changes.

The primary agent may absorb a final fix only when it is small, mechanical, or a
bounded integration adjustment supported by the existing plan. It must not secretly
implement a large failed unit, change the work graph, weaken acceptance criteria, or
loop indefinitely.

## 9. Reconcile implementation with the plan

After a direct unit or worker integration, reconcile changed targets, dependencies,
and acceptance coverage with the requirement map. A newly discovered issue is not
an active requirement. Record its effect on dependent work and validation; resolve
material scope changes through the plan's existing decision boundary.

## 10. Account for acceptance coverage

Reuse implementation checks and their actual results. Classify evidence by its
coverage; these levels are labels, not a second mandatory sequence of test runs:

| Level | Coverage |
| --- | --- |
| 1 — Targeted | A requirement or work unit's acceptance criterion. |
| 2 — Integration | Changed contracts between units, such as API/service or schema/consumer. |
| 3 — Repository | Project-wide checks and the confidence their actual scope supports. |
| 4 — Scenario | The plan's observable happy, edge, failure, compatibility, or migration paths. |

Every required acceptance criterion needs meaningful evidence. Check cross-unit
contracts and plan scenarios when applicable. One result may cover multiple
criteria or levels; link it rather than rerunning it. Add checks for uncovered
criteria or evidence invalidated by integration. A broad passing command does not
establish coverage by itself.

### 10.1 Evidence record

Record each meaningful check as:

```text
Evidence ID:
Linked requirement / acceptance criterion:
Level:
Command or observation:
Environment and scope:
Result:
Classification:
Relevant output or artifact:
Skipped broader check and reason:
```

### 10.2 Evidence classifications

Use these classifications exactly:

- `verified` — meaningful evidence passed for the acceptance criterion.
- `blocked` — a missing decision, contract, tool, environment, permission, or
  capability prevents safe implementation or validation.
- `unverified` — implementation exists, but meaningful acceptance evidence could not
  be obtained.
- `baseline-failure` — the failed check predates the implementation or is
  demonstrably unrelated.

`baseline-failure` describes a check result; it does not by itself verify the linked
requirement. Use other successful evidence to mark that requirement verified, or
leave it unverified when no meaningful evidence remains.

A new failure introduced by the implementation is a **regression**, not a baseline
failure. Fix it, safely remove only current-run edits that caused it, or report a
non-complete outcome.

### 10.3 Incomplete coverage

When a full check is unavailable, extremely expensive, flaky, destructive, or
outside the available environment:

1. run the strongest narrower evidence available;
2. record exactly what was not run;
3. state why it was skipped;
4. explain which acceptance claims remain unverified; and
5. do not upgrade the status merely because the implementation looks plausible.

## 11. Decide completion honestly

### 11.1 Requirement-level state

Each required item ends in one of these states:

- `verified` — implementation exists and meaningful acceptance evidence passed;
- `blocked` — safe implementation or validation cannot proceed because of a specific
  missing prerequisite; or
- `unverified` — implementation exists or partial work is present, but evidence is
  insufficient.

Attach any `baseline-failure` evidence separately. Record new regressions explicitly.

### 11.2 Overall outcome

Use one outcome:

- **Complete** — every required item is verified and no new regression remains.
- **Partially Complete** — at least one meaningful independent item is verified, but
  one or more remaining items are blocked or unverified.
- **Blocked** — a core decision, contract, environment, permission, or capability
  prevents safe implementation and little or no valid progress can be completed.
- **Unverified** — the principal implementation exists, but meaningful evidence for
  core acceptance behavior is unavailable.

Use the most conservative accurate classification. Never report Complete when:

- any required item is blocked or unverified;
- a new regression remains;
- acceptance criteria were weakened;
- worker output was not inspected; or
- critical validation was skipped without equivalent evidence.

## 12. Produce the Integrated Implementation Report

Return one report owned by the primary agent. Do not forward raw worker reports as
the final result.

Use this structure:

```markdown
# Integrated Implementation Report

## Overall Outcome

`Complete | Partially Complete | Blocked | Unverified`

[One-paragraph explanation of the result and its limiting evidence.]

## Requirement Ledger

| Requirement | Implementation | Evidence | Status | Notes |
| --- | --- | --- | --- | --- |
| R-001 | `path/to/file` | `command` or observation | verified | ... |

## Change Inventory

### `path/to/file`
- Linked requirements: ...
- Why this change was necessary: ...

## Execution Summary

- Direct work: ...
- Delegated units and ownership: ...
- Dependency waves: ...
- Worker retries or recovery: ...
- Primary-agent integration: ...

## Validation Evidence

| Evidence | Level | Command or observation | Result | Classification |
| --- | --- | --- | --- | --- |

### Skipped or unavailable checks
- Check: ...
- Reason: ...
- Consequence: ...

## Baseline Separation

- Pre-existing or unrelated failures: ...
- Regressions introduced by this run: `none` or ...

## Blocked or Unverified Items

- Requirement: ...
- Exact blocker or missing evidence: ...
- Consequence: ...
- Smallest useful next action: ...

## Residual Risks

- ...

## Authorization Boundary

- Workspace changes and validation performed: ...
- Commit created: `no`, unless separately authorized
- Branch changed or created: `no`, unless separately authorized
- Push or pull request performed: `no`, unless separately authorized
- Deployment, publication, or external mutation performed: `no`, unless separately authorized
```

Include only execution details that occurred. Preserve stable plan IDs throughout the
report when available.

## 13. Stop at the authorized boundary

The normal stopping point is:

```text
workspace changes
+ validation
+ integrated report
```

Without separate explicit authorization, do not:

- create, amend, rewrite, rebase, merge, or otherwise alter commits;
- create, switch, rename, or delete branches;
- push or change remotes;
- open, update, merge, or close pull requests;
- deploy or publish;
- install globally or mutate shared environments;
- send messages or update external trackers; or
- change production or external-service configuration.

Do not infer authorization from successful validation, plan completion, repository
access, or the existence of credentials.

## 14. Behavioral Acceptance Matrix

Use this matrix when reviewing the skill or testing an execution run:

| Scenario | Required behavior |
| --- | --- |
| General Markdown plan | Build an internal requirement map without requiring Feature Planner. |
| Feature Planner artifact | Reuse stable IDs and provenance without depending on its runtime. |
| Plan approval only | Do not begin implementation. |
| Explicit implementation request | Permit bounded investigation, workspace edits, and validation. |
| Missing material contract | Block only dependent requirements; do not invent the contract. |
| Repository-discoverable fact | Inspect the repository instead of asking the user. |
| Pre-existing or concurrent edits | Track ownership before allocating, integrating, or recovering units. |
| Existing implementation records | Reuse valid findings and check results in the requirement map. |
| Single low-risk bounded task | Let the primary agent implement directly without artificial delegation. |
| Independent disjoint tasks | Allow parallel workers only when write scopes do not overlap. |
| Complex or risky task | Allow bounded worker implementation or independent read-only review. |
| Dependency chain | Integrate prerequisites before releasing downstream waves. |
| Shared file or contract | Serialize the work or combine it into one unit. |
| Worker claims success | Inspect the workspace and evidence before acceptance. |
| Worker fails | Same worker retry once, replacement once, limited primary recovery, then block. |
| Worker unavailable | Continue directly when safe; availability alone is not a blocker. |
| Existing test failure | Record baseline evidence and distinguish it from new regressions. |
| Missing validation coverage | Disclose which acceptance criteria lack evidence and their consequences. |
| New regression | Never classify the result Complete. |
| Implementation succeeds | Do not commit, push, open a PR, or deploy without separate authorization. |

## 15. Functional conformance checklist

Use this checklist when changing the Feature Implementer skill itself. Retired IDs
remain listed to preserve historical references; their former general code-editing
rules are no longer Feature Implementer gates.

| Requirement | Protocol gate |
| --- | --- |
| FI-001 | Section 1.1 requires reading the complete plan before edits. |
| FI-002 | Section 1.2 supports both Feature Planner and general Markdown plans. |
| FI-003 | Section 1.2 reuses planner stable IDs and provenance. |
| FI-004 | Sections 1.1–1.3 extract requirements, non-goals, constraints, and acceptance criteria. |
| FI-005 | Section 1.4 prohibits inventing material contracts. |
| FI-006 | Section 1.4 propagates blocking only through actual dependencies. |
| FI-007 | Section 2 reuses applicable repository constraints in execution records. |
| FI-008 | Retired: bounded code investigation is outside this execution protocol. |
| FI-009 | Retired: abstraction reuse is outside this execution protocol. |
| FI-010 | Section 2 records ownership overlap for scheduling and integration. |
| FI-011 | Sections 5 and 8 limit worker writes and recovery to owned scope. |
| FI-012 | Sections 1.3 and 3 map each requirement to targets and evidence. |
| FI-013 | Retired: semantic-diff minimality is outside this execution protocol. |
| FI-014 | Section 9 prevents discovered issues from becoming active requirements silently. |
| FI-015 | Section 4.2 allows direct primary-agent execution for bounded low-risk work. |
| FI-016 | Section 4.3 permits workers only when they provide material benefit. |
| FI-017 | Section 5.1 requires disjoint concurrent write scopes. |
| FI-018 | Section 6 enforces dependency-wave ordering. |
| FI-019 | Section 7 requires primary-agent workspace inspection and integration. |
| FI-020 | Section 7 rejects worker success claims as completion evidence. |
| FI-021 | Section 8 defines finite same-worker and replacement-worker retries. |
| FI-022 | Section 10 accounts for targeted, integration, repository, and scenario coverage without duplicate checks. |
| FI-023 | Sections 10.2 and 11 classify verified, blocked, and unverified evidence. |
| FI-024 | Sections 2 and 10.2 require evidence for baseline-failure classification. |
| FI-025 | Sections 10.2 and 11 prohibit Complete when a new regression remains. |
| FI-026 | Section 12 requires one integrated implementation report. |
| FI-027 | Section 13 prohibits unapproved Git-history and remote operations. |
| FI-028 | Section 13 prohibits unapproved deployment, publication, and external mutation. |
