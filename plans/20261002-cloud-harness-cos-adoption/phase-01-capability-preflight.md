# Phase 01 — Send-time Core capability/preflight projection

**Status:** READY NEXT  
**Lineage:** #208, #482  
**Cloud Harness concept:** `workspace_capabilities`

## Goal

Let the model know the **current effective CoS authority before attempting work**, without adding a new public MCP tool.

## Proposed first slice

Use the existing `currentCoreInstructions()` path, which is already evaluated when a user send is prepared from current config, effective capabilities, read-only state and roots.

Add a small bounded generated section such as:

- read-only: on/off
- current Core capability classes enabled/disabled
- session recording feature: on/off
- agents feature: on/off
- approved virtual root names/count, never native host paths
- command-policy state only if a current authoritative helper already exposes it cleanly

Machine behavior continues to depend on typed capability guards, never on parsing instruction prose.

## Likely files

- `src/main/mcp/instructions.ts`
- possibly one small pure projection helper
- `test/mcp.test.ts` or focused instructions tests
- docs only if model-facing contract materially changes

## Tests

- [ ] Same config → deterministic snapshot.
- [ ] Read-only removes effective write/command authority in the snapshot.
- [ ] Disabled capability is not advertised as usable.
- [ ] Mid-session config change is reflected on the next prepared send.
- [ ] Virtual roots may be named; native host paths are never emitted.
- [ ] Snapshot is bounded.
- [ ] No new tool appears in `tools/list`.
- [ ] Existing live handler permission checks remain authoritative.

## Security invariant

This is a projection only. It grants no permission, stores no new authority and cannot override live guards.

## PR gate

Open only after a fail-first test shows current instructions lack the desired preflight state and the proposed text remains smaller/safer than a new MCP schema.
