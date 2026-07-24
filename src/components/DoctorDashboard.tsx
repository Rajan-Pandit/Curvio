'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  User, 
  FileText, 
  Calendar, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { Appointment, Prescription, PrescriptionItem, Doctor } from '@/lib/mockData';

interface DoctorDashboardProps {
  doctor: Doctor;
  appointments: Appointment[];
  onUpdateAppointmentStatus: (id: string, status: 'confirmed' | 'completed' | 'cancelled') => void;
  onCreatePrescription: (prescription: Prescription) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  doctor,
  appointments,
  onUpdateAppointmentStatus,
  onCreatePrescription,
}) => {
  const [selectedAppointmentForRx, setSelectedAppointmentForRx] = useState<Appointment | null>(null);
  
  // Prescription Form State
  const [diagnosis, setDiagnosis] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [followUpDays, setFollowUpDays] = useState<number>(7);
  const [medicines, setMedicines] = useState<PrescriptionItem[]>([
    {
      medicineName: 'Paracetamol 650mg',
      dosage: '650mg',
      frequency: '1-0-1 (Morning & Evening)',
      timing: 'After Food',
      durationDays: 5,
      instructions: 'Take with full glass of water after breakfast and dinner.',
    }
  ]);

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicineName: '',
        dosage: '500mg',
        frequency: '1-0-1',
        timing: 'After Food',
        durationDays: 5,
        instructions: '',
      }
    ]);
  };

  const handleRemoveMedicine = (index: number) => {
    setMedicines(medicines.filter((_, idx) => idx !== index));
  };

  const handleMedicineChange = (index: number, field: keyof PrescriptionItem, value: any) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };

  const handleSubmitPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointmentForRx || !diagnosis.trim() || medicines.length === 0) return;

    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      appointmentId: selectedAppointmentForRx.id,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      patientId: 'pat-1',
      patientName: selectedAppointmentForRx.patientName,
      patientAge: selectedAppointmentForRx.patientAge,
      patientGender: selectedAppointmentForRx.patientGender,
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      medicines,
      generalNotes,
      followUpDays,
    };

    onCreatePrescription(newRx);
    onUpdateAppointmentStatus(selectedAppointmentForRx.id, 'completed');
    setSelectedAppointmentForRx(null);

    // Reset Form
    setDiagnosis('');
    setGeneralNotes('');
    setMedicines([]);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Doctor Header Banner */}
      <div className="glass-card bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-heading font-extrabold text-slate-900">
                {doctor.name}
              </h1>
              {doctor.verified && (
                <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  Verified Doctor
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-brand-600 mt-0.5">{doctor.specialty} • {doctor.qualification}</p>
            <p className="text-xs text-slate-500 mt-1">{doctor.hospital}, {doctor.city}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Consultation Fee</span>
            <span className="text-xl font-extrabold text-slate-900">₹{doctor.consultationFee}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Patient Rating</span>
            <span className="text-xl font-extrabold text-amber-500">★ {doctor.rating}</span>
          </div>
        </div>
      </div>

      {/* Appointment Queue Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-600" />
          Consultation Queue & Patient Requests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="glass-card bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 hover:border-brand-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                    ID: {apt.id}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-1">
                    {apt.patientName} ({apt.patientAge}y, {apt.patientGender})
                  </h3>
                  <p className="text-xs text-slate-500">{apt.patientPhone}</p>
                </div>

                <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase ${
                  apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                  apt.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {apt.status}
                </span>
              </div>

              {apt.symptomSummary && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-500 uppercase block text-[10px]">Triage Symptom Notes</span>
                  <p>{apt.symptomSummary}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {apt.date} at {apt.timeSlot}
                </div>
                <span className="font-extrabold text-slate-900">Paid ₹{apt.fee}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                {apt.status !== 'completed' && (
                  <button
                    onClick={() => {
                      setSelectedAppointmentForRx(apt);
                      setDiagnosis(apt.symptomSummary || 'General Consultation');
                    }}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Write Digital Prescription
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescription Writing Modal */}
      {selectedAppointmentForRx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl glass-card bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-brand-600" />
                  Digital Prescription Builder
                </h3>
                <p className="text-xs text-slate-500">
                  Patient: <strong className="text-slate-800">{selectedAppointmentForRx.patientName}</strong> ({selectedAppointmentForRx.patientAge}y, {selectedAppointmentForRx.patientGender})
                </p>
              </div>

              <button
                onClick={() => setSelectedAppointmentForRx(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitPrescription} className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
              
              {/* Diagnosis Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Clinical Diagnosis / Primary Assessment
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="E.g. Acute Allergic Rhinitis / Viral Fever..."
                  required
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
                />
              </div>

              {/* Medicines Builder Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Prescribed Medications
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMedicine}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Another Medicine
                  </button>
                </div>

                {medicines.map((med, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Medicine Name</label>
                        <input
                          type="text"
                          value={med.medicineName}
                          onChange={(e) => handleMedicineChange(idx, 'medicineName', e.target.value)}
                          placeholder="E.g. Cetirizine 10mg"
                          required
                          className="w-full p-2.5 text-xs rounded-lg border border-slate-200 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Dosage & Frequency</label>
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                          placeholder="E.g. 1-0-1 (Morning & Night)"
                          required
                          className="w-full p-2.5 text-xs rounded-lg border border-slate-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Timing</label>
                        <select
                          value={med.timing}
                          onChange={(e) => handleMedicineChange(idx, 'timing', e.target.value as any)}
                          className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-white font-semibold"
                        >
                          <option value="After Food">After Food</option>
                          <option value="Before Food">Before Food</option>
                          <option value="With Food">With Food</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={med.instructions}
                          onChange={(e) => handleMedicineChange(idx, 'instructions', e.target.value)}
                          placeholder="Instructions (e.g. Take with warm water before bedtime)"
                          className="w-full p-2.5 text-xs rounded-lg border border-slate-200"
                        />
                      </div>

                      {medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(idx)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes & Follow Up */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    General Dietary & Lifestyle Notes
                  </label>
                  <textarea
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    placeholder="E.g. Avoid cold drinks, rest for 3 days..."
                    rows={2}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Recommended Follow-up (Days)
                  </label>
                  <input
                    type="number"
                    value={followUpDays}
                    onChange={(e) => setFollowUpDays(Number(e.target.value))}
                    className="w-full p-3 text-xs font-bold rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Issue Official Digital Prescription
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
