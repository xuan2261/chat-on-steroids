# Phase 04 — Sleeping-worker runtime resource GC

**Status:** PLANNED  
**Lineage:** #215, #482  
**Cloud Harness concept:** TTL/resource cleanup separated from durable workspace identity

## Goal

Allow a sleeping worker's revocable runtime resources to end while its durable worker/chat/history identity remains reusable.

## Required invariants

- durable identity lifetime != process/runtime lifetime
- exact run + worker + conversation ownership
- sleeping is necessary but not sufficient
- re-check state/ownership immediately before cleanup
- wake/activity race aborts cleanup
- unknown process ownership fails closed
- worker history, inbox, project binding and conversation lineage survive

## Implementation shape

Use a coarse existing maintenance cadence or one explicitly owned sweep. Do not create a high-frequency watchdog.

## Tests

Follow #215's race matrix: before/after threshold, active/waking/detached exclusions, ownership change, in-flight work, ambiguous owner, duplicate `worker-1` names across runs and wake-after-GC.

## Dependency

Phase 00 must be merged. Phase 03 may supply evidence but must not become cleanup authority by itself.
