# Belcanto Design System R&D — Screen Archetypes Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## 1. Purpose and boundary

This packet composes the existing visual, typography, accessibility, media, and
motion findings into five mobile screen archetypes. It does not approve product
flows, invent domain data, or promote a UI kit into `belcanto-product`.

The gate asks one question: can the proposed foundation produce recognizably
Belcanto screens when violet decoration is removed, while remaining useful in
dark and light themes and at accessibility sizes?

## 2. Candidate composition models

Criteria: task clarity 24%, Belcanto identity 20%, truthful data 16%,
accessibility/reflow 16%, cross-theme resilience 10%, primitive reuse 8%,
implementation risk 6%.

| Composition model | Score | Strongest fit | Decisive limitation | R&D disposition |
|---|---:|---|---|---|
| Editorial task-led hierarchy | 93 | One meaningful action, people and evidence | Requires disciplined content priority | **Recommended foundation** |
| Modular dashboard grid | 72 | Easy reuse and responsive assembly | Equal cards flatten meaning and look generic | Rejected as screen default |
| Immersive photographic canvas | 76 | Emotion and community identity | Weak readability and operational density | Hero moments only |
| Social feed | 64 | Familiar community browsing | Encourages engagement theatre and weakens school purpose | Rejected |
| Gamified score hub | 58 | Immediate activity | Implies precision and rewards not justified by source data | Rejected |

## 3. Shared composition contract

All five archetypes use **editorial task-led hierarchy**:

1. one dominant question or action in the first viewport;
2. no more than one visually dominant primary action;
3. information grouped by meaning, not forced into equal card geometry;
4. real names, dates, lesson context, repertoire, teacher feedback, and event
   details may be shown only when the product source can provide them;
5. inferred scores, streaks, rankings, completion percentages, and diagnostic
   claims are prohibited unless their definition and source are visible;
6. dark and light variants preserve hierarchy, not merely token substitution;
7. removing violet must leave identity through Onest, Documentary Pulse,
   composition, language, rhythm, and authentic Belcanto content;
8. all essential content reflows at 200% and platform maximum text size;
9. every archetype includes loading, empty, partial, error, disabled, offline,
   and reduced-motion behavior before promotion.

Recommended mobile evaluation frame: 390 × 844 logical pixels, with validation
also required at 320 logical pixels and maximum platform text size. This is a
test frame, not a fixed layout canvas.

## 4. Archetype A — Today

**User question:** what is the next meaningful thing I need to do?

### Composition

- contextual greeting and current date;
- one dominant next lesson, assignment, or required preparation block;
- teacher/context metadata directly supporting that action;
- secondary timeline below, ordered by time and consequence;
- bottom navigation remains quiet and does not compete with the action.

Example content may use clearly labelled fixtures such as “Урок вокала”,
“Сегодня, 19:00”, “Педагог: Алия” and “Подготовить куплет All of Me”. These
fixtures validate layout only and are not product facts.

### Rejected patterns

- four equal KPI cards;
- streak, rank, XP, attendance score, or readiness percentage without a source;
- large greeting consuming the first viewport;
- decorative hero photography that pushes the next action below the fold;
- multiple equal primary buttons.

### State proof

If there is no scheduled activity, the screen explains what is known and offers
a legitimate next path, such as viewing repertoire or contacting the school.
Offline state retains cached schedule provenance and the time of last update.

## 5. Archetype B — Progress

**User question:** what evidence shows that I am developing, and in what context?

### Composition

- current learning focus stated in words;
- chronological evidence: teacher feedback, completed assignment, repertoire
  change, recording, or explicitly defined assessment;
- comparison only between compatible observations;
- the source, date, author, scale definition, and uncertainty remain available;
- media supports evidence but never substitutes for its explanation.

A number may appear only when the product owns its definition. “3/10” without
the assessed skill, rubric, assessor, date, and interpretation is rejected.

### Rejected patterns

- synthetic growth curves;
- anonymous percentages;
- combining attendance, teacher judgement, repertoire, and diagnostics into
  one score;
- celebratory motion for routine data entry;
- red/green meaning without text and context.

### State proof

Sparse history is a valid state, not failure. Corrected or disputed evidence
preserves the old context and communicates that the value changed. Charts must
have an equivalent textual sequence.

## 6. Archetype C — Community

**User question:** who is involved, what is happening, and can I meaningfully join?

### Composition

- one current or upcoming community moment leads;
- real people, date, place, capacity, organiser, and relationship to Belcanto;
- Documentary Pulse photography establishes identity;
- participation action is explicit and reversible where the domain permits;
- discussion belongs to a specific activity or relationship, not an infinite
  engagement feed;
- secondary events or stories use varied editorial rhythm, not cloned cards.

### Rejected patterns

- endless generic feed;
- popularity ranking, vanity reaction counts, and engagement bait;
- public exposure of student media without consent scope;
- AI-generated people presented as members;
- text-heavy event details over photography.

### State proof

No current event leads to a calm explanation and a useful alternative. Removed,
full, cancelled, or consent-revoked content preserves a comprehensible recovery
path without exposing private data.

## 7. Archetype D — Form and editing

**User question:** what information is required, why, and has it been saved?

### Composition

- title and short purpose;
- persistent labels above fields;
- help, validation, and privacy context adjacent to the relevant field;
- sections reflect the user's mental model, not database structure;
- one stable save action; destructive or secondary actions are separated;
- keyboard, focus order, autofill, error summary, and unsaved-change behavior
  are part of the composition.

### Rejected patterns

- dark-luxury low-contrast fields;
- placeholder-only labels;
- disabling submit with no explanation;
- validation communicated only after an avoidable round trip;
- success haptic on press rather than confirmed save;
- required markers that screen readers cannot interpret.

### State proof

Validation error focuses the first invalid field after an accessible summary.
Save progress does not erase entered values. Offline and server-conflict states
explain whether input is local, pending, rejected, or requires reconciliation.

## 8. Archetype E — Empty, error, and recovery

**User question:** what happened, what remains safe, and what can I do next?

### Composition

- plain-language state title;
- short cause only when known;
- explicit effect on the user's data or action;
- one primary recovery route and an optional secondary route;
- diagnostic reference can be copied when useful, without exposing secrets;
- illustration or photography is optional and subordinate.

### Rejected patterns

- mascot, confetti, or humour masking a real failure;
- “Something went wrong” without consequence or recovery;
- retry loops with no progress;
- blaming the user;
- destructive reset as the default route.

### State proof

The archetype distinguishes no-content, no-permission, offline, timeout,
validation, removed content, and unexpected failure. Screen-reader announcement
occurs once; repeated retry does not trigger repeated haptics or celebration.

## 9. Cross-archetype primitive impact

No product composite is promoted. The five screens exercise the existing
primitive seam and reveal four composition-level contracts:

- `PageHeader` remains a composition recipe, not a primitive;
- `ActionBlock`, `EvidenceEntry`, `CommunityMoment`, and `RecoveryPanel`
  remain exploratory composites owned by product-domain work;
- `Card` may group related content but cannot become the default unit for every
  section;
- `BottomNavigation` requires labels, selected semantics, 48 × 48 targets, safe
  area handling, and stable order;
- `FormField`, `MediaFrame`, `ProgressBar`, `Toast`, `Sheet`, and
  `EmptyState` must be demonstrated in context before implementation promotion.

## 10. Theme and identity stress test

A screen passes only if all conditions hold:

| Test | Pass condition |
|---|---|
| Violet removal | Hierarchy and Belcanto character remain legible |
| Photography removal | Task and recovery still work with a neutral fallback |
| Light companion | No generic white SaaS dashboard or weak borders-as-state |
| Dark-first | No low-contrast luxury treatment or hidden field boundaries |
| 200% text | Primary action and essential context remain reachable and untruncated |
| Reduced motion | Final hierarchy and state meaning appear immediately |
| No haptics | Every outcome remains visible or audible |
| Missing data | Layout admits absence instead of fabricating a metric |
| Long Russian/Kazakh text | Reflow works without fixed-height clipping |
| Consent revoked | Media disappears without breaking the task |

Result: **composition contract pass; visual rendering gate remains open**.
The current evidence is sufficient to author a high-fidelity prototype, but not
to claim that the visual direction has passed native or user evaluation.

## 11. Prototype deliverable

The next thin prototype must produce ten primary frames: five archetypes in dark
and light. It must also include focused proof frames rather than every possible
variant:

1. Today at 200% text;
2. Progress with sparse and corrected evidence;
3. Community without photography and with revoked consent;
4. Form with keyboard, validation, disabled/busy, and server conflict;
5. Recovery in offline and unexpected-error states;
6. at least one standard/reduced-motion pair;
7. a 320-pixel-width pass;
8. Russian, Kazakh, and Latin fixture strings;
9. VoiceOver/TalkBack reading-order annotations;
10. source labels for every numeric fixture.

Use realistic but explicitly fictional fixture data until approved Belcanto
content and consented photography are available.

## 12. Risks

1. Fixture data can accidentally harden into product requirements.
2. High-fidelity screens can hide missing domain behavior.
3. Documentary photography can make weak hierarchy look stronger than it is.
4. Dark and light variants can drift into separate visual systems.
5. Onest may remain too generic without disciplined composition and imagery.
6. Progress may still imply assessment authority the product does not own.
7. Community can regress into a feed when content volume grows.
8. Maximum text size may require alternate navigation and media treatment.
9. Screen archetypes do not prove runtime performance.
10. A static prototype cannot validate focus, keyboard, gestures, announcements,
    interruption, or haptic timing.

## 13. Open decisions

1. Which exact student journey supplies approved fixture data.
2. Whether Today leads with lesson, assignment, or adaptive priority.
3. The evidence model and correction semantics for Progress.
4. Participation, privacy, moderation, and chat boundaries for Community.
5. Form save, draft, conflict, and offline ownership.
6. Exact BottomNavigation destinations.
7. Logo, wordmark, iconography, and app icon.
8. Approved photography set and consent records.
9. Figma/code token synchronization.
10. Native runtime and device matrix.
11. User-evaluation protocol and acceptance threshold.
12. Promotion packet into `belcanto-product`.

## 14. Evidence boundary

This packet composes prior repository findings. It does not claim usability
testing, physical-device rendering, native accessibility verification, approved
student data, approved photography, or product-owner acceptance. Its archetypes
are falsifiable design hypotheses for the next prototype cycle.
