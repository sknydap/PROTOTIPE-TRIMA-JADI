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
    <div className="relative pt-2 pb-2.5 px-3.5 bg-gradient-to-b from-[#FFF8F2] via-[#FFFAF5] to-slate-50/60 border-b border-orange-100/60">
      {/* Top App Bar: Brand Logo & Right Action Icons */}
      <div className="flex items-center justify-between py-0.5">
        <div className="flex items-center min-w-0">
          <span className="text-orange-500 font-extrabold text-xl tracking-tight flex items-center leading-none mr-1 shrink-0">
            <span className="font-serif italic text-xl">α</span>
            <sup className="text-[10px] font-bold -top-1 text-orange-500">+</sup>
          </span>
          <div className="flex flex-col leading-none min-w-0">
            <span className="text-slate-900 font-black text-sm tracking-tight truncate">trima<span className="text-orange-500">+</span></span>
            <span className="text-[8px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5 truncate">by Trimegah Sekuritas</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-1">
          {/* Trimvestor Points Chip */}
          <button
            onClick={onOpenTrimvestorHub}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 hover:bg-slate-800 transition-colors shadow-2xs group cursor-pointer"
            title="Buka Trimvestor Hub"
          >
            <Sparkles className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-bold font-mono">{trimvestorPoints.toLocaleString('id-ID')}</span>
            <span className="text-[8px] font-medium text-slate-400">pts</span>
          </button>

          <button 
            onClick={() => onOpenQuickMenu('search')} 
            className="w-7 h-7 rounded-full bg-white hover:bg-orange-50 flex items-center justify-center text-slate-600 hover:text-orange-600 shadow-2xs border border-slate-200/80 transition-colors cursor-pointer"
            title="Cari instrumen"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => onOpenQuickMenu('notifications')} 
            className="w-7 h-7 rounded-full bg-white hover:bg-orange-50 flex items-center justify-center text-slate-600 hover:text-orange-600 shadow-2xs border border-slate-200/80 transition-colors relative cursor-pointer"
            title="Notifikasi"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
          </button>
          <button 
            onClick={() => onOpenQuickMenu('settings')} 
            className="w-7 h-7 rounded-full bg-white hover:bg-orange-50 flex items-center justify-center text-slate-600 hover:text-orange-600 shadow-2xs border border-slate-200/80 transition-colors cursor-pointer"
            title="Pengaturan"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Total Equity Section */}
      <div className="mt-2.5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <span>Total Equity</span>
          <button 
            onClick={() => setIsBalanceVisible(!isBalanceVisible)} 
            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            title={isBalanceVisible ? 'Sembunyikan Saldo' : 'Tampilkan Saldo'}
          >
            {isBalanceVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-baseline gap-2.5 mt-1">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            {isBalanceVisible ? formatRupiah(totalEquity) : 'Rp ••••••••••••'}
          </span>
          <span className="text-xs font-bold text-emerald-600 tabular-nums">
            {isBalanceVisible ? `+${formatRupiah(totalGain)} (${formatPercent(gainPercentage)})` : '+•••%'}
          </span>
        </div>
      </div>

      {/* Cash RDN Balance Card */}
      <div className="mt-2.5 bg-white rounded-2xl p-3 shadow-2xs border border-slate-100 flex items-center justify-between">
        <div>
          <div 
            onClick={() => onOpenQuickMenu('rdn-detail')} 
            className="flex items-center gap-1 text-[11px] font-medium text-slate-500 cursor-pointer hover:text-slate-800"
          >
            <span>Cash {accountNumber}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mt-0.5 font-mono">
            {isBalanceVisible ? formatRupiah(cashBalance) : 'Rp ••••••••'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => onOpenTopUp('topup')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold text-xs border border-orange-200 transition-colors cursor-pointer active:scale-95"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Top Up</span>
          </button>

          <button 
            onClick={() => onOpenTopUp('withdraw')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-colors cursor-pointer active:scale-95"
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Tarik</span>
          </button>
        </div>
      </div>

      {/* 4 Quick Actions Grid - Comfortable Scale & Senada Palette */}
      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {/* 1. Trima+ Picks */}
        <button 
          onClick={() => onOpenQuickMenu('picks')}
          className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-2xs">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10.5px] font-semibold text-slate-700 leading-tight">Trima+ Picks</span>
        </button>

        {/* 2. Insights */}
        <button 
          onClick={() => onOpenQuickMenu('insights')}
          className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-2xs">
            <Lightbulb className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10.5px] font-semibold text-slate-700 leading-tight">Insights</span>
        </button>

        {/* 3. Fast Order */}
        <button 
          onClick={() => onOpenQuickMenu('fast-order')}
          className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-2xs">
            <Zap className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10.5px] font-semibold text-slate-700 leading-tight">Fast Order</span>
        </button>

        {/* 4. TRIMA+ JADI (Highlighted Senada) */}
        <button 
          onClick={onOpenJadiModal}
          className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-2xl bg-gradient-to-b from-orange-50 to-orange-100/60 border border-orange-300 shadow-2xs hover:border-orange-400 transition-all relative overflow-hidden cursor-pointer active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4.5 h-4.5 fill-white" />
          </div>
          <span className="text-[10.5px] font-bold text-orange-700 leading-tight flex items-center gap-0.5">
            Trima+ JADI
          </span>
        </button>
      </div>
    </div>
  );
};

