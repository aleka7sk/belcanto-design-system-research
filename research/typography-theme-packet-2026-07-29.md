# Belcanto Design System R&D — Typography and Theme Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## 1. Candidate comparison

Criteria: Cyrillic quality and coverage 22%, mobile readability 20%, identity fit
18%, weight/role coverage 12%, implementation predictability 12%, Figma
availability 8%, licensing and source availability 8%.

| Candidate | R&D score | Strongest fit | Decisive limitation | Disposition |
|---|---:|---|---|---|
| Onest | 90 | Humanist-geometric balance, long-screen reading, Cyrillic, 100–900 family | Not sufficiently distinctive to act as a logo by itself | **Recommended UI and display foundation** |
| Manrope | 86 | Mature modern grotesque, broad Cyrillic, strong numeric forms | More familiar/generic product aesthetic | Primary typography fallback |
| Golos Text | 84 | Excellent continuous screen reading and Cyrillic | More institutional/neutral; weaker emotional display voice | Body-text fallback |
| Onest + Unbounded | 78 | Strong editorial contrast and memorable headings | Display family can overpower people/content and feel techno-cultural | Experimental campaign use only |
| Platform system fonts | 72 | Best runtime predictability and zero font payload | Cross-platform visual drift and little Belcanto identity | Emergency/runtime fallback |

All shortlisted open families use the SIL Open Font License 1.1. The final
choice still requires rendered Kazakh and Russian specimen review; repository
and catalog metadata are evidence of coverage, not visual QA.

## 2. Recommended foundation

Use **Onest as one unified family** for UI and display roles during product
foundation work.

- Static font files, not a variable runtime font.
- Ship only 400, 500, 600, 700, and 800 weights initially.
- Body defaults to 400; interactive labels to 600; strong headings to 700;
  800 is reserved for short earned/editorial moments.
- Do not use uppercase tracking as a substitute for hierarchy.
- Do not make Onest the logo or freeze a wordmark from this recommendation.
- Keep token aliases `body` and `display` separate even while both resolve to
  Onest, preserving a future identity seam.

Why: Expo documents that variable fonts do not have full support across all
platforms and recommends static fonts for full platform support. A single
family also reduces loading, fallback, Figma mismatch, and Cyrillic pairing
risks while the logo and identity are unresolved.

## 3. Theme decision

Use **dark-first with a complete light companion**, not dark-only.

Dark remains the authored flagship direction for student home, progress,
community, challenge, media, and celebration surfaces. Light is required for
user preference, bright environments, long forms, accessibility testing, and
future teacher/admin density.

Rules:

- The interface uses semantic aliases; no product component reads raw dark or
  light palette values.
- Photography, violet action emphasis, typography, hierarchy, and motion carry
  identity in both modes.
- Light mode is not an inverted dark palette and must not become a white
  dashboard with purple controls.
- Theme follows explicit user choice with system preference as the default.
- All content and interactive states require contrast verification before
  promotion.

## 4. Visual direction stress test

`Resonant Confidence` is retained with these constraints:

| Screen archetype | Must lead with | Anti-pattern rejected |
|---|---|---|
| Today / home | One next meaningful action and human context | Grid of equally weighted dashboard cards |
| Growth / profile | Evidence, explanation, and time context | Decorative scores and invented precision |
| Community / event | People, activity, invitation, authentic imagery | Social-feed chrome and magenta decoration everywhere |
| Form / settings | Calm hierarchy, readable labels, clear state | Dark luxury styling and low-contrast fields |
| Empty / error | Human recovery path and one action | Mascot/confetti for ordinary failure |

A screen passes only if it remains recognizably Belcanto with violet removed
from non-action decoration. Brand recognition must survive through type,
photography, content voice, spacing, and composition.

## 5. Token changes

Typography aliases:

| Token | Value |
|---|---|
| `font.family.body` | Onest |
| `font.family.display` | Onest |
| `font.weight.regular` | 400 |
| `font.weight.medium` | 500 |
| `font.weight.semibold` | 600 |
| `font.weight.bold` | 700 |
| `font.weight.extrabold` | 800 |

The existing size scale is retained provisionally. Line-height aliases are
added: caption 16, label 20, body 24, title3 28, title2 32, title1 40, display
48 pixels. Final optical adjustments require native rendered specimens.

Light companion tokens are completed for sunken background, strong border,
secondary and inverse text, pressed/focus action, community accent, and all
feedback colors.

## 6. Primitive impact

No new primitive is approved. Existing text primitives gain semantic roles:

- `Text`: body, supporting, caption, label;
- `Heading`: title3, title2, title1, display;
- `Button` and form controls: label role, never arbitrary font weights;
- numeric progress components: tabular-number feature where supported;
- all primitives: theme-neutral semantic color references only.

## 7. Technical proof of concept

Configuration-level proof:

- Expo's official font guidance supports bundling static custom font files
  through `expo-font`.
- Expo explicitly warns that variable font support is not complete across all
  platforms, validating the static-weight decision.
- NativeWind's custom-font guide requires file/PostScript naming alignment,
  especially because iOS can silently fail while Android succeeds.
- Onest provides an OFL-licensed source family and the required weight range.
- Existing framework-neutral family aliases can resolve both body and display
  to Onest without changing product component APIs.

Result: **architecture/configuration pass; native rendering gate remains
open**. No claim is made yet for iOS/Android glyph rendering, font-load timing,
Kazakh specimen quality, fallback behavior, or bundle impact.

Required thin PoC:

1. bundle the five static weights;
2. render Russian, Kazakh, Latin, numerals, tenge sign, punctuation, and long
   mixed-language text on iOS and Android;
3. verify PostScript names and weight mapping;
4. compare cold start/font swap behavior;
5. run dynamic type at 100%, 130%, and 160%;
6. capture dark and light specimens;
7. record total font payload and remove unused weights if necessary.

## 8. Risks

1. Onest may still feel generic without a strong photography and composition
   system.
2. Catalog-level Cyrillic availability does not prove high-quality Kazakh
   glyphs or punctuation in the actual shipped files.
3. Five static weights increase asset payload.
4. Incorrect PostScript naming can fail silently on iOS.
5. Light mode can drift into generic SaaS if authored after dark screens.
6. A later brand identity may require a distinct display family.
7. Typography scale has not been tested with real Belcanto content or native
   dynamic type.

## 9. Open decisions

1. Native specimen acceptance for Onest and fallback ranking.
2. Exact font file source, checksums, subsetting policy, and update ownership.
3. Whether 500 or 800 can be removed after payload measurement.
4. Final logo/wordmark and whether it introduces a separate display face.
5. Contrast target and accessibility matrix.
6. Theme persistence and system-preference product behavior.
7. Photography art direction and asset rights.
8. Native screen prototype for the five stress-test archetypes.
