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
  CalendarDays
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

  const entrepreneurLinks = [
    { name: 'Dashboard', path: '/entrepreneur/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', path: '/entrepreneur/projects', icon: FolderKanban },
    { name: 'Approval Roadmap', path: '/entrepreneur/roadmap', icon: GitMerge },
    { 
      name: 'Applications', 
      path: '/entrepreneur/applications', 
      icon: FileCheck2, 
      badge: pendingQueriesCount > 0 ? `${pendingQueriesCount} Action` : null, 
      badgeVariant: "danger" 
    },
    { name: 'Document Centre', path: '/entrepreneur/documents', icon: FolderLock },
    { name: 'Inspections', path: '/entrepreneur/inspections', icon: ShieldCheck },
    { name: 'Compliance & Renewals', path: '/entrepreneur/compliance', icon: CalendarDays },
    { name: 'Government Schemes', path: '/entrepreneur/schemes', icon: Gift },
    { 
      name: 'Notifications', 
      path: '/entrepreneur/notifications', 
      icon: Bell, 
      badge: unreadCount > 0 ? unreadCount : null,
      badgeVariant: "primary"
    },
    { name: 'Profile', path: '/entrepreneur/profile', icon: UserCircle2 },
  ];

  const officerLinks = [
    { name: 'Dashboard', path: '/officer/dashboard', icon: LayoutDashboard },
    { 
      name: 'Application Queue', 
      path: '/officer/applications', 
      icon: FileCheck2, 
      badge: underReviewCount > 0 ? underReviewCount : null, 
      badgeVariant: "primary" 
    },
    { name: 'Inspection Management', path: '/officer/inspections', icon: CalendarDays },
    { 
      name: 'Queries & Objections', 
      path: '/officer/queries', 
      icon: FileQuestion,
      badge: pendingQueriesCount > 0 ? pendingQueriesCount : null,
      badgeVariant: "warning"
    },
    { name: 'Clearance Analytics', path: '/officer/analytics', icon: BarChart3 },
    { name: 'Officer Profile', path: '/officer/profile', icon: UserCircle2 },
  ];

  const navLinks = isOfficer ? officerLinks : entrepreneurLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200 bg-white pt-16 transition-transform duration-200 ease-in-out lg:static lg:block lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Close Button on Mobile */}
            <div className="flex items-center justify-between lg:hidden pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Navigation Menu</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Project Summary Badge (Entrepreneur Only) */}
            {!isOfficer && currentProject && (
              <div className="rounded-md border border-blue-100 bg-blue-50/60 p-3 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-800">Current Unit</p>
                <p className="text-xs font-bold text-slate-900 truncate">{currentProject.companyName}</p>
                <p className="text-[11px] text-slate-600 truncate">{projectDistrict(currentProject)} • {currentProject.industry}</p>
                <div className="pt-1.5 flex items-center justify-between text-[11px] text-blue-900 font-semibold">
                  <span>Approval Progress</span>
                  <span>{currentProject.journeyProgress || 68}%</span>
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
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0F2942] py-2 px-3 text-xs font-bold text-white shadow-xs hover:bg-[#1B365D] transition-colors cursor-pointer"
              >
                <PlusCircle className="h-4 w-4" />
                Register New Project
              </button>
            )}

            {/* Navigation List */}
            <nav className="space-y-1 pt-1">
              <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isOfficer ? "Officer Workdesk" : "Single Window Services"}
              </p>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.path || (link.path !== '/entrepreneur/dashboard' && link.path !== '/officer/dashboard' && pathname?.startsWith(link.path));

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={onClose}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-[#0F2942] text-white font-semibold shadow-xs"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="h-4 w-4 shrink-0 opacity-80" />
                      <span className="truncate">{link.name}</span>
                    </div>

                    {link.badge && (
                      <span
                        className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                          link.badgeVariant === "danger"
                            ? "bg-rose-100 text-rose-800"
                            : link.badgeVariant === "warning"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Help Desk Card */}
          <div className="pt-4 border-t border-slate-200 mt-6">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-[#0F2942]">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                <span>Nodal Helpdesk</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Need guidance on industrial zoning, clearances or state policy?
              </p>
              <div className="pt-1">
                <a
                  href="tel:18002330444"
                  className="text-[11px] font-bold text-blue-700 hover:underline block"
                >
                  Toll Free: 1800-233-0444
                </a>
                <span className="text-[10px] text-slate-400">Mon - Sat: 9:30 AM to 6:00 PM</span>
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
