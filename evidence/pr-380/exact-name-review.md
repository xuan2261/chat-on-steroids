# PR #1022 exact-name review evidence

These are synthetic Electron settings-layout fixtures, not an installed-app or provider session.
The before view uses the previous metadata-match copy; the after views use the actual production
HTML/CSS built at `a007cebabd713dfc11bc9839cfe127782a7b7096` (main
`5f71559eb067d4abc8448fde218d831f3f0de5c9` included).

`npm run verify:ui -- settings-layout` passed 1/1 on that exact head with no retry. The verifier
checks light/dark, 900/1440 widths and 100%/125% zoom, including the exact-name hint and unchanged
off-by-default switch. The displayed permission/model rows are layout fixtures, not live settings.
The three attached views were inspected for text, layout and real icon rendering.

| Image | SHA-256 |
|---|---|
| exact-name-before-light.png | 6608EC3DD791CA49EBA67FDF21B6A66EB6C692B22C897CA84E53875B9512B46B |
| exact-name-after-light.png | ED26149316F0980C216B3FDDE055227390D2C30C73E22359B6B59285B67DD3E2 |
| exact-name-after-dark.png | 274CAB268135D1FA2EE7426F8EB66444AC42FDE27187B43CBCDEF73B81EA3EED |

No personal chats, workspace paths, credentials or font files are included.
