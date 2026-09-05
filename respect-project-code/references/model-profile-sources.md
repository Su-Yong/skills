# Model profile sources and maintenance

Review date: **2026-09-06**. This is a maintainer reference, not additional runtime policy. Do not browse these sources during ordinary project implementation just because the skill is active.

## Sources

**O1 — OpenAI, Model guidance, GPT-6 Astra tab.** Sections: Initiative and follow-through; Instruction following; Personality and writing style; Subagent delegation; Testing and verification. This tab documents clarification, instruction sensitivity, response presentation, delegation, and verification calibration.

```text
https://developers.openai.com/api/docs/guides/latest-model
```

**O2 — OpenAI, Model guidance, GPT-5.6 tab.** Sections: Favor leaner prompts; Define autonomy and approval boundaries; Set response length and style; Programmatic Tool Calling. The family guidance covers prompt economy, bounded action, completeness in short answers, and task-specific tool routing.

```text
https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6
```

**O3 — OpenAI, GPT-5.6 Sol model page.** Confirms `gpt-5.6-sol` and the `gpt-5.6` alias used by this package's matching table.

```text
https://developers.openai.com/api/docs/models/gpt-5.6-sol
```

**O4 — OpenAI, Build skills.** Used for the local skill layout, discovery locations, progressive disclosure, and optional `agents/openai.yaml` metadata.

```text
https://developers.openai.com/codex/skills
https://learn.chatgpt.com/docs/build-skills
```

## Mapping

| Profile rule | Source section | Application in this skill |
| --- | --- | --- |
| A1 | O1 / Initiative and follow-through | Continue authorized local work after style discovery. |
| A2 | O1 / Instruction following | Do not manufacture gates from the minimal-change contract. |
| A3 | O1 / Testing and verification | End redundant checking without dropping required coverage. |
| A4 | O1 / Subagent delegation | Bound useful delegation to the existing workflow. |
| A5 | O1 / Personality and writing style | Deliver the existing report without a second review essay. |
| S1 | O2 / Set response length and style | Keep implementation coverage and evidence despite brevity. |
| S2 | O2 / Favor leaner prompts | Reuse local evidence instead of restating the policy. |
| S3 | O2 / Define autonomy and approval boundaries | Keep initiative within authorized project changes. |
| S4 | O2 / Programmatic Tool Calling | Avoid tooling overhead and evidence loss in small edits. |

## Interpretation limits

The exact-ID selector, common-only fallback, explicit hint syntax, common-contract priority, worker isolation, and model-switch continuity are package design choices, not built-in Codex features or OpenAI-prescribed syntax. Likewise, examples involving callers, fixtures, and local style are adaptations to the user's requested coding discipline, not quoted model behavior claims.

The profiles deliberately do not import guide examples that would grant new repository/external permissions, force subagents, remove required tests, or change API/Codex parameters. Sol uses applicable GPT-5.6 family guidance; it is not claimed to have a separate Sol-only official prompting guide.

Do not generalize a profile to unknown IDs or future models. Recheck the source's displayed model tab and alias mapping before changing the routing table; the unparameterized latest-model URL may change its default over time. Update both language versions and the evaluation cases together. The package has not established a measured model-quality improvement.
