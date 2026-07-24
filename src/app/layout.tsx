import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Curivo — AI-Native Healthcare Platform',
  description: 'Instant AI symptom triage, verified doctor search, Razorpay checkout, and plain-language prescription explanations.',
  keywords: ['Healthcare', 'AI Symptom Checker', 'Doctor Booking', 'Telehealth', 'Curivo', 'Gemini AI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans bg-[#f8fafc] text-slate-900">
        {children}
      </body>
    </html>
  );
}
