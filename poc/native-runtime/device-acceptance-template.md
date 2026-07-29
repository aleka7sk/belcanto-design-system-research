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
| Logical width / RAM / refresh rate | |
| App commit | |
| Build type | |
| Install command | |
| Font scale | |
| Reduce Motion state | |
| Screen reader state | |

Only physical-device records count toward the final device gate. Simulator and
emulator records are diagnostic.

## Acceptance matrix

| ID | Check | Pass criterion | Required evidence | Result |
|---|---|---|---|---|
| D01 | Cold start offline | A readable first screen appears with embedded Onest; no blank font-loading state or layout loss | Screen recording | |
| D02 | Dark/light parity | All three scenarios retain hierarchy, contrast and actions in both themes | Six screenshots | |
| D03 | Maximum font scale | No clipped text, hidden action or horizontal page scroll | Six screenshots | |
| D04 | Smallest supported width | Content reflows; 48-point targets remain operable | Three screenshots | |
| D05 | Screen-reader order | Heading, content, status and action are announced once in logical order | Traversal recording or transcript | |
| D06 | Selected tabs | Role, name and selected state are announced | Traversal transcript | |
| D07 | Form keyboard | Label remains available; field and primary action can be reached; content is not lost | Screen recording | |
| D08 | Conflict recovery | Local text survives; the conflict is announced once; comparison is the next reachable action without forced focus movement | Screen recording and transcript | |
| D09 | Offline recovery | Saved/local state and retry consequence are explicit | Screen recording | |
| D10 | System Reduce Motion | The diagnostic state follows the real system setting; final states remain available without decorative travel or delayed meaning | Paired recordings | |
| D11 | Background during action | Return state is deterministic; no duplicate confirmation or lost edit | Screen recording | |
| D12 | Haptic independence | Meaning remains visible/audible when haptics are unavailable | Observation note | |
| D13 | Responsiveness | Zero frozen frame/hitch ≥700 ms, no repeatable visible stall, missed press or lost character | Performance trace | |
| D14 | Memory | No monotonic growth across the last three cycles; settled growth after ten cycles ≤ max(20 MiB, 15%) | Before/after measurement | |

## Performance record

| Metric | Run 1 | Run 2 | Run 3 | Run 4 | Run 5 | Decision |
|---|---:|---:|---:|---:|---:|---|
| Cold start to readable/operable screen | | | | | | |

Cold-start pass: median ≤2.5 s on iPhone or ≤3.5 s on Android, with no run
≥5 s.

| Metric | Baseline | After 10 cycles | Difference | Decision |
|---|---:|---:|---:|---|
| Settled memory | | | | |
| Frozen frames / hitches ≥700 ms | | | | |
| Missed presses or lost characters | | | | |

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

Runbook: [`device-runbook.md`](device-runbook.md).
