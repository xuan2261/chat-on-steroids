# Phase 03 — Evidence-based read-only agent health projection

**Status:** PLANNED  
**Lineage:** #210, #482  
**Cloud Harness concept:** workspace/runtime status as a read-only projection

## Goal

Implement the smallest useful part of #210: a deterministic classifier over evidence CoS already owns.

## Scope

Pure typed projection only:

- broker lifecycle
- exact identity state
- running tool count
- generating/active-turn evidence
- browser presence/detach evidence
- existing owner-defined wait/blocker information

Return bounded typed fields such as activity/health/recommendedAction plus a concise human reason.

## Non-goals

- no watchdog
- no automatic retry/reload/wake
- no new timeout
- no second worker lifecycle state machine
- no parsing of reason strings for machine decisions

## Tests

Use the deterministic matrix already described in #210, including conflicting identity, in-flight tool work, sleeping/terminal states, detached browser evidence, existing deadlines and identical-input determinism.

## PR gate

If current source already provides an equivalent pure projection by implementation time, close this phase as already handled instead of duplicating it.
