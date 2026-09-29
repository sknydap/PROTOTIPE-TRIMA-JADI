import React, { useState } from 'react';
import { 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  SlidersHorizontal,
  Flame,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { IHSG_DATA, STOCK_TICKERS, ACTIVE_IPO, MUTUAL_FUNDS, BOND_PICKS } from '../data/mockData';
import { formatRupiah, formatPercent } from '../utils/formatters';

interface MarketOverviewProps {
  onOpenQuickMenu: (menu: string) => void;
  onOpenThesis: (fundId: string) => void;
  onSelectBondPick?: (bondId: string) => void;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({
  onOpenQuickMenu,
  onOpenThesis,
  onSelectBondPick,
}) => {
  const [activeAssetTab, setActiveAssetTab] = useState<'Saham' | 'Reksa Dana' | 'Obligasi'>('Saham');
  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | 'YTD' | '1Y' | '3Y' | '5Y' | '10Y'>('1D');
  const [activeFilter, setActiveFilter] = useState<'Gainer' | 'Loser' | 'Value' | 'Volume' | 'Frequency'>('Gainer');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample chart points depending on timeframe
  const chartPoints: { [key: string]: number[] } = {
    '1D': [8680, 8695, 8685, 8710, 8705, 8715, 8690, 8702, 8700.48],
    '1W': [8640, 8660, 8675, 8690, 8680, 8710, 8700.48],
    '1M': [8520, 8560, 8600, 8580, 8640, 8680, 8700.48],
    '3M': [8350, 8420, 8490, 8550, 8610, 8650, 8700.48],
    'YTD': [8200, 8310, 8450, 8520, 8600, 8680, 8700.48],
    '1Y': [7800, 7950, 8100, 8300, 8500, 8650, 8700.48],
    '3Y': [6900, 7100, 7400, 7800, 8200, 8500, 8700.48],
    '5Y': [6200, 6500, 6800, 7200, 7700, 8300, 8700.48],
    '10Y': [5100, 5600, 6100, 6600, 7200, 7900, 8700.48],
  };

  const points = chartPoints[activeTimeframe] || chartPoints['1D'];
  const minVal = Math.min(...points) - 10;
  const maxVal = Math.max(...points) + 10;
  const range = maxVal - minVal || 1;

  // Generate SVG path coordinates
  const svgWidth = 320;
  const svgHeight = 90;
  const pathCoordinates = points.map((p, idx) => {
    const x = (idx / (points.length - 1)) * svgWidth;
    const y = svgHeight - ((p - minVal) / range) * (svgHeight - 15) - 5;
    return `${x},${y}`;
  });

  const linePath = `M ${pathCoordinates.join(' L ')}`;
  const areaPath = `M 0,${svgHeight} L ${pathCoordinates.join(' L ')} L ${svgWidth},${svgHeight} Z`;

  // Filter stocks
  const filteredStocks = [...STOCK_TICKERS].sort((a, b) => {
    if (activeFilter === 'Gainer') return b.changePercent - a.changePercent;
    if (activeFilter === 'Loser') return a.changePercent - b.changePercent;
    if (activeFilter === 'Value') return parseFloat(b.value) - parseFloat(a.value);
    return parseFloat(b.volume) - parseFloat(a.volume);
  });

  return (
    <div className="px-4 py-2 space-y-3">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari Saham, Reksa Dana, atau Obligasi"
          className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-2xs text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Asset Segmented Tabs: Saham, Reksa Dana, Obligasi */}
      <div className="border-b border-slate-200/80">
        <div className="flex gap-6 text-xs sm:text-sm font-semibold">
          {(['Saham', 'Reksa Dana', 'Obligasi'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveAssetTab(tab)}
              className={`pb-2 transition-all relative cursor-pointer ${
                activeAssetTab === tab
                  ? 'text-orange-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab}</span>
              {activeAssetTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* IHSG Market Index Card & Chart */}
      {activeAssetTab === 'Saham' && (
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>{IHSG_DATA.code}</span>
                <span className="text-xs font-normal text-slate-400">{IHSG_DATA.name}</span>
              </div>
              <div className="flex items-baseline gap-2.5 mt-1">
                <span className="text-xl font-black text-slate-900 tabular-nums font-mono">
                  {IHSG_DATA.current.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-bold text-emerald-600 tabular-nums">
                  +{IHSG_DATA.change.toLocaleString('id-ID', { minimumFractionDigits: 2 })} (+{IHSG_DATA.changePercent.toLocaleString('id-ID', { minimumFractionDigits: 2 })}%)
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic SVG Area Chart */}
          <div className="mt-2.5 relative h-24 w-full">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ihsgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#ihsgGradient)" />
              <path d={linePath} fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Timeframe Chips */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar gap-1 text-[10px] font-semibold text-slate-600">
            {(['1D', '1W', '1M', '3M', 'YTD', '1Y', '3Y', '5Y', '10Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  activeTimeframe === tf
                    ? 'bg-orange-50 text-orange-600 font-bold border border-orange-200'
                    : 'hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Market Stats Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Prev</span>
              <span className="font-semibold text-slate-700 tabular-nums">{IHSG_DATA.prev.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Open</span>
              <span className="font-semibold text-slate-700 tabular-nums">{IHSG_DATA.open.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>High</span>
              <span className="font-semibold text-slate-700 tabular-nums">{IHSG_DATA.high.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Low</span>
              <span className="font-semibold text-slate-700 tabular-nums">{IHSG_DATA.low.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}

      {/* Reksa Dana Tab Content */}
      {activeAssetTab === 'Reksa Dana' && (
        <div className="space-y-3">
          {/* Fund of the Week Spotlight Card per Prompt Feature #1 */}
          <div className="p-3.5 bg-gradient-to-r from-orange-500/10 via-amber-500/15 to-orange-500/10 rounded-2xl border border-orange-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
              <span className="flex items-center gap-1.5 text-orange-700">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Fund of the Week (Spotlight)
              </span>
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                +600 Trimvestor Pts
              </span>
            </div>
            <div className="text-sm font-extrabold text-slate-900">Trimegah Fixed Income Plan</div>
            <p className="text-[10px] text-slate-600 mt-0.5">
              Momentum pemangkasan suku bunga BI: Obligasi pemerintah FR berdurasi menengah & yield kompetitif.
            </p>
            <div className="mt-2 flex items-center justify-between pt-2 border-t border-orange-200/60">
              <div className="text-xs font-bold text-emerald-600 font-mono">+8.85% 1Y Return</div>
              <button
                onClick={() => onOpenThesis('tam-fixed-income')}
                className="px-2.5 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] transition-colors"
              >
                Lihat Analisis Analis &rarr;
              </button>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
            <span>Trima+ Fund Picks (Kurasi TAM)</span>
            <span className="text-[10px] text-orange-600 font-semibold">Semua Produk Terkurasi</span>
          </div>

          {MUTUAL_FUNDS.map((fund) => (
            <div 
              key={fund.id}
              className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-orange-300 transition-all"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">{fund.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 font-semibold">
                    {fund.type}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  AUM: {fund.aum} · NAB: {formatRupiah(fund.nav)}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => onOpenThesis(fund.id)}
                    className="text-[10px] font-bold text-orange-600 hover:text-orange-700 underline"
                  >
                    Why Picked? (Thesis)
                  </button>
                  <span className="text-[9px] text-amber-600 font-semibold">
                    +{fund.pointsReward} Pts
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-emerald-600 tabular-nums">
                  +{fund.return1Y.toFixed(2)}%
                </div>
                <div className="text-[10px] text-slate-400">1Y Return</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Obligasi Tab Content: Trima+ Bond Picks */}
      {activeAssetTab === 'Obligasi' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">Trima+ Bond Picks (SBN & Korporasi)</div>
              <p className="text-[10px] text-slate-500">Pasar Perdana & Sekunder Trimegah Primary Dealer</p>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">Jaminan 100% UU</span>
          </div>

          <div className="space-y-2.5">
            {BOND_PICKS.map((bond) => (
              <div
                key={bond.id}
                className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all space-y-1.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{bond.name}</span>
                      <span className="text-[8px] px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                        {bond.rating}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">{bond.issuer}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-emerald-600 font-mono">
                      {bond.coupon.toFixed(2)}% p.a.
                    </div>
                    <div className="text-[9px] text-slate-400">Kupon Pasti</div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-xl">
                  <strong>Why Picked: </strong>{bond.whyPicked}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                  <span className="text-amber-600 font-bold">
                    +{bond.pointsReward} Trimvestor Points
                  </span>
                  <button
                    onClick={() => onSelectBondPick && onSelectBondPick(bond.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-colors"
                  >
                    Beli Obligasi &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mini Quick Access Pills: Trima+ Picks, Running Trade, Broker Ranking - Senada Colors */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onOpenQuickMenu('picks')}
          className="flex items-center justify-between p-2.5 bg-orange-50/70 rounded-2xl border border-orange-200/60 hover:bg-orange-100/60 transition-colors text-left cursor-pointer shadow-2xs group"
        >
          <span className="text-xs font-bold text-slate-800 leading-tight">Trima+<br />Picks</span>
          <div className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
        </button>

        <button
          onClick={() => onOpenQuickMenu('running-trade')}
          className="flex items-center justify-between p-2.5 bg-white rounded-2xl border border-slate-200/80 hover:border-orange-200 hover:bg-orange-50/30 transition-colors text-left cursor-pointer shadow-2xs group"
        >
          <span className="text-xs font-bold text-slate-800 leading-tight">Running<br />Trade</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 group-hover:text-orange-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
        </button>

        <button
          onClick={() => onOpenQuickMenu('broker-ranking')}
          className="flex items-center justify-between p-2.5 bg-white rounded-2xl border border-slate-200/80 hover:border-orange-200 hover:bg-orange-50/30 transition-colors text-left cursor-pointer shadow-2xs group"
        >
          <span className="text-xs font-bold text-slate-800 leading-tight">Broker<br />Ranking</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 group-hover:text-orange-600 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* 1 IPO Active Card - Senada Palette */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>1 IPO Tersedia</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-semibold border border-orange-200/50">
            {ACTIVE_IPO.status}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-sm">
              ⇄
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">{ACTIVE_IPO.code}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-tight">{ACTIVE_IPO.company}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-bold text-slate-900 tabular-nums font-mono leading-tight">
              {ACTIVE_IPO.priceRange}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">Harga Penawaran</div>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Periode: {ACTIVE_IPO.dates}</span>
          <span className="text-orange-600 font-bold cursor-pointer hover:underline">
            Pesan E-IPO &rarr;
          </span>
        </div>
      </div>

      {/* Most Active Section with filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900">Most Active</h4>
          <button 
            onClick={() => onOpenQuickMenu('all-stocks')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-0.5 cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
          {(['Gainer', 'Loser', 'Value', 'Volume', 'Frequency'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === filter
                  ? 'bg-orange-50 text-orange-600 font-bold border border-orange-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Stock Rows */}
        <div className="bg-white rounded-2xl divide-y divide-slate-100 border border-slate-200 shadow-2xs overflow-hidden">
          {filteredStocks.slice(0, 5).map((stock) => {
            const isPositive = stock.change >= 0;
            return (
              <div 
                key={stock.code}
                className="p-3 flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 font-mono">{stock.code}</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate max-w-[140px] sm:max-w-[200px] mt-0.5">
                    {stock.name}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900 tabular-nums font-mono leading-tight">
                    {formatRupiah(stock.price)}
                  </div>
                  <div className={`text-xs font-semibold tabular-nums flex items-center justify-end gap-0.5 mt-0.5 leading-tight ${
                    isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    <span>{isPositive ? '+' : ''}{stock.change} ({formatPercent(stock.changePercent)})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
