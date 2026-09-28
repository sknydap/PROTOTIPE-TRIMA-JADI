import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Search, 
  Bell, 
  Settings, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Lightbulb, 
  Zap, 
  Sparkles
} from 'lucide-react';
import { formatRupiah, formatPercent } from '../utils/formatters';

interface HeaderProps {
  totalEquity: number;
  totalGain: number;
  gainPercentage: number;
  cashBalance: number;
  accountNumber: string;
  trimvestorPoints: number;
  trimvestorTier: string;
  onOpenJadiModal: () => void;
  onOpenTopUp: (action: 'topup' | 'withdraw') => void;
  onOpenQuickMenu: (menu: string) => void;
  onOpenTrimvestorHub: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalEquity,
  totalGain,
  gainPercentage,
  cashBalance,
  accountNumber,
  trimvestorPoints,
  onOpenJadiModal,
  onOpenTopUp,
  onOpenQuickMenu,
  onOpenTrimvestorHub,
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  return (
    <div className="relative pt-1 pb-2 px-3.5 bg-gradient-to-b from-[#FFF8F2] via-[#FFFAF5] to-slate-50/60 border-b border-orange-100/50">
      {/* Top App Bar: Brand Logo & Right Action Icons */}
      <div className="flex items-center justify-between py-0.5">
        <div className="flex items-center">
          <span className="text-orange-500 font-extrabold text-lg tracking-tight flex items-center leading-none mr-1">
            <span className="font-serif italic text-lg">α</span>
            <sup className="text-[9px] font-bold -top-1 text-orange-500">+</sup>
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-slate-900 font-black text-sm tracking-tight">trima<span className="text-orange-500">+</span></span>
            <span className="text-[7.5px] font-semibold text-slate-400 tracking-wider uppercase">by Trimegah Sekuritas</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Trimvestor Points Chip */}
          <button
            onClick={onOpenTrimvestorHub}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 hover:bg-slate-800 transition-colors shadow-2xs group cursor-pointer"
            title="Buka Trimvestor Hub"
          >
            <Sparkles className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold font-mono">{trimvestorPoints.toLocaleString('id-ID')}</span>
            <span className="text-[8px] font-medium text-slate-400">pts</span>
          </button>

          <button 
            onClick={() => onOpenQuickMenu('search')} 
            className="w-6.5 h-6.5 rounded-full bg-white hover:bg-orange-50 flex items-center justify-center text-slate-600 hover:text-orange-600 shadow-2xs border border-slate-200/70 transition-colors cursor-pointer"
            title="Cari instrumen"
          >
            <Search className="w-3 h-3" />
          </button>
          <button 
            onClick={() => onOpenQuickMenu('notifications')} 
            className="w-6.5 h-6.5 rounded-full bg-white hover:bg-orange-50 flex items-center justify-center text-slate-600 hover:text-orange-600 shadow-2xs border border-slate-200/70 transition-colors relative cursor-pointer"
            title="Notifikasi"
          >
            <Bell className="w-3 h-3" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
          </button>
          <button 
            onClick={() => onOpenQuickMenu('settings')} 
            className="w-6.5 h-6.5 rounded-full bg-white hover:bg-orange-50 flex items-center justify-center text-slate-600 hover:text-orange-600 shadow-2xs border border-slate-200/70 transition-colors cursor-pointer"
            title="Pengaturan"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Total Equity Section */}
      <div className="mt-1.5">
        <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-slate-500">
          <span>Total Equity</span>
          <button 
            onClick={() => setIsBalanceVisible(!isBalanceVisible)} 
            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            title={isBalanceVisible ? 'Sembunyikan Saldo' : 'Tampilkan Saldo'}
          >
            {isBalanceVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          </button>
        </div>

        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-sans">
            {isBalanceVisible ? formatRupiah(totalEquity) : 'Rp ••••••••••••'}
          </span>
          <span className="text-[10.5px] font-bold text-emerald-600 tabular-nums">
            {isBalanceVisible ? `+${formatRupiah(totalGain)} (${formatPercent(gainPercentage)})` : '+•••%'}
          </span>
        </div>
      </div>

      {/* Cash RDN Balance Card */}
      <div className="mt-2 bg-white rounded-xl p-2 shadow-2xs border border-slate-100 flex items-center justify-between">
        <div>
          <div 
            onClick={() => onOpenQuickMenu('rdn-detail')} 
            className="flex items-center gap-0.5 text-[9.5px] font-medium text-slate-500 cursor-pointer hover:text-slate-800"
          >
            <span>Cash {accountNumber}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight mt-0.5 font-mono">
            {isBalanceVisible ? formatRupiah(cashBalance) : 'Rp ••••••••'}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => onOpenTopUp('topup')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold text-[10px] border border-orange-200 transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-3 h-3" />
            <span>Top Up</span>
          </button>

          <button 
            onClick={() => onOpenTopUp('withdraw')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200 transition-colors cursor-pointer"
          >
            <ArrowDownLeft className="w-3 h-3" />
            <span>Tarik</span>
          </button>
        </div>
      </div>

      {/* 4 Quick Actions Grid - Compact & Senada Palette */}
      <div className="grid grid-cols-4 gap-1.5 mt-2">
        {/* 1. Trima+ Picks */}
        <button 
          onClick={() => onOpenQuickMenu('picks')}
          className="flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl bg-white border border-slate-100 shadow-2xs hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer active:scale-95"
        >
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9.5px] font-semibold text-slate-700 leading-tight">Trima+ Picks</span>
        </button>

        {/* 2. Insights */}
        <button 
          onClick={() => onOpenQuickMenu('insights')}
          className="flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl bg-white border border-slate-100 shadow-2xs hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer active:scale-95"
        >
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9.5px] font-semibold text-slate-700 leading-tight">Insights</span>
        </button>

        {/* 3. Fast Order */}
        <button 
          onClick={() => onOpenQuickMenu('fast-order')}
          className="flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl bg-white border border-slate-100 shadow-2xs hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer active:scale-95"
        >
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <span className="text-[9.5px] font-semibold text-slate-700 leading-tight">Fast Order</span>
        </button>

        {/* 4. TRIMA+ JADI (Highlighted Senada) */}
        <button 
          onClick={onOpenJadiModal}
          className="flex flex-col items-center gap-1 py-1.5 px-1 rounded-xl bg-gradient-to-b from-orange-50 to-orange-100/60 border border-orange-300/80 shadow-2xs hover:border-orange-400 transition-all relative overflow-hidden cursor-pointer active:scale-95"
        >
          <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-white" />
          </div>
          <span className="text-[9.5px] font-bold text-orange-700 leading-tight flex items-center gap-0.5">
            Trima+ JADI
          </span>
        </button>
      </div>
    </div>
  );
};

