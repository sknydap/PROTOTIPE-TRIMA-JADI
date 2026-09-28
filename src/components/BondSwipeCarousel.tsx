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
    <div className="px-3.5 pt-1.5 pb-1 space-y-1">
      {/* Header with Senada Colors */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <h3 className="text-xs font-bold text-slate-900">
                Pilihan SUN, SBN & Obligasi
              </h3>
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-orange-50 text-orange-700 border border-orange-200/50">
                Primary Dealer
              </span>
            </div>
            <p className="text-[9.5px] text-slate-400 mt-0.5 leading-none">
              Kupon terproteksi negara & reward Trimvestor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 text-[9.5px] text-slate-400 font-medium">
          <span>Geser</span>
          <ArrowRight className="w-3 h-3 text-orange-500" />
        </div>
      </div>

      {/* Horizontal Swipe Carousel (Compact, No overlap, Senada) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 pt-0.5">
        {BOND_PICKS.map((bond) => {
          const isGov = bond.type.includes('Pemerintah') || bond.type.includes('Sukuk');

          return (
            <div
              key={bond.id}
              className="w-[205px] snap-center shrink-0 p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-orange-300 transition-all flex flex-col justify-between text-xs group"
            >
              <div>
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded-md ${
                    isGov ? 'bg-orange-50 text-orange-700 border border-orange-200/40' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {bond.type}
                  </span>
                  <span className="text-[8.5px] font-bold text-slate-500 font-mono">
                    {bond.rating}
                  </span>
                </div>

                {/* Bond Name */}
                <h4 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {bond.name}
                </h4>
                <div className="text-[9.5px] text-slate-400 line-clamp-1">
                  {bond.issuer}
                </div>

                {/* Kupon & Tenor Box */}
                <div className="mt-1.5 p-1.5 rounded-lg bg-emerald-50/60 border border-emerald-100/70 flex items-center justify-between">
                  <div>
                    <div className="text-[7.5px] text-slate-400 leading-none">Kupon (p.a.)</div>
                    <div className="text-xs font-black text-emerald-700 font-mono leading-tight mt-0.5">
                      {bond.coupon.toFixed(2)}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[7.5px] text-slate-400 leading-none">Tenor</div>
                    <div className="text-[9.5px] font-bold text-slate-700 leading-tight mt-0.5">
                      {bond.tenor}
                    </div>
                  </div>
                </div>

                {/* Why Picked Excerpt */}
                <p className="mt-1.5 text-[9.5px] text-slate-600 line-clamp-2 leading-tight bg-slate-50 p-1.5 rounded-lg border border-slate-100/80">
                  <strong className="text-slate-800 font-semibold">Why: </strong>
                  {bond.whyPicked}
                </p>
              </div>

              {/* Card Footer: Points & CTAs */}
              <div className="mt-2 pt-1.5 border-t border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-[8.5px]">
                  <span className="font-bold text-amber-600 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    <span>+{bond.pointsReward} Pts</span>
                  </span>
                  <span className="text-slate-400 font-medium">
                    Min {formatRupiah(bond.minBuy, true)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => onOpenWhyBond(bond)}
                    className="py-1 px-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[9.5px] transition-colors cursor-pointer text-center"
                  >
                    Analisis
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectBond(bond)}
                    className="py-1 px-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-[9.5px] transition-colors text-center cursor-pointer shadow-2xs active:scale-95"
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

