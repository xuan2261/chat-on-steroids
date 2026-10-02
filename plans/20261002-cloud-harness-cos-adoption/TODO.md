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
- [ ] PR #907: synced head `e6fc8d13…` on current main `3929c96…`; CodeQL green, CI + current checklist rerun still running. Move Ready only when exact-head checks settle green.

## Later

- [x] Scout retained exec operation-state projection; defer PR because current main already has owner-scoped running/exited-unread/replay semantics and no concrete missing workflow was proven.
- [x] Opened focused worker-overview health issue #908 + draft PR #909 after incorporating #221 maintainer feedback.\n- [ ] PR #909: synced head `be31881a…`; fresh CodeQL/CI/checklist reruns in progress. Real before/after screenshots remain mandatory before Ready.
- [ ] Sleeping-worker runtime GC (#215 lineage).
- [ ] Remote plugin network/credential audit; implement only proven gaps.
- [ ] Skill/context provenance and package identity (#208/#360/#380 lineage).
- [ ] Narrow artifact lifecycle starting with #889.
- [ ] Re-evaluate Cloud Harness remote-executor adapter last.

## Stop rules

- [ ] Reject/defer anything that duplicates an existing CoS authority.
- [ ] Reject a new public tool when existing primitives/instructions are sufficient.
- [ ] Do not claim verification without a real test/build/runtime result.
- [ ] Do not open a generic parity PR containing unrelated capabilities.
