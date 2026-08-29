# Feature Implementer Execution Protocol

Use this protocol when an implementation run needs explicit work units, workers,
dependency waves, recovery, or nontrivial integration and validation. Adapt its
depth to the plan, but preserve the ownership, evidence, and authorization
invariants whether the primary agent works directly or delegates.

## 1. Plan Intake

Read the entire plan and record:

- source path and, when present, its revision or completion state;
- requirements and acceptance criteria;
- explicit non-goals and do-not-touch areas;
- user decisions versus sourced facts, agent recommendations, and unresolved
  items;
- technical, compatibility, migration, security, performance, and rollout
  constraints relevant to the requested work; and
- actions authorized now versus actions merely named as future work.

A `feature-planner` document may expose stable IDs and provenance tables. Reuse
those IDs when useful, but infer equivalent requirement records from an ordinary
Markdown plan instead of requiring a planner-specific schema.

Do not implement an affected requirement when the plan lacks an essential
contract that cannot be discovered safely from repository evidence. Record the
missing decision and its consequence. Continue units that do not depend on it.

## 2. Repository Baseline

Before editing, establish a bounded baseline:

1. Find and read applicable repository instruction files.
2. Locate the smallest relevant implementation and test surface.
3. Identify existing components, helpers, patterns, and configuration to reuse.
4. When Git exists, record branch-independent status plus staged and unstaged
   changes for relevant files.
5. Discover targeted validation commands and broader repository checks.
6. Run a cheap baseline check when it is necessary to distinguish existing
   failures from regressions and its cost is proportionate.

Do not reset, clean, stash, move, broadly reformat, or overwrite user-owned work.
If a required target already contains user changes, inspect and preserve them while
making the smallest compatible edit. Ask only when the plan and the existing change
express a material conflict that repository evidence cannot resolve.

## 3. Minimal-Change Map

For every requirement, identify:

- existing behavior to preserve;
- existing code or abstraction to reuse;
- exact file or symbol that must change;
- necessary tests or fixtures;
- behavior that must remain out of scope; and
- evidence that will prove completion.

Prefer a local change to a new abstraction when both satisfy the plan cleanly.
Introduce a shared abstraction or dependency only when the plan genuinely requires
it or existing architecture makes it the smaller semantic change. Reject unrelated
cleanup even when it would improve the code in isolation.

## 4. Work-Unit Contract

For multi-unit or delegated work, create one record per implementation unit. A
direct low-risk unit may instead use a compact requirement-to-target-and-evidence
map when the full record would add no useful coordination signal.

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

The exclusive write scope must be precise enough that concurrently running workers
do not edit the same file or tightly coupled symbols. A directory-wide scope is
appropriate only when the unit truly owns that directory. Read-only context may
overlap freely.

When a worker is used, its assignment must also state:

- the workspace is shared and other changes may appear during execution;
- do not revert, reset, discard, or overwrite changes outside the unit;
- do not broaden scope or opportunistically fix other issues;
- do not spawn further agents unless the primary agent explicitly reassigns that
  coordination responsibility;
- run the specified targeted validation; and
- report changed files, validation evidence, baseline observations, and any
  blocked or unverified acceptance criterion.

## 5. Delegation and Dependency Rules

Choose delegation from task shape and risk, not from unit count alone:

- The primary agent may implement and validate one low-risk, bounded unit directly.
- Delegate when independent, write-disjoint units can make useful concurrent
  progress or complexity or risk makes independent work or review materially
  useful. Never split work merely to manufacture parallelism.
- Run dependency-free delegated units in parallel when their write scopes do not
  overlap. Reserve capacity for primary-agent integration when practical, inspect
  each wave, and release downstream work only after its dependencies integrate.
- Do not concurrently assign the same file, generated artifact, migration chain,
  tightly coupled type contract, or shared test snapshot to multiple workers.

Use only internal collaboration sub-agents. Do not create separate user-owned tasks
as a substitute for workers. Worker availability alone is not a blocker: continue
directly when the primary agent can safely own the work. Block only when the work's
actual complexity, risk, contract, or capability prevents safe progress.

## 6. Shared-Workspace Coordination

The primary agent is the sole owner of the complete work graph and integration
decision. Workers own only their assigned write scopes.

Before accepting a worker result, the primary agent must:

1. Inspect the current workspace rather than relying only on the worker summary.
2. Confirm that changed paths stay within the assigned scope.
3. Confirm that user-owned and other workers' changes remain present.
4. Review the semantic diff against linked requirements and non-goals.
5. Check the worker's validation output and rerun important checks when necessary.
6. Reconcile downstream unit assumptions with the integrated state.

If two results conflict, do not discard either result wholesale. Resolve an obvious,
small integration conflict directly; otherwise revise ownership and delegate a
bounded reconciliation unit.

## 7. Worker Failure and Retry Policy

When a worker is used, its attempt fails when it cannot complete a required
acceptance criterion, produces invalid changes, exceeds its write scope, or lacks
trustworthy validation.

Apply this finite sequence:

1. Inspect the failure and shared workspace state.
2. Before another attempt, identify and isolate or remove only invalid or
   out-of-scope edits made by the failed attempt. Verify ownership first and
   preserve user-owned changes and valid changes from every worker.
3. Clarify missing context, constraints, or evidence and retry the same worker once.
4. If that retry fails, assign the unit once to a different worker with the updated
   context and the surviving valid workspace state.
5. If the replacement fails, let the primary agent fix only a small integration,
   conflict, or mechanical-alignment problem.
6. Otherwise mark the unit `blocked`, preserve valid independent work, and state
   the exact missing decision, contract, capability, or failing evidence.

Do not loop indefinitely, silently relax acceptance criteria, or call an unverified
unit complete.

## 8. Primary-Agent Ownership and Direct Work

The primary agent may implement one low-risk bounded unit directly and may perform
small integration, conflict resolution, or mechanical alignment supported by the
plan. It may remove invalid edits from the current run only after verifying
ownership and preserving user work.

Delegate when Section 5's independence, complexity, or risk test creates a
material benefit. After the finite worker retries, the primary agent may absorb
only a small integration or mechanical fix; otherwise block the unit rather than
quietly changing the work graph or acceptance criteria.

With or without workers, the primary agent owns requirement mapping,
minimal-change discipline, direct validation, baseline-failure classification,
and the integrated report.

## 9. Validation Ladder

Use the narrowest meaningful checks first, then expand in proportion to risk:

1. **Unit checks:** Tests, type checks, static analysis, build steps, or manual
   evidence tied directly to the unit's acceptance criteria.
2. **Integration checks:** Re-run checks across interacting units and inspect their
   combined runtime, type, data, or UI contract.
3. **Repository checks:** Run broader lint, typecheck, build, or test commands when
   repository convention and change impact justify the cost.
4. **Scenario checks:** Exercise the plan's observable acceptance paths, including
   edge and failure cases relevant to the implementation.

When a full check is unavailable or disproportionately costly, record what was not
run, why, and which narrower evidence was used instead. Classify evidence clearly:

- `verified`: meaningful validation passed for the acceptance criterion;
- `blocked`: implementation cannot safely proceed without a missing decision,
  contract, tool, or capability;
- `unverified`: implementation exists but a meaningful acceptance criterion could
  not be tested; and
- `baseline-failure`: the failure was present before or is demonstrably unrelated
  to the implementation.

A new failure caused by the implementation is neither a baseline failure nor a
completed result.

## 10. Final Integration Report

Deliver one consolidated report after all safe work and validation finish. Include:

1. Overall outcome: complete, partially complete, blocked, or unverified.
2. Requirement ledger: each requirement mapped to `verified`, `blocked`, or
   `unverified` evidence.
3. Change inventory: each changed file and why it was necessary.
4. Execution summary: direct and delegated units, dependencies, worker ownership
   and retries when applicable, and primary-agent integration work.
5. Validation evidence: commands or observations, results, and skipped checks.
6. Baseline separation: pre-existing failures versus new failures.
7. Residual risks and the smallest useful next action.
8. Authorization boundary: actions not taken because they require a separate
   request.

Do not commit, branch, rebase, merge, push, open or update a pull request, deploy,
publish, install, or modify an external system unless the user separately requests
that action.

## 11. Behavioral Acceptance Matrix

Use these scenarios when reviewing or changing the skill:

| Scenario | Required behavior |
| --- | --- |
| General Markdown input | Extract an executable requirement map without a planner dependency. |
| `feature-planner` artifact | Reuse stable structure and provenance without invoking a planner runtime. |
| Dirty or staged worktree | Preserve existing changes and identify the minimal compatible edit. |
| Multiple independent units | Run internal workers concurrently when their write scopes are disjoint and delegation provides useful progress. |
| Single low-risk unit | Let the primary agent implement and validate it directly without artificial delegation. |
| Independent review benefit | Use a worker when complexity or risk makes an independent implementation or review materially useful. |
| Dependency chain | Execute safe prerequisites in parallel waves and downstream work in order. |
| Shared-file conflict | Do not concurrently assign the same file or tightly coupled symbols. |
| Worker failure | Apply one same-worker retry, one replacement-worker retry, then limited recovery or blocking. |
| No worker available | Continue directly when safe; do not block solely because worker capacity is unavailable. |
| Missing essential contract | Block only the affected unit and do not invent the contract. |
| Expensive validation | Run targeted and impact-scope checks and disclose skipped broader checks. |
| Baseline failure | Separate pre-existing failures from regressions introduced by the work. |
| Authorization boundary | Make no installation, Git-history, remote, deployment, or external-system change without a separate request. |
