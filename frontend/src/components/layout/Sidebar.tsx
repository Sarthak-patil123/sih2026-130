'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  GitMerge, 
  FileCheck2, 
  FolderLock, 
  ShieldCheck, 
  Gift, 
  Bell, 
  UserCircle2, 
  HelpCircle, 
  PlusCircle, 
  X,
  FileQuestion,
  BarChart3,
  CalendarDays,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Zap
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { currentUser, unreadCount, applications, currentProject } = usePortal();
  const router = useRouter();
  const pathname = usePathname();
  const isOfficer = currentUser?.role === 'officer';

  // Counts for badges
  const pendingQueriesCount = applications.filter(a => a.queries?.some(q => q.status === "Open")).length;
  const underReviewCount = applications.filter(a => a.status === "Under Review").length;

  const entrepreneurGroups = [
    {
      groupTitle: "Project & Strategy",
      items: [
        { name: 'Dashboard', path: '/entrepreneur/dashboard', icon: LayoutDashboard },
        { name: 'My Projects', path: '/entrepreneur/projects', icon: FolderKanban },
        { name: 'Approval Roadmap', path: '/entrepreneur/roadmap', icon: GitMerge, badge: "Live Plan", badgeVariant: "info" as const },
      ]
    },
    {
      groupTitle: "Clearance & Vault",
      items: [
        { 
          name: 'Applications', 
          path: '/entrepreneur/applications', 
          icon: FileCheck2, 
          badge: pendingQueriesCount > 0 ? `${pendingQueriesCount} Action` : null, 
          badgeVariant: "danger" as const
        },
        { name: 'Document Centre', path: '/entrepreneur/documents', icon: FolderLock },
        { name: 'Site Inspections', path: '/entrepreneur/inspections', icon: ShieldCheck },
        { name: 'Compliance & Renewals', path: '/entrepreneur/compliance', icon: CalendarDays },
      ]
    },
    {
      groupTitle: "Incentives & Identity",
      items: [
        { name: 'Government Schemes', path: '/entrepreneur/schemes', icon: Gift, badge: "Subsidies", badgeVariant: "warning" as const },
        { 
          name: 'Notifications', 
          path: '/entrepreneur/notifications', 
          icon: Bell, 
          badge: unreadCount > 0 ? `${unreadCount}` : null,
          badgeVariant: "primary" as const
        },
        { name: 'Enterprise Profile', path: '/entrepreneur/profile', icon: UserCircle2 },
      ]
    }
  ];

  const officerGroups = [
    {
      groupTitle: "Workdesk & Clearance",
      items: [
        { name: 'Officer Overview', path: '/officer/dashboard', icon: LayoutDashboard },
        { 
          name: 'Application Queue', 
          path: '/officer/applications', 
          icon: FileCheck2, 
          badge: underReviewCount > 0 ? `${underReviewCount} Pending` : null, 
          badgeVariant: "primary" as const
        },
        { name: 'Site Inspections', path: '/officer/inspections', icon: CalendarDays },
        { 
          name: 'Queries & Objections', 
          path: '/officer/queries', 
          icon: FileQuestion,
          badge: pendingQueriesCount > 0 ? `${pendingQueriesCount} Open` : null,
          badgeVariant: "warning" as const
        },
      ]
    },
    {
      groupTitle: "Oversight & Account",
      items: [
        { name: 'Clearance Analytics', path: '/officer/analytics', icon: BarChart3 },
        { name: 'Officer Profile', path: '/officer/profile', icon: UserCircle2 },
      ]
    }
  ];

  const navGroups = isOfficer ? officerGroups : entrepreneurGroups;

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation Shell */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-md border-r border-slate-200/90 shadow-2xl transition-transform duration-300 ease-in-out
          lg:sticky lg:top-[90px] lg:h-[calc(100vh-90px)] lg:w-64 lg:shrink-0 lg:z-30 lg:border-r lg:border-slate-200 lg:bg-white lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto scrollbar-slim p-3.5 space-y-4">
          <div className="space-y-4">
            
            {/* Mobile Header with Close Button */}
            <div className="flex items-center justify-between lg:hidden pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-[#0F2942] text-white font-black text-xs">
                  MH
                </div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Navigation Menu</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Project Summary Badge (Entrepreneur Only) */}
            {!isOfficer && currentProject && (
              <div className="rounded-xl border border-blue-100/90 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-slate-50 p-3 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-100/80 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-blue-900">
                    <Zap className="h-2.5 w-2.5 text-blue-600" /> Active Unit
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded shadow-2xs">
                    {currentProject.journeyProgress || 68}% Ready
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 truncate">{currentProject.companyName}</p>
                  <p className="text-[11px] text-slate-500 truncate font-medium">{projectDistrict(currentProject)} • {currentProject.industry}</p>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-blue-200/50 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${currentProject.journeyProgress || 68}%` }}
                  />
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            {!isOfficer && (
              <button
                type="button"
                onClick={() => {
                  onClose?.();
                  router.push('/entrepreneur/projects/new');
                }}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F2942] to-[#1E3A8A] py-2.5 px-3 text-xs font-bold text-white shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
              >
                <PlusCircle className="h-4 w-4 text-amber-400 group-hover:rotate-90 transition-transform duration-200" />
                <span>Register New Project</span>
              </button>
            )}

            {/* Navigation Groups */}
            <nav className="space-y-4 pt-1">
              {navGroups.map((group, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="px-2.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    {group.groupTitle}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.path || (
                        link.path !== '/entrepreneur/dashboard' && 
                        link.path !== '/officer/dashboard' && 
                        pathname?.startsWith(link.path)
                      );

                      return (
                        <Link
                          key={link.path}
                          href={link.path}
                          onClick={onClose}
                          className={`group relative flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-all ${
                            isActive
                              ? "bg-[#0F2942] text-white shadow-sm font-bold"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon className={`h-4 w-4 shrink-0 transition-transform duration-150 ${
                              isActive ? "text-amber-400 scale-110" : "text-slate-500 group-hover:text-slate-900 group-hover:scale-110"
                            }`} />
                            <span className="truncate">{link.name}</span>
                          </div>

                          {link.badge && (
                            <span
                              className={`shrink-0 rounded-full px-1.5 py-0.2 text-[9px] font-extrabold shadow-2xs ${
                                link.badgeVariant === "danger"
                                  ? "bg-rose-500 text-white animate-pulse"
                                  : link.badgeVariant === "warning"
                                  ? "bg-amber-400 text-slate-950 font-bold"
                                  : link.badgeVariant === "info"
                                  ? (isActive ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800")
                                  : (isActive ? "bg-amber-400 text-slate-950" : "bg-blue-600 text-white")
                              }`}
                            >
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Help Desk Card */}
          <div className="pt-3 border-t border-slate-200 mt-4 shrink-0">
            <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/70 p-3 space-y-1.5 text-xs shadow-2xs">
              <div className="flex items-center justify-between font-bold text-[#0F2942]">
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Nodal Facilitation</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug font-medium">
                Instant clearance guidance & zoning queries.
              </p>
              <div className="pt-1 flex items-center justify-between">
                <a
                  href="tel:18002330444"
                  className="text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline block"
                >
                  1800-233-0444
                </a>
                <span className="text-[9px] font-semibold text-slate-400 uppercase">Mon-Sat</span>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

function projectDistrict(project: any): string {
  return project?.district || "Maharashtra";
}

