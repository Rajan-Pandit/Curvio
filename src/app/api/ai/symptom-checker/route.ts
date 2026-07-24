import { NextRequest, NextResponse } from 'next/server';
import { analyzeSymptomsWithGemini } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symptoms, age, gender } = body;

    if (!symptoms || typeof symptoms !== 'string') {
      return NextResponse.json(
        { error: 'Symptoms text is required.' },
        { status: 400 }
      );
    }

    const triageResult = await analyzeSymptomsWithGemini(symptoms, age, gender);
    return NextResponse.json({ success: true, data: triageResult });
  } catch (error: any) {
    console.error('Error in /api/ai/symptom-checker:', error);
    return NextResponse.json(
      { error: 'Failed to analyze symptoms.', details: error?.message },
      { status: 500 }
    );
  }
}
