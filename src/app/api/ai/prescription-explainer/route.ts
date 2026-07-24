import { NextRequest, NextResponse } from 'next/server';
import { explainPrescriptionWithGemini } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prescriptionText, medicines } = body;

    if (!medicines || !Array.isArray(medicines)) {
      return NextResponse.json(
        { error: 'Medicines array is required.' },
        { status: 400 }
      );
    }

    const explanationResult = await explainPrescriptionWithGemini(
      prescriptionText || '',
      medicines
    );

    return NextResponse.json({ success: true, data: explanationResult });
  } catch (error: any) {
    console.error('Error in /api/ai/prescription-explainer:', error);
    return NextResponse.json(
      { error: 'Failed to explain prescription.', details: error?.message },
      { status: 500 }
    );
  }
}
