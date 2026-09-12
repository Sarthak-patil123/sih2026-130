'use client';

import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { maharashtraDistricts } from '../../data/districts';
import { District } from '../../types';

export interface MaharashtraMapProps {
  selectedDistrictId?: string;
  onSelectDistrict?: (districtId: string) => void;
}

export const MaharashtraMap: React.FC<MaharashtraMapProps> = ({ selectedDistrictId, onSelectDistrict }) => {
  const { isMarathi } = useLanguage();
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  const activeDistrict = maharashtraDistricts.find(d => d.id === selectedDistrictId) || maharashtraDistricts[0];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#263B63] text-white">
              <Activity className="h-4 w-4 text-[#D89B3C]" />
            </span>
            <h3 className="text-base font-bold text-[#263B63]">
              {isMarathi ? "महाराष्ट्र औद्योगिक नाडी (Maharashtra Industrial Pulse Map)" : "Maharashtra Industrial Pulse Map"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isMarathi 
              ? "जिल्ह्यावर क्लिक करून तेथील प्रकल्प संख्या, सरासरी मंजुरी कालावधी व प्रलंबित अर्जांचे विश्लेषण पहा."
              : "Hover or select any district to inspect active project volumes, average SLA clearance days, and pending bottlenecks."}
          </p>
        </div>

        <span className="text-xs font-bold text-[#263B63] bg-[#F4F1EA] px-2.5 py-1 rounded border border-[#E6E0D4]">
          {maharashtraDistricts.length} Industrial Districts Monitored
        </span>
      </div>

      {/* Main Map Visual Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Stylized Maharashtra District Map (7 cols) */}
        <div className="lg:col-span-7 relative bg-[#FBF9F5] rounded-xl border border-[#E6E0D4] p-6 min-h-[380px] flex items-center justify-center overflow-hidden">
          {/* Stylized background contour lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#263B63_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* SVG Stylized Maharashtra Polygon Shape */}
          <svg className="w-full h-80 drop-shadow-sm" viewBox="0 0 100 100">
            {/* Outline of Maharashtra */}
            <path
              d="M 15,35 L 30,22 L 55,20 L 75,18 L 92,25 L 90,45 L 85,60 L 68,75 L 50,82 L 32,88 L 22,78 L 18,58 L 12,42 Z"
              fill="#EFE9DD"
              stroke="#263B63"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* District Interactive Nodes */}
            {maharashtraDistricts.map((dist) => {
              const isSelected = dist.id === (selectedDistrictId || "nagpur");
              const isHovered = dist.id === hoveredDistrict?.id;

              return (
                <g
                  key={dist.id}
                  onClick={() => onSelectDistrict?.(dist.id)}
                  onMouseEnter={() => setHoveredDistrict(dist)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  className="cursor-pointer transition-all"
                >
                  {/* Pulse Ring if selected */}
                  {isSelected && (
                    <circle
                      cx={dist.x}
                      cy={dist.y}
                      r="6"
                      className="fill-[#D89B3C]/30 stroke-[#D89B3C] animate-ping"
                    />
                  )}

                  {/* Pin Node */}
                  <circle
                    cx={dist.x}
                    cy={dist.y}
                    r={isSelected ? "4.5" : isHovered ? "4" : "3"}
                    className={`transition-all ${
                      isSelected
                        ? "fill-[#263B63] stroke-[#D89B3C] stroke-2"
                        : dist.status === "delayed"
                        ? "fill-[#B94A48] stroke-white stroke-1"
                        : dist.status === "warning"
                        ? "fill-[#D89B3C] stroke-white stroke-1"
                        : "fill-[#3D8C82] stroke-white stroke-1"
                    }`}
                  />

                  {/* District Label */}
                  <text
                    x={dist.x}
                    y={dist.y - 4.5}
                    textAnchor="middle"
                    className={`text-[3.5px] font-bold select-none ${
                      isSelected ? "fill-[#263B63] font-black" : "fill-slate-600"
                    }`}
                  >
                    {isMarathi ? dist.nameMr : dist.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Card */}
          {hoveredDistrict && (
            <div className="absolute top-4 left-4 rounded-lg bg-white/95 backdrop-blur-xs p-3 shadow-lg border border-slate-200 text-xs pointer-events-none z-10 space-y-1">
              <p className="font-bold text-[#263B63]">{isMarathi ? hoveredDistrict.nameMr : hoveredDistrict.name} ({hoveredDistrict.region})</p>
              <p className="text-slate-600">Projects: <strong>{hoveredDistrict.projectsCount.toLocaleString()}</strong></p>
              <p className="text-slate-600">Avg SLA: <strong>{hoveredDistrict.avgProcessingDays} Days</strong> • SLA: <strong className="text-emerald-700">{hoveredDistrict.slaCompliance}%</strong></p>
            </div>
          )}
        </div>

        {/* Right: Selected District Spotlight Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[#E6E0D4] bg-[#FBF9F5] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {activeDistrict.region} Region
              </span>
              <h4 className="text-lg font-black text-[#263B63]">
                {isMarathi ? activeDistrict.nameMr : activeDistrict.name} District
              </h4>
            </div>
            <span className={`px-2.5 py-1 text-xs font-bold rounded ${
              activeDistrict.slaCompliance >= 90 ? "bg-emerald-100 text-emerald-800" :
              activeDistrict.slaCompliance >= 80 ? "bg-blue-100 text-blue-800" :
              "bg-amber-100 text-amber-900"
            }`}>
              {activeDistrict.slaCompliance}% SLA Compliance
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-0.5">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Active Projects</span>
              <span className="text-xl font-bold text-[#263B63]">{activeDistrict.projectsCount.toLocaleString()}</span>
            </div>
            <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-0.5">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Avg Clearance SLA</span>
              <span className="text-xl font-bold text-emerald-700">{activeDistrict.avgProcessingDays} Days</span>
            </div>
            <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-0.5">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Pending Workload</span>
              <span className="text-xl font-bold text-blue-700">{activeDistrict.pendingCount}</span>
            </div>
            <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-0.5">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Public Service Rating</span>
              <span className="text-xl font-bold text-[#D89B3C]">★ 4.8 / 5</span>
            </div>
          </div>

          <div className="text-xs space-y-1.5 pt-1">
            <span className="font-bold text-slate-700 block text-[11px]">Major Industrial Clusters:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeDistrict.majorIndustries.map((ind, i) => (
                <span key={i} className="bg-white px-2 py-0.5 rounded text-[11px] font-medium text-slate-700 border border-slate-200">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
