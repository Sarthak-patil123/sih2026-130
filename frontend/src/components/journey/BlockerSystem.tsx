import React from 'react';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../common/Button';
import { Blocker } from '../../types';

export interface BlockerSystemProps {
  blockers?: Blocker[];
  onResolveBlocker?: (blocker: Blocker) => void;
}

export const BlockerSystem: React.FC<BlockerSystemProps> = ({ blockers = [], onResolveBlocker }) => {
  const { isMarathi } = useLanguage();

  if (!blockers || blockers.length === 0) return null;

  return (
    <div className="rounded-xl border-2 border-[#B94A48]/30 bg-rose-50/20 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-rose-200/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-[#B94A48] text-white">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#B94A48]">
              {isMarathi ? "आपल्या प्रकल्पात काय अडथळा आहे? (What's blocking your project?)" : "What's blocking your project?"}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {isMarathi 
                ? "हे अडथळे दूर केल्याशिवाय पुढील मंजुऱ्या व प्रत्यक्ष उत्पादन सुरू होऊ शकत नाही."
                : "Clearances and downstream processes halted until these prerequisite requirements are satisfied."}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#B94A48] bg-rose-100 px-2.5 py-1 rounded border border-rose-300">
          {blockers.length} {isMarathi ? "अडथळे सक्रिय" : "Active Blockers"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blockers.map((blk) => (
          <div
            key={blk.id}
            className="rounded-lg border border-rose-200 bg-white p-4 space-y-3 shadow-2xs flex flex-col justify-between"
          >
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#263B63] text-sm">
                  {isMarathi ? (blk.approvalNameMr || blk.approvalName) : blk.approvalName}
                </span>
                <span className="text-[10px] font-bold uppercase bg-rose-100 text-[#B94A48] px-2 py-0.5 rounded">
                  {blk.severity || "Critical"}
                </span>
              </div>

              <div className="rounded bg-rose-50/80 p-2.5 border border-rose-200/80 text-slate-800 space-y-1">
                <span className="font-bold text-[#B94A48] block text-[11px]">
                  {isMarathi ? "अडथळ्याचे कारण (Root Cause):" : "Blocked because:"}
                </span>
                <p className="font-semibold">{isMarathi ? (blk.issueMr || blk.issue) : blk.issue}</p>
              </div>

              <div className="text-[11px] text-slate-500 pt-1">
                <span className="font-semibold text-slate-700">{isMarathi ? "परिणाम (Impact): " : "Downstream Impact: "}</span>
                <span>{isMarathi ? (blk.impactMr || blk.impact) : blk.impact}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button
                variant="danger"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => onResolveBlocker?.(blk)}
              >
                {isMarathi ? (blk.actionRequiredMr || blk.actionRequired) : blk.actionRequired}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
