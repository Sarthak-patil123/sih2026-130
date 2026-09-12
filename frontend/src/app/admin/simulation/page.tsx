'use client';

import React, { useState } from 'react';
import { Sparkles, RefreshCw, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/common/Button';

export default function AdminSimulationPage() {
  const { isMarathi } = useLanguage();

  // Simulation Sliders State
  const [inspectionDays, setInspectionDays] = useState(3); // Current baseline is 5 days
  const [autoValidationRate, setAutoValidationRate] = useState(85); // Current baseline is 60%
  const [parallelRatio, setParallelRatio] = useState(70); // Current baseline is 40%

  // Simulation Formula
  const baselineDays = 14.2;
  const timeSavedFromInspection = (5 - inspectionDays) * 0.8;
  const timeSavedFromAutoVal = ((autoValidationRate - 60) / 10) * 0.45;
  const timeSavedFromParallel = ((parallelRatio - 40) / 10) * 0.55;

  const totalSaved = Math.max(0, timeSavedFromInspection + timeSavedFromAutoVal + timeSavedFromParallel);
  const projectedAvgDays = Math.max(7.5, (baselineDays - totalSaved)).toFixed(1);
  const projectedIncreaseInThroughput = Math.round((totalSaved / baselineDays) * 100);

  const resetSimulation = () => {
    setInspectionDays(5);
    setAutoValidationRate(60);
    setParallelRatio(40);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white bg-[#172A46] px-2.5 py-0.5 rounded border border-slate-700">
              Policy Optimization Lab
            </span>
            <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              Demo Simulation
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#172A46] mt-1">
            {isMarathi ? "धोरणात्मक 'व्हॉट-इफ' सिम्युलेटर (What-If Policy Simulator)" : "What-If Policy & Clearance Velocity Simulator"}
          </h2>
          <p className="text-xs text-slate-500">
            {isMarathi 
              ? "तपासणी कालावधी किंवा दस्तऐवज ऑटो-पडताळणी सुधारल्यास एकूण मंजुरी कालावधीवर होणाऱ्या परिणामाचे थेट सिम्युलेशन."
              : "Simulate operational policy tweaks to project statewide clearance turnaround and resource impact."}
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={RefreshCw}
          onClick={resetSimulation}
        >
          {isMarathi ? "डीफॉल्ट बेसलाइनवर आणा" : "Reset to Baseline"}
        </Button>
      </div>

      {/* Simulated Projection Result Card */}
      <div className="rounded-xl border-2 border-[#D89B3C] bg-gradient-to-br from-[#172A46] to-[#263B63] text-white p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D89B3C] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Projected Statewide Clearance Impact
            </span>
            <h3 className="text-xl font-black">
              {isMarathi 
                ? `सरासरी मंजुरी कालावधी ${baselineDays} दिवसांवरून ${projectedAvgDays} दिवसांवर येईल`
                : `Average Approval Turnaround Compresses to ${projectedAvgDays} Days`}
            </h3>
            <p className="text-xs text-slate-300">
              Based on simulated operational parameters across all 36 Maharashtra industrial districts.
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-white/20 sm:pl-6">
            <span className="text-3xl font-black text-[#D89B3C]">+{projectedIncreaseInThroughput}%</span>
            <span className="text-[11px] text-slate-300 block font-semibold">Speedup Efficiency</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="bg-white/10 rounded-lg p-3 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase">Current Average</span>
            <span className="text-base font-bold text-white mt-0.5 block">{baselineDays} Days</span>
          </div>
          <div className="bg-white/10 rounded-lg p-3 border border-white/10">
            <span className="text-[#D89B3C] block text-[10px] uppercase font-bold">Simulated Projection</span>
            <span className="text-base font-bold text-[#D89B3C] mt-0.5 block">{projectedAvgDays} Days</span>
          </div>
          <div className="bg-white/10 rounded-lg p-3 border border-white/10">
            <span className="text-emerald-400 block text-[10px] uppercase font-bold">Time Saved</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block">{(baselineDays - parseFloat(projectedAvgDays)).toFixed(1)} Days / Case</span>
          </div>
          <div className="bg-white/10 rounded-lg p-3 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase">Monthly Clearance Velocity</span>
            <span className="text-base font-bold text-white mt-0.5 block">~320 Units / Mo</span>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Slider 1: Inspection Turnaround */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#172A46]">Inspection Turnaround</h4>
            <span className="text-sm font-black text-[#263B63] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {inspectionDays} Days
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Average time between application submission and field site inspection execution (Baseline: 5 Days).
          </p>

          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={inspectionDays}
            onChange={(e) => setInspectionDays(parseInt(e.target.value))}
            className="w-full accent-[#172A46] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>1 Day (Instant)</span>
            <span>5 Days (Baseline)</span>
            <span>10 Days</span>
          </div>
        </div>

        {/* Slider 2: Auto-Validation Rate */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#172A46]">Document Auto-Validation</h4>
            <span className="text-sm font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {autoValidationRate}%
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Percentage of statutory documents instantly pre-validated via Document Locker (Baseline: 60%).
          </p>

          <input
            type="range"
            min="50"
            max="100"
            step="5"
            value={autoValidationRate}
            onChange={(e) => setAutoValidationRate(parseInt(e.target.value))}
            className="w-full accent-[#3D8C82] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>50%</span>
            <span>60% (Baseline)</span>
            <span>100% (Full Automated)</span>
          </div>
        </div>

        {/* Slider 3: Parallel Clearances Ratio */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#172A46]">Parallel Processing Ratio</h4>
            <span className="text-sm font-black text-[#D89B3C] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {parallelRatio}%
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Proportion of clearances evaluated simultaneously by MIDC, MPCB & Fire (Baseline: 40%).
          </p>

          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={parallelRatio}
            onChange={(e) => setParallelRatio(parseInt(e.target.value))}
            className="w-full accent-[#D89B3C] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>20% (Sequential)</span>
            <span>40% (Baseline)</span>
            <span>100% (Full Parallel)</span>
          </div>
        </div>

      </div>

      {/* Policy Recommendations Based on Simulation */}
      <div className="rounded-xl border border-slate-200 bg-[#FBF9F5] p-5 space-y-3 text-xs">
        <h4 className="font-bold text-[#172A46] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#3D8C82]" />
          Executive Reform Roadmap (Based on Simulated Parameters)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
          <div className="bg-white p-3 rounded-md border border-slate-200 space-y-1">
            <p className="font-bold text-[#263B63]">1. Mandate Joint Field Inspections</p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Pair MPCB environmental officers and Fire safety inspectors on the same calendar slot to reduce site visits from 2 to 1.
            </p>
          </div>

          <div className="bg-white p-3 rounded-md border border-slate-200 space-y-1">
            <p className="font-bold text-[#263B63]">2. Institutionalize Document Locker Auto-Reuse</p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Prohibit individual departments from asking for repeat PAN, GST, or Land Possession Deeds once verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
