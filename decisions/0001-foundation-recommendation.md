# Decision 0001 — Foundation recommendation

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## Decision

Use gluestack-ui v5's copy-paste/source-ownership architecture and Figma kit as
the leading constrained component candidate. Build a Belcanto-owned semantic
token layer and adapter API, and retain a plain React Native implementation as
the control and fallback until device comparison passes.

Do not approve gluestack v5 plus NativeWind v5 for production merely because
gluestack v5 is stable. NativeWind v5 remains pre-release, and neither styling
engine nor copied primitive semantics have passed the Belcanto physical-device
matrix.

## Why

- It best matches the Claude Design → Figma → code workflow.
- Selected component source becomes locally owned and customizable.
- It provides accessibility-oriented behavior primitives rather than styling
  alone.
- It supports mobile and Expo web without imposing Material identity.
- Its Figma kit contains variables, text/shadow tokens, Auto Layout, and
  component specs that can be re-skinned.

## Current runtime status

| Layer | Status |
|---|---|
| gluestack-ui v5 release | Stable since 2026-06-25 |
| gluestack source ownership | Accepted for a constrained pilot |
| Expo 57 / React Native 0.86 control | Automated executable and native prebuild pass |
| NativeWind v5 | Pre-release; isolated behind adapters |
| UniWind | Secondary experiment |
| Physical iPhone / Android evidence | Blocked / not executed |
| Production adoption | Not approved |

## Stabilization gate

Runtime adoption requires all of the following:

1. the main architecture track separately approves React Native/Expo;
2. exact gluestack and styling-engine versions are compatible with that stack;
3. the plain React Native control passes D01–D14 on qualifying physical iPhone
   and Android devices;
4. copied gluestack Button, Input/FormControl, Pressable, Box, Text and Heading
   pass the same matrix;
5. VoiceOver and TalkBack traversal, keyboard behavior, maximum text size and
   reduced-motion behavior pass;
6. provisional launch, rendering and memory budgets pass and are either
   promoted or replaced by approved product budgets;
7. dependency, TypeScript, native prebuild and platform bundle checks remain
   reproducible from the lockfile.

## Fallback

If implementation begins before the gate passes, use the plain React Native
semantic adapters proven by the control specimen. NativeWind 4 remains an
emergency styling fallback, not the preferred greenfield baseline.

If a shared universal native/web runtime becomes the overriding priority,
re-evaluate Tamagui 2.6 as the primary fallback.

## Reversal

This decision can be reversed without product-screen churn if the wrapper rule
is followed and semantic tokens remain framework-neutral.
