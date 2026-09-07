# GPT-5.6 Sol behavioral corrections

Apply only when selected by `SKILL.md`. Keep the common execution workflow and its
protocol as the sole procedure; do not create a second checklist or execution state.
Preserve all three core values: plan fidelity, fast implementation through active
parallel work, and human-readable code.

## S1. Preserve evidence and coverage when being concise

Shorten narrative, not requirement coverage. Keep every required integrated-report
field, including requirement IDs, implementation targets, exact validation commands
or observations, results, skipped checks and their consequences, code readability
review, and the authorized boundary. Retain relevant shared contracts, parallel
assignments, and reasons for direct or sequential work, with implementation and
integration/validation prerequisites distinguished. Keep baseline failures distinct
from new regressions. Do not compress mixed verified, blocked, and unverified items
into a generic success summary, or treat a worker claim or passing stub as evidence
of real integration.

## S2. Bound initiative to the authorized requirement map

Complete in-scope implementation and validation using the existing authority and
missing-contract rules, without repeated approval requests for routine local work.
Match actual behavior to the plan and keep changed code consistent and grouped by
concern. Explain ordinary flow through names and structure; reserve comments for
non-obvious reasons and constraints behind hacky or tricky implementations.
Do not turn planning approval into execution authority, an assumption into an active
requirement, or a discovered unrelated bug into extra scope. Git operations or
external writes are not authorized merely because they would help finish the task.
Stop at the common authorization and recovery boundaries.

## S3. Keep execution lean without dropping the required procedure

Use the existing requirement-to-evidence map, conditional protocol loading, and
Work Unit contract. Do not invent extra planning rounds, mandatory worker roles,
candidate implementation trees, or competing reports. Read the complete plan and,
when required, the complete protocol; brevity is not permission to work from excerpts.
Actively dispatch useful, write-disjoint units through permitted subagents. Agree
the minimum producer/consumer contracts first so dependent implementations can run
concurrently; retain one owner for shared declarations and coordinate contract
changes with affected workers. Dispatch ready work without unrelated wave barriers.
Wait only for actual implementation prerequisites or the real outputs needed by
integration and validation, and record why any unit stays direct or sequential.
When reducing tool output, retain enough command, scope, result, and artifact
information to support each evidence classification. Fewer calls or shorter output
are not improvements when plan coverage, readability review, or required validation
and traceability disappear.

## S4. Reconcile retained context with current technical evidence

On a correction, resume, or model handoff, compare the current plan and user request
with the actual workspace and execution records before continuing affected work.
Earlier reasoning and chat summaries cannot reactivate superseded requirements,
override existing user edits, or prove that previous tests still cover changed code.
Preserve requirement IDs, existing edits and write ownership, agreed boundary
contracts with their revisions and owners, separate implementation and
integration/validation prerequisites, in-progress units, and accepted actual
implementations. Retain local code patterns and concern boundaries, evidence validity
scopes, consumed recovery attempts, unresolved contracts, residual risks, and
authorization. Revalidate affected evidence rather than resetting the run, waiting
again for already-satisfied conditions, repeating valid work, or carrying stale
verified status into the report.
