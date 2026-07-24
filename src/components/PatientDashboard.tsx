'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  User, 
  ChevronRight,
  Info,
  BellRing,
  RefreshCw,
  X
} from 'lucide-react';
import { Prescription, Appointment } from '@/lib/mockData';
import { explainPrescriptionWithGemini, PrescriptionExplanationResult } from '@/lib/ai/gemini';

interface PatientDashboardProps {
  appointments: Appointment[];
  prescriptions: Prescription[];
  onOpenDoctorSearch: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  appointments,
  prescriptions,
  onOpenDoctorSearch,
}) => {
  const [selectedPrescriptionForAI, setSelectedPrescriptionForAI] = useState<Prescription | null>(null);
  const [explaining, setExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<PrescriptionExplanationResult | null>(null);

  const handleTriggerAIExplainer = async (rx: Prescription) => {
    setSelectedPrescriptionForAI(rx);
    setExplaining(true);
    setAiExplanation(null);

    try {
      const summaryText = `Diagnosis: ${rx.diagnosis}. General Notes: ${rx.generalNotes}`;
      const res = await explainPrescriptionWithGemini(summaryText, rx.medicines);
      setAiExplanation(res);
    } catch (err) {
      console.error('Prescription AI Error:', err);
    } finally {
      setExplaining(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Patient Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-2xl font-bold">
            AP
          </div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold">Aarav Patel</h1>
            <p className="text-xs text-slate-400 mt-0.5">32 Years • Male • Patient ID: PAT-908123</p>
            <p className="text-xs text-brand-300 font-medium mt-1">✨ Curivo Health Vault Active</p>
          </div>
        </div>

        <button
          onClick={onOpenDoctorSearch}
          className="px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
        >
          Book New Consultation
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Simulated AI Follow-up Check-in Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-ai-50 to-brand-50 border-2 border-ai-200 shadow-sm flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-ai-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <BellRing className="w-5 h-5 animate-bounce" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ai-700">
              Curivo AI Follow-up Check-in (3 Days Post-Visit)
            </span>
            <span className="text-[10px] font-semibold text-slate-500">Automated Notification</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            "Hi Aarav! How are you feeling today following your consultation with Dr. Ananya Roy for skin itchiness?"
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button className="px-3 py-1.5 bg-ai-600 hover:bg-ai-700 text-white text-xs font-bold rounded-lg transition-colors">
              Reply: "Feeling Much Better"
            </button>
            <button className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold rounded-lg transition-colors">
              Request Doctor Follow-up
            </button>
          </div>
        </div>
      </div>

      {/* Prescriptions Vault */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            Digital Prescriptions & AI Explainer Vault
          </h2>
          <span className="text-xs font-bold text-slate-500">{prescriptions.length} Records Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="glass-card bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-300 transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      Prescription #{rx.id}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 mt-1">{rx.doctorName}</h3>
                    <p className="text-xs text-slate-500">{rx.doctorSpecialty} • Date: {rx.date}</p>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Diagnosis</span>
                  <p className="text-xs font-extrabold text-slate-800">{rx.diagnosis}</p>
                </div>

                {/* Medicines List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Prescribed Medicines ({rx.medicines.length})
                  </span>
                  <div className="space-y-1.5">
                    {rx.medicines.map((med, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900">{med.medicineName}</span>
                          <span className="text-slate-500 ml-2">({med.dosage})</span>
                        </div>
                        <span className="font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                          {med.frequency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Explainer Action Button */}
              <button
                onClick={() => handleTriggerAIExplainer(rx)}
                className="w-full py-3 bg-gradient-to-r from-brand-600 to-ai-600 hover:from-brand-700 hover:to-ai-700 text-white font-bold text-xs rounded-xl shadow-md shadow-ai-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                Explain Prescription in Plain English with Gemini AI
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Prescription Explainer Modal */}
      {selectedPrescriptionForAI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-card bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 p-6 space-y-6">
            
            <div className="ai-gradient-bg -m-6 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-extrabold">Curivo AI Prescription Breakdown</h3>
                  <p className="text-xs text-ai-100 font-medium">Doctor: {selectedPrescriptionForAI.doctorName}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPrescriptionForAI(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 space-y-5 max-h-[70vh] overflow-y-auto">
              {explaining ? (
                <div className="py-12 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-ai-600 animate-spin mx-auto" />
                  <p className="text-sm font-bold text-slate-700">
                    Gemini AI analyzing medical terminology into plain English...
                  </p>
                </div>
              ) : aiExplanation ? (
                <div className="space-y-5">
                  
                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-ai-50 border border-ai-200">
                    <span className="text-xs font-bold text-ai-900 uppercase tracking-wider block mb-1">
                      Plain Language Summary
                    </span>
                    <p className="text-xs text-ai-950 font-medium leading-relaxed">
                      {aiExplanation.overallSummary}
                    </p>
                  </div>

                  {/* Medicines Guidance Cards */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Medication Guidance
                    </h4>
                    {aiExplanation.medicineExplanations.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-extrabold text-sm text-slate-900">{m.medicineName}</h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-700">
                            {m.timingGuide}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700"><strong>Purpose:</strong> {m.purpose}</p>
                        <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                          ⚠️ <strong>Warning:</strong> {m.importantWarning}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Lifestyle Advice */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
                    <span className="text-xs font-bold text-brand-300 uppercase tracking-wider block">Doctor Lifestyle Advice</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{aiExplanation.lifestyleAdvice}</p>
                  </div>

                </div>
              ) : null}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
