# TODO — Cloud Harness → CoS focused PR sequence

Canonical plan: `plans/20261002-cloud-harness-cos-adoption/plan.md`

## Now

- [ ] PR #899: get GitHub workflows out of `action_required` and actually executing.
- [ ] PR #899: verify fail-first, CI, CodeQL and PR checklist on the exact head SHA.
- [ ] PR #899: final code/security review.
- [ ] PR #899: mark Ready for review only after evidence is green.

## Next PR — Capability/preflight projection

- [ ] Rebase/start from current upstream `main`.
- [ ] Add fail-first tests for send-time effective capability state.
- [ ] Implement bounded current-authority instructions from existing `ToolContext`.
- [ ] Do not add a new MCP tool in the first slice.
- [ ] Confirm no native host paths or credentials are emitted.
- [ ] Confirm live guards remain authority.
- [ ] Run focused tests/typecheck/verify when runtime is available.
- [ ] Review diff and security invariants.
- [ ] Open upstream PR with `Refs #208` and `Refs #482` after PR #899 is no longer blocking reviewer attention.

## Later

- [ ] Retained exec operation-state projection.
- [ ] Read-only agent health projection (#210 lineage).
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
