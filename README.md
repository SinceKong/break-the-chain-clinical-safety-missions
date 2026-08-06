# Break the Chain - Real Clinical Incident Missions

Open `index.html` in a modern browser, or serve this folder with any simple
static web server.

## Release v7.1.0

This owner refinement supersedes the v7.0.0 decision-layout experiment. The
previous public state remains preserved by the `v7.0.0-before-decision-redesign`
tag in the clean repository.

The current build covers 17 incidents across 15 missions in the exact order of
`/Users/since/Downloads/Package/Incident Sharing (Comic).pptx`. The two Oxygen
cases share one mission, and the two transfer cases share one mission. Four new
missions cover wrong-patient administration after distraction, an ambiguous
adrenaline order, mouthwash administered via an NG tube, and mistaken ingestion
of a specimen-container ingredient.

The 15-mission build has passed desktop and 390×844 mobile browser QA. The external quiz
URL remains intentionally unset until the owner supplies it.

Completed missions reopen as a read-only review: `YOUR DECISION`, `REAL CASE`,
and `TAKEAWAY` remain expanded and the saved Mission Stars remain unchanged.
Mission 11 runs those three stages twice in one mission, once for each Oxygen
incident.

Mission Stars are based only on Part 1 of each mission: the first correct
attempt earns three stars, the second earns two, and the third or any later
attempt earns one. The on-screen remarks state that Mission Stars are for fun
only and training completion is confirmed by the Final Quiz.

Each Incident Comic is a 2000×1125 PNG exported directly by Microsoft
PowerPoint, preserving the slide title, caption boxes, and Learning Points.
Decision scenes use the supplied text-free 1672×941 source artwork. Dashboard
thumbnails use the impact-line or error focal panel: Oxygen uses only the panel
where the cylinder main switch was not turned on, and Transfer uses the upper
transfer panel with the impact lines. The blood-taking mission explicitly
asks the learner to check for a retained tourniquet before leaving.

Decision screens now place one concise, mission-specific context block under
`Background information`; the old `Instruction` and prompt copy are no longer
concatenated at render time. Mission 2 uses the interruption panel, Mission 6
uses the first medicine-check panel, and Mission 7 uses the doctor-prescribing
panel.

The comic zoom viewer is temporarily disabled. Each direct PowerPoint PNG is
displayed full-width without an overlay obscuring its Learning Points. After a
decision is correct, the review button stays disabled for 20 seconds before the
learner can continue.

Mission Stars appear only at the bottom after all mission steps are complete;
the result card goes directly from the stars and completion heading to the
compact star rules, with no divider line and the Final Quiz remark left-aligned
as a normal note.

Mission map thumbnails preserve their accepted crops but use 15 lightweight
runtime WebP derivatives and load only when visible or close to the viewport.
Decision scenes use 17 crop-specific runtime WebP derivatives, so the browser
does not decode a full 1672×941 source when only one crop is visible. Incident
comics and the Oxygen poster use deferred WebP runtime copies with the original
PowerPoint PNGs preserved as fallback. All source artwork and direct exports
remain unchanged.

Mission 1, 4, 6, 8, 11, 13, and 14 retain their existing bespoke interactions.
The owner-refined decision controls for Missions 2, 3, 5, 7, 9, 10, 12, and 15
use operational boards instead of explanatory MCQ cards: interruption
checkpoints, identity verification, an incomplete-order builder, chart records,
cup inspection, specimen storage, evidence cards, and property storage. These
boards show the objects and available actions without printing the governing
principle as a hint.
Completed dashboard cards use `Mission Stars`, unfinished cards use `3- 5
mins`, and `any order` stays together. The dashboard theme is `Break the Chain`
with the subtitle `Real Clinical Incident Missions`. The Hospital Authority
programme label is larger and displayed on two lines without a full stop.

Mission 11's second Oxygen real-case stage displays the preserved
`oxygen-case-2-comic-2026-08-05.png` followed by the existing Oxygen Cylinder
Safety 3-2-1 poster. The final Takeaway requires the receiving nurse to check
the valve, tubing, cylinder content, prescribed flow, and actual delivery.
After Mission 15, the primary result action opens course completion; the
completed dashboard keeps an explicit completed-mission review route.

Visible punctuation is normalised across the dashboard and mission flow:
apostrophes, commas, and hyphens are followed by a space. Numeric adrenaline
ratios retain their required thousands separators: `1:10,000` and `1:1,000`.
Teach-back choices are shuffled so the correct answer is not repeatedly in the
second position.

The site is publicly hosted on GitHub Pages and does not depend on ChatGPT
access. No visitor login is required:
https://sincekong.github.io/break-the-chain-clinical-safety-missions/

## Learning flow

1. Select a mission.
2. Complete the decision in the first section.
3. A correct answer unlocks the exact PowerPoint-rendered incident comic in the
   second section on the same page.
4. Review the incident for at least 20 seconds, unlock the third section, and
   complete the teach-back reflection.
5. After all 15 missions, the completion screen hands off to the external quiz.

## Quiz connection

Set `QUIZ_URL` near the top of `app.js` when the external quiz URL is available.
Until then, the quiz button remains a non-navigating placeholder.

## Progress connection

The current standalone build keeps completion data in the browser when storage
is available and continues as a session-only experience when it is not. For
cross-device or centrally managed progress, replace the small `load()` and
`save()` functions in `app.js` with the organisation's LMS or authenticated
course API. The useful fields are completed mission IDs, best Mission Stars,
attempt counts, and the final quiz status.
