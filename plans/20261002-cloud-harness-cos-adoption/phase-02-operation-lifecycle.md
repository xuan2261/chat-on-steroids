# Phase 02 — Retained exec operation-state projection

**Status:** DEFERRED — NO CONCRETE GAP AFTER CURRENT-MAIN SCOUT  
**Lineage:** #36, #892, #208  
**Cloud Harness concept:** `operation_status`, `operation_wait`, `operation_cancel`, sessions lifecycle

## Goal

Make retained command state mechanically inspectable and consistent without adding a second process manager.

## First-slice direction

Create or tighten a pure, owner-scoped projection over the existing unified exec manager + ownership registry:

- running
- exited/unread
- completed/drained
- current process/session id
- exit code when known
- whether output remains retained
- whether input/poll is currently allowed for the proven owner

Prefer using existing `exec_command`/`write_stdin` structured output and internal recovery/diagnostic consumers. Add a public status tool only if a concrete workflow cannot be expressed safely through those primitives.

## Tests

- [ ] Same owner sees only owned retained state.
- [ ] Different conversation cannot enumerate another owner's ids/state.
- [ ] Unknown identity returns no privileged projection.
- [ ] Completion and output-retention transitions are deterministic.
- [ ] Status inspection causes no polling, draining or mutation.
- [ ] Restart semantics remain truthful: process-local state is not fabricated after restart.

## Dependency

Land Phase 00 first so cross-turn owner reassociation is stable.


## Current-main scout — 2026-10-02

Current CoS already owns most of the useful retained-operation semantics that motivated this phase:

- `completed_session_id` for replaying retained completed output;
- `output_replayed` in structured exec output;
- owner-scoped `backgroundExecObligations()`;
- running vs exited-unread state from `unifiedExecManager.backgroundState()`;
- the `EXEC_RESULTS_UNREAD` circuit breaker with exact owned session IDs;
- retained output publication/acknowledgement;
- cross-turn owner reassociation from merged #899.

No separate `operation_status` tool is justified by current evidence. Adding one now would likely duplicate existing state and increase Core's permanent tool surface.

### Re-open gate

Only reopen this phase when a concrete workflow cannot be expressed truthfully through existing `exec_command` / `write_stdin` structured results and owner-scoped retained-output behavior.
