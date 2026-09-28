import React from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, Award, Wallet } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

interface AumOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashBalance: number;
  onOpenJadiModal: () => void;
  onSelectFundPick: (fundId: string) => void;
  onSelectBondPick: (bondId: string) => void;
}

export const AumOpportunityModal: React.FC<AumOpportunityModalProps> = ({
  isOpen,
  onClose,
  cashBalance,
  onOpenJadiModal,
  onSelectFundPick,
  onSelectBondPick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/65 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-gradient-to-b from-[#0F2344] via-[#122E58] to-[#1A3D73] text-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-blue-900/50 animate-in slide-in-from-bottom duration-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab bar */}
        <div className="w-10 h-1.5 bg-slate-600 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                AUM Growth Engine · Pop Up Opportunity
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-white">
              Peluang Investasi Cerdas Dana Mengendap
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3.5 text-xs">
          <div className="bg-white/10 p-3 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-blue-200">Kas Mengendap di Cash RDN FAC0127:</div>
              <div className="text-lg font-black font-mono text-amber-300 mt-0.5">
                {formatRupiah(cashBalance)}
              </div>
            </div>
            <span className="text-[9px] px-2 py-1 rounded-full bg-amber-400/20 text-amber-300 font-extrabold border border-amber-400/30">
              Hingga +1.500 Pts
            </span>
          </div>

          <p className="text-[11px] text-blue-100/90 leading-relaxed">
            Berdasarkan profil risiko dan tujuan investasi Anda, berikut 3 instrumen unggulan untuk meningkatkan imbal hasil sekaligus mempercepat pembukaan fitur premium Trimvestor:
          </p>

          {/* 3 Picks */}
          <div className="grid grid-cols-3 gap-2">
            {/* Pick 1 */}
            <div 
              onClick={() => {
                onClose();
                onSelectFundPick('tam-kas-2');
              }}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer text-left group"
            >
              <div className="text-[9px] font-bold text-sky-300 uppercase">Pasar Uang</div>
              <div className="text-xs font-bold text-white mt-0.5 truncate group-hover:text-amber-300">
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

            {/* Pick 2 */}
            <div 
              onClick={() => {
                onClose();
                onSelectFundPick('tam-fixed-income');
              }}
              className="p-2.5 rounded-xl bg-gradient-to-b from-orange-500/30 to-amber-500/15 border border-orange-400/50 transition-all cursor-pointer text-left group shadow-inner"
            >
              <div className="text-[9px] font-bold text-amber-300 uppercase flex items-center gap-0.5">
                <Award className="w-2.5 h-2.5" />
                <span>Spotlight</span>
              </div>
              <div className="text-xs font-bold text-white mt-0.5 truncate group-hover:text-amber-300">
                Fixed Income Plan
              </div>
              <div className="text-[10px] text-emerald-400 font-bold font-mono mt-0.5">
                +8.85% 1Y
              </div>
              <div className="text-[9px] text-amber-300 font-bold mt-1 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 fill-amber-300" />
                <span>+600 Pts</span>
              </div>
            </div>

            {/* Pick 3 */}
            <div 
              onClick={() => {
                onClose();
                onSelectBondPick('bond-sr019');
              }}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer text-left group"
            >
              <div className="text-[9px] font-bold text-emerald-300 uppercase">Sukuk SBN</div>
              <div className="text-xs font-bold text-white mt-0.5 truncate group-hover:text-amber-300">
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

          <div className="text-[10px] text-blue-200/80 bg-black/20 p-2.5 rounded-xl border border-white/10">
            AUM yang Anda pertahankan di Trima+ akan terus menghasilkan <strong>AUM Holding Points bulanan</strong> (Multiplier 1.5x) untuk menjaga status Tier Anda.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white text-xs font-semibold"
          >
            Nanti Saja
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenJadiModal();
            }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            <span>Alokasikan Sekarang via JADI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
