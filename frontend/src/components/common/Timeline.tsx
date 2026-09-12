import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react';
import { TimelineStep } from '../../types';

export interface TimelineProps {
  steps: (TimelineStep | { step?: string; name?: string; title?: string; date?: string; status?: string; remarks?: string })[];
  orientation?: 'vertical' | 'horizontal';
}

export const Timeline: React.FC<TimelineProps> = ({ steps = [], orientation = "vertical" }) => {
  if (orientation === "horizontal") {
    return (
      <div className="w-full py-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px]">
          {steps.map((step, idx) => {
            const isCompleted = step.status === "completed" || step.status === "approved";
            const isCurrent = step.status === "current" || step.status === "under review" || step.status === "in_progress";
            const isQuery = step.status === "query" || step.status === "action required";
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center relative group">
                  {/* Icon Node */}
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                      isCompleted
                        ? "border-emerald-600 bg-emerald-50 text-emerald-600"
                        : isCurrent
                        ? "border-blue-600 bg-blue-50 text-blue-600 ring-4 ring-blue-100"
                        : isQuery
                        ? "border-amber-600 bg-amber-50 text-amber-600 ring-4 ring-amber-100 animate-pulse"
                        : "border-slate-300 bg-slate-50 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : isQuery ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : isCurrent ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-semibold">{idx + 1}</span>
                    )}
                  </div>
                  {/* Label */}
                  <span className={`mt-2 text-xs font-semibold max-w-[110px] ${
                    isCurrent ? "text-blue-900" : isCompleted ? "text-slate-800" : "text-slate-400"
                  }`}>
                    {'step' in step ? step.step : 'name' in step ? step.name : 'title' in step ? step.title : `Step ${idx + 1}`}
                  </span>
                  {step.date && (
                    <span className="text-[10px] text-slate-400 mt-0.5">{step.date}</span>
                  )}
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-2 -mt-6 transition-colors ${
                      isCompleted ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical Timeline
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      {steps.map((step, idx) => {
        const isCompleted = step.status === "completed" || step.status === "approved";
        const isCurrent = step.status === "current" || step.status === "under review" || step.status === "in_progress";
        const isQuery = step.status === "query" || step.status === "action required";

        return (
          <div key={idx} className="relative group">
            {/* Step Node Icon */}
            <div
              className={`absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white ${
                isCompleted
                  ? "border-emerald-600 text-emerald-600"
                  : isCurrent
                  ? "border-blue-600 text-blue-600 ring-2 ring-blue-100"
                  : isQuery
                  ? "border-amber-600 text-amber-600 ring-2 ring-amber-100"
                  : "border-slate-300 text-slate-400"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : isQuery ? (
                <AlertCircle className="h-3.5 w-3.5" />
              ) : isCurrent ? (
                <Circle className="h-2.5 w-2.5 fill-blue-600" />
              ) : (
                <span className="text-[10px] font-medium">{idx + 1}</span>
              )}
            </div>

            {/* Step Details */}
            <div className="rounded-md border border-slate-200 bg-slate-50/50 p-3.5 ml-2 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <h4 className={`text-sm font-semibold ${
                  isCurrent ? "text-blue-900" : isCompleted ? "text-slate-800" : "text-slate-500"
                }`}>
                  {'step' in step ? step.step : 'name' in step ? step.name : 'title' in step ? step.title : `Step ${idx + 1}`}
                </h4>
                {step.date && (
                  <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {step.date}
                  </span>
                )}
              </div>
              {step.remarks && (
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {step.remarks}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
