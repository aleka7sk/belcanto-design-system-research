# Belcanto Design System R&D — Decision Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## 1. Candidate comparison

Weighted criteria: brand adaptability 18%, source ownership 14%, React
Native/Expo maturity 16%, tokens/themes 12%, accessibility 12%, Figma bridge
10%, web portability 6%, motion/complex UI 5%, maintenance/docs 7%.

Scores are comparative R&D judgments from 1 (weak) to 5 (strong), based on
official docs, repository/package evidence, and the PoC. A high score does not
override a maturity blocker.

| Candidate | Weighted score | Strongest fit | Decisive limitation | Disposition |
|---|---:|---|---|---|
| gluestack-ui v5 alpha | 87.6 | Source-owned components, semantic tokens, Figma kit, accessibility-oriented primitives | Current official starter still uses alpha core/utils and NativeWind 5 preview | **Recommended design/source model; runtime gated** |
| Tamagui 2.6 | 86.8 | Mature universal native/web system, typed tokens, strong theming and optimization | Higher framework/compiler coupling; exact-version coordination and distinct styling model | Primary fallback for a universal runtime |
| React Native Reusables + NativeWind 4 | 82.0 | Copy-paste ownership, familiar shadcn-like structure, stable styling engine | Smaller component/Figma surface and lower institutional maturity | Runtime fallback for a source-owned approach |
| Shopify Restyle 2.4 | 76.6 | Small, typed, excellent for a fully proprietary token/component layer | Supplies a construction system, not accessible primitives or a Figma bridge | Good custom-build option, higher design-system cost |
| NativeWind 4 + custom primitives | 74.6 | Maximum visual freedom and familiar utility styling | Accessibility, component behavior, documentation, and QA become Belcanto's burden | Styling foundation only, not a design system |
| React Native Paper 5.15 | 74.4 | Mature components, Expo friendliness, Material 3 system | Strong Material visual/API gravity and package-level dependency ownership | Useful reference/fallback, not the Belcanto identity base |
| React Native UI Lib 9.1 | 69.4 | Broad native component catalog and active package | Weak direct Figma/source-ownership fit for this workflow | Not shortlisted |

## 2. Recommended foundation

Adopt the **gluestack-ui architecture**, not the current alpha runtime, as the
leading basis:

- copy only selected primitives into Belcanto-owned source;
- keep all framework code behind Belcanto wrappers;
- replace default theme values with semantic Belcanto tokens;
- use the gluestack Figma kit as a bootstrap, not as final visual identity;
- preserve a migration seam so primitives can move to another behavior/styling
  engine without rewriting product screens.

Runtime adoption is blocked until the stabilization gate passes. If product
implementation must start before that, prefer **NativeWind 4 plus selected
source-owned gluestack/React Native Reusables primitives**, still behind the
same Belcanto wrapper API.

Tamagui remains the primary fallback if a stable shared native/web runtime is
more important than source ownership and styling-engine independence.

## 3. Visual direction

Working name: **Resonant Confidence**

A dark-first, editorial mobile environment that feels like entering an
artistic community and seeing personal growth—not using school administration
software.

- Deep ink backgrounds and layered near-black surfaces.
- One vivid violet action color; magenta, green, amber, and red are semantic,
  not decorative.
- Human photography carries emotion; UI chrome remains restrained.
- Cards organize meaningful moments, not every piece of text.
- Typography is confident and contemporary, with a display/body pairing still
  to be selected after brand identity work.
- Progress is shown through rings, bars, ratings, and skill profiles when the
  data is real; never as invented gamification.
- Motion is short, responsive, and purposeful: reveal, state change, progress,
  confirmation, and haptic emphasis.
- No AI gradients, generic luxury styling, decorative flourishes, literal
  music symbols as identity, or banking/CRM/dashboard aesthetics.

## 4. Token baseline

The machine-readable exploratory set is in
[`design/tokens/belcanto.tokens.json`](../design/tokens/belcanto.tokens.json).

Core dark palette:

| Semantic token | Value | Use |
|---|---|---|
| `color.background.canvas` | `#09080F` | Main app background |
| `color.background.surface` | `#14121E` | Default cards and sheets |
| `color.background.raised` | `#1B1828` | Raised/selected surfaces |
| `color.border.default` | `#362F48` | Thin structural border |
| `color.text.primary` | `#F7F4FB` | Primary content |
| `color.text.muted` | `#ABA3BA` | Secondary information |
| `color.action.primary` | `#9C6FFF` | Primary action and focus |
| `color.accent.community` | `#E84F92` | Community/editorial emphasis |
| `color.feedback.success` | `#42C297` | Success and positive delta |
| `color.feedback.warning` | `#EFB457` | Time-sensitive attention |
| `color.feedback.danger` | `#EB5B70` | Destructive/error state |

Structural baseline: 4-point spacing scale; radii 8/12/16/22/pill; motion
120/200/320/480 ms; minimum interactive target 44×44 pt.

## 5. Primitive inventory

P0 foundation:

- `AppSurface`, `ScrollFrame`, `Stack`, `Inline`, `Grid`
- `Text`, `Heading`, `Icon`
- `Pressable`, `Button`, `IconButton`
- `Surface`, `Card`, `Divider`
- `Badge`, `Chip`, `Avatar`
- `ProgressBar`, `Meter`, `Rating`
- `Input`, `TextArea`, `FormField`
- `Tabs`, `BottomNavigation`
- `Sheet`, `Modal`, `Toast`
- `Skeleton`, `EmptyState`

Exploratory composites, explicitly not primitives or approved product scope:

- `LessonCard`
- `GrowthMetric`
- `VoiceProfile`
- `EventCard`
- `ChallengeCard`
- `TeacherCard`
- `CommunityPostPreview`

## 6. Technical proof of concept

Environment tested:

- official `create-gluestack@latest` v5-alpha Expo/NativeWind starter;
- Expo 56.0.3, React Native 0.85.3, React 19.2.3;
- `@gluestack-ui/core` 5.0.15-alpha.0;
- `@gluestack-ui/utils` 5.0.6-alpha.0;
- NativeWind 5.0.0-preview.2 and Tailwind CSS 4.2.

Result:

- Official starter dependencies installed: **pass** (1004 packages, 33 s in
  the test container).
- Unmodified Expo web static export: **pass**.
- Belcanto semantic token replacement: **pass**.
- Belcanto screen composed from source-owned `Box`, `Card`, `Button`, `Badge`,
  `Progress`, `Stack`, and typography primitives: **pass**.
- Branded Expo web static export: **pass**; output CSS 62 KB and JS 2.5 MB
  before compression.
- Standalone `tsc --noEmit`: **inconclusive**; it did not finish within the
  90-second research window, while Metro/Expo compilation succeeded.
- Native iOS/Android runtime and assistive-technology testing: **not yet run**.

Interpretation: the design direction is implementable and source customization
works, but the alpha/preview dependency chain and starter size prevent a
production recommendation today. The starter bundle is an upper bound because
it includes a broad showcase dependency set; a thin selected-component pilot
is still required.

## 7. Risks

1. gluestack v5 is still presented as alpha and depends on NativeWind preview.
2. Version labels across CLI, core packages, docs, and npm dist-tags are easy
   to misread; pinning must be evidence-based.
3. Copy-paste ownership transfers upgrades, security review, and accessibility
   regression responsibility to Belcanto.
4. A dark premium UI can become generic “purple SaaS” without strong
   photography, typography, and content direction.
5. The current typography and logo are unresolved, so visual identity cannot
   yet be frozen.
6. Charts, media, video, gestures, and rich motion are outside the primitive
   PoC and may affect performance.
7. Web reuse may be less valuable than expected because the later admin
   product can have different interaction density.

## 8. Open decisions

1. Product runtime: React Native/Expo, Flutter, or another stack.
2. gluestack v5 stabilization threshold and exact approved versions.
3. Dark-first with light companion versus dark-only for the student app.
4. Final typefaces, logo, and identity system.
5. Whether student mobile and admin web share only tokens or also primitives.
6. Accessibility acceptance target and device/screen-reader test matrix.
7. Figma ↔ code token source of truth and synchronization mechanism.
8. Charts/progress visualization library and reduced-motion behavior.
