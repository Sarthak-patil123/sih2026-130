'use client';

import React from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { mockUsers } from '@/data/users';
import { Button } from '@/components/common/Button';

export default function AdminUsersPage() {
  const { isMarathi } = useLanguage();

  const userList = [
    {
      id: mockUsers.entrepreneur.id,
      name: mockUsers.entrepreneur.name,
      role: "Entrepreneur",
      roleBadge: "bg-blue-100 text-blue-800",
      email: mockUsers.entrepreneur.email,
      dept: "ABC Food Processing Pvt. Ltd.",
      status: "Active"
    },
    {
      id: mockUsers.officer.id,
      name: mockUsers.officer.name,
      role: "Government Officer",
      roleBadge: "bg-amber-100 text-amber-900",
      email: mockUsers.officer.email,
      dept: mockUsers.officer.department,
      status: "Active"
    },
    {
      id: mockUsers.admin.id,
      name: mockUsers.admin.name,
      role: "System Administrator",
      roleBadge: "bg-rose-100 text-rose-800",
      email: mockUsers.admin.email,
      dept: mockUsers.admin.department,
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white bg-[#172A46] px-2.5 py-0.5 rounded border border-slate-700">
              Role-Based Access Control (RBAC)
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#172A46] mt-1">
            {isMarathi ? "वापरकर्ते व भूमिका व्यवस्थापन" : "Users, Roles & Permission Matrix"}
          </h2>
          <p className="text-xs text-slate-500">
            Strict separation between Citizen Entrepreneurs, Department Reviewing Officers, and State Council Administrators.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => alert("Add New User modal simulated.")}
        >
          {isMarathi ? "नवीन वापरकर्ता जोडा" : "Add User Account"}
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">User ID & Name</th>
                <th className="py-3.5 px-4">System Role</th>
                <th className="py-3.5 px-4">Email ID</th>
                <th className="py-3.5 px-4">Organization / Department</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Access Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userList.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{u.name}</span>
                    <span className="font-mono text-[11px] text-slate-400">{u.id}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${u.roleBadge}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium max-w-[220px] truncate">{u.dept}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle2 className="h-3 w-3" /> {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button variant="secondary" size="sm">
                      Permissions
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
