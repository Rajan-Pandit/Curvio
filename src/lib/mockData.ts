export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  consultationFee: number; // in INR ₹
  rating: number;
  reviewsCount: number;
  hospital: string;
  city: string;
  avatar: string;
  verified: boolean;
  availableDays: string[];
  slots: string[];
  bio: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  timeSlot: string;
  fee: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentId?: string;
  paymentStatus: 'paid' | 'pending';
  symptomSummary?: string;
  createdAt: string;
}

export interface PrescriptionItem {
  medicineName: string;
  dosage: string; // e.g., "500mg"
  frequency: string; // e.g., "1-0-1 (Morning & Night)"
  timing: 'Before Food' | 'After Food' | 'With Food';
  durationDays: number;
  instructions: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  diagnosis: string;
  medicines: PrescriptionItem[];
  generalNotes: string;
  followUpDays: number;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  type: 'prescription' | 'lab_report' | 'scan';
  date: string;
  doctorName?: string;
  fileUrl: string;
}

// Initial Mock Seed Data
export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'Cardiology',
    qualification: 'MD, DM (Cardiology) - AIIMS Delhi',
    experienceYears: 16,
    consultationFee: 1200,
    rating: 4.9,
    reviewsCount: 312,
    hospital: 'Fortis Heart Institute',
    city: 'New Delhi',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    verified: true,
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    slots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'],
    bio: 'Senior Interventional Cardiologist specializing in preventive heart health, hypertension management, and non-invasive cardiac care.',
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Roy',
    specialty: 'Dermatology',
    qualification: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    experienceYears: 11,
    consultationFee: 800,
    rating: 4.85,
    reviewsCount: 245,
    hospital: 'Skin & Aesthetics Care',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1594824813566-8185d3886118?w=300&auto=format&fit=crop&q=80',
    verified: true,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    slots: ['11:00 AM', '01:00 PM', '03:30 PM', '05:30 PM'],
    bio: 'Consultant Dermatologist & Cosmetologist with expertise in laser treatments, acne management, and pediatric dermatology.',
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikramaditya Kulkarni',
    specialty: 'Neurology',
    qualification: 'MBBS, DNB (Neurology), Fellowship (Stroke Care)',
    experienceYears: 14,
    consultationFee: 1500,
    rating: 4.92,
    reviewsCount: 188,
    hospital: 'Apollo Neuroscience Center',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
    verified: true,
    availableDays: ['Tue', 'Wed', 'Fri', 'Sat'],
    slots: ['09:30 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    bio: 'Renowned Neurologist focusing on migraine management, nerve disorders, epilepsy, and cognitive neurological health.',
  },
  {
    id: 'doc-4',
    name: 'Dr. Priya Sundaram',
    specialty: 'Pediatrics',
    qualification: 'MBBS, DCH, MD (Pediatrics)',
    experienceYears: 12,
    consultationFee: 700,
    rating: 4.9,
    reviewsCount: 420,
    hospital: 'Rainbow Children Hospital',
    city: 'Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80',
    verified: true,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    slots: ['10:00 AM', '12:00 PM', '05:00 PM', '07:00 PM'],
    bio: 'Compassionate Pediatrician dedicated to child growth tracking, pediatric immunizations, and acute childhood illnesses.',
  },
  {
    id: 'doc-5',
    name: 'Dr. Arvind Mehta',
    specialty: 'General Physician',
    qualification: 'MBBS, MD (Internal Medicine)',
    experienceYears: 9,
    consultationFee: 500,
    rating: 4.78,
    reviewsCount: 510,
    hospital: 'Max Healthcare Centre',
    city: 'Gurugram',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80',
    verified: true,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    slots: ['09:00 AM', '10:30 AM', '12:00 PM', '04:00 PM', '06:00 PM'],
    bio: 'Holistic Primary Care Physician specializing in fever, metabolic disorders, diabetes care, and seasonal viral infections.',
  },
  {
    id: 'doc-6',
    name: 'Dr. Sunita Deshmukh',
    specialty: 'Gynecology',
    qualification: 'MBBS, MS (Obstetrics & Gynecology)',
    experienceYears: 18,
    consultationFee: 1000,
    rating: 4.95,
    reviewsCount: 380,
    hospital: 'Cloudnine Women Care',
    city: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1594824813566-8185d3886118?w=300&auto=format&fit=crop&q=80',
    verified: true,
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    slots: ['11:00 AM', '01:30 PM', '04:00 PM', '06:30 PM'],
    bio: 'Senior Gynecologist & High-Risk Pregnancy Specialist offering wellness, PCOS management, and laparoscopic care.',
  },
  {
    id: 'doc-7',
    name: 'Dr. Rohan Nambiar',
    specialty: 'Orthopedics',
    qualification: 'MBBS, MS (Orthopedics), MCh (UK)',
    experienceYears: 15,
    consultationFee: 1100,
    rating: 4.86,
    reviewsCount: 290,
    hospital: 'MIOT International',
    city: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop&q=80',
    verified: false, // For testing admin verification!
    availableDays: ['Tue', 'Thu', 'Sat'],
    slots: ['10:00 AM', '02:00 PM', '05:00 PM'],
    bio: 'Specialist in joint replacement, sports injury rehabilitation, spine trauma, and arthroscopic surgery.',
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    patientAge: 32,
    patientGender: 'Male',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rajesh Sharma',
    doctorSpecialty: 'Cardiology',
    date: '2026-07-24',
    timeSlot: '11:30 AM',
    fee: 1200,
    status: 'confirmed',
    paymentId: 'pay_rzp_test_908123',
    paymentStatus: 'paid',
    symptomSummary: 'Mild chest heaviness after exertion & elevated BP.',
    createdAt: '2026-07-22T09:00:00Z',
  },
  {
    id: 'apt-102',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    patientAge: 32,
    patientGender: 'Male',
    doctorId: 'doc-2',
    doctorName: 'Dr. Ananya Roy',
    doctorSpecialty: 'Dermatology',
    date: '2026-07-20',
    timeSlot: '03:30 PM',
    fee: 800,
    status: 'completed',
    paymentId: 'pay_rzp_test_887112',
    paymentStatus: 'paid',
    symptomSummary: 'Persistent dry skin patch on forearm.',
    createdAt: '2026-07-19T14:30:00Z',
  }
];

export const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-201',
    appointmentId: 'apt-102',
    doctorId: 'doc-2',
    doctorName: 'Dr. Ananya Roy',
    doctorSpecialty: 'Dermatology',
    patientId: 'pat-1',
    patientName: 'Aarav Patel',
    patientAge: 32,
    patientGender: 'Male',
    date: '2026-07-20',
    diagnosis: 'Contact Dermatitis / Eczematous Flare',
    medicines: [
      {
        medicineName: 'Cetirizine Hydrochloride',
        dosage: '10mg',
        frequency: '0-0-1 (Night only)',
        timing: 'After Food',
        durationDays: 7,
        instructions: 'Helps relieve skin itching and nighttime allergic response.',
      },
      {
        medicineName: 'Hydrocortisone 1% Cream',
        dosage: 'Topical Application',
        frequency: '1-0-1 (Twice Daily)',
        timing: 'After Food',
        durationDays: 5,
        instructions: 'Apply a thin layer gently over the affected forearm area after washing.',
      },
      {
        medicineName: 'Emollient Moisturizing Lotion',
        dosage: 'Liberal application',
        frequency: 'As needed',
        timing: 'Before Food',
        durationDays: 14,
        instructions: 'Use post-bath to lock skin hydration.',
      }
    ],
    generalNotes: 'Avoid harsh chemical soaps. Stay hydrated and avoid direct sunlight exposure on forearm.',
    followUpDays: 7,
  }
];
