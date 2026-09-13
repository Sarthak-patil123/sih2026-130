'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, 
  CheckCircle2, 
  MapPin, 
  User, 
  Edit
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { InspectionItem } from '@/types';

export default function OfficerInspectionsPage() {
  const { inspections, scheduleOrUpdateInspection, completeInspection } = usePortal();

  const [activeFilter, setActiveFilter] = useState("All");
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [selectedInsp, setSelectedInsp] = useState<InspectionItem | null>(null);
  const [completionRemarks, setCompletionRemarks] = useState("Physical verification completed on site. Setback lines and water sump meet regulatory safety criteria.");
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("2026-09-28");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);

  const filtered = inspections.filter(i => {
    if (activeFilter === "Upcoming") return i.status === "Scheduled" || i.status === "Rescheduled";
    if (activeFilter === "Completed") return i.status === "Completed";
    return true;
  });

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInsp) {
      setIsSubmittingReport(true);
      setTimeout(() => {
        completeInspection(selectedInsp.id, completionRemarks);
        setIsSubmittingReport(false);
        setCompleteModalOpen(false);
      }, 1300);
    }
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInsp) {
      setIsRescheduling(true);
      setTimeout(() => {
        scheduleOrUpdateInspection({
          id: selectedInsp.id,
          date: rescheduleDate,
          status: "Rescheduled",
          remarks: "Date adjusted by nodal field inspection cell."
        });
        setIsRescheduling(false);
        setRescheduleModalOpen(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
              Joint Field Regulatory Audits
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#0F2942] mt-1">Inspection Management Console</h2>
          <p className="text-xs text-slate-500">
            Coordinate physical site visits, review on-site checklists, and upload statutory audit findings.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs">
        {["All", "Upcoming", "Completed"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`rounded-md px-3 py-1.5 font-semibold transition-all cursor-pointer ${
              activeFilter === tab
                ? "bg-[#0F2942] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab} Inspections ({
              tab === "All" ? inspections.length :
              tab === "Upcoming" ? inspections.filter(i => i.status !== "Completed").length :
              inspections.filter(i => i.status === "Completed").length
            })
          </button>
        ))}
      </div>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(insp => (
          <div key={insp.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {insp.id}
                    </span>
                    <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {insp.applicationId}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0F2942] mt-1.5">{insp.inspectionType}</h3>
                  <p className="text-xs text-slate-500">{insp.approval} • {insp.department}</p>
                </div>
                <StatusBadge status={insp.status} size="md" />
              </div>

              <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
                  <span>Scheduled: <strong>{insp.date} at {insp.time}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-slate-500" />
                  <span>Assigned Officer: <strong>{insp.officer}</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-slate-600">{insp.location}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 text-[11px] uppercase">Inspection Scope:</span>
                <p className="text-slate-600 bg-slate-50 p-2 rounded text-[11px] leading-relaxed">{insp.purpose}</p>
              </div>

              {insp.reportSummary && (
                <div className="rounded bg-emerald-50 p-2.5 border border-emerald-200 text-xs text-emerald-900">
                  <span className="font-bold block text-[11px] text-emerald-950">Completed Audit Findings ({insp.completedDate}):</span>
                  <p className="mt-0.5 leading-relaxed">{insp.reportSummary}</p>
                </div>
              )}
            </div>

            {/* Officer Action Bar */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 font-medium">Single Window Audits</span>

              <div className="flex items-center gap-2">
                {insp.status !== "Completed" && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Edit}
                      onClick={() => {
                        setSelectedInsp(insp);
                        setRescheduleModalOpen(true);
                      }}
                    >
                      Change Date
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => {
                        setSelectedInsp(insp);
                        setCompleteModalOpen(true);
                      }}
                    >
                      Complete & File Report
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Complete Inspection Modal */}
      <Modal
        isOpen={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        title="Submit Inspection Report & Mark Completed"
        subtitle={`Inspection: ${selectedInsp?.id} • ${selectedInsp?.approval}`}
      >
        <form onSubmit={handleCompleteSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700">Official Field Audit Remarks</label>
            <textarea
              rows={4}
              value={completionRemarks}
              onChange={(e) => setCompletionRemarks(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2.5 text-xs focus:border-[#0F2942] focus:outline-hidden"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setCompleteModalOpen(false)} disabled={isSubmittingReport}>
              Cancel
            </Button>
            <Button type="submit" variant="success" size="sm" loading={isSubmittingReport}>
              {isSubmittingReport ? "Submitting Audit Report..." : "Submit Report & Complete"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Reschedule Date Modal */}
      <Modal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        title="Reschedule Inspection Date"
        subtitle={`Inspection: ${selectedInsp?.id}`}
      >
        <form onSubmit={handleRescheduleSubmit} className="space-y-4 text-xs">
          <Input
            label="New Inspection Date"
            type="date"
            value={rescheduleDate}
            onChange={(e) => setRescheduleDate(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setRescheduleModalOpen(false)} disabled={isRescheduling}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={isRescheduling}>
              {isRescheduling ? "Updating Date..." : "Update Date"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
