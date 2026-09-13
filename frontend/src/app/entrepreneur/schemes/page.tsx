'use client';

import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Search, 
  Filter, 
  CheckCircle2, 
  ShieldCheck, 
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { SchemeCard } from '@/components/cards/SchemeCard';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { SchemeItem } from '@/types';

export default function GovernmentSchemesPage() {
  const { schemes, currentProject, applyForScheme } = usePortal();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [detailsModalScheme, setDetailsModalScheme] = useState<SchemeItem | null>(null);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);

  const sectors = ["All", "Food Processing", "Manufacturing", "All Industrial Sectors", "MSME Engineering & Agro", "Green & Renewable Energy"];

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.benefits.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "All" || s.industry.includes(selectedSector);
    return matchesSearch && matchesSector;
  });

  const handleApply = (scheme: SchemeItem) => {
    setIsSubmittingClaim(true);
    setTimeout(() => {
      applyForScheme(scheme.id);
      setIsSubmittingClaim(false);
      setDetailsModalScheme(null);
    }, 1300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Government of Maharashtra Policy 2024–2029
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0F2942] mt-1">Government Schemes & Subsidies</h2>
          <p className="text-xs text-slate-500">
            Automated eligibility matching based on your unit location (<strong>{currentProject?.district}</strong>) and capital bracket (<strong>{currentProject?.investment}</strong>).
          </p>
        </div>
      </div>

      {/* Active Project Matching Notice */}
      <div className="rounded-lg border border-emerald-300 bg-emerald-50/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-600 text-white shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-emerald-950">
              Active Enterprise Profile: {currentProject?.companyName} ({currentProject?.district})
            </p>
            <p className="text-emerald-800 mt-0.5">
              Sector: <strong>{currentProject?.industry}</strong> • Investment: <strong>{currentProject?.investment}</strong> • 3 Highly Matched State Subsidies Discovered.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1 rounded bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white shadow-2xs">
            <Award className="h-4 w-4" /> Eligible for up to ₹5.00 Cr Subsidy
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search schemes, tax exemptions, or subsidies..."
            className="w-full rounded-md border border-slate-300 bg-white py-1.5 pl-9 pr-3 text-xs focus:border-[#0F2942] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="text-slate-500 font-medium">Industry:</span>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="rounded-md border border-slate-300 bg-white py-1 px-2.5 text-xs font-medium text-slate-700 focus:border-[#0F2942] focus:outline-hidden"
          >
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            onViewDetails={(s) => setDetailsModalScheme(s)}
            onApply={handleApply}
          />
        ))}
      </div>

      {/* Scheme Detailed Modal */}
      <Modal
        isOpen={!!detailsModalScheme}
        onClose={() => setDetailsModalScheme(null)}
        title={detailsModalScheme?.name || "Scheme Details"}
        subtitle={`${detailsModalScheme?.department} • ${detailsModalScheme?.category}`}
        size="lg"
        footer={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setDetailsModalScheme(null)} disabled={isSubmittingClaim}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ShieldCheck}
              loading={isSubmittingClaim}
              onClick={() => {
                if (detailsModalScheme) {
                  handleApply(detailsModalScheme);
                }
              }}
            >
              {isSubmittingClaim ? "Submitting Claim Application..." : "Submit Subsidy Claim Application"}
            </Button>
          </div>
        }
      >
        {detailsModalScheme && (
          <div className="space-y-4 text-xs">
            <div className="rounded-md bg-emerald-50 p-3.5 border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Direct Financial Benefits</span>
              <p className="font-semibold text-emerald-950 text-sm mt-1">{detailsModalScheme.benefits}</p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-800 uppercase text-[10px]">Eligibility Benchmark</span>
              <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed">
                {detailsModalScheme.eligibilityCriteria}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-800 uppercase text-[10px] block mb-1.5">
                Required Statutory Attachments & CA Certificates
              </span>
              <ul className="space-y-1.5 text-slate-700 bg-slate-50 p-3 rounded border border-slate-200">
                {detailsModalScheme.requiredDocuments?.map((doc: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Nodal Department</span>
                <span className="font-semibold text-slate-800">{detailsModalScheme.department}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Application Deadline</span>
                <span className="font-semibold text-slate-800">{detailsModalScheme.applicationDeadline || "Open Throughout FY"}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
