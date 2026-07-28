# Belcanto native device acceptance record

Status: **EXPLORATORY / NON-NORMATIVE**

Create one copy per tested device. Do not mark a row passed without the named
evidence. Redact notifications, account names and device identifiers.

## Device

| Field | Recorded value |
|---|---|
| Tester and date | |
| Platform and OS version | |
| Device model | |
| Physical device, simulator or emulator | |
| App commit | |
| Build type | |
| Font scale | |
| Reduce Motion state | |
| Screen reader state | |

Only physical-device records count toward the final device gate. Simulator and
emulator records are diagnostic.

## Acceptance matrix

| ID | Check | Pass criterion | Required evidence | Result |
|---|---|---|---|---|
| D01 | Cold start offline | A readable fallback appears; no blank screen; Onest settles without layout loss | Screen recording | |
| D02 | Dark/light parity | All three scenarios retain hierarchy, contrast and actions in both themes | Six screenshots | |
| D03 | Maximum font scale | No clipped text, hidden action or horizontal page scroll | Six screenshots | |
| D04 | Smallest supported width | Content reflows; 48-point targets remain operable | Three screenshots | |
| D05 | Screen-reader order | Heading, content, status and action are announced once in logical order | Traversal recording or transcript | |
| D06 | Selected tabs | Role, name and selected state are announced | Traversal transcript | |
| D07 | Form keyboard | Label remains available; field and primary action can be reached; content is not lost | Screen recording | |
| D08 | Conflict recovery | Local text survives; conflict alert is announced; comparison action receives focus | Screen recording and transcript | |
| D09 | Offline recovery | Saved/local state and retry consequence are explicit | Screen recording | |
| D10 | Reduce Motion | Final states remain available without decorative travel or delayed meaning | Paired recordings | |
| D11 | Background during action | Return state is deterministic; no duplicate confirmation or lost edit | Screen recording | |
| D12 | Haptic independence | Meaning remains visible/audible when haptics are unavailable | Observation note | |
| D13 | Responsiveness | No repeatable blocked input or visible multi-frame stall in the three scenarios | Performance trace | |
| D14 | Memory | No crash or unbounded growth across ten scenario/theme cycles | Before/after measurement | |

## Blocking defects

| ID | Scenario | Expected | Actual | Severity | Evidence link | Owner |
|---|---|---|---|---|---|---|
| | | | | | | |

## Outcome

- [ ] All D01–D14 passed on this physical device.
- [ ] No unresolved critical or high-severity defect.
- [ ] Evidence is attached and reviewable.

Decision: `PASS / FAIL / BLOCKED`

Notes:

