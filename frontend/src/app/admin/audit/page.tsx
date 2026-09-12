'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminAuditPage() {
  const { auditLogs } = usePortal();
  const { isMarathi } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = auditLogs.filter(log => {
    return log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
           log.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
           log.sha256Hash.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white bg-[#172A46] px-2.5 py-0.5 rounded border border-slate-700">
              Immutable Governance Trail
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#172A46] mt-1">
            {isMarathi ? "डिजिटल ऑडिट नोंद व ब्लॉकचेन आर्किटेक्चर" : "Cryptographic Audit Trail & Blockchain Architecture"}
          </h2>
          <p className="text-xs text-slate-500">
            {isMarathi 
              ? "प्रत्येक अर्जाची हालचाल, कागदपत्र अपलोड आणि अधिकाऱ्यांच्या निर्णयांची SHA-256 हॅश सह अपरिवर्तनीय डिजिटल नोंद."
              : "Tamper-evident audit timeline recording every dossier submission, officer scrutiny, and inspection event."}
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 shadow-2xs">
          🔒 SHA-256 Ledger Active
        </span>
      </div>

      {/* Conceptual Blockchain Architecture Model */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#172A46]">Future Hyperledger Blockchain Conceptual Flow</h3>
            <p className="text-xs text-slate-500">How the single window audit layer bridges to sovereign enterprise blockchain networks</p>
          </div>
          <span className="text-[10px] font-bold uppercase bg-blue-50 text-[#263B63] px-2.5 py-1 rounded border border-blue-200">
            Architecture Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4] space-y-1">
            <span className="font-bold text-[#172A46] block text-xs">1. Application Event</span>
            <p className="text-[11px] text-slate-500 leading-snug">
              Applicant files document or officer grants statutory approval.
            </p>
          </div>

          <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4] space-y-1">
            <span className="font-bold text-[#D89B3C] block text-xs">2. SHA-256 Digest</span>
            <p className="text-[11px] text-slate-500 leading-snug">
              Payload & timestamp cryptographically hashed into 256-bit block.
            </p>
          </div>

          <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4] space-y-1">
            <span className="font-bold text-[#3D8C82] block text-xs">3. Immutable Ledger Record</span>
            <p className="text-[11px] text-slate-500 leading-snug">
              Chained with preceding block hash for cryptographic audit integrity.
            </p>
          </div>

          <div className="rounded-lg bg-[#FBF9F5] p-3.5 border border-[#E6E0D4] space-y-1">
            <span className="font-bold text-[#263B63] block text-xs">4. Hyperledger Fabric Node</span>
            <p className="text-[11px] text-slate-500 leading-snug">
              Multi-department consensus between Industry, MPCB & Finance.
            </p>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit records by event, application ID, or SHA-256 hash..."
              className="w-full rounded-md border border-slate-300 py-1.5 pl-9 pr-3 text-xs focus:border-[#172A46] focus:outline-hidden"
            />
          </div>

          <span className="text-xs text-slate-500 font-semibold">
            {filtered.length} Cryptographic Events Logged
          </span>
        </div>

        <div className="space-y-3">
          {filtered.map((log) => (
            <div
              key={log.id}
              className="rounded-lg border border-slate-200 bg-[#FBF9F5] p-4 space-y-2.5 text-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E0D4] pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#172A46] bg-white px-2 py-0.5 rounded border border-slate-200">
                    {log.id}
                  </span>
                  <span className="font-bold text-slate-900">{log.event}</span>
                  <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                    {log.applicationId}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">{log.timestamp}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <span className="text-slate-400">Actor:</span> <strong>{log.actor}</strong> ({log.actorRole})
                </div>
                <div>
                  <span className="text-slate-400">Department:</span> <strong>{log.department}</strong>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-[10px] space-y-1 text-slate-600 break-all">
                <div>
                  <span className="text-slate-400 font-sans font-bold">SHA-256 Block Hash: </span>
                  <span className="text-emerald-700 font-bold">{log.sha256Hash}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-sans font-bold">Previous Block: </span>
                  <span className="text-slate-500">{log.prevBlockHash}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
