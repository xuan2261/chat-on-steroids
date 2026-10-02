# Phase 03 — Worker-overview read-only health projection

**Status:** DRAFT PR #909 — UI EVIDENCE PENDING  
**Issue:** #908  
**PR:** #909  
**Lineage:** #210, #482, closed PR #221  
**Cloud Harness concept:** workspace/runtime status as a read-only projection

## Why this shape

PR #221 proved the classifier direction but was closed because it had no production consumer. Maintainer feedback explicitly invited a focused version wired to the worker overview.

This revision does not resurrect #221 unchanged. It projects only evidence the current worker pane already owns and displays the result immediately.

## Prepared implementation

- Branch: `feat/agent-health-worker-overview`
- Base: current upstream `main`
- Fail-first commit: `852b763a37ba4fafd7f5bc5a5d08fab84772202e`
- Implementation commit: `3e7f449ee21f38bb0ae2e59ce49e78a9d02311df`
- Compatibility cleanup: `98744b7f01947ba3c6723bb856bc70a12a14221a`
- Test cleanup: `cbd1e858e56a0894b16f8a1b57f7ba0999e26eb2`
- Synced head: `be31881ab5b1960e9f5a77be99a5dd51f032f5f8` on upstream `main` `3929c96…`.
- Diff remains limited to the projection, worker-pane consumer and focused tests.

## Projection

Inputs are limited to:
- exact broker worker/conversation binding
- broker lifecycle state
- session working evidence
- active-turn evidence

Outputs:
- healthy
- degraded
- unknown

The worker row renders the health label and a bounded hover explanation.

## Non-goals

- no watchdog
- no automatic retry/reload/wake
- no new timeout
- no second worker lifecycle state machine
- no control API changes
- no stalled-worker deadline policy in this first consumer slice

## Verification status

- [x] Fail-first job passed against base-branch code.
- [x] CodeQL passed.
- [ ] Fresh CI is running on synced head `be31881a…` after the broker-authority precedence fixes.
- [ ] Prior PR checklist failed only because visible UI changes require real before/after screenshots; current checklist rerun is queued/in progress.
- [ ] Add screenshots with placeholder data.
- [ ] Run/obtain `verify:ui` evidence before Ready for review.
- [ ] Final diff/security review after the exact-head checks settle.

## Security invariant

The projection is read-only. Broker/session state remains authoritative; the renderer cannot wake, retry, terminate or reclassify a worker's lifecycle.


## Broker-authority follow-up

Static review found that stale session activity must not override terminal/non-running broker lifecycle state. Added regressions and fixes:

- `45291b7e…` + `bfe6a7ad…`: broker `failed` wins over stale working/active-turn evidence.
- `5e58474f…` + `05edd8c5…`: broker `sleeping` / `finished` likewise remain authoritative.

`detached` intentionally differs: exact active work may still be healthy because browser absence does not prove server-side work ended.
