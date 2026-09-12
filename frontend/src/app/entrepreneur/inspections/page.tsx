'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, 
  MapPin, 
  User, 
  CheckCircle2, 
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { InspectionItem } from '@/types';

export default function InspectionsPage() {
  const { inspections, scheduleOrUpdateInspection, completeInspection } = usePortal();

  const [selectedInspection, setSelectedInspection] = useState<InspectionItem | null>(inspections[0] || null);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({ date: "", time: "", remarks: "" });

  const handleStatusChange = (inspectionId: string, newStatus: string) => {
    if (newStatus === "Completed") {
      completeInspection(inspectionId, "Site audit successfully concluded. Compliance parameters verified by inspection team.");
    } else {
      scheduleOrUpdateInspection({ id: inspectionId, status: newStatus });
    }
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInspection && rescheduleData.date) {
      scheduleOrUpdateInspection({
        id: selectedInspection.id,
        date: rescheduleData.date,
        time: rescheduleData.time || "11:00 AM IST",
        status: "Rescheduled",
        remarks: rescheduleData.remarks || "Rescheduled on applicant's request."
      });
      setRescheduleModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-[#0F2942]">Field Audits & Site Inspections</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent scheduling of joint site verifications by regulatory safety, pollution, and town planning officers.
          </p>
        </div>
      </div>

      {/* Inspections Master Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Site Inspections Register
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4">Application</th>
                <th className="py-3 px-4">Approval</th>
                <th className="py-3 px-4">Inspection Type</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inspections.map((insp) => (
                <tr
                  key={insp.id}
                  onClick={() => setSelectedInspection(insp)}
                  className={`cursor-pointer transition-colors ${
                    selectedInspection?.id === insp.id ? "bg-blue-50/60 font-medium" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{insp.applicationId}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{insp.approval}</td>
                  <td className="py-3.5 px-4 text-slate-600">{insp.inspectionType}</td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="font-semibold block">{insp.date}</span>
                    <span className="text-[11px] text-slate-400">{insp.time}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{insp.officer}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={insp.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant={selectedInspection?.id === insp.id ? "primary" : "secondary"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInspection(insp);
                      }}
                    >
                      View Dossier
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspection Detailed View Card */}
      {selectedInspection && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {selectedInspection.id}
                </span>
                <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedInspection.applicationId}
                </span>
                <StatusBadge status={selectedInspection.status} size="md" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2942] mt-1.5">{selectedInspection.inspectionType}</h3>
              <p className="text-xs text-slate-500">{selectedInspection.approval} • {selectedInspection.department}</p>
            </div>

            {/* Quick Demo Status Changer */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Demo State:</span>
              <button
                onClick={() => handleStatusChange(selectedInspection.id, "Scheduled")}
                className={`px-2.5 py-1 text-xs rounded font-semibold border cursor-pointer ${
                  selectedInspection.status === "Scheduled" ? "bg-purple-600 text-white border-purple-600" : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                Scheduled
              </button>
              <button
                onClick={() => {
                  setRescheduleData({ date: "26 Sept 2026", time: "10:30 AM IST", remarks: "Applicant requested morning slot." });
                  setRescheduleModalOpen(true);
                }}
                className={`px-2.5 py-1 text-xs rounded font-semibold border cursor-pointer ${
                  selectedInspection.status === "Rescheduled" ? "bg-amber-600 text-white border-amber-600" : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                Reschedule
              </button>
              <button
                onClick={() => handleStatusChange(selectedInspection.id, "Completed")}
                className={`px-2.5 py-1 text-xs rounded font-semibold border cursor-pointer ${
                  selectedInspection.status === "Completed" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-300"
                }`}
              >
                Mark Completed
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3 bg-slate-50 p-4 rounded-md border border-slate-200">
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Inspection Schedule</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  {selectedInspection.date} at {selectedInspection.time}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Location & Address</span>
                <span className="font-semibold text-slate-800 mt-0.5 flex items-start gap-1.5">
                  <MapPin className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  {selectedInspection.location}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Assigned Field Officer</span>
                <span className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                  <User className="h-4 w-4 text-slate-500" />
                  {selectedInspection.officer} ({selectedInspection.officerContact})
                </span>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-md border border-slate-200">
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Audit Purpose & Scope</span>
                <p className="text-slate-700 mt-1 leading-relaxed">{selectedInspection.purpose}</p>
              </div>

              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase mb-1">
                  Required Documents on Site ({selectedInspection.requiredDocuments?.length || 0})
                </span>
                <ul className="space-y-1 text-slate-700">
                  {selectedInspection.requiredDocuments?.map((d: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {selectedInspection.reportSummary && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50/60 p-4 text-xs space-y-1">
              <span className="font-bold text-emerald-950 block">Inspection Officer Report ({selectedInspection.completedDate}):</span>
              <p className="text-emerald-800 leading-relaxed font-medium">{selectedInspection.reportSummary}</p>
            </div>
          )}
        </div>
      )}

      {/* Reschedule Modal */}
      <Modal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        title="Reschedule Site Inspection"
        subtitle={`Inspection: ${selectedInspection?.id} • ${selectedInspection?.approval}`}
      >
        <form onSubmit={handleRescheduleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Proposed New Date"
              type="text"
              value={rescheduleData.date}
              onChange={(e) => setRescheduleData(prev => ({ ...prev, date: e.target.value }))}
              placeholder="e.g. 26 Sept 2026"
              required
            />
            <Input
              label="Preferred Time Slot"
              type="text"
              value={rescheduleData.time}
              onChange={(e) => setRescheduleData(prev => ({ ...prev, time: e.target.value }))}
              placeholder="e.g. 11:00 AM IST"
            />
          </div>

          <Input
            label="Reason for Rescheduling"
            value={rescheduleData.remarks}
            onChange={(e) => setRescheduleData(prev => ({ ...prev, remarks: e.target.value }))}
            placeholder="e.g. Factory civil works completion scheduled for this weekend"
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setRescheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Confirm Reschedule
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
