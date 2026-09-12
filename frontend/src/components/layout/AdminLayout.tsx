'use client';

import React, { useState, useEffect, ReactNode } from 'react';
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
  Sliders,
  ShieldCheck,
  ChevronRight,
  ExternalLink
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const adminNavGroups = [
    {
      groupTitle: isMarathi ? 'राज्य निरीक्षण व नियंत्रण' : 'State Intelligence & Oversight',
      items: [
        { name: isMarathi ? 'महाराष्ट्र पल्स (Pulse)' : 'Maharashtra Pulse', path: '/admin/dashboard', icon: Activity },
        { name: isMarathi ? 'राज्यस्तरीय विश्लेषण' : 'State Analytics & Funnel', path: '/admin/analytics', icon: BarChart3 },
        { name: isMarathi ? 'धोरणात्मक सिम्युलेशन' : 'What-If Policy Simulation', path: '/admin/simulation', icon: Sliders },
      ]
    },
    {
      groupTitle: isMarathi ? 'प्रशासन व अखंडता' : 'Governance & Integrity',
      items: [
        { name: isMarathi ? 'डिजिटल ऑडिट नोंद' : 'Cryptographic Audit Vault', path: '/admin/audit', icon: Lock },
        { name: isMarathi ? 'मंजुरी नियम व SLA' : 'Approval Rules & SLA Engine', path: '/admin/rules', icon: GitMerge },
        { name: isMarathi ? 'शासकीय योजना व्यवस्थापक' : 'State Scheme Catalog', path: '/admin/schemes', icon: Gift },
        { name: isMarathi ? 'वापरकर्ते व भूमिका' : 'User Access Control', path: '/admin/users', icon: Users },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#263238] antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Top Admin Header */}
      <header className={`sticky top-0 z-40 w-full border-b border-slate-700/80 bg-[#172A46] text-white transition-all duration-200 ${
        scrolled ? "shadow-lg bg-[#172A46]/95 backdrop-blur-md" : "shadow-sm"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-15 items-center justify-between gap-3">
            
            {/* Left Brand Identity */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(prev => !prev)}
                className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 lg:hidden cursor-pointer"
                aria-label="Toggle admin sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>

              <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#D89B3C] to-amber-600 text-[#172A46] font-black text-sm shadow-md ring-1 ring-amber-300/30 group-hover:scale-105 transition-transform">
                  MH
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-extrabold tracking-tight text-white">
                      State Administration Console
                    </span>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded uppercase bg-rose-600 text-white tracking-wider">
                      Apex Admin
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 hidden sm:block font-medium">
                    Department of Industries • Governance, SLA & Oversight Engine
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Role Switcher Toolbar */}
              <div className="hidden sm:flex items-center gap-0.5 bg-slate-900/90 p-0.5 rounded-md border border-slate-700 text-xs shadow-inner">
                <span className="text-[10px] text-slate-400 font-semibold px-1.5">Role:</span>
                <button
                  type="button"
                  onClick={() => { loginAs('entrepreneur'); router.push('/entrepreneur/dashboard'); }}
                  className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Investor
                </button>
                <button
                  type="button"
                  onClick={() => { loginAs('officer'); router.push('/officer/dashboard'); }}
                  className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Officer
                </button>
                <button
                  type="button"
                  className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#D89B3C] text-slate-950 shadow-xs"
                >
                  Admin
                </button>
              </div>

              {/* Language Switch */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md transition-colors cursor-pointer border border-white/10"
              >
                <Languages className="h-3 w-3 text-[#D89B3C]" />
                <span>{isMarathi ? "English" : "मराठी"}</span>
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={() => { logout(); router.push('/login'); }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full relative">
        {/* Mobile Drawer Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity lg:hidden"
            aria-hidden="true"
          />
        )}

        {/* Sticky Admin Sidebar */}
        <aside
          className={`
            fixed top-0 bottom-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-md border-r border-slate-200/90 shadow-2xl transition-transform duration-300 ease-in-out
            lg:sticky lg:top-[61px] lg:h-[calc(100vh-61px)] lg:w-64 lg:shrink-0 lg:z-30 lg:border-r lg:border-slate-200 lg:bg-white lg:shadow-none
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="flex h-full flex-col justify-between overflow-y-auto scrollbar-slim p-3.5 space-y-4">
            <div className="space-y-4">
              {/* Mobile Close Button */}
              <div className="flex items-center justify-between lg:hidden pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Admin Console</span>
                <button 
                  type="button" 
                  onClick={() => setSidebarOpen(false)} 
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Logged in Authority Card */}
              <div className="rounded-xl bg-gradient-to-br from-[#172A46] to-[#1E3A8A] text-white p-3 space-y-1 shadow-md border border-slate-700/60">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#D89B3C] flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-[#D89B3C]" /> Super Authority
                  </p>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <p className="font-bold text-white text-xs truncate">{currentUser?.name || "Dr. Suresh Mehta, IAS"}</p>
                <p className="text-[10px] text-slate-300 truncate">Principal Secretary (Industries)</p>
              </div>

              {/* Grouped Nav Items */}
              <nav className="space-y-4 pt-1">
                {adminNavGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <p className="px-2.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      {group.groupTitle}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.path || (link.path !== '/admin/dashboard' && pathname?.startsWith(link.path));

                        return (
                          <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`group flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-all ${
                              isActive
                                ? "bg-[#172A46] text-white font-bold shadow-xs"
                                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <Icon className={`h-4 w-4 shrink-0 transition-transform duration-150 ${
                                isActive ? "text-[#D89B3C] scale-110" : "text-slate-500 group-hover:text-slate-900 group-hover:scale-110"
                              }`} />
                              <span className="truncate">{link.name}</span>
                            </div>
                            <ChevronRight className={`h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity ${isActive ? "opacity-100 text-[#D89B3C]" : ""}`} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 mt-4 space-y-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset all state and demo data to factory defaults?")) {
                    resetToDemoDefaults();
                    router.push('/admin/dashboard');
                  }
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 py-2 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                <RefreshCw className="h-3 w-3 text-slate-600" /> 
                <span>Reset Demo Datasets</span>
              </button>
              <p className="text-[9px] text-slate-400 text-center font-medium">
                MAITRI 2.0 • Government of Maharashtra
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all duration-200">
          {children}
        </main>
      </div>

      <FooterDisclaimer />
    </div>
  );
};

