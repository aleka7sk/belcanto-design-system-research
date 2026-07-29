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
- physical iPhone execution: **FAIL** — D08, D09 and D13 failed on the first
  run; all other rows remain **NOT EXECUTED**;
- physical Android execution: **BLOCKED / NOT EXECUTED**;
- promotion into `belcanto-product`: **BLOCKED**.

## First physical iPhone run — 2026-07-29

A release-like build was installed on an iPhone 14 Pro Max (iOS 26.5.2, 430 pt,
font scale 1.00, standard motion, VoiceOver off). Three primary actions —
`Открыть подготовку`, `Сравнить версии` and `Повторить подключение` — showed
press feedback but produced no observable result. Each handler called only
`AccessibilityInfo.announceForAccessibility(...)`, so with the screen reader off
nothing changed, and with it on the visible UI still did not change.

D08 and D09 failed; D13 failed because the actions read as missed presses. The
`Сохранить` step behaved correctly: the conflict appeared and the locally edited
text survived.

The specimen has since been repaired so that every primary action changes
visible state: an inline preparation disclosure, an inline version-comparison
surface that shows `Ваш текст` and `Более новая версия` without overwriting
either, and an explicit `idle → checking → still offline` retry fixture that
blocks duplicate attempts and settles once after backgrounding. This corrects
the source; it does not restore any acceptance row. Every failed and unexecuted
row requires a new Release build and a fresh physical-device rerun.

Record:
[`poc/native-runtime/device-acceptance-iphone-2026-07-29.md`](../poc/native-runtime/device-acceptance-iphone-2026-07-29.md).

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

### Announcement-only actions (found on device, 2026-07-29)

Three primary actions carried an announcement as their entire effect. That is
not a complete interaction: it is invisible whenever the screen reader is off,
and it changes nothing even when the screen reader is on. Every primary action
now produces a visible state change first, with at most one concise
announcement describing that same change.

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

### Reproducibility of the iOS Release build

`expo-modules-jsi@57.0.4` contains a Swift guard expression that does not
compile on the Xcode toolchain used here. The fix previously existed only as a
hand edit inside git-ignored `node_modules/`, so `npm ci` would have restored
the failing source and made the Release build non-reproducible — a build that
cannot be reproduced cannot support an acceptance record.

The workaround is now a repository-owned `postinstall` script,
`poc/native-runtime/scripts/patch-expo-modules-jsi.js`, with an explicit
`npm run verify:expo-modules-jsi-patch` check. It edits one file in one
dependency, is idempotent, and fails loudly on dependency drift. No new
dependency (including `patch-package`) was introduced.

Upstream issue: <https://github.com/expo/expo/issues/47957>. It is closed as
"incomplete issue: missing or invalid repro" — closed for lack of a valid
reproduction, not by a fix. That closure is not evidence that the dependency
defect is resolved; the published `expo-modules-jsi@57.0.4` inspected here still
contains the failing expression. The workaround is removed when a published
`expo-modules-jsi` no longer contains that expression, never on the basis of the
GitHub issue status.

TypeScript stays pinned at `~6.0.3`: Expo SDK 57 requires it, and both
`expo-doctor` and `npx expo install --check` report `5.9.3` as a major version
mismatch against the expected `~6.0.3`.

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

1. run `npm ci` and `npm run verify:expo-modules-jsi-patch` so the build comes
   from a reproducible dependency state, then rebuild the Release binary from
   the repaired source, reinstall it on the iPhone and rerun D08, D09 and D13
   with the screen reader off and again with VoiceOver on;
2. complete the remaining D01–D14 rows on a qualifying iPhone and attach
   evidence;
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
Physical iPhone acceptance — FAIL (D08, D09, D13); all other rows NOT EXECUTED.  
Physical Android acceptance — BLOCKED / NOT EXECUTED.  
Promotion — BLOCKED.**
