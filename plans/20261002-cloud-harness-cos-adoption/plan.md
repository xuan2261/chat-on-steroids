---
title: Cloud Harness concepts adoption roadmap for Chat On Steroids
status: in-progress
priority: P1
effort: large
branch: plan/cloud-harness-cos-adoption-roadmap
tags: [cloud-harness, cos, architecture, security, mcp, roadmap]
created: 2026-10-02
---

# Cloud Harness → CoS adoption roadmap

## Objective

Adopt the strongest **invariants and architecture ideas** from Cloud Harness MCP into Chat On Steroids without cloning its product model, inflating CoS's MCP tool surface, or creating duplicate authorities.

The working rule is:

> copy invariants, not implementation shape.

Cloud Harness is a remote/local execution harness with structured workspace/session/task/Git/skill/artifact APIs. CoS is a local-first ChatGPT orchestration workspace with a deliberately small Core surface. The roadmap therefore prefers internal projections, existing Core primitives and current CoS owners before adding any new public tool.

## Baseline

- CoS upstream baseline for this plan: `bfa35eb2a2e2fa802f76499b38305b8dc9b6df1e`.
- Phase 00 completed upstream: PR #899 merged for issue #892 and is slated for release 2.1.26.
- CoS roadmap lineage: #482 and architecture audit #208.
- Cloud Harness reference: `bestagentkits/cloud-harness-mcp`, especially `workspace_capabilities`, retained operation/session APIs, provenance, credential isolation, artifact retention and executor lifecycle.
- Evidence levels stay separate: source → tests → build → package → installed/runtime behavior.

## Non-negotiable design rules

1. One authoritative owner per fact; projections may read but must not become shadow state.
2. Identity, permission and credential decisions fail closed.
3. Do not add a permanently exposed MCP tool when current primitives or send-time instructions can express the workflow safely.
4. Prefer a read-only/pure projection before any recovery, retry, GC or mutation policy.
5. New mutating behavior must have a fail-first regression and re-check authority immediately before side effects.
6. Long-lived identity and runtime resources have separate lifetimes.
7. No claim of parity: unsuitable Cloud Harness concepts are explicitly rejected or deferred.
8. Keep upstream PRs focused. Target well below CoS's 600 changed-line review ceiling where practical.

## PR sequence

| Order | Candidate PR | Lineage | Dependency | Status |
|---|---|---|---|---|
| 00 | Cross-turn retained exec reassociation | #892 / PR #899 | none | MERGED — ships in 2.1.26 |
| 01 | Send-time Core capability/preflight projection | #906 / PR #907; lineage #208, #482 | none | MERGED — ships in 2.1.26 |
| 02 | Retained exec operation-state projection | #36, #892, #208 | PR 00 | DEFERRED — no concrete gap after current-main scout |
| 03 | Worker-overview health projection | #908 / PR #909; lineage #210, #482, #221 | independent | MERGED — ships in 2.1.26 |
| 04 | Sleeping-worker runtime resource GC | #215, #482 / PR #919 | PR 00 | REVIEW FIX COMPLETE — WAITING #926 MERGE + LATEST-MAIN SYNC |
| 05 | Remote MCP plugin network/credential hardening | #208, #360 | security-sensitive follow-up stays private | AUDIT COMPLETE — PRIVATE CHANNEL FOR ANY FINDINGS |
| 06 | Installed GitHub Skill provenance projection | #917 / PR #918; lineage #514, #208 | independent | MERGED — ships in 2.1.26 |
| 07 | Artifact/checkpoint lifecycle, starting narrow | #889, #208 | maintainer has announced implementation plan | HOLD — AVOID DUPLICATE PR |
| 08 | Optional Cloud Harness remote-executor adapter | #208, #482; docs sync #920 / PR #921 | only after 01–07 evidence | DEFERRED — current Plugins surface already supports large catalogs |

## Current Plugins compatibility finding

Current CoS implementation publishes catalogs larger than 64 tools when they fit the schema-byte budget. The live limits are 250 KB of complete schemas plus a separate 256-tool emergency ceiling. The old 64-tool statement was stale documentation, not a runtime limit. Issue #920 / PR #921 updated the docs and is merged. This materially reduces the need for a Cloud Harness-specific curation adapter solely because of tool count.

## Parallel maintenance / localization PRs

These are not new Cloud Harness parity phases, but they affect current-main verification while the roadmap PRs are in flight.

- #925 / PR #926 — Russian worker-health localization baseline fix. Exact-head checks green; Ready for review. This restores renderer i18n completeness on current main.
- #931 / PR #932 — Vietnamese (`vi`) first-class renderer + Chrome companion localization. Draft; fail-first and wiring commits are open while catalogs are translated/reviewed.

## Global TODO

- [x] PR #899 workflows executed and passed on exact head `cc00a16…` (CI, CodeQL, fail-first, PR checklist).
- [x] PR #899 moved from Draft to Ready for review after all exact-head checks passed.
- [x] Prepare PR 01 implementation on fork branch `feat/core-capability-preflight`; no new MCP tool in the first slice.
- [x] Opened Phase 01 upstream issue #906 and draft PR #907 after #899 review gate cleared.
- [x] PR #907: exact-head CI, CodeQL and PR checklist green; marked Ready for review.
- [x] Opened independent Phase 03 issue #908 and draft PR #909 after verifying #221 was closed for lacking a production consumer, not for a rejected design.
- [x] PR #909: exact-head CI, CodeQL, fail-first and PR checklist green; placeholder before/after screenshots attached; marked Ready for review.
- [ ] Keep active upstream WIP bounded: max ~3 PRs, with new ones draft until checks are green.
- [ ] For every later phase, re-read current upstream before coding; closed roadmap issues are design lineage, not proof current code is unchanged.
- [x] Completed remote plugin/OAuth network audit; any security-sensitive follow-up is handled only through the repository's private SECURITY.md process.
- [x] Inventoried existing Skill provenance: CoS already owns exact source/ref/commit/revision/SKILL.md hash. Opened #917 / draft PR #918 to project only the installed ref + short commit in the desktop UI.
- [ ] Before PR 07, finish or coordinate with #889; do not build generic retained artifacts only for nominal parity.
- [ ] Re-evaluate PR 08 last; prefer ordinary remote MCP plugin integration over embedding Docker/VM execution in CoS Desktop.

## Explicitly rejected/deferred parity

The following are not roadmap commitments:

- Replacing CoS Core with dozens of Git/workspace-specific tools.
- Embedding Cloud Harness Docker/runner/control-plane architecture into the desktop app.
- Adding generic persistent memory merely because Cloud Harness has memories.
- Adding repository hooks/deployments before CoS has a concrete lifecycle owner/use case.
- Treating approved folders as a hostile-code sandbox.
- Building multi-tenant execution into CoS.
- Duplicating existing session/worker/permission state in a new "Cloud Harness compatibility" database.

## Completion condition

This roadmap is complete when each accepted phase is either merged with evidence or explicitly rejected/deferred with current-source rationale. No phase is complete because a plan exists.
