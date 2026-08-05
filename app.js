(() => {
  "use strict";

  const STORE = "incidentLearningGame.v2";
  const QUIZ_URL = "";
  const MAX_STARS = 3;
  const INCIDENT_COUNT = 17;

  const ICONS = {
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
      instruction:
        "Convert the prescribed dose into the correct tablet quantity, then test whether the double-check is truly independent.",
      skills: ["Dose calculation", "Five Rights"],
      thumb: "assets/clonazepam-thumb.webp",
      briefing: "assets/clonazepam-visual-2026-08-05.png",
      briefingView: { src: "assets/clonazepam-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 96 543 415" },
      comic: "assets/clonazepam-comic-2026-08-05.png",
      thumbView: { src: "assets/clonazepam-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 507 785 434" },
      briefingAlt: "A nurse reviews the Clonazepam prescription.",
      question: "How many tablets should be prepared?",
      prompt:
        "Prescription: Clonazepam 1.5 mg orally at night. Stock strength: 0.5 mg per tablet.",
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
        "Prepare the exact prescribed volume, label the syringe, and confirm the administration check.",
      instruction:
        "Prepare the exact prescribed volume, label the syringe clearly, and confirm the point-of-administration check.",
      skills: ["Exact dose", "Syringe labelling"],
      thumb: "assets/dormicum-thumb.webp",
      briefing: "assets/dormicum-visual-2026-08-05.png",
      briefingView: { src: "assets/dormicum-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 96 556 415" },
      comic: "assets/dormicum-comic-2026-08-05.png",
      thumbView: { src: "assets/dormicum-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 510 784 431" },
      briefingAlt: "The intravenous Dormicum prescription is reviewed.",
      question: "What syringe should be handed over?",
      prompt:
        "Prescription: IV Dormicum 3 mg before the procedure. Prepared concentration: 15 mg in 15 mL.",
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
            text: "Hand over a clearly labelled 3 mL syringe and have the administrator recheck the drug and dose.",
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
      instruction:
        "Respond safely to a Patient Not Match alert before the medication reaches the patient.",
      skills: ["Identity verification", "Alert response"],
      thumb: "assets/patient-id-thumb.webp",
      briefing: "assets/patient-id-visual-2026-08-05.png",
      briefingView: { src: "assets/patient-id-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "559 96 526 413" },
      comic: "assets/patient-id-comic-2026-08-05.png",
      thumbView: { src: "assets/patient-id-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 505 782 436" },
      briefingAlt: "The handheld scanner shows a Patient Not Match alert.",
      question: "What should happen after the alert?",
      prompt:
        "The Levofloxacin infusion has not started. Choose the action that breaks the error chain.",
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
      instruction:
        "Preserve barcode gatekeeping and match the supplied formulation to the prescription.",
      skills: ["Barcode scanning", "Formulation check"],
      thumb: "assets/barcode-thumb.webp",
      briefing: "assets/barcode-visual-2026-08-05.png",
      briefingView: { src: "assets/barcode-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "557 96 557 415" },
      comic: "assets/barcode-comic-2026-08-05.png",
      thumbView: { src: "assets/barcode-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 510 786 431" },
      briefingAlt: "The medication system presents the barcode administration workflow.",
      question: "How will you pass the safety gate?",
      prompt:
        "Choose the verification workflow and the formulation that matches the prescription.",
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
      instruction:
        "You are about to administer treatment to lower potassium. Decide which safety checks must be completed before the medication is given.",
      skills: ["Patient context", "Parameter verification"],
      thumb: "assets/misfiled-potassium-thumb.webp",
      briefing: "assets/misfiled-potassium-visual-2026-08-05.png",
      briefingView: { src: "assets/misfiled-potassium-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 96 566 418" },
      comic: "assets/misfiled-potassium-comic-2026-08-05.png",
      thumbView: { src: "assets/misfiled-potassium-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 510 782 431" },
      briefingAlt: "Two de-identified patient records show different potassium results.",
      question: "Which checks must be completed before you administer the treatment?",
      prompt:
        "A doctor has prescribed treatment to lower potassium. Select only the checks that must be completed before administration.",
      wrong:
        "Do not act on the open record alone. Complete the five medication rights, check allergy, and confirm the clinical context and indication, including the current K+ and trend.",
      teach: {
        question: "What is the final safety barrier before giving treatment for a critical result?",
        options: [
          {
            text: "Give the treatment because it appears in the open patient record.",
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
      instruction:
        "You are preparing IV Dopamine for a newborn. Trace every checkpoint from the patient to the pump and confirm patency before starting.",
      skills: ["Full-route trace", "Pre-infusion patency"],
      thumb: "assets/iv-stopcock-thumb.webp",
      briefing: "assets/iv-stopcock-visual-2026-08-05.png",
      briefingView: { src: "assets/iv-stopcock-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 97 571 406" },
      comic: "assets/iv-stopcock-comic-2026-08-05.png",
      thumbView: { src: "assets/iv-stopcock-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 507 786 434" },
      briefingAlt: "An IV Dopamine infusion route runs from the patient to the infusion pump.",
      question: "Which parts of the infusion route must you check?",
      prompt:
        "The IV Dopamine infusion has not started. Tap every checkpoint you must trace and verify before opening the line.",
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
        "Connect the patient to oxygen, complete the cylinder 3-2-1 sequence, and perform the final delivery check.",
      instruction:
        "You are taking over oxygen care. Complete both the patient connection and cylinder safety rounds before leaving the bedside.",
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
      question: "Can you make both oxygen setups ready for the patient?",
      prompt:
        '<span class="prompt-round"><strong>Round 1:</strong> Receive a patient prescribed oxygen at 3 L/min.</span><span class="prompt-round"><strong>Round 2:</strong> Prepare a portable oxygen cylinder using the 3-2-1 sequence and a final delivery check.</span>',
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
      instruction:
        "You are leading two transfers. Set up the lateral-transfer surfaces first, then clear every pre-lift sling check.",
      skills: ["Surface alignment", "Pre-lift safety gate"],
      thumb: "assets/transfer-fall-visual-2026-08-05.png",
      thumbView: { src: "assets/transfer-fall-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "512 514 514 427" },
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
      prompt:
        '<span class="prompt-round"><strong>Round 1:</strong> Prepare an OT stretcher and electric bed for a lateral transfer.</span><span class="prompt-round"><strong>Round 2:</strong> Prepare a mechanical hoist and sling for a bed-to-chair transfer.</span>',
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
        "Decide whether a written feed order can proceed when the CXR review is not documented.",
      instruction:
        "You are about to start an ordered NG feed. Decide what evidence and documentation you need before opening the feed.",
      skills: ["CXR review", "Independent verification"],
      thumb: "assets/ng-tube-thumb.webp",
      briefing: "assets/ng-tube-visual-2026-08-05.png",
      briefingView: { src: "assets/ng-tube-visual-2026-08-05.png", width: 1671, height: 941, viewBox: "0 103 562 411" },
      comic: "assets/ng-tube-comic-2026-08-05.png",
      thumbView: { src: "assets/ng-tube-visual-2026-08-05.png", width: 1671, height: 941, viewBox: "0 509 794 432" },
      briefingAlt: "A nasogastric tube is inserted during an operation and a chest X-ray is available for review.",
      question: "The feed order is written. What do you do before starting it?",
      prompt:
        "A doctor has written an order to start feeding. The order does not state that the chest X-ray was reviewed or that the NG-tube position was confirmed.",
      wrong:
        "A written feed order alone does not document tube placement. Hold feeding until the doctor reviews the chest X-ray and records that the NG-tube position is confirmed.",
      teach: {
        question: "Which action closes the placement safety gate before feeding?",
        options: [
          {
            text: "Start feeding because the order was written by a doctor.",
            ok: false,
            why: "A signed feed order does not replace documented review of the chest X-ray and tube position.",
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
      instruction:
        "You have completed blood taking after attempts on both arms. Check both limbs specifically for any retained tourniquet, remove it immediately, and return it to storage.",
      skills: ["Immediate removal", "Equipment close-out"],
      thumb: "assets/retained-tourniquet-thumb.webp",
      briefing: "assets/retained-tourniquet-visual-2026-08-05.png",
      briefingView: { src: "assets/retained-tourniquet-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 101 1030 410" },
      comic: "assets/retained-tourniquet-comic-2026-08-05.png",
      thumbView: { src: "assets/retained-tourniquet-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 511 812 430" },
      briefingAlt: "Staff attempt blood taking while a tourniquet remains around a patient's upper limb.",
      question: "Where must you check for a tourniquet, and how must you close out the procedure?",
      prompt:
        "You attempted blood taking on both upper limbs and obtained the sample from the left arm. Check specifically for a retained tourniquet during the final patient and equipment sweep.",
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
        "Identify, store, and document the denture when the patient is admitted.",
      instruction:
        "During admission, you identify that the patient has a denture. Set up safe storage and an accountable record before routine care begins.",
      skills: ["Inventory", "Designated storage"],
      thumb: "assets/missing-denture-thumb.webp",
      briefing: "assets/missing-denture-visual-2026-08-05.png",
      briefingView: { src: "assets/missing-denture-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 97 840 414" },
      comic: "assets/missing-denture-comic-2026-08-05.png",
      thumbView: { src: "assets/missing-denture-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "837 95 835 414" },
      briefingAlt: "A patient with a denture is being admitted and needs designated storage and documentation.",
      question: "What should you do when the denture is identified at admission?",
      prompt:
        "Choose the storage method and complete both admission-time accountability checks.",
      wrong:
        "Use the designated denture box, complete the denture inventory, and document the denture information. Tissue paper and meal trays are not safe storage.",
      sourceWarning:
        "The exact source comic depicts Missing Denture but carries an incorrect visible NG-tube title.",
      teach: {
        question: "A colleague comes to tell you that the designated denture box cannot be located. What should you do next?",
        options: [
          {
            text: "Assume the patient has kept it and close the concern without checking.",
            ok: false,
            why: "An unlocated denture is an unresolved discrepancy and cannot be closed by assumption.",
          },
          {
            text: "Reconcile the inventory with the patient and ward, document the discrepancy, and escalate the search.",
            ok: true,
            why: "This keeps the missing item traceable and ensures that the unresolved discrepancy is actively followed up.",
          },
          {
            text: "Leave a verbal message only and continue care without documenting the discrepancy.",
            ok: false,
            why: "A verbal message alone does not create an accountable record or an active search plan.",
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
      instruction:
        "You checked Patient A, were interrupted, and have returned with the medication. Decide how to restart safely before administration.",
      skills: ["Interruption recovery", "Patient identity"],
      briefing: "assets/wrong-patient-distraction-visual-2026-08-05.png",
      briefingView: { src: "assets/wrong-patient-distraction-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 96 558 420" },
      comic: "assets/wrong-patient-distraction-comic-2026-08-05.png",
      thumbView: { src: "assets/wrong-patient-distraction-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 506 778 435" },
      briefingAlt: "A nurse checks medication and scans Patient A before an interruption.",
      question: "What should you do when you return after the interruption?",
      prompt:
        "You are now at another bedside with the medication that was checked before the interruption.",
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
          title: "Confirm the bed location and continue",
          detail: "Use the current bedside as the main identity check.",
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
      instruction:
        "A doctor gives a verbal order for adrenaline injection during an allergic reaction. Resolve every ambiguity before preparation and administration.",
      skills: ["Order clarification", "Route and concentration"],
      briefing: "assets/adrenaline-route-visual-2026-08-05.png",
      briefingView: { src: "assets/adrenaline-route-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "898 110 774 405" },
      comic: "assets/adrenaline-route-comic-2026-08-05.png",
      thumbView: { src: "assets/adrenaline-route-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 514 786 427" },
      briefingAlt: "A doctor gives an urgent verbal order for adrenaline injection.",
      question: "What must happen before adrenaline is prepared?",
      prompt:
        "The verbal order does not specify the route, concentration, or dose.",
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
      playTitle: "Separate Mouth Care from NG Medication",
      summary:
        "Label and separate mouthwash so it cannot be mistaken for an enteral medication.",
      instruction:
        "An unlabelled cup of mouthwash is present beside medicines for NG administration. Decide how to remove the mix-up risk.",
      skills: ["Clear labelling", "Same-nurse administration"],
      briefing: "assets/mouthwash-ng-visual-2026-08-05.png",
      briefingView: { src: "assets/mouthwash-ng-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "576 96 518 413" },
      comic: "assets/mouthwash-ng-comic-2026-08-05.png",
      thumbView: { src: "assets/mouthwash-ng-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 504 784 437" },
      briefingAlt: "A cup of mouthwash is beside a syringe and other medicines.",
      question: "How should you prevent the mouthwash from entering the NG tube?",
      prompt:
        "The cup is unlabelled and another nurse may administer the prepared medicines.",
      correctDecision: "separate-label",
      decisionOptions: [
        {
          value: "verbal",
          title: "Leave a verbal message for the administering nurse",
          detail: "Keep the unlabelled cup with the other prepared medicines.",
        },
        {
          value: "separate-label",
          title: "Label and separate the mouthwash",
          detail: "Keep mouth care distinct and have the preparing nurse complete administration safely.",
        },
        {
          value: "same-tray",
          title: "Keep everything together for efficiency",
          detail: "Rely on the appearance of the pink liquid to identify the mouthwash.",
        },
      ],
      wrong:
        "Label and separate mouthwash from enteral medicines. Do not rely on appearance or a verbal message, and avoid splitting preparation and administration between nurses.",
      teach: {
        question: "Which control best prevents mouthwash from being administered through an NG tube?",
        options: [
          {
            text: "Keep it on the medication tray but explain its purpose verbally.",
            ok: false,
            why: "An unlabelled product remains vulnerable to a wrong-route mix-up.",
          },
          {
            text: "Label and physically separate it from enteral medicines, with clear ownership of administration.",
            ok: true,
            why: "Clear labelling, separation, and ownership preserve the route-of-administration barrier.",
          },
          {
            text: "Use a different-coloured cup without a written label.",
            ok: false,
            why: "Colour alone is not a reliable medication or route identifier.",
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
      instruction:
        "A specimen container with preservative powder is about to be left at the bedside for later collection. Decide how to keep it controlled.",
      skills: ["Specimen control", "Patient and carer communication"],
      briefing: "assets/specimen-bottle-visual-2026-08-05.png",
      briefingView: { src: "assets/specimen-bottle-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 104 543 408" },
      comic: "assets/specimen-bottle-comic-2026-08-05.png",
      thumbView: { src: "assets/specimen-bottle-visual-2026-08-05.png", width: 1672, height: 941, viewBox: "0 511 784 430" },
      briefingAlt: "A urine specimen bottle containing white preservative powder is placed beside the patient.",
      question: "What should you do with the specimen bottle?",
      prompt:
        "The patient and relative may mistake the powder for medication if the container is left unattended.",
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
          "Serious harm from the wrong medication",
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
        consequences: ["Chemical irritation", "Aspiration pneumonitis", "Respiratory deterioration"],
      },
    ],
    "specimen-bottle": [
      {
        consequences: ["Mucosal irritation", "Chemical poisoning", "Acute clinical deterioration"],
      },
    ],
    "oxygen-safety": [
      {
        label: "Case 1 - Cannula not connected",
        consequences: ["Hypoxaemia", "Cardiorespiratory deterioration", "Cardiac arrest"],
      },
      {
        label: "Case 2 - Cylinder valve not opened",
        consequences: ["Severe desaturation", "Emergency intubation", "Cardiac arrest"],
      },
    ],
    "transfer-safety": [
      {
        label: "Case 1 - Transfer surfaces",
        consequences: ["Head injury", "Fracture", "Permanent disability"],
      },
      {
        label: "Case 2 - Sling and hoist",
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
        consequences: ["Nerve injury", "Limb gangrene", "Loss of fingers"],
      },
    ],
    "missing-denture": [
      {
        consequences: ["Nutritional decline", "Airway obstruction", "Aspiration pneumonia"],
      },
    ],
  };

  let state = load();
  let runtime = null;
  let toastTimer;
  let viewerScale = 1;
  let viewerX = 0;
  let viewerY = 0;
  let viewerPinchDistance = 0;
  let viewerPinchCenter = null;
  let viewerDrag = null;
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
      return { completed };
    } catch {
      return { completed: {} };
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
      node.nodeValue = node.nodeValue.replace(/,(?=\S)/g, ", ").replace(/-(?=\S)/g, "- ");
    }
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
      ngEvidence: null,
      tourniquetArms: [],
      tourniquetAction: null,
      dentureStorage: null,
      dentureInventory: false,
      dentureDocumented: false,
      teachChoice: null,
      teachCorrect: false,
      teachFeedback: null,
    };

    if (!item || !completion) return;

    runtime.phase = "complete";
    runtime.attempts = completion.attempts || 1;

    if (item.type === "dose") runtime.tablets = 3;
    if (item.type === "single-choice") runtime.simpleChoice = item.correctDecision;
    if (item.type === "syringe") {
      runtime.volume = 3;
      runtime.label = true;
      runtime.double = true;
    }
    if (item.type === "identity") runtime.idChoice = "verify";
    if (item.type === "barcode") {
      runtime.scanMode = "scan";
      runtime.medication = "tablet";
    }
    if (item.type === "clinical-context") {
      runtime.contextChecks = ["five-rights", "allergy", "clinical-context"];
    }
    if (item.type === "infusion-route") {
      runtime.infusionPoints = ["iv-access", "stopcock", "tubing", "pump"];
    }
    if (item.type === "oxygen-combined") {
      runtime.oxygenSource = "cylinder";
      runtime.oxygenFlow = 3;
      runtime.cylinderSequence = ["valve", "content", "flow"];
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
    if (item.type === "evidence-gate") runtime.ngEvidence = "confirmed";
    if (item.type === "tourniquet-loop") {
      runtime.tourniquetArms = ["left", "right"];
      runtime.tourniquetAction = "remove-store";
    }
    if (item.type === "denture-admission") {
      runtime.dentureStorage = "box";
      runtime.dentureInventory = true;
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
              <span>Clinical Safety Missions</span>
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
    const caseMatch = route().match(/^case\/(.+)$/);
    let content;

    if (caseMatch) content = casePage(caseMatch[1]);
    else if (route() === "complete") content = completionPage();
    else content = homePage();

    const app = document.getElementById("app");
    app.innerHTML = `${header()}<main>${content}</main>`;
    normalizeVisiblePunctuation(app);
    bindGlobal();
    if (caseMatch) bindCase(caseById(caseMatch[1]));
    else bindHome();
    document.title = "Break the Chain - Clinical Safety Missions";
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
    const next = CASES.find((item) => !state.completed[item.id]) || CASES[0];
    const firstCompleted = CASES.find((item) => state.completed[item.id])?.id;

    return `
      <div class="shell">
        <section class="hero">
          <div class="hero-main">
            <span class="eyebrow program-label">Standardized Orientation Program for Fresh Graduate Nurses in Hospital Authority.</span>
            <h1>Break the Chain<span>Clinical Safety Missions</span></h1>
            <p class="hero-copy">Return to the moment before harm: Identify the cue, preserve the safety barrier, and intervene before the error reaches the patient.</p>
            <div class="hero-actions">
              <button class="primary" data-start="${next.id}">${ICONS.shield}Start next mission${ICONS.arrow}</button>
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
              <span class="star-rule-intro">Stars obtained are based only on the Part 1 of each mission:</span>
              <span><strong>3 ★:</strong> Correct on the 1st attempt</span>
              <span><strong>2 ★:</strong> Correct on the 2nd attempt</span>
              <span><strong>1 ★:</strong> Correct on the 3rd or later attempt</span>
            </div>
            <p class="training-remark"><strong>Remarks:</strong> The Mission Stars are for fun only, training completion is confirmed by the Final Quiz.</p>
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
    if (typeof thumb === "string") return `<img src="${thumb}" alt="">`;
    return `
      <svg class="mission-thumb" viewBox="${thumb.viewBox}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <image href="${thumb.src}" width="${thumb.width}" height="${thumb.height}"></image>
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

    return `
      <div class="shell case-shell">
        <button class="back" data-home>${ICONS.back}Back to mission map</button>
        <div class="case-top">
          <div class="case-copy">
            <span class="category">Mission ${item.n} · ${item.category}</span>
            <h1>${item.playTitle || item.title}</h1>
            <p class="case-instruction">${item.instruction}</p>
          </div>
          <div class="best">
            <span>MISSION STARS</span>
            <strong>${completion ? starDisplay(completionStars(completion)) : "☆☆☆"}</strong>
          </div>
        </div>
        ${progressSteps()}
        ${missionFlow(item)}
      </div>`;
  }

  function progressSteps() {
    const phases = ["decision", "comic", "debrief"];
    const labels = ["DECISION", "INCIDENT COMIC", "DEBRIEF"];
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
    const missionComplete = runtime.phase === "complete";
    const incidentUnlocked = ["comic", "debrief", "complete"].includes(runtime.phase);
    const incidentComplete = ["debrief", "complete"].includes(runtime.phase);
    const debriefUnlocked = ["debrief", "complete"].includes(runtime.phase);

    return `
      <section class="mission-section decision-section ${incidentUnlocked ? "completed" : "current"}">
        ${flowHeading(1, "DECISION", "Make the safety decision", incidentUnlocked ? "Complete" : "Current")}
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
        ${flowHeading(2, "INCIDENT COMIC", "Walk through the incident", incidentComplete ? "Complete" : incidentUnlocked ? "Open" : "Locked")}
        ${
          incidentUnlocked
            ? comicPage(item)
            : lockedPanel("Complete the decision above to unlock the real incident.")
        }
      </section>

      <section id="debrief-section" class="mission-section debrief-section ${debriefUnlocked ? "unlocked" : "locked"}">
        ${flowHeading(3, "DEBRIEF", "Confirm the safety barrier", missionComplete ? "Complete" : debriefUnlocked ? "Open" : "Locked")}
        ${
          debriefUnlocked
            ? debriefPage(item)
            : lockedPanel(
                incidentUnlocked
                  ? "Review the incident comic, then continue to the debrief."
                  : "Complete the decision and review the incident before debriefing.",
              )
        }
      </section>`;
  }

  function decisionPage(item) {
    const decisionComplete = runtime.phase !== "decision";
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
                        ${
                          briefing.viewBox
                            ? `<svg class="briefing-crop" viewBox="${briefing.viewBox}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(briefing.alt)}">
                                <image href="${briefing.src}" width="${briefing.width}" height="${briefing.height}"></image>
                              </svg>`
                            : `<img src="${briefing.src}" alt="${esc(briefing.alt)}">`
                        }
                      </figure>`,
                  )
                  .join("")
          }
        </section>
        <aside class="challenge ${["oxygen-combined", "transfer-combined"].includes(item.type) ? "combined-challenge" : ""}">
          <div class="challenge-kicker">${ICONS.alert}Decision point</div>
          <div class="key-information">
            <span>Prescription / key information</span>
            <p>${item.prompt}</p>
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
                : `<button class="primary" data-submit>Lock in answer${ICONS.arrow}</button>`
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
        <span class="answer-label">Volume to hand over</span>
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
        ${toggle("double", "Administrator rechecks drug and dose", "Point-of-administration verification", runtime.double)}
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
    const options = [
      ["continue", "Silence the warning because the patient is in the expected bed.", "Use bed location instead of identity verification."],
      ["verify", "Stop, use two identifiers to recheck the patient and order, then repeat the independent double-check.", "Resolve the mismatch before administration."],
      ["ask", "Ask whether this bed normally receives the antibiotic and continue if a colleague agrees.", "Use colleague familiarity instead of formal verification."],
    ];
    return `<div class="choices">${options
      .map((option) => choice("identity", option[0], option[1], option[2], runtime.idChoice === option[0]))
      .join("")}</div>`;
  }

  function clinicalContextInteraction() {
    const checks = [
      ["five-rights", "Right patient, right medication, right time, right dosage, right routes", "Complete all five medication rights before administration"],
      ["allergy", "Check allergy", "Confirm the patient's documented allergy status"],
      ["clinical-context", "Clinical context and indication", "Review the current K+ level and trend"],
      ["open-record", "The open record is enough", "Assume the result belongs to this patient because it appears here"],
    ];

    return `
      <div class="context-check">
        <div class="context-alert">
          <span>Before medication</span>
          <strong>Treatment to lower potassium prescribed</strong>
          <small>Decide what must be checked before administration</small>
        </div>
        <div class="context-pick">
          ${checks
            .map(
              ([value, label, detail]) => `
                <button
                  class="context-option ${runtime.contextChecks.includes(value) ? "selected" : ""}"
                  data-context-check="${value}"
                  type="button"
                  aria-pressed="${runtime.contextChecks.includes(value)}"
                >
                  <i>${runtime.contextChecks.includes(value) ? "✓" : ""}</i>
                  <strong>${label}</strong>
                  <small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
        <p class="interaction-note">Select the checks that independently confirm whether this treatment is safe for this patient now.</p>
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
    const options = [
      [
        "order-only",
        "Start feeding from the written order",
        "The order does not document review of the chest X-ray or confirmation of tube position.",
      ],
      [
        "image-only",
        "Check that a chest X-ray exists",
        "The image is available, but no documented placement review is recorded.",
      ],
      [
        "confirmed",
        "Hold and obtain documented confirmation",
        "Ask the doctor to review the chest X-ray and document that the NG-tube position is confirmed.",
      ],
    ];

    return `
      <div class="evidence-gate">
        <div class="gate-status ${runtime.ngEvidence === "confirmed" ? "ready" : ""}">
          <span>Feed order gate</span>
          <strong>${runtime.ngEvidence === "confirmed" ? "Evidence ready for decision" : "Hold - Placement not confirmed"}</strong>
        </div>
        <div class="choices">
          ${options
            .map((option) =>
              choice("ng-evidence", option[0], option[1], option[2], runtime.ngEvidence === option[0]),
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
        <span class="form-label">Select both attempted sites to check for a retained tourniquet (${runtime.tourniquetArms.length} / 2 selected)</span>
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
      ["tissue", "Tissue paper", "Can be mistaken for waste"],
      ["tray", "Meal tray", "Can leave the ward with catering items"],
      ["box", "Designated denture box", "Protected and clearly identifiable storage"],
    ];

    return `
      <div class="denture-check">
        <span class="form-label">Choose the storage method</span>
        <div class="storage-pick">
          ${storageOptions
            .map(
              ([value, label, detail]) => `
                <button
                  class="storage-option ${runtime.dentureStorage === value ? "selected" : ""}"
                  data-denture-storage="${value}"
                  type="button"
                >
                  <span class="storage-icon ${value}"></span>
                  <strong>${label}</strong>
                  <small>${detail}</small>
                </button>`,
            )
            .join("")}
        </div>
        <div class="route-checklist">
          ${toggle("dentureInventory", "Denture inventory completed", "Confirm and record the item under the patient's care", runtime.dentureInventory)}
          ${toggle("dentureDocumented", "Denture information documented", "Maintain accountability from admission through ongoing care", runtime.dentureDocumented)}
        </div>
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

  function comicPage(item) {
    const comics = item.comics || [{ label: "Incident comic", src: item.comic }];
    return `
      <section class="comic-stage">
        <div class="incident-title-reveal"><span>Incident revealed</span><strong>${item.title}</strong></div>
        <div class="comic-gallery ${comics.length > 1 ? "multiple" : ""}">
          ${comics
            .map(
              (comic) => `
                <figure class="comic-panel ${comic.className ? esc(comic.className) : ""}">
                  ${comic.label ? `<figcaption>${esc(comic.label)}</figcaption>` : ""}
                  <button
                    class="comic-reveal"
                    data-zoom
                    data-comic-src="${comic.src}"
                    data-comic-title="${esc(`${item.title} - ${comic.label || "Incident comic"}`)}"
                    aria-label="Enlarge ${esc(comic.label || "incident comic")}"
                  >
                    ${
                      comic.viewBox
                        ? `<svg class="comic-crop" viewBox="${comic.viewBox}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(`${item.title} - ${comic.label || "Incident comic"}`)}">
                            <image href="${comic.src}" width="${comic.width}" height="${comic.height}"></image>
                          </svg>`
                        : `<img src="${comic.src}" alt="${esc(`${item.title} - ${comic.label || "Incident comic"}`)}">`
                    }
                    <span class="zoom-hint">${ICONS.zoom}Open zoom viewer</span>
                  </button>
                </figure>`,
            )
            .join("")}
        </div>
        <div class="comic-next">
          ${
            runtime.phase === "debrief" || runtime.phase === "complete"
              ? `<span class="reviewed-state">${ICONS.check}Incident reviewed</span>`
              : `<button class="primary" data-next-debrief>I have reviewed the incident${ICONS.arrow}</button>`
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
    const options = item.teach.options
      .map((option, index) => choice("teach", index, option.text, "", runtime.teachChoice === index))
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
          <div class="completion-actions">
            <button class="primary quiz-button" data-quiz>Continue to quiz${ICONS.arrow}</button>
            <button class="secondary" data-home>Review missions</button>
          </div>
          <div class="quiz-note" data-quiz-note>The quiz is completed in the connected learning system.</div>
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
        `<p><strong>Break the Chain:</strong> Turns ${INCIDENT_COUNT} clinical incidents into short interactive missions. Each mission asks the learner to make a safety decision, review the incident comic, and complete a teach-back reflection.</p><p><strong>Mission Stars:</strong> Stars obtained are based only on the Part 1 of each mission: 3 ★ for a correct answer on the 1st attempt; 2 ★ on the 2nd attempt; and 1 ★ on the 3rd or later attempt.</p><p><strong>Remarks:</strong> The Mission Stars are for fun only, training completion is confirmed by the Final Quiz.</p>`;
      normalizeVisiblePunctuation(document.getElementById("aboutBody"));
      document.getElementById("aboutDialog").showModal();
    });

    document.querySelector("[data-reset]")?.addEventListener("click", () => {
      if (confirm("Clear all mission completion records?")) {
        state.completed = {};
        runtime = null;
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
      const note = document.querySelector("[data-quiz-note]");
      note?.classList.add("visible");
    });
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

    document.querySelectorAll('input[name="ng-evidence"]').forEach((input) => {
      input.onchange = (event) => {
        runtime.ngEvidence = event.target.value;
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

    document.querySelector("[data-next-debrief]")?.addEventListener("click", () => {
      runtime.phase = "debrief";
      render();
      requestAnimationFrame(() =>
        document.getElementById("debrief-section")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    });

    document.querySelectorAll('input[name="teach"]').forEach((input) => {
      input.onchange = (event) => {
        runtime.teachChoice = Number(event.target.value);
        runtime.teachCorrect = false;
        runtime.teachFeedback = null;
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

    document.querySelector("[data-finish]")?.addEventListener("click", () => finishMission(item));

    document.querySelectorAll("[data-zoom]").forEach((button) => {
      button.addEventListener("click", () => {
        openImageViewer(button.dataset.comicSrc, button.dataset.comicTitle || item.title);
      });
    });
  }

  function submitDecision(item) {
    let correct = false;
    if (item.type === "dose") correct = Math.abs(runtime.tablets - 3) < 0.001;
    if (item.type === "single-choice") correct = runtime.simpleChoice === item.correctDecision;
    if (item.type === "syringe") correct = runtime.volume === 3 && runtime.label && runtime.double;
    if (item.type === "identity") correct = runtime.idChoice === "verify";
    if (item.type === "barcode") correct = runtime.scanMode === "scan" && runtime.medication === "tablet";
    if (item.type === "clinical-context") {
      const requiredChecks = ["five-rights", "allergy", "clinical-context"];
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
      correct = runtime.ngEvidence === "confirmed";
    }
    if (item.type === "tourniquet-loop") {
      correct =
        ["left", "right"].every((arm) => runtime.tourniquetArms.includes(arm)) &&
        runtime.tourniquetAction === "remove-store";
    }
    if (item.type === "denture-admission") {
      correct =
        runtime.dentureStorage === "box" &&
        runtime.dentureInventory &&
        runtime.dentureDocumented;
    }

    runtime.attempts += 1;

    if (correct) {
      runtime.feedback = null;
      runtime.phase = "comic";
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
    const stars = starsForAttempts(attempts);
    const previous = state.completed[item.id];

    state.completed[item.id] = {
      stars: Math.max(completionStars(previous), stars),
      lastStars: stars,
      attempts,
      completedAt: new Date().toISOString(),
    };
    save();
    runtime = null;

    if (Object.keys(state.completed).filter(caseById).length === CASES.length) {
      go("complete");
      return;
    }

    go("");
    setTimeout(() => toast("Mission complete", `${item.title} · ${starDisplay(stars)}`), 80);
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
