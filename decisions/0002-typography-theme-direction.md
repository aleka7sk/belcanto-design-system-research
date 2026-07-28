# Decision 0002 — Typography and theme direction

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## Decision

Use Onest as the exploratory body and display family, delivered as static
400/500/600/700/800 weights. Preserve separate body/display aliases so a later
brand face can be introduced without changing product components.

Author Belcanto student mobile as dark-first with a complete light companion.
Dark-only is rejected.

## Why

- Onest combines mobile readability, Cyrillic support, open licensing, and a
  contemporary humanist-geometric tone.
- One family avoids premature pairing and reduces Figma/runtime mismatch while
  the logo is unresolved.
- Static weights follow Expo's cross-platform guidance; variable fonts remain
  a platform-support risk.
- A light companion is necessary for bright environments, user preference,
  long forms, accessibility, and denser future workflows.
- Semantic aliases already preserve theme and typography replacement seams.

## Promotion gate

This decision is not ready for product promotion until:

1. Russian, Kazakh, Latin, numerals, punctuation, and tenge sign render
   correctly from the exact shipped files;
2. iOS and Android map all five weights correctly;
3. native dark/light specimens pass contrast and dynamic-type review;
4. font load behavior and payload are accepted;
5. the identity/logo track confirms that Onest does not conflict with the
   future wordmark;
6. at least the five screen archetypes in the research packet survive visual
   review without generic dashboard styling.

## Fallback

Use Manrope if native specimen or identity review rejects Onest. Use Golos Text
for body roles if continuous-reading quality outweighs a unified family. Use
platform fonts only as a technical fallback, not as the intended identity.

## Reversal

Family and mode decisions remain reversible because product components consume
semantic typography and color aliases rather than font files or raw palette
values.
