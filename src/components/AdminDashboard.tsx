'use client';

import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  UserX, 
  Users, 
  Calendar, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Building2
} from 'lucide-react';
import { Doctor, Appointment } from '@/lib/mockData';

interface AdminDashboardProps {
  doctors: Doctor[];
  appointments: Appointment[];
  onToggleDoctorVerification: (doctorId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  doctors,
  appointments,
  onToggleDoctorVerification,
}) => {
  const verifiedCount = doctors.filter(d => d.verified).length;
  const pendingCount = doctors.filter(d => !d.verified).length;
  const totalRevenue = appointments.reduce((sum, apt) => sum + apt.fee, 18500);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-400/30">
            Curivo Admin Operations
          </span>
          <h1 className="text-3xl font-heading font-extrabold tracking-tight">
            Platform Verification & Governance
          </h1>
          <p className="text-sm text-slate-300">
            Verify doctor medical credentials, review system activity, and oversee platform triage analytics.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Compliance Status</span>
            <span className="text-sm font-extrabold text-white">100% Medical Audit Verified</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Doctors</span>
            <Users className="w-5 h-5 text-brand-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{doctors.length}</p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <span>{verifiedCount} Verified</span> • <span className="text-amber-600">{pendingCount} Pending</span>
          </div>
        </div>

        <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</span>
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{appointments.length + 24}</p>
          <p className="text-xs font-semibold text-slate-500">100% Razorpay Confirmed</p>
        </div>

        <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consultation GMV</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</p>
          <p className="text-xs font-semibold text-emerald-600">↑ 28% growth this month</p>
        </div>

        <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Triage Accuracy</span>
            <Activity className="w-5 h-5 text-ai-600" />
          </div>
          <p className="text-3xl font-extrabold text-ai-600">98.4%</p>
          <p className="text-xs font-semibold text-slate-500">Gemini 1.5 Flash Triage</p>
        </div>

      </div>

      {/* Doctor Verification Management Table */}
      <div className="glass-card bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-brand-600" />
              Doctor Medical Credentials & Verification Management
            </h2>
            <p className="text-xs text-slate-500">
              Toggle medical license verification status to control doctor search visibility.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Doctor Details</th>
                <th className="py-3.5 px-4">Specialty & Qualification</th>
                <th className="py-3.5 px-4">Hospital & City</th>
                <th className="py-3.5 px-4">Fee (₹)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{doc.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {doc.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-brand-600">{doc.specialty}</span>
                    <span className="text-[11px] text-slate-500 block truncate max-w-[200px]">{doc.qualification}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="font-semibold block">{doc.hospital}</span>
                    <span className="text-slate-500">{doc.city}</span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    ₹{doc.consultationFee}
                  </td>
                  <td className="py-3.5 px-4">
                    {doc.verified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Pending Verification
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onToggleDoctorVerification(doc.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
                        doc.verified
                          ? 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                      }`}
                    >
                      {doc.verified ? 'Revoke Approval' : 'Approve Doctor'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
