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
