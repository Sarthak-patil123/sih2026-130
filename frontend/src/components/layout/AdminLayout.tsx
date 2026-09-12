'use client';

import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Activity, 
  BarChart3, 
  GitMerge, 
  Gift, 
  Users, 
  Lock, 
  LogOut, 
  Menu, 
  X, 
  Languages, 
  RefreshCw,
  Sliders
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { useLanguage } from '../../context/LanguageContext';
import { FooterDisclaimer } from './FooterDisclaimer';

export interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentUser, loginAs, logout, resetToDemoDefaults } = usePortal();
  const { isMarathi, toggleLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminNavLinks = [
    { name: isMarathi ? 'महाराष्ट्र पल्स (Pulse)' : 'Maharashtra Pulse', path: '/admin/dashboard', icon: Activity },
    { name: isMarathi ? 'राज्यस्तरीय विश्लेषण' : 'State Analytics & Funnel', path: '/admin/analytics', icon: BarChart3 },
    { name: isMarathi ? 'धोरणात्मक सिम्युलेशन' : 'What-If Simulation', path: '/admin/simulation', icon: Sliders },
    { name: isMarathi ? 'डिजिटल ऑडिट नोंद' : 'Cryptographic Audit Log', path: '/admin/audit', icon: Lock },
    { name: isMarathi ? 'मंजुरी नियम व्यवस्थापन' : 'Approval Rules & SLA', path: '/admin/rules', icon: GitMerge },
    { name: isMarathi ? 'शासकीय योजना व्यवस्थापक' : 'Scheme Catalog', path: '/admin/schemes', icon: Gift },
    { name: isMarathi ? 'वापरकर्ते व भूमिका' : 'Users & Permissions', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF9F5] text-[#263238]">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#172A46] text-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Left Brand Identity */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(prev => !prev)}
                className="rounded-md p-1.5 text-slate-300 hover:bg-slate-800 lg:hidden cursor-pointer"
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link href="/admin/dashboard" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#D89B3C] text-[#172A46] font-black text-sm shadow-xs">
                  MH
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-base font-bold tracking-tight text-white">
                      State Administration Console
                    </h1>
                    <span className="text-[10px] font-black px-1.5 py-0.2 rounded uppercase bg-rose-600 text-white">
                      Super Admin
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    Department of Industries • Governance & Oversight Control
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Role Switcher Toolbar */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded border border-slate-700 text-xs">
                <span className="text-[10px] text-slate-400 font-semibold px-1">Role:</span>
                <button
                  type="button"
                  onClick={() => { loginAs('entrepreneur'); router.push('/entrepreneur/dashboard'); }}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Entrepreneur
                </button>
                <button
                  type="button"
                  onClick={() => { loginAs('officer'); router.push('/officer/dashboard'); }}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Officer
                </button>
                <button
                  type="button"
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D89B3C] text-[#172A46]"
                >
                  Admin
                </button>
              </div>

              {/* Language Switch */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded transition-colors cursor-pointer"
              >
                <Languages className="h-3.5 w-3.5 text-[#D89B3C]" />
                <span>{isMarathi ? "English" : "मराठी"}</span>
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={() => { logout(); router.push('/login'); }}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200 bg-white pt-16 transition-transform duration-200 lg:static lg:block lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col justify-between p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between lg:hidden pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase">Admin Navigation</span>
                <button type="button" onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="rounded-lg bg-[#172A46] text-white p-3 space-y-1 text-xs">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#D89B3C]">Logged In Authority</p>
                <p className="font-bold text-white truncate">{currentUser?.name || "Dr. Suresh Mehta, IAS"}</p>
                <p className="text-[11px] text-slate-300">Principal Secretary (Industries)</p>
              </div>

              <nav className="space-y-1 pt-1 text-xs">
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  State Administration
                </p>
                {adminNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.path || (link.path !== '/admin/dashboard' && pathname?.startsWith(link.path));

                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 rounded-md px-3 py-2 font-medium transition-colors ${
                        isActive
                          ? "bg-[#172A46] text-white font-bold shadow-xs"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-80" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-6 text-xs text-slate-500 space-y-2">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset all state and demo data to factory defaults?")) {
                    resetToDemoDefaults();
                    router.push('/admin/dashboard');
                  }
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded bg-slate-100 hover:bg-slate-200 py-1.5 text-[11px] font-semibold text-slate-700 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" /> Reset Demo Datasets
              </button>
              <p className="text-[10px] text-slate-400 text-center">
                SIH 2026 Admin Control Console
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      <FooterDisclaimer />
    </div>
  );
};
