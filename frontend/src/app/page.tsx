'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  ArrowRight, 
  FileCheck2, 
  FolderLock, 
  Gift, 
  Search, 
  Languages, 
  Sparkles, 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { usePortal } from '@/context/PortalContext';
import { Button } from '@/components/common/Button';

export default function LandingPage() {
  const { isMarathi, toggleLanguage } = useLanguage();
  const { loginAs } = usePortal();
  const router = useRouter();

  const handleStartJourney = () => {
    loginAs('entrepreneur');
    router.push('/entrepreneur/dashboard');
  };

  const handleTrackApp = () => {
    loginAs('entrepreneur');
    router.push('/entrepreneur/applications');
  };

  const handleManageDocs = () => {
    loginAs('entrepreneur');
    router.push('/entrepreneur/documents');
  };

  const handleFindSchemes = () => {
    loginAs('entrepreneur');
    router.push('/entrepreneur/schemes');
  };

  const journeySteps = [
    { title: "Project", titleMr: "प्रकल्प", desc: "Define unit & investment" },
    { title: "Requirements", titleMr: "आवश्यकता", desc: "Auto-discover clearances" },
    { title: "Documents", titleMr: "कागदपत्रे", desc: "Upload once into vault" },
    { title: "Applications", titleMr: "अर्ज", desc: "Track live departmental SLA" },
    { title: "Inspections", titleMr: "तपासणी", desc: "Joint field site audits" },
    { title: "Approvals", titleMr: "मंजुऱ्या", desc: "Digital statutory NOCs" },
    { title: "Compliance", titleMr: "अनुपालन", desc: "Annual renewals & subsidies" }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#263238] flex flex-col justify-between">
      {/* Top Maharashtra Header Strip */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs shadow-2xs">
        <div className="bg-[#263B63] px-4 py-1 text-[11px] text-slate-200">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#D89B3C]">MAITRI 2.0</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline">
                {isMarathi ? "उद्योग संचालनालय, महाराष्ट्र शासन • एक खिडकी डिजिटल सेवा" : "Directorate of Industries, Govt. of Maharashtra • Single Window Digital Services"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 font-bold text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded transition-colors cursor-pointer"
              >
                <Languages className="h-3.5 w-3.5 text-[#D89B3C]" />
                <span>{isMarathi ? "English" : "मराठी"}</span>
              </button>

              <button
                onClick={() => router.push('/login')}
                className="text-xs font-semibold text-white/90 hover:text-white cursor-pointer"
              >
                {isMarathi ? "लॉगिन" : "Sign In"} →
              </button>
            </div>
          </div>
        </div>

        {/* Brand Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#263B63] text-white font-black text-sm shadow-xs border border-[#D89B3C]/40">
              MH
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-[#263B63]">
                {isMarathi ? "महाराष्ट्र औद्योगिक मंजुरी पोर्टल" : "Maharashtra Industrial Portal"}
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">
                {isMarathi ? "उद्योग स्थापनेचा एकात्मिक डिजिटल प्रवास" : "A Unified Digital Journey for Doing Business in Maharashtra"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/login')}
            >
              {isMarathi ? "भूमिका निवडा (Roles)" : "Portal Roles"}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleStartJourney}
            >
              {isMarathi ? "प्रकल्प सुरू करा" : "Start Journey"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Landing Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D89B3C]/15 px-3.5 py-1 text-xs font-bold text-[#263B63] border border-[#D89B3C]/30">
            <Sparkles className="h-4 w-4 text-[#D89B3C]" />
            <span>{isMarathi ? "स्मार्ट इंडिया हॅकाथॉन २०२६ • PS 26130" : "Smart India Hackathon 2026 • PS 26130"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#263B63] tracking-tight leading-tight">
            {isMarathi ? "औद्योगिक परवानग्या आणि मंजुऱ्या, आता अधिक सुलभ." : "Industrial approvals, made simpler."}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            {isMarathi 
              ? "महाराष्ट्रात व्यवसाय सुरू करण्यासाठी आवश्यकता समजून घेणे, कागदपत्रे व्यवस्थापित करणे, अर्ज ट्रॅक करणे आणि अनुपालन राखण्याचे एकात्मिक व्यासपीठ."
              : "One place to understand requirements, manage documents, track applications and stay compliant in Maharashtra."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={handleStartJourney}
            >
              {isMarathi ? "आपला प्रवास सुरू करा" : "Start Your Journey"}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Search}
              onClick={handleTrackApp}
            >
              {isMarathi ? "अर्जाची स्थिती तपासा" : "Track an Application"}
            </Button>
          </div>
        </div>

        {/* Visual Business Journey Flow */}
        <div className="rounded-2xl border border-[#E6E0D4] bg-white p-6 shadow-sm space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D89B3C]">
              {isMarathi ? "एकात्मिक डिजिटल प्रवास" : "The Core Business Lifecycle"}
            </span>
            <h3 className="text-lg font-bold text-[#263B63]">
              {isMarathi ? "आपल्या उद्योगाचा संपूर्ण मार्ग" : "From Concept to Commercial Operations"}
            </h3>
          </div>

          <div className="overflow-x-auto py-4">
            <div className="flex items-center justify-between min-w-[700px] px-4">
              {journeySteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center text-center space-y-1 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F1EA] text-[#263B63] font-black text-xs border border-[#D89B3C]/50 group-hover:bg-[#263B63] group-hover:text-white transition-all shadow-2xs">
                      {idx + 1}
                    </div>
                    <span className="text-xs font-bold text-[#263B63]">
                      {isMarathi ? step.titleMr : step.title}
                    </span>
                    <span className="text-[10px] text-slate-400 max-w-[85px]">{step.desc}</span>
                  </div>

                  {idx < journeySteps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 -mt-6 bg-[#D89B3C]/30" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Clear High-Impact Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Action 1: Start a Project */}
          <div
            onClick={handleStartJourney}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#263B63] hover:shadow-md transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-[#263B63] text-white w-fit group-hover:scale-105 transition-transform">
                <Building2 className="h-6 w-6 text-[#D89B3C]" />
              </div>
              <h4 className="text-base font-bold text-[#263B63]">
                {isMarathi ? "नवीन प्रकल्प नोंदणी" : "Start a Project"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isMarathi ? "प्रोजेक्ट पासपोर्ट तयार करा आणि सानुकूल एक खिडकी मंजुरी आराखडा मिळवा." : "Build your Project Passport and get a tailored single-window clearance roadmap."}
              </p>
            </div>
            <span className="text-xs font-bold text-[#263B63] group-hover:text-[#3D8C82] flex items-center gap-1 pt-2">
              {isMarathi ? "प्रकल्प सुरू करा" : "Start Registration"} <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Action 2: Track Application */}
          <div
            onClick={handleTrackApp}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#263B63] hover:shadow-md transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-[#263B63] text-white w-fit group-hover:scale-105 transition-transform">
                <FileCheck2 className="h-6 w-6 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-[#263B63]">
                {isMarathi ? "अर्जाची स्थिती तपासा" : "Track an Application"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isMarathi ? "अर्जाची थेट प्रगती, मुदत (SLA) तपासा आणि शासकीय शंकांचे निरसन करा." : "Monitor real-time progress, statutory SLA deadlines, and respond to department queries."}
              </p>
            </div>
            <span className="text-xs font-bold text-[#263B63] group-hover:text-[#3D8C82] flex items-center gap-1 pt-2">
              {isMarathi ? "अर्ज ट्रॅक करा" : "Track Dossier"} <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Action 3: Manage Documents */}
          <div
            onClick={handleManageDocs}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#263B63] hover:shadow-md transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-[#263B63] text-white w-fit group-hover:scale-105 transition-transform">
                <FolderLock className="h-6 w-6 text-[#D89B3C]" />
              </div>
              <h4 className="text-base font-bold text-[#263B63]">
                {isMarathi ? "कागदपत्र संग्रह (Locker)" : "Manage Documents"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isMarathi ? "एकदाच अपलोड करा. सर्व विभागांच्या मंजुऱ्यांसाठी पुन्हा वापरा." : "Upload once into Document Locker. Reuse across all statutory approvals."}
              </p>
            </div>
            <span className="text-xs font-bold text-[#263B63] group-hover:text-[#3D8C82] flex items-center gap-1 pt-2">
              {isMarathi ? "लॉकर उघडा" : "Open Locker"} <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Action 4: Find Schemes */}
          <div
            onClick={handleFindSchemes}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs hover:border-[#263B63] hover:shadow-md transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-[#263B63] text-white w-fit group-hover:scale-105 transition-transform">
                <Gift className="h-6 w-6 text-amber-300" />
              </div>
              <h4 className="text-base font-bold text-[#263B63]">
                {isMarathi ? "शासकीय योजना व सबसिडी" : "Find Government Schemes"}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isMarathi ? "आपल्या उद्योगासाठी राज्य प्रोत्साहन योजना, भांडवली अनुदान व वीज सवलती शोधा." : "Discover state subsidies, capital incentives, and power rebates matching your unit."}
              </p>
            </div>
            <span className="text-xs font-bold text-[#263B63] group-hover:text-[#3D8C82] flex items-center gap-1 pt-2">
              {isMarathi ? "योजना शोधा" : "Explore Incentives"} <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

        </div>

        {/* The 5 Fundamental Questions Answered */}
        <div className="rounded-2xl bg-[#263B63] text-white p-8 space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D89B3C]">
              Citizen-First Design Philosophy
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              {isMarathi 
                ? "शासकीय यंत्रणा नागरिकांना समजेल अशी बनवणे हे आमचे ध्येय आहे."
                : "Don't make the citizen understand the government. Make the system understandable to the citizen."}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 text-xs">
            <div className="rounded-lg bg-white/10 p-4 border border-white/15 space-y-1">
              <span className="font-bold text-[#D89B3C] text-sm block">1</span>
              <p className="font-bold text-white">{isMarathi ? "मला काय हवे आहे?" : "What do I need?"}</p>
              <p className="text-[11px] text-slate-300">Auto-mapped by sector & investment.</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 border border-white/15 space-y-1">
              <span className="font-bold text-[#D89B3C] text-sm block">2</span>
              <p className="font-bold text-white">{isMarathi ? "कोणती कागदपत्रे लागतील?" : "What documents?"}</p>
              <p className="text-[11px] text-slate-300">Reusable from Document Locker.</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 border border-white/15 space-y-1">
              <span className="font-bold text-[#D89B3C] text-sm block">3</span>
              <p className="font-bold text-white">{isMarathi ? "मी काय सादर केले आहे?" : "What's submitted?"}</p>
              <p className="text-[11px] text-slate-300">Complete application repository.</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 border border-white/15 space-y-1">
              <span className="font-bold text-[#D89B3C] text-sm block">4</span>
              <p className="font-bold text-white">{isMarathi ? "पुढे काय करावे लागेल?" : "Next best action?"}</p>
              <p className="text-[11px] text-slate-300">Clear priority action cards.</p>
            </div>

            <div className="rounded-lg bg-white/10 p-4 border border-white/15 space-y-1">
              <span className="font-bold text-[#D89B3C] text-sm block">5</span>
              <p className="font-bold text-white">{isMarathi ? "अर्जांचे काय होत आहे?" : "What is happening?"}</p>
              <p className="text-[11px] text-slate-300">Real-time statutory SLA countdown.</p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Disclaimer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#263B63] text-white font-black text-xs">
                MH
              </div>
              <div>
                <p className="font-bold text-[#263B63]">Maharashtra Industrial Approval Portal</p>
                <p className="text-[11px] text-slate-500">Smart India Hackathon 2026 • Problem Statement ID: 26130</p>
              </div>
            </div>

            <div className="rounded-md bg-[#FBF9F5] px-3 py-1.5 border border-[#E6E0D4] text-[11px] text-slate-600">
              <strong>Disclaimer:</strong> Prototype developed for demonstration purposes. This is not an official Government of Maharashtra portal.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
