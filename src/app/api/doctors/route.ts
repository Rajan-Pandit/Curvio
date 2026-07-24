import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { INITIAL_DOCTORS, Doctor } from '@/lib/mockData';

// In-memory cache fallback if Supabase table is pending setup
let memoryDoctors: Doctor[] = [...INITIAL_DOCTORS];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const specialty = searchParams.get('specialty');
    const city = searchParams.get('city');

    const { data: dbDoctors, error } = await supabase
      .from('doctor_profiles')
      .select('*');

    if (!error && dbDoctors && dbDoctors.length > 0) {
      let results = dbDoctors;
      if (specialty && specialty !== 'All') {
        results = results.filter((d: any) => d.specialty?.toLowerCase() === specialty.toLowerCase());
      }
      if (city && city !== 'All') {
        results = results.filter((d: any) => d.city?.toLowerCase() === city.toLowerCase());
      }
      return NextResponse.json({ success: true, data: results });
    }

    // Fallback to memory doctors
    let results = memoryDoctors;
    if (specialty && specialty !== 'All') {
      results = results.filter(d => d.specialty.toLowerCase() === specialty.toLowerCase());
    }
    if (city && city !== 'All') {
      results = results.filter(d => d.city.toLowerCase() === city.toLowerCase());
    }

    return NextResponse.json({ success: true, data: results, source: 'memory' });
  } catch (err: any) {
    return NextResponse.json({ success: true, data: memoryDoctors, source: 'fallback' });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { doctorId, verified } = body;

    if (!doctorId) {
      return NextResponse.json({ error: 'doctorId is required.' }, { status: 400 });
    }

    // Update Supabase DB
    await supabase
      .from('doctor_profiles')
      .update({ verified })
      .eq('user_id', doctorId);

    // Update in-memory state
    memoryDoctors = memoryDoctors.map(d =>
      d.id === doctorId ? { ...d, verified: typeof verified === 'boolean' ? verified : !d.verified } : d
    );

    const updatedDoctor = memoryDoctors.find(d => d.id === doctorId);

    return NextResponse.json({
      success: true,
      message: `Doctor verification updated to ${updatedDoctor?.verified}`,
      data: updatedDoctor,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update doctor verification.' }, { status: 500 });
  }
}
