'use client';

import React, { useState } from 'react';
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
  Sparkles
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

  const isOfficer = currentUser?.role === 'officer';

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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-2xs">
      {/* Top Government Strip */}
      <div className="bg-[#172A46] px-4 py-1.5 text-[11px] text-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#D89B3C]">MAITRI 2.0</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">
              {isMarathi 
                ? "महाराष्ट्र उद्योग, व्यापार आणि गुंतवणूक सुविधा एकल खिडकी"
                : "Maharashtra Industry, Trade & Investment Facilitation Single Window"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Plain Language Mode Toggle */}
            <button
              type="button"
              onClick={togglePlainLanguageMode}
              className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                plainLanguageMode 
                  ? "bg-amber-500/20 text-amber-300 border border-amber-400/40" 
                  : "text-slate-400 hover:text-white"
              }`}
              title="Toggle simplified wording"
            >
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>{plainLanguageMode ? (isMarathi ? "सोपी भाषा: सुरू" : "Simple Language: ON") : (isMarathi ? "सोपी भाषा" : "Simple Language")}</span>
            </button>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-600 text-[10px] font-bold text-white transition-colors cursor-pointer"
              title="Toggle English / Marathi"
            >
              <Languages className="h-3 w-3 text-[#D89B3C]" />
              <span>{isMarathi ? "English" : "मराठी"}</span>
            </button>

            {/* 3-way Role Switcher Toolbar */}
            <div className="flex items-center gap-1 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
              <span className="text-[10px] text-slate-400 font-medium hidden lg:inline">Role:</span>
              <button
                type="button"
                onClick={() => handleRoleSwitch('entrepreneur')}
                className={`px-1.5 py-0.5 text-[10px] rounded font-semibold transition-colors cursor-pointer ${
                  currentUser?.role === 'entrepreneur' ? "bg-blue-600 text-white shadow-xs" : "text-slate-300 hover:text-white"
                }`}
              >
                Entrepreneur
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('officer')}
                className={`px-1.5 py-0.5 text-[10px] rounded font-semibold transition-colors cursor-pointer ${
                  currentUser?.role === 'officer' ? "bg-amber-600 text-white shadow-xs" : "text-slate-300 hover:text-white"
                }`}
              >
                Officer
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('admin')}
                className={`px-1.5 py-0.5 text-[10px] rounded font-semibold transition-colors cursor-pointer ${
                  currentUser?.role === 'admin' ? "bg-[#D89B3C] text-[#172A46] shadow-xs font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                Admin
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset all project, document, and application data to initial demo state?")) {
                  resetToDemoDefaults();
                  router.push('/entrepreneur/dashboard');
                }
              }}
              className="hidden xl:flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset state to initial defaults"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Mobile Menu + Portal Identity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link
              href={isOfficer ? "/officer/dashboard" : "/entrepreneur/dashboard"}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0F2942] text-white font-black text-sm shadow-xs">
                MH
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-base font-bold tracking-tight text-[#0F2942]">
                    Industrial Portal
                  </h1>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                    isOfficer ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-blue-100 text-blue-900 border border-blue-300"
                  }`}>
                    {isOfficer ? "Officer Desk" : "Enterprise"}
                  </span>
                </div>
                <p className="hidden sm:block text-[11px] font-medium text-slate-500">
                  Govt. of Maharashtra Single Window Approvals
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isOfficer ? "Search applications by ID, applicant, or department..." : "Search approvals, NOCs, document status..."}
                className="w-full rounded-md border border-slate-300 bg-slate-50/70 py-1.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0F2942] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
              />
            </div>
          </form>

          {/* Right: Project Selector (Entrepreneur) + Notifications + Profile */}
          <div className="flex items-center gap-3">
            {/* Entrepreneur Project Selector */}
            {!isOfficer && projects.length > 0 && (
              <div className="relative hidden xl:block">
                <button
                  type="button"
                  onClick={() => setShowProjectSelector(!showProjectSelector)}
                  className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                  <span className="max-w-[140px] truncate font-semibold">
                    {projects.find(p => p.id === currentProjectId)?.projectName || "Select Project"}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                {showProjectSelector && (
                  <div className="absolute right-0 mt-2 w-72 rounded-md border border-slate-200 bg-white p-1.5 shadow-lg z-50">
                    <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Active Project
                    </p>
                    <div className="space-y-1">
                      {projects.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setCurrentProjectId(p.id);
                            setShowProjectSelector(false);
                          }}
                          className={`flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                            p.id === currentProjectId ? "bg-blue-50 text-blue-900 font-semibold" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="truncate">
                            <p className="truncate font-semibold">{p.projectName}</p>
                            <p className="text-[10px] text-slate-500 truncate">{p.district} • {p.investment}</p>
                          </div>
                          {p.id === currentProjectId && <Check className="h-4 w-4 text-blue-600 shrink-0 ml-2" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-lg border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[10px] font-semibold text-blue-800">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="text-[11px] font-semibold text-blue-700 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
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
                            !n.read ? "bg-blue-50/40 hover:bg-blue-50/70" : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-semibold ${!n.read ? "text-slate-900" : "text-slate-700"}`}>
                              {n.title}
                            </p>
                            {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0 mt-1" />}
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                        </div>
                      ))
                    ) : (
                      <p className="p-4 text-center text-xs text-slate-400">No notifications</p>
                    )}
                  </div>

                  <div className="border-t border-slate-200 bg-slate-50 p-2 text-center">
                    <Link
                      href={isOfficer ? "/officer/queries" : "/entrepreneur/notifications"}
                      onClick={() => setShowNotifs(false)}
                      className="text-xs font-semibold text-[#0F2942] hover:underline"
                    >
                      View All Notifications & Queries →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1.5 pr-2.5 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F2942] text-white text-xs font-bold">
                  {currentUser?.name ? currentUser.name.charAt(0) : "U"}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight max-w-[120px] truncate">
                    {currentUser?.name || "User"}
                  </p>
                  <p className="text-[10px] text-slate-500 capitalize">{currentUser?.role || "Account"}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-xl z-50">
                  <div className="border-b border-slate-100 p-2">
                    <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                    {currentUser?.companyName && (
                      <p className="text-[10px] font-semibold text-blue-700 mt-0.5">{currentUser.companyName}</p>
                    )}
                    {currentUser?.department && (
                      <p className="text-[10px] font-semibold text-amber-800 mt-0.5">{currentUser.department}</p>
                    )}
                  </div>

                  <div className="py-1">
                    <Link
                      href={isOfficer ? "/officer/profile" : "/entrepreneur/profile"}
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-2 rounded px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100"
                    >
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      View Enterprise Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleRoleSwitch(isOfficer ? 'entrepreneur' : 'officer')}
                      className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-blue-700 hover:bg-blue-50 font-medium cursor-pointer"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      Switch to {isOfficer ? "Entrepreneur Portal" : "Government Officer Portal"}
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        router.push('/login');
                      }}
                      className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-medium cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Logout
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
