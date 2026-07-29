# Belcanto Design System Research

An isolated Design R&D track for the mobile-first Belcanto Product.

Status: **EXPLORATORY / NON-NORMATIVE**

This repository investigates visual direction, semantic tokens, design-system
foundations, component primitives, Figma handoff, and technical feasibility.
It does not define product flows, select the application stack, or modify the
normative Belcanto Product and PEOS repositories.

## Current recommendations

- Use the gluestack-ui v5 copy-paste/source-ownership model and Figma kit as a
  constrained pilot; keep a plain React Native adapter path until device proof.
- Use Onest as the exploratory body/display family through static font weights.
- Author the student experience dark-first with a complete light companion.
- Gate primitives and screen archetypes on WCAG 2.2 AA plus native platform accessibility behavior.
- Use Documentary Pulse: real learning/community imagery leads, performance imagery proves payoff, and controlled portraits provide identity consistency.
- Use semantic, restrained motion with outcome-based haptics; reduced motion resolves state immediately and removes decorative travel.
- Compose screens around one meaningful task or evidence trail; reject equal-card dashboards, synthetic metrics, and generic social feeds.
- Use the ten-frame static prototype as the current composition proof; keep native rendering and user evaluation gated.

The latest packet is
[`research/device-execution-handoff-packet-2026-07-29.md`](research/device-execution-handoff-packet-2026-07-29.md).
Its release-like execution runbook is
[`poc/native-runtime/device-runbook.md`](poc/native-runtime/device-runbook.md).
The physical-device evidence template is
[`poc/native-runtime/device-acceptance-template.md`](poc/native-runtime/device-acceptance-template.md).
The first physical iPhone record is
[`poc/native-runtime/device-acceptance-iphone-2026-07-29.md`](poc/native-runtime/device-acceptance-iphone-2026-07-29.md)
and it is `FAIL`: D08, D09 and D13 failed and every other row is NOT EXECUTED.
The acceptance matrix decision remains in
[`research/device-acceptance-matrix-packet-2026-07-29.md`](research/device-acceptance-matrix-packet-2026-07-29.md).
The native runtime decision remains in
[`research/native-runtime-poc-packet-2026-07-29.md`](research/native-runtime-poc-packet-2026-07-29.md).
The reproducible native source proof is
[`poc/native-runtime/`](poc/native-runtime/).
High-fidelity visual research remains in
[`research/high-fidelity-prototype-packet-2026-07-29.md`](research/high-fidelity-prototype-packet-2026-07-29.md).
The ten-frame visual proof is
[`prototype/archetypes-visual-proof.html`](prototype/archetypes-visual-proof.html).
Screen archetype composition research remains in
[`research/screen-archetypes-packet-2026-07-29.md`](research/screen-archetypes-packet-2026-07-29.md).
Motion and haptics research remains in
[`research/motion-haptics-packet-2026-07-29.md`](research/motion-haptics-packet-2026-07-29.md).
Photography and media research remains in
[`research/photography-media-packet-2026-07-29.md`](research/photography-media-packet-2026-07-29.md).
Accessibility and interaction research remains in
[`research/accessibility-interaction-packet-2026-07-29.md`](research/accessibility-interaction-packet-2026-07-29.md).
Typography and theme research remains in
[`research/typography-theme-packet-2026-07-29.md`](research/typography-theme-packet-2026-07-29.md).
The foundation comparison remains in
[`research/decision-packet-2026-07-29.md`](research/decision-packet-2026-07-29.md).

## Repository map

- `research/` — comparisons, evidence, and decision packets
- `design/` — exploratory visual direction, tokens, and primitives
- `poc/` — reproducible technical proof-of-concept notes and minimal patches
- `decisions/` — non-normative R&D decisions and open gates

## Boundary

Nothing in this repository becomes a Belcanto Product requirement or
architecture decision by implication. Promotion requires an explicit decision
in the main product/architecture track.
