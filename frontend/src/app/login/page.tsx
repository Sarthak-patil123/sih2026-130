'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Info,
  Loader2
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

import { UserRole } from '@/types';

export default function LoginPage() {
  const { loginAs } = usePortal();
  const router = useRouter();

  const [email, setEmail] = useState("rajesh.deshmukh@abcfood.in");
  const [password, setPassword] = useState("••••••••••••");
  const [selectedRole, setSelectedRole] = useState<UserRole>("entrepreneur");
  const [loading, setLoading] = useState(false);
  const [demoLoadingRole, setDemoLoadingRole] = useState<UserRole | null>(null);

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginAs(selectedRole);
      setLoading(false);
      if (selectedRole === 'officer') {
        router.push('/officer/dashboard');
      } else if (selectedRole === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/entrepreneur/dashboard');
      }
    }, 1200);
  };

  const handleDemoEntrepreneur = () => {
    setDemoLoadingRole('entrepreneur');
    setTimeout(() => {
      loginAs('entrepreneur');
      router.push('/entrepreneur/dashboard');
    }, 1100);
  };

  const handleDemoOfficer = () => {
    setDemoLoadingRole('officer');
    setTimeout(() => {
      loginAs('officer');
      router.push('/officer/dashboard');
    }, 1100);
  };

  const handleDemoAdmin = () => {
    setDemoLoadingRole('admin');
    setTimeout(() => {
      loginAs('admin');
      router.push('/admin/dashboard');
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Top Header Bar */}
      <div className="bg-[#0F2942] text-white py-2.5 px-4 sm:px-8 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-[#0F2942] font-black text-xs">
              MH
            </div>
            <div>
              <span className="font-bold text-xs tracking-wide">MAHARASHTRA INDUSTRIAL APPROVAL & COMPLIANCE PORTAL</span>
              <p className="text-[10px] text-slate-300">Department of Industries • Single Window Facilitation Platform</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-amber-300 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
            <Info className="h-3.5 w-3.5" />
            <span>Prototype Demonstration for SIH</span>
          </div>
        </div>
      </div>

      {/* Main Login Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-xl bg-white shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Left Hero / Information Side */}
          <div className="md:col-span-5 bg-[#0F2942] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <span>Single Window Fast-Track</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Streamlining Approvals & Compliance
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                Unified single-window portal enabling Maharashtra&apos;s entrepreneurs to navigate statutory clearances, statutory timelines, automated inspections, and state industrial incentives.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-200">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Parallel Clearance Roadmaps:</strong> MIDC, MPCB, DISH, Fire & SEIAA.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Interactive Query Resolution:</strong> Immediate document revisions & audit trails.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Fiscal Schemes Engine:</strong> PSI 2019 & Agro Capital Subsidies match.</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-700/60 text-[11px] text-slate-400">
              <p>Designed for Maharashtra Industrial Units • Directorate of Industries</p>
            </div>
          </div>

          {/* Right Form Side */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Form Title */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0F2942]">Portal Access</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Unified platform for industrial approvals, compliance and government support services
                </p>
              </div>

              {/* Quick 1-Click Demo Section */}
              <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50/50 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    ⚡ Instant Demo Access
                  </span>
                  <span className="text-[10px] bg-blue-200 text-blue-900 font-semibold px-2 py-0.5 rounded">
                    1-Click Login
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    disabled={demoLoadingRole !== null || loading}
                    onClick={handleDemoEntrepreneur}
                    className="flex items-center justify-center gap-1.5 rounded-md bg-[#0F2942] px-2.5 py-2.5 text-xs font-bold text-white hover:bg-[#1B365D] transition-all shadow-xs cursor-pointer disabled:opacity-75"
                  >
                    {demoLoadingRole === 'entrepreneur' ? (
                      <Loader2 className="h-4 w-4 text-blue-300 animate-spin" />
                    ) : (
                      <Building2 className="h-4 w-4 text-blue-300" />
                    )}
                    <span>{demoLoadingRole === 'entrepreneur' ? "Verifying..." : "Entrepreneur"}</span>
                  </button>
                  <button
                    type="button"
                    disabled={demoLoadingRole !== null || loading}
                    onClick={handleDemoOfficer}
                    className="flex items-center justify-center gap-1.5 rounded-md bg-amber-700 px-2.5 py-2.5 text-xs font-bold text-white hover:bg-amber-800 transition-all shadow-xs cursor-pointer disabled:opacity-75"
                  >
                    {demoLoadingRole === 'officer' ? (
                      <Loader2 className="h-4 w-4 text-amber-200 animate-spin" />
                    ) : (
                      <UserCheck className="h-4 w-4 text-amber-200" />
                    )}
                    <span>{demoLoadingRole === 'officer' ? "Verifying..." : "Govt Officer"}</span>
                  </button>
                  <button
                    type="button"
                    disabled={demoLoadingRole !== null || loading}
                    onClick={handleDemoAdmin}
                    className="flex items-center justify-center gap-1.5 rounded-md bg-slate-700 px-2.5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-xs cursor-pointer disabled:opacity-75"
                  >
                    {demoLoadingRole === 'admin' ? (
                      <Loader2 className="h-4 w-4 text-emerald-300 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    )}
                    <span>{demoLoadingRole === 'admin' ? "Verifying..." : "Admin"}</span>
                  </button>
                </div>
              </div>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-xs font-medium text-slate-400">
                  Or Sign In with Credentials
                </span>
              </div>

              {/* Standard Form */}
              <form onSubmit={handleStandardLogin} className="space-y-4">
                {/* Role Tabs */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Account Type</label>
                  <div className="grid grid-cols-3 gap-2 rounded-md bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole('entrepreneur');
                        setEmail('rajesh.deshmukh@abcfood.in');
                      }}
                      className={`rounded py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        selectedRole === 'entrepreneur'
                          ? 'bg-white text-[#0F2942] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Entrepreneur
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole('officer');
                        setEmail('anjali.kulkarni@maharashtra.gov.in');
                      }}
                      className={`rounded py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        selectedRole === 'officer'
                          ? 'bg-white text-[#0F2942] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Govt Officer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole('admin');
                        setEmail('admin@maitrimh.gov.in');
                      }}
                      className={`rounded py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        selectedRole === 'admin'
                          ? 'bg-white text-[#0F2942] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Portal Admin
                    </button>
                  </div>
                </div>

                <Input
                  label="Email / User ID"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={Mail}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={Lock}
                  required
                />

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0F2942]" />
                    <span>Remember my device</span>
                  </label>
                  <span className="text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="w-full py-2.5 mt-2"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Login to Portal
                </Button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              New industrial enterprise in Maharashtra?{' '}
              <button
                type="button"
                onClick={handleDemoEntrepreneur}
                className="font-bold text-blue-700 hover:underline cursor-pointer"
              >
                Register Online
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="border-t border-slate-200 bg-white py-3 px-4 text-center text-[11px] text-slate-500">
        <p>Prototype developed for demonstration purposes • Maharashtra Industrial Approval & Single Window Compliance Portal</p>
      </div>
    </div>
  );
}
