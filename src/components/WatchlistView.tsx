import React from 'react';
import { Star, TrendingUp, ArrowUp, ArrowDown, ChevronRight, Plus } from 'lucide-react';
import { STOCK_TICKERS, MUTUAL_FUNDS } from '../data/mockData';
import { formatRupiah, formatPercent } from '../utils/formatters';

interface WatchlistViewProps {
  onOpenThesis: (fundId: string) => void;
  onOpenJadiModal: () => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  onOpenThesis,
  onOpenJadiModal,
}) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Watchlist Saya</h2>
          <p className="text-[11px] text-slate-500">Daftar pantau saham & reksa dana pilihan</p>
        </div>
        <button 
          onClick={onOpenJadiModal}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 transition-colors"
        >
          + Keranjang JADI
        </button>
      </div>

      {/* Stocks Watchlist */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        <div className="p-3 bg-slate-50/70 text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>Saham Terpantau (IDX)</span>
          <span className="text-[10px] text-slate-400">Harga Terakhir</span>
        </div>

        {STOCK_TICKERS.slice(0, 4).map((stock) => {
          const isPos = stock.change >= 0;
          return (
            <div key={stock.code} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-900 font-mono">{stock.code}</span>
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-[150px]">{stock.name}</div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-slate-900 font-mono">{formatRupiah(stock.price)}</div>
                <div className={`text-[10px] font-semibold flex items-center justify-end gap-0.5 ${
                  isPos ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {isPos ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                  <span>{formatPercent(stock.changePercent)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mutual Funds Watchlist */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        <div className="p-3 bg-slate-50/70 text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>Reksa Dana Pilihan (Trima+ Picks)</span>
          <span className="text-[10px] text-slate-400">1Y Return</span>
        </div>

        {MUTUAL_FUNDS.slice(0, 3).map((fund) => (
          <div key={fund.id} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-900">{fund.name}</span>
              </div>
              <button 
                onClick={() => onOpenThesis(fund.id)}
                className="text-[10px] text-orange-600 hover:underline mt-0.5 font-semibold"
              >
                Lihat Thesis Analis &rarr;
              </button>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-emerald-600 font-mono">+{fund.return1Y}%</div>
              <div className="text-[10px] text-slate-400">{fund.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
