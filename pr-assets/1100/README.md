# PR #1100 — Windows bounded-shape visual evidence

These screenshots answer the maintainer's Windows paint-clipping review on
`totec448-spec/chat-on-steroids#1100` without changing the PR source.

## Source under test

- PR head: `7ff2ba0b36c17f4cb297a6130e168874a0e29f6f`
- Original PR base: `9c2df5ff990690ab124b1d9567847dfca1ba42fc`
- Current upstream/main when this evidence was finalized: `bb3e7927100b2e8cbafee5b6131fb0736d1ec2c4`
- `git diff 9c2df5f..bb3e792 --` over the six Pets implementation/verifier/test files is empty, so no Pets causal-contract drift occurred while the review was pending.

The committed production-path verifier `scripts/verify-pet-overlay-electron.cjs`
also passed on exact PR head `7ff2ba0b` immediately before these captures.

## Capture environment and method

- Microsoft Windows 10 Pro for Workstations 10.0.18363, 64-bit.
- Source-built Electron app from the exact PR head, isolated synthetic `userData`.
- The real Pets `BrowserWindow`, production `setShape()` path, renderer, IPC and pet machine were used.
- The test owner window was minimized and the synthetic pet was moved to a dedicated central position so an unrelated running CoS Pets overlay could not contaminate these crops.
- Screenshots were captured from the Windows desktop compositor with GDI `CopyFromScreen`, then cropped around the visible synthetic state. They are not `webContents.capturePage()` screenshots.
- This Windows host has `prefers-reduced-motion: reduce`; for the walk screenshot only, a temporary capture harness emulated `no-preference` **before the Pets renderer loaded** so the authored walk state could exist. No user setting, PR source file or product preference was changed.
- The temporary capture harness is not part of #1100.

## Requested states

1. `01-walk-animation.png` — authored walk phase, including the visible action prop.
2. `02-activity-badge.png` — idle pet with one activity badge.
3. `03-long-activity-tray.png` — open 8-item activity tray with an intentionally long first activity body.
4. `04-after-move.png` — immediately after the real PetMachine drag moved the pet to `(333, 444)`.

Visual inspection: no pet sprite, badge, tray/card edge or post-move sprite is clipped by the bounded Windows native shape in these states.

## SHA-256

```text
ea944f030690bd7ad1e1a08e6d960c196905aab4775aeb386618146dbfbb3431  01-walk-animation.png
c0d1f59ae5eb7177c5c22497a9a73d0e40c365854bf923217ef5ddaf0b9fca36  02-activity-badge.png
7b405a658712a942bcfec9cb9a2c6ec56ba56de199a384109225fb2e32becc73  03-long-activity-tray.png
776167e2e448a31d514326e5d117adb3d9e543f8b433f30d9e74ba29c29e613d  04-after-move.png
```
