# Belcanto Design System R&D — Native Runtime PoC Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## Result

A thin Expo SDK 57 / React Native 0.86 control specimen now exists at
`poc/native-runtime/`. It covers Today, Form conflict and Offline recovery in
one scroll-safe application with dark/light switching, an explicit reduced
motion state, Onest Cyrillic/Kazakh/Latin-capable font files, accessibility
roles and outcome announcements.

This cycle corrects an outdated premise from earlier research: gluestack-ui v5
is no longer alpha. It reached stable on 2026-06-25. Its copy-paste/source-owned
model therefore remains the leading component candidate. However, v5 depends
on the NativeWind v5 architecture (or UniWind), and NativeWind v5 documentation
still labels the release pre-release. gluestack v5 also dropped Next.js support.

## Candidate comparison

| Candidate | Native readiness | Ownership | Styling risk | Web portability | Decision |
|---|---:|---:|---:|---:|---|
| Expo 57 + RN primitives + semantic adapters | High | Complete | Low | React Native Web only | Control and fallback |
| gluestack-ui v5 + NativeWind v5 | Medium-high | Complete after copy | Medium | No Next.js in v5 | Leading constrained pilot |
| gluestack-ui v5 + UniWind | Medium-high | Complete after copy | Medium | Expo-oriented | Secondary experiment |
| NativeWind 4 + owned primitives | High/mature | Complete | Medium migration debt | RN Web possible | Stable fallback, not greenfield preference |
| NativeWind 5 + owned primitives | Medium | Complete | Medium-high pre-release | Next.js not ready | Do not promote alone yet |
| Tamagui | Medium-high | Mixed | Medium | Strong | Reserve if shared web runtime becomes primary |

## Recommended runtime basis

If the product architecture separately approves React Native/Expo, start the
first vertical slice with:

1. Expo SDK 57 and React Native 0.86;
2. semantic Belcanto tokens and small owned adapters;
3. gluestack-ui v5 copied components only for Button, Input/FormControl,
   Pressable, Box, Text and Heading;
4. NativeWind v5 isolated behind those copied components;
5. no dependency on gluestack composite defaults, navigation or data model;
6. a plain React Native adapter path retained until the device gate passes.

This is a **conditional promotion recommendation**, not a normative stack
selection. NativeWind 4 remains a fallback for a production emergency but is
not recommended for a new build that would immediately inherit migration work.

## Visual and interaction findings

The static archetypes translate without new tokens. Editorial hierarchy,
variable spacing and one dominant action remain intact using only native layout
primitives. The proof deliberately contains no photography, chart, navigation
shell or generic dashboard cards.

The form conflict is the strongest adapter test: the input remains labelled,
local text remains present, the conflicting server state becomes an alert, and
the primary action changes to comparison, which reveals an inline surface
showing `Ваш текст` and the named `remoteNote` fixture without overwriting
either. Offline recovery states exactly what is cached and what will sync
later, and its retry runs a visible `idle → checking → still offline` sequence.

The first physical iPhone run corrected an assumption in this section: a
primary action whose only effect was a screen-reader announcement was treated
as complete during source review, and on device it was a dead control. Every
primary action in the specimen must change visible state; the announcement
describes that change rather than replacing it.

## Tokens

Token version remains `0.5.0`. No runtime-only color, spacing, radius, type or
motion value is promoted. Runtime adapters consume semantic roles; they do not
introduce gluestack or Tailwind names into the token contract.

## Primitive impact

Eligible for a constrained implementation pilot:

- Text and Heading;
- Box/Stack layout;
- Pressable;
- Button;
- Input and FormControl;
- semantic Alert/Status surface.

Still gated:

- Modal, Sheet and BottomSheet;
- Toast timing and announcements;
- navigation components;
- Progress animation;
- Image/MediaFrame caching;
- haptic adapter;
- every product composite.

## Technical proof

Source-level pass:

- Expo 57 aligns with React Native 0.86 and React 19.2;
- gluestack v5 stable supports Expo >=50 and React Native >=0.72.5;
- Onest is available as an Expo Google Fonts package with nine styles;
- the control uses four static weights and does not depend on variable-font
  interpolation;
- all interactive controls meet the 48-point research target;
- fixed screen heights are absent, permitting 320-pixel and large-text reflow;
- roles, selected state, labels, alerts and outcome announcements are encoded;
- every primary action changes visible state; announcements describe that
  change and are not the change itself;
- reduced motion preserves final semantic state.

Not passed in this environment:

- dependency installation and Metro/native compilation;
- physical iOS and Android rendering;
- VoiceOver and TalkBack traversal;
- maximum Dynamic Type/font-scale screenshots;
- keyboard avoidance and focus return;
- animation interruption and backgrounding;
- haptic availability and timing;
- mid-range Android frame/memory budget.

The result is therefore **native source contract: conditional pass; executable
and real-device gate: open**.

## Device acceptance matrix

Use one currently supported iPhone and one mid-range Android. For each, record:

- cold start and font load/fallback behavior;
- dark/light screenshots at default and maximum font scale;
- 320-pixel-equivalent width or smallest supported device;
- VoiceOver/TalkBack order for all three scenarios;
- keyboard open, validation, conflict and focus return;
- reduced motion on/off;
- background/foreground during save and retry;
- JS/UI frame time and memory before and after adding Reanimated;
- optional success/rejection haptic presence without semantic dependence.

## Risks

1. gluestack v5 stable sits on NativeWind v5, whose docs still mark it
   pre-release.
2. Expo SDK 57 documents a 25–30% Hermes V1 memory increase when Reanimated is
   imported, pending an upstream fix or worklets bundle-mode mitigation.
3. Copy-paste ownership can create silent divergence during upgrades.
4. Onest font loading can flash or fail offline unless embedded through the
   config plugin in production.
5. React Native Web portability is not equivalent to the future admin web.
6. The control specimen does not prove gluestack-generated component semantics.
7. Accessibility announcements can duplicate screen-reader speech.
8. Maximum font scale may require structural changes, not smaller text.
9. Source review can accept an announcement-only handler as a working
   interaction. It was verified on device that this reads as a dead control and
   as a missed press; primary-action review must now run with the screen reader
   off as well as on.

## Open decisions

1. Run and capture the device acceptance matrix.
2. Choose NativeWind v5 or UniWind for the gluestack pilot.
3. Decide whether to embed Onest at build time instead of runtime loading.
4. Set the minimum iOS/Android versions and representative devices.
5. Define acceptable startup, memory and frame-time budgets.
6. Verify gluestack Button/Input/FormControl semantics after copying.
7. Decide whether future admin web shares primitives or only tokens.
8. Approve or reject React Native/Expo in the main architecture track.

## Gate and next cycle

The research now has enough evidence to stop expanding the candidate set.
Before any product implementation, execute the device matrix. If it passes,
create a promotion packet that explicitly separates:

- accepted visual/token/accessibility contracts;
- accepted runtime recommendation;
- rejected candidates;
- experiments that remain open;
- exact ADR/spec changes proposed for `belcanto-product`.

Nothing in this packet changes the normative product repository.
