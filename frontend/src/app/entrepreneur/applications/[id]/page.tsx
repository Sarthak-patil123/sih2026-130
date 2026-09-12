'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  UploadCloud, 
  Download, 
  FileCheck, 
  MessageSquare, 
  X,
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Timeline } from '@/components/common/Timeline';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { FileUpload } from '@/components/common/FileUpload';
import { DocumentItem } from '@/types';

export default function ApplicationDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { applications, uploadApplicationDoc, inspections } = usePortal();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedDocForUpload, setSelectedDocForUpload] = useState<Partial<DocumentItem> | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Find application by ID
  const application = applications.find(a => a.id === id) || applications[0];

  // Matched inspection if any
  const matchedInspection = inspections.find(i => i.applicationId === application?.id || i.id === application?.inspectionId);

  if (!application) {
    return (
      <div className="p-12 text-center">
        <h3 className="text-lg font-bold text-slate-800">Application not found</h3>
        <Button variant="primary" size="sm" onClick={() => router.push('/entrepreneur/applications')} className="mt-4">
          Back to Applications
        </Button>
      </div>
    );
  }

  const openQueries = application.queries?.filter(q => q.status === "Open") || [];

  const handleOpenUploadModal = (doc: Partial<DocumentItem>) => {
    setSelectedDocForUpload(doc);
    setUploadModalOpen(true);
  };

  const handleFileUploaded = (fileData: { name: string; size: string }) => {
    if (selectedDocForUpload?.name) {
      uploadApplicationDoc(application.id, selectedDocForUpload.name, fileData);
      setUploadModalOpen(false);
      setSuccessToast(`Document "${selectedDocForUpload.name}" uploaded successfully. Application status updated to Under Review.`);
      setTimeout(() => setSuccessToast(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/entrepreneur/applications')}
            className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Back to applications list"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {application.id}
              </span>
              <StatusBadge status={application.status} size="md" />
              {application.priority && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Priority: {application.priority}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-[#0F2942] mt-1">{application.approval}</h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              {application.department} • Project: <strong className="text-slate-700">{application.companyName}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {application.status === "Approved" && (
            <Button
              variant="success"
              size="sm"
              icon={Download}
              onClick={() => alert(`Downloading Statutory Certificate #${application.certificateNo || 'MH-NOC-2026'}`)}
            >
              Download Certificate
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => alert(`Downloading Application Dossier Summary #${application.id}`)}
          >
            Download Dossier
          </Button>
        </div>
      </div>

      {/* Success Notification Toast */}
      {successToast && (
        <div className="flex items-center justify-between rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-xs text-emerald-900 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Officer Query Alert Box (If query is raised) */}
      {openQueries.length > 0 && (
        <div className="rounded-lg border-2 border-amber-400 bg-amber-50 p-5 space-y-3 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-amber-100 text-amber-800 mt-0.5">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                  Officer Communication — Query Raised
                </span>
                <h3 className="text-sm font-bold text-amber-950 mt-1">
                  Action Required by Applicant
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed max-w-2xl font-medium">
                  &ldquo;{openQueries[0].queryText}&rdquo;
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-amber-800 pt-1">
                  <span>Raised by: <strong>{openQueries[0].raisedBy}</strong></span>
                  <span>Date: <strong>{openQueries[0].raisedDate}</strong></span>
                  <span>Compliance Deadline: <strong className="text-rose-800">{openQueries[0].deadline}</strong></span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={UploadCloud}
              onClick={() => handleOpenUploadModal({ name: "Revised Statutory Compliance Document" })}
            >
              Upload Revised Document
            </Button>
          </div>
        </div>
      )}

      {/* Horizontal Lifecycle Timeline */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Statutory Clearance Timeline
        </h3>
        <Timeline steps={application.timeline || []} orientation="horizontal" />
      </div>

      {/* Split Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 cols): Document Checklist & Officer Queries */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Document Checklist Card */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#0F2942]">Statutory Document Checklist</h3>
                <p className="text-xs text-slate-500">Mandatory attachments submitted for department scrutiny</p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                {application.documents?.filter(d => d.uploaded).length || 0} / {application.documents?.length || 0} Uploaded
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {application.documents?.map((doc, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded ${doc.uploaded ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{doc.name}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                        {doc.uploaded ? (
                          <>
                            <span>Uploaded: {doc.uploadDate || '18 Aug 2026'}</span>
                            <span>Size: {doc.fileSize || '2.4 MB'}</span>
                          </>
                        ) : (
                          <span className="text-rose-600 font-medium">Document Missing / Action Pending</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={doc.status || (doc.uploaded ? "Verified" : "Pending")} size="sm" />
                    <Button
                      variant={doc.uploaded ? "secondary" : "primary"}
                      size="sm"
                      icon={UploadCloud}
                      onClick={() => handleOpenUploadModal(doc)}
                    >
                      {doc.uploaded ? "Replace" : "Upload"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Communication / Query Log */}
          {application.queries && application.queries.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-bold text-[#0F2942]">Department Communication & Query Log</h3>
              </div>

              <div className="space-y-3">
                {application.queries.map((q) => (
                  <div key={q.id} className="rounded-md border border-slate-200 bg-slate-50 p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{q.raisedBy}</span>
                      <StatusBadge status={q.status === "Resolved" ? "Completed" : "Query Raised"} size="sm" />
                    </div>
                    <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200 leading-relaxed">
                      &ldquo;{q.queryText}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Raised on: {q.raisedDate}</span>
                      <span>Target SLA: {q.deadline}</span>
                    </div>

                    {q.response && (
                      <div className="mt-2 rounded bg-emerald-50/70 p-2.5 border border-emerald-200 text-emerald-900">
                        <span className="font-bold block text-[11px] text-emerald-950">Applicant Response ({q.responseDate}):</span>
                        <p className="mt-0.5">{q.response}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right (1 col): Application Metadata & Assigned Officer */}
        <div className="space-y-4">
          
          {/* Metadata Card */}
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-3.5 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              Application Metadata
            </h3>

            <div className="space-y-2.5">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Reviewing Officer</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{application.assignedOfficer || "Joint Director of Industries"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Statutory Department</span>
                <span className="font-semibold text-slate-700 mt-0.5 block">{application.department}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Filing Date</span>
                  <span className="font-semibold text-slate-700">{application.submittedOn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">SLA Target Date</span>
                  <span className="font-semibold text-slate-700">{application.deadline}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Govt. Fees Paid</span>
                  <span className="font-bold text-emerald-700">{application.feesPaid || "₹25,000"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Ref</span>
                  <span className="font-mono text-slate-600">{application.paymentRef || "MAH-EPAY-8821"}</span>
                </div>
              </div>
              {application.certificateNo && (
                <div className="pt-2 border-t border-slate-100 bg-emerald-50 p-2 rounded">
                  <span className="text-emerald-800 block text-[10px] uppercase font-bold">Statutory Certificate No.</span>
                  <span className="font-mono font-bold text-emerald-950 text-xs">{application.certificateNo}</span>
                </div>
              )}
            </div>
          </div>

          {/* Linked Inspection Card (If any) */}
          {matchedInspection && (
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                  Site Inspection Details
                </h3>
                <StatusBadge status={matchedInspection.status} size="sm" />
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-900">{matchedInspection.inspectionType}</p>
                <p className="text-slate-600">Date: <strong>{matchedInspection.date} at {matchedInspection.time}</strong></p>
                <p className="text-slate-500">Officer: {matchedInspection.officer}</p>
                <p className="text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 text-[11px] leading-relaxed">
                  {matchedInspection.purpose}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Upload Document Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Statutory Document"
        subtitle={`Application: ${application.id} • ${selectedDocForUpload?.name || 'Document'}`}
      >
        <FileUpload
          title={`Upload ${selectedDocForUpload?.name || 'Document'}`}
          helperText="Upload official PDF or scanned copy (Max size: 15 MB)"
          onFileUpload={handleFileUploaded}
        />
      </Modal>
    </div>
  );
}
