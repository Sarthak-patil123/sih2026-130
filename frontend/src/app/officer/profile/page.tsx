'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Mail, 
  Phone, 
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';

export default function OfficerProfilePage() {
  const { currentUser } = usePortal();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
            Government of Maharashtra Cadre
          </span>
        </div>
        <h2 className="text-xl font-bold text-[#0F2942] mt-1">Nodal Officer Official Profile</h2>
        <p className="text-xs text-slate-500">
          Designated statutory clearance authority under the Maharashtra Industry Facilitation Act.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F2942] text-white text-xl font-bold">
            AK
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">{currentUser?.name || "Smt. Anjali Kulkarni, IAS"}</h3>
            <p className="text-xs font-semibold text-blue-700">{currentUser?.designation || "Joint Director of Industries & Nodal Approvals Officer"}</p>
            <p className="text-xs text-slate-500">{currentUser?.department || "Directorate of Industries, Govt. of Maharashtra"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-md bg-slate-50 p-4 border border-slate-200 space-y-2">
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Government Identity & Jurisdiction</span>
            <p className="font-bold text-slate-800 text-sm">Badge #{currentUser?.badgeNumber || "MH-IND-NODAL-024"}</p>
            <p className="text-slate-600">Assigned Zone: <strong>Nagpur & Vidarbha Industrial Corridor</strong></p>
            <p className="text-slate-600">Appeals Level: <strong>First Appellate Authority</strong></p>
          </div>

          <div className="rounded-md bg-slate-50 p-4 border border-slate-200 space-y-2">
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Contact & Nodal Desk</span>
            <p className="text-slate-700 flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              {currentUser?.email || "anjali.kulkarni@maharashtra.gov.in"}
            </p>
            <p className="text-slate-700 flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400" />
              +91 712 2561980 / Ext 402
            </p>
            <p className="text-slate-700 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-400" />
              Udyog Bhavan, Civil Lines, Nagpur - 440001
            </p>
          </div>
        </div>

        <div className="rounded-md border border-emerald-200 bg-emerald-50/50 p-4 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-emerald-950">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Statutory Delegation & Clearance Powers</span>
          </div>
          <p className="text-emerald-800 leading-relaxed">
            Empowered to grant In-Principle Approvals, MIDC building plan consents, verify MPCB/DISH compliance, conduct cross-departmental joint hearings, and sanction state industrial policy subsidies up to ₹50 Crore.
          </p>
        </div>
      </div>
    </div>
  );
}
