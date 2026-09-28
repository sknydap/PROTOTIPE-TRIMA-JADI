import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onOpenJadiModal: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenJadiModal }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="px-3.5 py-1.5">
      <div className="relative rounded-xl overflow-hidden bg-slate-900 text-white shadow-2xs border border-slate-800 flex items-center justify-between p-3">
        {/* Dismiss Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          title="Tutup Promo"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="flex items-center gap-3 pr-6">
          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>

          <div>
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5 leading-none">
              <span>TRIMA+ JADI Goal Investment</span>
              <span className="text-[8px] px-1 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                PROMO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 leading-none line-clamp-1">
              Rekomendasi otomatis Trima+ Picks & TAM 1-Klik
            </p>
          </div>
        </div>

        <button
          onClick={onOpenJadiModal}
          className="px-2.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] shrink-0 shadow-2xs active:scale-95 transition-transform"
        >
          Mulai &rarr;
        </button>
      </div>
    </div>
  );
};
