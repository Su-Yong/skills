# GPT-5.6 Sol behavioral corrections

Apply only when selected by `SKILL.md`. Keep the common execution workflow and its
protocol as the sole procedure; do not create a second checklist or execution state.

## S1. Preserve evidence and coverage when being concise

Shorten narrative, not requirement coverage. Keep every required integrated-report
field, including requirement IDs, implementation targets, exact validation commands
or observations, results, skipped checks and their consequences, and the authorized
boundary. Keep baseline failures distinct from new regressions. Do not compress
mixed verified, blocked, and unverified items into a generic success summary or
report a worker's completion claim as acceptance evidence.

## S2. Bound initiative to the authorized requirement map

Complete in-scope implementation and validation using the existing authority and
missing-contract rules, without repeated approval requests for routine local work.
Do not turn planning approval into execution authority, an assumption into an active
requirement, or a discovered unrelated bug into extra scope. Preserve user-owned
changes even when replacing them would be faster. A dependency upgrade, broad
refactor, Git operation, or external write is not authorized merely because it
would help finish the task. Stop at the common authorization and recovery boundaries.

## S3. Keep execution lean without dropping the required procedure

Use the existing minimal-change map, conditional protocol loading, and Work Unit
contract. Do not invent extra planning rounds, mandatory worker roles, candidate
implementation trees, or competing reports. Read the complete plan and, when
required, the complete protocol; brevity is not permission to work from excerpts.
When reducing tool output, retain enough command, scope, result, and artifact
information to support each evidence classification. Fewer calls or shorter output
are not improvements when required validation or traceability disappears.

## S4. Reconcile retained context with current technical evidence

On a correction, resume, or model handoff, compare the current plan and user request
with the actual workspace and execution records before continuing affected work.
Earlier reasoning and chat summaries cannot reactivate superseded requirements,
override existing user edits, or prove that previous tests still cover changed code.
Preserve requirement IDs, ownership, integrated prerequisites, and consumed recovery
attempts. Revalidate affected evidence rather than resetting the run, repeating
valid completed work, or carrying a stale verified status into the final report.
