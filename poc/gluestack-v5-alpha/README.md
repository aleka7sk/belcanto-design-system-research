# gluestack-ui v5 alpha PoC

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## Purpose

Test whether the current official gluestack-ui v5 alpha Expo starter can:

- install;
- export for web;
- accept Belcanto semantic tokens;
- compose a plausible mobile screen from source-owned primitives.

## Observed stack

- Expo 56.0.3
- React Native 0.85.3
- React 19.2.3
- `@gluestack-ui/core` 5.0.15-alpha.0
- `@gluestack-ui/utils` 5.0.6-alpha.0
- NativeWind 5.0.0-preview.2
- Tailwind CSS 4.2

## Result

| Check | Result |
|---|---|
| Install official starter dependencies | Pass — 1004 packages, 33 seconds |
| Unmodified Expo web export | Pass |
| Replace generic theme with Belcanto semantic tokens | Pass |
| Compose Belcanto screen from source-owned primitives | Pass |
| Branded Expo web export | Pass — CSS 62 KB, JS 2.5 MB before compression |
| `tsc --noEmit` | Inconclusive — exceeded 90-second research window |
| Native iOS/Android runtime | Not run |
| VoiceOver/TalkBack | Not run |

The large dependency count and bundle are properties of the broad official
starter and are not a measured lower bound for a selected-component app.

## Reproduction outline

```sh
npm create gluestack@latest -- --starter-kit-expo --nativewind --use-npm
npm install
EXPO_NO_TELEMETRY=1 npm run build
```

Apply `global.css` and `app-index.tsx` from this folder to the corresponding
starter files, then run the export again.

## Interpretation

The architecture and visual customization are feasible. This does not clear
the runtime for production because the official path still identifies itself
as alpha and uses preview dependencies.
