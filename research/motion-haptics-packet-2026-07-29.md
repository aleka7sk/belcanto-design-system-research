# Belcanto Design System R&D — Motion and Haptics Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## 1. Candidate comparison

Criteria: semantic clarity 24%, accessibility 20%, native fit 16%, performance
14%, brand expression 12%, implementation portability 8%, QA cost 6%.

| Candidate direction | Score | Strongest fit | Decisive limitation | R&D disposition |
|---|---:|---|---|---|
| Semantic restrained motion + sparse haptics | 92 | Clear hierarchy, native feel, replaceable implementation | Requires disciplined recipes and real-device tuning | **Recommended foundation** |
| Platform-default motion only | 84 | Lowest risk and familiar navigation | Weak Belcanto expression and inconsistent product states | Navigation fallback |
| Expressive spring-led system | 75 | High energy and emotional moments | Easily becomes playful, fatiguing, and harder to reduce | Celebration-only experiment |
| Cinematic shared-element motion | 69 | Strong editorial transitions | Runtime coupling, motion sensitivity, interruption complexity | Gated experiment |
| Continuous ambient/parallax motion | 48 | Immediate visual spectacle | Battery, distraction, nausea, generic premium aesthetic | Rejected |

## 2. Recommended foundation

Adopt a semantic motion contract rather than exposing animation-library APIs:

- **state** — 120 ms for pressed, selected, focus, validation, and local feedback;
- **transition** — 200 ms for sheets, disclosure, compact layout changes, and content replacement;
- **progress** — 320 ms for determinate value change when animation improves comprehension;
- **celebration** — up to 480 ms, single-run, reserved for earned milestones;
- navigation follows platform conventions unless a tested Belcanto transition has a clear purpose;
- motion never delays task completion, acknowledgement, navigation, or error recovery;
- haptics attach to selection or outcomes, not every generic tap.

The product API should request semantic intent; the eventual runtime maps that
intent to Reanimated, platform navigation, Expo Haptics, or another engine.

## 3. Visual direction

Motion is the pulse of **Resonant Confidence**, not spectacle:

- surfaces settle rather than bounce;
- content may fade with no more than 4–12 px of authored travel;
- progress animates from the last known value, never from zero on every render;
- photography does not continuously zoom, float, or parallax;
- celebration is earned, brief, interruptible, and never autoplayed repeatedly;
- loading skeletons do not shimmer indefinitely when a static placeholder works;
- haptics reinforce a visible/audible result and never substitute for it;
- reduced motion presents the final composition immediately.

## 4. Tokens

The exploratory token set advances to **0.5.0**.

| Token | Value | Contract |
|---|---:|---|
| `motion.semantic.state` | 120 ms | Local state response |
| `motion.semantic.transition` | 200 ms | Disclosure and compact transition |
| `motion.semantic.progress` | 320 ms | Meaningful value interpolation |
| `motion.semantic.celebration` | 480 ms | Maximum earned flourish |
| `motion.distance.subtle` | 4 px | Micro reveal |
| `motion.distance.standard` | 12 px | Maximum authored content travel |
| `motion.reduced.duration` | 0 ms | Immediate state resolution |
| `haptics.selection` | selection | Registered discrete choice |
| `haptics.confirmation` | success/platform confirm | Successful completion |
| `haptics.warning` | warning | Attention before consequence |
| `haptics.rejection` | error/platform reject | Failed or rejected action |

Haptic names express meaning, not device amplitude. Platform adapters choose
supported effects and may produce no physical output.

## 5. Primitive impact

No new visual primitive is added. Motion and haptics become cross-cutting
behavior of existing primitives:

- `Pressable`: visual pressed state within 120 ms; no default haptic;
- `Tabs`, `Radio`, `Slider`: optional selection haptic for discrete changes;
- `Button`: confirmation haptic only after successful outcome, not on press;
- `Sheet` and `Modal`: 200 ms authored transition or platform default;
- `ProgressBar` and `Meter`: interpolate changed values; reduced mode jumps to value;
- `Toast`: may pair warning/rejection haptic with persistent accessible message;
- `Skeleton`: no endless decorative shimmer requirement;
- `MediaFrame`: no ambient zoom/parallax by default.

Every animated primitive needs interruption, unmount, repeated-trigger, and
reduced-motion behavior in its contract.

## 6. Technical proof of concept

A deterministic behavior matrix was evaluated against the proposed adapter seam.

| Scenario | Standard behavior | Reduced behavior | Haptic |
|---|---|---|---|
| Press/selection | State ≤120 ms | Immediate | Selection only for discrete choice |
| Sheet/modal | Transition ≤200 ms | Immediate or platform reduced transition | None |
| Progress update | Interpolate ≤320 ms from previous value | Jump to final value | None |
| Save success | Visible confirmation | Same confirmation | Success/confirm optional |
| Validation error | Visible text, icon, focus | Same result immediately | Error/reject optional |
| Achievement | One run ≤480 ms | Static earned state | Success optional |
| Loading | Static/sparse indicator | Static indicator | None |

The contract is implementable with Reanimated's system-aware reduced-motion
configuration: timing and spring animations can resolve immediately, layout
entrances reach their endpoint, and exiting/shared transitions can be omitted.
Expo Haptics exposes selection, success, warning, error, impact, and
Android-specific semantic effects, but physical output is not guaranteed:
device capability, user settings, Low Power Mode, camera/dictation state, and
web support can suppress it.

Result: **semantic adapter and deterministic reduced-motion matrix pass;
real-device timing, interruption, frame pacing, and haptic tuning remain open**.

Required thin native PoC:

1. implement one pressable, one sheet, one progress change, one validation error,
   and one achievement in standard and reduced modes;
2. test rapid repeated triggers, background/foreground, unmount, and navigation interruption;
3. measure dropped frames on low/mid Android and current iPhone;
4. compare iOS and Android selection/confirm/reject semantics on physical devices;
5. verify that all states remain understandable with haptics disabled;
6. inspect screen-reader announcements during and after transitions.

## 7. Risks

1. A 120/200/320/480 scale can become arbitrary without contextual recipes.
2. Reanimated or navigation behavior may vary across exact runtime versions.
3. Haptics differ substantially by device and may be absent.
4. Excess success feedback can make ordinary work feel gamified.
5. Celebration can become manipulative if attached to attendance or fabricated metrics.
6. Animated progress can imply precision the underlying data does not have.
7. Immediate reduced transitions can expose focus or reading-order defects.
8. JS-triggered feedback can arrive late under load.
9. Web vibration is not a reliable equivalent of native haptics.
10. Static policy does not prove smoothness or comfort on real devices.

## 8. Open decisions

1. Exact native animation and navigation engines after runtime approval.
2. Device matrix and frame-time acceptance budget.
3. Whether users receive an in-app haptics preference in addition to system settings.
4. Exact mapping of semantic haptics on iOS and Android.
5. Achievement criteria that legitimately earn celebration.
6. Progress animation rules for uncertain, partial, or corrected data.
7. Gesture cancellation and interruption conventions.
8. Loading indicator and skeleton recipes.
9. Screen-reader announcement timing during transitions.
10. Figma prototype conventions for standard and reduced motion.

## 9. Evidence boundary

Primary references:

- Expo Haptics documentation for cross-platform APIs, semantic effects, and
  conditions where output may be suppressed;
- React Native Reanimated 4 accessibility guidance for system-aware reduced
  motion behavior;
- Apple Human Interface Guidelines for haptics and multimodal feedback;
- Android haptics design principles for semantic, device-appropriate effects.

This packet does not select the application runtime, approve product
gamification, or claim that any motion/haptic treatment has passed physical
device testing.
