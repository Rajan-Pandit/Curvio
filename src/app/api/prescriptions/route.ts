import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { INITIAL_PRESCRIPTIONS, Prescription } from '@/lib/mockData';

let memoryPrescriptions: Prescription[] = [...INITIAL_PRESCRIPTIONS];

export async function GET(req: NextRequest) {
  try {
    const { data: dbRx, error } = await supabase
      .from('prescriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && dbRx && dbRx.length > 0) {
      return NextResponse.json({ success: true, data: dbRx });
    }

    return NextResponse.json({ success: true, data: memoryPrescriptions, source: 'memory' });
  } catch (err: any) {
    return NextResponse.json({ success: true, data: memoryPrescriptions, source: 'fallback' });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { appointmentId, doctorId, doctorName, doctorSpecialty, patientName, patientAge, patientGender, diagnosis, medicines, generalNotes, followUpDays } = body;

    if (!diagnosis || !medicines || medicines.length === 0) {
      return NextResponse.json({ error: 'Diagnosis and prescribed medicines are required.' }, { status: 400 });
    }

    const newRx: Prescription = {
      id: `rx-${Date.now().toString().slice(-4)}`,
      appointmentId: appointmentId || `apt-${Date.now().toString().slice(-4)}`,
      doctorId: doctorId || 'doc-1',
      doctorName: doctorName || 'Dr. Ananya Roy',
      doctorSpecialty: doctorSpecialty || 'Dermatology',
      patientId: 'pat-1',
      patientName: patientName || 'Aarav Patel',
      patientAge: patientAge || 32,
      patientGender: patientGender || 'Male',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      medicines,
      generalNotes: generalNotes || '',
      followUpDays: followUpDays || 7,
    };

    // Insert to Supabase DB if active
    await supabase.from('prescriptions').insert([
      {
        id: newRx.id,
        appointment_id: newRx.appointmentId,
        doctor_id: newRx.doctorId,
        patient_id: newRx.patientId,
        diagnosis: newRx.diagnosis,
        content: newRx.medicines,
        general_notes: newRx.generalNotes,
        follow_up_days: newRx.followUpDays,
      }
    ]);

    memoryPrescriptions = [newRx, ...memoryPrescriptions];

    return NextResponse.json({ success: true, data: newRx });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create prescription.' }, { status: 500 });
  }
}
