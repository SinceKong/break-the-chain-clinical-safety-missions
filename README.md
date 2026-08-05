# Break the Chain - Clinical Safety Missions

Open `index.html` in a modern browser, or serve this folder with any simple
static web server.

## Release v6.7

The current build covers 17 incidents across 15 missions in the exact order of
`/Users/since/Downloads/Package/Incident Sharing (Comic).pptx`. The two Oxygen
cases share one mission, and the two transfer cases share one mission. Four new
missions cover wrong-patient administration after distraction, an ambiguous
adrenaline order, mouthwash administered via an NG tube, and mistaken ingestion
of a specimen-container ingredient.

The 15-mission build has passed desktop and 390×844 mobile browser QA. The external quiz
URL remains intentionally unset until the owner supplies it.

Completed missions reopen as a read-only review: `DECISION`, `INCIDENT COMIC`,
and `DEBRIEF` remain expanded, all three stages show `Complete`, and the saved
Mission Stars remain unchanged. After the incident-review acknowledgement, the
`INCIDENT COMIC` stage changes from `Open` to `Complete`.

Mission Stars are based only on Part 1 of each mission: the first correct
attempt earns three stars, the second earns two, and the third or any later
attempt earns one. The on-screen remarks state that Mission Stars are for fun
only and training completion is confirmed by the Final Quiz.

Each Incident Comic is a 2000×1125 PNG exported directly by Microsoft
PowerPoint, preserving the slide title, caption boxes, and Learning Points.
Decision scenes use the supplied text-free 1672×941 source artwork. Dashboard
thumbnails use the impact-line or error focal panel: Oxygen uses only the panel
where the cylinder main switch was not turned on, and Transfer uses the panel
where the patient has fallen to the floor. The blood-taking mission explicitly
asks the learner to check for a retained tourniquet before leaving.

Decision screens use neutral, pre-incident mission names and place the learner
in the role of the staff member making the safety judgement. The official
incident title is revealed with the comic only after the decision is correct.

The enlarged comic viewer supports mouse-wheel and trackpad zoom, toolbar zoom,
drag-to-pan, and two-finger pinch gestures on touch devices.

Mission pages use a centred `MISSION STARS` box. Completed dashboard cards use
`Mission Stars`, unfinished cards use `3- 5 mins`, and `any order` stays
together. On mobile, `Break the Chain` and `Clinical Safety Missions` each stay
on one complete line. The Hospital Authority fresh-graduate-nurse programme
label appears as one small line above the title.

The site is publicly hosted on GitHub Pages and does not depend on ChatGPT
access. No visitor login is required:
https://sincekong.github.io/break-the-chain-clinical-safety-missions/

## Learning flow

1. Select a mission.
2. Complete the decision in the first section.
3. A correct answer unlocks the exact PowerPoint-rendered incident comic in the
   second section on the same page.
4. Review the incident, unlock the third section, and complete the teach-back
   reflection.
5. After all available missions, the completion screen hands off to the external quiz.

## Quiz connection

Set `QUIZ_URL` near the top of `app.js` when the external quiz URL is available.
Until then, the completion screen explains that the quiz opens in the connected
learning system.

## Progress connection

The current standalone build keeps completion data in the browser when storage
is available and continues as a session-only experience when it is not. For
cross-device or centrally managed progress, replace the small `load()` and
`save()` functions in `app.js` with the organisation's LMS or authenticated
course API. The useful fields are completed mission IDs, best Mission Stars,
attempt counts, and the final quiz status.
