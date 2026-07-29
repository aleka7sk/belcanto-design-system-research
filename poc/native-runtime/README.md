# Belcanto native runtime proof

Status: **EXPLORATORY / NON-NORMATIVE**

A deliberately thin Expo SDK 57 / React Native 0.86 proof for three native-risk
archetypes: Today, Form conflict, and Offline recovery. It is not production
application code and does not select the Belcanto Product stack.

## Run

```sh
npm ci
npm run verify:expo-modules-jsi-patch
npm run doctor
npm run typecheck
npm run prebuild:check
```

`npm ci` runs a `postinstall` hook that applies the temporary
`expo-modules-jsi` workaround described below. Run the verification step before
any device build so a silent dependency change cannot produce an unbuildable or
unreproducible binary.

TypeScript is pinned to `~6.0.3` because Expo SDK 57 requires it. Both
`expo-doctor` and `npx expo install --check` report `typescript@5.9.3 - expected
version: ~6.0.3` as a major version mismatch. Do not "clean up" this pin.

Expo Go is excluded from the acceptance path for this SDK 57 proof. Install a
release-like native build on a connected physical device:

```sh
npm run device:ios:release
npm run device:android:release
```

Follow [`device-runbook.md`](device-runbook.md) and record each physical-device
run with
[`device-acceptance-template.md`](device-acceptance-template.md). Simulator,
emulator and debug results are diagnostic and do not close the device gate.

The current physical-device record is
[`device-acceptance-iphone-2026-07-29.md`](device-acceptance-iphone-2026-07-29.md).
It is `FAIL`: D08, D09 and D13 failed and every other row is `NOT EXECUTED`.

## What is encoded

- Onest regular, medium, semibold and bold embedded at native build time through
  the Expo Font config plugin;
- semantic theme values rather than library-specific component colours;
- persistent labels and preserved local text during a version conflict;
- explicit offline ownership and recovery copy;
- 48–52 point minimum interactive targets;
- explicit tab state, headings, alerts, labels and live announcements;
- wrapping layouts without fixed screen height;
- live platform, logical-width, font-scale and system Reduce Motion diagnostics;
- visible fixtures and no invented product requirements.

## Interaction contract

Every primary action must change visible state. A handler that only calls
`AccessibilityInfo.announceForAccessibility(...)` is **not** a complete
interaction: with the screen reader disabled it produces no observable result,
so the control reads as a dead affordance and as a missed press. This was the
cause of the D08/D09/D13 failures recorded in
[`device-acceptance-iphone-2026-07-29.md`](device-acceptance-iphone-2026-07-29.md).

The current specimen encodes:

| Action | Visible outcome | Announcement |
|---|---|---|
| `Открыть подготовку` | Inline disclosure of the preparation fixture; the button toggles to `Свернуть подготовку` and exposes `expanded` | One announcement per toggle |
| `Сохранить` | Conflict alert appears; the locally edited text is preserved | One outcome announcement |
| `Сравнить версии` | Inline comparison surface with a `Сравнение версий` heading and labelled `Ваш текст` / `Более новая версия` values; the button toggles to `Скрыть сравнение` | One announcement per toggle |
| `Повторить подключение` | `idle → checking → still offline` with a visible pending label, a visible offline outcome, a local-data-safety line and an attempt counter | One announcement on the final result |

The retry fixture disables the button while checking and exposes the busy and
disabled accessibility state, so a repeated press cannot start a second attempt
or produce a second announcement. Returning to the foreground during a pending
retry settles the same deterministic result once. The pending state is semantic,
not decorative: system Reduce Motion shortens it but never removes it. No
network request, navigation, Modal or Sheet is involved — those primitives
remain outside the accepted set.

## Temporary ExpoModulesJSI build workaround

`expo-modules-jsi@57.0.4` ships this guard in
`node_modules/expo-modules-jsi/apple/Sources/ExpoModulesJSI/Coding/JavaScriptCodable+Date.swift`:

```swift
guard milliseconds.isFinite, abs(milliseconds) <= maxJavaScriptDateMilliseconds else {
```

On the Xcode/Swift toolchain used for this R&D track that expression fails to
compile with `type of expression is ambiguous without a type annotation`, which
blocks the iOS Release build the physical-device gate depends on. The proven
replacement compares the same bounds as explicit `Double` literals:

```swift
guard milliseconds.isFinite,
  milliseconds >= -8_640_000_000_000_000.0,
  milliseconds <= 8_640_000_000_000_000.0 else {
```

Upstream issue: <https://github.com/expo/expo/issues/47957>. That issue is
**closed as "incomplete issue: missing or invalid repro"** — closed for lack of a
valid reproduction, not by a fix. Its closure is therefore not evidence that the
dependency defect is resolved: the published `expo-modules-jsi@57.0.4` installed
here still contains the failing expression. Nothing in this repository claims the
upstream defect is fixed.

`node_modules/` is git-ignored, so a hand-edited file is invisible to review and
is destroyed by `npm ci` — a clean install would silently restore the failing
source and make the Release build non-reproducible. The fix therefore lives in
[`scripts/patch-expo-modules-jsi.js`](scripts/patch-expo-modules-jsi.js), a
repository-owned Node script with no new dependency:

| Command | Behavior |
|---|---|
| `npm ci` / `npm install` | `postinstall` applies the patch automatically |
| `npm run patch:expo-modules-jsi` | Applies it explicitly; idempotent |
| `npm run verify:expo-modules-jsi-patch` | Check mode; never writes; exits non-zero if the corrected expression is absent |

The script touches that single file and no other dependency file. If neither the
known failing expression nor the corrected one is present it fails loudly with a
dependency-drift error instead of guessing.

**Removal condition:** delete the script, the `postinstall` hook and the two
`*:expo-modules-jsi*` scripts as soon as a published `expo-modules-jsi` no
longer contains the failing expression. The condition is the installed package
source, never the GitHub issue status. The drift error exists so an upgrade
cannot quietly keep a stale workaround alive.

## Runtime candidate harness

This source intentionally uses React Native primitives as a control specimen.
Run it first. Then initialize gluestack v5 in a disposable copy and replace only
`ActionButton`, `Section`, tabs, input and typography primitives:

```sh
npx gluestack-ui@latest init
npx gluestack-ui@latest add button input form-control pressable box text heading
```

Choose the NativeWind v5 engine for the comparison. Do not copy default visual
tokens into the Belcanto token layer. The test passes only if semantics,
reading order, 200% reflow and conflict/offline behavior remain identical.

## Honest boundary

Repository inspection and native prebuild can prove source structure,
dependency compatibility, font embedding configuration and generated native
projects. They cannot prove physical haptics, platform screen-reader order,
keyboard behavior, rendering performance or the exact maximum-font
composition. Those checks require the device matrix in the packet.
