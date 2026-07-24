# Curivo — AI-Native Healthcare & Telehealth Platform 🩺⚡

> **Curivo** is a modern, full-stack, AI-native healthcare SaaS platform designed to bridge the gap between patient symptom triaging, verified doctor discovery, appointment booking, digital prescriptions, and plain-language medication explanation.

![Next.js 14](https://img.shields.io/badge/Next.js-14.2-blue?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75B2?style=for-the-badge&logo=google)
![Razorpay](https://img.shields.io/badge/Razorpay-Test_Mode-02042B?style=for-the-badge&logo=razorpay)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?style=for-the-badge&logo=supabase)

---

## 🌟 Core Features & Modules

### 1. 🤖 AI Symptom Checker & Emergency Guardrail
- **Powered by Gemini 1.5 Flash**: Patients describe symptoms in plain text (e.g. *"dull headache and fever for 2 days"*). Curivo AI returns structured JSON matching recommended specialties, urgency level (`low`, `medium`, `high`), potential non-definitive causes, and safe home care advice.
- **Emergency Safety Red-Flag Guardrail**: Instantly detects emergency symptoms (e.g., chest pain, shortness of breath, severe bleeding) and displays a high-visibility flashing alert with a direct **Call 108 Emergency Ambulance** action button.

### 2. 👨‍⚕️ Doctor Discovery & Slot Booking Engine
- **Search & Multi-Filters**: Filter verified specialists across India by medical field (Cardiology, Dermatology, Neurology, Pediatrics, Orthopedics, General Physician, Gynecology), city, rating, and maximum consultation fee (in `₹`).
- **Slot Selection**: View real-time doctor availability calendars and pick time slots.

### 3. 💳 Razorpay Test Mode Checkout
- **Integrated Payments**: Uses Razorpay SDK (`rzp_test_...`) to process consultation fees (`₹`).
- **Server Signature Verification**: Features a dedicated `/api/razorpay/verify-payment` route performing cryptographic **HMAC-SHA256** verification using secret keys to secure transactions.

### 4. 📝 Doctor Portal & Digital Prescription Builder
- **Doctor Dashboard**: Manage appointment queues, approve bookings, and create structured digital prescriptions specifying medicine dosage, timing (`After Food` / `Before Food`), frequency (`1-0-1`), and duration.

### 5. 📜 Patient Health Vault & AI Prescription Explainer
- **1-Click AI Breakdown**: Patients can click **"Explain Prescription in Plain English"** to translate complex medical prescriptions into easy-to-understand guidance, food instructions, mild side effects, and warning alerts.
- **AI Follow-up Check-in**: Automated 3-day post-consultation health check-in banner simulation.

### 6. 🛡️ Admin Governance & Doctor Verification Panel
- **Platform Analytics**: Monitor total appointments, total consultation GMV (`₹`), active doctor counts, and AI triage accuracy.
- **1-Click Doctor Verification**: Admin toggle to approve or revoke doctor licenses in real time.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Components & Server API Routes) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom Design System (`#2563EB` Royal Blue & `#8B5CF6` AI Purple) |
| **Icons & Motion** | Lucide React + Framer Motion |
| **AI Engine** | Google Gemini API (`@google/generative-ai` - Gemini 1.5 Flash) |
| **Payments** | Razorpay Node SDK (`razorpay` + client checkout modal) |
| **Database** | Supabase Postgres + `@supabase/supabase-js` + `@supabase/server` |

---

## 📂 Project Structure

```
CURE +VIVO =CURIVO/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/symptom-checker/route.ts        # Gemini AI Triage Endpoint
│   │   │   ├── ai/prescription-explainer/route.ts  # Gemini AI Rx Explainer Endpoint
│   │   │   ├── razorpay/create-order/route.ts      # Razorpay Server Order Creation
│   │   │   ├── razorpay/verify-payment/route.ts    # HMAC-SHA256 Signature Verification
│   │   │   ├── doctors/route.ts                    # Doctors Directory & Admin Verification
│   │   │   ├── appointments/route.ts               # Appointments Booking API
│   │   │   └── prescriptions/route.ts              # Prescriptions CRUD API
│   │   ├── globals.css                             # Custom Tokens & Glassmorphism Styles
│   │   ├── layout.tsx                              # Root Layout & Typography
│   │   └── page.tsx                                # Main App Viewport & State Controller
│   ├── components/
│   │   ├── Navbar.tsx                              # Navigation Header & Role Switcher
│   │   ├── HeroSection.tsx                         # Landing Banner & Specialty Chips
│   │   ├── SymptomCheckerModal.tsx                 # AI Triage & Safety Alert Modal
│   │   ├── DoctorSearch.tsx                        # Doctor Directory & Filter Grid
│   │   ├── RazorpayModal.tsx                       # Razorpay Test Checkout Modal
│   │   ├── DoctorDashboard.tsx                     # Doctor Panel & Prescription Builder
│   │   ├── PatientDashboard.tsx                    # Patient Health Vault & AI Explainer
│   │   └── AdminDashboard.tsx                      # Admin Verification & GMV Analytics
│   └── lib/
│       ├── ai/gemini.ts                            # Gemini AI API Client Module
│       ├── razorpay.ts                             # Razorpay SDK Helpers
│       ├── supabase.ts                             # Supabase Database Client
│       └── mockData.ts                             # Seed Data Engine for Instant Demo
├── supabase/
│   └── schema.sql                                  # Supabase DDL SQL Tables
├── .env.example                                    # Environment Variables Template
├── .gitignore                                      # Git Exclusion Rules
├── package.json                                    # Project Dependencies
└── README.md                                       # Documentation
```

---

## ⚡ Quick Start & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/curivo-healthcare.git
cd curivo-healthcare
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your API keys in `.env.local`:
```env
# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Razorpay Test Credentials
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_TGTOSqQLPnckXY
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Supabase Credentials
SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (Supabase)

To initialize the Postgres database on Supabase:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor**.
3. Copy and execute the DDL script from [`supabase/schema.sql`](file:///c:/Users/pandi/OneDrive/Desktop/CURE%20+VIVO%20=CURIVO/supabase/schema.sql).

---

## 🧪 Production Verification

To test production build compilation:
```bash
npm run build
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for details.
