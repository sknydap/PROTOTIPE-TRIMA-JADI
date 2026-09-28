import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Award, Wallet, Plus } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

interface PersonalizedAumOpportunityProps {
  cashBalance: number;
  onOpenJadiModal: () => void;
  onSelectFundPick: (fundId: string) => void;
  onSelectBondPick: (bondId: string) => void;
}

export const PersonalizedAumOpportunity: React.FC<PersonalizedAumOpportunityProps> = ({
  cashBalance,
  onOpenJadiModal,
  onSelectFundPick,
  onSelectBondPick,
}) => {
  return (
    <div className="px-4 py-2">
      <div className="bg-gradient-to-br from-[#0F2344] via-[#122E58] to-[#1A3D73] rounded-2xl p-3.5 text-white shadow-sm border border-blue-900/40 relative overflow-hidden">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
              AUM Growth Engine · Personalized Opportunity
            </span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-extrabold border border-amber-400/30">
            Hingga +1.500 Points
          </span>
        </div>

        {/* Narrative Headline */}
        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
          Anda memiliki <span className="text-amber-300 font-mono font-black">{formatRupiah(cashBalance)}</span> kas mengendap di RDN.
        </h4>
        <p className="text-[11px] text-blue-100/90 mt-0.5 leading-relaxed">
          Ubah dana diam menjadi imbal hasil produktif. Alokasikan ke 3 kurasi instrumen pilihan untuk mempercepat pencapaian kantong impian & tingkatkan tier Trimvestor Anda:
        </p>

        {/* 3 Picks for You */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {/* 1. Reksa Dana Pasar Uang */}
          <div 
            onClick={() => onSelectFundPick('tam-kas-2')}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer text-left group"
          >
            <div className="text-[9px] font-bold text-sky-300 uppercase">Pasar Uang</div>
            <div className="text-xs font-bold text-white mt-0.5 truncate group-hover:text-amber-300 transition-colors">
              Trimegah Kas 2
            </div>
            <div className="text-[10px] text-emerald-400 font-bold font-mono mt-0.5">
              +5.65% 1Y
            </div>
            <div className="text-[9px] text-amber-300/90 mt-1 font-semibold flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              <span>+350 Pts</span>
            </div>
          </div>

          {/* 2. Reksa Dana Pendapatan Tetap - Spotlight */}
          <div 
            onClick={() => onSelectFundPick('tam-fixed-income')}
            className="p-2 rounded-xl bg-gradient-to-b from-orange-500/25 to-amber-500/10 border border-orange-400/40 transition-colors cursor-pointer text-left relative group shadow-inner"
          >
            <div className="text-[9px] font-bold text-amber-300 uppercase flex items-center gap-0.5">
              <Award className="w-2.5 h-2.5" />
              <span>Spotlight</span>
            </div>
            <div className="text-xs font-bold text-white mt-0.5 truncate group-hover:text-amber-300 transition-colors">
              Trimegah Fixed Inc.
            </div>
            <div className="text-[10px] text-emerald-400 font-bold font-mono mt-0.5">
              +8.85% 1Y
            </div>
            <div className="text-[9px] text-amber-300 font-bold mt-1 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 fill-amber-300" />
              <span>+600 Pts</span>
            </div>
          </div>

          {/* 3. SBN / Obligasi SBN */}
          <div 
            onClick={() => onSelectBondPick('bond-sr019')}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer text-left group"
          >
            <div className="text-[9px] font-bold text-emerald-300 uppercase">Sukuk SBN</div>
            <div className="text-xs font-bold text-white mt-0.5 truncate group-hover:text-amber-300 transition-colors">
              Sukuk Ritel SR019
            </div>
            <div className="text-[10px] text-emerald-400 font-bold font-mono mt-0.5">
              6.35% Kupon
            </div>
            <div className="text-[9px] text-amber-300/90 mt-1 font-semibold flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              <span>+700 Pts</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to JADI Direct Alocation */}
        <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between">
          <div className="text-[10px] text-blue-200">
            AUM yang dipertahankan menghasilkan poin harian berkelanjutan.
          </div>
          <button
            onClick={onOpenJadiModal}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-transform shrink-0 ml-2"
          >
            <span>Alokasikan via JADI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
