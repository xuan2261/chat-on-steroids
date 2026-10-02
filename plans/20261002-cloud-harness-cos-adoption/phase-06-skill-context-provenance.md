# Phase 06 — Skill/context provenance and package identity

**Status:** PLANNED  
**Lineage:** #208, #360, #380  
**Cloud Harness concept:** explicit provenance/trust tiers and digest-bound executable content

## Goal

Make capability origin and version identity clear without creating a second Skills/Plugins source of truth.

## Candidate slices

1. Inventory current provenance already owned by managed Skills, imported Skills, standalone Plugins and Codex plugin bridges.
2. Add stable source/package/version identifiers where missing.
3. Add content digest only where it protects a real execution/update boundary; do not hash everything for display.
4. Preserve manual/explicit Skill selection as authority; automatic routing remains relevance only.
5. Keep plugin package boundaries intact instead of copying resources into CoS-managed duplicates.

## Tests

- deterministic collision handling
- enabled/current plugin version wins over stale cache copies
- provenance survives restart
- explicit selection overrides auto-routing
- source metadata cannot elevate permissions
- digest mismatch fails closed only at a boundary that actually requires integrity pinning

## Stop criteria

No generic "trusted/untrusted" label may override existing permission checks or imply repository text is safe to execute.
