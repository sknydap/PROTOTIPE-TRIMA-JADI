import React, { useState } from 'react';
import { Search, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { STOCK_TICKERS, MUTUAL_FUNDS } from '../data/mockData';
import { formatRupiah } from '../utils/formatters';

interface SearchViewProps {
  onOpenThesis: (fundId: string) => void;
  onOpenJadiModal: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  onOpenThesis,
  onOpenJadiModal,
}) => {
  const [query, setQuery] = useState('');

  const filteredStocks = STOCK_TICKERS.filter(s => 
    s.code.toLowerCase().includes(query.toLowerCase()) || 
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFunds = MUTUAL_FUNDS.filter(f => 
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari emiten, reksa dana TAM, obligasi..."
          className="w-full pl-9 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-2xs"
          autoFocus
        />
      </div>

      {/* Suggested Fast Goals Banner */}
      <div 
        onClick={onOpenJadiModal}
        className="p-3 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/15 to-orange-500/10 border border-orange-200 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Cari Berdasarkan Tujuan Finansial?</div>
            <div className="text-[10px] text-slate-500">Gunakan TRIMA+ JADI untuk rekomendasi otomatis</div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-orange-600" />
      </div>

      {/* Stocks Result */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-900">Saham (IDX)</h4>
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredStocks.map((stock) => (
            <div key={stock.code} className="p-3 flex items-center justify-between hover:bg-slate-50">
              <div>
                <span className="text-xs font-bold text-slate-900 font-mono">{stock.code}</span>
                <p className="text-[11px] text-slate-500">{stock.name}</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900 font-mono">{formatRupiah(stock.price)}</div>
                <div className="text-[10px] text-slate-400">Vol: {stock.volume}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Funds Result */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-900">Reksa Dana PT Trimegah Asset Management</h4>
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredFunds.map((fund) => (
            <div key={fund.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
              <div>
                <span className="text-xs font-bold text-slate-900">{fund.name}</span>
                <p className="text-[10px] text-slate-500">{fund.type} · {fund.aum}</p>
                <button 
                  onClick={() => onOpenThesis(fund.id)} 
                  className="text-[10px] text-orange-600 font-semibold hover:underline mt-0.5"
                >
                  Thesis Analis &rarr;
                </button>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-600 font-mono">+{fund.return1Y}%</div>
                <div className="text-[10px] text-slate-400">1Y Return</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
