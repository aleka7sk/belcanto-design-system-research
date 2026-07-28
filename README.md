# Belcanto Design System Research

An isolated Design R&D track for the mobile-first Belcanto Product.

Status: **EXPLORATORY / NON-NORMATIVE**

This repository investigates visual direction, semantic tokens, design-system
foundations, component primitives, Figma handoff, and technical feasibility.
It does not define product flows, select the application stack, or modify the
normative Belcanto Product and PEOS repositories.

## Current recommendation

Use the gluestack-ui copy-paste/source-ownership model and Figma kit as the
leading foundation for Belcanto's own tokens and wrapped primitives. Do not
adopt the current gluestack-ui v5 alpha runtime as a production dependency
until the stabilization gate in
[`decisions/0001-foundation-recommendation.md`](decisions/0001-foundation-recommendation.md)
passes.

The exact decision packet is in
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
