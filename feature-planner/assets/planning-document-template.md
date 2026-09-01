# Feature Planner — Living Planning Document Template

Copy and adapt this structure to the domain. It defines the minimum planning state,
not a fixed questionnaire.

Before asking the first question, replace every bracketed example with substantive
content from the user's request and inspected evidence. When a value is genuinely
unknown, create an `OI-*` entry with its consequence instead of leaving a vague
placeholder. During an active or paused interview, write in the user's working
language. At explicit finish, use the base path for the authoritative English
version and create the Korean mirror as `<base-name>.ko.md`.

---

# [Outcome-oriented plan title]

> One authoritative living planning document. The document, not the chat, is the
> current planning state.

## Document State

| Field | Value |
| --- | --- |
| Interview state | `active` / `paused` / `explicitly-finished` |
| Working language | [language used during the interview] |
| Current revision | [monotonically increasing integer] |
| Last updated | [ISO 8601 timestamp with timezone] |
| Project or workspace root | [resolved root or `not writable / in-response draft`] |
| Base path | [authoritative English path, normally `docs/specs/<feature-slug>-spec.md`] |
| Korean mirror path | [normally `docs/specs/<feature-slug>-spec.ko.md`; created at finish] |
| Explicit finish received | `yes` / `no` |
| Next authorized action | [specific action already authorized, or `awaiting separate user authorization`] |

## Current Snapshot

- **Outcome:** [current best statement of the intended result]
- **Primary users or audience:** [current best identification]
- **In scope:** [compact boundary]
- **Out of scope:** [compact non-goals]
- **Current decision focus:** [area being refined]
- **Material unresolved items:** [active `OI-*` IDs or `none`]
- **Active question IDs:** [open `Q-*` IDs or `none`]

## Outcome and Context

### Desired Outcome

[Describe what should become possible or improve.]

### Problem and Background

[Describe the present problem, supplied context, and why the work matters.]

### Planning Boundary

[State what this plan is deciding and what remains outside planning or requires a
separate authorization.]

## Users and Stakeholders

| User or stakeholder | Need, responsibility, or concern | Evidence / source IDs | Status |
| --- | --- | --- | --- |
| [primary user] | [material need] | [UD/SF/AR/OI IDs] | active |

## Scope and Non-Goals

### In Scope

| Scope item | Source IDs | Status | Notes |
| --- | --- | --- | --- |
| [included capability, result, or process] | [UD/SF/AR/OI IDs] | active | [boundary] |

### Out of Scope / Non-Goals

| Excluded item | Source IDs | Status | Why excluded or deferred |
| --- | --- | --- | --- |
| [explicit exclusion] | [UD/SF/AR/OI IDs] | active | [reason] |

## Core Experience / Operating Flow

### Primary Flow

1. [Actor or system reaches the initial state.]
2. [Meaningful action or transition occurs.]
3. [Decision, validation, or system response occurs.]
4. [Observable result or handoff is produced.]

### Alternate, Error, or Edge Flows

| Condition | Expected behavior | Related requirement or decision IDs | Status |
| --- | --- | --- | --- |
| [alternate/error condition] | [expected handling] | [R/UD/OI IDs] | active / unresolved |

### State, Data, or Lifecycle Notes

[Describe relevant state transitions, retention, ownership, synchronization,
operational lifecycle, or domain-equivalent concerns. Omit categories that do not
apply, but preserve the decisions they represent.]

## Requirements

Keep IDs stable. Never leave an obsolete requirement active after its source was
corrected or superseded.

| ID | Requirement | Type | Source IDs | Priority | Status | Success evidence |
| --- | --- | --- | --- | --- | --- | --- |
| R-001 | [observable required behavior or outcome] | functional / quality / operational | [UD/SF/AR/OI IDs] | must / should / could | active | [acceptance test, metric, review, or artifact] |

## Constraints

Record only constraints supported by a source or clearly marked assumption.

| Category | Constraint | Source IDs | Consequence | Status |
| --- | --- | --- | --- | --- |
| technical / performance / cost / schedule / policy / security / compatibility / quality | [constraint] | [UD/SF/AR/OI IDs] | [design or scope impact] | active / proposed / unresolved |

## Success Evidence

Define how success will be observed, not merely that work was “implemented.”

| Related requirement IDs | Evidence or acceptance condition | Verification method | Owner or reviewer | Status |
| --- | --- | --- | --- | --- |
| [R-*] | [observable result, threshold, QA condition, user validation, or required artifact] | test / metric / inspection / review | [owner or unresolved] | proposed / active / blocked |

## Decision and Evidence Ledger

This is the audit log. Preserve corrected history rather than deleting it.

| ID | Kind | Statement | Evidence / rationale | Status | Consequence / linked IDs |
| --- | --- | --- | --- | --- | --- |
| UD-001 | user decision | [explicit user choice or condition] | [user message / revision] | active | [R/OI/RK/Q IDs] |
| SF-001 | sourced fact | [verified fact] | [revisitable file, section, symbol, line, or URL] | active | [planning impact] |
| AR-001 | agent recommendation / assumption | [advice or inference] | [evidence and uncertainty] | proposed | [impact if accepted; accepting creates a new UD] |
| OI-001 | unresolved item | [unknown, conflict, skipped, deferred, or blocked decision] | [why unresolved] | open | [scope, behavior, risk, or requirement impact] |

Typical statuses include `active`, `proposed`, `open`, `resolved`, `conflict`,
`skipped`, `deferred`, `corrected`, `superseded`, `cancelled`, and `blocked`.

## Question Register

Register a question here before asking it. Do not renumber or reuse IDs.

| ID | Decision needed | Why it matters | Related IDs | State | Asked / updated revision | Resolution |
| --- | --- | --- | --- | --- | --- | --- |
| Q-001 | [specific material decision] | [behavior, scope, cost, quality, or risk impact] | [OI/R/RK/UD IDs] | open | [revision] | [UD/OI ID or `pending`] |

Question states may include `open`, `answered`, `skipped`, `deferred`, `cancelled`,
and `conflict-resolution`.

## Corrections and Revision History

| Revision | Trigger | Change | Corrected / superseded IDs | Downstream sections and IDs reconciled |
| --- | --- | --- | --- | --- |
| 1 | Initial request and inspected context | Initial best planning hypothesis | none | Snapshot, scope, flow, requirements, risks, ledger, questions |

## Risks, Conflicts, and Dependencies

| ID | Kind | Risk, conflict, or dependency | Likelihood / impact | Mitigation, decision, or owner | Related IDs | Status |
| --- | --- | --- | --- | --- | --- | --- |
| RK-001 | risk / conflict / dependency | [material item] | [assessment] | [response, owner, or unresolved action] | [UD/SF/AR/OI/R IDs] | open |

## Open, Skipped, and Deferred Items

| ID | Item | State | Why it matters / consequence | Current recommendation | Owner | Revisit trigger |
| --- | --- | --- | --- | --- | --- | --- |
| OI-001 | [missing fact or decision] | open / conflict / skipped / deferred / blocked | [planning impact] | [AR-* or neutral] | [owner or unknown] | [specific event, evidence, milestone, or date] |

## Coverage and Consistency Check

| Planning area | State | Supporting IDs | Remaining gap or note |
| --- | --- | --- | --- |
| Outcome | covered / partial / open | [IDs] | [note] |
| Users and stakeholders | covered / partial / open | [IDs] | [note] |
| Scope | covered / partial / open | [IDs] | [note] |
| Non-goals | covered / partial / open | [IDs] | [note] |
| Core flow | covered / partial / open | [IDs] | [note] |
| Constraints | covered / partial / open | [IDs] | [note] |
| Success evidence | covered / partial / open | [IDs] | [note] |
| Risks and dependencies | covered / partial / open | [IDs] | [note] |
| Unresolved decisions | covered / partial / open | [IDs] | [note] |
| Handoff and authorization | covered / partial / open | [IDs] | [note] |

## Interview Checkpoint

- **Latest user message incorporated:** [summary and revision]
- **Latest sourced evidence incorporated:** [SF IDs and sources, or `none`]
- **Ledger transitions applied:** [new or changed IDs]
- **Affected sections reconciled:** [sections and requirement/risk/question IDs]
- **Contradictory active items check:** [passed, or list blockers]
- **Traceability check:** [passed, or list unlinked active requirements]
- **Current focus:** [one decision domain]
- **Next question IDs:** [registered open Q IDs, or `none`]
- **Resume point:** [where a new session should continue]

## Finalization and Handoff

Complete only after an explicit finish signal. Do not resolve open items merely to
make the document look finished.

- **Final interview state:** `explicitly-finished`
- **Authoritative English source:** [base path]
- **Korean mirror:** [`.ko.md` path]
- **Synchronization check:** [confirm identical stable IDs, statuses, requirements,
  decisions, risks, unresolved items, and next authorized action]
- **Remaining gaps and consequences:** [OI/RK IDs or `none`]
- **Assumptions still requiring confirmation:** [AR IDs or `none`]
- **Next authorized action:** [specific action already authorized, or
  `awaiting separate user authorization`]
- **Implementation handoff:** [relevant R/UD/SF/AR/OI/RK IDs and suggested executor,
  without requiring a proprietary schema]
- **Resume point if planning reopens:** [section, OI/Q IDs, and changed context to
  reconcile]

> Finishing or approving this plan does not authorize implementation, commits, pull
> requests, package installation, deployment, publishing, messaging, purchasing, or
> external-system changes. Those require separate explicit authorization.
