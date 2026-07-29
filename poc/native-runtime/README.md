# Belcanto native runtime proof

Status: **EXPLORATORY / NON-NORMATIVE**

A deliberately thin Expo SDK 57 / React Native 0.86 proof for three native-risk
archetypes: Today, Form conflict, and Offline recovery. It is not production
application code and does not select the Belcanto Product stack.

## Run

```sh
npm ci
npm run doctor
npm run typecheck
npm run prebuild:check
```

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
