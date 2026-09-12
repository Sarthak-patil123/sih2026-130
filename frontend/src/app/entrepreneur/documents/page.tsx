'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, 
  Eye, 
  RefreshCw, 
  CheckCircle2, 
  FileText, 
  Search, 
  Filter,
  X
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { FileUpload } from '@/components/common/FileUpload';
import { DocumentItem } from '@/types';

export default function DocumentCentrePage() {
  const { documents, uploadDocument } = usePortal();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const categories = ["All", "Corporate Legal", "Tax & Compliance", "Land & Civil", "Civil Engineering", "Fire & Safety", "Environmental", "Safety & Health"];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (doc.requiredFor?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesCat = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenUpload = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setUploadModalOpen(true);
  };

  const handleFileUploadSuccess = (fileData: { name: string; size: string }) => {
    if (selectedDoc) {
      uploadDocument(selectedDoc.id, fileData);
      setUploadModalOpen(false);
      setSuccessToast(`Document "${selectedDoc.name}" uploaded successfully.`);
      setTimeout(() => setSuccessToast(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-[#0F2942]">Enterprise Document Centre</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Central digital repository for verified KYC, legal deeds, engineering layouts, and statutory environmental NOCs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={UploadCloud}
            onClick={() => handleOpenUpload(documents.find(d => d.status === "Pending") || documents[0])}
          >
            Upload New Document
          </Button>
        </div>
      </div>

      {/* Success Notification */}
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

      {/* Summary Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="rounded-md border border-slate-200 bg-white p-3.5 shadow-2xs">
          <span className="text-slate-400 block uppercase font-bold text-[10px]">Total Master Documents</span>
          <span className="text-xl font-bold text-[#0F2942] mt-0.5 block">{documents.length}</span>
        </div>
        <div className="rounded-md border border-emerald-200 bg-emerald-50/40 p-3.5 shadow-2xs">
          <span className="text-emerald-800 block uppercase font-bold text-[10px]">Verified & Valid</span>
          <span className="text-xl font-bold text-emerald-700 mt-0.5 block">
            {documents.filter(d => d.status === "Verified").length}
          </span>
        </div>
        <div className="rounded-md border border-blue-200 bg-blue-50/40 p-3.5 shadow-2xs">
          <span className="text-blue-800 block uppercase font-bold text-[10px]">Under Scrutiny</span>
          <span className="text-xl font-bold text-blue-700 mt-0.5 block">
            {documents.filter(d => d.status === "Under Review").length}
          </span>
        </div>
        <div className="rounded-md border border-amber-200 bg-amber-50/40 p-3.5 shadow-2xs">
          <span className="text-amber-800 block uppercase font-bold text-[10px]">Pending Upload</span>
          <span className="text-xl font-bold text-amber-700 mt-0.5 block">
            {documents.filter(d => d.status === "Pending").length}
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by name or clearance requirement..."
            className="w-full rounded-md border border-slate-300 bg-white py-1.5 pl-9 pr-3 text-xs focus:border-[#0F2942] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="text-slate-500 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border border-slate-300 bg-white py-1 px-2.5 text-xs font-medium text-slate-700 focus:border-[#0F2942] focus:outline-hidden"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Required For Approvals</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Uploaded Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded ${doc.uploadedDate ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block">{doc.name}</span>
                        {doc.fileName && (
                          <span className="text-[11px] text-slate-500 font-mono">{doc.fileName} ({doc.fileSize})</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{doc.category}</td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-[220px] truncate">{doc.requiredFor}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={doc.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{doc.uploadedDate || "Not Uploaded"}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {doc.uploadedDate ? (
                        <>
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded cursor-pointer"
                            title="View / Verify Document"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={RefreshCw}
                            onClick={() => handleOpenUpload(doc)}
                          >
                            Replace
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={UploadCloud}
                          onClick={() => handleOpenUpload(doc)}
                        >
                          Upload
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload / Replace Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title={selectedDoc?.uploadedDate ? "Replace Statutory Document" : "Upload Statutory Document"}
        subtitle={selectedDoc ? `${selectedDoc.name} • ${selectedDoc.category}` : "Upload File"}
      >
        <FileUpload
          title={`Select file for ${selectedDoc?.name || 'Document'}`}
          helperText="Format: PDF, JPG, PNG, DWG (Max size: 15 MB)"
          onFileUpload={handleFileUploadSuccess}
        />
      </Modal>

      {/* Document Preview Modal */}
      <Modal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        title={previewDoc?.name || "Document Preview"}
        subtitle={`Verified Document • ${previewDoc?.category} • File: ${previewDoc?.fileName || 'document.pdf'}`}
        size="lg"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setPreviewDoc(null)}>
            Close
          </Button>
        }
      >
        {previewDoc && (
          <div className="space-y-4">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">File Name</span>
                  <span className="font-mono font-bold text-slate-800">{previewDoc.fileName || 'Doc.pdf'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Verified By</span>
                  <span className="font-semibold text-slate-800">{previewDoc.verifiedBy || "Directorate of Industries"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Upload Date</span>
                  <span className="text-slate-800">{previewDoc.uploadedDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">File Size</span>
                  <span className="text-slate-800">{previewDoc.fileSize}</span>
                </div>
              </div>
            </div>

            {/* Simulated PDF Preview Container */}
            <div className="h-64 rounded-md border-2 border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <FileText className="h-12 w-12 text-slate-400 mb-2" />
              <p className="font-bold text-sm text-slate-700">Digital Document Verified</p>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Scanned PDF / CAD blueprint is cryptographically stored and available for multi-department nodal review.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
