# Phase 05 — Remote MCP plugin network and credential hardening

**Status:** RESEARCH GATE  
**Lineage:** #208, #360  
**Cloud Harness concept:** URL validation, redirect refusal, address pinning, credential scoping

## Current observed CoS controls

Current plugin code already has meaningful defenses including bounded HTTP bodies, redirect refusal in relevant fetch paths, encrypted credential storage and OAuth endpoint checks.

## Research question

Is there a concrete unresolved gap around remote plugin endpoints such as private/link-local/cloud-metadata addressing, DNS rebinding, cross-origin credential forwarding or redirect handling?

## Before any implementation

- [ ] Map every remote MCP/OAuth fetch path.
- [ ] Verify URL validation at install/configure and at connect/request time.
- [ ] Verify redirects on credentialed requests.
- [ ] Verify whether resolved socket addresses can change after validation.
- [ ] Verify private/loopback/link-local behavior is intentional for local MCP use cases.
- [ ] Separate local-loopback plugin support from untrusted remote-server policy.
- [ ] Write a safe deterministic regression proving any claimed gap.

## Stop criteria

If current CoS already enforces an equivalent boundary, close this phase as no-op. Do not copy Cloud Harness's VPS SSRF policy where it would break intentional localhost MCP plugins without a CoS-specific threat model.
