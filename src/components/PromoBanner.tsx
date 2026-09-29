import React, { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onOpenJadiModal: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onOpenJadiModal }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="px-4 py-2">
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-2xs border border-slate-800 flex items-center justify-between p-3.5">
        {/* Dismiss Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Tutup Promo"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-3 pr-4 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-4.5 h-4.5 fill-white" />
          </div>

          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 leading-none">
              <span className="truncate">TRIMA+ JADI Goal Investment</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black shrink-0">
                PROMO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-none truncate">
              Rekomendasi otomatis Trima+ Picks & TAM 1-Klik
            </p>
          </div>
        </div>

        <button
          onClick={onOpenJadiModal}
          className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shrink-0 shadow-2xs active:scale-95 transition-transform cursor-pointer ml-2"
        >
          Mulai &rarr;
        </button>
      </div>
    </div>
  );
};
