import React from 'react';
import { ShieldCheck, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { BOND_PICKS } from '../data/mockData';
import { BondPick } from '../types/trima';
import { formatRupiah } from '../utils/formatters';

interface BondSwipeCarouselProps {
  onSelectBond: (bond: BondPick) => void;
  onOpenWhyBond: (bond: BondPick) => void;
}

export const BondSwipeCarousel: React.FC<BondSwipeCarouselProps> = ({
  onSelectBond,
  onOpenWhyBond,
}) => {
  return (
    <div className="px-4 pt-2.5 pb-1 space-y-2">
      {/* Header with Senada Colors */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2 leading-none">
              <h3 className="text-sm font-bold text-slate-900">
                Pilihan SUN, SBN & Obligasi
              </h3>
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200/50">
                Primary Dealer
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 leading-none">
              Kupon terproteksi negara & reward Trimvestor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
          <span>Geser</span>
          <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
        </div>
      </div>

      {/* Horizontal Swipe Carousel (Comfortable scale, No overlap, Senada) */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1.5 pt-0.5">
        {BOND_PICKS.map((bond) => {
          const isGov = bond.type.includes('Pemerintah') || bond.type.includes('Sukuk');

          return (
            <div
              key={bond.id}
              className="w-[235px] snap-center shrink-0 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-orange-300 transition-all flex flex-col justify-between text-xs group"
            >
              <div>
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                    isGov ? 'bg-orange-50 text-orange-700 border border-orange-200/40' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {bond.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 font-mono">
                    {bond.rating}
                  </span>
                </div>

                {/* Bond Name */}
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {bond.name}
                </h4>
                <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {bond.issuer}
                </div>

                {/* Kupon & Tenor Box */}
                <div className="mt-2 p-2 rounded-xl bg-emerald-50/70 border border-emerald-100/70 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-slate-500 leading-none">Kupon (p.a.)</div>
                    <div className="text-sm sm:text-base font-black text-emerald-700 font-mono leading-tight mt-0.5">
                      {bond.coupon.toFixed(2)}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-slate-500 leading-none">Tenor</div>
                    <div className="text-xs font-bold text-slate-800 leading-tight mt-0.5">
                      {bond.tenor}
                    </div>
                  </div>
                </div>

                {/* Why Picked Excerpt */}
                <p className="mt-2 text-[10.5px] text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-100/80">
                  <strong className="text-slate-800 font-semibold">Why: </strong>
                  {bond.whyPicked}
                </p>
              </div>

              {/* Card Footer: Points & CTAs */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>+{bond.pointsReward} Pts</span>
                  </span>
                  <span className="text-slate-500 font-medium">
                    Min {formatRupiah(bond.minBuy, true)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenWhyBond(bond)}
                    className="py-1.5 px-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    Analisis
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectBond(bond)}
                    className="py-1.5 px-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors text-center cursor-pointer shadow-2xs active:scale-95"
                  >
                    Beli &rarr;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

