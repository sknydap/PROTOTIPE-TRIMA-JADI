import React from 'react';
import { PieChart, Target, Plus, ShieldCheck, ArrowUpRight, ChevronRight, AlertTriangle } from 'lucide-react';
import { VirtualPocket } from '../types/trima';
import { formatRupiah, formatPercent } from '../utils/formatters';

interface PortfolioViewProps {
  totalEquity: number;
  cashBalance: number;
  pockets: VirtualPocket[];
  onOpenCreatePocket: () => void;
  onSelectPocket: (pocket: VirtualPocket) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  totalEquity,
  cashBalance,
  pockets,
  onOpenCreatePocket,
  onSelectPocket,
}) => {
  const pocketsTotal = pockets.reduce((acc, p) => acc + p.currentAmount, 0);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Portofolio Saya</h2>
          <p className="text-[11px] text-slate-500">Ringkasan aset, saldo RDN, dan alokasi kantong JADI</p>
        </div>
        <button
          onClick={onOpenCreatePocket}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors flex items-center gap-1 shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Kantong Baru</span>
        </button>
      </div>

      {/* Asset Summary Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Nilai Portofolio Konsolidasi</span>
          <span className="text-emerald-400 font-bold">+20.00%</span>
        </div>
        <div className="text-2xl font-black font-mono">
          {formatRupiah(totalEquity)}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
          <div>
            <span className="text-slate-400 text-[10px]">Kantong JADI (Investasi)</span>
            <div className="font-bold font-mono text-slate-200">{formatRupiah(pocketsTotal)}</div>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Cash RDN (Tersedia)</span>
            <div className="font-bold font-mono text-emerald-400">{formatRupiah(cashBalance)}</div>
          </div>
        </div>
      </div>

      {/* Virtual Pockets List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Target className="w-4 h-4 text-orange-500" />
            <span>Kantong Tujuan Finansial ({pockets.length})</span>
          </div>
          <span className="text-[10px] text-slate-400">Sub-Account Ledger</span>
        </div>

        {pockets.map((pocket) => {
          const progress = Math.min(100, Math.round((pocket.currentAmount / pocket.targetAmount) * 100));
          const hasDrift = pocket.status === 'drift-warning';

          return (
            <div
              key={pocket.id}
              onClick={() => onSelectPocket(pocket)}
              className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-orange-300 transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{pocket.name}</h4>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {pocket.portfolioName} · Target: {formatRupiah(pocket.targetAmount, true)}
                  </div>
                </div>

                {hasDrift ? (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    Drift Alert
                  </span>
                ) : (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    On-Track
                  </span>
                )}
              </div>

              <div className="flex items-baseline justify-between text-xs">
                <span className="font-mono font-bold text-slate-900">
                  {formatRupiah(pocket.currentAmount)}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  {progress}%
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className={`h-full ${hasDrift ? 'bg-amber-500' : 'bg-orange-500'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                <span>DCA: {formatRupiah(pocket.monthlyDca)}/bln</span>
                <span className="text-orange-600 font-bold flex items-center gap-0.5">
                  Buka Intelligence &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
