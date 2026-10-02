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
- Current in-flight repair: upstream PR #899, fixing issue #892.
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
| 00 | Cross-turn retained exec reassociation | #892 / PR #899 | none | IN FLIGHT |
| 01 | Send-time Core capability/preflight projection | #208, #482 | none; submit after #899 to reduce reviewer load | READY NEXT |
| 02 | Retained exec operation-state projection | #36, #892, #208 | PR 00 | PLANNED |
| 03 | Evidence-based read-only agent health projection | #210, #482 | none; preferably after PR 02 | PLANNED |
| 04 | Sleeping-worker runtime resource GC | #215, #482 | PR 00; reuse PR 03 if useful, never depend on prose classification | PLANNED |
| 05 | Remote MCP plugin network/credential hardening | #208, #360 | audit must prove a concrete gap first | RESEARCH GATE |
| 06 | Skill/context provenance and package identity | #208, #360, #380 | preserve existing Skills/Plugins owners | PLANNED |
| 07 | Artifact/checkpoint lifecycle, starting narrow | #889, #208 | require concrete second use case before generic abstraction | PLANNED |
| 08 | Optional Cloud Harness remote-executor adapter | #208, #482 | only after 01–07 evidence | DEFERRED |

## Global TODO

- [ ] Get PR #899 workflows actually executing; do not mark verification green until jobs run.
- [ ] Move #899 from Draft only after fail-first/CI/CodeQL/PR checklist evidence is green.
- [ ] Implement PR 01 using current send-time `currentCoreInstructions()`; no new MCP tool in the first slice.
- [ ] For every later phase, re-read current upstream before coding; closed roadmap issues are design lineage, not proof current code is unchanged.
- [ ] Before PR 05, complete an SSRF/network audit of remote plugin transport and OAuth paths.
- [ ] Before PR 06, inventory what provenance/version/hash data Skills and Codex-plugin bridges already own.
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
