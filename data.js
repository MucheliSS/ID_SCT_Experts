// TTSH ID MO Script Concordance Test - Expert Marking Data
// Contains clinical cases for expert panel marking (no scoring key - that's what we're generating!)

const SCT_DATA = {
    testInfo: {
        title: "TTSH ID MO Script Concordance Test",
        subtitle: "Expert Panel Marking",
        instructions: [
            "You are part of an expert panel establishing the scoring rubric for this SCT",
            "Each case presents a clinical scenario followed by diagnostic or management considerations",
            "Rate how each new piece of information affects the clinical hypothesis",
            "Your responses will be aggregated with other experts to create the scoring key",
            "There are no strictly \"right\" or \"wrong\" answers - we are capturing expert variation",
            "Complete all 10 cases (30 items)",
            "Estimated time: 25-30 minutes"
        ],
        scaleLabels: {
            "-2": "Greatly weakened / Very unlikely / Strongly contraindicated",
            "-1": "Slightly weakened / Unlikely / Not indicated",
            "0": "No effect / Neither likely nor unlikely / Neutral",
            "+1": "Strengthened / Likely / Indicated",
            "+2": "Greatly strengthened / Very likely / Strongly indicated"
        }
    },

    // Specialty options for expert profile
    specialties: [
        "General Infectious Diseases",
        "Tropical Medicine",
        "ID Intensivist",
        "HIV Medicine",
        "Transplant ID",
        "Infection Control",
        "Antimicrobial Stewardship",
        "Research/Academic",
        "Other"
    ],

    cases: [
        {
            id: 1,
            title: "Fever in a Returned Traveler",
            scenario: "A 32-year-old Singaporean man presents to the Emergency Department with a 3-day history of high-grade fever (39.5°C), severe headache, myalgia, and chills. He returned from a 2-week backpacking trip to rural Indonesia 5 days ago. He did not take malaria prophylaxis. On examination, he is febrile (39.2°C), BP 110/70 mmHg, HR 105/min. He appears jaundiced with mild splenomegaly.",
            items: [
                {
                    id: "1.1",
                    hypothesis: "Malaria (Plasmodium falciparum)",
                    newInfo: "Peripheral blood smear shows ring forms with high parasitemia (8%)",
                    questionType: "Effect on hypothesis"
                },
                {
                    id: "1.2",
                    hypothesis: "Dengue fever",
                    newInfo: "Platelet count returns at 185,000/μL on day 3 of fever",
                    questionType: "Effect on hypothesis"
                },
                {
                    id: "1.3",
                    hypothesis: "Leptospirosis",
                    newInfo: "Patient reports swimming in freshwater streams during his trip",
                    questionType: "Effect on hypothesis"
                }
            ]
        },
        {
            id: 2,
            title: "Dengue Fever Management",
            scenario: "A 28-year-old woman presents with 4 days of fever, severe headache, retro-orbital pain, and myalgia. She has no recent travel history. On examination: BP 100/65 mmHg, HR 98/min, Temp 38.8°C. Tourniquet test is positive. Labs: WBC 3.2 × 10⁹/L, Platelet count 98,000/μL, Hematocrit 38%. Dengue NS1 antigen is positive.",
            items: [
                {
                    id: "2.1",
                    hypothesis: "Outpatient management with close monitoring",
                    newInfo: "Patient lives alone, 45 minutes from hospital, has persistent vomiting",
                    questionType: "Clinical action indicated"
                },
                {
                    id: "2.2",
                    hypothesis: "Admission for intravenous fluid therapy",
                    newInfo: "Repeat platelet count 12 hours later shows 75,000/μL with hematocrit rise to 42%",
                    questionType: "Clinical action indicated"
                },
                {
                    id: "2.3",
                    hypothesis: "Prophylactic platelet transfusion",
                    newInfo: "Patient has platelet count of 35,000/μL but no active bleeding",
                    questionType: "Clinical action indicated"
                }
            ]
        },
        {
            id: 3,
            title: "Community-Acquired Pneumonia",
            scenario: "A 68-year-old man with COPD and diabetes presents with 3 days of productive cough, fever, and dyspnea. Vital signs: BP 95/60 mmHg, HR 115/min, RR 28/min, Temp 38.9°C, SpO₂ 88% on room air. CXR shows right lower lobe consolidation. Labs: WBC 18,500/μL, Creatinine 145 μmol/L, Lactate 2.8 mmol/L.",
            items: [
                {
                    id: "3.1",
                    hypothesis: "Severe CAP requiring ICU admission",
                    newInfo: "CURB-65 score is 4 with confusion and hypotension",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "3.2",
                    hypothesis: "Empiric ceftriaxone and azithromycin",
                    newInfo: "Patient has documented penicillin allergy (anaphylaxis)",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "3.3",
                    hypothesis: "Coverage for atypical pathogens",
                    newInfo: "Sputum Gram stain shows many gram-positive diplococci",
                    questionType: "Treatment appropriateness"
                }
            ]
        },
        {
            id: 4,
            title: "Catheter-Associated Urinary Tract Infection",
            scenario: "A 55-year-old man with T10 paraplegia and chronic indwelling Foley catheter attends clinic. He is asymptomatic with no fever or suprapubic pain. Routine urinalysis shows: positive leukocyte esterase and nitrite, 100 WBC/HPF. Urine culture grows >100,000 CFU/mL of E. coli sensitive to ciprofloxacin, trimethoprim-sulfamethoxazole, and gentamicin.",
            items: [
                {
                    id: "4.1",
                    hypothesis: "Antibiotic treatment",
                    newInfo: "Patient remains completely asymptomatic with normal vital signs",
                    questionType: "Management appropriateness"
                },
                {
                    id: "4.2",
                    hypothesis: "Catheter change only",
                    newInfo: "The current catheter has been in place for 6 weeks",
                    questionType: "Management appropriateness"
                },
                {
                    id: "4.3",
                    hypothesis: "Observation without intervention",
                    newInfo: "Patient has history of recurrent symptomatic UTIs requiring hospitalization",
                    questionType: "Management appropriateness"
                }
            ]
        },
        {
            id: 5,
            title: "Clostridioides difficile Infection",
            scenario: "A 72-year-old woman develops watery diarrhea (8 stools/day) on day 5 of hospitalization for cellulitis treated with ceftriaxone. She has mild lower abdominal cramping. Vital signs: BP 105/65 mmHg, HR 95/min, Temp 37.8°C. Labs: WBC 15,000/μL, Creatinine 95 μmol/L, Albumin 32 g/L. C. difficile toxin PCR is positive.",
            items: [
                {
                    id: "5.1",
                    hypothesis: "Oral vancomycin therapy",
                    newInfo: "This is the patient's first episode of C. difficile infection",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "5.2",
                    hypothesis: "Oral metronidazole as first-line",
                    newInfo: "Patient has severe infection criteria (WBC >15,000 or Cr >133 μmol/L)",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "5.3",
                    hypothesis: "Immediate discontinuation of ceftriaxone",
                    newInfo: "The cellulitis is clinically improving after 5 days of therapy",
                    questionType: "Treatment appropriateness"
                }
            ]
        },
        {
            id: 6,
            title: "Infective Endocarditis",
            scenario: "A 42-year-old man with a history of intravenous drug use presents with 2 weeks of fever, night sweats, and progressive dyspnea. Examination reveals a new harsh pansystolic murmur at the left lower sternal border. Two sets of blood cultures grow methicillin-sensitive Staphylococcus aureus (MSSA). Echocardiogram shows a 1.2 cm vegetation on the tricuspid valve.",
            items: [
                {
                    id: "6.1",
                    hypothesis: "Intravenous cloxacillin monotherapy",
                    newInfo: "Patient has MSSA tricuspid valve endocarditis with no complications",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "6.2",
                    hypothesis: "Addition of gentamicin to beta-lactam",
                    newInfo: "Patient has normal renal function and no evidence of metastatic infection",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "6.3",
                    hypothesis: "Urgent cardiac surgery consultation",
                    newInfo: "Patient develops progressive right heart failure despite 10 days of appropriate antibiotics",
                    questionType: "Treatment appropriateness"
                }
            ]
        },
        {
            id: 7,
            title: "Bacterial Meningitis",
            scenario: "A 19-year-old male army recruit presents with sudden onset of high fever (40°C), severe headache, neck stiffness, and photophobia for 8 hours. He is confused with GCS 13/15. A petechial rash is noted on his trunk and extremities. Lumbar puncture shows: WBC 2,500 cells/μL (95% neutrophils), protein 2.8 g/L, glucose 1.2 mmol/L (serum glucose 5.5 mmol/L). Gram stain shows gram-negative diplococci.",
            items: [
                {
                    id: "7.1",
                    hypothesis: "Immediate ceftriaxone without awaiting CSF results",
                    newInfo: "Clinical presentation strongly suggests bacterial meningitis",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "7.2",
                    hypothesis: "Addition of dexamethasone",
                    newInfo: "Gram stain shows gram-negative diplococci suggestive of Neisseria meningitidis",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "7.3",
                    hypothesis: "Droplet precautions",
                    newInfo: "Gram stain and clinical picture suggest meningococcal meningitis",
                    questionType: "Treatment appropriateness"
                }
            ]
        },
        {
            id: 8,
            title: "Febrile Neutropenia",
            scenario: "A 58-year-old woman with acute myeloid leukemia on day 12 of induction chemotherapy presents with fever (38.7°C). She has a tunneled central venous catheter. She appears unwell but hemodynamically stable (BP 110/70 mmHg, HR 102/min). Labs: Absolute neutrophil count 200/μL, no other source of infection identified clinically.",
            items: [
                {
                    id: "8.1",
                    hypothesis: "Empiric piperacillin-tazobactam",
                    newInfo: "Patient has no drug allergies and normal renal function",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "8.2",
                    hypothesis: "Addition of vancomycin to beta-lactam",
                    newInfo: "Central line site shows erythema and purulent discharge",
                    questionType: "Treatment appropriateness"
                },
                {
                    id: "8.3",
                    hypothesis: "Immediate empiric antifungal therapy",
                    newInfo: "Patient has persistent fever for 24 hours on broad-spectrum antibiotics",
                    questionType: "Treatment appropriateness"
                }
            ]
        },
        {
            id: 9,
            title: "Tuberculosis vs Pneumonia",
            scenario: "A 45-year-old Indonesian migrant worker presents with 3 weeks of productive cough, low-grade fevers, night sweats, and 5 kg weight loss. He lives in a dormitory. CXR shows right upper lobe infiltrate with cavitation. He is hemodynamically stable with SpO₂ 96% on room air. HIV test is negative.",
            items: [
                {
                    id: "9.1",
                    hypothesis: "Active pulmonary tuberculosis",
                    newInfo: "Sputum AFB smear is positive for acid-fast bacilli",
                    questionType: "Effect on hypothesis"
                },
                {
                    id: "9.2",
                    hypothesis: "Bacterial pneumonia requiring antibiotics",
                    newInfo: "Patient has 3-week duration of symptoms without significant clinical deterioration",
                    questionType: "Effect on hypothesis"
                },
                {
                    id: "9.3",
                    hypothesis: "Airborne isolation precautions",
                    newInfo: "Sputum AFB smear is positive and CXR shows cavitary disease",
                    questionType: "Effect on hypothesis"
                }
            ]
        },
        {
            id: 10,
            title: "Pyrexia of Unknown Origin",
            scenario: "A 55-year-old woman presents with daily fever (38.5-39°C) for 4 weeks with no localizing symptoms. She has lost 4 kg in weight. Initial workup including CBC, CRP, chest X-ray, urinalysis, and blood cultures has been unremarkable. She has no recent travel or animal exposure. Physical examination is normal except for fever.",
            items: [
                {
                    id: "10.1",
                    hypothesis: "CT chest/abdomen/pelvis",
                    newInfo: "Initial basic workup (CXR, CBC, urinalysis, cultures) is non-diagnostic",
                    questionType: "Diagnostic usefulness"
                },
                {
                    id: "10.2",
                    hypothesis: "Empiric antibiotic trial",
                    newInfo: "Patient has completed 3 weeks of investigation with no diagnosis and remains stable",
                    questionType: "Diagnostic usefulness"
                },
                {
                    id: "10.3",
                    hypothesis: "Temporal artery biopsy",
                    newInfo: "Patient is 55 years old with elevated ESR (85 mm/hr) and new-onset headache",
                    questionType: "Diagnostic usefulness"
                }
            ]
        }
    ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SCT_DATA;
}
