# Belcanto Design System R&D — Photography and Media Packet

Date: 2026-07-29  
Status: **EXPLORATORY / NON-NORMATIVE**

## 1. Candidate comparison

Criteria: Belcanto identity 24%, authenticity 20%, repeatability 16%, mobile
composition 12%, accessibility 10%, production cost 10%, localization and
reuse 8%.

| Candidate direction | Score | Strongest fit | Decisive limitation | R&D disposition |
|---|---:|---|---|---|
| Documentary community | 91 | Real relationships, practice, belonging, credible daily life | Requires continuous access, consent discipline, and good observational photography | **Primary visual foundation** |
| Performance editorial | 88 | Energy, aspiration, stage light, emotional payoff | Can overrepresent concerts and make ordinary learning feel secondary | Secondary hero layer |
| Controlled studio portrait | 82 | Consistent profile system and clean crops | Risks polished corporate-school aesthetics and production bottlenecks | Structured identity layer |
| Phone-native member capture | 76 | Immediate and participatory | Inconsistent light, rights, quality, and framing | Curated community-only input |
| Abstract/generative music imagery | 65 | Easy scalable atmosphere | Generic AI aesthetic, weak trust, no real Belcanto people | Texture only; never foundation |
| Stock music-school imagery | 51 | Cheap and available | Clichéd microphones, fake classrooms, no Belcanto truth | Rejected |

## 2. Recommended foundation

Adopt a **Documentary Pulse** photography system inside Resonant Confidence:

- 60% documentary learning and community;
- 25% performance/editorial energy;
- 15% controlled portraits and identity assets.

These percentages are portfolio guidance, not a per-screen quota. Real Belcanto
people, spaces, practice, feedback, preparation, and shared moments lead. Stage
imagery proves emotional payoff without pretending every day is a concert.
Portraits provide consistency for profiles and recognition.

Required shot families:

1. learning in motion — breath, listening, correction, repetition;
2. teacher relationship — feedback and collaboration, not authority poses;
3. preparation — arrival, warm-up, backstage, anticipation;
4. performance — earned intensity and audience connection;
5. community — conversation, support, shared activities;
6. portrait — natural gaze and voice, with crop-safe negative space;
7. detail — hands, notes, room texture, equipment only when contextually true.

Reject staged microphone clichés, permanent violet color grading, fake applause,
beauty-retouching that erases real people, AI-generated people presented as
students, and imagery that turns teachers into stock-photo presenters.

## 3. Visual direction

Photography carries warmth and humanity; UI chrome stays disciplined.

- Preserve believable skin tones and the actual atmosphere of Belcanto spaces.
- Use dark exposure selectively; do not crush faces to make the palette match.
- Prefer eye-level proximity and observed moments over symmetrical advertising poses.
- Keep one clear subject or relationship per crop.
- Compose for mobile vertical crops at capture time, not only in post.
- Violet and magenta may appear in real light or UI, but are not mandatory photo grading.
- Light theme uses the same photographs with calmer surrounding surfaces, not a separate bright stock library.
- Text is preferably adjacent to imagery. Overlay is reserved for short labels,
  titles, or metadata with a deterministic scrim.
- No essential action, error, price, schedule, or long paragraph sits directly
  on a photograph.
- Photography remains recognizable as Belcanto even when all UI accents are removed.

## 4. Tokens

The exploratory token set advances to **0.4.0**.

| Token | Value | Contract |
|---|---|---|
| `media.aspect.portrait` | `4 / 5` | Profiles and close human moments |
| `media.aspect.editorial` | `3 / 2` | Community and lesson storytelling |
| `media.aspect.hero` | `16 / 10` | Wide mobile hero moments |
| `media.scrim.textMinimum` | `0.60` | Minimum black opacity at every pixel behind normal overlay text |
| `media.scrim.textStrong` | `0.68` | High-noise or high-emphasis overlay region |
| `media.scrim.none` | `0` | Images without overlay text |
| `media.focalPoint.defaultX/Y` | `0.5 / 0.5` | Explicit fallback only |
| `media.placeholder` | `thumbhash-or-blurhash` | Non-informative loading preview |

A gradient may visually begin at 0%, but the region directly behind text must
reach at least the minimum opacity. The token does not authorize arbitrary text
placement; the rendered crop still requires a contrast check.

## 5. Primitive impact

Add two foundation primitives; no product composite is approved.

- `Image`: source, intrinsic dimensions, content description policy,
  placeholder, loading/error state, cache policy, and focal point;
- `MediaFrame`: semantic aspect, crop, focal point, overlay-safe region,
  scrim recipe, and optional short caption slot.

`MediaFrame` owns presentation but not subject metadata or product behavior.
`Avatar` continues to own identity-specific fallback and status behavior.

Required contracts:

- meaningful images receive a contextual description;
- decorative images are excluded from the accessibility tree;
- visible captions are not duplicated verbatim as screen-reader descriptions;
- crop uses normalized focal coordinates rather than per-screen magic offsets;
- loading placeholders never imply content that has not loaded;
- image failure preserves the surrounding content and action;
- text baked into images is rejected except for authentic photographed content
  where the text is itself part of the scene.

Exploratory composites such as `LessonCard`, `EventCard`, and
`CommunityPostPreview` may consume these primitives but remain unapproved.

## 6. Technical proof of concept

A deterministic worst-case overlay calculation was run using the current dark
primary text `#F7F4FB`, a fully white image region, and a black scrim.

| Black scrim opacity | Worst resulting background | Contrast | Result |
|---:|---|---:|---|
| 52% | `#7A7A7A` | 3.94:1 | Fail |
| 56% | `#707070` | 4.55:1 | Nominal pass, inadequate margin |
| 60% | `#666666` | 5.27:1 | **Recommended minimum** |
| 64% | `#5C5C5C` | 6.14:1 | Strong |
| 68% | `#525252` | 7.18:1 | Enhanced contrast |

This is deliberately a worst-case bound: any source pixel darker than white
produces at least as much contrast under the same black compositing rule.
Anti-aliasing, compression, HDR rendering, gradients, and crop changes still
require rendered inspection.

The implementation seam is feasible with Expo Image: its cross-platform API
supports content-fit/content-position behavior, placeholders, caching, and
transitions. The exact Belcanto wrapper remains independent of Expo until the
main runtime is approved.

Result: **media contract and contrast-math pass; real-asset and native-rendering
gate remains open**.

Required thin PoC:

1. collect 20–30 consent-cleared representative Belcanto photographs;
2. record normalized focal points and rights metadata;
3. render portrait/editorial/hero crops at narrow and wide mobile widths;
4. verify dark/light context, normal and maximum text scaling;
5. compare adjacent-text, 60% scrim, and 68% strong-scrim treatments;
6. test offline/loading/error behavior and placeholder transitions;
7. inspect VoiceOver/TalkBack descriptions in Russian and Kazakh;
8. measure decoded memory, cache behavior, and scrolling stability on low/mid devices.

## 7. Asset governance

Every production candidate needs an asset record:

- stable asset ID and original file;
- photographer/source and capture date;
- identifiable subjects;
- consent/release state and evidence;
- permitted surfaces: internal product, marketing, public social, or restricted;
- territory/time limits and revocation/expiry;
- minors/guardian status when applicable;
- normalized focal point and protected crop region;
- description/caption in supported languages where meaningful;
- derivative history and edit policy.

No asset is promoted from a chat upload, social network, or member submission
without provenance and permission review. Revocation must remove derivatives
and cached distribution according to an explicit operational process.

## 8. Risks

1. Documentary quality depends on access, trust, timing, and photographer skill.
2. A performance-heavy library can misrepresent the daily student experience.
3. Consent can be narrower than the intended app/marketing reuse.
4. Focal metadata can still fail when multiple people matter.
5. Dark scrims can make every image visually heavy and repetitive.
6. Aggressive crops may remove teachers, gestures, instruments, or context.
7. Placeholders, large originals, and transitions can harm memory and scrolling.
8. AI enhancement can silently alter identity or documentary truth.
9. Screen-reader descriptions can become redundant, subjective, or privacy-invasive.
10. No current sample set proves the direction with actual Belcanto assets.

## 9. Open decisions

1. Photographer/creative-owner responsibility and recurring capture cadence.
2. Consent model, storage, revocation, and retention policy.
3. Exact CDN/image pipeline, responsive derivatives, and cache ownership.
4. Whether focal point supports one subject, region, or multiple protected regions.
5. Russian/Kazakh caption and description workflow.
6. Rules for member-submitted and teacher-submitted media.
7. Portrait fallback when a person does not consent to photography.
8. Video thumbnail, captions, transcripts, and autoplay policy.
9. Real-asset acceptance set and visual review panel.
10. Boundary between in-product assets and public marketing reuse.

## 10. Evidence boundary

Primary technical references:

- W3C WCAG 2.2 Understanding 1.4.3 for 4.5:1 normal-text contrast;
- W3C WCAG 2.2 Understanding 1.1.1 for meaningful versus decorative non-text content;
- Apple Human Interface Guidelines for images and accessibility;
- Expo Image documentation for cross-platform crop positioning, placeholders,
  caching, and transitions.

This packet defines an exploratory visual and technical contract. It does not
grant image rights, approve product flows, choose the runtime, or claim that
Belcanto's real photography has passed visual QA.
