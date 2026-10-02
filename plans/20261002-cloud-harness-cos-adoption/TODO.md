# TODO — Cloud Harness → CoS focused PR sequence

Active review batch is #919/#926/#932. The existing hourly condition-watch is currently disabled; do not claim it is monitoring until re-enabled.

Canonical plan: `plans/20261002-cloud-harness-cos-adoption/plan.md`

## Now

- [x] PR #899: workflows executed on exact head.
- [x] PR #899: fail-first, CI, CodeQL and PR checklist all passed on `cc00a16…`.
- [x] PR #899: final code/security review completed.
- [x] PR #899: merged; maintainer confirmed release target 2.1.26.

## Next PR — Capability/preflight projection

- [x] Start from current upstream `main` (`bfa35eb2…`).
- [x] Add fail-first test for send-time effective capability state (`f459a5b…`).
- [x] Implement bounded current-authority instructions from existing `ToolContext` (`236f248…`).
- [x] No new MCP tool in the first slice.
- [x] Static review: snapshot contains only capability booleans/features; test asserts native approved path is absent.
- [x] Static review: live guards remain unchanged and authoritative.
- [ ] Run focused tests/typecheck/verify when runtime is available.
- [x] Static diff/security review: 2 files, +18/-0; projection-only.
- [x] Opened upstream issue #906 and draft PR #907 after #899 cleared its review gate.
- [x] PR #907: merged; ships in 2.1.26.

## Later

- [x] Scout retained exec operation-state projection; defer PR because current main already has owner-scoped running/exited-unread/replay semantics and no concrete missing workflow was proven.
- [x] Opened focused worker-overview health issue #908 + PR #909 after incorporating #221 maintainer feedback.
- [x] PR #909: localization review fix landed; merged and ships in 2.1.26.
- [x] Opened Phase 04 draft PR #919 from current-main design lineage in #215.
- [ ] PR #919: maintainer product feedback addressed (opt-in default-off + transcript note/info log + screenshots). Waiting for #926 baseline merge, then sync latest main and rerun checks.
- [x] Remote plugin/OAuth network audit completed; any security-sensitive follow-up stays in the repository's private reporting channel.
- [x] Skill provenance inventory completed; CoS already owns exact GitHub origin/commit/revision/hash metadata.
- [x] Opened #917 + draft PR #918 to show installed `ref @ short-commit` without changing provenance authority.
- [x] PR #918: merged; ships in 2.1.26.
- [ ] #889 artifact export: hold public implementation because maintainer has announced their own plan; monitor and contribute only if requested.
- [x] Verified current Plugins exposure supports >64 tools when schema bytes fit; opened docs correction #920 / PR #921 for the stale 64-tool statement.
- [x] PR #921: merged; Plugins publication docs now match the 256-tool/250 KB implementation.
- [ ] Re-evaluate Cloud Harness remote-executor adapter last using actual schema-byte footprint, not the obsolete 64-tool assumption.

## Parallel localization maintenance

- [ ] PR #926: exact-head CI + CodeQL + checklist green; Ready for review; merge restores Russian worker-health catalog parity on main.
- [ ] PR #932: Vietnamese localization Draft open. Fail-first tests + locale wiring committed; renderer/extension catalogs translating in parallel.
- [ ] After #926 merges, sync #919 and #932 to latest main before any Ready-for-review decision.

## Stop rules

- [ ] Reject/defer anything that duplicates an existing CoS authority.
- [ ] Reject a new public tool when existing primitives/instructions are sufficient.
- [ ] Do not claim verification without a real test/build/runtime result.
- [ ] Do not open a generic parity PR containing unrelated capabilities.
