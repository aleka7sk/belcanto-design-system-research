# Belcanto Design System R&D — Accessibility and Interaction Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## 1. Candidate comparison

| Candidate target | Product effect | Cost | R&D disposition |
|---|---|---|---|
| Platform defaults only | Lowest implementation effort | Inconsistent coverage and no portable acceptance contract | Rejected |
| WCAG 2.2 A | Prevents only the most severe failures | Too weak for a daily education/community product | Rejected |
| WCAG 2.2 AA plus native guidance | Testable contrast, focus, target, semantics, scaling, and motion baseline | Moderate continuous QA | **Recommended foundation** |
| WCAG 2.2 AAA everywhere | Strong aspiration | Some criteria are impractical for all content and native patterns | Selective stretch target, not universal gate |

WCAG is used as the portable acceptance vocabulary; Apple and Android guidance
adds native behavior. Compliance cannot be inferred from token ratios alone.

## 2. Recommended foundation

Adopt **WCAG 2.2 AA plus platform-native accessibility behavior** as the
promotion gate for Belcanto primitives and screen archetypes.

Mandatory baseline:

- 4.5:1 for normal text, 3:1 for large text, and 3:1 for essential non-text UI;
- information and state never conveyed by color alone;
- 48×48 pt/dp minimum interactive area for mobile, even when the visible icon
  is smaller;
- visible focus, predictable focus order, and focused content not hidden by
  sticky navigation or overlays;
- Dynamic Type/font scaling at 200% as a minimum stress test and at the largest
  platform accessibility setting before promotion;
- VoiceOver and TalkBack labels, roles, values, hints only where needed, and
  state announcements;
- reduced motion removes spatial/decorative movement while preserving immediate
  state and progress meaning;
- all media controls remain operable and caption/transcript policy is resolved
  before video features are promoted.

AAA is a stretch target for reading surfaces, touch targets, and focus
appearance where it does not damage comprehension or platform conventions.

## 3. Visual direction

**Resonant Confidence** is retained with an accessibility constraint: atmosphere
may be dark and editorial, but information must remain calm, legible, and
structurally obvious.

- Violet remains an action signal, not the only signal.
- Magenta, green, amber, and red always pair with text, iconography, or shape.
- Photography receives text scrims or separate content surfaces; text is never
  placed over uncontrolled image regions.
- Focus is a deliberate two-layer treatment where necessary, not a subtle
  border tint.
- Large text reflows vertically; cards grow instead of clipping or shrinking
  essential text.
- Celebration motion has an equivalent static state and never blocks the next
  action.
- Dark and light themes retain the same hierarchy and semantics.
- Disabled controls are visually subordinate but not used as unexplained dead
  ends; validation and prerequisite text explain why an action is unavailable.

Five archetypes remain the visual stress-test set: Today, Growth, Community,
Forms, and Empty/Error. Accessibility states are now required variants, not a
later audit.

## 4. Token changes

The machine-readable token set advances to **0.3.0**.

| Change | Value / rule |
|---|---|
| Accessibility target | WCAG 2.2 AA |
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Essential non-text | 3:1 |
| Mobile target | 48×48 |
| Dynamic Type test | 200% minimum plus platform maximum |
| Dark action pressed | `#8B5FF0` |
| Dark on-action text | `#09080F` |
| Light on-action text | `#FFFDFE` |
| Reduced motion | 0 ms for spatial/decorative motion; semantic state remains |
| Disabled states | Explicit text and surface aliases in both themes |

The action-text contract is explicit: components use `text.onAction`, never
guess `text.inverse`.

## 5. Primitive impact

No product composite is approved. The primitive contract is extended:

- `Pressable`: disabled, pressed, focused, selected, busy, and accessibility
  state mapping;
- `Button` / `IconButton`: 48×48 target, progress label, no color-only
  variant distinction;
- `Text` / `Heading`: reflow and scaling, no essential truncation;
- `Input` / `FormField`: persistent label, described error/help text,
  programmatic required/invalid state;
- `Tabs` / `BottomNavigation`: selected state and stable reading order;
- `Modal` / `Sheet`: focus containment, return focus, dismiss semantics;
- `Toast`: non-blocking announcement and persistent alternative for critical
  errors;
- `ProgressBar`, `Meter`, `Rating`: accessible name/value/context, never
  visual-only precision;
- `Skeleton`: hidden from the accessibility tree with a meaningful loading
  state exposed once;
- images and icons: decorative assets are hidden; meaningful assets require
  contextual alternatives.

A new `FocusRing` component is not approved: focus treatment is a cross-cutting
primitive behavior and token recipe, not product content.

## 6. Technical proof of concept

A deterministic WCAG relative-luminance audit was run over the current semantic
palette.

Representative ratios:

| Pair | Dark | Light | Result |
|---|---:|---:|---|
| Primary text / canvas | 18.31 | 17.13 | Pass |
| Muted text / canvas | 8.24 | 5.82 | Pass |
| Action / canvas | 5.82 | 5.36 | Pass for text use |
| Community / canvas | 5.66 | 4.71 | Pass |
| Success / canvas | 8.92 | 5.00 | Pass |
| Warning / canvas | 10.76 | 5.52 | Pass |
| Danger / canvas | 5.95 | 6.02 | Pass |
| Default border / canvas | 1.57 | 1.34 | Decorative only |
| Strong border / canvas | 2.33 | 2.07 | Cannot be sole essential indicator |

The original dark pressed action with the former inverse text produced **4.12:1**
and failed the 4.5:1 target. The revised `#8B5FF0` pressed fill with
`#09080F` on-action text produces **4.74:1** and passes.

Result: **static token audit pass after one correction; native interaction gate
remains open**.

Still required:

1. render all five archetypes in dark/light and 100%, 200%, and platform-max
   text settings;
2. keyboard/switch focus traversal;
3. VoiceOver and TalkBack reading-order and announcement test;
4. target-size overlay and one-handed reach review;
5. reduced-motion capture;
6. color-blind and high-contrast inspection;
7. real-photo contrast test;
8. automated checks as regression support, never as the sole acceptance proof.

## 7. Risks

1. Passing token contrast does not prove component or photo-overlay contrast.
2. Onest may clip or reflow differently at native accessibility sizes.
3. 48×48 targets can pressure dense navigation and future admin web layouts.
4. Source-owned primitives make semantic regressions Belcanto's responsibility.
5. Toasts, sheets, nested navigation, charts, and video create reading-order
   and announcement complexity.
6. Reduced motion can accidentally remove meaning if motion carries state.
7. Disabled styling can hide prerequisites from users.
8. WCAG is web-authored; native assistive-technology behavior still needs
   platform-specific human testing.

## 8. Open decisions

1. Exact iOS and Android device/OS matrix.
2. Whether admin web shares the same 48 target or a pointer-specific density.
3. Final focus-ring recipe for dark, light, photos, and high-contrast contexts.
4. Caption, transcript, and audio-description policy for lesson/performance
   video.
5. Localization behavior for Russian, Kazakh, and mixed-language screen-reader
   output.
6. Accessible chart/progress representation and data-table alternative.
7. Tooling for automated contrast, semantics, and end-to-end accessibility
   regression checks.
8. Ownership of manual accessibility acceptance and release sign-off.

## 9. Evidence boundary

Primary guidance used for this packet:

- W3C WCAG 2.2 Quick Reference and Understanding documents;
- Apple Human Interface Guidelines for Accessibility, Typography, and Motion;
- Android accessibility guidance for semantics, scalable text, and 48 dp
  targets.

This packet proves a static contract and identifies the native test gate. It
does not claim product-level accessibility conformance.
