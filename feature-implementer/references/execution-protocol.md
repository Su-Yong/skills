# Feature Implementer Execution Protocol

This protocol defines the detailed execution model for complex Feature Implementer
runs. Read it completely before editing when the work uses internal workers,
shared boundary contracts, finite recovery, nontrivial integration, or complex validation.
For a small direct change, its invariants still apply even when the full protocol is
not loaded.

The protocol optimizes for:

```text
Plan Fidelity
+ Fast Implementation
+ Human-Readable Code
```

Shorten elapsed time through integration and validation while meeting the plan and
readability criteria. Work ownership, evidence-based completion, independent use,
and authorization boundaries support all three values.

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
Boundary contracts:
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

Before editing a Git repository, inspect relevant current staged and unstaged diffs
and untracked files. Pre-existing edits are user-owned; preserve their contents and
staging state during implementation, validation, integration, and recovery. Never
use reset, revert, clean, automatic stash, checkout/restore, broad formatting, or
file moves to discard or overwrite unowned work. For a non-Git repository, inspect
the relevant starting file state directly.

Inspect relevant repository evidence and applicable instructions to resolve
implementation targets. Reuse available records and collect missing evidence.
Bring these findings into the execution record:

- instructions that constrain plan scope, validation, or authorized actions;
- relevant source and tests, target symbols, existing helpers and public contracts;
- local naming, structure, control-flow patterns, and concern boundaries;
- available validation commands;
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
Implementation prerequisites:
Integration / validation prerequisites:
Boundary contracts:
Local code patterns and concern boundaries:
Acceptance evidence:
```

This map connects the intended behavior to execution and evidence. Use it to
allocate work, check plan coverage, and identify the stopping point for each requirement.

## 4. Build the work graph for parallel implementation

### 4.1 Identify work units and dependencies

Group requirement maps into verifiable feature units. Look for independent work and
producer/consumer units whose coding can proceed together once boundary contracts
are agreed. Runtime data flow does not by itself impose coding order.

Record coding and integration prerequisites separately:

| Dependency | Scheduling decision |
| --- | --- |
| An agreed input/output and behavior contract is enough to code | Agree the boundary and dispatch producer and consumer implementations together. |
| A shared declaration must exist first | One owner makes the minimum declaration edit, then releases separate implementation writers. |
| A real predecessor result is needed to make the next decision | Obtain that result in the smallest prerequisite unit; continue unrelated work. |
| Units must edit the same file, generated artifact, or migration chain | Assign the overlap to one owner or serialize only the conflicting writes. |
| Actual implementations must connect to validate behavior | Code and author checks concurrently where useful; run integration checks when their real prerequisites are ready. |

A work graph may have different edges for coding and integration. Resolve cycles by
establishing an interface or combining inseparable writes. Do not turn every shared
contract into one large serial implementation unit.

### 4.2 Direct execution

Direct work is appropriate for a small bounded change whose coordination cost
exceeds the benefit, a write surface that cannot be separated by contracts, or an
unavailable collaboration tool. Record the actual reason briefly. A call chain
alone is not a reason to serialize implementation.

A direct task still requires requirement mapping, work ownership, acceptance
evidence, and an integrated report.

### 4.3 Delegated execution

Actively use permitted collaboration workers to implement as much useful work
concurrently as capacity allows. Dispatch independent units and contract-ready
producer/consumer units to disjoint write scopes. Release ready work continuously,
and prioritize prerequisites that are holding other useful work back.

The primary agent owns contract alignment, scheduling, bottlenecks, and integration.
It may implement or validate work outside active worker write scopes. An independent
reviewer can help with complex or risky work. Worker count itself is not a success
metric, and unavailable workers do not block safe direct progress.

A read-only review worker may inspect overlapping paths because it has no write
scope. Concurrent write workers must remain disjoint.

## 5. Define each Work Unit

Use this contract for every delegated unit and for complex direct units:

```text
ID:
Goal:
Linked requirements:
Implementation prerequisites:
Integration / validation prerequisites:
Boundary contracts: inputs, outputs, behavior, errors:
Shared contract owner and agreed revision:
Exclusive write scope:
Read-only context:
Do not touch:
Existing changes to preserve:
Implementation constraints:
Local code patterns and concern boundaries:
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

If several units need a shared edit, assign it to one writer and parallelize the
remaining implementation against the agreed result. Combine or serialize only the
parts that cannot be given disjoint write scopes. Reading and implementing against
the same stable contract does not make producer and consumer bodies one write scope.

### 5.2 Required worker context

Every worker assignment must state that:

- the workspace is shared and unrelated changes may appear while it runs;
- it owns only the listed write scope;
- its changes must remain attributable to its assigned scope and preserve listed
  pre-existing and concurrent work;
- it follows applicable repository instructions and reports into the existing
  requirement map and work graph;
- it receives the same agreed boundary contract as its producers/consumers, with
  separate coding and integration prerequisites and a named contract owner;
- it follows the shared local code patterns and concern boundaries, using comments
  only for non-obvious reasons or constraints behind hacky or tricky code;
- it reports a proposed contract change to the primary agent rather than changing
  shared assumptions unilaterally;
- it must not spawn additional agents unless the primary agent explicitly delegates
  that coordination responsibility;
- it must run the specified targeted validation; and
- its report must identify changed files, requirement coverage, validation evidence,
  blocked items, unverified items, baseline observations, and readability concerns.

### 5.3 Agree the minimum boundary contract

Use plan and repository evidence to agree the boundaries needed for concurrent
coding. Include only relevant details:

- call points and names, input/output types, and data meaning;
- required/optional values, empty results, and edge conditions;
- success/failure behavior and error propagation;
- state changes, side effects, ordering, and compatibility constraints;
- write ownership, shared contract owner, and an identifiable agreed revision; and
- acceptance behavior to check with real implementations connected.

Reuse existing types and interfaces. One owner makes necessary shared declaration
edits before dependent writers start. Do not delay useful dispatch to predesign
internal implementation details or create contract paperwork for a unit with no
shared boundary. Pass the same agreement and relevant local code examples to each
affected worker.

Resolve local choices from evidence; missing material product or API semantics still
follow section 1.4. Never invent a contract merely to unlock concurrency.

## 6. Dispatch ready work and coordinate contracts

### 6.1 Continuous scheduling

Schedule units as soon as their coding prerequisites and disjoint write scopes are
ready and worker capacity is available. An agreed producer/consumer contract can be
a sufficient coding prerequisite before either implementation exists. Do not wait
for unrelated units to finish a wave.

Example:

```text
Runtime flow: A fetches data → B transforms it → C displays it

Short boundary alignment
  A output = B input
  B output = C input
  Behavior, errors, empty results, and shared ownership agreed
  Minimum shared declarations established if needed

Concurrent implementation in separate write scopes
  Worker A: fetching
  Worker B: transformation
  Worker C: display
  Primary: coordination and inspection/integration of ready results

Real implementations ready
  A and B ready → check the A+B boundary
  C ready too → check the complete scenario
```

B codes against A's agreed output and C against B's agreed output. A runtime call
chain does not require waiting for the preceding implementation to finish. Author
integration checks concurrently when useful; run them when their actual prerequisites
are available and stable.

Fixtures or stubs may support isolated tests or development when needed. A stub
result proves only the behavior it exercises, not the real producer/consumer
boundary. The final required execution path must use actual implementations.

### 6.2 Contract changes and necessary waits

When a worker finds a contract defect or gap, the primary agent identifies affected
producers and consumers, aligns the updated agreement, and updates their coding and
validation prerequisites. Hold only the affected portions while the agreement is
unresolved; keep independent work moving. Recheck evidence invalidated by the change.

Serialize conflicting shared edits or minimum work requiring actual predecessor
results. Inspect completed diffs and evidence before integrating them, and run actual
boundary checks as relevant implementations become ready. That integration gate does
not delay downstream coding already released by an agreed contract.

## 7. Inspect and integrate worker results

A worker's completion statement is not evidence. Before accepting a result, the
primary agent must inspect the actual workspace and verify:

1. changed paths stay inside the assigned write scope;
2. user-owned and other workers' changes remain present;
3. the semantic diff satisfies linked requirements;
4. non-goals and do-not-touch areas remain intact;
5. applicable repository constraints are satisfied;
6. real input/output behavior, errors, and side effects match the shared agreement;
7. coding and integration prerequisites remain correct for affected units;
8. names, structure, control flow, concern grouping, and comments meet section 7.1;
9. validation output supports the claims, distinguishing isolated from real
   integration results; and
10. no required behavior was omitted or silently altered to make the unit pass.

Collect missing meaningful evidence or rerun checks invalidated by changes. Reuse
valid results rather than repeating the same checks solely because a worker ran them.

If two valid results conflict, do not discard either wholesale. Resolve an obvious
small integration issue directly. Otherwise redefine ownership and create a bounded
serialized reconciliation unit.

### 7.1 Review code shape, concerns, and comments

Give workers relevant local examples before coding, then inspect the actual diff
and surrounding code at integration:

- Use the same vocabulary for the same concepts. Match declaration structure,
  branching, and error handling among similar functions or components in accordance
  with repository instructions.
- Keep data and logic that change for the same reason close together, separate
  distinct responsibilities, and maintain a coherent abstraction level in each
  function or block. Consistency includes structure and flow, not only whitespace.
- Do not force unrelated concerns into a shared abstraction because they look alike.
  Limit structural tidying to the active implementation and necessary integration.
- Express normal behavior through names and structure. Improve confusing code before
  adding prose; do not narrate assignments, calls, branches, or ordinary steps.
- Add comments only for non-obvious reasons or constraints behind unavoidable hacky
  workarounds or tricky logic. Explain why; include a known removal condition when
  useful.

Resolve readability problems with the relevant write owner. Formatter/linter success,
code size, file count, or comment volume does not replace this inspection.

## 8. Apply finite worker recovery

An outstanding integration check whose real prerequisites are still being built is
not itself a failed worker attempt. Record implementation and pending evidence
separately, then let the primary agent validate the connected result when ready.

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
boundary contracts, readability, and acceptance coverage with the requirement map.
Compare every active requirement's behavior, constraints, and non-goals to actual
changes: check omissions, semantic drift, and out-of-scope additions, even when tests
pass. Every changed file must serve active requirements or necessary integration and
validation. Do not add unrelated refactoring, cleanup, or dependency upgrades.

A newly discovered issue is not an active requirement. Record its effect on
dependent work and validation; resolve material scope changes through the plan's
existing decision boundary.

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

For parallel producer/consumer implementations, verify real inputs, outputs, errors,
side effects, and planned scenarios after connection. Stub-only evidence cannot
verify the real boundary. Record the code readability inspection separately from
behavioral evidence; neither replaces the other.

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

- **Complete** — every required item is verified, no plan mismatch or new regression
  remains, and changed code meets the readability and comment rules in section 7.1.
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

Resolve remaining plan mismatches and readability violations before reporting
Complete. A fast implementation that fails either criterion is not a successful run.

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
- Agreed boundary contracts and owners/revisions: ...
- Coding versus integration prerequisites: ...
- Reasons for direct/sequential work or waits: ...
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

## Code Readability

- Patterns and concern grouping checked in the actual code: ...
- Remaining hacky/tricky implementation and its non-obvious reason: ...

## Authorization Boundary

- Workspace changes and validation performed: ...
- Commit created: `no`, unless separately authorized
- Branch changed or created: `no`, unless separately authorized
- Push or pull request performed: `no`, unless separately authorized
- Deployment, publication, or external mutation performed: `no`, unless separately authorized
```

Include only execution details that occurred. Preserve stable plan IDs throughout the
report when available. Scale the report to the work; sections may be combined into
concise prose while retaining requirement status, evidence, and the three values.

When evaluating speed, record measured elapsed time from the start through final
integration and validation, including contract alignment, waits, recovery, and rework.
Compare only runs with the same plan, repository state, tools/worker conditions, and
fidelity/readability criteria. Do not claim improvements from worker count or an
unmeasured baseline, and do not rerun all work serially merely to obtain a comparison.

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
| Independent disjoint tasks | Actively dispatch useful parallel implementation within available capacity and disjoint write scopes. |
| Complex or risky task | Allow bounded worker implementation or independent read-only review. |
| A → B → C runtime chain | Agree A output/B input and B output/C input, implement concurrently, then verify connected real implementations. |
| Shared declaration needed first | One owner makes the minimum declaration edit before concurrent producer/consumer coding. |
| A real result is needed to decide the next implementation | Perform the minimum prerequisite and continue unaffected work. |
| Ready unit and available capacity | Dispatch now rather than wait for an unrelated wave to finish. |
| Contract changes during coding | Primary aligns affected producers/consumers and refreshes their prerequisites and invalidated evidence. |
| Shared file or writable contract | Assign shared edits to one writer or serialize only the overlap; parallelize separable implementation. |
| Stub checks pass | Leave the real integration criterion unverified until actual implementations are connected and checked. |
| Integration prerequisites still under construction | Record pending evidence without treating the wait alone as worker failure or consuming retries. |
| Worker claims success | Inspect the workspace and evidence before acceptance. |
| Worker fails | Same worker retry once, replacement once, limited primary recovery, then block. |
| Worker unavailable | Continue directly when safe; availability alone is not a blocker. |
| Existing test failure | Record baseline evidence and distinguish it from new regressions. |
| Missing validation coverage | Disclose which acceptance criteria lack evidence and their consequences. |
| Similar features implemented by different workers | Share naming, declaration, and control-flow patterns; inspect consistency in the integrated code. |
| Related logic scattered across a change | Group the same concern while retaining distinct responsibility boundaries. |
| Similar-looking code with different concerns | Preserve separate responsibilities instead of forcing a common abstraction. |
| Ordinary code appears to need explanatory comments | Improve names and structure instead of adding narration. |
| Unavoidable hacky or tricky implementation | Comment only on its non-obvious reason or constraint. |
| Fast output with a plan omission or readability violation | Correct and recheck it before calling the run successful. |
| New regression | Never classify the result Complete. |
| Implementation succeeds | Do not commit, push, open a PR, or deploy without separate authorization. |

## 15. Functional conformance checklist

Use this checklist when changing the Feature Implementer skill itself. The IDs map
to the active requirements in [SPEC.md](../SPEC.md), revision 4. FI-008, FI-009, and
FI-013 use their current spec meanings; historical retired wording does not override
this contract or impose a minimal-diff rule.

| Requirement | Protocol gate |
| --- | --- |
| FI-001 | Section 1.1 requires reading the complete plan before edits. |
| FI-002 | Section 1.2 supports both Feature Planner and general Markdown plans. |
| FI-003 | Section 1.2 reuses planner stable IDs and provenance. |
| FI-004 | Sections 1.1–1.3 extract requirements, non-goals, constraints, and acceptance criteria. |
| FI-005 | Section 1.4 prohibits inventing material contracts. |
| FI-006 | Section 1.4 propagates blocking only through actual dependencies. |
| FI-007 | Section 2 reuses applicable repository constraints in execution records. |
| FI-008 | Sections 2 and 3 inspect relevant source/tests to identify targets, ownership, dependencies, patterns, and validation. |
| FI-009 | Sections 2, 3, and 5.3 use existing implementations and public contracts to choose targets consistent with the plan and repository. |
| FI-010 | Section 2 requires current staged/unstaged and untracked inspection before editing and records ownership overlap. |
| FI-011 | Section 2 preserves user-owned changes in direct and delegated work; sections 5 and 8 limit worker writes and recovery to owned scope. |
| FI-012 | Sections 1.3 and 3 map each requirement to targets and evidence. |
| FI-013 | Section 9 connects every change to active requirements or necessary integration/validation and checks plan fidelity. |
| FI-014 | Section 9 prevents discovered issues from becoming active requirements silently. |
| FI-015 | Section 4.2 allows direct primary-agent execution for bounded low-risk work. |
| FI-016 | Sections 4.3 and 6 actively dispatch useful parallel implementation within available tools and capacity. |
| FI-017 | Section 5.1 requires disjoint concurrent write scopes. |
| FI-018 | Sections 4–6 agree boundary contracts before concurrent coding and retain only necessary predecessor, integration, and shared-write ordering. |
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
| FI-029 | Sections 1–3 and 11–12 handle ordinary plans, execution, verification, and reporting without another skill. |
| FI-030 | Sections 4.2, 6.1, and 12 dispatch ready units and record actual reasons for direct/sequential work. |
| FI-031 | Sections 4.1 and 5 distinguish coding prerequisites from integration/validation prerequisites. |
| FI-032 | Sections 5.2–5.3 and 6.2 share contracts and owners/revisions and coordinate changes across affected producers/consumers. |
| FI-033 | Sections 6.1 and 10 require real integration evidence beyond fixture/stub checks. |
| FI-034 | Sections 5.2 and 7.1 align vocabulary, declaration structure, and control flow across similar responsibilities. |
| FI-035 | Sections 7.1 and 9 group concerns without forced abstractions or unrelated cleanup. |
| FI-036 | Section 7.1 reserves comments for non-obvious reasons and constraints behind hacky/tricky code. |
| FI-037 | Sections 7, 9, and 11 require primary-agent plan fidelity and readability review before Complete. |
