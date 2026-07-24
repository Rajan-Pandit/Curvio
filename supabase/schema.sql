-- Curivo — Supabase Database DDL Schema (Idempotent Migration)

-- 1. Create Enum Types safely if they do not exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status') THEN
        CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
        CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
    END IF;
END $$;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'patient',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Patient Profiles Table
CREATE TABLE IF NOT EXISTS patient_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    age INT,
    gender VARCHAR(50),
    phone VARCHAR(20),
    address TEXT,
    medical_history JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Doctor Profiles Table
CREATE TABLE IF NOT EXISTS doctor_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    specialty VARCHAR(100) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    experience_years INT NOT NULL,
    consultation_fee NUMERIC(10, 2) NOT NULL, -- in INR ₹
    hospital_name VARCHAR(255),
    city VARCHAR(100),
    bio TEXT,
    verified BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Doctor Availability Slots
CREATE TABLE IF NOT EXISTS availability_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID REFERENCES doctor_profiles(user_id) ON DELETE CASCADE,
    day_of_week VARCHAR(20) NOT NULL, -- 'Mon', 'Tue', etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- 6. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    slot_time VARCHAR(50) NOT NULL,
    fee NUMERIC(10, 2) NOT NULL,
    status appointment_status DEFAULT 'pending',
    symptom_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Payments Table (Razorpay Integration)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    razorpay_payment_id VARCHAR(255) NOT NULL,
    razorpay_order_id VARCHAR(255),
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status payment_status DEFAULT 'paid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Digital Prescriptions Table
CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    diagnosis TEXT NOT NULL,
    content JSONB NOT NULL, -- Stores medicines array [{ medicineName, dosage, timing, duration }]
    general_notes TEXT,
    follow_up_days INT DEFAULT 7,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Medical Records Vault
CREATE TABLE IF NOT EXISTS medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    record_type VARCHAR(50) NOT NULL, -- 'prescription', 'lab_report', 'scan'
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. AI Conversations Audit Log
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES users(id) ON DELETE SET NULL,
    conversation_type VARCHAR(50) NOT NULL, -- 'symptom_checker', 'prescription_explainer'
    input_text TEXT NOT NULL,
    output_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
