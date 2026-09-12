'use client';

import React, { useState } from 'react';
import { 
  GitMerge, 
  ArrowDown, 
  Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { AIExplainButton } from '../ai/AIExplainButton';
import { ApprovalTemplate, Application } from '../../types';

export interface DependencyMapProps {
  approvals?: ApprovalTemplate[];
  applications?: Application[];
  onOpenApplication?: (appId: string) => void;
}

export const DependencyMap: React.FC<DependencyMapProps> = ({
  approvals = [],
  applications = [],
  onOpenApplication
}) => {
  const { isMarathi } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<(ApprovalTemplate & { status: string }) | null>(null);

  const getStatus = (approvalId: string): string => {
    const app = applications.find(a => a.approvalId === approvalId || a.approval.includes(approvalId));
    return app?.status || "Pending";
  };

  const getNodeColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("approved")) return "border-emerald-500 bg-emerald-50/70 text-emerald-950";
    if (s.includes("under review")) return "border-blue-500 bg-blue-50/70 text-blue-950";
    if (s.includes("query") || s.includes("action")) return "border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-300";
    if (s.includes("inspection")) return "border-purple-500 bg-purple-50 text-purple-950";
    return "border-slate-300 bg-slate-50 text-slate-700";
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GitMerge className="h-5 w-5 text-[#D89B3C]" />
            <h3 className="text-base font-bold text-[#263B63]">
              {isMarathi ? "मंजुरी अवलंबित्व नकाशा (Approval Dependency Map)" : "Approval Dependency Map"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isMarathi 
              ? "कोणत्या परवानग्या आधी आवश्यक आहेत आणि कोणत्या समांतर सुरू करता येतात याचा परस्पर नकाशा."
              : "Visual graph indicating statutory sequence, prerequisites, and parallel processing tracks."}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 bg-[#FBF9F5] px-3 py-1.5 rounded-md border border-[#E6E0D4]">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-600" /> Approved</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-600" /> In Progress</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" /> Action Required</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-400" /> Pending</span>
        </div>
      </div>

      {/* Visual Dependency Tree */}
      <div className="space-y-6 py-4">
        
        {/* Tier 0: Root Project Node */}
        <div className="flex flex-col items-center">
          <div className="rounded-lg border-2 border-[#263B63] bg-[#263B63] text-white px-5 py-2.5 text-center shadow-md">
            <span className="text-[10px] uppercase font-bold text-[#D89B3C] block">Master Root Node</span>
            <span className="text-xs font-black">ABC Food Processing Pvt. Ltd. (Nagpur)</span>
          </div>
          <ArrowDown className="h-5 w-5 text-slate-400 mt-2" />
        </div>

        {/* Tier 1: Foundation (Project Registration) */}
        <div className="flex flex-col items-center">
          {approvals.slice(0, 1).map((appr) => {
            const status = getStatus(appr.id);
            return (
              <div
                key={appr.id}
                onClick={() => setSelectedNode({ ...appr, status })}
                className={`w-full max-w-md rounded-lg border-2 p-3.5 text-center cursor-pointer transition-all hover:scale-102 hover:shadow-md ${getNodeColor(status)}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold">{isMarathi ? appr.nameMr : appr.name}</span>
                  <StatusBadge status={status} size="sm" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>{appr.department}</span>
                  <span>SLA: {appr.slaDays} Days</span>
                </div>
              </div>
            );
          })}
          <ArrowDown className="h-5 w-5 text-slate-400 mt-2" />
        </div>

        {/* Tier 2: Parallel Clearances Stream */}
        <div className="space-y-2">
          <div className="text-center">
            <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#263B63] border border-blue-200">
              <Layers className="h-3.5 w-3.5 text-blue-600" />
              {isMarathi ? "समांतर प्रक्रिया ट्रॅक (Parallel Processing Track)" : "Parallel Clearances Track (Can be applied together)"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            {approvals.slice(1, 4).map((appr) => {
              const status = getStatus(appr.id);
              return (
                <div
                  key={appr.id}
                  onClick={() => setSelectedNode({ ...appr, status })}
                  className={`rounded-lg border-2 p-3.5 cursor-pointer transition-all hover:scale-102 hover:shadow-md flex flex-col justify-between ${getNodeColor(status)}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-xs font-bold leading-tight">{isMarathi ? appr.nameMr : appr.name}</span>
                      <StatusBadge status={status} size="sm" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">{appr.department}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span>SLA: <strong>{appr.slaDays} Days</strong></span>
                    <span className="font-semibold text-blue-700">View Node Details →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tier 3: Downstream Clearances */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-center">
            <ArrowDown className="h-5 w-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {approvals.slice(4, 6).map((appr) => {
              const status = getStatus(appr.id);
              return (
                <div
                  key={appr.id}
                  onClick={() => setSelectedNode({ ...appr, status })}
                  className={`rounded-lg border-2 p-3.5 cursor-pointer transition-all hover:scale-102 hover:shadow-md flex flex-col justify-between ${getNodeColor(status)}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-xs font-bold leading-tight">{isMarathi ? appr.nameMr : appr.name}</span>
                      <StatusBadge status={status} size="sm" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">{appr.department}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Prerequisites: <strong>MPCB CTE / Land</strong></span>
                    <span className="font-semibold text-blue-700">Inspect Node →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Node Detail Modal */}
      <Modal
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        title={selectedNode ? (isMarathi ? selectedNode.nameMr : selectedNode.name) : "Approval Node"}
        subtitle={selectedNode ? `${selectedNode.department} • Statutory SLA: ${selectedNode.slaDays} Days` : ""}
        size="md"
        footer={
          <div className="flex items-center justify-between w-full">
            <AIExplainButton
              title={selectedNode?.name}
              plainTextEn={selectedNode?.plainLanguageEn}
              plainTextMr={selectedNode?.plainLanguageMr}
              whyNeededEn={selectedNode?.whyNeededEn}
              whyNeededMr={selectedNode?.whyNeededMr}
              whatNextEn={selectedNode?.whatHappensNextEn}
              whatNextMr={selectedNode?.whatHappensNextMr}
              variant="button"
            />

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const targetApp = applications.find(a => a.approvalId === selectedNode?.id || a.approval.includes(selectedNode?.name.substring(0, 10) || ''));
                setSelectedNode(null);
                if (targetApp) {
                  onOpenApplication?.(targetApp.id);
                } else {
                  onOpenApplication?.('APP-2026-00124');
                }
              }}
            >
              {isMarathi ? "संपूर्ण अर्ज उघडा" : "Open Application Dossier"}
            </Button>
          </div>
        }
      >
        {selectedNode && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-200">
              <span className="text-slate-500">Current Node Status:</span>
              <StatusBadge status={selectedNode.status} size="md" />
            </div>

            <div className="space-y-1 bg-[#FBF9F5] p-3 rounded-md border border-[#E6E0D4]">
              <span className="font-bold text-[#263B63] block text-[11px] uppercase">
                {isMarathi ? "कायदेशीर वर्णन" : "Statutory Overview"}
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">{selectedNode.description}</p>
            </div>

            <div>
              <span className="font-bold text-slate-700 block text-[11px] mb-1.5">
                {isMarathi ? "आवश्यक कायदेशीर कागदपत्रे" : "Required Statutory Attachments"}
              </span>
              <ul className="space-y-1 bg-white p-2.5 rounded-md border border-slate-200 text-slate-600">
                {selectedNode.requiredDocs?.map((d, i) => (
                  <li key={i} className="flex items-center gap-2 truncate">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D89B3C] shrink-0" />
                    <span className="truncate">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
