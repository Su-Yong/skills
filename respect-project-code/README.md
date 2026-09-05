# Respect Project Code

A standalone, instruction-only Codex skill for writing code that fits an existing project and changes no more than necessary. No existing skill or repository is modified by this package. It does not install itself or change Codex settings.

## Core behavior

The skill follows a short loop: inspect the starting state → learn the local conventions → select a minimal correct change → edit only necessary code → validate behavior and the actual delta → stop.

“Minimal” means the smallest coherent behavioral and review surface, not the fewest lines regardless of correctness. Necessary tests, callers, types, exports, and generated files are included. Unrelated refactoring, whole-project formatting, speculative abstractions, and incidental dependency changes are excluded. Existing user edits must survive.

The shared contract remains model-neutral. Optional Astra and Sol behavioral corrections are selected one at a time; they do not add a second workflow. The original purpose and all six common stages are preserved unchanged.

## Model-specific composition

```text
respect-project-code — common contract (always)
  + Astra behavioral corrections (when selected)
  OR Sol behavioral corrections (when selected)
  OR no profile (common only)
```

The selector is defined once in [SKILL.md](SKILL.md). A trusted current-agent ID `gpt-6-astra` selects Astra; `gpt-5.6-sol` or OpenAI's `gpt-5.6` alias selects Sol. Missing/unmapped identity defaults to common only. It does not guess from project code or model names mentioned in a prompt.

When runtime identity is unavailable or unmapped, an explicit skill-level hint can choose a profile:

```text
$respect-project-code
respect-project-code profile: astra
Fix the empty-input error without changing neighboring behavior.
```

Use `respect-project-code profile: sol` for the Sol fallback. An explicit `respect-project-code profile: common` disables additions even for a recognized model. An Astra/Sol hint never overrides a recognized runtime model. Invalid or conflicting fallback hints result in common only. These are prompt instructions interpreted by this skill, not built-in Codex commands, configuration keys, or model switches.

Astra's additions focus on repository-resolvable decisions, literal instruction boundaries, proportional verification, useful delegation, and reporting. Sol's focus on complete evidence despite brevity, economical context, bounded initiative, and direct tooling. See the English profiles and their full Korean mirrors under `references/`. Source mapping is in [model-profile-sources.md](references/model-profile-sources.md).

## Install locally

Extract the archive and copy its `respect-project-code` folder to **one** location:

| Scope | Destination |
| --- | --- |
| Personal, across projects | `$HOME/.agents/skills/respect-project-code/` |
| A single repository | `<repo>/.agents/skills/respect-project-code/` |

The final path must end in `respect-project-code/SKILL.md`; avoid accidentally nesting the folder twice. For native Windows, `$HOME` is your user profile directory. For WSL or a remote Codex environment, use the home directory in that environment. Do not overwrite an existing same-named skill without reviewing it.

Codex detects local skill changes automatically; restart Codex if it does not appear. Check `/skills` or the skill selector. This archive is a direct local skill folder, not a plugin-directory upload package.

## Rename an existing installation

The previous name was `minimal-change-coder`. Review and preserve any local customizations before replacing that installation. Install the new folder as `respect-project-code`, update old invocation references to `$respect-project-code`, and disable the old copy or keep it outside skill discovery locations so both coding disciplines are not selected together. This archive does not change installed copies, other skills, or host settings automatically.

## Use

```text
$respect-project-code
Fix the error that occurs when the search field is empty.
Preserve the existing component structure, error handling, and test conventions.
```

With another implementation workflow already active, mention `$respect-project-code` as the coding discipline; the existing workflow still owns its planning and delivery steps.

`agents/openai.yaml` enables implicit invocation with `allow_implicit_invocation: true`. This permits Codex to select the skill for matching tasks; it is not a guarantee that every coding task will use it. Explicitly mention `$respect-project-code` when its application matters. To make it explicit-only, change that value to `false` in your installed copy. This package does not modify `AGENTS.md` or create an always-on rule.

## Contents

| File | Purpose |
| --- | --- |
| [SKILL.md](SKILL.md) | Canonical English runtime instructions. |
| [SKILL.ko.md](SKILL.ko.md) | Full Korean mirror for review; not a second entrypoint. |
| [agents/openai.yaml](agents/openai.yaml) | Codex display metadata, default prompt, and invocation policy. |
| [README.md](README.md) / [README.ko.md](README.ko.md) | Installation and usage in English and Korean. |
| [tests/acceptance.md](tests/acceptance.md) / [tests/acceptance.ko.md](tests/acceptance.ko.md) | Eighteen unchanged common behavioral scenarios and their pass criteria. |

Additional files:

| File | Purpose |
| --- | --- |
| [references/gpt-6-astra.md](references/gpt-6-astra.md) / [Korean mirror](references/gpt-6-astra.ko.md) | Astra-only corrections. |
| [references/gpt-5.6-sol.md](references/gpt-5.6-sol.md) / [Korean mirror](references/gpt-5.6-sol.ko.md) | Sol-only corrections. |
| [references/model-profile-sources.md](references/model-profile-sources.md) / [Korean mirror](references/model-profile-sources.ko.md) | Official sources and adaptation boundaries. |
| [tests/model-profiles.md](tests/model-profiles.md) / [Korean mirror](tests/model-profiles.ko.md) | Sixteen routing, isolation, and behavioral scenarios. |

For ordinary coding, read the canonical skill and at most the selected English profile. Installation docs, mirrors, source mapping, and evaluation scenarios are not required runtime context. No scripts, assets, or tool dependencies are bundled.

## Verification and limitations

Package checks cover UTF-8 files, YAML parsing, required metadata, matching skill/folder names, local links, paired document structure, and ZIP integrity. These are packaging checks, not proof of agent behavior. Actual Codex sessions and the eighteen common plus sixteen profile scenarios have not been run for this release; their status is `NOT_RUN`. Static preservation checks compare the original and updated common sections byte-for-byte; routing simulations test the documented selector, not actual model adherence. Instructions can guide a model, but cannot mechanically enforce minimal edits or replace code review and tests.

The Korean files preserve the English documents’ rules, examples, technical identifiers, and caveats. Treat `SKILL.md` as canonical and update its Korean mirror when changing policy.

## Official references

Authoring and local discovery were checked against OpenAI documentation on 2026-09-06. Model-specific source provenance is recorded separately in [references/model-profile-sources.md](references/model-profile-sources.md). The following are documentation locations, not runtime dependencies:

```text
https://developers.openai.com/codex/skills
https://learn.chatgpt.com/docs/build-skills
```
