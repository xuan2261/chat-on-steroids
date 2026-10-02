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
