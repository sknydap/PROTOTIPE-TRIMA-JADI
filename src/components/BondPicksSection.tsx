import React from 'react';
import { ShieldCheck, Award, ChevronRight, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { BOND_PICKS } from '../data/mockData';
import { BondPick } from '../types/trima';
import { formatRupiah } from '../utils/formatters';

interface BondPicksSectionProps {
  onSelectBond: (bond: BondPick) => void;
  onOpenWhyBond: (bond: BondPick) => void;
}

export const BondPicksSection: React.FC<BondPicksSectionProps> = ({
  onSelectBond,
  onOpenWhyBond,
}) => {
  return (
    <div className="px-4 py-2 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-slate-900">
                Trima+ Bond Picks (Surat Berharga Negara & Korporasi)
              </h3>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                Primary Dealer SUN
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Kupon pasti & likuiditas sekunder terpercaya dari Trimegah Fixed Income
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {BOND_PICKS.map((bond) => (
          <div
            key={bond.id}
            className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all space-y-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">{bond.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    {bond.type}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {bond.issuer} · Rating: <strong className="text-slate-800">{bond.rating}</strong>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-black text-emerald-600 font-mono">
                  {bond.coupon.toFixed(2)}% p.a.
                </div>
                <div className="text-[9px] text-slate-400">Kupon Pasti</div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-xl text-[10px]">
              <div>
                <span className="text-slate-400">Jatuh Tempo</span>
                <div className="font-semibold text-slate-800">{bond.maturityDate}</div>
              </div>
              <div>
                <span className="text-slate-400">Jadwal Kupon</span>
                <div className="font-semibold text-slate-800 truncate">{bond.couponSchedule}</div>
              </div>
              <div>
                <span className="text-slate-400">Min. Pembelian</span>
                <div className="font-semibold text-slate-800 font-mono">{formatRupiah(bond.minBuy, true)}</div>
              </div>
            </div>

            {/* Why This Bond Preview */}
            <div className="text-[10px] text-slate-600 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100 flex items-start justify-between gap-2">
              <div className="line-clamp-2">
                <strong className="text-emerald-950 font-bold">Why This Bond: </strong>
                {bond.whyPicked}
              </div>
              <button
                type="button"
                onClick={() => onOpenWhyBond(bond)}
                className="text-orange-600 font-bold hover:underline shrink-0 text-[10px] flex items-center gap-0.5"
              >
                <span>Analisis</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* CTA + Points Reward */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>+{bond.pointsReward} Trimvestor Points</span>
              </span>

              <button
                type="button"
                onClick={() => onSelectBond(bond)}
                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs active:scale-95 transition-transform"
              >
                Investasi Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
