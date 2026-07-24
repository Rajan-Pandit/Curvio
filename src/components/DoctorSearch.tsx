'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Building2, 
  Award,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Doctor } from '@/lib/mockData';

interface DoctorSearchProps {
  doctors: Doctor[];
  selectedSpecialtyFilter: string;
  onBookDoctor: (doctor: Doctor, slotDate: string, slotTime: string) => void;
}

export const DoctorSearch: React.FC<DoctorSearchProps> = ({
  doctors,
  selectedSpecialtyFilter,
  onBookDoctor,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState(selectedSpecialtyFilter || 'All');
  const [cityFilter, setCityFilter] = useState('All');
  const [maxFee, setMaxFee] = useState<number>(2000);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('2026-07-24');
  const [selectedSlot, setSelectedSlot] = useState('');

  const specialties = ['All', 'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'General Physician', 'Gynecology', 'Orthopedics'];
  const cities = ['All', 'New Delhi', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Pune', 'Chennai', 'Gurugram'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === 'All' || doc.specialty.toLowerCase() === specialtyFilter.toLowerCase();
    const matchesCity = cityFilter === 'All' || doc.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesFee = doc.consultationFee <= maxFee;

    return matchesSearch && matchesSpecialty && matchesCity && matchesFee;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-ai-600 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <Building2 className="w-96 h-96" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            Verified Healthcare Specialists
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
            Book In-Person & Digital Consultations
          </h1>
          <p className="text-sm text-brand-100 leading-relaxed">
            Discover top-rated doctors across India, view real patient reviews, check slot availability, and pay securely via Razorpay test mode.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-card bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        
        {/* Search & Selectors Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctor by name, hospital, or specialty..."
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Specialty Dropdown */}
          <div>
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full py-3 px-3 text-sm rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec === 'All' ? 'All Specialties' : spec}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full py-3 px-3 text-sm rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city === 'All' ? 'All Cities' : city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-600 uppercase">Max Consultation Fee:</span>
            <input
              type="range"
              min="400"
              max="2000"
              step="100"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-48 accent-brand-600 cursor-pointer"
            />
            <span className="text-sm font-extrabold text-brand-700">₹{maxFee}</span>
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            Showing <span className="font-extrabold text-slate-900">{filteredDoctors.length}</span> verified specialists
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div 
            key={doc.id}
            className="glass-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-brand-300 transition-all duration-200 flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              
              {/* Card Header: Avatar & Verified Badge */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-100 shadow-sm"
                  />
                  {doc.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-brand-600 text-white rounded-full p-1 shadow">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                      {doc.name}
                    </h3>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                    {doc.specialty}
                  </span>

                  <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500 font-medium">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>{doc.experienceYears} Years Exp</span>
                  </div>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {doc.bio}
              </p>

              {/* Qualification & Hospital */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 truncate">{doc.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{doc.city}</span>
                </div>
              </div>
            </div>

            {/* Bottom Fee & Booking Button */}
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fee</span>
                <span className="text-lg font-extrabold text-slate-900">
                  ₹{doc.consultationFee.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedDoctorForBooking(doc);
                  setSelectedSlot(doc.slots[0]);
                }}
                className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/20 flex items-center gap-1.5 transition-all"
              >
                Book Appointment
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Slot Selection Modal */}
      {selectedDoctorForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg glass-card bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-6">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoctorForBooking.avatar}
                  alt={selectedDoctorForBooking.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">
                    {selectedDoctorForBooking.name}
                  </h3>
                  <p className="text-xs font-bold text-brand-600">
                    {selectedDoctorForBooking.specialty} • ₹{selectedDoctorForBooking.consultationFee}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoctorForBooking(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Date Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Consultation Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
              />
            </div>

            {/* Time Slot Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Available Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {selectedDoctorForBooking.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      selectedSlot === slot
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Proceed to Razorpay CTA */}
            <button
              onClick={() => {
                const doc = selectedDoctorForBooking;
                const slot = selectedSlot || doc.slots[0];
                setSelectedDoctorForBooking(null);
                onBookDoctor(doc, selectedDate, slot);
              }}
              className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              Proceed to Razorpay Checkout (₹{selectedDoctorForBooking.consultationFee})
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
