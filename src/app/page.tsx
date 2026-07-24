'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { DoctorSearch } from '@/components/DoctorSearch';
import { SymptomCheckerModal } from '@/components/SymptomCheckerModal';
import { RazorpayModal } from '@/components/RazorpayModal';
import { DoctorDashboard } from '@/components/DoctorDashboard';
import { PatientDashboard } from '@/components/PatientDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { 
  INITIAL_DOCTORS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PRESCRIPTIONS, 
  Doctor, 
  Appointment, 
  Prescription 
} from '@/lib/mockData';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  
  // App Data State
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);

  // Filter State
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string>('All');

  // Modals
  const [isSymptomCheckerOpen, setIsSymptomCheckerOpen] = useState(false);
  const [bookingModalDoctor, setBookingModalDoctor] = useState<Doctor | null>(null);
  const [pendingBookingDetails, setPendingBookingDetails] = useState<{ date: string; time: string } | null>(null);

  // Sync LocalStorage
  useEffect(() => {
    const savedDoctors = localStorage.getItem('curivo_doctors');
    if (savedDoctors) {
      try { setDoctors(JSON.parse(savedDoctors)); } catch (e) {}
    }
  }, []);

  const saveDoctorsState = (newDoctors: Doctor[]) => {
    setDoctors(newDoctors);
    localStorage.setItem('curivo_doctors', JSON.stringify(newDoctors));
  };

  // Doctor Verification Toggle (Admin Action)
  const handleToggleDoctorVerification = (doctorId: string) => {
    const updated = doctors.map(d => d.id === doctorId ? { ...d, verified: !d.verified } : d);
    saveDoctorsState(updated);
  };

  // Handle Booking Appointment Trigger -> opens Razorpay modal
  const handleInitiateBooking = (doctor: Doctor, slotDate: string = '2026-07-24', slotTime: string = '10:00 AM') => {
    setBookingModalDoctor(doctor);
    setPendingBookingDetails({ date: slotDate, time: slotTime });
  };

  // Razorpay Payment Success Handler
  const handlePaymentSuccess = (paymentId: string) => {
    if (!bookingModalDoctor || !pendingBookingDetails) return;

    const newApt: Appointment = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      patientName: 'Aarav Patel',
      patientPhone: '+91 98765 43210',
      patientAge: 32,
      patientGender: 'Male',
      doctorId: bookingModalDoctor.id,
      doctorName: bookingModalDoctor.name,
      doctorSpecialty: bookingModalDoctor.specialty,
      date: pendingBookingDetails.date,
      timeSlot: pendingBookingDetails.time,
      fee: bookingModalDoctor.consultationFee,
      status: 'confirmed',
      paymentId,
      paymentStatus: 'paid',
      symptomSummary: `Triaged consultation for ${bookingModalDoctor.specialty}`,
      createdAt: new Date().toISOString(),
    };

    setAppointments([newApt, ...appointments]);
    setBookingModalDoctor(null);
    setPendingBookingDetails(null);
    setActiveTab('prescriptions'); // Navigate to patient dashboard to view confirmed booking!
  };

  // Doctor Updates Appointment Status
  const handleUpdateAppointmentStatus = (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  // Doctor Creates New Prescription
  const handleCreatePrescription = (newRx: Prescription) => {
    setPrescriptions([newRx, ...prescriptions]);
  };

  // Select specialty from Symptom Checker or Hero Chip
  const handleSelectSpecialty = (specialty: string) => {
    setSelectedSpecialtyFilter(specialty);
    setActiveTab('doctors');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
      />

      {/* Main App Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'home' && (
          <HeroSection
            onOpenSymptomChecker={() => setIsSymptomCheckerOpen(true)}
            onSelectSpecialty={handleSelectSpecialty}
            featuredDoctors={doctors.filter(d => d.verified)}
            onBookDoctor={(doc) => handleInitiateBooking(doc)}
          />
        )}

        {activeTab === 'doctors' && (
          <DoctorSearch
            doctors={doctors}
            selectedSpecialtyFilter={selectedSpecialtyFilter}
            onBookDoctor={(doc, date, time) => handleInitiateBooking(doc, date, time)}
          />
        )}

        {activeTab === 'prescriptions' && (
          <PatientDashboard
            appointments={appointments}
            prescriptions={prescriptions}
            onOpenDoctorSearch={() => setActiveTab('doctors')}
          />
        )}

        {activeTab === 'doctor-dashboard' && (
          <DoctorDashboard
            doctor={doctors[0]}
            appointments={appointments}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
            onCreatePrescription={handleCreatePrescription}
          />
        )}

        {activeTab === 'admin-dashboard' && (
          <AdminDashboard
            doctors={doctors}
            appointments={appointments}
            onToggleDoctorVerification={handleToggleDoctorVerification}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-slate-900 text-sm tracking-tight">CURIVO</span>
            <span>• AI-Native Healthcare Platform</span>
          </div>
          <p>© 2026 Curivo Healthcare. All rights reserved. Powered by Google Gemini AI & Razorpay.</p>
        </div>
      </footer>

      {/* AI Symptom Checker Modal */}
      <SymptomCheckerModal
        isOpen={isSymptomCheckerOpen}
        onClose={() => setIsSymptomCheckerOpen(false)}
        onSelectSpecialty={handleSelectSpecialty}
      />

      {/* Razorpay Test Checkout Modal */}
      {bookingModalDoctor && pendingBookingDetails && (
        <RazorpayModal
          isOpen={true}
          doctor={bookingModalDoctor}
          slotDate={pendingBookingDetails.date}
          slotTime={pendingBookingDetails.time}
          onClose={() => setBookingModalDoctor(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
}
