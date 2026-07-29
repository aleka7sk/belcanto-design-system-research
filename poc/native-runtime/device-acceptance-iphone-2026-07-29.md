# Belcanto native device acceptance record — iPhone, 2026-07-29

Status: **EXPLORATORY / NON-NORMATIVE**

Partial record created from
[`device-acceptance-template.md`](device-acceptance-template.md) using only the
facts reported from the physical run. Rows that were not executed are marked
`NOT EXECUTED`. No evidence artifact was supplied with this report; every row
below therefore stays short of the template's evidence requirement.

## Device

| Field | Recorded value |
|---|---|
| Tester and date | Not recorded / 2026-07-29 |
| Platform and OS version | iOS 26.5.2 |
| Device model | iPhone 14 Pro Max |
| Physical device, simulator or emulator | Physical device |
| Logical width / RAM / refresh rate | 430 pt / not recorded / not recorded |
| App commit | Not recorded by the tester; the observed behavior matches the announcement-only handler revision `d30abfe` |
| Build type | Release-like native build |
| Install command | Not recorded; expected `npm run device:ios:release` |
| Font scale | 1.00 |
| Reduce Motion state | Standard motion (Reduce Motion off) |
| Screen reader state | VoiceOver **not enabled** during the reported interaction checks |

This device is wider than the 375-point minimum iOS profile in
[`device-runbook.md`](device-runbook.md). It is valid evidence for the defects
recorded below, but it does not close minimum-profile width coverage.

## Acceptance matrix

| ID | Check | Result | Note |
|---|---|---|---|
| D01 | Cold start offline | NOT EXECUTED | |
| D02 | Dark/light parity | NOT EXECUTED | |
| D03 | Maximum font scale | NOT EXECUTED | Run performed at font scale 1.00 only |
| D04 | Smallest supported width | NOT EXECUTED | 430 pt device cannot satisfy this row |
| D05 | Screen-reader order | NOT EXECUTED | VoiceOver was off |
| D06 | Selected tabs | NOT EXECUTED | VoiceOver was off |
| D07 | Form keyboard | NOT EXECUTED | |
| D08 | Conflict recovery | **FAIL** | Local text survived after `Сохранить` and the conflict state appeared, but `Сравнить версии` produced no visible comparison. The check is incomplete and cannot pass. |
| D09 | Offline recovery | **FAIL** | `Повторить подключение` produced no visible retry state and no visible outcome. |
| D10 | System Reduce Motion | NOT EXECUTED | Run performed at standard motion only |
| D11 | Background during action | NOT EXECUTED | |
| D12 | Haptic independence | NOT EXECUTED | |
| D13 | Responsiveness | **FAIL** | Primary actions read as missed presses: `Открыть подготовку`, `Сравнить версии` and `Повторить подключение` showed press feedback with no resulting state change. Frame/hitch tracing was not executed. |
| D14 | Memory | NOT EXECUTED | |

## Performance record

| Metric | Run 1 | Run 2 | Run 3 | Run 4 | Run 5 | Decision |
|---|---:|---:|---:|---:|---:|---|
| Cold start to readable/operable screen | | | | | | NOT EXECUTED |

| Metric | Baseline | After 10 cycles | Difference | Decision |
|---|---:|---:|---:|---|
| Settled memory | | | | NOT EXECUTED |
| Frozen frames / hitches ≥700 ms | | | | NOT EXECUTED |
| Missed presses or lost characters | | | | FAIL — see DEF-01, DEF-02, DEF-03 |

## Blocking defects

| ID | Scenario | Expected | Actual | Severity | Evidence link | Owner |
|---|---|---|---|---|---|---|
| DEF-01 | Today — `Открыть подготовку` | A press produces a visible state change | Press feedback only; no visible result | High | Not supplied | R&D track |
| DEF-02 | Form conflict — `Сравнить версии` | A press reveals a comparison of the local and newer version | Press feedback only; no comparison shown | High | Not supplied | R&D track |
| DEF-03 | Offline — `Повторить подключение` | A press produces a visible pending state and a visible outcome | Press feedback only; no retry state or outcome | High | Not supplied | R&D track |

Common root cause: each handler called only
`AccessibilityInfo.announceForAccessibility(...)`. With VoiceOver disabled there
was no observable result at all, and with VoiceOver enabled the visible UI still
did not change.

Non-defect observations confirmed in the same run:

- after `Сохранить`, the conflict state appeared and the locally edited text
  survived.

## Outcome

- [ ] All D01–D14 passed on this physical device.
- [ ] No unresolved critical or high-severity defect.
- [ ] Evidence is attached and reviewable.

Decision: `FAIL`

Notes:

DEF-01, DEF-02 and DEF-03 were addressed in source after this run. That source
change is **not** evidence of a device pass. Every row in this record — the three
failed rows and all `NOT EXECUTED` rows — requires a new Release build and a
fresh physical-device rerun before any result may be claimed.

Runbook: [`device-runbook.md`](device-runbook.md).
