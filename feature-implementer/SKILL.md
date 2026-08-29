---
name: feature-implementer
description: Implement a specified planning document in an existing repository with the smallest verified semantic diff. Use when the user asks to implement a plan or feature document; do not use for planning-only, diagnosis-only, or review-only requests.
---

# Feature Implementer

Turn an implementation-ready plan into verified repository changes while keeping
the primary agent responsible for requirements, scope, evidence, and completion.

## Establish Authority and Inputs

An explicit request to use this skill with an identified plan authorizes repository
investigation, edits, and validation within that plan's scope. Plan completion or
approval by itself, plan inspection, diagnosis, and review do not authorize
implementation.

Read the entire plan before acting. Extract its requirements, non-goals,
constraints, acceptance criteria, unresolved items, provenance when available,
and authorization boundaries. Accept any sufficiently concrete Markdown plan;
reuse useful `feature-planner` IDs without requiring that skill or its schema.

Do not invent an essential product, API, data, or behavior contract. Block only
the affected work, continue safe independent work, and ask the user only when the
missing decision prevents further safe progress.

## Choose Execution Depth

Inspect applicable repository instructions, relevant implementation and tests,
established abstractions, validation commands, and observable baseline failures.
When Git exists, inspect relevant staged and unstaged changes. Treat existing
changes as user-owned: never reset, revert, overwrite, or broadly reformat them.

Define the minimal change as the smallest semantic diff that fulfills the plan
while preserving established behavior and architecture. Avoid unrelated cleanup,
dependency upgrades, and opportunistic fixes.

Map every requirement to a target and acceptance signal. The primary agent may
implement one low-risk, bounded unit directly. Use internal collaboration
sub-agents only when work divides into independent write-disjoint units, or when
complexity or risk makes independent implementation or review materially useful.
Worker availability alone must not block work the primary agent can safely do.

Read [the execution protocol](references/execution-protocol.md) completely before
editing when the run uses workers, dependency waves, recovery, or nontrivial
integration and validation. It contains the detailed work-unit, coordination,
recovery, validation, and reporting procedure. A direct low-risk unit may follow
the essential contract below without loading that procedure.

## Preserve the Execution Contract

- Keep the primary agent responsible for the whole plan, shared-workspace state,
  requirement tracking, integration, validation, failure classification, and the
  completion decision, whether or not workers are used.
- When workers are used, give them disjoint write scopes, preserve dependency
  order, inspect their actual changes, and apply the protocol's finite recovery
  policy. Never accept a worker's success claim as sufficient evidence.
- Validate from the narrowest meaningful checks outward in proportion to risk.
  Separate baseline failures from new regressions; mark meaningful missing
  evidence `unverified` and unsafe blocked work `blocked`.
- Do not present partial, blocked, or unverified work as complete.

## Report and Stop

Return one integrated report that maps requirements to evidence, explains each
changed file, records validation and skipped checks, separates baseline failures,
and identifies blocked items and residual risks.

Without a separate request, stop after workspace edits and validation. Do not
install skills, create or rewrite commits or branches, rebase, merge, push, open
or update pull requests, deploy, publish, message external systems, or mutate
external trackers.
