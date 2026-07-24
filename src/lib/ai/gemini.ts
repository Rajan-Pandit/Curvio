import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export interface SymptomAnalysisResult {
  isEmergency: boolean;
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  recommendedSpecialty: string;
  possibleCauses: {
    name: string;
    likelihood: 'High' | 'Moderate' | 'Low';
    description: string;
  }[];
  homeCareAdvice: string[];
  disclaimer: string;
}

export interface PrescriptionExplanationResult {
  overallSummary: string;
  medicineExplanations: {
    medicineName: string;
    purpose: string;
    timingGuide: string;
    sideEffects: string[];
    importantWarning: string;
  }[];
  lifestyleAdvice: string;
  followUpReminder: string;
}

// Emergency red flag detector keywords
const EMERGENCY_KEYWORDS = [
  'severe chest pain',
  'chest pain',
  'difficulty breathing',
  'can\'t breathe',
  'cannot breathe',
  'shortness of breath',
  'unconscious',
  'fainted',
  'severe bleeding',
  'paralysis',
  'slurred speech',
  'facial drooping',
  'stroke symptoms',
  'coughing blood',
  'crushing chest pressure',
];

export async function analyzeSymptomsWithGemini(
  symptoms: string,
  age?: number,
  gender?: string
): Promise<SymptomAnalysisResult> {
  const lowerSymptoms = symptoms.toLowerCase();
  
  // Instant Safety Intercept
  const matchedEmergency = EMERGENCY_KEYWORDS.find(k => lowerSymptoms.includes(k));
  if (matchedEmergency) {
    return {
      isEmergency: true,
      urgencyLevel: 'emergency',
      recommendedSpecialty: 'Emergency Medicine / Cardiology',
      possibleCauses: [
        {
          name: 'Critical Emergency Condition (Acute Cardiac / Respiratory Event)',
          likelihood: 'High',
          description: `Your reported symptom ("${matchedEmergency}") indicates a potential medical emergency requiring immediate in-person urgent care.`,
        }
      ],
      homeCareAdvice: [
        'Call 108 / Emergency Ambulance immediately.',
        'Do not drive yourself to the hospital.',
        'Sit upright, loosen tight clothing, and stay calm while help arrives.',
      ],
      disclaimer: 'CRITICAL ALERT: Curivo AI detected emergency red-flags. Seek immediate emergency medical care.',
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are Curivo's Medical Triage Assistant. Analyze these patient symptoms:
Symptoms: "${symptoms}"
Patient Context: ${age ? `Age: ${age}` : ''} ${gender ? `Gender: ${gender}` : ''}

CRITICAL RULES:
1. You are NOT a doctor. Output JSON ONLY.
2. Recommend the most appropriate specialist (e.g. Cardiology, Dermatology, Neurology, Pediatrics, Orthopedics, General Physician, Gynecology, ENT).
3. Assess urgency level: "low", "medium", or "high".
4. List 2 to 3 possible non-definitive causes with likelihoods ("High", "Moderate", "Low").
5. Provide 3 safe, practical home care or preparation steps before seeing a doctor.

Output JSON format EXACTLY like this (no markdown ticks, raw JSON only):
{
  "isEmergency": false,
  "urgencyLevel": "medium",
  "recommendedSpecialty": "General Physician",
  "possibleCauses": [
    { "name": "Cause Name", "likelihood": "Moderate", "description": "Brief explanation" }
  ],
  "homeCareAdvice": ["Advice 1", "Advice 2", "Advice 3"],
  "disclaimer": "This is an AI symptom triaging aid and not a medical diagnosis. Please consult a qualified doctor for medical advice."
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim().replace(/```json/g, '').replace(/```/g, '');
    const jsonResult = JSON.parse(text) as SymptomAnalysisResult;
    return jsonResult;
  } catch (error) {
    console.warn('Gemini API call failed or timed out, using fallback triage engine:', error);
    return getFallbackSymptomAnalysis(symptoms);
  }
}

export async function explainPrescriptionWithGemini(
  prescriptionText: string,
  medicines: { medicineName: string; dosage: string; frequency: string; timing: string; instructions: string }[]
): Promise<PrescriptionExplanationResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are Curivo's AI Prescription Explainer. Explain this medical prescription in simple, reassuring plain language that an everyday patient can understand:

Prescription Summary: "${prescriptionText}"
Medications:
${JSON.stringify(medicines, null, 2)}

Output raw JSON ONLY (no extra markdown formatting):
{
  "overallSummary": "Plain language summary of what this prescription does for the patient.",
  "medicineExplanations": [
    {
      "medicineName": "Name",
      "purpose": "What this medicine treats in plain terms",
      "timingGuide": "When and how to take it (e.g., after meals, at bedtime)",
      "sideEffects": ["Common mild side effect 1", "Common mild side effect 2"],
      "importantWarning": "Key safety warning or food interaction to avoid"
    }
  ],
  "lifestyleAdvice": "1-2 daily lifestyle tips while taking these medicines.",
  "followUpReminder": "Friendly check-in advice for the coming days."
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim().replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(text) as PrescriptionExplanationResult;
  } catch (error) {
    console.warn('Gemini API call failed, using smart fallback explainer:', error);
    return getFallbackPrescriptionExplanation(medicines);
  }
}

// Resilient Fallback Engine if API network key is pending
function getFallbackSymptomAnalysis(symptoms: string): SymptomAnalysisResult {
  const lower = symptoms.toLowerCase();
  let specialty = 'General Physician';
  let urgency: 'low' | 'medium' | 'high' = 'low';
  let causes = [
    { name: 'Common Viral Syndrome / Fatigue', likelihood: 'High' as const, description: 'Mild systemic body response or fatigue.' },
    { name: 'Transient Stress or Dehydration', likelihood: 'Moderate' as const, description: 'Low hydration levels or muscular tension.' }
  ];

  if (lower.includes('skin') || lower.includes('rash') || lower.includes('itch') || lower.includes('acne')) {
    specialty = 'Dermatology';
    causes = [
      { name: 'Contact Dermatitis', likelihood: 'High' as const, description: 'Skin reaction to an external irritant or allergen.' },
      { name: 'Acute Urticaria / Hives', likelihood: 'Moderate' as const, description: 'Localized allergic skin flare-up.' }
    ];
  } else if (lower.includes('headache') || lower.includes('migraine') || lower.includes('dizzy')) {
    specialty = 'Neurology';
    urgency = 'medium';
    causes = [
      { name: 'Tension Headache', likelihood: 'High' as const, description: 'Scalp and neck muscle contraction.' },
      { name: 'Migraine Episode', likelihood: 'Moderate' as const, description: 'Vascular neurological headache.' }
    ];
  } else if (lower.includes('child') || lower.includes('baby') || lower.includes('fever in kid')) {
    specialty = 'Pediatrics';
    urgency = 'medium';
  } else if (lower.includes('bone') || lower.includes('joint') || lower.includes('knee') || lower.includes('back pain')) {
    specialty = 'Orthopedics';
    causes = [
      { name: 'Acute Ligament Strain', likelihood: 'High' as const, description: 'Overextension of joint cartilage or tendons.' },
      { name: 'Postural Inflammatory Soreness', likelihood: 'Moderate' as const, description: 'Ergonomic muscular strain.' }
    ];
  }

  return {
    isEmergency: false,
    urgencyLevel: urgency,
    recommendedSpecialty: specialty,
    possibleCauses: causes,
    homeCareAdvice: [
      'Maintain adequate hydration (2.5L water daily).',
      'Track symptom frequency and write down when it feels worst.',
      'Schedule a consultation with a verified specialist below.'
    ],
    disclaimer: 'Curivo AI Triage Notice: This is an automated assessment to assist doctor selection, not a clinical diagnosis.',
  };
}

function getFallbackPrescriptionExplanation(
  medicines: { medicineName: string; dosage: string; frequency: string; timing: string; instructions: string }[]
): PrescriptionExplanationResult {
  return {
    overallSummary: 'Your doctor prescribed targeted treatment to relieve active symptoms and accelerate your recovery.',
    medicineExplanations: medicines.map(m => ({
      medicineName: m.medicineName,
      purpose: `Primary prescribed therapy (${m.dosage}) to manage symptoms effectively.`,
      timingGuide: `Take ${m.frequency} — strictly ${m.timing} as specified by your physician.`,
      sideEffects: ['Mild stomach sensitivity', 'Slight dry mouth'],
      importantWarning: `Complete the full ${m.instructions || 'prescribed course'} without skipping doses.`,
    })),
    lifestyleAdvice: 'Drink plenty of water, avoid alcohol or heavy fried meals while taking these medications, and rest adequately.',
    followUpReminder: 'Curivo will send an automated follow-up check-in in 3 days to see how you are feeling.',
  };
}
