'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  CheckCircle2, 
  GitMerge
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ProgressBar } from '../common/ProgressBar';
import { Button } from '../common/Button';
import { Project } from '../../types';

export interface ProjectPassportProps {
  project?: Project;
  onOpenRoadmap?: () => void;
  onOpenDocuments?: () => void;
}

export const ProjectPassport: React.FC<ProjectPassportProps> = ({ project, onOpenRoadmap }) => {
  const { isMarathi } = useLanguage();

  if (!project) return null;

  const blockersCount = project.blockers?.length || 0;
  const breakdown = project.readinessBreakdown || { documentation: 86, approvals: 70, inspections: 50, compliance: 100 };

  return (
    <div className="rounded-xl border-2 border-[#263B63]/20 bg-white p-6 shadow-sm space-y-5 relative overflow-hidden">
      {/* Decorative Warm Saffron Top Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#263B63] via-[#D89B3C] to-[#3D8C82]" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#263B63] bg-[#F4F1EA] px-2.5 py-0.5 rounded border border-[#E6E0D4]">
              {project.id}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
              {isMarathi ? "प्रकल्प पासपोर्ट (सक्रिय)" : "Project Passport (Active)"}
            </span>
          </div>
          <h2 className="text-xl font-black text-[#263B63] mt-1.5">
            {isMarathi ? (project.companyNameMr || project.companyName) : project.companyName}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {isMarathi ? (project.projectNameMr || project.projectName) : project.projectName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={GitMerge}
            onClick={onOpenRoadmap}
          >
            {isMarathi ? "मंजुरी आराखडा" : "Approval Roadmap"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => alert(`Exporting Digital Project Passport #${project.id}`)}
          >
            {isMarathi ? "पासपोर्ट डाउनलोड करा" : "Export Passport"}
          </Button>
        </div>
      </div>

      {/* Core Project Attributes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4]">
          <span className="text-slate-400 block uppercase font-bold text-[10px]">
            {isMarathi ? "स्थान / जिल्हा" : "Location / Zone"}
          </span>
          <span className="font-bold text-[#263B63] text-sm mt-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-rose-600 shrink-0" />
            {isMarathi ? project.districtMr : project.district}, MH
          </span>
          <span className="text-[11px] text-slate-500 block truncate mt-0.5">{project.industrialArea}</span>
        </div>

        <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4]">
          <span className="text-slate-400 block uppercase font-bold text-[10px]">
            {isMarathi ? "उद्योग क्षेत्र" : "Industry Sector"}
          </span>
          <span className="font-bold text-[#263B63] text-sm mt-1 flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5 text-[#3D8C82] shrink-0" />
            {isMarathi ? project.industryMr : project.industry}
          </span>
          <span className="text-[11px] text-slate-500 block truncate mt-0.5">{project.projectType}</span>
        </div>

        <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4]">
          <span className="text-slate-400 block uppercase font-bold text-[10px]">
            {isMarathi ? "एकूण भांडवली गुंतवणूक" : "Total Investment"}
          </span>
          <span className="font-black text-emerald-700 text-sm mt-1 block">
            {project.investment}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">{project.landArea}</span>
        </div>

        <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4]">
          <span className="text-slate-400 block uppercase font-bold text-[10px]">
            {isMarathi ? "कर्मचारी संख्या" : "Workforce Size"}
          </span>
          <span className="font-bold text-[#263B63] text-sm mt-1 flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-[#D89B3C] shrink-0" />
            {project.employees}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">Commercial: {project.estimatedCommissioning}</span>
        </div>
      </div>

      {/* Project Readiness & Multi-Track Breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#3D8C82]" />
              <h3 className="text-base font-bold text-[#263B63]">
                {isMarathi ? "प्रकल्प सज्जता निर्देशांक (Project Readiness)" : "Project Readiness Index"}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isMarathi 
                ? "दस्तऐवज, कायदेशीर मंजुऱ्या, प्रत्यक्ष तपासणी आणि अनुपालनाचे एकत्रित मोजमाप."
                : "Holistic evaluation across documentation, statutory clearances, field audits, and compliance."}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#263B63]">{project.overallReadiness || 74}%</span>
            <span className="text-[11px] text-slate-400 block font-medium">Readiness Score</span>
          </div>
        </div>

        {/* 4 Multi-track Progress Breakdown Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="space-y-1.5 bg-[#FBF9F5] p-3 rounded-lg border border-[#E6E0D4]">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>{isMarathi ? "कागदपत्रे" : "Documentation"}</span>
              <span className="font-bold text-[#263B63]">{breakdown.documentation}%</span>
            </div>
            <ProgressBar progress={breakdown.documentation} height="sm" color="blue" showPercentage={false} />
            <span className="text-[10px] text-slate-400 block">8 of 10 Verified in Locker</span>
          </div>

          <div className="space-y-1.5 bg-[#FBF9F5] p-3 rounded-lg border border-[#E6E0D4]">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>{isMarathi ? "मंजुऱ्या" : "Approvals"}</span>
              <span className="font-bold text-[#263B63]">{breakdown.approvals}%</span>
            </div>
            <ProgressBar progress={breakdown.approvals} height="sm" color="primary" showPercentage={false} />
            <span className="text-[10px] text-slate-400 block">2 of 6 Clearances Issued</span>
          </div>

          <div className="space-y-1.5 bg-[#FBF9F5] p-3 rounded-lg border border-[#E6E0D4]">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>{isMarathi ? "तपासणी" : "Inspections"}</span>
              <span className="font-bold text-[#263B63]">{breakdown.inspections}%</span>
            </div>
            <ProgressBar progress={breakdown.inspections} height="sm" color="warning" showPercentage={false} />
            <span className="text-[10px] text-slate-400 block">1 of 2 Audits Completed</span>
          </div>

          <div className="space-y-1.5 bg-[#FBF9F5] p-3 rounded-lg border border-[#E6E0D4]">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>{isMarathi ? "अनुपालन" : "Compliance"}</span>
              <span className="font-bold text-emerald-700">{breakdown.compliance}%</span>
            </div>
            <ProgressBar progress={breakdown.compliance} height="sm" color="success" showPercentage={false} />
            <span className="text-[10px] text-slate-400 block">All Periodic Filings Current</span>
          </div>
        </div>

        {/* Blocking Items Summary Callout */}
        {blockersCount > 0 ? (
          <div className="rounded-lg border border-amber-300 bg-amber-50/80 p-3.5 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
              <span className="font-bold text-amber-950">
                {blockersCount} {isMarathi ? "बाबी सध्या आपल्या प्रकल्पाच्या प्रगतीमध्ये अडथळा ठरत आहेत." : "items are currently blocking your project from moving to the next stage."}
              </span>
            </div>
            <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded shrink-0">
              {isMarathi ? "खालील अडथळा सोडवा" : "See Blockers Below"}
            </span>
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-300 bg-emerald-50/60 p-3 flex items-center gap-2.5 text-xs text-emerald-950">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              {isMarathi ? "सर्व आवश्यकता पूर्ण झाल्या आहेत. कोणताही अडथळा नाही." : "All prerequisites are clear. No active blockers detected."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
