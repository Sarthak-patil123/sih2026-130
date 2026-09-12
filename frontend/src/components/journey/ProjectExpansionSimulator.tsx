'use client';

import React, { useState } from 'react';
import { TrendingUp, FileCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProjectExpansionSimulator: React.FC = () => {
  const { isMarathi } = useLanguage();

  const [currentInv] = useState(50);
  const [proposedInv, setProposedInv] = useState(80);

  // Dynamic rule-based calculations
  const diff = proposedInv - currentInv;
  const newApprovalsNeeded = diff >= 30 ? 2 : diff >= 15 ? 1 : 0;
  const modificationsNeeded = diff >= 20 ? 3 : 2;
  const reusableDocsCount = 11;
  const totalDocsCount = 14;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#263B63] text-white">
              <TrendingUp className="h-4 w-4 text-[#D89B3C]" />
            </span>
            <h3 className="text-base font-bold text-[#263B63]">
              {isMarathi ? "प्रकल्प विस्तार सिम्युलेटर (Project Expansion Simulator)" : "Project Expansion & Augmentation Simulator"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isMarathi 
              ? "भांडवली गुंतवणूक किंवा क्षमता वाढवल्यास कोणत्या नवीन परवानग्या लागतील आणि कोणते दस्तऐवज पुन्हा वापरता येतील याचे आगाऊ सिम्युलेशन."
              : "Simulate brownfield expansion to predict new statutory clearances, required amendments, and reusable documents."}
          </p>
        </div>

        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded border border-amber-300">
          Interactive Simulation
        </span>
      </div>

      {/* Interactive Slider Area */}
      <div className="rounded-xl bg-[#FBF9F5] p-5 border border-[#E6E0D4] space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
          <div>
            <span className="text-slate-400 block uppercase text-[10px]">Current Sanctioned Investment</span>
            <span className="text-lg font-bold text-[#263B63]">₹{currentInv} Crore</span>
          </div>

          <div className="text-center">
            <span className="text-slate-400 block uppercase text-[10px]">Proposed Expansion Capital</span>
            <span className="text-2xl font-black text-emerald-700">₹{proposedInv} Crore (+₹{diff} Cr)</span>
          </div>
        </div>

        <div className="space-y-1">
          <input
            type="range"
            min="50"
            max="150"
            step="5"
            value={proposedInv}
            onChange={(e) => setProposedInv(parseInt(e.target.value))}
            className="w-full accent-[#263B63] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>₹50 Cr (Current Baseline)</span>
            <span>₹100 Cr (Mega Unit)</span>
            <span>₹150 Cr (Ultra Mega Unit)</span>
          </div>
        </div>
      </div>

      {/* Impact Prediction Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        
        {/* Metric 1: New Clearances Required */}
        <div className="rounded-lg bg-white p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-slate-400 block font-bold text-[10px] uppercase">New Approvals Required</span>
          <span className="text-2xl font-black text-[#263B63]">+{newApprovalsNeeded}</span>
          <p className="text-[11px] text-slate-500 pt-1">
            {newApprovalsNeeded > 1 
              ? "SEIAA Environmental Categorization B1 & 33kV Dedicated Substation"
              : "High Tension Electrical Feeder Expansion"}
          </p>
        </div>

        {/* Metric 2: Existing Clearances to Amend */}
        <div className="rounded-lg bg-white p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-slate-400 block font-bold text-[10px] uppercase">Amendments to Existing Approvals</span>
          <span className="text-2xl font-black text-[#D89B3C]">{modificationsNeeded}</span>
          <p className="text-[11px] text-slate-500 pt-1">
            Factory Licence (Machinery Load), MPCB Consent to Operate, Fire Hydrant Extension.
          </p>
        </div>

        {/* Metric 3: Documents Reusable */}
        <div className="rounded-lg bg-white p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-slate-400 block font-bold text-[10px] uppercase">Documents Reusable from Locker</span>
          <span className="text-2xl font-black text-[#3D8C82]">{reusableDocsCount} / {totalDocsCount}</span>
          <p className="text-[11px] text-emerald-800 font-semibold pt-1">
            78% Documentation already verified in single-window vault.
          </p>
        </div>

      </div>

      {/* Reusability & Benefit Summary */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 text-xs flex items-start gap-3 text-emerald-950">
        <FileCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            {isMarathi ? "कागदपत्र पुनर्वापर व वेळ बचत" : "Document Reuse & Time Optimization Guarantee"}
          </p>
          <p className="text-emerald-800 leading-relaxed font-medium">
            {isMarathi 
              ? "आपले कंपनी नोंदणी, पॅन, जीएसटी व जमीन ताबा कागदपत्रे आधीच डिजिटल लॉकरमध्ये पडताळलेली असल्याने विस्तार अर्जाचा मंजुरी कालावधी ४५ दिवसांवरून १८ दिवसांवर येईल."
              : "Because your legal KYC, PAN, GSTIN, and land ownership deeds are pre-verified in Document Locker, your expansion approval turnaround is compressed from 45 days to just 18 days."}
          </p>
        </div>
      </div>
    </div>
  );
};
