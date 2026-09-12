'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  GitMerge, 
  Layers, 
  ArrowRight, 
  FolderLock,
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { useLanguage } from '@/context/LanguageContext';
import { ApprovalCard } from '@/components/cards/ApprovalCard';
import { DependencyMap } from '@/components/journey/DependencyMap';
import { Button } from '@/components/common/Button';

export default function ApprovalRoadmapPage() {
  const { currentProject, applications, approvalTemplates } = usePortal();
  const { isMarathi } = useLanguage();
  const router = useRouter();

  const mappedApprovals = approvalTemplates.slice(0, 6).map((tmpl) => {
    const app = applications.find(a => 
      (a.projectId === currentProject?.id || a.projectId === 'PROJ-2026-001') && 
      (a.approvalId === tmpl.id || a.approval.toLowerCase().includes(tmpl.name.toLowerCase().substring(0, 10)))
    );

    return {
      template: tmpl,
      application: app
    };
  });

  const parallelApprovals = mappedApprovals.filter(m => m.template.isParallel);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[#263B63] bg-[#F4F1EA] px-2.5 py-0.5 rounded border border-[#E6E0D4]">
              {currentProject?.id || "PROJ-2026-001"}
            </span>
            <span className="text-xs text-slate-500 font-medium">Single Window Master Path</span>
          </div>
          <h2 className="text-2xl font-black text-[#263B63] mt-1">
            {isMarathi ? "मंजुरी आराखडा व अवलंबित्व नकाशा" : "Approval Roadmap & Dependency Architecture"}
          </h2>
          <p className="text-xs text-slate-500">
            {isMarathi ? "प्रकल्प: " : "Project: "} <strong className="text-slate-800">{isMarathi ? (currentProject?.companyNameMr || currentProject?.companyName) : currentProject?.companyName}</strong> • {currentProject?.district}, Maharashtra
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            icon={FolderLock}
            onClick={() => router.push('/entrepreneur/documents')}
          >
            {isMarathi ? "कागदपत्र संग्रह" : "Document Locker"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => router.push('/entrepreneur/applications')}
          >
            {isMarathi ? "अर्ज ट्रॅकिंग" : "All Applications"}
          </Button>
        </div>
      </div>

      {/* 1. Interactive Visual Dependency Map */}
      <DependencyMap
        approvals={approvalTemplates}
        applications={applications}
        onOpenApplication={(appId) => router.push(`/entrepreneur/applications/${appId}`)}
      />

      {/* 2. Parallel Processing Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#263B63] flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#D89B3C]" />
              {isMarathi ? "एकाच वेळी समांतर प्रक्रिया करता येणाऱ्या मंजुऱ्या" : "Approvals that can be processed in parallel"}
            </h3>
            <p className="text-xs text-slate-500">
              {isMarathi ? "हे अर्ज एकाच वेळी सादर करून ४५ दिवसांपर्यंत वेळेची बचत करा." : "Submit these statutory clearances concurrently to save up to 45 calendar days."}
            </p>
          </div>
          <span className="rounded bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#263B63] border border-blue-200">
            {parallelApprovals.length} Parallel Clearances
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parallelApprovals.map(({ template, application }, idx) => (
            <ApprovalCard
              key={template.id || idx}
              approval={template}
              application={application}
              onViewDetails={(appId) => router.push(`/entrepreneur/applications/${appId}`)}
              onApply={() => router.push(`/entrepreneur/applications`)}
            />
          ))}
        </div>
      </div>

      {/* 3. Complete Statutory Clearance Sequence */}
      <div className="space-y-3 pt-2">
        <div>
          <h3 className="text-base font-bold text-[#263B63] flex items-center gap-2">
            <GitMerge className="h-4 w-4 text-[#3D8C82]" />
            {isMarathi ? "संपूर्ण कायदेशीर मंजुरी कार्यप्रवाह" : "Complete Statutory Clearance Workflow"}
          </h3>
          <p className="text-xs text-slate-500">
            End-to-end statutory lifecycle from in-principle registration to operational factory licensing.
          </p>
        </div>

        <div className="space-y-3.5">
          {mappedApprovals.map(({ template, application }, idx) => (
            <ApprovalCard
              key={template.id || idx}
              approval={template}
              application={application}
              onViewDetails={(appId) => router.push(`/entrepreneur/applications/${appId}`)}
              onApply={() => router.push(`/entrepreneur/applications`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
