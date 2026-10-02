# TODO — Cloud Harness → CoS focused PR sequence

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
- [x] PR #907: CI + CodeQL + PR checklist green; Ready for review.

## Later

- [x] Scout retained exec operation-state projection; defer PR because current main already has owner-scoped running/exited-unread/replay semantics and no concrete missing workflow was proven.
- [x] Opened focused worker-overview health issue #908 + draft PR #909 after incorporating #221 maintainer feedback.\n- [ ] PR #909: synced head `be31881a…`; fresh CodeQL/CI/checklist reruns in progress. Real before/after screenshots remain mandatory before Ready.
- [x] Opened Phase 04 draft PR #919 from current-main design lineage in #215.
- [ ] PR #919: checklist green; wait for CI + CodeQL, then final-review and mark Ready.
- [x] Remote plugin/OAuth network audit completed; any security-sensitive follow-up stays in the repository's private reporting channel.
- [x] Skill provenance inventory completed; CoS already owns exact GitHub origin/commit/revision/hash metadata.
- [x] Opened #917 + draft PR #918 to show installed `ref @ short-commit` without changing provenance authority.
- [ ] PR #918: CI + CodeQL + fail-first + PR checklist green; screenshots attached; Ready for review.
- [ ] #889 artifact export: hold public implementation because maintainer has announced their own plan; monitor and contribute only if requested.
- [ ] Re-evaluate Cloud Harness remote-executor adapter last.

## Stop rules

- [ ] Reject/defer anything that duplicates an existing CoS authority.
- [ ] Reject a new public tool when existing primitives/instructions are sufficient.
- [ ] Do not claim verification without a real test/build/runtime result.
- [ ] Do not open a generic parity PR containing unrelated capabilities.
