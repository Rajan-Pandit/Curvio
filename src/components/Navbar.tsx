'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  Search, 
  FileText, 
  UserCheck, 
  ShieldCheck, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: 'patient' | 'doctor' | 'admin';
  setUserRole: (role: 'patient' | 'doctor' | 'admin') => void;
  onOpenSymptomChecker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenSymptomChecker,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl ai-gradient-bg flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900">
                  CURIVO
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-ai-100 text-ai-700 rounded-full border border-ai-200">
                  AI MVP
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 hidden sm:block">
                Trusted AI-Native Healthcare
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </button>

            <button
              onClick={onOpenSymptomChecker}
              className="px-4 py-2 text-sm font-semibold rounded-full text-slate-700 hover:text-ai-600 flex items-center gap-1.5 transition-all duration-200 hover:bg-ai-50"
            >
              <Sparkles className="w-4 h-4 text-ai-500" />
              AI Symptom Triage
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'doctors'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4" />
              Find Doctors
            </button>

            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'prescriptions'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              My Prescriptions & AI
            </button>
          </nav>

          {/* Role Switcher & Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Persona Switcher Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role:</span>
              <select
                value={userRole}
                onChange={(e) => {
                  const role = e.target.value as 'patient' | 'doctor' | 'admin';
                  setUserRole(role);
                  if (role === 'doctor') setActiveTab('doctor-dashboard');
                  else if (role === 'admin') setActiveTab('admin-dashboard');
                  else setActiveTab('home');
                }}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="patient">👤 Patient</option>
                <option value="doctor">👨‍⚕️ Doctor Panel</option>
                <option value="admin">🛡️ Admin Verification</option>
              </select>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => setActiveTab('doctors')}
              className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-brand-500/20 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Book Specialist
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">Switch Active Demo Role:</span>
            <select
              value={userRole}
              onChange={(e) => {
                const role = e.target.value as 'patient' | 'doctor' | 'admin';
                setUserRole(role);
                if (role === 'doctor') setActiveTab('doctor-dashboard');
                else if (role === 'admin') setActiveTab('admin-dashboard');
                else setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="bg-slate-100 text-xs font-bold text-slate-800 p-1.5 rounded border border-slate-300"
            >
              <option value="patient">Patient View</option>
              <option value="doctor">Doctor Dashboard</option>
              <option value="admin">Admin Panel</option>
            </select>
          </div>

          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => { onOpenSymptomChecker(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-ai-700 bg-ai-50 rounded-lg flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-ai-600" />
            AI Symptom Triage
          </button>
          <button
            onClick={() => { setActiveTab('doctors'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Find Doctors
          </button>
          <button
            onClick={() => { setActiveTab('prescriptions'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            My Prescriptions & AI Explainer
          </button>
        </div>
      )}
    </header>
  );
};
