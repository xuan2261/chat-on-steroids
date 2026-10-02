# Phase 00 — PR #899: retained exec reassociation

**Status:** IN FLIGHT  
**Issue:** #892  
**PR:** #899

## Outcome

A later turn in the same proven ChatGPT conversation can reuse its retained PTY/session without turning a numeric session id into authority.

## Current implementation

- Test-first commit: `test(core): cover cross-turn exec reassociation`.
- Implementation commit: `fix(core): reassociate owned exec sessions`.
- Only the initial `unidentified` case waits for the exact request-id correlation.
- `anonymous`, `different-owner` and `unavailable` remain immediate refusals.
- After evidence arrives, the existing ownership guard is rerun.

## Review update — 2026-10-02

- Review feedback addressed in `a5fe2aa0ab79ae3269fd5c3b5efb35faca01a4c7`: restored the no-proof `wfr_execown_unattributed` negative case beside the late-proof case.
- Synchronized with current upstream `main` (`d7d65fdd906838c0127bfa521352e355a2690dc4`) in merge commit `cc00a16a44e0a057e3e15b98c05378904f4cc1d7`.
- PR diff remains limited to `src/main/mcp/tools-core.ts` and `test/mcp.test.ts`.
- Fresh CI / CodeQL / PR checklist runs on `cc00a16…` are `action_required`; no jobs have executed yet.

## Remaining TODO

- [ ] Maintainer/fork workflow approval.
- [ ] CI jobs actually start.
- [ ] Fail-first check proves the changed test fails on main.
- [ ] CI passes.
- [ ] CodeQL passes.
- [ ] PR checklist passes.
- [ ] Re-review final head SHA.
- [ ] Mark Ready for review only after the above evidence exists.

## Abort criteria

Any test showing cross-conversation adoption, stale/superseded session reclaim or session-id bearer behavior blocks the PR.
