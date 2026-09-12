import React from 'react';
import { Info } from 'lucide-react';

export const FooterDisclaimer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 text-xs text-slate-500 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            {/* Maharashtra Emblem inspired emblem badge */}
            <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0F2942] text-white font-bold text-xs shadow-2xs">
              MH
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">
                Maharashtra Industrial Approval & Single Window Compliance Portal
              </p>
              <p className="text-[11px] text-slate-500">
                Department of Industries, Energy & Labour — Government of Maharashtra
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded bg-amber-50 px-3 py-1.5 text-amber-900 border border-amber-200 font-medium text-[11px]">
            <Info className="h-3.5 w-3.5 text-amber-700 shrink-0" />
            <span>Prototype developed for demonstration purposes.</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© 2026 Maharashtra Industrial Development & Statutory Single Window Services. Smart India Hackathon Prototype.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">SLA Citizen&apos;s Charter</span>
            <span className="hover:text-slate-600 cursor-pointer">Security & Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Helpdesk: 1800-233-0444</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
