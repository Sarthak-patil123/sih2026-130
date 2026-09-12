'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  ChevronDown, 
  Shield, 
  RefreshCw, 
  Check, 
  Menu, 
  Briefcase, 
  Languages, 
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  Layers
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { useLanguage } from '../../context/LanguageContext';

export interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { 
    currentUser, 
    loginAs, 
    logout, 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    projects, 
    currentProjectId, 
    setCurrentProjectId,
    resetToDemoDefaults 
  } = usePortal();

  const { isMarathi, toggleLanguage, plainLanguageMode, togglePlainLanguageMode } = useLanguage();

  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  const isOfficer = currentUser?.role === 'officer';

  // Listen to scroll to adjust shadow & backdrop elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (projectRef.current && !projectRef.current.contains(event.target as Node)) {
        setShowProjectSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (newRole: 'entrepreneur' | 'officer' | 'admin') => {
    loginAs(newRole);
    setShowProfile(false);
    if (newRole === 'officer') {
      router.push('/officer/dashboard');
    } else if (newRole === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/entrepreneur/dashboard');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (isOfficer) {
      router.push(`/officer/applications?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/entrepreneur/applications?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90" 
        : "bg-white border-b border-slate-200 shadow-xs"
    }`}>
      {/* Top Government Strip */}
      <div className="bg-[#172A46] text-slate-200 px-3 sm:px-6 py-1 text-[11px] border-b border-amber-500/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          {/* Brand & Emblem info */}
          <div className="flex items-center gap-2 truncate">
            <span className="font-extrabold tracking-wider text-[#D89B3C] flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              MAITRI 2.0
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="truncate text-slate-300 hidden md:inline font-medium">
              {isMarathi 
                ? "महाराष्ट्र उद्योग, व्यापार आणि गुंतवणूक सुविधा एकल खिडकी प्रणाली"
                : "Maharashtra Single Window Industrial Clearance System"}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Plain Language Mode Toggle */}
            <button
              type="button"
              onClick={togglePlainLanguageMode}
              className={`hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                plainLanguageMode 
                  ? "bg-amber-400 text-slate-950 shadow-xs ring-1 ring-amber-300" 
                  : "bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
              title="Toggle simplified, citizen-friendly wording"
            >
              <Sparkles className={`h-3 w-3 ${plainLanguageMode ? "text-slate-950" : "text-amber-300"}`} />
              <span>{plainLanguageMode ? (isMarathi ? "सोपी भाषा: सुरू" : "Plain Language: ON") : (isMarathi ? "सोपी भाषा" : "Plain Language")}</span>
            </button>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-slate-800/90 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 text-[10px] font-bold text-white transition-colors cursor-pointer"
              title="Toggle English / मराठी"
            >
              <Languages className="h-3 w-3 text-[#D89B3C]" />
              <span>{isMarathi ? "English" : "मराठी"}</span>
            </button>

            {/* 3-way Role Switcher Toolbar */}
            <div className="flex items-center gap-0.5 bg-slate-900/90 p-0.5 rounded-md border border-slate-700/80 shadow-inner">
              <span className="text-[10px] text-slate-400 font-semibold px-1.5 hidden xl:inline">Role:</span>
              <button
                type="button"
                onClick={() => handleRoleSwitch('entrepreneur')}
                className={`px-2 py-0.5 text-[10px] rounded font-bold transition-all cursor-pointer ${
                  currentUser?.role === 'entrepreneur' 
                    ? "bg-blue-600 text-white shadow-xs" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                Investor
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('officer')}
                className={`px-2 py-0.5 text-[10px] rounded font-bold transition-all cursor-pointer ${
                  currentUser?.role === 'officer' 
                    ? "bg-amber-600 text-white shadow-xs" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                Officer
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('admin')}
                className={`px-2 py-0.5 text-[10px] rounded font-bold transition-all cursor-pointer ${
                  currentUser?.role === 'admin' 
                    ? "bg-[#D89B3C] text-slate-950 shadow-xs" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Quick Demo Reset */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset all project, document, and application data to initial demo state?")) {
                  resetToDemoDefaults();
                  router.push('/entrepreneur/dashboard');
                }
              }}
              className="hidden lg:flex items-center gap-1 text-[10px] text-slate-400 hover:text-amber-300 transition-colors cursor-pointer px-1 py-0.5"
              title="Reset application dataset to defaults"
            >
              <RefreshCw className="h-2.5 w-2.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-15 items-center justify-between gap-3">
          
          {/* Left: Mobile Menu Trigger + Portal Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href={isOfficer ? "/officer/dashboard" : "/entrepreneur/dashboard"}
              className="flex items-center gap-2.5 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0F2942] to-[#1E3A8A] text-white font-black text-sm shadow-md ring-1 ring-slate-900/10 group-hover:scale-105 transition-transform">
                MH
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-tight text-[#0F2942]">
                    MAITRI<span className="text-amber-600 font-bold ml-0.5">2.0</span>
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isOfficer 
                      ? "bg-amber-100 text-amber-900 border border-amber-300/80" 
                      : "bg-blue-100 text-blue-900 border border-blue-300/80"
                  }`}>
                    {isOfficer ? "Officer Desk" : "Investor Portal"}
                  </span>
                </div>
                <p className="hidden sm:block text-[10px] font-semibold text-slate-500">
                  Government of Maharashtra Single Window
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Global Fast Search */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isOfficer ? "Search files, applicant IDs, departments..." : "Search NOCs, statutory clearances, documents..."}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/90 py-1.5 pl-9 pr-8 text-xs text-slate-900 placeholder:text-slate-400 transition-all focus:border-blue-600 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Right Controls: Project Switcher, Notifications, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Active Project Switcher (Investor Portal) */}
            {!isOfficer && projects.length > 0 && (
              <div className="relative hidden xl:block" ref={projectRef}>
                <button
                  type="button"
                  onClick={() => setShowProjectSelector(!showProjectSelector)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/90 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-blue-700">
                    <Briefcase className="h-3 w-3" />
                  </div>
                  <span className="max-w-[130px] truncate">
                    {projects.find(p => p.id === currentProjectId)?.projectName || "Select Unit"}
                  </span>
                  <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${showProjectSelector ? "rotate-180" : ""}`} />
                </button>

                {showProjectSelector && (
                  <div className="glass-dropdown absolute right-0 mt-2 w-76 rounded-xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 mb-1">
                      <span>Select Active Project</span>
                      <span className="text-blue-600">{projects.length} Total</span>
                    </div>
                    <div className="space-y-1 max-h-60 overflow-y-auto scrollbar-slim">
                      {projects.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setCurrentProjectId(p.id);
                            setShowProjectSelector(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-all cursor-pointer ${
                            p.id === currentProjectId 
                              ? "bg-blue-50 text-blue-900 font-bold border border-blue-200/70" 
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="truncate pr-2">
                            <p className="truncate font-semibold text-slate-900">{p.projectName}</p>
                            <p className="text-[10px] text-slate-500 truncate">{p.district} • ₹{p.investment} Cr</p>
                          </div>
                          {p.id === currentProjectId && (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="pt-2 mt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setShowProjectSelector(false);
                          router.push('/entrepreneur/projects/new');
                        }}
                        className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                      >
                        + Register Another Project
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notifications Center */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setShowNotifs(!showNotifs)}
                className={`relative rounded-lg p-2 transition-all cursor-pointer ${
                  showNotifs 
                    ? "bg-slate-100 text-blue-900 ring-2 ring-blue-600/20" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="glass-dropdown absolute right-0 mt-2 w-84 sm:w-96 rounded-xl border border-slate-200/80 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/90 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">Notifications & Alerts</span>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                          {unreadCount} Unread
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 scrollbar-slim">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markAsRead(n.id);
                            if (n.link) {
                              setShowNotifs(false);
                              router.push(n.link);
                            }
                          }}
                          className={`p-3 text-xs transition-colors cursor-pointer ${
                            !n.read ? "bg-blue-50/40 hover:bg-blue-50/70 border-l-2 border-blue-600" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-semibold ${!n.read ? "text-slate-900" : "text-slate-700"}`}>
                              {n.title}
                            </p>
                            {!n.read && <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1 shadow-xs" />}
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1.5 block font-medium">{n.timestamp}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-400">
                        <CheckCircle2 className="h-8 w-8 text-slate-300 mx-auto mb-1.5" />
                        You're all caught up! No new notifications.
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/80 p-2.5 text-center">
                    <Link
                      href={isOfficer ? "/officer/queries" : "/entrepreneur/notifications"}
                      onClick={() => setShowNotifs(false)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
                    >
                      <span>View All Notifications & Queries</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setShowProfile(!showProfile)}
                className={`flex items-center gap-2 rounded-lg border p-1 pl-1.5 pr-2.5 transition-all cursor-pointer ${
                  showProfile 
                    ? "border-blue-600/50 bg-blue-50/50 ring-2 ring-blue-600/10" 
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#0F2942] to-[#1E3A8A] text-white text-xs font-bold shadow-xs">
                  {currentUser?.name ? currentUser.name.charAt(0) : "U"}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight max-w-[110px] truncate">
                    {currentUser?.name || "User"}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500 capitalize">{currentUser?.role || "Account"}</p>
                </div>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`} />
              </button>

              {showProfile && (
                <div className="glass-dropdown absolute right-0 mt-2 w-68 rounded-xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-slate-100 p-2.5 bg-slate-50/60 rounded-lg mb-1">
                    <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                    {currentUser?.companyName && (
                      <p className="text-[10px] font-bold text-blue-700 mt-1 flex items-center gap-1">
                        <Briefcase className="h-3 w-3" /> {currentUser.companyName}
                      </p>
                    )}
                    {currentUser?.department && (
                      <p className="text-[10px] font-bold text-amber-800 mt-1 flex items-center gap-1">
                        <Shield className="h-3 w-3" /> {currentUser.department}
                      </p>
                    )}
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href={isOfficer ? "/officer/profile" : "/entrepreneur/profile"}
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      <span>{isOfficer ? "Officer Profile" : "Enterprise Profile"}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleRoleSwitch(isOfficer ? 'entrepreneur' : 'officer')}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-blue-700 hover:bg-blue-50 font-bold transition-colors cursor-pointer"
                    >
                      <Layers className="h-3.5 w-3.5 text-blue-600" />
                      <span>Switch to {isOfficer ? "Investor Portal" : "Officer Desk"}</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        router.push('/login');
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

