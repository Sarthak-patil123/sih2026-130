'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  GitMerge, 
  Sparkles,
  Info,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { Input, Select } from '@/components/common/Input';
import { Button } from '@/components/common/Button';

export default function CreateProjectPage() {
  const { createProject } = usePortal();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [generationStep, setGenerationStep] = useState(1);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [formData, setFormData] = useState({
    projectName: "Vidarbha Agro Bio-Tech Mega Processing Plant",
    companyName: "Vidarbha Agro Bio-Tech Pvt. Ltd.",
    industry: "Food Processing",
    projectType: "New Industrial Unit",
    investment: "40",
    landArea: "12 Acres (52,270 sq.m.)",
    employees: "180",
    productionCapacity: "850 MT/month processed fruit pulps & organic concentrates",
    district: "Nagpur",
    taluka: "Hingna",
    industrialArea: "Hingna MIDC Phase II",
    address: "Plot E-44, MIDC Hingna Industrial Area, Nagpur - 440028"
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const industryOptions = [
    { value: "Food Processing", label: "Food Processing & Agro Industries" },
    { value: "Automotive & Engineering", label: "Automotive, Auto Components & Precision Engineering" },
    { value: "Pharmaceuticals & Biotechnology", label: "Pharmaceuticals, API & Biotechnology" },
    { value: "Electronics & Semiconductor", label: "Electronics System Design & Manufacturing (ESDM)" },
    { value: "Textiles & Apparel", label: "Textiles, Technical Textiles & Garments" },
    { value: "Chemicals & Petrochemicals", label: "Chemicals, Specialty Polymers & Petrochemicals" },
    { value: "Renewable Energy & Battery", label: "Solar Modules, EV Batteries & Green Hydrogen" },
    { value: "IT & Data Centre Infrastructure", label: "Information Technology & Hyper-scale Data Centres" }
  ];

  const projectTypeOptions = [
    { value: "New Industrial Unit", label: "New Greenfield Industrial Unit (Establishment)" },
    { value: "Expansion of Existing Unit", label: "Expansion / Brownfield Augmentation of Existing Unit" },
    { value: "Modernization & Diversification", label: "Technology Modernization & Product Diversification" }
  ];

  const districtOptions = [
    { value: "Nagpur", label: "Nagpur (Vidarbha Zone D+)" },
    { value: "Pune", label: "Pune (Western Maharashtra Zone A)" },
    { value: "Chhatrapati Sambhajinagar", label: "Chhatrapati Sambhajinagar (Aurangabad / DMIC)" },
    { value: "Nashik", label: "Nashik (North Maharashtra Zone C)" },
    { value: "Thane", label: "Thane (MMR Region Zone A)" },
    { value: "Raigad", label: "Raigad (Coastal Industrial Zone B)" },
    { value: "Amravati", label: "Amravati (Textile Park & Agro Zone D+)" },
    { value: "Kolhapur", label: "Kolhapur (Foundry & Agro Cluster Zone C)" },
    { value: "Solapur", label: "Solapur (Garment & Industrial Zone D)" },
    { value: "Nanded", label: "Nanded (Marathwada Zone D+)" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (step: number) => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!formData.projectName?.trim()) errs.projectName = "Project name is required";
      if (!formData.companyName?.trim()) errs.companyName = "Company name is required";
      if (!formData.industry) errs.industry = "Select industry sector";
      if (!formData.projectType) errs.projectType = "Select project type";
    } else if (step === 2) {
      if (!formData.investment || parseFloat(formData.investment) <= 0) errs.investment = "Enter valid investment in ₹ Crore";
      if (!formData.landArea?.trim()) errs.landArea = "Land area is required";
      if (!formData.employees || parseInt(formData.employees) <= 0) errs.employees = "Enter estimated employee count";
      if (!formData.productionCapacity?.trim()) errs.productionCapacity = "Production capacity is required";
    } else if (step === 3) {
      if (!formData.district) errs.district = "Select district in Maharashtra";
      if (!formData.industrialArea?.trim()) errs.industrialArea = "Industrial area / MIDC zone required";
      if (!formData.address?.trim()) errs.address = "Plot address is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(4, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleGenerateRoadmap = () => {
    setIsGeneratingRoadmap(true);
    setGenerationStep(1);
    setGenerationProgress(20);

    setTimeout(() => {
      setGenerationStep(2);
      setGenerationProgress(65);
    }, 800);

    setTimeout(() => {
      setGenerationStep(3);
      setGenerationProgress(92);
    }, 1600);

    setTimeout(() => {
      setGenerationProgress(100);
      createProject({
        projectName: formData.projectName,
        companyName: formData.companyName,
        industry: formData.industry,
        projectType: formData.projectType,
        investment: `₹${formData.investment} Cr`,
        landArea: formData.landArea,
        district: formData.district,
        address: `${formData.address}, ${formData.industrialArea}, ${formData.taluka}`
      });
      router.push('/entrepreneur/roadmap');
    }, 2400);
  };

  const steps = [
    { num: 1, label: "Basic Info", desc: "Company & Industry" },
    { num: 2, label: "Project Details", desc: "Investment & Capacity" },
    { num: 3, label: "Location", desc: "District & MIDC Zone" },
    { num: 4, label: "Review & Generate", desc: "Statutory Roadmap" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-[#0F2942]">New Industrial Unit Registration</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Enter your industrial project parameters. Our Single Window Rule Engine will generate a customized statutory approval roadmap.
        </p>
      </div>

      {/* Step Indicator Bar */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
        <div className="grid grid-cols-4 gap-2">
          {steps.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <div
                key={s.num}
                className={`flex flex-col items-center text-center p-2 rounded transition-colors ${
                  isCurrent ? "bg-blue-50/80 border border-blue-200" : ""
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    isDone
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-[#0F2942] text-white ring-2 ring-blue-300"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                </div>
                <span className={`text-xs font-bold mt-1.5 ${isCurrent ? "text-[#0F2942]" : "text-slate-600"}`}>
                  {s.label}
                </span>
                <span className="hidden sm:inline text-[10px] text-slate-400">{s.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Form Container */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#0F2942]">Step 1: Basic Information</h3>
              <p className="text-xs text-slate-500">Legal entity details and industrial category.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Project / Unit Name"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="e.g. Integrated Agro & Fruit Processing Complex"
                error={errors.projectName ?? undefined}
                required
              />
              <Input
                label="Company / Enterprise Legal Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. ABC Food Processing Pvt. Ltd."
                error={errors.companyName ?? undefined}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Industry Sector"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                options={industryOptions}
                error={errors.industry ?? undefined}
                required
              />
              <Select
                label="Project Type"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                options={projectTypeOptions}
                error={errors.projectType ?? undefined}
                required
              />
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#0F2942]">Step 2: Project Details & Capacity</h3>
              <p className="text-xs text-slate-500">Capital outlay, land footprint, and workforce size.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Total Proposed Investment (₹ in Crores)"
                name="investment"
                type="number"
                value={formData.investment}
                onChange={handleChange}
                placeholder="e.g. 50"
                helperText="Includes land, building, civil works, plant and machinery."
                error={errors.investment ?? undefined}
                required
              />
              <Input
                label="Total Land Footprint / Plot Area"
                name="landArea"
                value={formData.landArea}
                onChange={handleChange}
                placeholder="e.g. 15 Acres (65,340 sq.m.)"
                error={errors.landArea ?? undefined}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Estimated Direct & Indirect Workforce"
                name="employees"
                type="number"
                value={formData.employees}
                onChange={handleChange}
                placeholder="e.g. 240"
                error={errors.employees ?? undefined}
                required
              />
              <Input
                label="Proposed Production Capacity (per month/annum)"
                name="productionCapacity"
                value={formData.productionCapacity}
                onChange={handleChange}
                placeholder="e.g. 1,200 MT/month processed fruit pulp"
                error={errors.productionCapacity ?? undefined}
                required
              />
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#0F2942]">Step 3: Location in Maharashtra</h3>
              <p className="text-xs text-slate-500">District, Taluka and MIDC Industrial Zone designation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="District (Maharashtra)"
                name="district"
                value={formData.district}
                onChange={handleChange}
                options={districtOptions}
                error={errors.district ?? undefined}
                required
              />
              <Input
                label="Taluka / Tehsil"
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                placeholder="e.g. Nagpur Rural / Hingna"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Industrial Area / MIDC Complex"
                name="industrialArea"
                value={formData.industrialArea}
                onChange={handleChange}
                placeholder="e.g. Butibori MIDC Phase II"
                error={errors.industrialArea ?? undefined}
                required
              />
              <Input
                label="Plot Number & Complete Site Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Plot B-14, Sector 4, Butibori, Nagpur - 441122"
                error={errors.address ?? undefined}
                required
              />
            </div>
          </div>
        )}

        {/* Step 4: Review & Generate */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-[#0F2942]">Step 4: Review Information & Generate Roadmap</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Verify the entered parameters below before invoking the single-window clearance roadmap generator.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Project Name</span>
                  <span className="font-bold text-slate-800 text-sm">{formData.projectName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Company Name</span>
                  <span className="font-bold text-slate-800 text-sm">{formData.companyName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Industry Sector</span>
                  <span className="font-semibold text-slate-800">{formData.industry}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Project Type</span>
                  <span className="font-semibold text-slate-800">{formData.projectType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Total Investment</span>
                  <span className="font-bold text-emerald-700 text-base">₹{formData.investment} Crore</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Land Area</span>
                  <span className="font-semibold text-slate-800">{formData.landArea}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Estimated Workforce</span>
                  <span className="font-semibold text-slate-800">{formData.employees} Employees</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Production Capacity</span>
                  <span className="font-semibold text-slate-800">{formData.productionCapacity}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block font-semibold uppercase text-[10px]">Location & Address</span>
                  <span className="font-semibold text-slate-800">
                    {formData.address}, {formData.industrialArea}, {formData.taluka}, {formData.district}, Maharashtra
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-blue-200 bg-blue-50/70 p-3.5 flex items-start gap-3 text-xs text-blue-900">
              <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Single Window Statutory Processing Notice</p>
                <p className="text-blue-800 mt-0.5 leading-relaxed">
                  Based on your sector (<strong>{formData.industry}</strong>) and capital bracket (<strong>₹{formData.investment} Cr</strong>), 6 statutory clearances will be mapped with sequential & parallel tracks under Maharashtra Single Window (MAITRI).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-6">
          {currentStep > 1 ? (
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              onClick={handleBack}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={handleNext}
            >
              Continue to Step {currentStep + 1}
            </Button>
          ) : (
            <Button
              variant="blue"
              size="md"
              icon={GitMerge}
              loading={isGeneratingRoadmap}
              onClick={handleGenerateRoadmap}
            >
              {isGeneratingRoadmap ? "Processing Single-Window Rules..." : "Generate Approval Roadmap"}
            </Button>
          )}
        </div>
      </div>

      {/* High-Fidelity Processing Modal / Overlay for Demo */}
      {isGeneratingRoadmap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0F2942] text-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D89B3C] text-[#0F2942] font-black text-sm">
                  MH
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wide">MAITRI Single Window Rule Engine</h3>
                  <p className="text-[11px] text-slate-300">Govt of Maharashtra • Statutory Clearance Compiler</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#D89B3C] bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {generationProgress}%
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-[#D89B3C] via-emerald-400 to-blue-400 transition-all duration-500 ease-out"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Rule Scrutiny</span>
                <span>Inter-Dept Mapping</span>
                <span>Passport Minting</span>
              </div>
            </div>

            {/* Staged Evaluation Steps */}
            <div className="space-y-3 pt-1 text-xs">
              <div className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                generationStep > 1 ? "bg-emerald-950/40 border border-emerald-500/30" : "bg-slate-800/80 border border-slate-700"
              }`}>
                {generationStep > 1 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Loader2 className="h-4 w-4 text-[#D89B3C] animate-spin shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-slate-100">Step 1: Industrial Classification & Zoning Validation</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Analyzing unit capital ({formData.investment ? `₹${formData.investment} Cr` : '₹40 Cr'}) & MIDC {formData.district || 'Nagpur'} industrial zone setbacks.
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                generationStep > 2 
                  ? "bg-emerald-950/40 border border-emerald-500/30" 
                  : generationStep === 2 
                  ? "bg-blue-950/40 border border-blue-500/40" 
                  : "opacity-40 bg-slate-900 border border-slate-800"
              }`}>
                {generationStep > 2 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : generationStep === 2 ? (
                  <Loader2 className="h-4 w-4 text-blue-400 animate-spin shrink-0 mt-0.5" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-slate-100">Step 2: Statutory Clearances & Dependency Graph</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Synthesizing parallel tracks for MPCB Consent, Fire NOC, DISH Factory Plan & Power Sanction.
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                generationStep === 3 
                  ? "bg-amber-950/40 border border-amber-500/40" 
                  : generationProgress === 100
                  ? "bg-emerald-950/40 border border-emerald-500/30"
                  : "opacity-40 bg-slate-900 border border-slate-800"
              }`}>
                {generationProgress === 100 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : generationStep === 3 ? (
                  <Loader2 className="h-4 w-4 text-amber-400 animate-spin shrink-0 mt-0.5" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-slate-100">Step 3: Issuing Digital Project Passport</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Generating unique Single Window Passport ID and interactive statutory timeline.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              Directing to your customized statutory clearance roadmap...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
