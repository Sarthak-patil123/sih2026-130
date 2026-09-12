'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export interface Stage {
  num: number;
  id: string;
  label: string;
  labelMr: string;
  status: 'completed' | 'current' | 'upcoming';
  desc: string;
  descMr: string;
  date: string;
}

export interface BusinessJourneyProps {
  currentStage?: number;
  progress?: number;
  onNavigateTo?: (path: string) => void;
}

export const BusinessJourney: React.FC<BusinessJourneyProps> = ({ progress = 68, onNavigateTo }) => {
  const { isMarathi } = useLanguage();
  const [activeStageDetail, setActiveStageDetail] = useState<Stage | null>(null);

  const stages: Stage[] = [
    {
      num: 1,
      id: "project",
      label: "Project Registration",
      labelMr: "प्रकल्प नोंदणी",
      status: "completed",
      desc: "Enterprise profile & project parameters registered in Single Window.",
      descMr: "उद्योगाची माहिती व प्रकल्पाचे स्वरूप सिंगल विंडोमध्ये नोंदवले.",
      date: "10 Aug 2026"
    },
    {
      num: 2,
      id: "discovery",
      label: "Requirements Discovery",
      labelMr: "आवश्यकता शोध",
      status: "completed",
      desc: "6 statutory clearances and 11 mandatory documents identified.",
      descMr: "६ कायदेशीर परवानग्या आणि ११ आवश्यक कागदपत्रे निश्चित केली.",
      date: "10 Aug 2026"
    },
    {
      num: 3,
      id: "documents",
      label: "Document Locker",
      labelMr: "कागदपत्र तयारी",
      status: "completed",
      desc: "8 of 10 primary corporate & architectural documents verified.",
      descMr: "१० पैकी ८ महत्त्वाची कागदपत्रे डिजिटल लॉकरमध्ये पडताळली.",
      date: "18 Aug 2026"
    },
    {
      num: 4,
      id: "applications",
      label: "Applications Filing",
      labelMr: "अर्ज प्रक्रिया",
      status: "current",
      desc: "Fire NOC & Factory Licence under active review; Water query pending.",
      descMr: "अग्निशामक NOC आणि फॅक्टरी परवाना पुनरावलोकनात; पाणी परवानगीवर शंका प्रलंबित.",
      date: "Active Stage"
    },
    {
      num: 5,
      id: "inspections",
      label: "Field Inspections",
      labelMr: "प्रत्यक्ष जागा पाहणी",
      status: "upcoming",
      desc: "Joint site audit for Fire & Environmental clearance scheduled.",
      descMr: "अग्निशामक व पर्यावरण मंजुरीसाठी प्रत्यक्ष जागेची संयुक्त पाहणी नियोजित.",
      date: "18 & 22 Sept"
    },
    {
      num: 6,
      id: "approvals",
      label: "Final Approvals",
      labelMr: "अंतिम मंजुऱ्या",
      status: "upcoming",
      desc: "Issuance of digitally signed statutory NOCs and operating permits.",
      descMr: "डिजिटल स्वाक्षरी असलेले अधिकृत मंजुरी प्रमाणपत्रे व परवाने जारी करणे.",
      date: "Target Oct 2026"
    },
    {
      num: 7,
      id: "compliance",
      label: "Ongoing Compliance",
      labelMr: "नियमित अनुपालन",
      status: "upcoming",
      desc: "Periodic environmental monitoring, annual fire renewal, and state subsidies.",
      descMr: "नियमित पर्यावरण तपासणी, वार्षिक नूतनीकरण आणि शासकीय योजनांचे लाभ.",
      date: "Lifecycle Tracking"
    }
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-[#263B63] flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#D89B3C]" />
            {isMarathi ? "आपला व्यवसाय प्रवास (Your Business Journey)" : "Your Business Journey"}
          </h3>
          <p className="text-xs text-slate-500">
            {isMarathi ? "प्रकल्प संकल्पनेपासून ते नियमित उत्पादनापर्यंतचा एकात्मिक मार्ग." : "Integrated single-window lifecycle from concept registration to full factory operations."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#263B63] bg-[#F4F1EA] px-2.5 py-1 rounded border border-[#E6E0D4]">
            {progress}% {isMarathi ? "प्रवास पूर्ण" : "Journey Completed"}
          </span>
        </div>
      </div>

      {/* 7-Step Interactive Journey Visual Nodes */}
      <div className="overflow-x-auto py-3">
        <div className="flex items-center justify-between min-w-[720px] px-2">
          {stages.map((st, idx) => {
            const isCompleted = st.status === "completed";
            const isCurrent = st.status === "current";
            const isLast = idx === stages.length - 1;

            return (
              <React.Fragment key={st.id}>
                <div
                  onClick={() => setActiveStageDetail(st)}
                  className="flex flex-col items-center text-center cursor-pointer group relative"
                >
                  {/* Circle Node */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      isCompleted
                        ? "border-[#3D8C82] bg-emerald-50 text-[#3D8C82] group-hover:scale-105"
                        : isCurrent
                        ? "border-[#263B63] bg-[#263B63] text-white ring-4 ring-[#D89B3C]/30 shadow-sm animate-pulse"
                        : "border-slate-300 bg-slate-50 text-slate-400 group-hover:border-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : isCurrent ? (
                      <span className="text-xs font-black">{st.num}</span>
                    ) : (
                      <span className="text-xs font-semibold">{st.num}</span>
                    )}
                  </div>

                  {/* Stage Label */}
                  <span className={`text-xs font-bold mt-2 max-w-[100px] leading-tight ${
                    isCurrent ? "text-[#263B63]" : isCompleted ? "text-slate-800" : "text-slate-400"
                  }`}>
                    {isMarathi ? st.labelMr : st.label}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{st.date}</span>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`flex-1 h-1 mx-1.5 -mt-6 rounded transition-colors ${
                      isCompleted ? "bg-[#3D8C82]" : isCurrent ? "bg-gradient-to-r from-[#263B63] to-slate-200" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Stage Drilldown Modal */}
      <Modal
        isOpen={!!activeStageDetail}
        onClose={() => setActiveStageDetail(null)}
        title={activeStageDetail ? (isMarathi ? activeStageDetail.labelMr : activeStageDetail.label) : "Stage Details"}
        subtitle={`Stage ${activeStageDetail?.num} of 7 • Single Window Lifecycle`}
      >
        {activeStageDetail && (
          <div className="space-y-4 text-xs">
            <div className="rounded-lg bg-[#FBF9F5] p-4 border border-[#E6E0D4] space-y-1">
              <span className="font-bold text-[#263B63] uppercase tracking-wider text-[10px]">
                {isMarathi ? "टप्प्याचे उद्दिष्ट" : "Stage Purpose & Scope"}
              </span>
              <p className="text-slate-800 text-[13px] leading-relaxed font-medium">
                {isMarathi ? activeStageDetail.descMr : activeStageDetail.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-600 bg-white p-3 rounded-md border border-slate-200">
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Status</span>
                <span className="font-bold text-slate-800 capitalize">{activeStageDetail.status}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Timeline Milestone</span>
                <span className="font-bold text-slate-800">{activeStageDetail.date}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="primary"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => {
                  const target = activeStageDetail.id === 'documents' ? '/entrepreneur/documents' :
                                 activeStageDetail.id === 'inspections' ? '/entrepreneur/inspections' :
                                 activeStageDetail.id === 'compliance' ? '/entrepreneur/compliance' :
                                 '/entrepreneur/roadmap';
                  setActiveStageDetail(null);
                  onNavigateTo?.(target);
                }}
              >
                {isMarathi ? "या टप्प्यावर जा" : "Navigate to Stage"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
