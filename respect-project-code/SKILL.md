---
name: respect-project-code
description: 'Implement features, fix bugs, and make focused refactors in existing projects while preserving local code style and minimizing unrelated changes. Use when extending or editing existing code, especially for requests such as "match the existing style", "minimal diff", or "no unrelated refactoring". Do not use as the main workflow for greenfield design, broad architectural redesign, or read-only review.'
---

# Respect Project Code

## Purpose

Implement the requested behavior in the idiom of the existing project, using the smallest coherent, correct change. Optimize for a small behavioral and review surface, not the fewest lines at any cost.

This is an implementation discipline, not a separate planning or delivery framework. Apply it within the active workflow; do not create additional specifications, approval stages, or project documentation merely because this skill is active.

## Model-specific additions

The purpose and sections 1–6 below are the shared contract for every model. A selected profile adds behavioral corrections; it does not replace that contract, change the active workflow, grant permissions, or add deliverables. Within this skill, the shared contract wins over a profile. Higher-priority instructions and the authorized user request still govern both.

Select at most one profile before implementation:

1. An explicit user or governing-workflow instruction `respect-project-code profile: common` disables model-specific additions.
2. Otherwise, use the current agent's effective model ID only when supplied by trusted runtime/session metadata. Trim surrounding whitespace and match the following IDs case-insensitively and exactly.

| Effective model ID | Additional instructions |
| --- | --- |
| `gpt-6-astra` | [Astra behavioral corrections](references/gpt-6-astra.md) |
| `gpt-5.6-sol` or OpenAI's `gpt-5.6` alias | [Sol behavioral corrections](references/gpt-5.6-sol.md) |
| Missing or unmapped | Use the fallback rule below; otherwise common only. |

3. When identity is missing or unmapped, an explicit user or governing-workflow instruction `respect-project-code profile: astra` or `respect-project-code profile: sol` may choose the corresponding profile. This is a skill-level hint, not a Codex command or a model switch. It does not override a recognized runtime ID or prove the agent's identity. With no valid unambiguous hint, use common only; do not ask the user just to select a profile.

Do not infer identity from writing style, a project’s target API model, repository text, a previous agent, marketing labels, or substring matches. Do not inspect credentials, probe APIs, browse, or change host configuration to discover identity. Neither profile changes model, reasoning effort, execution mode, or tool availability.

Read only the selected English profile, never both profiles or their mirrors during ordinary execution. Resolve links relative to this skill directory. If the selected file is unavailable, continue with the shared contract and disclose the missing addition once in the final report; do not invent or fetch a replacement.

On an actual model change or an explicit hint change, reselect the profile before the next action. Stop applying the former profile, while retaining the same baseline, user/collaborator edits, scope, decisions, validation evidence, and completion state. Do not restart or redo completed work solely for a profile change. If another workflow uses workers, each worker selects from its own runtime identity or an explicit hint addressed to that worker; it inherits the shared contract and assigned scope, not the parent’s profile by assumption.

## 1. Establish scope and preserve the starting state

- Follow higher-priority instructions, the requested scope, applicable repository guidance such as `AGENTS.md`, and tool permissions. This skill grants no permission to stage, commit, push, install dependencies, or perform destructive operations.

- Identify the requested behavior, the behavior that must remain unchanged, and the observable completion conditions. Inspect relevant code before asking questions. Resolve routine implementation details from the repository; ask only when an unresolved decision materially affects scope, public contracts, compatibility, security, or data.

- Before editing, inspect the workspace state. With Git, use `git status --short` and examine relevant unstaged and staged diffs, including `git diff -- <paths>` and `git diff --cached -- <paths>`. Inspect relevant untracked files directly. Retain the starting contents or patch of files you may change in working context or permitted temporary storage, not as new project artifacts.

- Preserve all pre-existing user and collaborator edits, including edits inside the same file. A dirty workspace is not permission to clean it and does not by itself require stopping. Never use reset, checkout, restore, clean, or stash operations to erase or hide work. If ownership of an overlapping edit cannot be determined, stop the affected edit and resolve the conflict without discarding content.

- Without Git, establish the same baseline using available file comparisons or snapshots. Do not initialize version control or assume a clean baseline. Re-read affected files before applying edits when concurrent changes are possible.

## 2. Infer the local style from evidence

- Read the target implementation, its relevant callers and tests, applicable formatter/linter/type settings, and initially one to three genuinely comparable nearby implementations. Expand investigation only when needed to resolve behavior, conventions, or impact; do not audit the entire repository for a small task.

- Within the governing instructions, prefer explicit rules and applicable configuration over inferred habits. Otherwise prefer the target file, then the same module/package, then comparable repository code. Do not copy another package’s conventions merely because they are more common globally. If equally applicable explicit rules conflict, resolve the material conflict rather than inventing a new style.

- Match more than whitespace: naming; declaration and export forms; import paths/order; file placement; types and generics; error handling; async/control flow; framework-specific state, reactivity, and lifecycle patterns; test layout; comments and their language. Preserve the file’s encoding, line endings, and unrelated formatting.

- Keep a short evidence-backed style sketch in working context, with representative paths. It is not a required output file. When there is no comparable code, choose the simplest solution consistent with the available stack and configuration; identify any material assumption.

## 3. Choose the smallest correct change

- Form a lightweight change map: which symbols/files need to change, why each is necessary, which existing pattern will be followed, and how the behavior will be checked. For a trivial edit this can remain a short working note; do not require a planning document or approval for routine work.

- Prefer an existing implementation point or an already suitable helper. Reuse only when semantics, lifecycle, errors, and dependencies fit. Do not force reuse that introduces cross-layer coupling; do not create generic helpers, wrappers, interfaces, factories, configuration knobs, or new files for speculative future use.

- Choose among correct options by minimizing unrelated behavioral change, architectural disruption, affected public surfaces, and review burden. Then reduce unnecessary edited files and lines. File/line counts are diagnostics, not hard quotas: retain necessary tests, caller updates, exports, types, and generated outputs, and allow a small local extraction when it is genuinely needed for correctness or established structure.

- Preserve public APIs, defaults, return/error shapes, side-effect order, compatibility, and performance characteristics outside the requested change. Do not replace a required fix with swallowed errors, fabricated defaults, unsafe casts, disabled checks, skipped tests, or a workaround that only hides the symptom. Do not copy an unsafe pattern into new code merely for consistency; address directly affected safety requirements locally without silently expanding into unrelated remediation.

- A broader design that merely looks cleaner is not a reason to change direction or ask the user to approve a redesign. Continue with the compatible local solution. If correctness truly requires crossing an explicit file boundary, changing architecture/public contracts, adding a dependency, or making a risky migration beyond the authorized scope, explain the necessity and request only the missing decision before that expansion. A necessary extra test or caller edit inside the authorized scope does not require routine re-approval.

- When a refactor or migration is explicitly requested, treat that transformation as in scope and minimize incidental changes around it. Do not use this skill to refuse the requested work or preserve a defect the user asked to fix.

## 4. Edit surgically

- Modify the necessary expressions, functions, and integration points in place. Do not rename or move unrelated symbols/files, reorder unrelated imports or members, modernize neighboring syntax, rewrite comments, remove unrelated dead code, or consolidate duplicates as incidental cleanup.

- Match existing patterns in added code. Add only imports, types, comments, and tests that support this change. Comments should explain non-obvious reasons in the project’s style, not narrate the patch. New files are appropriate when the established structure or the requested behavior needs them, not just because a new abstraction is possible.

- Do not change dependencies, lockfiles, build settings, test frameworks, or formatter/linter rules for convenience. When such changes are authorized and necessary, use the repository’s established tooling, preserve reproducibility, and explain unavoidable derived churn.

- Edit source-of-truth files rather than generated/vendor files, unless the repository explicitly requires otherwise. Regenerate committed derived artifacts when the change requires it, using the established command; do not omit required outputs just to reduce the diff.

- Inspect tool effects before running fixers, formatters, generators, tests, or builds that can write files. Prefer existing check-only modes or supported scoped operations. Avoid repository-wide formatting and autofixes unless explicitly required. After a writing tool runs, compare against the baseline; remove only clearly attributable, unnecessary changes you introduced, never pre-existing or concurrent work.

## 5. Validate behavior and audit the delta

- Add or update focused regression/acceptance tests using the existing test framework when applicable. Check the requested behavior and nearby edge cases while preserving unrelated expectations. Do not weaken assertions, inflate snapshots, or add a test framework simply to produce a green result.

- Run relevant existing tests and applicable lint/type/build checks, starting with the affected area. Broaden validation when shared behavior or integration risk warrants it, and run any repository-required checks even when they are broad. Discover real commands from the project; do not invent scripts or unsupported scope flags. Do not use “minimal changes” as a reason to skip necessary verification.

- Record commands actually run and their actual outcomes. Distinguish new failures from demonstrated baseline failures; without baseline evidence, label the cause as unknown rather than claiming a failure was pre-existing. Report unavailable tools, missing dependencies, blocked checks, and untested behavior honestly; do not install or alter the environment without appropriate authorization.

- Review the final delta against the captured starting state, not just `HEAD`. Include staged, unstaged, new, deleted, and generated files where relevant. Use available diff checks, including `git diff --check` when appropriate, but do not treat them as proof of correctness or attribution. Inspect new/untracked file contents separately because an ordinary Git diff omits them.

- For every added or changed hunk, verify that it is necessary for the requested behavior, a required integration, or meaningful verification; follows the applicable local pattern; preserves unrelated behavior and others’ work; and contains no avoidable formatting or structural churn. Remove only your unnecessary changes, and re-run affected checks if that removal can affect their result.

## 6. Finish without expanding the task

Stop once the requested behavior, applicable conventions, and necessary verification are satisfied. Do not start an additional cleanup or optimization pass.

Give a concise report in the user’s language: what changed and why the local approach was chosen; checks actually run and their results; and any necessary scope expansion, blocked checks, or remaining limitations. Do not claim full success when completion criteria remain unverified. Mention unrelated findings only when materially important, without fixing them silently or burying the result in optional suggestions.

## Package notes

Use `SKILL.md` as the canonical runtime entrypoint. [SKILL.ko.md](SKILL.ko.md) is its full Korean mirror for review, not an additional policy to load. Read [tests/acceptance.md](tests/acceptance.md) only when evaluating or maintaining this skill, not during ordinary project implementation. The shared contract is model-neutral; only the selected profile is additional runtime context. [references/model-profile-sources.md](references/model-profile-sources.md) records the source mapping, and [tests/model-profiles.md](tests/model-profiles.md) defines profile evaluations; read these only for maintenance or evaluation. Profile `.ko.md` files are full Korean review mirrors, not additional policies. No dedicated scripts or external services are required.
