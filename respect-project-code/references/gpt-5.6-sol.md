# Sol behavioral corrections

Apply only when the selector in [SKILL.md](../SKILL.md) chooses `sol`. The common purpose and sections 1–6 remain authoritative. OpenAI's GPT-5.6 family guidance is applied here to Sol; these are task-specific adaptations, not measured guarantees about this skill.

## S1 — Preserve completeness when compressing

Compress narration, not the requested behavior, necessary supporting edits, or verification evidence. In the common section 6 report, retain what changed, why the local pattern fits, actual check outcomes, and material gaps. A short “fixed, tests passed” is insufficient when a required check failed or could not run. Do not omit a required caller, type, export, or test to make the patch or report look smaller.

## S2 — Reuse context rather than repeating the policy

Use the existing style sketch and change map as compact working context instead of copying the entire common workflow into plans, comments, or worker prompts. Retain representative paths and behavior-changing constraints. Read missing relevant code before deciding; a shorter context is not a reason to skip necessary local evidence. Do not edit instruction files, discard active rules, or create repository notes merely to reduce prompt length.

## S3 — Keep initiative inside the authorized change

Use the common scope and approval rules once, without inventing repeated approval checkpoints for routine local edits. A diagnosis or review alone does not authorize a patch. Fill routine implementation gaps from the repository, but do not expand the goal into additional features, new dependencies, cosmetic UI redesign, or speculative abstraction. An explicit refactor remains in scope; a cleaner-looking alternative does not expand it.

## S4 — Keep tooling direct unless batching has a concrete benefit

Use the host's available normal tools for a focused edit, especially when each result determines the next action. Only use programmatic batching when already available and appropriate for a bounded, predictable stage such as read-only filtering of many known results. Preserve paths, relevant excerpts, errors, and check outcomes needed for subsequent judgment. Inspect decision-changing intermediate results directly. Do not hide broad rewrites in a batch, repeat completed calls for a different route, or add a tool/runtime dependency for efficiency. Fewer calls never substitute for the common final-delta audit.

## Provenance

Adapted from OpenAI's GPT-5.6 guidance, reviewed 2026-09-06. The source mapping and limits are in [model-profile-sources.md](model-profile-sources.md), a maintenance reference, not required runtime reading. [gpt-5.6-sol.ko.md](gpt-5.6-sol.ko.md) is the full Korean mirror.
