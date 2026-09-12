'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Plus, 
  ArrowRight, 
} from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Button } from '@/components/common/Button';
import { StatusBadge } from '@/components/common/StatusBadge';

export default function ProjectsPage() {
  const { projects, currentProjectId, setCurrentProjectId } = usePortal();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-[#0F2942]">My Registered Projects</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your industrial establishments, factory units, and expansion ventures across Maharashtra.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => router.push('/entrepreneur/projects/new')}
        >
          Register New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => {
          const isActive = project.id === currentProjectId;

          return (
            <div
              key={project.id}
              className={`rounded-lg border bg-white p-6 shadow-xs transition-all space-y-4 ${
                isActive ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {project.id}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded">
                        Active Workspace
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[#0F2942] mt-1.5">{project.companyName}</h3>
                  <p className="text-xs font-medium text-slate-500">{project.projectName}</p>
                </div>
                <StatusBadge status={project.status} size="md" />
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-md border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="h-3 w-3 text-blue-600 shrink-0" />
                    {project.district}, MH
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Investment</span>
                  <span className="font-bold text-emerald-700 mt-0.5 block">{project.investment}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Sector</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block truncate">{project.industry}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Approval Progress</span>
                  <span className="font-bold text-[#0F2942]">{project.overallProgress}%</span>
                </div>
                <ProgressBar progress={project.overallProgress} height="md" showPercentage={false} />
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <span className="text-slate-500">
                  Created: <strong>{project.createdAt}</strong>
                </span>

                <div className="flex items-center gap-2">
                  {!isActive && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setCurrentProjectId(project.id)}
                    >
                      Set Active
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => {
                      setCurrentProjectId(project.id);
                      router.push('/entrepreneur/roadmap');
                    }}
                  >
                    View Roadmap
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
