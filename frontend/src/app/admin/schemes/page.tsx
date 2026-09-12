'use client';

import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { usePortal } from '@/context/PortalContext';
import { Button } from '@/components/common/Button';
import { StatusBadge } from '@/components/common/StatusBadge';

export default function AdminSchemesPage() {
  const { schemes } = usePortal();
  const { isMarathi } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white bg-[#172A46] px-2.5 py-0.5 rounded border border-slate-700">
              Incentive Policy Catalog
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#172A46] mt-1">
            {isMarathi ? "शासकीय योजना व सबसिडी सूची व्यवस्थापक" : "Government Incentive Schemes Catalog"}
          </h2>
          <p className="text-xs text-slate-500">
            Manage state industrial promotion policies, capital subsidy eligibility criteria, and disbursement guidelines.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => alert("Add New Scheme Policy modal simulated.")}
        >
          {isMarathi ? "नवीन योजना जोडा" : "Add Incentive Scheme"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {schemes.map((s) => (
          <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[#172A46] bg-slate-100 px-2 py-0.5 rounded">
                  {s.id}
                </span>
                <StatusBadge status={s.status} size="sm" />
              </div>

              <h4 className="text-base font-bold text-[#172A46]">{s.name}</h4>
              <p className="text-xs text-slate-500">{s.department} • {s.category}</p>

              <div className="rounded-md bg-[#FBF9F5] p-3 border border-[#E6E0D4] text-xs space-y-1">
                <span className="font-bold text-emerald-900 block text-[11px]">Benefits:</span>
                <p className="text-slate-700 leading-relaxed">{s.benefits}</p>
              </div>

              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Eligibility: </span>
                <span>{s.eligibilityCriteria}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Deadline: <strong>{s.applicationDeadline || "Open"}</strong></span>
              <Button
                variant="secondary"
                size="sm"
                icon={Edit}
                onClick={() => alert(`Edit ${s.name} rules`)}
              >
                Edit Policy
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
