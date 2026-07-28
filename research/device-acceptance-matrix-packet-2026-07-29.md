# Belcanto Design System R&D — Device Acceptance Matrix Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## Result

The device gate is now split into two independently auditable layers:

1. an automated executable gate;
2. a physical-device behavior gate.

The automated gate passes after correcting the PoC dependency and Expo config
contract. The physical-device gate remains **BLOCKED / NOT EXECUTED** because
this environment has no physical iPhone or Android device. No simulator,
bundle export or source inspection is treated as equivalent evidence.

Promotion into `belcanto-product` therefore remains blocked.

## Candidate comparison

| Acceptance strategy | Reproducibility | Native evidence | Decision |
|---|---:|---:|---|
| Automated gate plus two physical-device records | High | High | **Required** |
| Simulator/emulator-only matrix | High | Medium-low | Diagnostic only |
| Manual visual review without evidence | Low | Low | Rejected |
| App-store beta before focused acceptance | Medium | High but uncontrolled | Too broad for this gate |

## Automated executable gate

Tested from a clean checkout:

| Check | Result |
|---|---|
| `npm install` | Pass after React pin correction |
| `expo-doctor` | 20/20 pass |
| `tsc --noEmit` | Pass |
| Expo Android production bundle | Pass, Hermes bundle generated |
| Expo iOS production bundle | Pass, Hermes bundle generated |

Corrections required by the proof:

- React changed from `19.2.0` to `19.2.3` to satisfy the React Native 0.86 peer contract;
- `expo-doctor` became an explicit development dependency;
- obsolete `newArchEnabled` was removed from Expo config because SDK 57 rejects it;
- `.expo`, `dist` and `node_modules` are ignored;
- a lockfile now makes the tested dependency graph reproducible.

The earlier statement “dependency installation and Metro/native compilation
not passed” is superseded for dependency installation, typechecking and
platform bundle generation. Native binary compilation and device execution are
still unproven.

## Required physical matrix

The gate requires:

- one currently supported physical iPhone;
- one physical mid-range Android representative of the expected student base;
- the same tested commit and release-like build configuration;
- one completed
  `poc/native-runtime/device-acceptance-template.md` per device;
- reviewable screenshots, recordings, traversal transcript and performance
  evidence;
- no unresolved critical or high-severity defect.

Both devices must pass D01–D14. A missing observation is `BLOCKED`, never
`PASS`.

## Visual direction

No new visual direction is introduced. The matrix protects the already selected
editorial task-led hierarchy and tests that it survives real font rendering,
dark/light themes, maximum font scale, screen readers, keyboard occupation,
backgrounding and small screens.

Visual similarity to the HTML prototype is not itself an acceptance criterion.
Semantic hierarchy, recoverability and operability take priority over
pixel-level matching.

## Tokens

Token version remains `0.5.0`. Device testing may reveal that a token must
change, but observations must first be recorded as defects. Testers must not
tune values per device during acceptance.

## Primitive impact

No new primitive is promoted. Physical checks focus on:

- Text and Heading;
- Box/Stack layout;
- Pressable and Button;
- Input/FormControl behavior;
- semantic Alert/Status surfaces.

Modal, Sheet, Toast, navigation, animated progress, media caching, haptics and
product composites remain outside the accepted implementation set.

## Gate decision

| Layer | Status |
|---|---|
| Dependency reproducibility | Pass |
| Expo configuration health | Pass |
| Type contract | Pass |
| iOS/Android bundle generation | Pass |
| Native binary compilation | Open |
| Physical iPhone behavior | Blocked / not executed |
| Physical Android behavior | Blocked / not executed |
| VoiceOver/TalkBack | Blocked / not executed |
| Performance and memory budgets | Blocked pending budget decision |
| Overall device acceptance | **Blocked** |

## Risks

1. A generated bundle does not prove native binary integration.
2. Runtime Onest loading can still flash or fail during offline cold start.
3. Maximum font scale can change composition more than static reasoning shows.
4. Screen-reader announcements may duplicate or interrupt platform speech.
5. Keyboard and focus behavior can diverge between iOS and Android.
6. No numeric startup, memory or frame-time budget is yet approved.
7. A vague “mid-range Android” selection can make results non-repeatable.
8. The current PoC is a React Native control and does not yet test copied
   gluestack v5 primitives.

## Open decisions

1. Select the exact iPhone, Android model and OS versions.
2. Define startup, memory and frame-time budgets before measuring them.
3. Produce release-like device builds and execute D01–D14.
4. Attach evidence without personal notifications or identifiers.
5. Repeat the same matrix after the constrained gluestack primitive pilot.
6. Decide NativeWind v5 versus UniWind only after equivalent results.
7. Decide whether Onest is embedded at build time.
8. Approve or reject Expo/React Native in the main architecture track.

## Next cycle

Do not create the promotion packet yet. The next cycle is the physical-device
execution handoff. Promotion becomes eligible only after both device records
pass and performance budgets are defined.

