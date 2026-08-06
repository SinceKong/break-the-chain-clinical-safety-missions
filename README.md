# Break the Chain - Real Clinical Incident Missions

Open `index.html` in a modern browser, or serve this folder with any simple
static web server.

## Release v7.9.2

After a learner reviews an incident comic, the newly unlocked Takeaway section
now receives a delayed smooth scroll after the re-render has settled. After a
learner confirms a debrief reflection, the feedback and next action are
similarly brought into view with the same stable scroll timing. This keeps the
flow moving down to the next stage without the re-render making the viewport
appear to jump upward.

The confirmed v7.9.2 web build is preserved separately as
`/Users/since/Downloads/incident_learning_game_v4_FINAL_v7.9.2`. A separate
SCORM 1.2 upload package is available at
`/Users/since/Downloads/break-the-chain-clinical-safety-missions_SCORM_1.2_v7.9.2.zip`;
its upload and LMS tracking notes are in `README_SCORM.md` inside the package.
A SCORM 2004 fallback upload package is also available at
`/Users/since/Downloads/break-the-chain-clinical-safety-missions_SCORM_2004_v7.9.2.zip`;
its manifest targets SCORM 2004 4th Edition and its upload/tracking notes are
in `README_SCORM.md` inside the matching SCORM 2004 staging folder.

The v7.8.1 conditional hyphen-capitalisation refinement remains unchanged
below.

This typography refinement keeps visible hyphens tight before the mark and
separated by one space after it. The first letter after a hyphen follows the
case of the preceding word: it is capitalised when that word starts with a
capital letter, and lower-case otherwise. The rule is applied consistently to
dashboard, mission, decision, incident-comment, debrief, completion, and quiz
copy.

The v7.7.0 decision-point emoji refinement remains unchanged below.

This owner refinement preserves the v7.6.0 public state while replacing the
remaining custom decision-point glyphs in Missions 7, 9, 10, 12, and 15 with
clear emoji markers. The text labels and accessible button names remain the
source of meaning; the emoji provide a faster visual cue on desktop and mobile.
The public v7.6.0 state is preserved by the
`v7.6.0-before-decision-emoji-polish` tag in the clean repository.

Mission 7 uses 🧾, ⚠️, and 🧪 for the medication order, allergy history and
status, and laboratory result checks. Mission 9 uses 🏷️, 🥤, and 🧾 for label
presence, contents, and medication order. Mission 10 uses 🛏️, 👪, 🔒, 🏷️,
and 💬 for specimen location and controls. Mission 12 uses 🧾, 🩻, and 📝 for
feeding order, chest X-ray availability, and NG-tube position confirmation.
Mission 15 uses 🦷, 🧻, 🍽️, and 📦 for denture assessment and storage choices;
the documentation check uses 📝 after storage is selected.

This owner refinement preserves the v7.5.0 visual decision boards while
updating the Mission 2 checkpoint icon treatment. The public v7.5.0 state is
preserved by the `v7.5.0-before-checkpoint-emoji-polish` tag in the clean
repository; earlier releases remain preserved by their existing tags.

The current build covers 17 incidents across 15 missions in the exact order of
`/Users/since/Downloads/Package/Incident Sharing (Comic).pptx`. The two Oxygen
cases share one mission, and the two transfer cases share one mission. Four new
missions cover wrong-patient administration after distraction, an ambiguous
adrenaline order, mouthwash administered via an NG tube, and mistaken ingestion
of a specimen-container ingredient.

The 15-mission build and internal Final Quiz have passed desktop and 390×844
mobile browser QA. The external Hospital Authority e-learning URL remains
intentionally unset until the owner supplies it.

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
concatenated at render time. Mission 2 first asks whether to resume or start
over; only the start-over path reveals all five rights—right patient, right
drug, right time, right dosage, and right route—and resuming immediately
returns an incorrect-decision prompt. Mission 3 uses an action-only
Patient／Medication order verification choice. Mission 5 shows the route,
concentration, and dose currently specified in the prescription before the
learner chooses Proceed or Clarify. Mission 7 checks the medication order,
allergy history and status, and laboratory result. Mission 9 inspects label
presence, contents, and medication order before Proceed or Seek clarification.
Mission 12 checks the feeding order, chest X-ray availability, and
`Doctor's notes on NG tube position confirmation` before Proceed feeding or
Seek clarification. Mission 14 asks which attempted sites to select without
revealing both sites. Mission 15 keeps the assessment control visible after
selection, then unlocks storage location, then unlocks documentation regarding
the patient's denture.

Mission 2 checkpoint controls use explicit emoji—ID card, capsule, clock,
syringe, and road—to keep the five-rights choices visible and legible on both
desktop and mobile layouts. The text labels remain the accessible source of
meaning.

The Final Quiz now opens with only its `Final Quiz` title and passing
requirement. It samples five of the nine Question Bank items, shuffles each
answer list, allows unlimited attempts, highlights selected wrong answers,
and ends in the same page with a concise 5／5 completion result. No separate
congratulations page or pending handoff message is shown; the existing blank
`QUIZ_URL` hook remains available for the owner-supplied Hospital Authority
destination.

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
use operational boards instead of explanatory MCQ cards: five-rights recovery,
identity verification, an incomplete-prescription builder, three pre-treatment
checks, cup inspection, specimen storage, feed evidence checks, and property
storage. These boards show the objects and available actions without printing
the governing principle as a hint.
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
hyphens have no preceding space and one following space; the first letter
after a hyphen is capitalised only when the preceding word starts with a
capital letter; colons and apostrophes have one following space, with the
colon rule continuing to capitalise its next word. Numeric adrenaline ratios
retain their required thousands separators without a following space:
`1:10,000` and `1:1,000`.
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
5. After all 15 missions, the completion screen opens the internal Final Quiz.
6. The Final Quiz randomly selects five of the nine Question Bank questions,
   shuffles each answer list on every attempt, and passes only when all five
   answers are correct. Unlimited attempts are allowed.

## Quiz connection

Set `QUIZ_URL` near the top of `app.js` when the Hospital Authority e-learning
URL is available. Until then, the internal five-of-nine Final Quiz remains
fully usable and the passed state shows a clear handoff-pending note.

## Progress connection

The current standalone build keeps completion data in the browser when storage
is available and continues as a session-only experience when it is not. For
cross-device or centrally managed progress, replace the small `load()` and
`save()` functions in `app.js` with the organisation's LMS or authenticated
course API. The useful fields are completed mission IDs, best Mission Stars,
attempt counts, and the final quiz status.
