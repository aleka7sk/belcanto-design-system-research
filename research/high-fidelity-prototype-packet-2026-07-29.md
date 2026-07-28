# Belcanto Design System R&D — High-Fidelity Prototype Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## Result

The repository now contains a deterministic visual proof for the five approved
screen archetypes in dark and light themes:

- Today;
- Progress;
- Community;
- Form/editing;
- Empty/error/recovery.

The artifact is `prototype/archetypes-visual-proof.html`. It contains ten
390 × 844 primary frames plus a focused stress board. All names, dates, lesson
details and counts are explicitly fictional fixtures. No content in the
prototype is promoted into the product model.

## Visual decision

The prototype supports the existing **editorial task-led hierarchy**. The
strongest Belcanto identity comes from:

1. a single meaningful question in the first viewport;
2. direct, humane Russian copy;
3. varied editorial rhythm rather than equal cards;
4. evidence and provenance instead of synthetic scores;
5. selective violet action colour;
6. community photography as optional identity evidence, never as structural
   support.

The proof rejects the hypothesis that every main screen needs a photographic
hero. Today, Progress, Form and Recovery remain recognisable and operational
without photography. Community contains a consent-safe placeholder because no
approved Belcanto asset set exists.

## Cross-theme findings

Dark and light use the same semantic hierarchy, not independent compositions.
Light mode remains distinct from a generic white dashboard through typography,
editorial spacing, asymmetry and content priority. Dark mode does not rely on
low-contrast borders or “luxury” emptiness.

No new foundation token was required. Token version remains `0.5.0`.

## Archetype findings

### Today

The next meaningful action leads. Time, lesson, teacher and preparation context
form one bounded action block. Secondary activity is chronological and quiet.

### Progress

Chronological evidence is more credible than a chart at the current evidence
boundary. Author, date, lesson and data provenance remain visible. Correction
is represented as history, not a silent replacement.

### Community

One concrete event is stronger than a feed. Capacity, organiser and reversible
participation are visible without popularity metrics. Removing the image must
not remove any operational information.

### Form

Persistent labels, adjacent validation and conflict ownership survive both
themes. A server conflict is treated as a first-class state that preserves
local input.

### Recovery

The screen answers three questions in order: what happened, what remains safe,
and what the user can do. Illustration is unnecessary.

## Stress contracts represented

- 200% text and 320-pixel width: remove nonessential media before content;
- sparse evidence: explain the small population rather than fabricate a chart;
- corrected evidence: preserve old/new value, author, date and reason;
- revoked consent: replace media without breaking the event;
- offline/conflict: state cached/local/pending/rejected ownership;
- reduced motion: render the final semantic state immediately;
- reading order: header, summary, dominant content, supporting context, primary
  action, secondary content, navigation.

These are annotated contracts, not native runtime proof.

## Component impact

The prototype is sufficient to retain four exploratory composites:

- `ActionBlock`;
- `EvidenceEntry`;
- `CommunityMoment`;
- `RecoveryPanel`.

They are not promoted as reusable components. Their commonality is not yet
proven across real product flows. `Card` remains a local grouping tool rather
than the universal screen unit.

## Gate

**Static visual composition gate: conditional pass.**

Passed:

- ten primary dark/light frames exist;
- hierarchy remains when violet is mentally removed;
- four of five archetypes do not depend on photography;
- numeric fixtures expose meaning and source;
- recovery and conflict communicate data ownership;
- reduced-motion and reading-order contracts are explicit.

Open:

- Onest was not raster-tested through a physical mobile runtime;
- maximum Dynamic Type reflow was not interactively rendered;
- VoiceOver/TalkBack order was not executed;
- keyboard, focus, announcements and haptics remain untested;
- no approved photography or real Belcanto data was used;
- no user evaluation has occurred.

Therefore this artifact closes the screen-level static composition question but
does not close the native rendering gate.

## Risks

1. Browser rendering can hide React Native font and layout differences.
2. Static frames do not prove scrolling or keyboard avoidance.
3. Fixture copy may accidentally become product language.
4. Community identity remains under-tested without approved photography.
5. Four exploratory composites may diverge once real domain behavior lands.
6. Navigation labels remain hypotheses until the information architecture is
   approved.

## Next cycle

Build a thin Expo native proof, limited to:

- Today;
- Form with validation/conflict;
- Recovery offline;
- dark/light;
- Onest Cyrillic, Kazakh and Latin glyphs;
- 320-pixel width and maximum platform text size;
- VoiceOver/TalkBack reading order;
- standard/reduced motion;
- optional confirmation/rejection haptics;
- a mid-range Android and one supported iPhone.

The runtime cycle must compare gluestack v5 alpha/source-owned primitives with a
NativeWind 4 fallback and end with a concrete runtime promotion recommendation.
