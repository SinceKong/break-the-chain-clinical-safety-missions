(() => {
  "use strict";

  const STORE = "incidentLearningGame.v2";
  const QUIZ_URL = "";
  const MAX_STARS = 3;
  const COMIC_REVIEW_SECONDS = 20;
  const INCIDENT_COUNT = 17;
  const OXYGEN_SAFETY_POSTER = "assets/oxygen-cylinder-safety-3-2-1.png";

  function runtimeAssetBase(src) {
    return src.split("/").pop().replace(/\.[^.]+$/, "");
  }

  function runtimeCropAsset(src, viewBox, variant) {
    if (!src || !viewBox) return null;
    const box = viewBox.trim().split(/\s+/).map(Number);
    if (box.length !== 4 || box.some((value) => !Number.isFinite(value))) return null;
    return `assets/runtime/${variant}/${runtimeAssetBase(src)}-${box.join("-")}.webp`;
  }

  function runtimeFullAsset(src, variant) {
    return src ? `assets/runtime/${variant}/${runtimeAssetBase(src)}.webp` : null;
  }

  function viewBoxSize(viewBox) {
    const box = viewBox?.trim().split(/\s+/).map(Number) || [];
    return box.length === 4 && box.slice(2).every((value) => Number.isFinite(value))
      ? { width: box[2], height: box[3] }
      : null;
  }

  function briefingMedia(briefing) {
    const optimizedSrc = runtimeCropAsset(briefing.src, briefing.viewBox, "briefing");
    const size = viewBoxSize(briefing.viewBox);
    if (optimizedSrc && size) {
      return `<img class="briefing-crop-image" data-lazy-src="${optimizedSrc}" width="${size.width}" height="${size.height}" loading="lazy" decoding="async" role="img" aria-label="${esc(briefing.alt)}">`;
    }
    return `<svg class="briefing-crop" data-lazy-src="${esc(briefing.src)}" viewBox="${briefing.viewBox}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(briefing.alt)}">
              <image width="${briefing.width}" height="${briefing.height}"></image>
            </svg>`;
  }

  function comicMedia(comic, title) {
    const optimizedSrc = runtimeFullAsset(comic.src, "comics");
    const size = comic.className === "oxygen-safety-poster" ? { width: 1796, height: 2400 } : { width: 1600, height: 900 };
    if (!optimizedSrc) return `<img src="${comic.src}" width="${size.width}" height="${size.height}" loading="lazy" decoding="async" alt="${esc(`${title} - ${comic.label || "Incident comic"}`)}">`;
    return `<picture class="comic-picture">
              <source data-lazy-src="${optimizedSrc}" type="image/webp">
              <img data-lazy-src="${esc(comic.src)}" width="${size.width}" height="${size.height}" loading="lazy" decoding="async" alt="${esc(`${title} - ${comic.label || "Incident comic"}`)}">
            </picture>`;
  }

  const ICONS = {
    rewind:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8v5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.4 12.6A7.5 7.5 0 1 0 7.2 7.7L4 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v4l2.8 1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    shield:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Z" stroke="currentColor" stroke-width="1.8"/><path d="m9 12 2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m5-5-5 5 5 5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    info:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v6M12 7.5v.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    reset:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.2 5.5M20 5v6h-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="m8 12 2.5 2.5L16 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    alert:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 2.8 20h18.4L12 3Z" stroke="currentColor" stroke-width="1.8"/><path d="M12 9v5M12 17.5v.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    zoom:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4 4M8 10.5h5M10.5 8v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    lock:
      '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10M12 14v2.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  };

  const CASES = [
    {
      id: "clonazepam",
      n: 1,
      type: "dose",
      category: "Medication safety",
      title: "Wrong dosage of medication administered to patient",
      playTitle: "Prepare the Night Dose",
      summary:
        "Calculate the correct number of Clonazepam tablets before administration.",
      background:
        "The prescription is Clonazepam 1.5 mg orally at night. The stock strength is 0.5 mg per tablet.",
      skills: ["Dose calculation", "Five Rights"],
      thumb: "assets/clonazepam-thumb.webp",
      briefing: "assets/clonazepam-visual-2026-08-05.png",
      briefingView: { src: "assets/clonazepam-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 96 543 415" },
      comic: "assets/clonazepam-comic-2026-08-05.png",
      thumbView: { src: "assets/clonazepam-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 507 785 434" },
      briefingAlt: "A nurse reviews the Clonazepam prescription.",
      question: "How many tablets should be prepared?",
      wrong:
        "Recheck the units. Divide the prescribed dose by the strength in each tablet: 1.5 mg ÷ 0.5 mg per tablet.",
      teach: {
        question: "Which action is a genuine independent verification?",
        options: [
          {
            text: "The second nurse sees the first nurse's answer and agrees.",
            ok: false,
            why: "Agreement is not an independent check when the second answer is already visible.",
          },
          {
            text: "Both nurses calculate 1.5 ÷ 0.5 separately before comparing results.",
            ok: true,
            why: "Each checker reaches an answer independently before the results are compared.",
          },
          {
            text: "Because both nurses know the medication, they verify patient identity only.",
            ok: false,
            why: "Familiarity does not replace an independent dose calculation and the Five Rights.",
          },
        ],
      },
    },
    {
      id: "dormicum",
      n: 4,
      type: "syringe",
      category: "Injectable medication safety",
      title: "Wrong dosage of injection administered to patient",
      playTitle: "Prepare the Injection",
      summary:
        "Help the doctor prepare the exact prescribed volume and label the Dormicum syringe before administration.",
      background:
        "You are helping a doctor prepare a Dormicum injection. The doctor will administer it. The prescription is IV Dormicum 3 mg before the procedure. The prepared concentration is 15 mg in 15 mL.",
      skills: ["Exact dose", "Syringe labelling"],
      thumb: "assets/dormicum-thumb.webp",
      briefing: "assets/dormicum-visual-2026-08-05.png",
      briefingView: { src: "assets/dormicum-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 96 556 415" },
      comic: "assets/dormicum-comic-2026-08-05.png",
      thumbView: { src: "assets/dormicum-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 510 784 431" },
      briefingAlt: "The intravenous Dormicum prescription is reviewed.",
      question: "What syringe should be prepared for the doctor to administer?",
      wrong:
        "All three safeguards are required: 3 mL, a clear medication label, and a drug-and-dose recheck immediately before administration.",
      teach: {
        question: "Which handoff is safest?",
        options: [
          {
            text: "Hand over an unlabelled 15 mL syringe and verbally say it contains 3 mg.",
            ok: false,
            why: "A verbal explanation cannot make an unlabelled syringe safe.",
          },
          {
            text: "Hand over a clearly labelled 3 mL syringe and have the doctor recheck the drug and dose.",
            ok: true,
            why: "This preserves the exact dose, syringe identification, and point-of-administration check.",
          },
          {
            text: "Hand over an unlabelled 3 mL syringe because the smaller volume should be obvious.",
            ok: false,
            why: "Every medication-containing syringe still requires clear labelling.",
          },
        ],
      },
    },
    {
      id: "patient-id",
      n: 3,
      type: "identity",
      category: "Patient identity safety",
      title: "Patient misidentification during drug administration",
      playTitle: "Respond to the Patient Match Alert",
      summary:
        "Respond safely when the handheld scanner shows a patient mismatch alert.",
      background:
        "You are about to start a Levofloxacin infusion. The handheld scanner shows Patient Not Match before administration.",
      skills: ["Identity verification", "Alert response"],
      thumb: "assets/patient-id-thumb.webp",
      briefing: "assets/patient-id-visual-2026-08-05.png",
      briefingView: { src: "assets/patient-id-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "559 96 526 413" },
      comic: "assets/patient-id-comic-2026-08-05.png",
      thumbView: { src: "assets/patient-id-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 505 782 436" },
      briefingAlt: "The handheld scanner shows a Patient Not Match alert.",
      question: "What should happen after the alert?",
      wrong:
        "A Patient Not Match alert requires an immediate stop and formal identity verification. Bed location or colleague familiarity cannot replace it.",
      teach: {
        question: "Which statement best reflects the safety principle?",
        options: [
          {
            text: "A scanner warning may be ignored when the patient is in the expected bed.",
            ok: false,
            why: "Bed location is not a patient identifier and cannot override a mismatch alert.",
          },
          {
            text: "Stop, resolve the mismatch, and complete identity verification before administration.",
            ok: true,
            why: "The alert remains a hard stop until the patient and order are correctly verified.",
          },
          {
            text: "After verbal reassurance from a colleague, start the infusion and investigate later.",
            ok: false,
            why: "Verbal reassurance does not resolve the mismatch or restore the safety barrier.",
          },
        ],
      },
    },
    {
      id: "barcode",
      n: 6,
      type: "barcode",
      category: "Gatekeeping",
      title: "Wrong medication administration",
      playTitle: "Pass the Medication Safety Gate",
      summary:
        "Preserve barcode gatekeeping and verify the prescribed medication formulation.",
      background:
        "The prescription is for Morphine Sulphate prolonged-release tablets. The barcode administration screen is ready for verification.",
      skills: ["Barcode scanning", "Formulation check"],
      thumb: "assets/barcode-thumb.webp",
      briefing: "assets/barcode-visual-2026-08-05.png",
      briefingView: { src: "assets/barcode-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 96 557 415" },
      comic: "assets/barcode-comic-2026-08-05.png",
      thumbView: { src: "assets/barcode-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 510 786 431" },
      briefingAlt: "The medication system presents the barcode administration workflow.",
      question: "How will you pass the safety gate?",
      wrong:
        "Use the 2D barcode scan and match the physical formulation to the prescribed prolonged-release tablets. Long-hold is not a shortcut.",
      teach: {
        question: "What should happen when scanning is inconvenient or the ward is busy?",
        options: [
          {
            text: "Use long-hold to complete administration and document later.",
            ok: false,
            why: "Long-hold removes the gatekeeping step at the moment it is needed.",
          },
          {
            text: "Preserve gatekeeping, resolve the scan problem, and verify the formulation before administration.",
            ok: true,
            why: "This restores barcode verification and confirms the prescribed formulation.",
          },
          {
            text: "Syrup and prolonged-release tablets are interchangeable when the active ingredient is the same.",
            ok: false,
            why: "Different formulations are not interchangeable simply because they share an active ingredient.",
          },
        ],
      },
    },
    {
      id: "misfiled-potassium",
      n: 7,
      type: "clinical-context",
      category: "Clinical context safety",
      title: "Wrong medication administration due to misfiled result",
      playTitle: "Check the Patient Before Treatment",
      summary:
        "Check the patient's current parameters and clinical context before giving treatment.",
      background:
        "Treatment to lower potassium has been prescribed.",
      skills: ["Patient context", "Parameter verification"],
      thumb: "assets/misfiled-potassium-thumb.webp",
      briefing: "assets/misfiled-potassium-visual-2026-08-05.png",
      briefingView: { src: "assets/misfiled-potassium-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "559 96 522 415" },
      comic: "assets/misfiled-potassium-comic-2026-08-05.png",
      thumbView: { src: "assets/misfiled-potassium-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 510 782 431" },
      briefingAlt: "Two de-identified patient records show different potassium results.",
      question: "Which checks must be completed before you administer the medication?",
      wrong:
        "Before treatment, check the medication order, the allergy history and status, and the current laboratory result.",
      teach: {
        question: "What is the final safety barrier before giving treatment for a critical result?",
        options: [
          {
            text: "Give the treatment because it appears in the patient record.",
            ok: false,
            why: "An open record does not prove that the result and treatment match the patient's current condition.",
          },
          {
            text: "Confirm identity, review the latest parameters and trend, and verify that the treatment fits the patient's clinical context.",
            ok: true,
            why: "These checks confirm that the medication is intended and clinically appropriate for this patient now.",
          },
          {
            text: "Treat first because critical results are urgent, then reconcile the patient data afterwards.",
            ok: false,
            why: "Urgency does not replace patient identification and verification of current clinical parameters.",
          },
        ],
      },
    },
    {
      id: "iv-stopcock",
      n: 8,
      type: "infusion-route",
      category: "Infusion safety",
      title: "Intravenous Infusion Error",
      playTitle: "Trace the Infusion Route",
      summary:
        "Prevent interruption by checking the entire IV Dopamine route before starting the infusion.",
      background:
        "IV Dopamine is prepared for a newborn, but the infusion has not started. The route runs from the patient through the line and stopcock to the pump.",
      skills: ["Full-route trace", "Pre-infusion patency"],
      thumb: "assets/iv-stopcock-thumb.webp",
      briefing: "assets/iv-stopcock-visual-2026-08-05.png",
      briefingView: { src: "assets/iv-stopcock-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 97 571 406" },
      comic: "assets/iv-stopcock-comic-2026-08-05.png",
      thumbView: { src: "assets/iv-stopcock-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 507 786 434" },
      briefingAlt: "An IV Dopamine infusion route runs from the patient to the infusion pump.",
      question: "Which parts of the infusion route must you check?",
      wrong:
        "Do not rely on a later alarm. Before starting, trace all four checkpoints: IV access, three-way stopcock, primary infusion tubing, and infusion pump.",
      teach: {
        question: "Which action best prevents an unnoticed interruption of IV Dopamine?",
        options: [
          {
            text: "Start the pump and rely on the occlusion alarm to identify any blockage.",
            ok: false,
            why: "An alarm is a late warning and may not identify an interruption promptly.",
          },
          {
            text: "Trace the full route, confirm patency and connections, and verify every three-way stopcock before starting.",
            ok: true,
            why: "The pre-infusion trace prevents a closed stopcock or other blockage from interrupting delivery.",
          },
          {
            text: "Check only the pump because it controls the medication delivery.",
            ok: false,
            why: "The route can be blocked at the access, tubing, connections, or stopcock even when the pump is working.",
          },
        ],
      },
    },
    {
      id: "oxygen-safety",
      n: 11,
      type: "oxygen-combined",
      category: "Oxygen safety",
      title: "Oxygen related incidents",
      playTitle: "Complete the Oxygen Safety Check",
      summary:
        "Complete two real-case rounds: first connect oxygen to the patient, then complete the cylinder 3-2-1 safety sequence.",
      background:
        "You are taking over oxygen care. A patient connection and a portable-cylinder setup both need to be checked before you leave the bedside.",
      skills: ["Cylinder 3-2-1", "Final delivery check"],
      thumb: "assets/oxygen-case-2-visual-2026-08-05.png",
      thumbView: { src: "assets/oxygen-case-2-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 505 786 436" },
      briefings: [
        {
          label: "Round 1 - Patient connection",
          src: "assets/oxygen-case-1-visual-2026-08-05.png",
          width: 1672,
          height: 941,
          viewBox: "0 96 848 410",
          alt: "A patient arrives with a nasal cannula after transfer from the emergency department.",
        },
        {
          label: "Round 2 - Cylinder check",
          src: "assets/oxygen-case-2-visual-2026-08-05.png",
          width: 1672,
          height: 941,
          viewBox: "0 95 568 410",
          alt: "A staff member prepares oxygen tubing and a cylinder beside the patient.",
        },
      ],
      comics: [
        { label: "Case 1", src: "assets/oxygen-case-1-comic-2026-08-05.png" },
        { label: "Case 2", src: "assets/oxygen-case-2-comic-2026-08-05.png" },
      ],
      rounds: [
        {
          label: "Round 1 - Patient connection",
          playTitle: "Connect Oxygen to the Patient",
          background:
            "A patient arrives from A&E with oxygen prescribed at 3 L/min. A nasal cannula is in place, but the source connection and actual flow have not been checked.",
          question: "What must you confirm before leaving the bedside?",
          briefingIndex: 0,
          comicIndex: 0,
          teach: {
            question: "Which handover confirms that oxygen is actually reaching the patient?",
            options: [
              {
                text: "The cannula is in place, so no further check is needed.",
                ok: false,
                why: "A cannula on the patient does not confirm a connected source or actual oxygen flow.",
              },
              {
                text: "Connect the cannula to the correct source, set 3 L/min, and verify delivery at the patient.",
                ok: true,
                why: "This confirms the complete path from source to patient and the prescribed flow.",
              },
              {
                text: "Rely on the previous team to have completed the oxygen connection.",
                ok: false,
                why: "Handover does not replace a direct bedside delivery check.",
              },
            ],
          },
        },
        {
          label: "Round 2 - Cylinder check",
          playTitle: "Complete the Cylinder 3-2-1 Check",
          background:
            "A portable oxygen cylinder and tubing are beside the patient. The valve, cylinder content, prescribed flow, and delivery path have not yet been checked.",
          question: "How should you make the cylinder ready for safe use?",
          briefingIndex: 1,
          comicIndex: 1,
          teach: {
            question: "A colleague says the oxygen is already connected. What final bedside check must you complete before accepting the patient?",
            options: [
              {
                text: "Accept the colleague's confirmation and leave the current connection and flow unchanged.",
                ok: false,
                why: "A colleague's confirmation does not replace the receiving nurse's direct final bedside check.",
              },
              {
                text: "Check the gauge and flow setting only; the connected tubing can be assumed to deliver oxygen.",
                ok: false,
                why: "The complete check must include the main valve, tubing connection, content level, prescribed flow, and actual delivery.",
              },
              {
                text: "Personally check that the main valve is open, the tubing is connected, the cylinder has adequate content, the prescribed flow is set, and oxygen is actually reaching the patient.",
                ok: true,
                why: "This final direct check confirms the complete path, cylinder readiness, prescribed flow, and actual oxygen delivery.",
              },
            ],
          },
        },
      ],
      question: "Can you make both oxygen setups ready for the patient?",
      wrong:
        "Complete both rounds. Connect the cannula to oxygen and verify 3 L/min. Then open the cylinder valve, check the content level, set the flow, and confirm delivery.",
      teach: {
        question: "Which handover confirms that oxygen is actually reaching the patient?",
        options: [
          {
            text: "The cannula is in place and the tubing is connected, so the setup is ready.",
            ok: false,
            why: "Connection alone does not confirm an open valve, adequate cylinder content, the prescribed flow, or delivery.",
          },
          {
            text: "Connect the source, complete 3-2-1, set the prescribed flow, and perform a final delivery check at the patient.",
            ok: true,
            why: "This verifies the source, cylinder readiness, prescribed flow, and actual oxygen delivery.",
          },
          {
            text: "Ask the previous team whether the oxygen was working and leave the final check to the next shift.",
            ok: false,
            why: "Handover information does not replace a direct final check at the current bedside.",
          },
        ],
      },
    },
    {
      id: "transfer-safety",
      n: 13,
      type: "transfer-combined",
      category: "Transfer safety",
      title: "Inpatient fall during patient transfer",
      playTitle: "Prepare for a Safe Patient Transfer",
      summary:
        "Secure and align two long transfer surfaces, then complete the sling and hoist safety gate.",
      background:
        "Two transfers are planned: a lateral move between an electric bed and OT stretcher, followed by a bed-to-chair hoist transfer. The equipment must be prepared before either movement.",
      skills: ["Surface alignment", "Pre-lift safety gate"],
      thumb: "assets/transfer-fall-visual-2026-08-05.png",
      thumbView: { src: "assets/transfer-fall-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "512 107 514 420" },
      briefings: [
        {
          label: "Round 1 - Lateral transfer",
          src: "assets/transfer-fall-visual-2026-08-05.png",
          width: 1672,
          height: 941,
          viewBox: "0 107 516 420",
          alt: "An electric bed and an operating-theatre stretcher are positioned for patient transfer.",
        },
        {
          label: "Round 2 - Hoist transfer",
          src: "assets/transfer-fall-visual-2026-08-05.png",
          width: 1672,
          height: 941,
          viewBox: "0 515 519 426",
          alt: "A patient sits in a sling attached to a mechanical hoist before chair transfer.",
        },
      ],
      comic: "assets/transfer-fall-comic-2026-08-05.png",
      question: "Can you clear both transfer safety gates before movement begins?",
      wrong:
        "Complete both rounds. Secure and align the two transfer surfaces with no unsafe gap. Then select only the safe sling and hoist checks; choosing every option does not pass the safety gate.",
      teach: {
        question: "What must be confirmed before either transfer begins?",
        options: [
          {
            text: "Staff can compensate for an unlocked surface or incomplete sling attachment by holding the equipment.",
            ok: false,
            why: "Staff grip does not replace secured equipment, safe alignment, or complete sling attachment.",
          },
          {
            text: "The surfaces are secured and aligned with no unsafe gap, and every sling and hoist connection is checked before movement.",
            ok: true,
            why: "Both transfer methods require their full safety gate to be completed before the patient moves.",
          },
          {
            text: "Begin slowly and correct the setup only if the equipment starts to shift.",
            ok: false,
            why: "The transfer must not begin until the equipment and patient-support checks are complete.",
          },
        ],
      },
    },
    {
      id: "ng-tube",
      n: 12,
      type: "evidence-gate",
      category: "Enteral feeding safety",
      title: "Malposition of Nasogastric (NG) Tube feeding",
      playTitle: "Never Assume the NG Tube Is Correctly Positioned",
      summary:
        "Decide whether a written feeding order can proceed when the CXR review is not documented.",
      background:
        "A doctor has written an order to start an NG tube feeding.",
      skills: ["CXR review", "Independent verification"],
      thumb: "assets/ng-tube-thumb.webp",
      briefing: "assets/ng-tube-visual-2026-08-05.png",
      briefingView: { src: "assets/ng-tube-visual-2026-08-05.png", width: 1671, height: 941, viewBox: "0 103 562 411" },
      comic: "assets/ng-tube-comic-2026-08-05.png",
      thumbView: { src: "assets/ng-tube-visual-2026-08-05.png", width: 1671, height: 941, viewBox: "0 509 794 432" },
      briefingAlt: "A nasogastric tube is inserted during an operation and a chest X-ray is available for review.",
      question: "What do you check before starting the feeding?",
      wrong:
        "A written feeding order alone does not document tube placement. Hold feeding until the doctor reviews the chest X-ray and records that the NG-tube position is confirmed.",
      teach: {
        question: "Which action closes the placement safety gate before feeding?",
        options: [
          {
            text: "Start feeding because the order was written by a doctor.",
            ok: false,
            why: "A signed feeding order does not replace documented review of the chest X-ray and tube position.",
          },
          {
            text: "Hold feeding, ask the doctor to review the chest X-ray, and document that the NG-tube position is confirmed.",
            ok: true,
            why: "This provides the documented placement confirmation required before feeding begins.",
          },
          {
            text: "Confirm that a chest X-ray exists, then start feeding without a documented review.",
            ok: false,
            why: "The existence of an image is not enough; its placement findings must be reviewed and documented.",
          },
        ],
      },
    },
    {
      id: "retained-tourniquet",
      n: 14,
      type: "tourniquet-loop",
      category: "Post-procedure safety",
      title: "Retained tourniquet after blood taking",
      playTitle: "Check and Close the Blood-taking Procedure",
      summary:
        "Check both attempted sites for a retained tourniquet, remove it, and account for it before leaving.",
      background:
        "Blood taking was attempted on both upper limbs and the sample was obtained from the left arm. The final patient and equipment check has not been completed.",
      skills: ["Immediate removal", "Equipment close-out"],
      thumb: "assets/retained-tourniquet-thumb.webp",
      briefing: "assets/retained-tourniquet-visual-2026-08-05.png",
      briefingView: { src: "assets/retained-tourniquet-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 101 1030 410" },
      comic: "assets/retained-tourniquet-comic-2026-08-05.png",
      thumbView: { src: "assets/retained-tourniquet-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 511 812 430" },
      briefingAlt: "Staff attempt blood taking while a tourniquet remains around a patient's upper limb.",
      question: "Where must you check for a tourniquet, and how must you close out the procedure?",
      wrong:
        "Inspect both upper limbs because blood taking was attempted on both sides. Then remove the tourniquet immediately and return it to storage before leaving the patient.",
      teach: {
        question: "What confirms that blood taking is safely closed out?",
        options: [
          {
            text: "The sample has been labelled, so the equipment can be collected later.",
            ok: false,
            why: "Sample completion does not confirm that the tourniquet has been removed from the patient.",
          },
          {
            text: "The tourniquet is removed immediately and returned to its storage location before staff leave.",
            ok: true,
            why: "This closes the equipment loop and prevents a retained tourniquet.",
          },
          {
            text: "Ask the patient or carer to remove the tourniquet if it becomes uncomfortable.",
            ok: false,
            why: "Staff must remove and account for the tourniquet as part of the procedure.",
          },
        ],
      },
    },
    {
      id: "missing-denture",
      n: 15,
      type: "denture-admission",
      category: "Personal item safety",
      title: "Missing Denture",
      playTitle: "Protect a Patient's Denture",
      summary:
        "Assess the denture, choose its storage location, and complete documentation regarding the patient's denture.",
      background:
        "A patient with a denture is being admitted. The denture needs an accountable storage and recording process before routine care continues.",
      skills: ["Personal item documentation", "Designated storage"],
      thumb: "assets/missing-denture-thumb.webp",
      briefing: "assets/missing-denture-visual-2026-08-05.png",
      briefingView: { src: "assets/missing-denture-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 97 840 414" },
      comic: "assets/missing-denture-comic-2026-08-05.png",
      thumbView: { src: "assets/missing-denture-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "837 95 835 414" },
      briefingAlt: "A patient with a denture is being admitted and needs designated storage and documentation.",
      question: "What are the follow-up actions for the patient's denture?",
      wrong:
        "Assess the denture first, then use the designated denture box and complete documentation regarding the patient's denture. Tissue paper and meal trays are not safe storage.",
      sourceWarning:
        "The exact source comic depicts Missing Denture but carries an incorrect visible NG-tube title.",
      teach: {
        question: "Which admission-time practice best prevents a patient's denture from going missing?",
        options: [
          {
            text: "Wrap the denture in tissue and leave it on the meal tray for easy access.",
            ok: false,
            why: "Tissue and meal trays are easily discarded and do not provide accountable storage.",
          },
          {
            text: "Place the denture in a labelled designated denture box and complete documentation regarding the patient's denture.",
            ok: true,
            why: "Documentation and designated storage create an accountable handling pathway before loss occurs.",
          },
          {
            text: "Ask the patient to keep the denture somewhere safe without recording its location.",
            ok: false,
            why: "Unrecorded storage leaves the denture untraceable during care, transfer, or cleaning.",
          },
        ],
      },
    },
    {
      id: "wrong-patient-distraction",
      n: 2,
      type: "single-choice",
      category: "Patient identity safety",
      title: "Medication Error (Wrong Patient due to Distraction)",
      playTitle: "Restart the Check After an Interruption",
      summary:
        "Restart the medication and identity checks after a distraction before administration.",
      background:
        "You checked the medication against the patient's wristband, then a patient-care assistant interrupted you. You are returning to the bedside before administration.",
      skills: ["Interruption recovery", "Patient identity"],
      briefing: "assets/wrong-patient-distraction-visual-2026-08-05.png",
      briefingView: { src: "assets/wrong-patient-distraction-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "1084 96 588 393" },
      comic: "assets/wrong-patient-distraction-comic-2026-08-05.png",
      thumbView: { src: "assets/wrong-patient-distraction-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 506 778 435" },
      briefingAlt: "A patient care assistant interrupts a nurse during medication administration.",
      question: "Would you resume medication administration or start over the medication administration check?",
      correctDecision: "restart",
      decisionOptions: [
        {
          value: "resume",
          title: "Resume from the point where you stopped",
          detail: "Rely on the checks completed before the interruption.",
        },
        {
          value: "restart",
          title: "Restart the complete check from the beginning",
          detail: "Repeat patient identity and all medication checks before administration.",
        },
        {
          value: "confirm-bed",
          title: "Continue from the last completed check",
          detail: "Use the completed wristband check and finish the remaining medication steps.",
        },
      ],
      wrong:
        "After any distraction or interruption, restart the complete medication and patient-identity check from the beginning.",
      teach: {
        question: "Which action safely recovers the medication process after an interruption?",
        options: [
          {
            text: "Continue from memory because the earlier checks were already completed.",
            ok: false,
            why: "The interruption breaks the checking sequence and makes the earlier checks unreliable for the current bedside.",
          },
          {
            text: "Restart patient identity and the medication checks from the beginning before administration.",
            ok: true,
            why: "Restarting restores the safety barriers before the medication reaches the patient.",
          },
          {
            text: "Ask a colleague whether this is the expected patient and administer if they agree.",
            ok: false,
            why: "Colleague familiarity does not replace formal patient identification and medication checks.",
          },
        ],
      },
    },
    {
      id: "adrenaline-route",
      n: 5,
      type: "single-choice",
      category: "Injectable medication safety",
      title: "Medication Error (Wrong Dose and Wrong Route)",
      playTitle: "Clarify the Adrenaline Order",
      summary:
        "Clarify the indication, route, concentration, and dose before preparing adrenaline.",
      background:
        "During an allergic reaction, a doctor gives a verbal adrenaline order.",
      skills: ["Order clarification", "Route and concentration"],
      briefing: "assets/adrenaline-route-visual-2026-08-05.png",
      briefingView: { src: "assets/adrenaline-route-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "898 110 774 405" },
      comic: "assets/adrenaline-route-comic-2026-08-05.png",
      thumbView: { src: "assets/adrenaline-route-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 514 786 427" },
      briefingAlt: "A doctor gives an urgent verbal order for adrenaline injection.",
      question: "What information is currently specified in this prescription?",
      correctDecision: "clarify",
      decisionOptions: [
        {
          value: "iv",
          title: "Prepare IV adrenaline 1:10,000",
          detail: "Assume the IV route because intravenous access is available.",
        },
        {
          value: "clarify",
          title: "Stop and clarify the complete order",
          detail: "Confirm the indication, route, concentration, dose, and urgency before proceeding.",
        },
        {
          value: "im",
          title: "Prepare IM adrenaline 1:1,000 without clarification",
          detail: "Assume anaphylaxis treatment from the clinical context alone.",
        },
      ],
      wrong:
        "Never assume an adrenaline route or concentration. Stop and clarify the indication, route, concentration, and dose before preparation or administration.",
      teach: {
        question: "What is the safest response to an incomplete verbal adrenaline order?",
        options: [
          {
            text: "Choose the route that seems most urgent and document the assumption later.",
            ok: false,
            why: "Assumption can cause a dangerous route or concentration error.",
          },
          {
            text: "Clarify and read back the indication, route, concentration, and dose before proceeding.",
            ok: true,
            why: "A complete read-back removes ambiguity before a high-risk medicine is prepared.",
          },
          {
            text: "Use whichever adrenaline ampoule is immediately available.",
            ok: false,
            why: "Availability does not establish the correct route, concentration, or dose.",
          },
        ],
      },
    },
    {
      id: "mouthwash-ng",
      n: 9,
      type: "single-choice",
      category: "Enteral medication safety",
      title: "Mouthwash Administered via Nasogastric (NG) Tube",
      playTitle: "Clarify Before NG Administration",
      summary:
        "Never assume what an unlabelled cup contains - pause and clarify before NG administration.",
      background:
        "During NG medication administration, an unlabelled cup is on the tray.",
      skills: ["Situational awareness", "Clarification"],
      briefing: "assets/mouthwash-ng-visual-2026-08-05.png",
      briefingView: { src: "assets/mouthwash-ng-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "576 96 518 413" },
      comic: "assets/mouthwash-ng-comic-2026-08-05.png",
      thumbView: { src: "assets/mouthwash-ng-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 504 784 437" },
      briefingAlt: "A cup of mouthwash is beside a syringe and other medicines.",
      question: "What should you inspect before deciding whether to proceed with medication administration?",
      correctDecision: "clarify-cup",
      decisionOptions: [
        {
          value: "appearance",
          title: "Continue after checking its appearance",
          detail: "Use the colour and position on the tray to decide what the cup contains.",
        },
        {
          value: "clarify-cup",
          title: "Pause and clarify before proceeding",
          detail: "Confirm the contents, purpose, and intended route before anything is administered.",
        },
        {
          value: "set-aside",
          title: "Set the cup aside and continue the round",
          detail: "Give the other prepared medicines first and leave the unlabelled cup for later.",
        },
      ],
      wrong:
        "Do not administer from an unlabelled cup. Confirm that a label is present, inspect the contents, and check them against the medication order before proceeding.",
      teach: {
        question: "What is the safest response before administering from an unlabelled cup?",
        options: [
          {
            text: "Use the liquid's appearance and tray position to identify it.",
            ok: false,
            why: "Appearance and placement do not confirm a product's identity or intended route.",
          },
          {
            text: "Stop and clarify the cup's contents, purpose, and route before administering anything.",
            ok: true,
            why: "Clarification prevents an unknown product from entering the medication process by assumption.",
          },
          {
            text: "Leave the cup for the next nurse and complete the rest of the medicines.",
            ok: false,
            why: "Passing on an unresolved unlabelled item leaves the same wrong-route risk in place.",
          },
        ],
      },
    },
    {
      id: "specimen-bottle",
      n: 10,
      type: "single-choice",
      category: "Specimen safety",
      title: "Mistaken Ingestion of Specimen Bottle Ingredient",
      playTitle: "Keep Specimen Preservative Away from the Patient",
      summary:
        "Control, explain, and label specimen containers so their contents cannot be mistaken for medication.",
      background:
        "A specimen container with preservative powder is ready for later collection.",
      skills: ["Specimen control", "Patient and carer communication"],
      briefing: "assets/specimen-bottle-visual-2026-08-05.png",
      briefingView: { src: "assets/specimen-bottle-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 104 543 408" },
      comic: "assets/specimen-bottle-comic-2026-08-05.png",
      thumbView: { src: "assets/specimen-bottle-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 511 784 430" },
      briefingAlt: "A urine specimen bottle containing white preservative powder is placed beside the patient.",
      question: "What should you do with the specimen bottle?",
      correctDecision: "control",
      decisionOptions: [
        {
          value: "bedside",
          title: "Leave it at the bedside for later use",
          detail: "Expect the bottle shape to make its purpose clear.",
        },
        {
          value: "control",
          title: "Keep it controlled until collection",
          detail: "Explain its purpose, label it clearly, and do not leave it unattended in the patient area.",
        },
        {
          value: "relative",
          title: "Ask the relative to keep it safe",
          detail: "Transfer responsibility without a formal explanation or storage control.",
        },
      ],
      wrong:
        "Do not leave a specimen container with preservative powder unattended in the patient area. Keep it controlled, label it clearly, and explain its purpose to the patient and relative.",
      teach: {
        question: "Which action prevents a specimen preservative from being mistaken for medicine?",
        options: [
          {
            text: "Place the container beside the patient so it is ready when needed.",
            ok: false,
            why: "Bedside availability creates an ingestion risk when the contents are misunderstood.",
          },
          {
            text: "Keep the container controlled until collection, label it, and explain its purpose.",
            ok: true,
            why: "Control, labelling, and communication remove the opportunity for mistaken ingestion.",
          },
          {
            text: "Empty the preservative powder and leave the clean container at the bedside.",
            ok: false,
            why: "The specimen container must be used as intended, and the preservative must not be discarded.",
          },
        ],
      },
    },
  ];

  CASES.sort((a, b) => a.n - b.n);

  const DEBRIEF = {
    clonazepam: [
      {
        consequences: ["Treatment failure", "Breakthrough seizures", "Status epilepticus"],
      },
    ],
    "wrong-patient-distraction": [
      {
        consequences: [
          "Severe allergic reaction",
          "Deterioration from delayed treatment",
        ],
      },
    ],
    dormicum: [
      {
        consequences: ["Profound sedation", "Respiratory arrest", "Death"],
      },
    ],
    "adrenaline-route": [
      {
        consequences: ["Severe hypertension", "Tachyarrhythmia", "Myocardial infarction"],
      },
    ],
    "patient-id": [
      {
        consequences: [
          "Severe allergic reaction",
          "Dangerous arrhythmia",
          "Deterioration from delayed treatment",
        ],
      },
    ],
    barcode: [
      {
        consequences: ["Excess sedation", "Respiratory depression", "Uncontrolled pain"],
      },
    ],
    "misfiled-potassium": [
      {
        consequences: [
          "Worsening hypokalaemia",
          "Life-\u2060\u00a0threatening arrhythmia",
          "Cardiac arrest",
        ],
      },
    ],
    "iv-stopcock": [
      {
        consequences: ["Severe hypotension", "Organ hypoperfusion", "Cardiac arrest"],
      },
    ],
    "mouthwash-ng": [
      {
        consequences: ["Chemical irritation", "Chemical poisoning"],
      },
    ],
    "specimen-bottle": [
      {
        consequences: ["Mucosal irritation", "Chemical poisoning"],
      },
    ],
    "oxygen-safety": [
      {
        consequences: ["Severe desaturation", "Emergency intubation", "Cardiac arrest"],
      },
    ],
    "transfer-safety": [
      {
        consequences: ["Intracranial bleeding", "Fracture", "Permanent disability"],
      },
    ],
    "ng-tube": [
      {
        consequences: ["Aspiration pneumonia", "Acute respiratory failure", "Death"],
      },
    ],
    "retained-tourniquet": [
      {
        consequences: ["Impaired circulation", "Nerve injury", "Limb ischaemia or gangrene"],
      },
    ],
    "missing-denture": [
      {
        consequences: [
          "Distress from loss of personal property",
          "Time and financial burden of replacement",
          "Difficulty eating and nutritional decline",
        ],
      },
    ],
  };

  const FINAL_QUIZ_QUESTIONS = [
    {
      id: "digoxin-dose",
      stem: [
        "You are administering Digoxin 125 mcg orally to an elderly patient. The ward stocks Digoxin 62.5 mcg tablets. Your colleague, who is also a registered nurse, verbally tells you: \"Just give two tablets. I' ve already checked the dose.\"",
      ],
      question: "What is the most appropriate action?",
      options: [
        { text: "Administer two tablets since your colleague has already performed the dose calculation and is a registered nurse", correct: false },
        { text: "Administer two tablets but document that your colleague verified the dose on your behalf", correct: false },
        { text: "Independently calculate the dose yourself, verify it against the prescription chart, and then have your colleague co- sign as the second checker", correct: true },
        { text: "Ask a third nurse to calculate the dose to resolve any potential disagreement", correct: false },
      ],
    },
    {
      id: "patient-match-alert",
      stem: [
        "You scan a patient' s wristband before administering an IV antibiotic. The scanner displays \"Patient Not Match\". The patient is alert, oriented, and confirms: \"Yes, that' s mine. I' ve been getting it every day.\" The patient' s name on the wristband visually appears to match the prescription label.",
      ],
      question: "What is the most appropriate next step?",
      options: [
        { text: "Proceed with administration since the patient has verbally confirmed his identity and the name on the wristband visually matches the prescription", correct: false },
        { text: "Re- scan the wristband in case of a scanning error, and if the alert persists, withhold the medication and investigate the discrepancy", correct: true },
        { text: "Assume the scanner is malfunctioning, verify the patient' s name verbally, and proceed with administration", correct: false },
        { text: "Override the system alert so the scheduled dose is not delayed", correct: false },
      ],
    },
    {
      id: "telephone-order",
      stem: [
        "During a busy night shift, you receive a telephone order from a doctor who says: \"Give the patient in Bed 8 Losec 20 mg IV stat.\" At the same time, you find both Losec (Omeprazole) 40 mg vials and Lasix (Furosemide) 20 mg ampoules side by side in the drug trolly.",
      ],
      question: "What is the most appropriate action?",
      options: [
        { text: "Select the Lasix 20 mg ampoule since the prescribed dose of 20 mg matches the available ampoule strength exactly", correct: false },
        { text: "Select the Losec 40 mg vial, reconstitute it, and administer half the vial to deliver 20 mg as ordered", correct: false },
        { text: "Read back the full order to the doctor, clarify the drug by both brand and generic name, and confirm the indication before preparing the medication", correct: true },
        { text: "Ask the pharmacist on- call to determine which drug the doctor most likely intended based on the patient' s diagnosis", correct: false },
      ],
    },
    {
      id: "ng-feed-ph",
      stem: [
        "You are caring for a patient with a newly inserted NG tube. You perform a gastric aspirate test and obtain aspirate with a pH of 6. The patient is not taking any proton pump inhibitors or antacids. The doctor has prescribed NG feeding to start.",
      ],
      question: "What is the most appropriate action?",
      options: [
        { text: "Commence feeding since you successfully obtained aspirate, which confirms the tube is in the gastrointestinal tract", correct: false },
        { text: "Flush the tube with 20 ml of air, reposition the patient onto their left side, and re- aspirate after 30 minutes. If aspirate is still obtained, commence feeding", correct: false },
        { text: "Withhold feeding, as a pH of 6 does not confirm gastric placement, and escalate for further confirmation such as a chest X- ray", correct: true },
        { text: "Commence feeding at a reduced rate and closely monitor for coughing, desaturation, or respiratory distress", correct: false },
      ],
    },
    {
      id: "hoist-sling",
      stem: [
        "You are transferring a hemiplegic patient from the ward bed to a wheelchair using a mechanical hoist. You select a sling, position it under the patient, and attach it to the hoist. As you begin to lift, a colleague says, \"The sling looks a bit loose around the thighs, but it should be fine. Let' s just go quickly before the patient gets anxious.\"",
      ],
      question: "What is the most appropriate response?",
      options: [
        { text: "Proceed carefully but hold onto the patient during the lift for added security", correct: false },
        { text: "Proceed with the transfer but lower the patient into the wheelchair as quickly as possible to minimize time in the air", correct: false },
        { text: "Stop the lift, lower the patient back to the bed, and reposition or resize the sling to ensure a secure fit before reattempting", correct: true },
        { text: "Continue the lift slowly while your colleague manually supports the loose section of the sling around the thighs", correct: false },
      ],
    },
    {
      id: "portable-oxygen",
      stem: [
        "You are transferring a patient on supplemental oxygen from the ward to the radiology department. A healthcare assistant has prepared the transport trolley and tells you: \"The portable oxygen cylinder is all set up and ready to go\". You see the nasal cannula connected to the cylinder' s flowmeter, which is set to 3 L/min as prescribed. You disconnect the patient from the wall oxygen outlet and begin the transfer.",
        "Partway through the corridor, the patient becomes cyanotic and the SpO₂ alarm on the portable monitor reads 75%. The nasal cannula is correctly positioned in the patient' s nostrils and the flowmeter dial still reads 3 L/min.",
      ],
      question: "What error has most likely occurred?",
      options: [
        { text: "The patient likely desaturated due to the exertion of being moved", correct: false },
        { text: "The nasal cannula tubing was likely too long, causing oxygen to dissipate before reaching the patient", correct: false },
        { text: "The main valve of the oxygen cylinder was likely never opened. Regardless of who set up the equipment, you should have personally verified that the main valve was open and confirmed gas flow at the nasal prongs before leaving the ward", correct: true },
        { text: "A non- rebreather mask should be used to deliver a higher FiO₂ during the transfer", correct: false },
      ],
    },
    {
      id: "retained-tourniquet",
      stem: [
        "You attempt blood- taking on a patient' s right arm but are unsuccessful. You apply a cotton ball and ask the patient to press on it. At the same time, you are urgently summoned to attend a cardiac arrest case.",
      ],
      question: "What is the most appropriate action before leaving the bedside?",
      options: [
        { text: "Attend the cardiac arrest immediately", correct: false },
        { text: "Before leaving, quickly confirm the tourniquet has been removed from the right arm", correct: true },
        { text: "Shout to the healthcare assistant nearby to tidy up the bedside equipment while you respond to the emergency", correct: false },
        { text: "Inform the patient to remove the tourniquet himself and press on both puncture sites until a nurse returns", correct: false },
      ],
    },
    {
      id: "missing-denture",
      stem: [
        "You are admitting an elderly patient to the ward. During the admission assessment, you ask the patient if he has any dentures. The patient, who is mildly confused, replies \"No\". His family is not present at the time of admission.",
      ],
      question: "What is the most appropriate action?",
      options: [
        { text: "Document \"No dentures\" in the admission checklist based on the patient' s verbal response and move on to the next assessment item", correct: false },
        { text: "Perform a visual inspection of the patient' s oral cavity to check for the presence of dentures, and document your findings in both the admission checklist and the patient' s property record", correct: true },
        { text: "Write \"Patient reports no dentures, unable to verify due to confusion\"", correct: false },
        { text: "Skip the documentation on denture", correct: false },
      ],
    },
    {
      id: "dd-formulation",
      stem: [
        "You are administering medications from the Dangerous Drugs (DD) cupboard with a second nurse. The prescription reads \"Morphine Sulphate prolonged- release tablet 30 mg oral BD.\" In the cupboard, you see both Morphine Sulphate prolonged- release tablets 30 mg and Morphine Sulphate syrup 10 mg/5 ml.",
      ],
      question: "Which of the following BEST ensures safe administration?",
      options: [
        { text: "Select the prolonged- release tablet, confirm the drug name and formulation with the second nurse verbally, and administer it", correct: false },
        { text: "Select the prolonged- release tablet, have the second nurse independently verify the drug name, formulation, strength, and expiry against the prescription chart, and scan the 2D barcode before administration", correct: true },
        { text: "Either formulation can be used as long as the total Morphine Sulphate dose administered equals 30 mg", correct: false },
        { text: "Select the prolonged- release tablet based on your own knowledge of the prescription, and have the second nurse countersign the DDA register after administration", correct: false },
      ],
    },
  ];

  let state = load();
  let runtime = null;
  let quizRuntime = null;
  let toastTimer;
  let comicCountdownTimer;
  let viewerScale = 1;
  let viewerX = 0;
  let viewerY = 0;
  let viewerPinchDistance = 0;
  let viewerPinchCenter = null;
  let viewerDrag = null;
  let lazyMediaObserver;
  const viewerPointers = new Map();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
      const completed = { ...(saved.completed || {}) };
      migrateMergedCompletion(completed, "oxygen-safety", ["oxygen-case-1", "oxygen-case-2"]);
      migrateMergedCompletion(completed, "transfer-safety", [
        "transfer-fall-case-1",
        "transfer-fall-case-2",
      ]);
      return { completed, quizPassed: Boolean(saved.quizPassed), quizPassedAt: saved.quizPassedAt || null };
    } catch {
      return { completed: {}, quizPassed: false, quizPassedAt: null };
    }
  }

  function migrateMergedCompletion(completed, mergedId, legacyIds) {
    if (!completed[mergedId] && legacyIds.every((id) => completed[id])) {
      const records = legacyIds.map((id) => completed[id]);
      const stars = Math.min(...records.map(completionStars));
      completed[mergedId] = {
        stars,
        lastStars: stars,
        attempts: Math.max(...records.map((record) => record.attempts || 1)),
        completedAt: records.map((record) => record.completedAt).filter(Boolean).sort().at(-1),
      };
    }
    legacyIds.forEach((id) => delete completed[id]);
  }

  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify(state));
    } catch {
      // The course remains usable when storage is unavailable.
    }
  }

  function applyViewerTransform() {
    const image = document.getElementById("dialogImage");
    if (!image) return;
    image.style.transform = `translate3d(${viewerX}px, ${viewerY}px, 0) scale(${viewerScale})`;
    const scaleLabel = document.querySelector("[data-viewer-scale]");
    if (scaleLabel) scaleLabel.textContent = `${Math.round(viewerScale * 100)}%`;
  }

  function setViewerScale(nextScale) {
    viewerScale = Math.max(1, Math.min(5, nextScale));
    if (viewerScale === 1) {
      viewerX = 0;
      viewerY = 0;
    }
    applyViewerTransform();
  }

  function resetViewer() {
    viewerScale = 1;
    viewerX = 0;
    viewerY = 0;
    viewerPinchDistance = 0;
    viewerPinchCenter = null;
    viewerDrag = null;
    viewerPointers.clear();
    applyViewerTransform();
  }

  function openImageViewer(src, title) {
    const image = document.getElementById("dialogImage");
    const viewport = document.querySelector("[data-comic-viewport]");
    image.src = src;
    image.alt = title;
    image.classList.toggle("white-backdrop", src.includes("oxygen-cylinder-safety-3-2-1"));
    viewport?.classList.toggle(
      "white-backdrop-viewer",
      src.includes("oxygen-cylinder-safety-3-2-1"),
    );
    document.getElementById("imageTitle").textContent = title;
    resetViewer();
    document.getElementById("imageDialog").showModal();
  }

  function bindImageViewer() {
    const viewport = document.querySelector("[data-comic-viewport]");
    if (!viewport) return;

    viewport.addEventListener(
      "wheel",
      (event) => {
        if (!document.getElementById("imageDialog").open) return;
        event.preventDefault();
        setViewerScale(viewerScale * Math.exp(-event.deltaY * 0.0015));
      },
      { passive: false },
    );

    viewport.addEventListener("dblclick", () => {
      if (viewerScale > 1) resetViewer();
      else setViewerScale(2);
    });

    viewport.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      viewport.setPointerCapture?.(event.pointerId);
      viewerPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (viewerPointers.size === 1) {
        viewerDrag = { x: event.clientX, y: event.clientY, startX: viewerX, startY: viewerY };
      }
    });

    viewport.addEventListener("pointermove", (event) => {
      if (!viewerPointers.has(event.pointerId)) return;
      viewerPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      const points = [...viewerPointers.values()];

      if (points.length >= 2) {
        const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        const center = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
        if (viewerPinchDistance) setViewerScale(viewerScale * (distance / viewerPinchDistance));
        if (viewerPinchCenter && viewerScale > 1) {
          viewerX += center.x - viewerPinchCenter.x;
          viewerY += center.y - viewerPinchCenter.y;
          applyViewerTransform();
        }
        viewerPinchDistance = distance;
        viewerPinchCenter = center;
        viewerDrag = null;
        return;
      }

      if (viewerScale > 1 && viewerDrag) {
        viewerX = viewerDrag.startX + event.clientX - viewerDrag.x;
        viewerY = viewerDrag.startY + event.clientY - viewerDrag.y;
        applyViewerTransform();
      }
    });

    const releasePointer = (event) => {
      viewerPointers.delete(event.pointerId);
      viewerPinchDistance = 0;
      viewerPinchCenter = null;
      const remaining = [...viewerPointers.values()][0];
      viewerDrag = remaining
        ? { x: remaining.x, y: remaining.y, startX: viewerX, startY: viewerY }
        : null;
    };

    viewport.addEventListener("pointerup", releasePointer);
    viewport.addEventListener("pointercancel", releasePointer);

    document.querySelectorAll("[data-viewer-zoom]").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.viewerZoom === "in") setViewerScale(viewerScale + 0.35);
        if (button.dataset.viewerZoom === "out") setViewerScale(viewerScale - 0.35);
        if (button.dataset.viewerZoom === "reset") resetViewer();
      });
    });
  }

  function esc(value = "") {
    return String(value).replace(
      /[&<>'"]/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[char],
    );
  }

  function normalizeVisiblePunctuation(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      node.nodeValue = node.nodeValue
        .replace(/[\u200B\u2060]/g, "")
        .replace(/\u00a0/g, " ")
        .replace(/\s*,\s*/g, ", ")
        .replace(/\b(1|10), 000\b/g, "$1,000")
        .replace(/\s*-\s*(?=\S)/g, "- ")
        .replace(/\s*:\s*(?=\S)/g, ": ")
        .replace(/\s*(['’])\s*(?=\S)/g, "$1 ")
        .replace(/([-:])\s+([a-z])/g, (_, punctuation, letter) => `${punctuation} ${letter.toUpperCase()}`);
    }
  }

  function shuffleItems(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function buildTeachOrder(teach) {
    const order = teach.options.map((_, index) => index);
    for (let index = order.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
    }
    const correctIndex = teach.options.findIndex((option) => option.ok);
    if (order.indexOf(correctIndex) === 1 && order.length > 2) {
      [order[1], order[2]] = [order[2], order[1]];
    }
    return order;
  }

  function caseById(id) {
    return CASES.find((item) => item.id === id);
  }

  function route() {
    return location.hash.replace(/^#\/?/, "");
  }

  function go(path = "") {
    const hash = path ? `#/${path}` : "#/";
    if (location.hash === hash) render();
    else location.hash = hash;
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
  }

  function initRuntime(id) {
    if (runtime?.id === id) return;
    const item = caseById(id);
    const completion = state.completed[id];
    runtime = {
      id,
      phase: "decision",
      attempts: 0,
      feedback: null,
      tablets: 0,
      volume: 0,
      label: false,
      double: false,
      simpleChoice: null,
      idChoice: null,
      identityAction: null,
      scanMode: null,
      medication: null,
      contextChecks: [],
      infusionPoints: [],
      oxygenSource: null,
      oxygenFlow: 0,
      cylinderSequence: [],
      bedLocked: false,
      stretcherLocked: false,
      gapClosed: false,
      slingSelected: false,
      slingFitted: false,
      slingPositioned: false,
      slingFastened: false,
      testLift: false,
      staffHold: false,
      ngEvidenceSteps: [],
      ngAction: null,
      tourniquetArms: [],
      tourniquetAction: null,
      dentureAssessed: false,
      dentureStorage: null,
      dentureInventory: false,
      dentureTagged: false,
      dentureDocumented: false,
      interruptionChecks: [],
      interruptionAction: null,
      orderRoute: null,
      orderConcentration: null,
      orderDose: null,
      orderAction: null,
      cupChecks: [],
      cupAction: null,
      specimenStorage: null,
      specimenLabel: false,
      specimenExplained: false,
      teachChoice: null,
      teachCorrect: false,
      teachFeedback: null,
      teachOrder: item ? buildTeachOrder(item.teach) : [],
      oxygenTeachOrders: item?.rounds?.map((round) => buildTeachOrder(round.teach)) || [],
      oxygenRoundStates:
        item?.rounds?.map(() => ({
          decisionDone: false,
          comicDone: false,
          teachChoice: null,
          teachCorrect: false,
          teachFeedback: null,
          feedback: null,
        })) || [],
      oxygenRound: 0,
      resultStars: completion?.lastStars || completionStars(completion),
      comicReadyAt: 0,
    };

    if (!item) return;
    if (item.type === "oxygen-combined" && !completion) runtime.phase = "oxygen-1-decision";
    if (!completion) return;

    runtime.phase = "complete";
    runtime.attempts = completion.attempts || 1;

    if (item.type === "dose") runtime.tablets = 3;
    if (item.type === "single-choice") {
      runtime.simpleChoice = item.correctDecision;
      if (item.id === "wrong-patient-distraction") {
        runtime.interruptionChecks = ["patient", "drug", "time", "dosage", "route"];
        runtime.interruptionAction = "new-pass";
      }
      if (item.id === "adrenaline-route") {
        runtime.orderRoute = "not-stated";
        runtime.orderConcentration = "not-stated";
        runtime.orderDose = "not-stated";
        runtime.orderAction = "clarify";
      }
      if (item.id === "mouthwash-ng") {
        runtime.cupChecks = ["label", "contents", "medication-order"];
        runtime.cupAction = "clarify";
      }
      if (item.id === "specimen-bottle") {
        runtime.specimenStorage = "control";
        runtime.specimenLabel = true;
        runtime.specimenExplained = true;
      }
    }
    if (item.type === "syringe") {
      runtime.volume = 3;
      runtime.label = true;
      runtime.double = true;
    }
    if (item.type === "identity") {
      runtime.idChoice = "verify";
      runtime.identityAction = "verify";
    }
    if (item.type === "barcode") {
      runtime.scanMode = "scan";
      runtime.medication = "tablet";
    }
    if (item.type === "clinical-context") {
      runtime.contextChecks = ["medication-order", "allergy-history", "laboratory-result"];
    }
    if (item.type === "infusion-route") {
      runtime.infusionPoints = ["iv-access", "stopcock", "tubing", "pump"];
    }
    if (item.type === "oxygen-combined") {
      runtime.oxygenSource = "cylinder";
      runtime.oxygenFlow = 3;
      runtime.cylinderSequence = ["valve", "content", "flow"];
      runtime.oxygenRoundStates.forEach((roundState, index) => {
        const teach = item.rounds[index].teach;
        roundState.decisionDone = true;
        roundState.comicDone = true;
        roundState.teachChoice = teach.options.findIndex((option) => option.ok);
        roundState.teachCorrect = true;
        roundState.teachFeedback = teach.options[roundState.teachChoice]?.why || null;
      });
    }
    if (item.type === "transfer-combined") {
      runtime.stretcherLocked = true;
      runtime.bedLocked = true;
      runtime.gapClosed = true;
      runtime.slingSelected = true;
      runtime.slingFitted = true;
      runtime.slingPositioned = true;
      runtime.slingFastened = true;
      runtime.testLift = false;
      runtime.staffHold = false;
    }
    if (item.type === "evidence-gate") {
      runtime.ngEvidenceSteps = ["feed-order", "cxr-available", "position-confirmed"];
      runtime.ngAction = "clarify";
    }
    if (item.type === "tourniquet-loop") {
      runtime.tourniquetArms = ["left", "right"];
      runtime.tourniquetAction = "remove-store";
    }
    if (item.type === "denture-admission") {
      runtime.dentureAssessed = true;
      runtime.dentureStorage = "box";
      runtime.dentureDocumented = true;
    }

    runtime.teachChoice = item.teach.options.findIndex((option) => option.ok);
    runtime.teachCorrect = true;
    runtime.teachFeedback = item.teach.options[runtime.teachChoice]?.why || null;
  }

  function header() {
    return `
      <header class="topbar">
        <div class="shell topbar-in">
          <button class="brand" data-home>
            <span class="brand-mark">${ICONS.shield}</span>
            <span class="brand-copy">
              <strong>Break the Chain</strong>
              <span>Real Clinical Incident Missions</span>
            </span>
          </button>
          <div class="top-actions">
            <button class="ghost" data-about>${ICONS.info}<span>About</span></button>
            <button class="icon-btn" data-reset title="Reset progress" aria-label="Reset progress">${ICONS.reset}</button>
          </div>
        </div>
      </header>`;
  }

  function render() {
    clearInterval(comicCountdownTimer);
    lazyMediaObserver?.disconnect();
    lazyMediaObserver = null;
    const caseMatch = route().match(/^case\/(.+)$/);
    let content;

    if (caseMatch) content = casePage(caseMatch[1]);
    else if (route() === "complete") content = completionPage();
    else if (route() === "quiz") content = quizPage();
    else content = homePage();

    const app = document.getElementById("app");
    app.innerHTML = `${header()}<main>${content}</main>`;
    normalizeVisiblePunctuation(app);
    bindGlobal();
    if (caseMatch) bindCase(caseById(caseMatch[1]));
    else bindHome();
    bindLazyMedia();
    document.title = "Break the Chain - Real Clinical Incident Missions";
  }

  function bindLazyMedia() {
    const elements = Array.from(document.querySelectorAll("[data-lazy-src]"));
    if (!elements.length) return;

    const load = (element) => {
      const src = element.getAttribute("data-lazy-src");
      if (!src) return;
      const tagName = element.tagName.toLowerCase();
      if (tagName === "svg") element.querySelector("image")?.setAttribute("href", src);
      else if (tagName === "image") element.setAttribute("href", src);
      else if (tagName === "source") element.setAttribute("srcset", src);
      else element.setAttribute("src", src);
      element.removeAttribute("data-lazy-src");
    };

    if (!("IntersectionObserver" in window)) {
      elements.forEach(load);
      return;
    }

    lazyMediaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          load(entry.target);
          lazyMediaObserver?.unobserve(entry.target);
        });
      },
      { rootMargin: "320px 0px" },
    );
    elements.forEach((element) => lazyMediaObserver.observe(element));
  }

  function starsForAttempts(attempts = 1) {
    return Math.max(1, MAX_STARS - Math.max(0, attempts - 1));
  }

  function completionStars(completion) {
    if (!completion) return 0;
    if (Number.isFinite(completion.stars)) {
      return Math.max(1, Math.min(MAX_STARS, completion.stars));
    }

    const legacyScore = completion.score ?? completion.lastScore;
    if (legacyScore >= 100) return 3;
    if (legacyScore >= 85) return 2;
    return 1;
  }

  function starDisplay(stars) {
    const filled = Math.max(0, Math.min(MAX_STARS, stars));
    return `${"★".repeat(filled)}${"☆".repeat(MAX_STARS - filled)}`;
  }

  function stats() {
    const completedIds = Object.keys(state.completed).filter(caseById);

    return {
      count: completedIds.length,
      stars: completedIds.reduce(
        (total, id) => total + completionStars(state.completed[id]),
        0,
      ),
      maxStars: CASES.length * MAX_STARS,
    };
  }

  function homePage() {
    const summary = stats();
    const percent = Math.round((summary.count / CASES.length) * 100);
    const allComplete = summary.count === CASES.length;
    const next = CASES.find((item) => !state.completed[item.id]);
    const firstCompleted = CASES.find((item) => state.completed[item.id])?.id;

    return `
      <div class="shell">
        <section class="hero">
          <div class="hero-main">
            <span class="eyebrow program-label"><span>Standardized Orientation Program</span><span>For Fresh Graduate Nurses in Hospital Authority</span></span>
            <h1>Break the Chain<span>Real Clinical Incident Missions</span></h1>
            <p class="hero-copy">Step back into real nursing incidents from the moment before harm. Notice the cue, make the safer choice, and carry the lesson into your next shift.</p>
            <div class="hero-actions">
              ${
                allComplete
                  ? `<button class="primary" data-course-complete>${ICONS.shield}View course completion${ICONS.arrow}</button>`
                  : `<button class="primary" data-start="${next.id}">${ICONS.shield}Start next mission${ICONS.arrow}</button>`
              }
              ${
                firstCompleted
                  ? `<button class="secondary" data-start="${firstCompleted}">${ICONS.reset}Review a completed mission</button>`
                  : ""
              }
            </div>
          </div>
          <aside class="hero-side">
            <div class="side-head">
              <div>
                <span class="side-label">Mission Stars</span>
                <h2>${summary.stars} ★</h2>
                <span class="score-basis">Let's make right clinical decisions to secure patient safety!</span>
              </div>
            </div>
            <div class="ring-wrap">
              <div class="ring" style="--progress:${percent * 3.6}deg">
                <div class="ring-copy"><strong>${summary.count}/${CASES.length}</strong><span>missions</span></div>
              </div>
              <div class="ring-summary"><strong>${summary.stars} / ${summary.maxStars} ★</strong><span>Mission Stars earned</span></div>
            </div>
            <div class="star-rules" aria-label="How mission stars are earned">
              <span class="star-rule-intro">Stars obtained are based only on Part 1 of each mission:</span>
              <span><strong>3 ★:</strong> Correct on the 1st attempt</span>
              <span><strong>2 ★:</strong> Correct on the 2nd attempt</span>
              <span><strong>1 ★:</strong> Correct on the 3rd or later attempt</span>
            </div>
            <p class="training-remark"><strong>Remarks:</strong> The Mission Stars are for fun only. Training completion is confirmed by the Final Quiz.</p>
          </aside>
        </section>

        <div class="section-head">
          <div>
            <span class="eyebrow">Mission map</span>
            <h2>Choose your mission</h2>
          </div>
          <p>${INCIDENT_COUNT} incidents across ${CASES.length} missions. Different safety challenges. Start in <span class="keep-together">any order.</span></p>
        </div>
        <section class="mission-grid">${CASES.map(missionCard).join("")}</section>
      </div>`;
  }

  function missionCard(item) {
    const completion = state.completed[item.id];
    const actionLabel = completion ? "Review completed" : "Open";
    const displayTitle = item.playTitle || item.title;
    const thumbs = item.thumbViews || (item.thumbView ? [item.thumbView] : item.thumbs || [item.thumb]);
    return `
      <article
        class="mission-card"
        data-start="${item.id}"
        role="link"
        tabindex="0"
        aria-label="${actionLabel} mission ${item.n}: ${esc(displayTitle)}"
      >
        <div class="mission-image ${thumbs.length > 1 ? "paired" : ""}">
          ${thumbs.map(missionThumbnail).join("")}
          <span class="mission-no">${item.n}</span>
          <span class="mission-state ${completion ? "done" : ""}">${completion ? "Completed" : "Ready"}</span>
        </div>
        <div class="mission-body">
          <span class="category">${item.category}</span>
          <h3>${displayTitle}</h3>
          <p>${item.summary}</p>
          <div class="tags">${item.skills.map((skill) => `<span class="tag">${esc(skill)}</span>`).join("")}</div>
          <div class="mission-foot">
            <span class="mission-score">${completion ? `Mission Stars: ${starDisplay(completionStars(completion))}` : "3- 5 mins"}</span>
            <span class="mini-btn" aria-hidden="true">${completion ? "Review mission" : "Open mission"}${ICONS.arrow}</span>
          </div>
        </div>
      </article>`;
  }

  function missionThumbnail(thumb) {
    if (typeof thumb === "string") return `<img src="${thumb}" loading="lazy" decoding="async" alt="">`;
    const optimizedSrc = runtimeCropAsset(thumb.src, thumb.viewBox, "dashboard");
    const size = viewBoxSize(thumb.viewBox);
    if (optimizedSrc && size) {
      return `<img class="mission-thumb" data-lazy-src="${optimizedSrc}" width="${size.width}" height="${size.height}" loading="lazy" decoding="async" alt="">`;
    }
    return `
      <svg class="mission-thumb" data-lazy-src="${esc(thumb.src)}" viewBox="${thumb.viewBox}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <image width="${thumb.width}" height="${thumb.height}"></image>
      </svg>`;
  }

  function casePage(id) {
    const item = caseById(id);
    if (!item) {
      queueMicrotask(() => go(""));
      return '<div class="shell"></div>';
    }

    initRuntime(id);
    const completion = state.completed[id];
    const missionHeading = item.playTitle || item.title;

    return `
      <div class="shell case-shell">
        <button class="back" data-home>${ICONS.back}Back to mission map</button>
        <div class="case-top">
          <div class="case-copy">
            <span class="category">Mission ${item.n} · ${item.category}</span>
            <h1 class="${missionHeading.length > 38 ? "long-title" : ""}">${missionHeading}</h1>
          </div>
        </div>
        ${progressSteps(item)}
        ${missionFlow(item)}
      </div>`;
  }

  function progressSteps(item) {
    if (item?.type === "oxygen-combined") return oxygenProgressSteps();
    const phases = ["decision", "comic", "debrief"];
    const labels = ["YOUR DECISION", "REAL CASE", "TAKEAWAY"];
    const activeIndex = phases.indexOf(runtime.phase);
    const missionComplete = runtime.phase === "complete";

    return `
      <div class="steps">
        ${labels
          .map((label, index) => {
            const done = missionComplete || index < activeIndex;
            const status = done ? "done" : index === activeIndex ? "active" : "";
            return `<div class="step ${status}"><i>${done ? "✓" : index + 1}</i><span>${label}</span></div>`;
          })
          .join("")}
      </div>`;
  }

  function oxygenStageIndex() {
    const phases = [
      "oxygen-1-decision",
      "oxygen-1-comic",
      "oxygen-1-debrief",
      "oxygen-2-decision",
      "oxygen-2-comic",
      "oxygen-2-debrief",
    ];
    return runtime.phase === "complete" ? phases.length : phases.indexOf(runtime.phase);
  }

  function oxygenProgressSteps() {
    const labels = ["R1 DECISION", "R1 REAL CASE", "R1 TAKEAWAY", "R2 DECISION", "R2 REAL CASE", "R2 TAKEAWAY"];
    const activeIndex = oxygenStageIndex();
    return `
      <div class="steps oxygen-steps">
        ${labels
          .map((label, index) => {
            const done = activeIndex > index;
            const status = done ? "done" : activeIndex === index ? "active" : "";
            return `<div class="step ${status}"><i>${done ? "✓" : index + 1}</i><span>${label}</span></div>`;
          })
          .join("")}
      </div>`;
  }

  function flowHeading(number, label, title, status) {
    return `
      <div class="flow-heading">
        <span class="flow-number">${number}</span>
        <div>
          <span class="flow-label">${label}</span>
          <h2>${title}</h2>
        </div>
        <span class="flow-status ${status.toLowerCase()}">${status}</span>
      </div>`;
  }

  function lockedPanel(message) {
    return `
      <div class="locked-panel">
        <span class="locked-icon">${ICONS.lock}</span>
        <div><strong>Locked</strong><span>${message}</span></div>
      </div>`;
  }

  function missionFlow(item) {
    if (item.type === "oxygen-combined") return oxygenMissionFlow(item);
    const missionComplete = runtime.phase === "complete";
    const incidentUnlocked = ["comic", "debrief", "complete"].includes(runtime.phase);
    const incidentComplete = ["debrief", "complete"].includes(runtime.phase);
    const debriefUnlocked = ["debrief", "complete"].includes(runtime.phase);

    return `
      <section class="mission-section decision-section ${incidentUnlocked ? "completed" : "current"}">
        ${flowHeading(1, "YOUR DECISION", "What would you do at that moment?", incidentUnlocked ? "Complete" : "Current")}
        ${decisionPage(item)}
      </section>

      ${
        incidentUnlocked
          ? `<div class="story-bridge">
              ${ICONS.check}
              <div>
                <span>${missionComplete ? "Mission decision complete" : "Decision locked in"}</span>
                <strong>${missionComplete ? "The reviewed incident and debrief remain available below." : "Now walk through what happened in the real incident."}</strong>
              </div>
            </div>`
          : ""
      }

      <section id="incident-section" class="mission-section incident-section ${incidentUnlocked ? "unlocked" : "locked"}">
        ${flowHeading(2, "REAL INCIDENT", "Walk through the real case", incidentComplete ? "Complete" : incidentUnlocked ? "Open" : "Locked")}
        ${
          incidentUnlocked
            ? comicPage(item)
            : lockedPanel("Complete the decision above to unlock the real incident.")
        }
      </section>

      <section id="debrief-section" class="mission-section debrief-section ${debriefUnlocked ? "unlocked" : "locked"}">
        ${flowHeading(3, "TAKEAWAY", "Carry the lesson forward", missionComplete ? "Complete" : debriefUnlocked ? "Open" : "Locked")}
        ${
          debriefUnlocked
            ? debriefPage(item)
            : lockedPanel(
                incidentUnlocked
                  ? "Review the incident comic, then continue to the debrief."
                  : "Complete the decision and review the incident before debriefing.",
              )
        }
      </section>
      ${missionComplete ? missionResult(item) : ""}`;
  }

  function oxygenMissionFlow(item) {
    const stage = oxygenStageIndex();
    const missionComplete = runtime.phase === "complete";

    const rounds = item.rounds
      .map((round, roundIndex) => {
        const base = roundIndex * 3;
        const decisionUnlocked = stage >= base;
        const decisionComplete = stage > base;
        const comicUnlocked = stage >= base + 1;
        const comicReviewed = stage > base + 1;
        const debriefUnlocked = stage >= base + 2;
        const debriefComplete = stage > base + 2;
        const briefing = item.briefings[round.briefingIndex];
        const comic = item.comics[round.comicIndex];
        const roundComics = roundIndex === 1
          ? [
              comic,
              {
                label: "Oxygen Cylinder Safety 3-2-1 poster",
                src: OXYGEN_SAFETY_POSTER,
                className: "oxygen-safety-poster",
              },
            ]
          : [comic];

        return `
          <div class="oxygen-round-banner">
            <span>${round.label}</span>
            <strong>${round.playTitle}</strong>
          </div>
          <section class="mission-section decision-section ${decisionComplete ? "completed" : decisionUnlocked ? "current" : "locked"}">
            ${flowHeading(base + 1, "YOUR DECISION", "What would you do at that moment?", decisionComplete ? "Complete" : decisionUnlocked ? "Current" : "Locked")}
            ${
              decisionUnlocked
                ? oxygenDecisionPage(item, round, briefing, roundIndex, decisionComplete)
                : lockedPanel("Complete the first real-case round before starting this decision.")
            }
          </section>
          <section id="oxygen-incident-${roundIndex + 1}" class="mission-section incident-section ${comicUnlocked ? "unlocked" : "locked"}">
            ${flowHeading(base + 2, "REAL INCIDENT", "Walk through the real case", comicReviewed ? "Complete" : comicUnlocked ? "Open" : "Locked")}
            ${
              comicUnlocked
                ? comicPage(
                    { ...item, title: round.playTitle, comics: roundComics },
                    {
                      reviewed: comicReviewed,
                      nextAttribute: `data-next-oxygen-debrief="${roundIndex}"`,
                    },
                  )
                : lockedPanel("Complete this round's decision to unlock the real incident.")
            }
          </section>
          <section id="oxygen-debrief-${roundIndex + 1}" class="mission-section debrief-section ${debriefUnlocked ? "unlocked" : "locked"}">
            ${flowHeading(base + 3, "TAKEAWAY", "Carry the lesson forward", debriefComplete ? "Complete" : debriefUnlocked ? "Open" : "Locked")}
            ${
              debriefUnlocked
                ? oxygenDebriefPage(item, round, roundIndex, debriefComplete)
                : lockedPanel("Review this round's real incident before completing the takeaway.")
            }
          </section>`;
      })
      .join("");

    return `${rounds}${missionComplete ? missionResult(item) : ""}`;
  }

  function oxygenDecisionPage(item, round, briefing, roundIndex, decisionComplete) {
    const roundState = runtime.oxygenRoundStates[roundIndex];
    const feedback = decisionComplete
      ? `<div class="feedback correct">${ICONS.check}<div><strong>Correct decision</strong><span>The real incident for this round is open below.</span></div></div>`
      : roundState.feedback
        ? `<div class="feedback wrong">${ICONS.alert}<div><strong>Not quite - Try again</strong><span>${
            roundIndex === 0
              ? "Connect the cannula to the oxygen-cylinder outlet, set 3 L/min, and verify delivery."
              : "Open the cylinder valve, check the content level, set the flow, and confirm delivery in that order."
          }</span></div></div>`
        : "";

    return `
      <div class="case-grid">
        <section class="briefing-card">
          <figure class="briefing-frame">
            ${briefingMedia(briefing)}
          </figure>
        </section>
        <aside class="challenge combined-challenge">
          <div class="challenge-kicker">${ICONS.alert}Decision point</div>
          <div class="key-information">
            <span>Background information</span>
            <p>${round.background}</p>
          </div>
          <h2>${round.question}</h2>
          <div class="decision-controls" ${decisionComplete ? 'inert aria-disabled="true"' : ""}>
            ${roundIndex === 0 ? oxygenConnectionInteraction() : oxygenSequenceInteraction()}
          </div>
          ${feedback}
          <div class="action-row">
            ${
              decisionComplete
                ? `<button class="secondary decision-confirmed" disabled>${ICONS.check}Decision confirmed</button>`
                : `<button class="primary" data-oxygen-submit="${roundIndex}">Lock in answer${ICONS.arrow}</button>`
            }
          </div>
        </aside>
      </div>`;
  }

  function oxygenDebriefPage(item, round, roundIndex, roundComplete) {
    const roundState = runtime.oxygenRoundStates[roundIndex];
    const riskItems = DEBRIEF[item.id] || [];
    const order = runtime.oxygenTeachOrders[roundIndex] || round.teach.options.map((_, index) => index);
    const options = order
      .map((index) => {
        const option = round.teach.options[index];
        return choice(`oxygen-teach-${roundIndex}`, index, option.text, "", roundState.teachChoice === index);
      })
      .join("");

    return `
      <section class="debrief-stage">
        <section class="risk-brief" aria-labelledby="oxygen-risk-title-${roundIndex}">
          <div class="risk-heading"><h2 id="oxygen-risk-title-${roundIndex}">POSSIBLE SERIOUS CONSEQUENCES</h2></div>
          <div class="risk-grid">
            ${riskItems
              .map(
                (risk) => `<article class="risk-card"><span class="risk-skull" aria-hidden="true">☠️</span><div class="risk-card-body"><ul class="risk-list">${risk.consequences
                  .map((consequence) => `<li>${esc(consequence)}</li>`)
                  .join("")}</ul></div></article>`,
              )
              .join("")}
          </div>
        </section>
        <div class="challenge-kicker">${ICONS.rewind}Takeaway check</div>
        <h2>${round.teach.question}</h2>
        <div class="choices teach-choices" ${roundComplete ? 'inert aria-disabled="true"' : ""}>${options}</div>
        ${
          roundState.teachFeedback
            ? `<div class="feedback ${roundState.teachCorrect ? "correct" : "wrong"}">${
                roundState.teachCorrect ? ICONS.check : ICONS.alert
              }<div><strong>${roundState.teachCorrect ? "Correct - Round complete" : "Reconsider this choice"}</strong><span>${roundState.teachFeedback}</span></div></div>`
            : ""
        }
        <div class="action-row">
          ${
            roundComplete
              ? `<button class="secondary decision-confirmed" disabled>${ICONS.check}Round completed</button>`
              : roundState.teachCorrect
                ? roundIndex === 0
                  ? `<button class="primary" data-next-oxygen-round>Continue to round 2${ICONS.arrow}</button>`
                  : `<button class="primary" data-finish>Complete mission${ICONS.arrow}</button>`
                : `<button class="secondary" data-confirm-oxygen="${roundIndex}">Confirm reflection</button>`
          }
        </div>
      </section>`;
  }

  function decisionPage(item) {
    const decisionComplete = runtime.phase !== "decision";
    const decisionSubmitVisible =
      item.id !== "wrong-patient-distraction" ||
      (runtime.interruptionAction === "new-pass" && runtime.interruptionChecks.length > 0);
    const briefings = item.briefings || [
      {
        label: "Decision scene",
        src: item.briefingView?.src || item.briefing,
        width: item.briefingView?.width,
        height: item.briefingView?.height,
        viewBox: item.briefingView?.viewBox,
        alt: item.briefingAlt,
      },
    ];
    return `
      <div class="case-grid">
        <section class="briefing-card ${briefings.length > 1 ? "paired-briefing" : ""} ${item.decisionCue ? "briefing-card-cue" : ""}">
          ${
            item.decisionCue
              ? `<div class="decision-cue">
                  <span class="decision-cue-icon">${ICONS.shield}</span>
                  <span class="decision-cue-label">${esc(item.decisionCue.label)}</span>
                  <h2>${esc(item.decisionCue.title)}</h2>
                  <p>${esc(item.decisionCue.text)}</p>
                </div>`
              : briefings
                  .map(
                    (briefing) => `
                      <figure class="briefing-frame">
                        ${briefing.label ? `<figcaption>${esc(briefing.label)}</figcaption>` : ""}
                        ${briefing.viewBox ? briefingMedia(briefing) : `<img src="${briefing.src}" loading="lazy" decoding="async" alt="${esc(briefing.alt)}">`}
                      </figure>`,
                  )
                  .join("")
          }
        </section>
        <aside class="challenge ${["oxygen-combined", "transfer-combined"].includes(item.type) ? "combined-challenge" : ""}">
          <div class="challenge-kicker">${ICONS.alert}Decision point</div>
          <div class="key-information">
            <span>Background information</span>
            <p>${item.background}</p>
          </div>
          <h2>${item.question}</h2>
          <div class="decision-controls" ${decisionComplete ? 'inert aria-disabled="true"' : ""}>
            ${interaction(item)}
          </div>
          ${decisionFeedback(item)}
          <div class="action-row">
            ${
              decisionComplete
                ? `<button class="secondary decision-confirmed" disabled>${ICONS.check}Decision confirmed</button>`
                : decisionSubmitVisible
                  ? `<button class="primary" data-submit>Lock in answer${ICONS.arrow}</button>`
                  : ""
            }
          </div>
        </aside>
      </div>`;
  }

  function interaction(item) {
    if (item.type === "dose") return doseInteraction();
    if (item.type === "single-choice") return singleChoiceInteraction(item);
    if (item.type === "syringe") return syringeInteraction();
    if (item.type === "identity") return identityInteraction();
    if (item.type === "barcode") return barcodeInteraction();
    if (item.type === "clinical-context") return clinicalContextInteraction();
    if (item.type === "infusion-route") return infusionRouteInteraction();
    if (item.type === "oxygen-combined") return oxygenCombinedInteraction();
    if (item.type === "transfer-combined") return transferCombinedInteraction();
    if (item.type === "evidence-gate") return ngEvidenceInteraction();
    if (item.type === "tourniquet-loop") return tourniquetLoopInteraction();
    return dentureAdmissionInteraction();
  }

  function singleChoiceInteraction(item) {
    if (item.id === "wrong-patient-distraction") return interruptionInteraction();
    if (item.id === "adrenaline-route") return orderClarificationInteraction();
    if (item.id === "mouthwash-ng") return cupInspectionInteraction();
    if (item.id === "specimen-bottle") return specimenControlInteraction();

    return `<div class="choices">${item.decisionOptions
      .map((option) =>
        choice(
          "single-choice",
          option.value,
          option.title,
          option.detail,
          runtime.simpleChoice === option.value,
        ),
      )
      .join("")}</div>`;
  }

  function interruptionInteraction() {
    const checkpoints = [
      ["patient", "Right patient", "Patient", "🪪"],
      ["drug", "Right drug", "Drug", "💊"],
      ["time", "Right time", "Time", "⏰"],
      ["dosage", "Right dosage", "Dosage", "💉"],
      ["route", "Right route", "Route", "🛣️"],
    ];
    const actions = [
      ["resume", "Resume medication administration", "Continue from where you stopped"],
      ["new-pass", "Start over", "Restart the medication administration check"],
    ];
    const showCheckpoints = runtime.interruptionAction === "new-pass";

    return `
      <div class="interactive-board interruption-board">
        <div class="board-section-label"><span>Action</span></div>
        <div class="action-pick action-pick-2">
          ${actions
            .map(
              ([value, label, detail]) => `
                <button class="action-button ${runtime.interruptionAction === value ? "selected" : ""}" data-interruption-action="${value}" type="button" aria-pressed="${runtime.interruptionAction === value}">
                  <strong>${label}</strong><small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
        ${
          showCheckpoints
            ? `
        <div class="board-section-label"><span>Checkpoints</span><strong>${runtime.interruptionChecks.length} / ${checkpoints.length}</strong></div>
        <div class="control-grid control-grid-5">
          ${checkpoints
            .map(
              ([value, label, short, icon]) => `
                <button class="control-card ${runtime.interruptionChecks.includes(value) ? "selected" : ""}" data-interruption-check="${value}" type="button" aria-pressed="${runtime.interruptionChecks.includes(value)}">
                  <span class="control-icon checkpoint-icon ${value}" aria-hidden="true">${icon}</span>
                  <strong>${label}</strong>
                  <small>${short}</small>
                </button>`,
            )
            .join("")}
        </div>`
            : ""
        }
      </div>`;
  }

  function orderClarificationInteraction() {
    const fields = [
      [
        "orderRoute",
        "Route",
        [
          ["not-stated", "Not stated"],
          ["iv", "IV"],
          ["im", "IM"],
        ],
      ],
      [
        "orderConcentration",
        "Concentration",
        [
          ["not-stated", "Not stated"],
          ["1:10,000", "1:10,000"],
          ["1:1,000", "1:1,000"],
        ],
      ],
      [
        "orderDose",
        "Dose",
        [
          ["not-stated", "Not stated"],
          ["1 mg", "1 mg"],
          ["0.5 mg", "0.5 mg"],
        ],
      ],
    ];
    const actions = [
      ["proceed", "Proceed", "Proceed with the injection"],
      ["clarify", "Clarify", "Clarify the prescription"],
    ];

    return `
      <div class="interactive-board order-board">
        <div class="order-slip">
          <div class="order-slip-head"><span>Verbal order</span><strong>ADRENALINE</strong></div>
          <div class="order-slip-line"><span>Urgent</span><i></i><span>Injection</span></div>
        </div>
        <div class="order-fields">
          ${fields
            .map(
              ([field, label, options]) => `
                <div class="order-field">
                  <div class="board-section-label"><span>${label}</span><strong>${runtime[field] || "—"}</strong></div>
                  <div class="order-values">
                    ${options
                      .map(
                        ([value, optionLabel]) => `
                          <button class="order-value ${runtime[field] === value ? "selected" : ""}" data-order-field="${field}" data-order-value="${value}" type="button" aria-pressed="${runtime[field] === value}">${optionLabel}</button>`,
                      )
                      .join("")}
                  </div>
                </div>`,
            )
            .join("")}
        </div>
        <div class="board-section-label action-label"><span>Action</span></div>
        <div class="action-pick action-pick-2">
          ${actions
            .map(
              ([value, label, detail]) => `
                <button class="action-button ${runtime.orderAction === value ? "selected" : ""}" data-order-action="${value}" type="button" aria-pressed="${runtime.orderAction === value}">
                  <strong>${label}</strong><small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  function cupInspectionInteraction() {
    const checks = [
      ["label", "Label present", "Cup"],
      ["contents", "Contents", "Liquid"],
      ["medication-order", "Medication order", "Order"],
    ];
    const actions = [
      ["proceed", "Proceed", "Proceed with medication administration"],
      ["clarify", "Seek clarification", "Clarify before proceeding"],
    ];

    return `
      <div class="interactive-board tray-board">
        <div class="tray-visual">
          <div class="tray-surface"><div class="cup-visual"><i>?</i><span></span></div><div class="tray-syringe"><i></i></div><div class="tray-strip"></div></div>
          <div class="tray-readout"><span>Tray item</span><strong>Unlabelled cup</strong></div>
        </div>
        <div class="board-section-label"><span>Inspection</span><strong>${runtime.cupChecks.length} / ${checks.length}</strong></div>
        <div class="control-grid control-grid-3">
          ${checks
            .map(
              ([value, label, short]) => `
                <button class="control-card ${runtime.cupChecks.includes(value) ? "selected" : ""}" data-cup-check="${value}" type="button" aria-pressed="${runtime.cupChecks.includes(value)}">
                  <span class="control-icon ${value}"><i></i></span>
                  <strong>${label}</strong>
                  <small>${short}</small>
                </button>`,
            )
            .join("")}
        </div>
        <div class="board-section-label action-label"><span>Action</span></div>
        <div class="action-pick action-pick-2">
          ${actions
            .map(
              ([value, label, detail]) => `
                <button class="action-button ${runtime.cupAction === value ? "selected" : ""}" data-cup-action="${value}" type="button" aria-pressed="${runtime.cupAction === value}">
                  <strong>${label}</strong><small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  function specimenControlInteraction() {
    const storageOptions = [
      ["bedside", "Bedside", "Patient area"],
      ["relative", "Relative", "Handed over"],
      ["control", "Controlled area", "Staff area"],
    ];

    return `
      <div class="interactive-board specimen-board">
        <div class="specimen-visual">
          <div class="specimen-bottle"><i></i><b></b><span></span></div>
          <div class="specimen-readout"><span>Specimen container</span><strong>Preservative present</strong></div>
        </div>
        <div class="board-section-label"><span>Location</span><strong>${runtime.specimenStorage || "—"}</strong></div>
        <div class="storage-control-grid">
          ${storageOptions
            .map(
              ([value, label, detail]) => `
                <button class="storage-control ${runtime.specimenStorage === value ? "selected" : ""}" data-specimen-storage="${value}" type="button" aria-pressed="${runtime.specimenStorage === value}">
                  <span class="storage-control-icon ${value}"></span><strong>${label}</strong><small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
        <div class="specimen-toggles">
          ${toggle("specimenLabel", "Label attached", "Container", runtime.specimenLabel)}
          ${toggle("specimenExplained", "Purpose explained", "Patient / relative", runtime.specimenExplained)}
        </div>
      </div>`;
  }

  function doseInteraction() {
    const count = runtime.tablets;
    const whole = Math.floor(count);
    const hasHalf = count % 1 !== 0;
    const pills =
      '<span class="tablet"></span>'.repeat(whole) +
      (hasHalf ? '<span class="half-tablet"></span>' : "");

    return `
      <div class="answer-panel tablet-answer">
        <span class="answer-label">Your answer</span>
        <div class="large-stepper">
          <button data-dose="-0.5" aria-label="Remove half a tablet">−</button>
          <strong>${formatTabletCount(count)}</strong>
          <button data-dose="0.5" aria-label="Add half a tablet">+</button>
        </div>
        <span class="answer-unit">tablets</span>
        <div class="pill-tray">${pills || '<span class="empty-tray">No tablets selected</span>'}</div>
      </div>`;
  }

  function formatTabletCount(value) {
    const whole = Math.floor(value);
    if (value % 1 === 0) return String(whole);
    return whole ? `${whole}½` : "½";
  }

  function syringeInteraction() {
    const volume = runtime.volume;
    return `
      <div class="answer-panel syringe-answer">
        <span class="answer-label">Volume to prepare</span>
        <div class="volume-stepper">
          <button data-volume="-1" aria-label="Remove one millilitre">−</button>
          <strong>${volume}<small>mL</small></strong>
          <button data-volume="1" aria-label="Add one millilitre">+</button>
        </div>
        <div class="syringe" style="--fill:${(volume / 15) * 100}%;--label:${runtime.label ? 1 : 0}">
          <div class="plunger"></div>
          <div class="barrel">
            <div class="fill"></div>
            <div class="syr-label">Dormicum · dose / concentration</div>
          </div>
          <div class="tip"></div>
        </div>
        ${toggle("label", "Medication label attached", "Drug, dose/concentration and preparation details", runtime.label)}
        ${toggle("double", "Doctor to recheck the medication before administration", "Final drug and dose check before administration", runtime.double)}
      </div>`;
  }

  function toggle(name, title, subtitle, enabled) {
    return `
      <div class="toggle-row">
        <div class="toggle-copy"><strong>${title}</strong><span>${subtitle}</span></div>
        <button class="switch ${enabled ? "on" : ""}" data-toggle="${name}" aria-pressed="${enabled}" aria-label="${title}"><i></i></button>
      </div>`;
  }

  function choice(name, value, title, subtitle = "", checked = false) {
    return `
      <label class="choice">
        <input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""}>
        <span class="choice-dot"></span>
        <span class="choice-copy"><strong>${title}</strong>${subtitle ? `<span>${subtitle}</span>` : ""}</span>
      </label>`;
  }

  function identityInteraction() {
    const actions = [
      ["continue", "Continue", "Administer medication"],
      ["verify", "Verify", "Patient and medication order"],
    ];

    return `
      <div class="interactive-board scanner-board">
        <div class="scanner-console">
          <div class="scanner-console-head"><span>Patient identity</span><strong>Alert</strong></div>
          <div class="scanner-window"><span class="scanner-corner top-left"></span><span class="scanner-corner top-right"></span><span class="scanner-corner bottom-left"></span><span class="scanner-corner bottom-right"></span><i></i><b>NOT MATCHED</b></div>
          <div class="scanner-console-foot"><span>Patient</span><b>≠</b><span>Medication order</span></div>
        </div>
        <div class="board-section-label action-label"><span>Action</span></div>
        <div class="action-pick action-pick-2">
          ${actions
            .map(
              ([value, label, detail]) => `
                <button class="action-button ${runtime.identityAction === value ? "selected" : ""}" data-identity-action="${value}" type="button" aria-pressed="${runtime.identityAction === value}">
                  <strong>${label}</strong><small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  function clinicalContextInteraction() {
    const checks = [
      ["medication-order", "Medication order", "Order"],
      ["allergy-history", "Allergy history and status", "History + status"],
      ["laboratory-result", "Laboratory result", "Current result"],
    ];

    return `
      <div class="interactive-board chart-board">
        <div class="board-section-label"><span>Checks before administration</span><strong>${runtime.contextChecks.length} / ${checks.length}</strong></div>
        <div class="control-grid control-grid-3">
          ${checks
            .map(
              ([value, label, detail]) => `
                <button
                  class="control-card ${runtime.contextChecks.includes(value) ? "selected" : ""}"
                  data-context-check="${value}"
                  type="button"
                  aria-pressed="${runtime.contextChecks.includes(value)}"
                >
                  <span class="control-icon ${value}"><i></i></span>
                  <strong>${label}</strong>
                  <small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  function infusionRouteInteraction() {
    const points = [
      ["iv-access", "IV access", "Patient-side patency"],
      ["stopcock", "Three-way stopcock", "Direction and all ports"],
      ["tubing", "Primary infusion tubing", "Kinks, clamps, and connections"],
      ["pump", "Infusion pump", "Correct setup and programmed delivery"],
    ];
    const checked = runtime.infusionPoints.length;

    return `
      <div class="infusion-check">
        <div class="route-progress">
          <span class="form-label">Tap every checkpoint</span>
          <strong>${checked} / ${points.length} checked</strong>
        </div>
        <div class="infusion-route" aria-label="IV Dopamine infusion route">
          ${points
            .map(
              ([value, label, detail]) => `
                <button
                  class="route-node ${runtime.infusionPoints.includes(value) ? "selected" : ""}"
                  data-line-point="${value}"
                  type="button"
                  aria-pressed="${runtime.infusionPoints.includes(value)}"
                >
                  <i>${runtime.infusionPoints.includes(value) ? "✓" : ""}</i>
                  <strong>${label}</strong>
                  <span>${detail}</span>
                </button>`,
            )
            .join("")}
        </div>
        <p class="interaction-note">A blockage can occur anywhere along the route. Confirm all four checkpoints before starting the infusion.</p>
      </div>`;
  }

  function oxygenCombinedInteraction() {
    return `
      <div class="combined-rounds">
        <section class="combined-round">
          <div class="round-head"><span>Round 1</span><strong>Connect and verify delivery</strong></div>
          ${oxygenConnectionInteraction()}
        </section>
        <section class="combined-round">
          <div class="round-head"><span>Round 2</span><strong>Complete Oxygen Cylinder Safety 3-2-1</strong></div>
          ${oxygenSequenceInteraction()}
        </section>
      </div>`;
  }

  function oxygenConnectionInteraction() {
    const sourceOptions = [
      ["cylinder", "Oxygen-cylinder outlet", "Correct source for the prescribed oxygen"],
      ["open", "Leave the tubing open", "Cannula remains disconnected from a source"],
      ["suction", "Suction outlet", "Wrong system - Never use for oxygen delivery"],
    ];

    return `
      <div class="oxygen-check">
        <span class="form-label">Connect the nasal cannula tubing</span>
        <div class="source-pick">
          ${sourceOptions
            .map(
              ([value, label, detail]) => `
                <button
                  class="source-option ${runtime.oxygenSource === value ? "selected" : ""}"
                  data-oxygen-source="${value}"
                  type="button"
                >
                  <span class="source-port"></span>
                  <strong>${label}</strong>
                  <small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
        <div class="answer-panel oxygen-flow">
          <span class="answer-label">Flow-rate verification</span>
          <div class="volume-stepper">
            <button data-oxygen-flow="-1" aria-label="Reduce oxygen flow by one litre per minute">−</button>
            <strong>${runtime.oxygenFlow}<small>L/min</small></strong>
            <button data-oxygen-flow="1" aria-label="Increase oxygen flow by one litre per minute">+</button>
          </div>
        </div>
      </div>`;
  }

  function oxygenSequenceInteraction() {
    const steps = [
      ["valve", "Open cylinder valve", "Start the oxygen supply"],
      ["content", "Check content level", "Confirm sufficient oxygen remains"],
      ["flow", "Set the flow rate", "Set and verify the prescribed delivery"],
    ];
    const displaySteps = [steps[1], steps[2], steps[0]];

    return `
      <div class="sequence-check">
        <div class="sequence-head">
          <span class="form-label">Tap the steps in order</span>
          <button type="button" class="sequence-reset" data-cylinder-reset>Reset sequence</button>
        </div>
        <div class="sequence-grid">
          ${displaySteps
            .map(([value, label, detail]) => {
              const selectedIndex = runtime.cylinderSequence.indexOf(value);
              return `
                <button
                  class="sequence-step ${selectedIndex >= 0 ? "selected" : ""}"
                  data-cylinder-step="${value}"
                  type="button"
                  aria-pressed="${selectedIndex >= 0}"
                >
                  <i>${selectedIndex >= 0 ? selectedIndex + 1 : "+"}</i>
                  <strong>${label}</strong>
                  <span>${detail}</span>
                </button>`;
            })
            .join("")}
        </div>
        <div class="sequence-readout">
          <span>3-2-1 sequence</span>
          <strong>${
            runtime.cylinderSequence.length
              ? runtime.cylinderSequence
                  .map((value) => steps.find((step) => step[0] === value)?.[1])
                  .join(" → ")
              : "No steps selected"
          }</strong>
        </div>
      </div>`;
  }

  function transferGapInteraction() {
    return `
      <div class="transfer-check">
        <div class="transfer-bay ${runtime.gapClosed ? "closed" : ""}">
          <div class="transfer-surface stretcher-surface">
            <span>OT stretcher</span>
            <strong>${runtime.stretcherLocked ? "Locked" : "Unlocked"}</strong>
          </div>
          <div class="transfer-gap-indicator">
            <i></i>
            <span>${runtime.gapClosed ? "Surfaces aligned" : "Surfaces not aligned"}</span>
          </div>
          <div class="transfer-surface bed-surface">
            <span>Electric bed</span>
            <strong>${runtime.bedLocked ? "Locked" : "Unlocked"}</strong>
          </div>
        </div>
        <div class="route-checklist">
          ${toggle("stretcherLocked", "OT stretcher secured", "Lock or stabilise the first transfer surface", runtime.stretcherLocked)}
          ${toggle("bedLocked", "Electric bed secured", "Prevent the bed sliding away during movement", runtime.bedLocked)}
          <div class="toggle-row">
            <div class="toggle-copy"><strong>Transfer surfaces aligned</strong><span>Bring the surfaces together and remove the unsafe gap</span></div>
            <button class="gap-button ${runtime.gapClosed ? "on" : ""}" data-transfer-gap type="button" aria-pressed="${runtime.gapClosed}">
              ${runtime.gapClosed ? "Aligned" : "Align"}
            </button>
          </div>
        </div>
      </div>`;
  }

  function transferCombinedInteraction() {
    return `
      <div class="combined-rounds">
        <section class="combined-round">
          <div class="round-head"><span>Round 1</span><strong>Secure and align the transfer surfaces</strong></div>
          ${transferGapInteraction()}
        </section>
        <section class="combined-round">
          <div class="round-head"><span>Round 2</span><strong>Clear the sling and hoist safety gate</strong></div>
          ${hoistCheckInteraction()}
        </section>
      </div>`;
  }

  function hoistCheckInteraction() {
    const safeChecks = [runtime.slingSelected, runtime.slingFitted, runtime.slingPositioned, runtime.slingFastened];
    return `
      <div class="hoist-check">
        <div class="hoist-gate">
          <span>Select only the safe pre-lift checks</span>
          <strong>${safeChecks.filter(Boolean).length} / 4 safe checks selected</strong>
        </div>
        <div class="route-checklist">
          ${toggle("slingSelected", "Correct sling selected", "Match the sling and accessories to the patient and transfer", runtime.slingSelected)}
          ${toggle("testLift", "Begin a test lift before every attachment is checked", "Use movement to settle the sling and reveal any loose connection", runtime.testLift)}
          ${toggle("slingFitted", "Sling fitted correctly", "Confirm full support before lifting", runtime.slingFitted)}
          ${toggle("staffHold", "Rely on staff to hold the patient if one clip is uncertain", "Continue slowly while staff compensate for the incomplete attachment", runtime.staffHold)}
          ${toggle("slingPositioned", "Patient positioned safely", "Check posture and sling placement", runtime.slingPositioned)}
          ${toggle("slingFastened", "All attachments fastened", "Verify every required hoist connection", runtime.slingFastened)}
        </div>
      </div>`;
  }

  function ngEvidenceInteraction() {
    const evidence = [
      ["feed-order", "Feeding order", "Order"],
      ["cxr-available", "Chest X-ray available", "CXR"],
      ["position-confirmed", "Doctor's notes on NG tube position confirmation", "Position note"],
    ];
    const actions = [
      ["proceed", "Proceed with feeding", "Start the feeding"],
      ["clarify", "Seek clarification", "Confirm before feeding"],
    ];

    return `
      <div class="interactive-board evidence-packet">
        <div class="board-section-label"><span>Checks before feeding</span><strong>${runtime.ngEvidenceSteps.length} / ${evidence.length}</strong></div>
        <div class="control-grid control-grid-3">
          ${evidence
            .map(
              ([value, label, short]) => `
                <button class="control-card ${runtime.ngEvidenceSteps.includes(value) ? "selected" : ""}" data-ng-evidence-step="${value}" type="button" aria-pressed="${runtime.ngEvidenceSteps.includes(value)}">
                  <span class="control-icon ${value}"><i></i></span>
                  <strong>${label}</strong>
                  <small>${short}</small>
                </button>`,
            )
            .join("")}
        </div>
        <div class="board-section-label action-label"><span>Action</span></div>
        <div class="action-pick action-pick-2">
          ${actions
            .map(
              ([value, label, detail]) => `
                <button class="action-button ${runtime.ngAction === value ? "selected" : ""}" data-ng-action="${value}" type="button" aria-pressed="${runtime.ngAction === value}">
                  <strong>${label}</strong><small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  function tourniquetLoopInteraction() {
    const arms = [
      ["left", "Left upper limb", "Blood was finally drawn here"],
      ["right", "Right upper limb", "Previous blood-taking attempt site"],
    ];
    const actions = [
      ["remove-store", "Remove it immediately and return it to storage", "Close the patient and equipment loop before leaving"],
      ["remove-bedside", "Remove it and leave it at the bedside", "The item remains unaccounted for after the procedure"],
      ["next-shift", "Ask the next shift to check later", "The patient remains exposed to a preventable delay"],
    ];

    return `
      <div class="tourniquet-check">
        <span class="form-label">Which sites would you select to check for a retained tourniquet? (${runtime.tourniquetArms.length} / 2 selected)</span>
        <div class="arm-pick">
          ${arms
            .map(
              ([value, label, detail]) => `
                <button
                  class="arm-option ${runtime.tourniquetArms.includes(value) ? "selected" : ""}"
                  data-tourniquet-arm="${value}"
                  type="button"
                  aria-pressed="${runtime.tourniquetArms.includes(value)}"
                >
                  <span class="arm-icon"><i></i></span>
                  <strong>${label}</strong>
                  <small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
        <span class="form-label closeout-label">Choose the safest close-out action</span>
        <div class="closeout-pick">
          ${actions
            .map(
              ([value, label, detail]) => `
                <button
                  class="closeout-option ${runtime.tourniquetAction === value ? "selected" : ""}"
                  data-tourniquet-action="${value}"
                  type="button"
                  aria-pressed="${runtime.tourniquetAction === value}"
                >
                  <strong>${label}</strong>
                  <small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  function dentureAdmissionInteraction() {
    const storageOptions = [
      ["tissue", "Tissue paper", "Bedside"],
      ["tray", "Meal tray", "Tray"],
      ["box", "Denture box", "Storage"],
    ];
    const storageUnlocked = runtime.dentureAssessed;
    const documentationUnlocked = storageUnlocked && Boolean(runtime.dentureStorage);

    return `
      <div class="interactive-board property-board">
        <div class="property-visual">
          <div class="denture-visual"><span></span><i></i></div>
          <div class="property-readout"><span>Personal item</span><strong>Denture</strong></div>
        </div>
        <div class="property-sequence">
          ${toggle("dentureAssessed", "Assess the patient's denture", "Inspect the denture before choosing storage", runtime.dentureAssessed)}
        </div>
        <div class="board-section-label"><span>Storage location</span><strong>${runtime.dentureStorage || "—"}</strong></div>
        <div class="storage-control-grid">
          ${storageOptions
            .map(
              ([value, label, detail]) => `
                <button
                  class="storage-control property-storage ${runtime.dentureStorage === value ? "selected" : ""} ${storageUnlocked ? "" : "locked"}"
                  data-denture-storage="${value}"
                  type="button"
                  ${storageUnlocked ? "" : "disabled"}
                  aria-disabled="${!storageUnlocked}"
                  aria-pressed="${runtime.dentureStorage === value}"
                >
                  <span class="storage-control-icon ${value}"></span>
                  <strong>${label}</strong>
                  <small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
        ${
          documentationUnlocked
            ? `<div class="property-toggles">${toggle("dentureDocumented", "Documentation regarding patient's denture", "Complete the record after selecting storage", runtime.dentureDocumented)}</div>`
            : `<p class="property-next-step">Assess the denture first, then choose a storage location to unlock documentation.</p>`
        }
      </div>`;
  }

  function barcodeInteraction() {
    let status = "Awaiting barcode verification";
    let statusClass = "";
    if (runtime.scanMode === "scan") {
      status = "2D scan complete - Verify the physical formulation";
      statusClass = "safe";
    } else if (runtime.scanMode === "bypass") {
      status = "Gatekeeping has been bypassed";
      statusClass = "danger";
    }

    return `
      <div class="console">
        <div class="console-screen">
          <small>Prescribed formulation</small>
          <strong>Morphine Sulphate prolonged-release tablets</strong>
          <div class="console-status ${statusClass}">${runtime.scanMode === "bypass" ? ICONS.alert : ICONS.shield}<span>${status}</span></div>
        </div>
        <div class="console-actions">
          <button class="console-btn ${runtime.scanMode === "scan" ? "selected" : ""}" data-mode="scan">Scan 2D barcode</button>
          <button class="console-btn bypass ${runtime.scanMode === "bypass" ? "selected" : ""}" data-mode="bypass">Long-hold · bypass</button>
        </div>
      </div>
      <span class="form-label">Medication selected for administration</span>
      <div class="med-pick">
        <button class="med ${runtime.medication === "tablet" ? "selected" : ""}" data-med="tablet">
          <strong>Prolonged-release tablets</strong>
          <span>Solid oral modified-release formulation</span>
          <span class="tablet-pack">${'<i class="tablet-dot"></i>'.repeat(4)}</span>
        </button>
        <button class="med ${runtime.medication === "syrup" ? "selected" : ""}" data-med="syrup">
          <strong>Morphine syrup</strong>
          <span>Oral liquid formulation</span>
          <i class="bottle"></i>
        </button>
      </div>`;
  }

  function decisionFeedback(item) {
    if (runtime.phase !== "decision") {
      return `
        <div class="feedback correct">
          ${ICONS.check}
          <div><strong>Correct decision</strong><span>${runtime.phase === "complete" ? "This decision is recorded as complete." : "The real incident is now open below."}</span></div>
        </div>`;
    }
    if (!runtime.feedback) return "";
    return `
      <div class="feedback wrong">
        ${ICONS.alert}
        <div><strong>Not quite - Try again</strong><span>${item.wrong}</span></div>
      </div>`;
  }

  function comicPage(item, config = {}) {
    const comics = item.comics || [{ label: "Incident comic", src: item.comic }];
    const reviewed = config.reviewed ?? ["debrief", "complete"].includes(runtime.phase);
    const nextAttribute = config.nextAttribute || "data-next-debrief";
    const waiting = !reviewed && Date.now() < runtime.comicReadyAt;
    const seconds = waiting ? Math.max(1, Math.ceil((runtime.comicReadyAt - Date.now()) / 1000)) : 0;
    return `
      <section class="comic-stage">
        <div class="comic-gallery ${comics.length > 1 ? "multiple" : ""}">
          ${comics
            .map(
              (comic) => `
                <figure class="comic-panel ${comic.className ? esc(comic.className) : ""}">
                  <div class="comic-reveal" role="img" aria-label="${esc(`${item.title} - ${comic.label || "Incident comic"}`)}">
                    ${
                      comic.viewBox
                        ? `<svg class="comic-crop" data-lazy-src="${esc(comic.src)}" viewBox="${comic.viewBox}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(`${item.title} - ${comic.label || "Incident comic"}`)}">
                            <image width="${comic.width}" height="${comic.height}"></image>
                          </svg>`
                        : comicMedia(comic, item.title)
                    }
                  </div>
                </figure>`,
            )
            .join("")}
        </div>
        <div class="comic-next">
          ${
            reviewed
              ? `<span class="reviewed-state">${ICONS.check}Incident reviewed</span>`
              : `<button class="primary comic-review-button" ${nextAttribute} ${waiting ? "disabled" : ""}>${
                  waiting ? `Continue in ${seconds}s` : `I have reviewed the incident${ICONS.arrow}`
                }</button>`
          }
        </div>
      </section>`;
  }

  function debriefPage(item) {
    const missionComplete = runtime.phase === "complete";
    const riskItems = DEBRIEF[item.id] || [];
    const riskCards = riskItems
      .map(
        (risk) => `
          <article class="risk-card" data-incident-consequence>
            <span class="risk-skull" aria-hidden="true">☠️</span>
            <div class="risk-card-body">
              ${risk.label ? `<span class="risk-case">${esc(risk.label)}</span>` : ""}
              <ul class="risk-list">
                ${risk.consequences.map((consequence) => `<li>${esc(consequence)}</li>`).join("")}
              </ul>
            </div>
          </article>`,
      )
      .join("");
    const teachOrder = runtime.teachOrder?.length
      ? runtime.teachOrder
      : item.teach.options.map((_, index) => index);
    const options = teachOrder
      .map((index) => {
        const option = item.teach.options[index];
        return choice("teach", index, option.text, "", runtime.teachChoice === index);
      })
      .join("");

    return `
      <section class="debrief-stage">
        <section class="risk-brief" aria-labelledby="risk-title-${item.id}">
          <div class="risk-heading">
            <h2 id="risk-title-${item.id}">POSSIBLE SERIOUS CONSEQUENCES</h2>
          </div>
          <div class="risk-grid ${riskItems.length > 1 ? "multiple" : ""}">${riskCards}</div>
        </section>
        <div class="challenge-kicker">${ICONS.shield}Teach-back</div>
        <h2>${item.teach.question}</h2>
        <div class="choices teach-choices" ${missionComplete ? 'inert aria-disabled="true"' : ""}>${options}</div>
        ${
          runtime.teachFeedback
            ? `<div class="feedback ${runtime.teachCorrect ? "correct" : "wrong"}">
                ${runtime.teachCorrect ? ICONS.check : ICONS.alert}
                <div>
                  <strong>${runtime.teachCorrect ? "Correct - Mission now complete" : "Reconsider this choice"}</strong>
                  <span>${runtime.teachFeedback}</span>
                </div>
              </div>`
            : ""
        }
        <div class="action-row">
          ${
            missionComplete
              ? `<button class="secondary decision-confirmed" disabled>${ICONS.check}Mission completed</button>`
              : runtime.teachCorrect
              ? `<button class="primary" data-finish>Complete mission${ICONS.arrow}</button>`
              : '<button class="secondary" data-confirm>Confirm reflection</button>'
          }
        </div>
      </section>`;
  }

  function missionResult(item) {
    const stars = runtime.resultStars || starsForAttempts(runtime.attempts);
    const allComplete = Object.keys(state.completed).filter(caseById).length === CASES.length;
    return `
      <section class="mission-result" aria-live="polite">
        <span class="mission-result-kicker">Mission Stars</span>
        <strong class="mission-result-stars">${starDisplay(stars)}</strong>
        <h2>Mission ${item.n} complete</h2>
        <div class="mission-result-reassurance" aria-label="How Mission Stars are earned">
          <span><strong>3 ★:</strong> Correct on the 1st attempt</span>
          <span><strong>2 ★:</strong> Correct on the 2nd attempt</span>
          <span><strong>1 ★:</strong> Correct on the 3rd or later attempt</span>
        </div>
        <p class="mission-result-remark"><strong>Remarks:</strong> The Mission Stars are for fun only. Training completion is confirmed by the Final Quiz.</p>
        <div class="mission-result-actions">
          ${
            allComplete
              ? `<button class="primary" data-course-complete>${ICONS.shield}View course completion${ICONS.arrow}</button>
                 <button class="secondary" data-home>Review mission map</button>`
              : `<button class="primary" data-home>Back to mission map${ICONS.arrow}</button>`
          }
        </div>
      </section>`;
  }

  function completionPage() {
    const summary = stats();
    return `
      <div class="shell completion-shell">
        <section class="completion-card">
          <div class="celebration-rays"></div>
          <span class="completion-shield">${ICONS.shield}</span>
          <span class="completion-kicker">Mission practice cleared</span>
          <h1>Mission Practice Complete</h1>
          <p>You have reviewed all ${INCIDENT_COUNT} clinical incidents across ${CASES.length} interactive missions. Training completion is confirmed only after the final quiz.</p>
          <div class="completion-score"><span>Mission Stars · For fun only</span><strong>${summary.stars} / ${summary.maxStars} ★</strong></div>
          <div class="mission-badges">
            ${CASES.map((item) => `<span><b>${item.n}</b><small>${item.category}</small></span>`).join("")}
          </div>
          ${state.quizPassed ? `<p class="quiz-completion-status">Final Quiz passed</p>` : ""}
          <div class="completion-actions">
            <button class="primary quiz-button" data-quiz>Continue to quiz${ICONS.arrow}</button>
            <button class="secondary" data-home>Review missions</button>
          </div>
        </section>
      </div>`;
  }

  function startQuizAttempt() {
    const attempt = (quizRuntime?.attempt || 0) + 1;
    const questions = shuffleItems(FINAL_QUIZ_QUESTIONS)
      .slice(0, 5)
      .map((question) => {
        const options = shuffleItems(
          question.options.map((option, sourceIndex) => ({ ...option, sourceIndex })),
        );
        if (options.length > 1 && options.every((option, index) => option.sourceIndex === index)) {
          [options[0], options[1]] = [options[1], options[0]];
        }
        return { ...question, options };
      });

    quizRuntime = {
      attempt,
      questions,
      answers: {},
      submitted: false,
      score: 0,
      passed: false,
    };
  }

  function submitQuiz() {
    if (!quizRuntime || quizRuntime.submitted) return;
    const answers = {};
    document.querySelectorAll("input[data-quiz-answer]:checked").forEach((input) => {
      answers[input.dataset.quizQuestion] = Number(input.value);
    });
    const score = quizRuntime.questions.reduce((total, question, index) => {
      const selected = answers[index];
      const answer = question.options.find((option) => option.sourceIndex === selected);
      return total + (answer?.correct ? 1 : 0);
    }, 0);

    quizRuntime.answers = answers;
    quizRuntime.score = score;
    quizRuntime.submitted = true;
    quizRuntime.passed = score === quizRuntime.questions.length && Object.keys(answers).length === quizRuntime.questions.length;
    if (quizRuntime.passed) {
      state.quizPassed = true;
      state.quizPassedAt = new Date().toISOString();
      save();
    }
    render();
    requestAnimationFrame(() => document.querySelector("[data-quiz-result]")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }

  function quizPage() {
    if (!quizRuntime) startQuizAttempt();
    const questionCount = quizRuntime.questions.length;
    const result = quizRuntime.submitted
      ? `<div class="quiz-result ${quizRuntime.passed ? "correct" : "wrong"}" data-quiz-result>
          <strong>${quizRuntime.passed ? `Quiz complete - ${quizRuntime.score} / ${questionCount} correct` : `Not yet - ${quizRuntime.score} / ${questionCount} correct`}</strong>
          <span>${quizRuntime.passed ? `All ${questionCount} answers are correct.` : "You may retry as many times as needed. A quiz attempt passes only when all five answers are correct."}</span>
        </div>`
      : "";

    return `
      <div class="shell quiz-shell">
        <section class="quiz-card" aria-labelledby="final-quiz-title">
          <h1 id="final-quiz-title">Final Quiz</h1>
          <div class="quiz-rule"><strong>Passing requirement</strong><span>Answer all 5 questions correctly. Unlimited attempts are allowed.</span></div>
          <div class="quiz-questions">
            ${quizRuntime.questions
              .map(
                (question, questionIndex) => `
                  <section class="quiz-question" aria-labelledby="quiz-question-${questionIndex}">
                    <div class="quiz-question-head"><span>Question ${questionIndex + 1}</span><strong id="quiz-question-${questionIndex}">${esc(question.question)}</strong></div>
                    <div class="quiz-stem">${question.stem.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</div>
                    <div class="quiz-options">
                      ${question.options
                        .map(
                          (option, optionIndex) => `
                            <label class="quiz-option ${quizRuntime.submitted && quizRuntime.answers[questionIndex] === option.sourceIndex && !option.correct ? "wrong-answer" : ""}">
                              <input
                                type="radio"
                                name="quiz-question-${questionIndex}"
                                value="${option.sourceIndex}"
                                data-quiz-answer
                                data-quiz-question="${questionIndex}"
                                ${quizRuntime.answers[questionIndex] === option.sourceIndex ? "checked" : ""}
                              >
                              <span class="quiz-option-letter">${String.fromCharCode(65 + optionIndex)}</span>
                              <span class="quiz-option-copy">${esc(option.text)}</span>
                            </label>`,
                        )
                        .join("")}
                    </div>
                  </section>`,
              )
              .join("")}
          </div>
          ${result}
          <div class="quiz-actions">
            ${
              quizRuntime.submitted
                ? `${quizRuntime.passed ? "" : `<button class="primary" data-quiz-retry type="button">Retry the quiz${ICONS.arrow}</button>`}`
                : `<button class="primary" data-quiz-submit type="button">Submit final quiz${ICONS.arrow}</button>`
            }
            <button class="secondary" data-back-complete type="button">Back to completion</button>
          </div>
        </section>
      </div>`;
  }

  function bindGlobal() {
    document.querySelectorAll("[data-home]").forEach((button) => {
      button.onclick = () => {
        runtime = null;
        go("");
      };
    });

    document.querySelector("[data-about]")?.addEventListener("click", () => {
      document.getElementById("aboutTitle").textContent = "About the course";
      document.getElementById("aboutBody").innerHTML =
        `<p><strong>Break the Chain:</strong> Revisits ${INCIDENT_COUNT} real clinical incidents through short interactive missions. Each mission asks the learner to decide what they would do at that moment, walk through the real case, and carry the lesson forward.</p><p><strong>Mission Stars:</strong> Stars obtained are based only on Part 1 of each mission: 3 ★ for a correct answer on the 1st attempt; 2 ★ on the 2nd attempt; and 1 ★ on the 3rd or later attempt.</p><p><strong>Remarks:</strong> The Mission Stars are for fun only. Training completion is confirmed by the Final Quiz.</p>`;
      normalizeVisiblePunctuation(document.getElementById("aboutBody"));
      document.getElementById("aboutDialog").showModal();
    });

    document.querySelector("[data-reset]")?.addEventListener("click", () => {
      if (confirm("Clear all mission completion records?")) {
        state.completed = {};
        state.quizPassed = false;
        state.quizPassedAt = null;
        runtime = null;
        quizRuntime = null;
        save();
        go("");
        render();
      }
    });

    document.querySelectorAll("[data-close-dialog]").forEach((button) => {
      button.onclick = () => {
        const dialog = button.closest("dialog");
        dialog.close();
        if (dialog.id === "imageDialog") resetViewer();
      };
    });

    document.querySelector("[data-course-complete]")?.addEventListener("click", () => go("complete"));
  }

  function bindHome() {
    document.querySelectorAll("[data-start]").forEach((control) => {
      const openMission = () => {
        runtime = null;
        go(`case/${control.dataset.start}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      control.onclick = openMission;

      if (control.classList.contains("mission-card")) {
        control.onkeydown = (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          openMission();
        };
      }
    });

    document.querySelector("[data-quiz]")?.addEventListener("click", () => {
      if (QUIZ_URL) {
        location.href = QUIZ_URL;
        return;
      }
      quizRuntime = null;
      go("quiz");
    });

    document.querySelector("[data-quiz-submit]")?.addEventListener("click", submitQuiz);

    document.querySelector("[data-quiz-retry]")?.addEventListener("click", () => {
      startQuizAttempt();
      render();
      window.scrollTo({ top: 0, behavior: "auto" });
    });

    document.querySelector("[data-back-complete]")?.addEventListener("click", () => go("complete"));
  }

  function bindCase(item) {
    if (!item) return;

    document.querySelectorAll("[data-dose]").forEach((button) => {
      button.onclick = () => {
        runtime.tablets = Math.max(0, Math.min(6, runtime.tablets + Number(button.dataset.dose)));
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-volume]").forEach((button) => {
      button.onclick = () => {
        runtime.volume = Math.max(0, Math.min(15, runtime.volume + Number(button.dataset.volume)));
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-toggle]").forEach((button) => {
      button.onclick = () => {
        runtime[button.dataset.toggle] = !runtime[button.dataset.toggle];
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-interruption-check]").forEach((button) => {
      button.onclick = () => {
        const check = button.dataset.interruptionCheck;
        runtime.interruptionChecks = runtime.interruptionChecks.includes(check)
          ? runtime.interruptionChecks.filter((value) => value !== check)
          : [...runtime.interruptionChecks, check];
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-interruption-action]").forEach((button) => {
      button.onclick = () => {
        runtime.interruptionAction = button.dataset.interruptionAction;
        if (runtime.interruptionAction === "resume") {
          runtime.interruptionChecks = [];
          runtime.feedback = "wrong";
        } else {
          runtime.feedback = null;
        }
        render();
      };
    });

    document.querySelectorAll("[data-identity-action]").forEach((button) => {
      button.onclick = () => {
        runtime.identityAction = button.dataset.identityAction;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-order-field]").forEach((button) => {
      button.onclick = () => {
        runtime[button.dataset.orderField] = button.dataset.orderValue;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-order-action]").forEach((button) => {
      button.onclick = () => {
        runtime.orderAction = button.dataset.orderAction;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-cup-check]").forEach((button) => {
      button.onclick = () => {
        const check = button.dataset.cupCheck;
        runtime.cupChecks = runtime.cupChecks.includes(check)
          ? runtime.cupChecks.filter((value) => value !== check)
          : [...runtime.cupChecks, check];
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-cup-action]").forEach((button) => {
      button.onclick = () => {
        runtime.cupAction = button.dataset.cupAction;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-specimen-storage]").forEach((button) => {
      button.onclick = () => {
        runtime.specimenStorage = button.dataset.specimenStorage;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll('input[name="identity"]').forEach((input) => {
      input.onchange = (event) => {
        runtime.idChoice = event.target.value;
        runtime.feedback = null;
      };
    });

    document.querySelectorAll('input[name="single-choice"]').forEach((input) => {
      input.onchange = (event) => {
        runtime.simpleChoice = event.target.value;
        runtime.feedback = null;
      };
    });

    document.querySelectorAll("[data-context-check]").forEach((button) => {
      button.onclick = () => {
        const check = button.dataset.contextCheck;
        runtime.contextChecks = runtime.contextChecks.includes(check)
          ? runtime.contextChecks.filter((value) => value !== check)
          : [...runtime.contextChecks, check];
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-ng-evidence-step]").forEach((button) => {
      button.onclick = () => {
        const step = button.dataset.ngEvidenceStep;
        runtime.ngEvidenceSteps = runtime.ngEvidenceSteps.includes(step)
          ? runtime.ngEvidenceSteps.filter((value) => value !== step)
          : [...runtime.ngEvidenceSteps, step];
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-ng-action]").forEach((button) => {
      button.onclick = () => {
        runtime.ngAction = button.dataset.ngAction;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-line-point]").forEach((button) => {
      button.onclick = () => {
        const point = button.dataset.linePoint;
        runtime.infusionPoints = runtime.infusionPoints.includes(point)
          ? runtime.infusionPoints.filter((value) => value !== point)
          : [...runtime.infusionPoints, point];
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-oxygen-source]").forEach((button) => {
      button.onclick = () => {
        runtime.oxygenSource = button.dataset.oxygenSource;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-oxygen-flow]").forEach((button) => {
      button.onclick = () => {
        runtime.oxygenFlow = Math.max(
          0,
          Math.min(15, runtime.oxygenFlow + Number(button.dataset.oxygenFlow)),
        );
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-cylinder-step]").forEach((button) => {
      button.onclick = () => {
        const step = button.dataset.cylinderStep;
        if (!runtime.cylinderSequence.includes(step)) runtime.cylinderSequence.push(step);
        runtime.feedback = null;
        render();
      };
    });

    document.querySelector("[data-cylinder-reset]")?.addEventListener("click", () => {
      runtime.cylinderSequence = [];
      runtime.feedback = null;
      render();
    });

    document.querySelector("[data-transfer-gap]")?.addEventListener("click", () => {
      runtime.gapClosed = !runtime.gapClosed;
      runtime.feedback = null;
      render();
    });

    document.querySelectorAll("[data-tourniquet-arm]").forEach((button) => {
      button.onclick = () => {
        const arm = button.dataset.tourniquetArm;
        runtime.tourniquetArms = runtime.tourniquetArms.includes(arm)
          ? runtime.tourniquetArms.filter((value) => value !== arm)
          : [...runtime.tourniquetArms, arm];
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-tourniquet-action]").forEach((button) => {
      button.onclick = () => {
        runtime.tourniquetAction = button.dataset.tourniquetAction;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-denture-storage]").forEach((button) => {
      button.onclick = () => {
        runtime.dentureStorage = button.dataset.dentureStorage;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.onclick = () => {
        runtime.scanMode = button.dataset.mode;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelectorAll("[data-med]").forEach((button) => {
      button.onclick = () => {
        runtime.medication = button.dataset.med;
        runtime.feedback = null;
        render();
      };
    });

    document.querySelector("[data-submit]")?.addEventListener("click", () => submitDecision(item));

    document.querySelectorAll("[data-oxygen-submit]").forEach((button) => {
      button.addEventListener("click", () => submitOxygenDecision(item, Number(button.dataset.oxygenSubmit)));
    });

    document.querySelector("[data-next-debrief]")?.addEventListener("click", () => {
      if (Date.now() < runtime.comicReadyAt) return;
      runtime.phase = "debrief";
      render();
      requestAnimationFrame(() =>
        document.getElementById("debrief-section")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    });

    document.querySelectorAll("[data-next-oxygen-debrief]").forEach((button) => {
      button.addEventListener("click", () => {
        if (Date.now() < runtime.comicReadyAt) return;
        const roundIndex = Number(button.dataset.nextOxygenDebrief);
        runtime.oxygenRoundStates[roundIndex].comicDone = true;
        runtime.phase = `oxygen-${roundIndex + 1}-debrief`;
        render();
        requestAnimationFrame(() =>
          document.getElementById(`oxygen-debrief-${roundIndex + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
      });
    });

    document.querySelectorAll('input[name="teach"]').forEach((input) => {
      input.onchange = (event) => {
        runtime.teachChoice = Number(event.target.value);
        runtime.teachCorrect = false;
        runtime.teachFeedback = null;
      };
    });

    document.querySelectorAll('input[name^="oxygen-teach-"]').forEach((input) => {
      input.onchange = (event) => {
        const roundIndex = Number(event.target.name.split("-").at(-1));
        const roundState = runtime.oxygenRoundStates[roundIndex];
        roundState.teachChoice = Number(event.target.value);
        roundState.teachCorrect = false;
        roundState.teachFeedback = null;
      };
    });

    document.querySelector("[data-confirm]")?.addEventListener("click", () => {
      if (runtime.teachChoice == null) {
        runtime.teachCorrect = false;
        runtime.teachFeedback = "Choose one response before confirming.";
      } else {
        const answer = item.teach.options[runtime.teachChoice];
        runtime.teachCorrect = answer.ok;
        runtime.teachFeedback = answer.why;
      }
      render();
    });

    document.querySelectorAll("[data-confirm-oxygen]").forEach((button) => {
      button.addEventListener("click", () => {
        const roundIndex = Number(button.dataset.confirmOxygen);
        const roundState = runtime.oxygenRoundStates[roundIndex];
        if (roundState.teachChoice == null) {
          roundState.teachCorrect = false;
          roundState.teachFeedback = "Choose one response before confirming.";
        } else {
          const answer = item.rounds[roundIndex].teach.options[roundState.teachChoice];
          roundState.teachCorrect = answer.ok;
          roundState.teachFeedback = answer.why;
        }
        render();
      });
    });

    document.querySelector("[data-next-oxygen-round]")?.addEventListener("click", () => {
      runtime.phase = "oxygen-2-decision";
      runtime.oxygenRound = 1;
      runtime.comicReadyAt = 0;
      render();
      requestAnimationFrame(() =>
        document.querySelectorAll(".oxygen-round-banner")[1]?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    });

    document.querySelector("[data-finish]")?.addEventListener("click", () => finishMission(item));
    bindComicCountdown();
  }

  function bindComicCountdown() {
    const button = document.querySelector("[data-next-debrief], [data-next-oxygen-debrief]:not([disabled])") ||
      document.querySelector("[data-next-oxygen-debrief]");
    if (!button || !runtime.comicReadyAt) return;

    const update = () => {
      const remaining = Math.max(0, Math.ceil((runtime.comicReadyAt - Date.now()) / 1000));
      if (remaining > 0) {
        button.disabled = true;
        button.textContent = `Continue in ${remaining}s`;
        return;
      }
      button.disabled = false;
      button.innerHTML = `I have reviewed the incident${ICONS.arrow}`;
      clearInterval(comicCountdownTimer);
    };

    update();
    comicCountdownTimer = setInterval(update, 250);
  }

  function submitOxygenDecision(item, roundIndex) {
    const roundState = runtime.oxygenRoundStates[roundIndex];
    const correctCylinderSequence = ["valve", "content", "flow"];
    const correct =
      roundIndex === 0
        ? runtime.oxygenSource === "cylinder" && runtime.oxygenFlow === 3
        : runtime.cylinderSequence.length === correctCylinderSequence.length &&
          runtime.cylinderSequence.every((value, index) => value === correctCylinderSequence[index]);

    runtime.attempts += 1;
    if (!correct) {
      roundState.feedback = "wrong";
      render();
      document.querySelector(".feedback.wrong")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    roundState.feedback = null;
    roundState.decisionDone = true;
    runtime.phase = `oxygen-${roundIndex + 1}-comic`;
    runtime.comicReadyAt = Date.now() + COMIC_REVIEW_SECONDS * 1000;
    render();
    requestAnimationFrame(() =>
      document.getElementById(`oxygen-incident-${roundIndex + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function submitDecision(item) {
    let correct = false;
    if (item.type === "dose") correct = Math.abs(runtime.tablets - 3) < 0.001;
    if (item.type === "single-choice") {
      if (item.id === "wrong-patient-distraction") {
        const checkpoints = ["patient", "drug", "time", "dosage", "route"];
        correct =
          runtime.interruptionChecks.length === checkpoints.length &&
          checkpoints.every((check) => runtime.interruptionChecks.includes(check)) &&
          runtime.interruptionAction === "new-pass";
      } else if (item.id === "adrenaline-route") {
        correct =
          runtime.orderRoute === "not-stated" &&
          runtime.orderConcentration === "not-stated" &&
          runtime.orderDose === "not-stated" &&
          runtime.orderAction === "clarify";
      } else if (item.id === "mouthwash-ng") {
        const checks = ["label", "contents", "medication-order"];
        correct =
          runtime.cupChecks.length === checks.length &&
          checks.every((check) => runtime.cupChecks.includes(check)) &&
          runtime.cupAction === "clarify";
      } else if (item.id === "specimen-bottle") {
        correct = runtime.specimenStorage === "control" && runtime.specimenLabel && runtime.specimenExplained;
      } else {
        correct = runtime.simpleChoice === item.correctDecision;
      }
    }
    if (item.type === "syringe") correct = runtime.volume === 3 && runtime.label && runtime.double;
    if (item.type === "identity") {
      correct = runtime.identityAction === "verify";
    }
    if (item.type === "barcode") correct = runtime.scanMode === "scan" && runtime.medication === "tablet";
    if (item.type === "clinical-context") {
      const requiredChecks = ["medication-order", "allergy-history", "laboratory-result"];
      correct =
        runtime.contextChecks.length === requiredChecks.length &&
        requiredChecks.every((check) => runtime.contextChecks.includes(check));
    }
    if (item.type === "infusion-route") {
      correct = ["iv-access", "stopcock", "tubing", "pump"].every((point) =>
        runtime.infusionPoints.includes(point),
      );
    }
    if (item.type === "oxygen-combined") {
      const correctCylinderSequence = ["valve", "content", "flow"];
      correct =
        runtime.oxygenSource === "cylinder" &&
        runtime.oxygenFlow === 3 &&
        runtime.cylinderSequence.length === correctCylinderSequence.length &&
        runtime.cylinderSequence.every((value, index) => value === correctCylinderSequence[index]);
    }
    if (item.type === "transfer-combined") {
      correct =
        runtime.stretcherLocked &&
        runtime.bedLocked &&
        runtime.gapClosed &&
        runtime.slingSelected &&
        runtime.slingFitted &&
        runtime.slingPositioned &&
        runtime.slingFastened &&
        !runtime.testLift &&
        !runtime.staffHold;
    }
    if (item.type === "evidence-gate") {
      const evidence = ["feed-order", "cxr-available", "position-confirmed"];
      correct =
        runtime.ngEvidenceSteps.length === evidence.length &&
        evidence.every((step) => runtime.ngEvidenceSteps.includes(step)) &&
        runtime.ngAction === "clarify";
    }
    if (item.type === "tourniquet-loop") {
      correct =
        ["left", "right"].every((arm) => runtime.tourniquetArms.includes(arm)) &&
        runtime.tourniquetAction === "remove-store";
    }
    if (item.type === "denture-admission") {
      correct =
        runtime.dentureAssessed &&
        runtime.dentureStorage === "box" &&
        runtime.dentureDocumented;
    }

    runtime.attempts += 1;

    if (correct) {
      runtime.feedback = null;
      runtime.phase = "comic";
      runtime.comicReadyAt = Date.now() + COMIC_REVIEW_SECONDS * 1000;
      render();
      requestAnimationFrame(() =>
        document.getElementById("incident-section")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
      return;
    }

    runtime.feedback = "wrong";
    render();
    document.querySelector(".feedback")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function finishMission(item) {
    const attempts = runtime.attempts;
    const scoringAttempts =
      item.type === "oxygen-combined"
        ? Math.max(1, attempts - Math.max(0, item.rounds.length - 1))
        : attempts;
    const stars = starsForAttempts(scoringAttempts);
    const previous = state.completed[item.id];

    state.completed[item.id] = {
      stars: Math.max(completionStars(previous), stars),
      lastStars: stars,
      attempts,
      completedAt: new Date().toISOString(),
    };
    save();
    runtime.phase = "complete";
    runtime.resultStars = stars;
    render();
    requestAnimationFrame(() =>
      document.querySelector(".mission-result")?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  }

  function toast(title, message) {
    document.querySelector(".toast")?.remove();
    const element = document.createElement("div");
    element.className = "toast";
    element.innerHTML = `${ICONS.check}<div><strong>${title}</strong><span>${message}</span></div>`;
    document.body.appendChild(element);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.remove(), 4200);
  }

  window.addEventListener("hashchange", render);
  bindImageViewer();
  render();
})();
