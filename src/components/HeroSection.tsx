'use client';

import React from 'react';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  HeartPulse, 
  Brain, 
  Baby, 
  Bone, 
  Activity, 
  ChevronRight,
  ArrowRight,
  Zap,
  Lock,
  Star
} from 'lucide-react';
import { Doctor } from '@/lib/mockData';

interface HeroSectionProps {
  onOpenSymptomChecker: () => void;
  onSelectSpecialty: (specialty: string) => void;
  featuredDoctors: Doctor[];
  onBookDoctor: (doctor: Doctor) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSymptomChecker,
  onSelectSpecialty,
  featuredDoctors,
  onBookDoctor,
}) => {
  const specialties = [
    { name: 'Cardiology', icon: HeartPulse, count: '3 Specialists', color: 'bg-rose-50 text-rose-600 border-rose-200' },
    { name: 'Dermatology', icon: Sparkles, count: '2 Specialists', color: 'bg-ai-50 text-ai-600 border-ai-200' },
    { name: 'Neurology', icon: Brain, count: '2 Specialists', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    { name: 'Pediatrics', icon: Baby, count: '4 Specialists', color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { name: 'Orthopedics', icon: Bone, count: '3 Specialists', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { name: 'General Physician', icon: Activity, count: '5 Specialists', color: 'bg-brand-50 text-brand-600 border-brand-200' },
  ];

  return (
    <div className="space-y-16 py-4">
      
      {/* Main Hero Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-brand-50/70 via-white to-slate-50 p-8 sm:p-12 border border-brand-100/80 shadow-xl shadow-brand-500/5 overflow-hidden">
        
        {/* Subtle Background Glow Spheres */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-ai-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-100 to-ai-100 border border-brand-200 shadow-sm animate-pulse-subtle">
            <Sparkles className="w-4 h-4 text-ai-600" />
            <span className="text-xs font-bold tracking-wide uppercase text-slate-800">
              Next-Gen Healthcare MVP • Powered by Gemini AI & Razorpay
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Smarter AI Triage.{' '}
            <span className="ai-gradient-text">
              Trusted Doctor Bookings.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Curivo combines Gemini AI symptom triaging, instant specialist discovery, seamless Razorpay test payments, and plain-language digital prescription explanations into one trusted healthcare platform.
          </p>

          {/* Quick AI Symptom Bar CTA */}
          <div 
            onClick={onOpenSymptomChecker}
            className="max-w-2xl mx-auto glass-card bg-white p-3 rounded-2xl border-2 border-brand-200/80 shadow-xl hover:shadow-2xl hover:border-brand-500 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl ai-gradient-bg flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>

            <div className="flex-1 text-left px-2">
              <p className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                What symptoms are you experiencing today?
              </p>
              <p className="text-[11px] text-slate-500">
                E.g. "Headache and mild fever", or test emergency red-flags...
              </p>
            </div>

            <button className="w-full sm:w-auto px-6 py-3 bg-brand-600 group-hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all">
              Run AI Triage
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Emergency Red-Flag Guard</h4>
                <p className="text-[11px] text-slate-500">Instant safety intercept</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <Lock className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Razorpay Test Gateway</h4>
                <p className="text-[11px] text-slate-500">Instant ₹ receipt generation</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <Sparkles className="w-5 h-5 text-ai-600 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">AI Rx Explainer</h4>
                <p className="text-[11px] text-slate-500">Plain English medicine breakdown</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Specialty Categories Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-extrabold text-slate-900">
              Browse Top Medical Specialties
            </h2>
            <p className="text-xs text-slate-500">
              Select a specialty to filter verified doctors across India
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.name}
                onClick={() => onSelectSpecialty(spec.name)}
                className="glass-card bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-400 hover:shadow-lg transition-all duration-200 cursor-pointer text-center space-y-3 group"
              >
                <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center border ${spec.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-600 transition-colors">
                    {spec.name}
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                    {spec.count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Doctors Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-extrabold text-slate-900">
              Top Verified Specialists Available Today
            </h2>
            <p className="text-xs text-slate-500">
              Instant appointment slot booking with Razorpay ₹ payment
            </p>
          </div>

          <button
            onClick={() => onSelectSpecialty('All')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            View All Doctors ({featuredDoctors.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDoctors.slice(0, 3).map((doc) => (
            <div
              key={doc.id}
              className="glass-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-200 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{doc.name}</h3>
                    <span className="text-xs font-bold text-brand-600">{doc.specialty}</span>
                    <p className="text-[11px] text-slate-500">{doc.hospital}, {doc.city}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {doc.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Fee</span>
                  <span className="text-lg font-extrabold text-slate-900">₹{doc.consultationFee}</span>
                </div>

                <button
                  onClick={() => onBookDoctor(doc)}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow transition-all"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
