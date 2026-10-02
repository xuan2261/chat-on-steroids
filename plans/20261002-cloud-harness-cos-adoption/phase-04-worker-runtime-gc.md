# Phase 04 — Sleeping-worker runtime resource GC

**Status:** REVIEW FIX COMPLETE — WAITING #926 MERGE + LATEST-MAIN SYNC  
**Lineage:** #215, #482  
**PR:** #919  
**Cloud Harness concept:** durable identity lifetime != revocable runtime lifetime

## Current implementation

- Branch: `feat/sleeping-worker-runtime-gc`
- Base: upstream `a1879601684712cbc3d6100ee4fe2dacbdf1b7b4`
- Fail-first commit: `a9b90a6ec094aebed52509d6897321a49bb4ec33`
- Coordinator commit: `4b0e81c8db2a25da8a166db19a3d920cacec346a`
- Lifecycle/timer hook: `c808524a5e5b7c3a70e97ce7eb855cec84720b4a`
- Diff: 3 files, 568 additions / 1 deletion.

## Runtime policy

- Retention threshold: 30 minutes sleeping.
- Sweep cadence: one process-owned 10-minute interval.
- No per-worker timer.
- No worker liveness claim.
- No history/session deletion.
- Completed unread output is preserved.
- Exact ownership is removed synchronously before async termination.
- Failed termination restores ownership only when the same process id is still live and unowned.
- Shutdown stops/drains GC before normal process cleanup.

## Verification

- [x] Focused runtime-GC tests: 18/18 passed locally.
- [x] Typecheck passed locally.
- [x] Production build passed locally.
- [x] PR checklist passed.
- [x] CI passed.
- [x] CodeQL passed.
- [x] Final exact-head review completed.
- [x] Marked Ready for review.

## Invariants

Broker owns worker lifecycle; session store owns durable attachment; exec ownership owns custody; unified exec manager owns process lifetime. GC coordinates them and stores no second authority.


## Maintainer review follow-up

Maintainer accepted the ownership/race design but required safer product behavior before merge.

Implemented on the PR branch:
- cleanup is explicit opt-in and defaults off for fresh + legacy configs;
- successful process termination writes an app-owned note into the exact worker session;
- successful process termination emits an info log naming worker, process id and reason;
- Settings UI explains that worker chat/history remain reusable;
- all locale catalogs on that branch include the new setting copy;
- focused GC/config/feature-parity/i18n tests: 101/101 passed before the later upstream locale merge;
- typecheck + production build passed;
- before/after Settings screenshots attached.

The branch then merged upstream Russian/worker-health localization changes. Current upstream main still has the narrow Russian health-label gap tracked by #925 / PR #926; do not call #919 latest-main green until #926 lands and #919 is resynced/retested.
