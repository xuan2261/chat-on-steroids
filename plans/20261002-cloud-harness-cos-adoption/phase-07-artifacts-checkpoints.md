# Phase 07 — Artifact/checkpoint lifecycle, starting narrow

**Status:** HOLD — MAINTAINER ANNOUNCED IMPLEMENTATION  
**Lineage:** #889, #208  
**Cloud Harness concept:** retained artifacts snapshot/list/read/restore/delete

## Goal

Do not introduce a generic artifact subsystem until CoS has more than one proven workflow that needs it.

## First priority

Use #889 as the narrow concrete case: export an explicitly selected ChatGPT-generated original image into an approved workspace while preserving original-vs-preview truth and current sandbox/ownership boundaries.

## After #889

Audit whether session assets/checkpoints already satisfy other retention workflows. Only then consider a reusable artifact record with:

- representation/original distinction
- immutable identity
- bounded bytes
- provenance
- explicit retention/cleanup owner
- restore/export semantics that cannot escape approved roots

## Stop criteria

One image-export feature is not sufficient justification for cloning Cloud Harness's complete `artifacts_*` API.


## Coordination note — 2026-10-02

Issue #889 remains open, but the maintainer has publicly described the intended safe implementation and said they plan to start it after 2.1.25.

Do not open a competing PR while that work is actively planned. Continue to monitor #889 and only resume this phase if the maintainer asks for help, posts a branch/PR that needs contribution, or the plan goes stale.
