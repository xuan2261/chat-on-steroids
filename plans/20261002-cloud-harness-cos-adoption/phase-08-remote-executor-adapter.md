# Phase 08 — Optional Cloud Harness remote-executor adapter

**Status:** DEFERRED  
**Lineage:** #208, #482  
**Cloud Harness concept:** remote isolated execution plane

## Goal

Evaluate direct Cloud Harness interoperability only after CoS-native ownership, capability, provenance and plugin boundaries are stable.

## Preferred order

1. Use Cloud Harness as an ordinary remote MCP integration first.
2. Keep it a separate execution/security domain.
3. Curate exposed tools if CoS plugin discovery limits require it.
4. Add CoS-specific UI/recipe support only if repeated user workflow proves value.
5. Consider a first-class "remote executor" abstraction only if multiple backends need the same contract.

## Explicit non-goal

Do not embed Cloud Harness Docker socket/runner/VPS control plane into the CoS Electron app.

## Evaluation gates

- clear user workflow that local Core cannot safely satisfy
- credential isolation verified
- no silent fallback from remote isolation to local execution
- tool-surface/discovery budget acceptable
- failure/ambiguous side-effect semantics documented
- independent remote executor remains replaceable


## Current Plugins compatibility — 2026-10-02

Current CoS Plugins exposure is not limited to 64 tools anymore:

- complete schema bytes are normally bounded to 250 KB;
- 256 tools is the separate emergency catalog ceiling;
- the current regression suite explicitly publishes 118 tools in full when they fit the byte budget;
- per-tool enabled/published state remains visible in the Plugins UI.

Therefore a Cloud Harness-specific adapter is not justified solely by its tool count. First test the ordinary remote Streamable HTTP integration and actual schema-byte footprint.

Issue #920 / PR #921 corrects the stale 64-tool documentation.
