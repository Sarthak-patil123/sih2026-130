'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  CalendarDays, 
  FileText, 
  User, 
  MapPin, 
  MessageSquare,
  Eye,
  FileCheck
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Timeline } from '@/components/common/Timeline';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { DocumentItem } from '@/types';

export default function OfficerApplicationReviewPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { 
    applications, 
    projects, 
    inspections, 
    raiseOfficerQuery, 
    approveApplication, 
    rejectApplication, 
    scheduleOrUpdateInspection 
  } = usePortal();

  const application = applications.find(a => a.id === id) || applications[0];
  const project = projects.find(p => p.id === application?.projectId || p.companyName === application?.companyName) || projects[0];
  const matchedInspection = inspections.find(i => i.applicationId === application?.id);

  // Modals state
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [queryText, setQueryText] = useState("Please upload the revised factory layout plan showing clear 6.5m fire engine driveway and underground static tank.");
  const [queryDeadline, setQueryDeadline] = useState("2026-09-25");

  const [inspectionModalOpen, setInspectionModalOpen] = useState(false);
  const [inspectionDate, setInspectionDate] = useState("2026-09-22");
  const [inspectionTime, setInspectionTime] = useState("11:00 AM IST");
  const [inspectionPurpose, setInspectionPurpose] = useState("Physical verification of setback boundaries, fire pump room and emergency access routes.");

  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [officerRemarks] = useState("All statutory provisions and safety parameters verified. Application approved.");
  const [rejectionReason] = useState("Inadequate boundary setback width as per NBC Part 4 norms.");

  const [previewDoc, setPreviewDoc] = useState<Partial<DocumentItem> | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isSubmittingQuery, setIsSubmittingQuery] = useState(false);
  const [isSchedulingInspection, setIsSchedulingInspection] = useState(false);

  if (!application) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm font-bold text-slate-700">Application not found</p>
        <Button variant="primary" size="sm" onClick={() => router.push('/officer/applications')} className="mt-3">
          Back to Queue
        </Button>
      </div>
    );
  }

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;
    setIsSubmittingQuery(true);
    setTimeout(() => {
      raiseOfficerQuery(application.id, queryText, queryDeadline);
      setIsSubmittingQuery(false);
      setQueryModalOpen(false);
      setToastMessage(`Query raised successfully on ${application.id}. Status updated to "Query Raised".`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  const handleScheduleInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSchedulingInspection(true);
    setTimeout(() => {
      scheduleOrUpdateInspection({
        applicationId: application.id,
        approval: application.approval,
        department: application.department,
        date: inspectionDate,
        time: inspectionTime,
        purpose: inspectionPurpose,
        location: `${project?.address || 'Plot B-14, Butibori Industrial Area, Nagpur'}`
      });
      setIsSchedulingInspection(false);
      setInspectionModalOpen(false);
      setToastMessage(`Inspection scheduled for ${inspectionDate} at ${inspectionTime}.`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  const handleApproveConfirm = () => {
    setIsApproving(true);
    setTimeout(() => {
      approveApplication(application.id, officerRemarks);
      setIsApproving(false);
      setApproveDialogOpen(false);
      setToastMessage(`Application ${application.id} approved successfully. Digital NOC Certificate issued.`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1800);
  };

  const handleRejectConfirm = () => {
    setIsRejecting(true);
    setTimeout(() => {
      rejectApplication(application.id, rejectionReason);
      setIsRejecting(false);
      setRejectDialogOpen(false);
      setToastMessage(`Application ${application.id} has been marked as Rejected.`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Officer Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/officer/applications')}
            className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 shadow-2xs cursor-pointer"
            title="Back to queue"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {application.id}
              </span>
              <StatusBadge status={application.status} size="md" />
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                SLA: {application.deadline}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#0F2942] mt-1">{application.approval}</h2>
            <p className="text-xs text-slate-500">
              Applicant: <strong className="text-slate-800">{application.companyName}</strong> ({application.projectName})
            </p>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={HelpCircle}
            onClick={() => setQueryModalOpen(true)}
          >
            Raise Query / Objection
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={CalendarDays}
            onClick={() => setInspectionModalOpen(true)}
          >
            Schedule Inspection
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={XCircle}
            onClick={() => setRejectDialogOpen(true)}
            disabled={application.status === "Approved"}
          >
            Reject
          </Button>
          <Button
            variant="success"
            size="sm"
            icon={CheckCircle2}
            onClick={() => setApproveDialogOpen(true)}
            disabled={application.status === "Approved"}
          >
            Approve & Grant NOC
          </Button>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 shadow-sm animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Applicant & Project Scrutiny Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Applicant Profile */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs space-y-2">
          <span className="text-slate-400 block font-bold text-[10px] uppercase border-b border-slate-100 pb-1 flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-blue-600" />
            Applicant Information
          </span>
          <div>
            <p className="font-bold text-slate-900 text-sm">{application.companyName}</p>
            <p className="text-slate-600 mt-0.5">Authorised Rep: Rajesh Deshmukh (MD)</p>
            <p className="text-slate-500 text-[11px] font-mono mt-0.5">CIN: U15400MH2024PTC392811</p>
            <p className="text-slate-500 text-[11px] font-mono">PAN: AABCA8923F • GST: 27AABCA8923F1Z8</p>
          </div>
        </div>

        {/* Project Profile */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs space-y-2">
          <span className="text-slate-400 block font-bold text-[10px] uppercase border-b border-slate-100 pb-1 flex items-center gap-1">
            <Building2 className="h-3.5 w-3.5 text-blue-600" />
            Project Parameters
          </span>
          <div>
            <p className="font-bold text-slate-900 text-sm">{project.projectName}</p>
            <p className="text-slate-600 mt-0.5">Industry: <strong>{project.industry}</strong></p>
            <p className="text-slate-600">Capital Outlay: <strong className="text-emerald-700">{project.investment}</strong></p>
            <p className="text-slate-500 text-[11px]">{project.landArea} • {project.employees}</p>
          </div>
        </div>

        {/* Location & Zoning */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs space-y-2">
          <span className="text-slate-400 block font-bold text-[10px] uppercase border-b border-slate-100 pb-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            Site Demarcation & Zoning
          </span>
          <div>
            <p className="font-bold text-slate-900 text-sm">{project.district}, Maharashtra</p>
            <p className="text-slate-600 mt-0.5">{project.industrialArea}</p>
            <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{project.address}</p>
            <p className="text-emerald-700 font-semibold text-[11px] mt-1">Zone Status: MIDC Industrial Converted</p>
          </div>
        </div>

      </div>

      {/* Main Scrutiny Section: Documents & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 cols): Attached Scrutiny Documents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0F2942]">Statutory Scrutiny Documents ({application.documents?.length || 0})</h3>
                <p className="text-xs text-slate-500">Inspect architectural CAD blueprints and statutory clearances</p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                {application.documents?.filter(d => d.uploaded).length} Verified
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {application.documents?.map((doc, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-blue-50 text-blue-700">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{doc.name}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                        <span>Uploaded: {doc.uploadDate || '18 Aug 2026'}</span>
                        <span>Size: {doc.fileSize || '2.4 MB'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={doc.status || "Verified"} size="sm" />
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => setPreviewDoc(doc)}
                    >
                      Inspect File
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Query Log & Communication History */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-bold text-[#0F2942]">Officer Queries & Objections Log</h3>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setQueryModalOpen(true)}
              >
                Raise New Query
              </Button>
            </div>

            {application.queries && application.queries.length > 0 ? (
              <div className="space-y-3">
                {application.queries.map(q => (
                  <div key={q.id} className="rounded-md border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{q.raisedBy}</span>
                      <StatusBadge status={q.status === "Resolved" ? "Completed" : "Query Raised"} size="sm" />
                    </div>
                    <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200 leading-relaxed font-medium">
                      &ldquo;{q.queryText}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Raised: {q.raisedDate}</span>
                      <span>SLA Compliance Target: <strong className="text-rose-700">{q.deadline}</strong></span>
                    </div>
                    {q.response && (
                      <div className="rounded bg-emerald-50 p-2.5 border border-emerald-200 text-emerald-900 mt-2">
                        <span className="font-bold block text-[11px] text-emerald-950">Applicant Response ({q.responseDate}):</span>
                        <p className="mt-0.5">{q.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3 text-center">No queries raised on this dossier yet.</p>
            )}
          </div>
        </div>

        {/* Right (1 col): Timeline & Officer Remarks */}
        <div className="space-y-4">
          
          {/* Timeline */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              Statutory Stage Tracking
            </h3>
            <Timeline steps={application.timeline || []} orientation="vertical" />
          </div>

          {/* Inspection Card */}
          {matchedInspection && (
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-purple-600" />
                  Scheduled Field Inspection
                </h4>
                <StatusBadge status={matchedInspection.status} size="sm" />
              </div>
              <p className="text-slate-700 font-semibold">{matchedInspection.inspectionType}</p>
              <p className="text-slate-500">Date: <strong>{matchedInspection.date} at {matchedInspection.time}</strong></p>
              <p className="text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 text-[11px]">
                {matchedInspection.purpose}
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Modal: Raise Query */}
      <Modal
        isOpen={queryModalOpen}
        onClose={() => setQueryModalOpen(false)}
        title="Raise Technical Query / Objection"
        subtitle={`Application: ${application.id} • ${application.approval}`}
      >
        <form onSubmit={handleSendQuery} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700">
              Query & Specific Document Modification Required <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Specify exact clause, setback deficiency, or missing engineering certificate..."
              className="w-full rounded-md border border-slate-300 p-2.5 text-xs focus:border-[#0F2942] focus:outline-hidden"
              required
            />
          </div>

          <Input
            label="Compliance Deadline for Applicant"
            type="date"
            value={queryDeadline}
            onChange={(e) => setQueryDeadline(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setQueryModalOpen(false)} disabled={isSubmittingQuery}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={isSubmittingQuery}>
              {isSubmittingQuery ? "Dispatching Query..." : "Send Query to Applicant"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Schedule Inspection */}
      <Modal
        isOpen={inspectionModalOpen}
        onClose={() => setInspectionModalOpen(false)}
        title="Schedule Regulatory Site Inspection"
        subtitle={`Application: ${application.id} • ${application.companyName}`}
      >
        <form onSubmit={handleScheduleInspectionSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Inspection Date"
              type="date"
              value={inspectionDate}
              onChange={(e) => setInspectionDate(e.target.value)}
              required
            />
            <Input
              label="Time Slot"
              value={inspectionTime}
              onChange={(e) => setInspectionTime(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700">Audit Purpose & Scope</label>
            <textarea
              rows={3}
              value={inspectionPurpose}
              onChange={(e) => setInspectionPurpose(e.target.value)}
              className="w-full rounded-md border border-slate-300 p-2.5 text-xs focus:border-[#0F2942] focus:outline-hidden"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setInspectionModalOpen(false)} disabled={isSchedulingInspection}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={isSchedulingInspection}>
              {isSchedulingInspection ? "Booking Slot..." : "Confirm Schedule"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Dialog: Approve */}
      <ConfirmDialog
        isOpen={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        onConfirm={handleApproveConfirm}
        loading={isApproving}
        title="Confirm Grant of Statutory Clearance"
        message={isApproving 
          ? "Signing clearance with Officer DSC token and minting immutable audit log block..."
          : `Are you sure you wish to grant approval for ${application.approval} (Application #${application.id})? A digitally signed certificate will be issued to ${application.companyName}.`
        }
        confirmLabel={isApproving ? "Issuing NOC..." : "Grant Statutory NOC"}
        variant="success"
      />

      {/* Confirmation Dialog: Reject */}
      <ConfirmDialog
        isOpen={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onConfirm={handleRejectConfirm}
        loading={isRejecting}
        title="Confirm Rejection of Application"
        message={isRejecting 
          ? "Formalizing rejection notice with statutory citations..."
          : `Are you sure you wish to reject application #${application.id}? The applicant will be formally notified with statutory grounds for objection.`
        }
        confirmLabel={isRejecting ? "Rejecting..." : "Reject Application"}
        variant="danger"
      />

      {/* Document Inspector Modal */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.name || "Document Scrutiny"}
        subtitle={`Application #${application.id} Attachment`}
        size="lg"
      >
        <div className="space-y-4 text-xs">
          <div className="rounded bg-slate-50 p-3 border border-slate-200">
            <p className="font-bold text-slate-800">{previewDoc?.name}</p>
            <p className="text-slate-500 mt-0.5">Uploaded on {previewDoc?.uploadedDate || '18 Aug 2026'} • Size: {previewDoc?.fileSize || '2.4 MB'}</p>
          </div>
          <div className="h-60 rounded border-2 border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center text-center p-6">
            <FileCheck className="h-10 w-10 text-slate-400 mb-2" />
            <p className="font-bold text-slate-700">Digital Document Scrutiny Viewer</p>
            <p className="text-slate-400 max-w-sm mt-1">
              Statutory verification passed. File verified against single-window digital signature criteria.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
