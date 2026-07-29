# Belcanto native device execution runbook

Status: **EXPLORATORY / NON-NORMATIVE**

Use this runbook with the exact commit under review. A successful simulator,
Expo Go or JavaScript bundle run is diagnostic only. The acceptance record must
come from a release-like build installed on a physical device.

## Required hardware

| Platform | Required acceptance device | Diagnostic substitute |
|---|---|---|
| iOS | A currently supported physical iPhone; prefer an iPhone SE (3rd generation), iPhone 13 mini, or an equivalent 375-point-width device | Any available physical iPhone or iOS Simulator |
| Android | A physical 4 GB RAM Android phone with a 60 Hz display and a 360 dp logical width; prefer a Galaxy A15-class device or equivalent | Any available Android phone or emulator |

Record the exact model, OS version, logical width, RAM and refresh rate. A
wider/faster device is useful diagnostic evidence but does not replace the
minimum-profile run.

## Why Expo Go is excluded

The PoC uses Expo SDK 57. During the SDK 57 transition, Expo directs
physical-device Expo Go users to SDK 54. Expo also describes Expo Go as a
limited playground rather than a production-grade environment. Use a local
native build so the tested binary contains the same native configuration,
embedded fonts and JavaScript bundle.

Sources:

- <https://docs.expo.dev/get-started/create-a-project/>
- <https://docs.expo.dev/get-started/set-up-your-environment/>
- <https://docs.expo.dev/guides/local-app-development/>

## Prepare the exact source

From the repository root:

```sh
git checkout <commit-under-test>
cd poc/native-runtime
npm ci
npm run doctor
npm run typecheck
npm run prebuild:check
```

`prebuild:check` regenerates ignored `ios/` and `android/` directories and
proves that the `expo-font` config plugin can embed the four Onest weights.
Do not commit generated native directories.

## Install the release-like build

### iPhone

Prerequisites:

- macOS with a compatible Xcode version;
- the iPhone connected and trusted;
- a signing team selected when Xcode requests one.

Run:

```sh
npm run device:ios:release
```

Select the connected device. If signing prevents installation, record the
device result as `BLOCKED`; a debug build may diagnose behavior but cannot close
the gate.

### Android

Prerequisites:

- Android Studio/JDK installed;
- USB debugging enabled;
- the device visible in `adb devices`.

Run:

```sh
npm run device:android:release
```

Select the connected device. The package under test is
`kz.belcanto.research.nativepoc`.

## Evidence preparation

Before recording:

1. Enable Do Not Disturb and redact notifications and account names.
2. Record the app commit and build type.
3. Record logical width, font scale, theme and system Reduce Motion status from
   the diagnostic line inside the app.
4. Disable network access for D01 and restore it only when the step requires it.
5. Use one uninterrupted recording per scenario where practical.
6. Copy `device-acceptance-template.md` once per device and link every artifact.

## Functional and accessibility pass

Execute D01–D12 in template order.

Important observations:

- D01 must show meaningful content immediately; a blank font-loading screen is
  a failure.
- D03 uses the platform's largest accessibility text size, not only 200%.
- D05 traverses every visible element in source order and verifies that the
  button inside a section remains independently reachable.
- D07 verifies the form with the keyboard visible and after dismissal.
- D08 starts with edited local text, triggers the conflict, verifies the alert
  is announced once, and confirms `Сравнить версии` is the next reachable
  action without forced focus movement.
- D10 changes the real system Reduce Motion setting. The app diagnostic line
  must update; the removed manual toggle is not evidence.
- D11 backgrounds the app while save/retry feedback is being produced.
- D12 is tested with vibration/haptics disabled or unavailable.

React Native documents that an `accessible` parent can change or suppress
nested focus, and that Android live regions can announce dynamic changes. The
PoC therefore keeps sections as containers rather than accessibility elements
and uses one explicit outcome announcement path.

Source: <https://reactnative.dev/docs/accessibility>

## Provisional performance budgets

These thresholds admit or reject this thin control specimen only. They are not
production product SLOs.

| Metric | Provisional pass criterion |
|---|---|
| Crash, ANR or unrecoverable hang | Zero |
| Cold start to readable and operable first screen | Median of five runs ≤ 2.5 s on iPhone and ≤ 3.5 s on Android; no run ≥ 5 s |
| Rendering during D02–D11 | Zero frozen frame/hitch ≥ 700 ms; no repeatable visible stall |
| Target frame time | Use the device refresh interval; 16.67 ms at 60 Hz |
| Input integrity | No lost character, missed press or duplicate action |
| Memory after ten complete scenario/theme cycles | No monotonic growth across the last three cycles; settled growth from baseline ≤ max(20 MiB, 15%) |

Android considers cold startup of five seconds or more excessive and frames at
or above 700 ms frozen. React Native uses the device refresh interval as the
render deadline. The tighter medians and bounded-growth rule above are
Belcanto R&D thresholds, not platform guarantees.

Sources:

- <https://developer.android.com/topic/performance/vitals/launch-time>
- <https://developer.android.com/topic/performance/vitals/render>
- <https://reactnative.dev/docs/performance>

### Android capture

Run five cold launches:

```sh
adb shell am force-stop kz.belcanto.research.nativepoc
adb shell am start -S -W \
  kz.belcanto.research.nativepoc/.MainActivity \
  -c android.intent.category.LAUNCHER \
  -a android.intent.action.MAIN
```

Before the interaction loop:

```sh
adb shell dumpsys gfxinfo kz.belcanto.research.nativepoc reset
adb shell dumpsys meminfo kz.belcanto.research.nativepoc
```

After ten complete cycles:

```sh
adb shell dumpsys gfxinfo kz.belcanto.research.nativepoc
adb shell dumpsys meminfo kz.belcanto.research.nativepoc
```

Attach raw outputs or an Android Studio/Perfetto trace.

### iOS capture

Profile the Release scheme on the physical iPhone with:

- Instruments **App Launch** for five cold launches;
- Instruments **Hitches** during D02–D11;
- Instruments **Allocations** before and after ten cycles.

Sources:

- <https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time>
- <https://developer.apple.com/documentation/xcode/understanding-hitches-in-your-app>
- <https://developer.apple.com/documentation/xcode/gathering-information-about-memory-use>

## Decision rule

A device record is `PASS` only when D01–D14 pass, all required evidence is
reviewable, and no critical or high-severity defect remains. Missing hardware,
signing, profiling or evidence means `BLOCKED`, not `PASS`.

After the React Native control passes on both devices, run the same matrix on
the constrained gluestack v5 primitive pilot. Only then can the research
recommend gluestack over the plain React Native fallback.
