# Decision 0001 — Foundation recommendation

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## Decision

Use gluestack-ui's copy-paste/source-ownership architecture and Figma kit as
the leading design-system foundation. Build a Belcanto-owned semantic token
layer and wrapper primitive API.

Do not approve the current gluestack-ui v5 alpha + NativeWind 5 preview chain
for production.

## Why

- It best matches the Claude Design → Figma → code workflow.
- Selected component source becomes locally owned and customizable.
- It provides accessibility-oriented behavior primitives rather than styling
  alone.
- It supports mobile and Expo web without imposing Material identity.
- Its Figma kit contains variables, text/shadow tokens, Auto Layout, and
  component specs that can be re-skinned.

## Stabilization gate

Runtime adoption requires all of the following:

1. official release no longer identifies the selected track as alpha/preview;
2. exact versions are compatible with the approved app stack;
3. a thin project with selected P0 primitives passes iOS, Android, and web;
4. TypeScript, lint, unit, and static export checks pass in CI;
5. VoiceOver and TalkBack checks pass for interactive primitives;
6. reduced-motion and dark/light theme behavior is verified;
7. dependency and bundle budgets are accepted.

## Fallback

If implementation begins before the gate passes, use NativeWind 4 with
selected source-owned gluestack/React Native Reusables primitives behind the
same Belcanto wrapper API.

If a shared universal native/web runtime becomes the overriding priority,
re-evaluate Tamagui 2.6 as the primary fallback.

## Reversal

This decision can be reversed without product-screen churn if the wrapper rule
is followed and semantic tokens remain framework-neutral.
