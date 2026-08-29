# Planning Document Template

Copy and adapt this structure. During the interview, keep one file in the user's
language. Use the base path for the authoritative English file at explicit finish
and create its Korean mirror as `<base-name>.ko.md`.

---

# [Plan title]

## Document State

- Interview state: `active | paused | explicitly-finished`
- Working language: [language]
- Current revision: [number]
- Last updated: [date and time]
- Base path: [authoritative English final path]
- Korean mirror: [base name].ko.md (created only at explicit finish)
- Next authorized action: [what may happen next, or `awaiting user authorization`]

## Current Snapshot

- Outcome: [current best statement of the desired result]
- Primary users or audience: [who benefits or uses it]
- In scope: [short summary]
- Out of scope: [short summary]
- Current focus: [the decision area being refined]
- Material unresolved items: [IDs or `none`]

## Outcome and Context

[Explain the problem, desired outcome, background, and why it matters.]

## Users and Stakeholders

[Describe users, audience, owners, affected parties, and their material needs.]

## Scope and Non-Goals

### In Scope

- [Included result or capability]

### Out of Scope

- [Explicit exclusion]

## Core Experience or Operating Flow

1. [First meaningful step or state]
2. [Next meaningful step or state]
3. [Expected result or handoff]

## Requirements

| ID | Requirement | Source or linked decision | Status |
| --- | --- | --- | --- |
| R-001 | [Required behavior or outcome] | [UD/SF/AR/OI ID] | active |

## Constraints and Success Evidence

### Constraints

- [Technical, budget, time, policy, quality, or compatibility constraint]

### Success Evidence

- [Observable acceptance signal, metric, test, review, or artifact]

## Decision and Evidence Ledger

Use stable IDs. Keep corrected history instead of deleting it.

| ID | Kind | Statement | Evidence or rationale | Status | Consequence |
| --- | --- | --- | --- | --- | --- |
| UD-001 | user decision | [Explicit user choice] | [User message or supplied source] | active | [Affected scope or requirement] |
| SF-001 | sourced fact | [Verified fact] | [File, URL, or evidence] | active | [Planning impact] |
| AR-001 | agent assumption/recommendation | [Inference or recommendation] | [Reasoning and uncertainty] | proposed | [What changes if accepted] |
| OI-001 | unresolved item | [Unknown, conflict, skip, or deferral] | [Why unresolved] | open | [Risk or blocked decision] |

Allowed statuses include `active`, `proposed`, `open`, `deferred`, `skipped`,
`corrected`, and `superseded`.

## Corrections and Revision History

| Revision | Change | Superseded or corrected IDs | Downstream updates |
| --- | --- | --- | --- |
| 1 | Initial planning hypothesis | none | Initial scope, requirements, risks, and questions |

## Risks, Conflicts, and Dependencies

| ID | Risk, conflict, or dependency | Likelihood/impact | Mitigation or owner | Status |
| --- | --- | --- | --- | --- |
| RK-001 | [Material uncertainty or dependency] | [Assessment] | [Response or owner] | open |

## Open, Skipped, and Deferred Items

| ID | Item | State | Why it matters | Recommendation | Revisit trigger |
| --- | --- | --- | --- | --- | --- |
| OI-001 | [Decision or missing fact] | open | [Consequence] | [Suggested answer, if any] | [When to revisit] |

## Interview Checkpoint

- Latest answers incorporated: [summary]
- Latest sourced evidence incorporated: [summary]
- Affected sections reconciled: [sections or IDs]
- Next question focus: [one related domain]
- Completeness check: [covered/gaps for outcome, users, scope, flow,
  constraints, success evidence, risks, unresolved decisions, and handoff]
- Explicit finish received: `yes | no`

## Finalization and Handoff

Complete this section only after an explicit finish signal.

- English source: [path]
- Korean mirror: [path]
- Synchronization check: [same IDs, statuses, requirements, decisions, risks,
  unresolved items, and next authorized action]
- Remaining gaps: [IDs and consequences, or `none`]
- Assumptions still requiring confirmation: [IDs or `none`]
- Next authorized action: [specific action already authorized, or
  `awaiting separate user authorization`]
- Resume point if planning reopens: [section and unresolved IDs]

> Finishing or approving this plan does not itself authorize implementation,
> publishing, messaging, purchasing, deployment, or external-system changes.
