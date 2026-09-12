import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../common/Button';
import { NextBestAction as NextBestActionType } from '../../types';

export interface NextBestActionProps {
  actions?: NextBestActionType[];
  onActionClick?: (link: string) => void;
}

export const NextBestAction: React.FC<NextBestActionProps> = ({ actions = [], onActionClick }) => {
  const { isMarathi } = useLanguage();

  if (!actions || actions.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-600 text-white shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              {isMarathi ? "सर्व काही व्यवस्थित आहे (You're all set)" : "You're all set"}
            </h4>
            <p className="text-xs text-emerald-800 mt-0.5">
              {isMarathi 
                ? "सध्या आपल्याकडून कोणतीही कृती आवश्यक नाही. आपले सर्व अर्ज संबंधित विभागांकडे वेळेत सुरू आहेत."
                : "No action is required from you right now. Your applications are under active departmental review."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getVariantStyles = (type: string) => {
    switch (type) {
      case "danger":
        return {
          border: "border-l-4 border-l-[#B94A48] border-slate-200 bg-white hover:border-[#B94A48]",
          iconBg: "bg-rose-100 text-[#B94A48]",
          Icon: AlertCircle,
          badge: "bg-rose-50 text-[#B94A48] border border-rose-200"
        };
      case "warning":
        return {
          border: "border-l-4 border-l-[#D89B3C] border-slate-200 bg-white hover:border-[#D89B3C]",
          iconBg: "bg-amber-100 text-[#D89B3C]",
          Icon: Clock,
          badge: "bg-amber-50 text-[#C58B2B] border border-amber-200"
        };
      case "success":
        return {
          border: "border-l-4 border-l-[#3D806A] border-slate-200 bg-white hover:border-[#3D806A]",
          iconBg: "bg-emerald-100 text-[#3D806A]",
          Icon: CheckCircle2,
          badge: "bg-emerald-50 text-emerald-800 border border-emerald-200"
        };
      default:
        return {
          border: "border-l-4 border-l-[#263B63] border-slate-200 bg-white",
          iconBg: "bg-blue-100 text-[#263B63]",
          Icon: Info,
          badge: "bg-blue-50 text-[#263B63] border border-blue-200"
        };
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#263B63]">
          {isMarathi ? "तुम्ही पुढे काय करावे? (What should you do next?)" : "What should you do next?"}
        </h3>
        <span className="text-xs font-semibold text-slate-500">
          {actions.length} {isMarathi ? "प्राधान्य कृती" : "Actionable Priorities"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {actions.map((act) => {
          const config = getVariantStyles(act.type);
          const Icon = config.Icon;

          return (
            <div
              key={act.id}
              className={`rounded-lg border p-4 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${config.border}`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-1.5 rounded-md ${config.iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${config.badge}`}>
                    {act.deadline}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#263238] leading-tight">
                    {isMarathi ? (act.titleMr || act.title) : act.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{act.subtitle}</p>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end">
                <Button
                  variant={act.type === "danger" ? "danger" : act.type === "warning" ? "secondary" : "primary"}
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => onActionClick?.(act.link)}
                >
                  {isMarathi ? (act.actionLabelMr || act.actionLabel) : act.actionLabel}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
