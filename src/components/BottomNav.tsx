import React from 'react';
import { Home, Star, Plus, Search, PieChart, ArrowLeftRight } from 'lucide-react';

export type NavTab = 'beranda' | 'watchlist' | 'cari' | 'portofolio';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  onOpenAddPocket: () => void;
  pocketsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onOpenAddPocket,
  pocketsCount,
}) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-3px_10px_rgba(0,0,0,0.03)] w-full shrink-0">
      <div className="grid grid-cols-5 items-center h-14 px-1">
        {/* 1. Beranda */}
        <button
          onClick={() => onChangeTab('beranda')}
          className="flex flex-col items-center justify-center py-1 text-center transition-colors group cursor-pointer"
        >
          <div className="relative">
            <span className={`text-lg font-bold ${
              activeTab === 'beranda' ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
            }`}>
              α<sup className="text-[9px]">+</sup>
            </span>
          </div>
          <span className={`text-[9.5px] font-semibold tracking-tight ${
            activeTab === 'beranda' ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
          }`}>
            Beranda
          </span>
        </button>

        {/* 2. Watchlist */}
        <button
          onClick={() => onChangeTab('watchlist')}
          className="flex flex-col items-center justify-center py-1 text-center transition-colors group cursor-pointer"
        >
          <Star className={`w-4.5 h-4.5 ${
            activeTab === 'watchlist' ? 'text-orange-500 fill-orange-500' : 'text-slate-400 group-hover:text-slate-600'
          }`} />
          <span className={`text-[9.5px] font-semibold mt-0.5 tracking-tight ${
            activeTab === 'watchlist' ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
          }`}>
            Watchlist
          </span>
        </button>

        {/* 3. Center [+] Tombol Tambah Alokasi Pocket / Investment Basket */}
        <div className="flex flex-col items-center justify-center -mt-4 relative">
          <button
            onClick={onOpenAddPocket}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 border-3 border-white active:scale-90 hover:scale-105 transition-all group cursor-pointer"
            title="Tambah Kantong JADI / Investment Basket"
          >
            <Plus className="w-5 h-5 stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <span className="text-[8.5px] font-bold text-orange-600 tracking-tight mt-0.5 whitespace-nowrap">
            + Pocket
          </span>
        </div>

        {/* 4. Cari (Shifted to right of [+] per user instruction) */}
        <button
          onClick={() => onChangeTab('cari')}
          className="flex flex-col items-center justify-center py-1 text-center transition-colors group cursor-pointer"
        >
          <Search className={`w-4.5 h-4.5 ${
            activeTab === 'cari' ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
          }`} />
          <span className={`text-[9.5px] font-semibold mt-0.5 tracking-tight ${
            activeTab === 'cari' ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
          }`}>
            Cari
          </span>
        </button>

        {/* 5. Portofolio */}
        <button
          onClick={() => onChangeTab('portofolio')}
          className="flex flex-col items-center justify-center py-1 text-center transition-colors group relative cursor-pointer"
        >
          <PieChart className={`w-4.5 h-4.5 ${
            activeTab === 'portofolio' ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
          }`} />
          <span className={`text-[9.5px] font-semibold mt-0.5 tracking-tight ${
            activeTab === 'portofolio' ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
          }`}>
            Portofolio
          </span>
          {pocketsCount > 0 && (
            <span className="absolute top-1 right-2.5 px-1 min-w-3.5 h-3.5 rounded-full bg-orange-500 text-white text-[8px] font-bold flex items-center justify-center ring-2 ring-white">
              {pocketsCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
