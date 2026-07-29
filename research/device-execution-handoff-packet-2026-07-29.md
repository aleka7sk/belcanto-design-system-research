# Belcanto Design System R&D — Device Execution Handoff Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## Result

The React Native control specimen is now ready to be handed to physical-device
testers. This cycle does not claim a device pass. It removes source-level
failures that would have invalidated the run, defines a release-like install
path, chooses a minimum device profile and turns the previously vague
performance gate into measurable provisional thresholds.

Overall status:

- dependency, config, type and bundle gates: **PASS**;
- native prebuild and font-embedding configuration: **PASS**;
- release-like device handoff: **READY**;
- physical iPhone and Android execution: **BLOCKED / NOT EXECUTED**;
- promotion into `belcanto-product`: **BLOCKED**.

## Execution approach comparison

| Approach | Native fidelity | Reproducibility | Decision |
|---|---:|---:|---|
| Local Release build on connected physical devices | High | High | **Required acceptance path** |
| EAS internal distribution | High | High after account/signing setup | Valid alternative |
| Debug development build | Medium | High | Diagnostic only |
| Expo Go | Low for this gate | Medium | Rejected |
| Simulator/emulator | Medium-low | High | Diagnostic only |

Expo currently directs physical-device Expo Go users to SDK 54 during the SDK
57 transition and describes Expo Go as a limited playground. The PoC remains on
SDK 57, so acceptance uses native local builds.

Sources:

- <https://docs.expo.dev/get-started/create-a-project/>
- <https://docs.expo.dev/get-started/set-up-your-environment/>
- <https://docs.expo.dev/more/expo-cli/>

## Source-level defects removed

### Blank first screen

The earlier `useFonts` branch returned an empty `SafeAreaView` until four Onest
weights loaded. That contradicted D01 before a device test could begin.

Onest is now embedded by the `expo-font` config plugin during native prebuild.
Expo recommends build-time embedding on Android and iOS because the fonts are
available immediately and do not depend on runtime loading.

Source: <https://docs.expo.dev/versions/latest/sdk/font/>

### Nested accessibility focus

The earlier `Section` set `accessible` on a parent containing text and a
Pressable. React Native documents that accessibility parents and nested
elements can affect whether VoiceOver/TalkBack focuses the descendants.
Sections are now non-focusable containers, so headings, body text and the
button remain separate traversal targets.

Source: <https://reactnative.dev/docs/accessibility>

### Duplicate or synthetic settings

- the hidden assertive live region was removed from the general announcement
  path;
- the conflict uses its visible alert plus one explicit outcome announcement;
- the manual reduced-motion switch was removed;
- the PoC reads the real system Reduce Motion value and updates on changes;
- font scaling is no longer capped at `2`;
- the form connects its visible label to the input on Android;
- conflict handling keeps natural traversal order instead of forcing focus and
  potentially interrupting the announcement;
- keyboard insets are enabled for the iOS scroll container.
- `expo-system-ui` is installed so the declared automatic system UI theme is
  applied instead of producing a native prebuild warning.

These choices remain subject to VoiceOver/TalkBack observation. Source
correctness is not a substitute for device evidence.

## Minimum device profile

The preferred physical pair is:

| Platform | Minimum-profile target |
|---|---|
| iOS | Currently supported iPhone with 375-point logical width; iPhone SE 3 / iPhone 13 mini class |
| Android | 4 GB RAM, 60 Hz, 360 dp logical width; Galaxy A15 class or equivalent |

The exact tested model and OS are recorded in each acceptance record. Faster or
wider hardware can diagnose defects but does not close minimum-profile
coverage.

No purchase is implied. If the available devices do not meet the profile, the
corresponding coverage remains `BLOCKED` until a qualifying device can be
borrowed or supplied.

## Provisional performance budgets

| Metric | Admission threshold |
|---|---|
| Crash, ANR, unrecoverable hang | Zero |
| Cold launch to readable and operable screen | Median of five ≤2.5 s iPhone / ≤3.5 s Android; no run ≥5 s |
| Frozen frame or hitch | Zero ≥700 ms |
| Render target | Device refresh interval; 16.67 ms at 60 Hz |
| Input integrity | No lost character, missed press or duplicate action |
| Settled memory after ten cycles | No monotonic growth across final three cycles; growth ≤max(20 MiB, 15%) |

Android treats a cold start at or above five seconds as excessive and a frame
at or above 700 ms as frozen. React Native defines the device refresh interval
as the render deadline. The tighter launch medians and bounded-memory-growth
rule are explicit Belcanto R&D judgments for this small control specimen.

Sources:

- <https://developer.android.com/topic/performance/vitals/launch-time>
- <https://developer.android.com/topic/performance/vitals/render>
- <https://reactnative.dev/docs/performance>
- <https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time>
- <https://developer.apple.com/documentation/xcode/understanding-hitches-in-your-app>
- <https://developer.apple.com/documentation/xcode/gathering-information-about-memory-use>

## Reproducible proof

The updated source passed:

| Check | Result |
|---|---|
| Clean dependency install | Pass |
| `expo-doctor` | 20/20 pass |
| TypeScript | Pass |
| Public Expo config resolution | Pass |
| Clean native prebuild | Pass |
| Android Onest XML family generation | Pass |
| iOS Onest resource / `UIAppFonts` generation | Pass |
| Android production bundle | Pass |
| iOS production bundle | Pass |
| Android native binary compile | Not available in this environment |
| iOS native binary compile | Not available in this environment |

The prebuild generates ignored `android/` and `ios/` directories. The repository
keeps only the source config and lockfile.

## Visual direction, tokens and primitives

Visual direction is unchanged: editorial task-led hierarchy, restrained violet,
clear recovery language and no synthetic metrics.

Token version remains `0.5.0`. This cycle changes runtime delivery and
accessibility behavior, not foundation values.

No new primitive is promoted. The tested control set remains:

- Text and Heading;
- layout containers;
- Pressable/Button;
- Input/FormControl;
- Alert/Status.

## Remaining gate

The exact next action is now external and bounded:

1. run the release-like build on one qualifying iPhone;
2. complete D01–D14 and attach evidence;
3. repeat on one qualifying Android;
4. fix every critical/high defect and rerun affected rows;
5. implement the constrained gluestack v5 primitive pilot;
6. repeat the same matrix for the gluestack specimen;
7. only then choose gluestack versus plain React Native and create the
   promotion packet.

Runbook:
[`poc/native-runtime/device-runbook.md`](../poc/native-runtime/device-runbook.md).

Template:
[`poc/native-runtime/device-acceptance-template.md`](../poc/native-runtime/device-acceptance-template.md).

## Gate decision

**Pre-device readiness — PASS.  
Release-like handoff — READY.  
Physical-device acceptance — BLOCKED / NOT EXECUTED.  
Promotion — BLOCKED.**
