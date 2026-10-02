# Phase 06 — Installed GitHub Skill provenance projection

**Status:** DRAFT PR #918 — CI RUNNING  
**Issue:** #917  
**PR:** #918  
**Lineage:** #514, #208, #360, #380  
**Cloud Harness concept:** explicit provenance / immutable installed revision

## Audit result

CoS already has the authoritative provenance needed for managed GitHub Skills:

- source URL + ref
- exact commit
- package revision digest
- SKILL.md SHA-256
- CoS-owned origin metadata validation
- explicit update checks scoped to the installed revision

That data is intentionally excluded from the model-facing Skills catalog. No second provenance authority or digest system is needed.

## Focused gap

The desktop Skills library showed broad state (GitHub / Up to date / Update available) and source URL, but not the exact immutable commit currently installed.

## Prepared implementation

- Branch: `feat/skills-installed-revision`
- Base: upstream `a1879601684712cbc3d6100ee4fe2dacbdf1b7b4`
- Test-first commit: `2d51afe4311ea5b53aab53b1152948ffbe72ce17`
- Implementation commit: `8a1d018af4cc3b5da0a009cf5c1d71d72de16237`
- Diff: 2 files, +11/-1.
- Focused renderer test: 4/4 passed locally.
- Typecheck: passed locally.
- Before/after screenshots: captured from actual Skills renderer with placeholder GitHub provenance and attached to PR #918.
- PR checklist + fail-first: green.
- CodeQL: green.
- Cross-platform CI: running.

## Projection

GitHub-backed managed Skills display the already-validated installed revision as:

```text
<ref> @ <short commit>
```

The projection appears in the source tooltip and update confirmation dialog.

## Invariants

- no model-facing provenance field
- no new digest computation
- no trust label
- no permission change
- no install/update/check authority change
- `.cos-github.json` remains the provenance authority
- local managed Skills remain unchanged

## Ready gate

Move PR #918 out of Draft only after exact-head CI is green and the final diff still contains only the renderer projection + focused test.
