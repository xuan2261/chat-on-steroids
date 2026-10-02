# Phase 05 — Remote MCP plugin network and credential hardening

**Status:** AUDIT COMPLETE — SECURITY-SENSITIVE FOLLOW-UP PRIVATE  
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


## Audit outcome — 2026-10-02

The public-source audit covered remote MCP endpoint validation, redirect policy, OAuth discovery/fetch boundaries, credential storage, token scoping and loopback support.

Public roadmap rule: do not publish security-sensitive reproduction details or implementation notes here. Any confirmed security finding is handled only through the repository's private vulnerability-reporting process under SECURITY.md.

No public parity PR is opened from this phase unless maintainers explicitly direct a public follow-up.
