'use client';

import React, { useState } from 'react';
import { Sparkles, HelpCircle, Languages, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export interface AIExplainButtonProps {
  title?: string;
  plainTextEn?: string;
  plainTextMr?: string;
  whyNeededEn?: string;
  whyNeededMr?: string;
  whatNextEn?: string;
  whatNextMr?: string;
  variant?: 'inline' | 'button' | 'link';
}

export const AIExplainButton: React.FC<AIExplainButtonProps> = ({
  title,
  plainTextEn,
  plainTextMr,
  whyNeededEn,
  whyNeededMr,
  whatNextEn,
  whatNextMr,
  variant = "inline"
}) => {
  const { isMarathi } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [viewLang, setViewLang] = useState(isMarathi ? 'mr' : 'en');

  const contentText = viewLang === 'mr' ? plainTextMr : plainTextEn;
  const whyText = viewLang === 'mr' ? whyNeededMr : whyNeededEn;
  const nextText = viewLang === 'mr' ? whatNextMr : whatNextEn;

  const handleTriggerAnalysis = () => {
    setIsAnalyzing(true);
    setViewLang(isMarathi ? 'mr' : 'en');
    setTimeout(() => {
      setIsAnalyzing(false);
      setModalOpen(true);
    }, 1100);
  };

  return (
    <>
      {variant === "button" ? (
        <button
          type="button"
          disabled={isAnalyzing}
          onClick={handleTriggerAnalysis}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#D89B3C]/50 bg-[#FBF9F5] px-2.5 py-1 text-xs font-semibold text-[#263B63] hover:bg-[#F4F1EA] hover:border-[#D89B3C] transition-colors shadow-2xs cursor-pointer disabled:opacity-75"
          title="Explain in simple language"
        >
          {isAnalyzing ? (
            <Loader2 className="h-3.5 w-3.5 text-[#D89B3C] animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5 text-[#D89B3C]" />
          )}
          <span>
            {isAnalyzing
              ? (isMarathi ? "विश्लेषण चालू आहे..." : "AI Analyzing...")
              : (isMarathi ? "सोप्या भाषेत सांगा" : "Explain simply")}
          </span>
        </button>
      ) : (
        <button
          type="button"
          disabled={isAnalyzing}
          onClick={handleTriggerAnalysis}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#263B63] hover:text-[#3D8C82] hover:underline transition-colors cursor-pointer disabled:opacity-75"
        >
          {isAnalyzing ? (
            <Loader2 className="h-3 w-3 text-[#D89B3C] animate-spin" />
          ) : (
            <HelpCircle className="h-3 w-3 text-[#D89B3C]" />
          )}
          <span>
            {isAnalyzing
              ? (isMarathi ? "AI विश्लेषण..." : "AI Analyzing...")
              : (isMarathi ? "मराठीत स्पष्टीकरण" : "Explain simply")}
          </span>
        </button>
      )}

      {/* Explanation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isMarathi ? "सोप्या भाषेत शासकीय मार्गदर्शन" : "Simplified Statutory Guidance"}
        subtitle={title}
        size="md"
        footer={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Languages className="h-4 w-4 text-[#D89B3C]" />
              <span>Language:</span>
              <button
                type="button"
                onClick={() => setViewLang('en')}
                className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                  viewLang === 'en' ? "bg-[#263B63] text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setViewLang('mr')}
                className={`px-2 py-0.5 rounded font-semibold cursor-pointer ${
                  viewLang === 'mr' ? "bg-[#263B63] text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                मराठी
              </button>
            </div>

            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              {viewLang === 'mr' ? "बंद करा" : "Close"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs">
          {/* Plain Summary */}
          {contentText && (
            <div className="rounded-lg border border-[#D89B3C]/30 bg-[#FBF9F5] p-4 space-y-1.5">
              <span className="font-bold text-[#263B63] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#D89B3C]" />
                {viewLang === 'mr' ? "सोप्या भाषेत अर्थ" : "In Plain Language"}
              </span>
              <p className="text-slate-800 leading-relaxed font-medium text-[13px]">{contentText}</p>
            </div>
          )}

          {/* Why Needed */}
          {whyText && (
            <div className="rounded-md border border-slate-200 bg-white p-3.5 space-y-1">
              <span className="font-bold text-slate-700 block text-[11px]">
                {viewLang === 'mr' ? "याची आवश्यकता का आहे?" : "Why do I need this?"}
              </span>
              <p className="text-slate-600 leading-relaxed">{whyText}</p>
            </div>
          )}

          {/* What Next */}
          {nextText && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-1 text-emerald-950">
              <span className="font-bold block text-[11px] text-emerald-900">
                {viewLang === 'mr' ? "पुढे काय होईल?" : "What happens next?"}
              </span>
              <p className="text-emerald-800 leading-relaxed">{nextText}</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
