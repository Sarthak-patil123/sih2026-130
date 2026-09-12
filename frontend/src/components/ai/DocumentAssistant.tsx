'use client';

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface DocumentAssistantProps {
  fileName?: string | null;
  docType?: string;
}

export const DocumentAssistant: React.FC<DocumentAssistantProps> = ({ fileName }) => {
  const { isMarathi } = useLanguage();

  return (
    <div className="rounded-lg border border-[#D89B3C]/40 bg-[#FBF9F5] p-4 text-xs space-y-3 shadow-2xs">
      <div className="flex items-center justify-between border-b border-[#D89B3C]/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#263B63] text-white">
            <Sparkles className="h-3.5 w-3.5 text-[#D89B3C]" />
          </span>
          <span className="font-bold text-[#263B63]">
            {isMarathi ? "डिजिटल कागदपत्र सहाय्यक (Document Assistant)" : "Digital Document Assistant"}
          </span>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
          98% Match
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-slate-700 font-medium">
          {isMarathi 
            ? `फाईल "${fileName || 'दस्तऐवज'}" यशस्वीरित्या तपासली गेली. सर्व आवश्यक कायदेशीर कलमे उपस्थित आहेत.`
            : `File "${fileName || 'Document'}" analyzed. Key mandatory statutory metadata detected.`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white p-2.5 rounded border border-slate-200">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{isMarathi ? "अधिकृत डिजिटल स्वाक्षरी वैध" : "Valid Digital Signature"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{isMarathi ? "सीमा व सेटबॅक रेखांकन उपस्थित" : "Setback Coordinates Present"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{isMarathi ? "प्लॉट क्रमांक व MIDC क्षेत्र जुळले" : "Plot & Zone Matching"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{isMarathi ? "कागदपत्र पुन्हा वापरण्यास सज्ज" : "Ready for Multi-Dept Reuse"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
