'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  X, 
  Building2, 
  User, 
  Calendar, 
  Clock,
  Sparkles
} from 'lucide-react';
import { RAZORPAY_TEST_KEY } from '@/lib/razorpay';
import { Doctor } from '@/lib/mockData';

interface RazorpayModalProps {
  isOpen: boolean;
  doctor: Doctor | null;
  slotDate: string;
  slotTime: string;
  onClose: () => void;
  onPaymentSuccess: (paymentId: string) => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  doctor,
  slotDate,
  slotTime,
  onClose,
  onPaymentSuccess,
}) => {
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [generatedPaymentId, setGeneratedPaymentId] = useState('');

  if (!isOpen || !doctor) return null;

  const handlePayNow = () => {
    setProcessing(true);
    const mockPaymentId = `pay_rzp_test_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
      setGeneratedPaymentId(mockPaymentId);
      setTimeout(() => {
        onPaymentSuccess(mockPaymentId);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md glass-card bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Razorpay Brand Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
              RZP
            </div>
            <div>
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                Razorpay Secure Checkout
                <span className="text-[10px] bg-blue-500/30 text-blue-300 font-mono px-2 py-0.5 rounded border border-blue-400/30">
                  TEST MODE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Key ID: {RAZORPAY_TEST_KEY}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          
          {paid ? (
            <div className="py-8 text-center space-y-4 animate-scale-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Payment Successful!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Razorpay Transaction Confirmed
                </p>
                <div className="mt-3 p-2.5 rounded-lg bg-slate-100 font-mono text-xs text-slate-700 font-semibold inline-block">
                  ID: {generatedPaymentId}
                </div>
              </div>
              <p className="text-xs text-emerald-700 font-medium">
                Redirecting & Booking Appointment Slot...
              </p>
            </div>
          ) : (
            <>
              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{doctor.name}</h4>
                    <p className="text-xs text-brand-600 font-semibold">{doctor.specialty}</p>
                    <p className="text-[11px] text-slate-500">{doctor.hospital}</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{slotDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{slotTime}</span>
                  </div>
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-50 border border-brand-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Total Amount</span>
                <span className="text-2xl font-extrabold text-brand-700">
                  ₹{doctor.consultationFee.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Simulated Card Test Inputs */}
              <div className="space-y-2 border-t border-slate-200 pt-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Payment Method (Test Mode)
                </label>
                
                <div className="p-3 rounded-xl border-2 border-brand-600 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">Razorpay Test Card / UPI</p>
                      <p className="text-[10px] text-slate-500">Auto-approved simulated transaction</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-brand-600" />
                </div>
              </div>

              {/* Action Pay Button */}
              <button
                onClick={handlePayNow}
                disabled={processing}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Razorpay Transaction...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ₹{doctor.consultationFee.toLocaleString('en-IN')} via Razorpay Test
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                256-Bit SSL Encrypted Razorpay Test Gateway
              </p>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
