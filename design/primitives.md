# Primitive Inventory

Status: **EXPLORATORY / NON-NORMATIVE**

## Layer 0 — foundations

- semantic color tokens
- typography roles
- spacing scale
- radius scale
- border/elevation roles
- motion durations/easings
- icon size/stroke rules
- interaction target and accessibility rules

## Layer 1 — layout and content

- `AppSurface`
- `ScrollFrame`
- `Stack`
- `Inline`
- `Grid`
- `Text`
- `Heading`
- `Icon`

## Layer 2 — interaction

- `Pressable`
- `Button`
- `IconButton`
- `Link`
- `Input`
- `TextArea`
- `FormField`
- `Checkbox`
- `Radio`
- `Switch`
- `Slider`

## Layer 3 — surfaces and status

- `Surface`
- `Card`
- `Divider`
- `Badge`
- `Chip`
- `Avatar`
- `ProgressBar`
- `Meter`
- `Rating`
- `Skeleton`
- `EmptyState`

## Layer 4 — navigation and overlay

- `Tabs`
- `BottomNavigation`
- `Sheet`
- `Modal`
- `Menu`
- `Toast`

## Wrapper rule

Product screens import Belcanto primitives only. They do not import gluestack,
NativeWind, Tamagui, Paper, or another foundation directly. This creates a
replaceable seam and gives Belcanto stable semantic variants such as
`primary`, `secondary`, `quiet`, `danger`, and `community`.

## Not primitives

`LessonCard`, `GrowthMetric`, `VoiceProfile`, `EventCard`, `ChallengeCard`,
`TeacherCard`, and `CommunityPostPreview` are exploratory composites. Their
presence here does not approve the corresponding product flow.
