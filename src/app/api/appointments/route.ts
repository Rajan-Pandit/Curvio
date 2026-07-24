import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { INITIAL_APPOINTMENTS, Appointment } from '@/lib/mockData';

let memoryAppointments: Appointment[] = [...INITIAL_APPOINTMENTS];

export async function GET(req: NextRequest) {
  try {
    const { data: dbAppointments, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && dbAppointments && dbAppointments.length > 0) {
      return NextResponse.json({ success: true, data: dbAppointments });
    }

    return NextResponse.json({ success: true, data: memoryAppointments, source: 'memory' });
  } catch (err: any) {
    return NextResponse.json({ success: true, data: memoryAppointments, source: 'fallback' });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { doctorId, doctorName, doctorSpecialty, fee, date, timeSlot, patientName, symptomSummary, paymentId } = body;

    if (!doctorId || !fee) {
      return NextResponse.json({ error: 'Missing required appointment fields.' }, { status: 400 });
    }

    const newApt: Appointment = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      patientName: patientName || 'Aarav Patel',
      patientPhone: '+91 98765 43210',
      patientAge: 32,
      patientGender: 'Male',
      doctorId,
      doctorName: doctorName || 'Specialist Doctor',
      doctorSpecialty: doctorSpecialty || 'General',
      date: date || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || '10:00 AM',
      fee: Number(fee),
      status: 'confirmed',
      paymentId: paymentId || `pay_rzp_test_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      paymentStatus: 'paid',
      symptomSummary: symptomSummary || 'Consultation booking',
      createdAt: new Date().toISOString(),
    };

    // Insert to Supabase DB if active
    await supabase.from('appointments').insert([
      {
        id: newApt.id,
        patient_id: 'pat-1',
        doctor_id: doctorId,
        slot_date: newApt.date,
        slot_time: newApt.timeSlot,
        fee: newApt.fee,
        status: 'confirmed',
        symptom_summary: newApt.symptomSummary,
      }
    ]);

    memoryAppointments = [newApt, ...memoryAppointments];

    return NextResponse.json({ success: true, data: newApt });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create appointment.' }, { status: 500 });
  }
}
