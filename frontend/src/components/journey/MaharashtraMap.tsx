'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Move
} from 'lucide-react';
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

  // Pan and Zoom Interactive State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeDistrict = maharashtraDistricts.find(d => d.id === selectedDistrictId) || maharashtraDistricts[0];

  // Mouse Wheel & Mousepad Zoom Listener
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = container.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * 800;
      const svgY = ((e.clientY - rect.top) / rect.height) * 600;

      // Smooth zoom factor calculation for mousepad pinch, 2-finger scroll, and mouse wheel
      let factor: number;
      if (e.ctrlKey) {
        // Trackpad pinch gesture (e.g. pinch-to-zoom on Windows precision touchpad or Mac)
        factor = Math.exp(-e.deltaY * 0.012);
      } else if (Math.abs(e.deltaY) < 45) {
        // Trackpad two-finger scroll
        factor = Math.exp(-e.deltaY * 0.008);
      } else {
        // Standard mouse wheel notch
        factor = e.deltaY < 0 ? 1.2 : 0.83;
      }

      // Clamp factor to avoid runaway scaling
      factor = Math.max(0.65, Math.min(factor, 1.45));

      setZoom(prevZoom => {
        const nextZoom = Math.max(0.9, Math.min(prevZoom * factor, 3.8));
        if (Math.abs(nextZoom - prevZoom) < 0.001) return prevZoom;

        // Keep the point under the mouse cursor perfectly anchored
        setPan(prevPan => {
          const newPanX = prevPan.x + (prevZoom - nextZoom) * (svgX - 400);
          const newPanY = prevPan.y + (prevZoom - nextZoom) * (svgY - 300);
          return { x: newPanX, y: newPanY };
        });

        return nextZoom;
      });
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  // Zoom Controls
  const handleZoomIn = () => {
    setZoom(prev => {
      const next = Math.min(prev + 0.35, 3.8);
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Double-click to zoom in at point
  const handleDoubleClick = (e: React.MouseEvent) => {
    const container = mapContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 800;
    const svgY = ((e.clientY - rect.top) / rect.height) * 600;

    setZoom(prevZoom => {
      const nextZoom = Math.min(prevZoom + 0.5, 3.8);
      setPan(prevPan => ({
        x: prevPan.x + (prevZoom - nextZoom) * (svgX - 400),
        y: prevPan.y + (prevZoom - nextZoom) * (svgY - 300)
      }));
      return nextZoom;
    });
  };

  // Drag / Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    if (hoveredDistrict) setHoveredDistrict(null);
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

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
              ? "नकाशावर ड्रॅग करून फिरा, झूम करा आणि कोणत्याही जिल्ह्यावर क्लिक करून तेथील औद्योगिक मंजुरी स्थिती तपासा."
              : "Pan & zoom across Maharashtra. Hover or click any industrial district to inspect project SLA velocity."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#263B63] bg-[#F4F1EA] px-2.5 py-1 rounded border border-[#E6E0D4]">
            {maharashtraDistricts.length} Industrial Districts Monitored
          </span>
        </div>
      </div>

      {/* Main Map Visual Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Accurate Interactive Maharashtra Map (7 cols) */}
        <div 
          ref={mapContainerRef}
          className={`lg:col-span-7 relative bg-gradient-to-br from-[#FAF8F3] via-[#F6F2E9] to-[#EFEAE0] rounded-xl border border-[#E6E0D4] p-3 min-h-[460px] flex items-center justify-center overflow-hidden shadow-inner select-none touch-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        >
          {/* Subtle geometric cartography grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#263B63_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Interactive Zoom Toolbar in Top-Right */}
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg border border-slate-300 shadow-sm">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
              className="p-1.5 rounded text-slate-700 hover:bg-slate-100 hover:text-[#0F2942] transition-colors cursor-pointer"
              title="Zoom In (or scroll up / pinch out)"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
              className="p-1.5 rounded text-slate-700 hover:bg-slate-100 hover:text-[#0F2942] transition-colors cursor-pointer"
              title="Zoom Out (or scroll down / pinch in)"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleReset(); }}
              className="p-1.5 rounded text-slate-700 hover:bg-slate-100 hover:text-[#0F2942] transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-slate-500 px-1 border-l border-slate-200">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Drag & Mousepad Zoom Helper Badge */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-white/85 backdrop-blur-xs px-2 py-1 rounded border border-slate-200 pointer-events-none">
            <Move className="h-3 w-3 text-slate-400" />
            <span>Pinch / scroll to zoom • Drag to pan</span>
          </div>

          {/* SVG Canvas */}
          <svg 
            ref={svgRef}
            className="w-full h-[430px] drop-shadow-md select-none overflow-visible" 
            viewBox="0 0 800 600"
          >
            <defs>
              <linearGradient id="stateBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FAF7F0" />
                <stop offset="45%" stopColor="#F2EDE2" />
                <stop offset="100%" stopColor="#E7DFD0" />
              </linearGradient>
              <filter id="mapShadow" x="-5%" y="-5%" width="115%" height="115%">
                <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#263B63" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* Transformable Group with Smooth Zoom & Pan, Centered at (400, 300) */}
            <g 
              transform={`translate(${400 + pan.x}, ${300 + pan.y}) scale(${zoom}) translate(-400, -300)`}
              className={isDragging ? "" : "transition-transform duration-75 ease-out"}
            >
              {/* Arabian Sea Coastal Wash */}
              <path
                d="M -50,-50 L 80,-50 L 80,200 C 78,240 80,280 82,285 C 84,305 90,335 92,345 C 102,390 115,435 118,450 C 128,485 138,518 142,530 C 154,540 165,548 170,550 L 170,650 L -50,650 Z"
                fill="#E3EFF7"
                opacity="0.55"
                className="pointer-events-none"
              />
              <g transform="translate(24, 420) rotate(-78)" className="pointer-events-none select-none">
                <text className="text-[11px] font-black fill-[#263B63]/25 tracking-[0.3em] uppercase">
                  ARABIAN SEA • अरबी समुद्र
                </text>
              </g>

              {/* High-Accuracy Maharashtra State Boundary */}
              <path
                filter="url(#mapShadow)"
                d="M 80,200 
                   C 80,230 82,260 82,280 
                   C 84,300 90,320 92,335 
                   C 98,370 110,415 118,445 
                   C 125,475 136,512 142,525 
                   C 150,538 162,544 170,545 
                   C 184,542 196,536 200,532 
                   C 212,520 218,502 226,498 
                   C 240,490 256,478 270,468 
                   C 292,456 318,448 345,440 
                   C 368,430 388,418 400,405 
                   C 420,388 435,375 445,365 
                   C 462,348 478,338 492,328 
                   C 512,316 530,302 545,292 
                   C 570,284 592,280 610,278 
                   C 635,276 658,298 675,320 
                   C 690,324 712,316 725,305 
                   C 736,285 748,252 745,245 
                   C 742,215 745,178 735,155 
                   C 730,132 722,112 715,102 
                   C 695,98 672,94 665,96 
                   C 645,98 625,102 610,105 
                   C 580,108 565,108 555,108 
                   C 530,105 510,95 495,88 
                   C 475,98 458,105 445,108 
                   C 420,110 395,115 375,115 
                   C 345,116 318,120 295,120 
                   C 268,120 240,122 220,110 
                   C 192,92 172,62 160,58 
                   C 148,58 138,75 130,95 
                   C 124,120 114,146 102,162 
                   C 90,172 82,185 80,200 Z"
                fill="url(#stateBaseGrad)"
                stroke="#263B63"
                strokeWidth="2.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="pointer-events-none"
              />

              {/* Administrative Revenue Divisions (Dotted Inlands) */}
              {/* Konkan Inlands */}
              <path
                d="M 80,200 C 105,215 112,260 118,300 C 125,350 132,410 138,460 C 145,500 158,530 170,545"
                fill="none"
                stroke="#263B63"
                strokeWidth="1.2"
                strokeDasharray="4,4"
                opacity="0.3"
                className="pointer-events-none"
              />
              {/* Khandesh / North Maharashtra Inlands */}
              <path
                d="M 118,255 C 165,250 210,240 240,228 C 275,218 295,200 318,120"
                fill="none"
                stroke="#263B63"
                strokeWidth="1.2"
                strokeDasharray="4,4"
                opacity="0.3"
                className="pointer-events-none"
              />
              {/* Vidarbha Division Line */}
              <path
                d="M 470,95 C 465,145 460,190 450,235 C 445,268 460,300 492,328"
                fill="none"
                stroke="#263B63"
                strokeWidth="1.2"
                strokeDasharray="4,4"
                opacity="0.3"
                className="pointer-events-none"
              />
              {/* Marathwada Division Line */}
              <path
                d="M 240,228 C 260,285 285,335 315,378 C 330,400 338,422 345,440"
                fill="none"
                stroke="#263B63"
                strokeWidth="1.2"
                strokeDasharray="4,4"
                opacity="0.3"
                className="pointer-events-none"
              />

              {/* Regional Ambient Watermarks */}
              <text x="85" y="490" className="text-[11px] font-black fill-[#263B63]/20 uppercase tracking-widest pointer-events-none select-none">
                KONKAN
              </text>
              <text x="190" y="155" className="text-[11px] font-black fill-[#263B63]/20 uppercase tracking-widest pointer-events-none select-none">
                NORTH MH
              </text>
              <text x="210" y="395" className="text-[12px] font-black fill-[#263B63]/20 uppercase tracking-widest pointer-events-none select-none">
                PASCHIM MH
              </text>
              <text x="345" y="295" className="text-[12px] font-black fill-[#263B63]/20 uppercase tracking-widest pointer-events-none select-none">
                MARATHWADA
              </text>
              <text x="590" y="180" className="text-[13px] font-black fill-[#263B63]/20 uppercase tracking-widest pointer-events-none select-none">
                VIDARBHA
              </text>

              {/* Compass Rose (Fixed in Group) */}
              <g transform="translate(710, 520)" className="pointer-events-none">
                <circle cx="16" cy="16" r="16" fill="white" stroke="#263B63" strokeWidth="1.4" opacity="0.9" />
                <polygon points="16,6 20.5,17 16,14 11.5,17" fill="#D89B3C" />
                <polygon points="16,26 20.5,17 16,14 11.5,17" fill="#263B63" />
                <text x="16" y="4" textAnchor="middle" className="text-[9.5px] font-black fill-[#263B63]">N</text>
              </g>

              {/* District Pins & Nodes */}
              {maharashtraDistricts.map((dist) => {
                const isSelected = dist.id === (selectedDistrictId || "nagpur");
                const isHovered = dist.id === hoveredDistrict?.id;

                return (
                  <g
                    key={dist.id}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDistrict?.(dist.id);
                    }}
                    onMouseEnter={() => setHoveredDistrict(dist)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  >
                    {/* Generous invisible hit target circle (18px radius) */}
                    <circle
                      cx={dist.x}
                      cy={dist.y}
                      r="18"
                      fill="transparent"
                    />

                    {/* Selected Halo - Stationary & Stable, NO ANIMATE-PING */}
                    {isSelected && (
                      <g className="pointer-events-none">
                        <circle
                          cx={dist.x}
                          cy={dist.y}
                          r="15"
                          className="fill-[#D89B3C]/20 stroke-[#D89B3C]/80 stroke-[1.5]"
                        />
                        <circle
                          cx={dist.x}
                          cy={dist.y}
                          r="10"
                          className="fill-[#D89B3C]/30 stroke-[#D89B3C]"
                        />
                      </g>
                    )}

                    {/* Hover Halo - Stationary & Stable */}
                    {isHovered && !isSelected && (
                      <circle
                        cx={dist.x}
                        cy={dist.y}
                        r="11"
                        className="fill-blue-500/20 stroke-blue-500/50 stroke-1 pointer-events-none"
                      />
                    )}

                    {/* Interactive City Pin Target */}
                    <circle
                      cx={dist.x}
                      cy={dist.y}
                      r={isSelected ? 6.5 : isHovered ? 6 : 5}
                      className={`pointer-events-none ${
                        isSelected
                          ? "fill-[#263B63] stroke-[#D89B3C] stroke-[2.5]"
                          : dist.status === "delayed"
                          ? "fill-[#B94A48] stroke-white stroke-[2]"
                          : dist.status === "warning"
                          ? "fill-[#D89B3C] stroke-white stroke-[2]"
                          : "fill-[#3D8C82] stroke-white stroke-[2]"
                      }`}
                    />

                    {/* District Label (pointer-events-none to prevent hover flicker) */}
                    <g 
                      transform={`translate(${dist.x}, ${dist.y - (isSelected ? 11 : 9)})`}
                      className="pointer-events-none select-none"
                    >
                      <rect
                        x={-(isMarathi ? dist.nameMr.length * 4.2 : dist.name.length * 3.5) - 4}
                        y="-12"
                        width={(isMarathi ? dist.nameMr.length * 8.4 : dist.name.length * 7.0) + 8}
                        height="14"
                        rx="3.5"
                        className={`${
                          isSelected
                            ? "fill-[#263B63] stroke-[#D89B3C] stroke-[1]"
                            : isHovered
                            ? "fill-white stroke-slate-400 stroke-[0.8]"
                            : "fill-white/90 stroke-slate-300/80 stroke-[0.5]"
                        } shadow-xs`}
                      />
                      <text
                        x="0"
                        y="-2"
                        textAnchor="middle"
                        className={`text-[9px] font-bold tracking-tight ${
                          isSelected
                            ? "fill-white font-black"
                            : isHovered
                            ? "fill-[#263B63] font-bold"
                            : "fill-slate-800 font-semibold"
                        }`}
                      >
                        {isMarathi ? dist.nameMr : dist.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Map Legend (Bottom Left) */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs rounded-lg border border-slate-200 px-3 py-2 text-[10px] space-y-1 shadow-2xs pointer-events-none z-20">
            <span className="font-bold text-slate-700 block uppercase tracking-wider text-[9px]">SLA Clearance Status</span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3D8C82]" /> ≥85% SLA
              </span>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D89B3C]" /> 75–84% SLA
              </span>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B94A48]" /> &lt;75% Attention
              </span>
            </div>
          </div>

          {/* Floating Hover Card - Docked in Top Left with Stable Z-Index */}
          {hoveredDistrict && (
            <div className="absolute top-12 left-3 rounded-xl bg-white/98 backdrop-blur-md p-3.5 shadow-xl border border-slate-200 text-xs pointer-events-none z-30 space-y-1.5 min-w-[210px] animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <p className="font-bold text-[#263B63] text-sm">
                  {isMarathi ? hoveredDistrict.nameMr : hoveredDistrict.name}
                </p>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  {hoveredDistrict.region}
                </span>
              </div>
              <div className="space-y-0.5 text-[11px]">
                <p className="text-slate-600 flex justify-between">
                  <span>Active Projects:</span>
                  <strong className="text-slate-900">{hoveredDistrict.projectsCount.toLocaleString()}</strong>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span>Avg SLA Days:</span>
                  <strong className="text-slate-900">{hoveredDistrict.avgProcessingDays} Days</strong>
                </p>
                <p className="text-slate-600 flex justify-between">
                  <span>SLA Compliance:</span>
                  <strong className={hoveredDistrict.slaCompliance >= 85 ? "text-emerald-700" : "text-amber-700"}>
                    {hoveredDistrict.slaCompliance}%
                  </strong>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Selected District Spotlight Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[#E6E0D4] bg-[#FBF9F5] p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {activeDistrict.region} Region
              </span>
              <h4 className="text-xl font-black text-[#263B63]">
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
            <div className="rounded-lg bg-white p-3.5 border border-slate-200 space-y-0.5 shadow-2xs">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Active Industrial Units</span>
              <span className="text-2xl font-black text-[#263B63]">{activeDistrict.projectsCount.toLocaleString()}</span>
            </div>
            <div className="rounded-lg bg-white p-3.5 border border-slate-200 space-y-0.5 shadow-2xs">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Avg Clearance SLA</span>
              <span className="text-2xl font-black text-emerald-700">{activeDistrict.avgProcessingDays} Days</span>
            </div>
            <div className="rounded-lg bg-white p-3.5 border border-slate-200 space-y-0.5 shadow-2xs">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Pending Workload</span>
              <span className="text-2xl font-black text-blue-700">{activeDistrict.pendingCount}</span>
            </div>
            <div className="rounded-lg bg-white p-3.5 border border-slate-200 space-y-0.5 shadow-2xs">
              <span className="text-slate-400 block font-bold text-[10px] uppercase">Service Rating</span>
              <span className="text-2xl font-black text-[#D89B3C]">★ 4.8 / 5</span>
            </div>
          </div>

          <div className="text-xs space-y-1.5 pt-1">
            <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
              Major Industrial Clusters & SEZs:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeDistrict.majorIndustries.map((ind, i) => (
                <span key={i} className="bg-white px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-2xs">
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E6E0D4] pt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[#3D8C82] font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> Single Window Live Telemetry
            </span>
            <span>Directorate of Industries</span>
          </div>
        </div>

      </div>
    </div>
  );
};
