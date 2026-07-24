'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Activity, 
  Search, 
  X, 
  ArrowRight,
  RefreshCw,
  Info
} from 'lucide-react';
import { analyzeSymptomsWithGemini, SymptomAnalysisResult } from '@/lib/ai/gemini';

interface SymptomCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpecialty: (specialty: string) => void;
}

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({
  isOpen,
  onClose,
  onSelectSpecialty,
}) => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<string>('Male');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomAnalysisResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async (textToAnalyze?: string) => {
    const input = textToAnalyze || symptoms;
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await analyzeSymptomsWithGemini(input, age, gender);
      setResult(res);
    } catch (err) {
      console.error('Triage error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTestNormal = () => {
    const testText = 'Mild headache, slight fever of 99.5F, and dry cough for past 2 days.';
    setSymptoms(testText);
    handleAnalyze(testText);
  };

  const handleQuickTestEmergency = () => {
    const emergencyText = 'Sudden severe chest pain spreading to left arm with shortness of breath and sweating.';
    setSymptoms(emergencyText);
    handleAnalyze(emergencyText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-card bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header Banner */}
        <div className="ai-gradient-bg px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                Curivo AI Symptom Triage
              </h2>
              <p className="text-xs text-ai-100 font-medium">
                Powered by Gemini 1.5 Flash • Instant Specialty & Urgency Matching
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Describe Your Symptoms
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="E.g., I have had a dull headache for 2 days along with skin rash on my forearm and mild fever..."
                  rows={3}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Context Inputs & Quick Tests */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Age:</span>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-14 bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Gender:</span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Demo Shortcut Chips */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleQuickTestNormal}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center gap-1"
                >
                  <Activity className="w-3.5 h-3.5 text-brand-600" />
                  Try Sample Symptom
                </button>
                <button
                  type="button"
                  onClick={handleQuickTestEmergency}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  Test Safety Red-Flag
                </button>
              </div>
            </div>

            <button
              onClick={() => handleAnalyze()}
              disabled={loading || !symptoms.trim()}
              className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-ai-600 hover:from-brand-700 hover:to-ai-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                  Curivo AI Triage Engine Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze Symptoms & Recommend Specialist
                </>
              )}
            </button>
          </div>

          {/* AI Result Card */}
          {result && (
            <div className="space-y-5 animate-fade-in border-t border-slate-200 pt-6">
              
              {/* Emergency Banner Guardrail */}
              {result.isEmergency && (
                <div className="p-4 rounded-2xl bg-red-600 text-white shadow-xl flex items-start gap-4 animate-pulse">
                  <ShieldAlert className="w-8 h-8 flex-shrink-0 text-white mt-1" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">EMERGENCY RED-FLAG DETECTED</h3>
                    <p className="text-sm text-red-100 leading-relaxed">
                      {result.disclaimer}
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <a
                        href="tel:108"
                        className="px-4 py-2 bg-white text-red-700 font-extrabold text-xs rounded-lg shadow hover:bg-red-50 uppercase tracking-wider inline-block"
                      >
                        Call 108 Emergency Ambulance
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Triage Overview Bar */}
              {!result.isEmergency && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-wrap items-center justify-between gap-4 shadow-lg">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Recommended Specialty</span>
                    <span className="text-xl font-heading font-extrabold text-brand-300">
                      {result.recommendedSpecialty}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Triage Urgency</span>
                      <span className={`text-sm font-bold uppercase tracking-wider ${
                        result.urgencyLevel === 'low' ? 'text-emerald-400' :
                        result.urgencyLevel === 'medium' ? 'text-amber-400' : 'text-orange-400'
                      }`}>
                        {result.urgencyLevel} Urgency
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onSelectSpecialty(result.recommendedSpecialty);
                        onClose();
                      }}
                      className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all"
                    >
                      <Search className="w-3.5 h-3.5" />
                      Find {result.recommendedSpecialty} Doctors
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Possible Causes List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-brand-600" />
                  Possible Non-Definitive Causes (AI Triaged)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.possibleCauses.map((cause, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-800">{cause.name}</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          cause.likelihood === 'High' ? 'bg-brand-100 text-brand-700' :
                          cause.likelihood === 'Moderate' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {cause.likelihood} Likelihood
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{cause.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Advice */}
              <div className="p-4 rounded-xl bg-ai-50/70 border border-ai-200 space-y-2">
                <h4 className="text-xs font-bold text-ai-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-ai-600" />
                  Recommended Next Steps
                </h4>
                <ul className="space-y-1.5">
                  {result.homeCareAdvice.map((step, idx) => (
                    <li key={idx} className="text-xs text-ai-950 font-medium flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-500 mt-1.5 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium leading-relaxed">
                ⚠️ <strong>Medical Disclaimer:</strong> {result.disclaimer}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
