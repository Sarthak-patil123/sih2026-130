'use client';

import React, { useState } from 'react';
import { Plus, Edit, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { usePortal } from '@/context/PortalContext';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { Input, Select } from '@/components/common/Input';
import { ApprovalTemplate } from '@/types';

export default function AdminRulesPage() {
  const { approvalTemplates } = usePortal();
  const { isMarathi } = useLanguage();

  const [rules, setRules] = useState<ApprovalTemplate[]>(approvalTemplates);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<ApprovalTemplate | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleEdit = (rule: ApprovalTemplate) => {
    setCurrentRule(rule);
    setEditModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRule) {
      setRules(prev => prev.map(r => r.id === currentRule.id ? currentRule : r));
      setEditModalOpen(false);
      setSuccessToast(`Statutory Rule for "${currentRule.name}" updated successfully.`);
      setTimeout(() => setSuccessToast(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white bg-[#172A46] px-2.5 py-0.5 rounded border border-slate-700">
              Regulatory Rules Engine
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#172A46] mt-1">
            {isMarathi ? "मंजुरी नियम व कायदेशीर SLA व्यवस्थापन" : "Statutory Approval Rules & SLA Configuration"}
          </h2>
          <p className="text-xs text-slate-500">
            Configure statutory processing time limits, mandatory document checklists, and parallel clearance rules.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => alert("Create New Statutory Clearance Template modal simulated.")}
        >
          {isMarathi ? "नवीन मंजुरी नियम जोडा" : "Add Statutory Rule"}
        </Button>
      </div>

      {successToast && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 shadow-2xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Rules Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Clearance Name</th>
                <th className="py-3.5 px-4">Statutory Department</th>
                <th className="py-3.5 px-4 text-center">SLA Days</th>
                <th className="py-3.5 px-4 text-center">Track Type</th>
                <th className="py-3.5 px-4 text-center">Required Docs</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">{rule.name}</span>
                      <span className="text-[11px] font-mono text-slate-400">{rule.id}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{rule.department}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-[#172A46] bg-slate-100 px-2 py-0.5 rounded">
                      {rule.slaDays} Days
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rule.isParallel ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"
                    }`}>
                      {rule.isParallel ? "Parallel" : "Sequential"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-600">
                    {rule.requiredDocs?.length || 0} Files
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Edit}
                        onClick={() => handleEdit(rule)}
                      >
                        Configure
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Rule Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Configure Statutory Clearance Rule"
        subtitle={currentRule?.name}
      >
        {currentRule && (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <Input
              label="Clearance Name"
              value={currentRule.name}
              onChange={(e) => setCurrentRule(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Statutory SLA Target (Days)"
                type="number"
                value={currentRule.slaDays}
                onChange={(e) => setCurrentRule(prev => prev ? ({ ...prev, slaDays: parseInt(e.target.value) || 15 }) : null)}
                required
              />
              <Select
                label="Processing Flow Track"
                value={currentRule.isParallel ? "parallel" : "sequential"}
                onChange={(e) => setCurrentRule(prev => prev ? ({ ...prev, isParallel: e.target.value === "parallel" }) : null)}
                options={[
                  { value: "parallel", label: "Parallel Clearance Stream" },
                  { value: "sequential", label: "Sequential Dependency Track" }
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold text-slate-700">Plain Language Citizen Summary</label>
              <textarea
                rows={3}
                value={currentRule.plainLanguageEn || currentRule.description}
                onChange={(e) => setCurrentRule(prev => prev ? ({ ...prev, plainLanguageEn: e.target.value }) : null)}
                className="w-full rounded-md border border-slate-300 p-2.5 text-xs focus:border-[#172A46] focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Rule Configuration
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
