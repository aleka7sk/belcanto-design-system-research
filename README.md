# Belcanto Design System Research

An isolated Design R&D track for the mobile-first Belcanto Product.

Status: **EXPLORATORY / NON-NORMATIVE**

This repository investigates visual direction, semantic tokens, design-system
foundations, component primitives, Figma handoff, and technical feasibility.
It does not define product flows, select the application stack, or modify the
normative Belcanto Product and PEOS repositories.

## Current recommendations

- Use the gluestack-ui copy-paste/source-ownership model and Figma kit as the
  leading foundation, while its v5 alpha runtime remains gated.
- Use Onest as the exploratory body/display family through static font weights.
- Author the student experience dark-first with a complete light companion.

The latest packet is
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
