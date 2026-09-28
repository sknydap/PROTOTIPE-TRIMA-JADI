import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  PieChart, 
  SlidersHorizontal,
  ChevronRight,
  ArrowRight,
  Award,
  Zap,
  BookOpen,
  Calendar
} from 'lucide-react';
import { TrimvestorState, PremiumFeature, TrimvestorTier } from '../types/trima';
import { PREMIUM_FEATURES, MUTUAL_FUNDS, BOND_PICKS, STOCK_TICKERS } from '../data/mockData';
import { formatRupiah } from '../utils/formatters';

interface TrimvestorHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  trimvestor: TrimvestorState;
  onSimulateEarnPoints: (points: number, reason: string) => void;
  onOpenJadiModal: () => void;
}

type HubTab = 'tier-benefits' | 'how-to-earn' | 'fund-intel' | 'bond-intel' | 'portfolio-xray';

export const TrimvestorHubModal: React.FC<TrimvestorHubModalProps> = ({
  isOpen,
  onClose,
  trimvestor,
  onSimulateEarnPoints,
  onOpenJadiModal,
}) => {
  const [activeTab, setActiveTab] = useState<HubTab>('tier-benefits');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Screener state simulation
  const [screenerRisk, setScreenerRisk] = useState<string>('all');
  const [screenerMinReturn, setScreenerMinReturn] = useState<number>(0);

  if (!isOpen) return null;

  const pointsToPro = Math.max(0, trimvestor.nextTierPoints - trimvestor.points);
  const progressPercent = Math.min(100, Math.round((trimvestor.points / trimvestor.nextTierPoints) * 100));

  const tiers: { name: TrimvestorTier; level: number; minPoints: string; desc: string; color: string }[] = [
    { name: 'Investor', level: 1, minPoints: '0 Pts', desc: 'Fitur dasar bursa & transaksi', color: 'bg-slate-700' },
    { name: 'Explorer', level: 2, minPoints: '2.500 Pts', desc: 'Fund & Bond Screener, KeyStats emiten', color: 'bg-blue-600' },
    { name: 'Pro Investor', level: 3, minPoints: '10.000 Pts', desc: 'Advanced Chart, Valuation, Comparison Matrix, Portfolio X-Ray', color: 'bg-orange-500' },
    { name: 'Wealth', level: 4, minPoints: '15.000+ Pts', desc: 'Bond Ladder, Coupon Auto-Reinvest, Institutional Research', color: 'bg-purple-600' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Top Bar */}
        <div className="p-4 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex items-start justify-between rounded-t-3xl sm:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Crown className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black tracking-tight text-white">TRIMVESTOR</h3>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">
                  Tier {trimvestor.tier}
                </span>
              </div>
              <p className="text-[10px] text-slate-300 mt-0.5">
                Invest More · Learn More · Unlock More
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Points & Progress Banner */}
        <div className="bg-[#172033] px-4 py-3 border-t border-slate-800 text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Total Trimvestor Points
            </div>
            <div className="text-xl font-black font-mono text-amber-300">
              {trimvestor.points.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-300">Points</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-400">
              Menuju <strong className="text-white">Pro Investor</strong>
            </div>
            <div className="text-xs font-bold text-amber-300 mt-0.5">
              {pointsToPro.toLocaleString('id-ID')} pts lagi ({progressPercent}%)
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'tier-benefits' as HubTab, label: 'Katalog Fitur' },
            { id: 'how-to-earn' as HubTab, label: 'Cara Raih Poin' },
            { id: 'fund-intel' as HubTab, label: 'Fund Intelligence' },
            { id: 'bond-intel' as HubTab, label: 'Bond Intelligence' },
            { id: 'portfolio-xray' as HubTab, label: 'Portfolio X-Ray' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* ========================================================= */}
          {/* TAB 1: TIER CATALOG & BENEFITS                            */}
          {/* ========================================================= */}
          {activeTab === 'tier-benefits' && (
            <div className="space-y-4">
              {/* Tiers Progression Ladder */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900">Tier Level Trimvestor</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {tiers.map((t) => {
                    const isCurrent = trimvestor.tier === t.name;
                    return (
                      <div
                        key={t.name}
                        className={`p-2 rounded-xl border text-center relative ${
                          isCurrent
                            ? 'bg-orange-50/80 border-orange-400 ring-1 ring-orange-400 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {isCurrent && (
                          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1 bg-orange-500 text-white text-[7px] font-black rounded-full uppercase">
                            Aktif
                          </span>
                        )}
                        <div className="text-[10px] font-black">{t.name}</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">{t.minPoints}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Premium Features List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Daftar Fitur Premium Trima+</span>
                  <span className="text-[10px] text-slate-500">Otomatis Terbuka via Poin</span>
                </div>

                <div className="space-y-2">
                  {PREMIUM_FEATURES.map((feature) => (
                    <div
                      key={feature.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        feature.isUnlocked
                          ? 'bg-white border-slate-200 hover:border-orange-300 shadow-2xs'
                          : 'bg-slate-50/80 border-slate-200/60 opacity-80'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{feature.title}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-semibold">
                              {feature.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {feature.description}
                          </p>
                        </div>

                        {feature.isUnlocked ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 shrink-0 ml-2">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Terbuka</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold shrink-0 ml-2">
                            <Lock className="w-3 h-3" />
                            <span>{feature.badge}</span>
                          </span>
                        )}
                      </div>

                      {feature.isUnlocked && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-end">
                          <button
                            onClick={() => {
                              if (feature.category === 'Fund Intelligence') setActiveTab('fund-intel');
                              else if (feature.category === 'Bond Intelligence') setActiveTab('bond-intel');
                              else if (feature.category === 'Portfolio Intelligence') setActiveTab('portfolio-xray');
                            }}
                            className="text-[10px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-0.5"
                          >
                            <span>Gunakan Fitur Sekarang</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: CARA MENDAPATKAN POINTS (AUM FLYWHEEL)             */}
          {/* ========================================================= */}
          {activeTab === 'how-to-earn' && (
            <div className="space-y-4">
              <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
                <div className="font-bold text-orange-950 text-xs flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span>AUM Growth Engine: Bukan Sekadar Transaksi Churn</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Poin Trimvestor didesain untuk menghargai <strong>pertumbuhan dan ketahanan AUM</strong> jangka panjang, recurring investment (DCA), serta kepintaran riset finansial Anda.
                </p>
              </div>

              {/* 4 Point Pillars */}
              <div className="space-y-2.5">
                {/* Pillar A: Investment Activity */}
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">1. Aktivitas Investasi Baru</span>
                    <span className="text-[10px] font-bold text-emerald-600 font-mono">+350 s/d +1.000 Pts</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Beli Reksa Dana TAM kurasi Trima+ Picks atau pesan Obligasi SBN di pasar primer/sekunder.
                  </p>
                  <button
                    onClick={onOpenJadiModal}
                    className="text-[10px] font-bold text-orange-600 hover:underline flex items-center gap-0.5"
                  >
                    <span>Mulai Investasi via TRIMA+ JADI &rarr;</span>
                  </button>
                </div>

                {/* Pillar B: AUM-Based Holding Points */}
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">2. AUM-Based Retention Rewards</span>
                    <span className="text-[10px] font-bold text-amber-600 font-mono">+750 Pts / Bulan</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Dapatkan poin terus-menerus setiap bulan cukup dengan <strong>mempertahankan portofolio AUM</strong> Anda di Trima+. Trimegah mendorong <em>Hold & Grow</em>, bukan jual-beli impulsif.
                  </p>
                  <div className="text-[10px] text-slate-400 bg-slate-50 p-2 rounded-xl">
                    Portofolio Anda saat ini: <strong>Rp360.000.000</strong> (Multiplier 1.5x Aktif).
                  </div>
                </div>

                {/* Pillar C: Recurring Investment (Auto-DCA) */}
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">3. Recurring Investment (Auto-Debit DCA)</span>
                    <span className="text-[10px] font-bold text-sky-600 font-mono">+400 Pts / Eksekusi</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Pasang autodebet bulanan di kantong JADI. Setiap setoran rutin yang sukses dieksekusi memberikan bonus poin.
                  </p>
                </div>

                {/* Pillar D: Engagement & Research */}
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">4. Engagement & Riset Mandiri</span>
                    <span className="text-[10px] font-bold text-purple-600 font-mono">+100 s/d +150 Pts</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Lakukan Portfolio Check-Up berkala, baca Trimegah Morning Notes, atau buat Virtual Pocket baru.
                  </p>
                  <button
                    onClick={() => onSimulateEarnPoints(150, 'Menyelesaikan Portfolio Check-Up')}
                    className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg text-[10px] transition-colors"
                  >
                    Simulasikan: Lakukan Check-Up (+150 Pts)
                  </button>
                </div>
              </div>

              {/* Point Activity History */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-900">Riwayat Perolehan Poin Terakhir</div>
                <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                  {trimvestor.recentActivities.map((act) => (
                    <div key={act.id} className="p-2.5 flex items-center justify-between text-[11px]">
                      <div>
                        <div className="font-semibold text-slate-800">{act.title}</div>
                        <div className="text-[9px] text-slate-400">{act.category} · {act.date}</div>
                      </div>
                      <span className="font-bold text-emerald-600 font-mono">
                        +{act.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: FUND INTELLIGENCE (INTERACTIVE TOOL)               */}
          {/* ========================================================= */}
          {activeTab === 'fund-intel' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Fund Screener Multi-Kriteria</h4>
                  <p className="text-[10px] text-slate-500">Saring Reksa Dana TAM berdasarkan Sharpe & return</p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Unlocked via Explorer
                </span>
              </div>

              {/* Interactive Screener Controls */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">Filter Tipe Aset</span>
                  <div className="flex gap-1 text-[10px]">
                    {['all', 'Pasar Uang', 'Pendapatan Tetap', 'Saham'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setScreenerRisk(type)}
                        className={`px-2 py-0.5 rounded-md ${
                          screenerRisk === type
                            ? 'bg-orange-500 text-white font-bold'
                            : 'bg-white border text-slate-600'
                        }`}
                      >
                        {type === 'all' ? 'Semua' : type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">Min. 1Y Return</span>
                  <div className="flex gap-1 text-[10px]">
                    {[0, 5, 10, 15].map((ret) => (
                      <button
                        key={ret}
                        onClick={() => setScreenerMinReturn(ret)}
                        className={`px-2 py-0.5 rounded-md ${
                          screenerMinReturn === ret
                            ? 'bg-orange-500 text-white font-bold'
                            : 'bg-white border text-slate-600'
                        }`}
                      >
                        &gt; {ret}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filtered Funds Table */}
              <div className="space-y-2">
                {MUTUAL_FUNDS.filter(f => 
                  (screenerRisk === 'all' || f.type === screenerRisk) && 
                  f.return1Y >= screenerMinReturn
                ).map((fund) => (
                  <div key={fund.id} className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between hover:border-orange-300 transition-colors">
                    <div>
                      <div className="font-bold text-slate-900">{fund.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {fund.type} · AUM: {fund.aum}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600 font-mono">+{fund.return1Y}% 1Y</div>
                      <div className="text-[9px] text-amber-600 font-semibold">+{fund.pointsReward} Pts</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fund Comparison Matrix Feature Preview */}
              <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-blue-950 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>Head-to-Head Comparison Matrix</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-200 text-blue-900 font-bold">
                    Tier Pro Preview
                  </span>
                </div>
                <div className="overflow-x-auto text-[10px]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-blue-200/80 text-blue-800">
                        <th className="py-1">Metrik</th>
                        <th className="py-1">Trimegah Kas 2</th>
                        <th className="py-1">Trimegah Fixed Inc.</th>
                        <th className="py-1">Tram Alpha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-100">
                      <tr>
                        <td className="py-1 font-semibold">1Y Return</td>
                        <td className="text-emerald-700 font-bold font-mono">5.65%</td>
                        <td className="text-emerald-700 font-bold font-mono">8.85%</td>
                        <td className="text-emerald-700 font-bold font-mono">17.40%</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-semibold">AUM</td>
                        <td>Rp3.42 T</td>
                        <td>Rp2.18 T</td>
                        <td>Rp1.95 T</td>
                      </tr>
                      <tr>
                        <td className="py-1 font-semibold">Sharpe Ratio</td>
                        <td>2.45</td>
                        <td>1.82</td>
                        <td>1.64</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: BOND INTELLIGENCE (LADDER & COUPON CALENDAR)       */}
          {/* ========================================================= */}
          {activeTab === 'bond-intel' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Bond Ladder Visualizer</h4>
                  <p className="text-[10px] text-slate-500">Distribusi jatuh tempo & stabilitas kupon pasif</p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Fixed Income TAM
                </span>
              </div>

              {/* Bond Ladder Graphic representation */}
              <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-3">
                <div className="text-[11px] font-semibold text-slate-300">
                  Pemetaan Jatuh Tempo Portofolio Obligasi:
                </div>
                <div className="space-y-2 text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="w-12 font-mono text-amber-300 font-bold">2026</span>
                    <div className="flex-1 bg-slate-800 rounded-full h-4 relative flex items-center px-2">
                      <div className="bg-emerald-500 h-full rounded-full w-2/5" />
                      <span className="absolute left-3 text-[9px] font-bold">Sukuk SR019 (6.35%)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 font-mono text-amber-300 font-bold">2028</span>
                    <div className="flex-1 bg-slate-800 rounded-full h-4 relative flex items-center px-2">
                      <div className="bg-sky-500 h-full rounded-full w-3/5" />
                      <span className="absolute left-3 text-[9px] font-bold">Obligasi Chandra Asri (8.25%)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 font-mono text-amber-300 font-bold">2033</span>
                    <div className="flex-1 bg-slate-800 rounded-full h-4 relative flex items-center px-2">
                      <div className="bg-orange-500 h-full rounded-full w-full" />
                      <span className="absolute left-3 text-[9px] font-bold">SBN FR0096 (7.00%)</span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                  Struktur ladder memastikan aliran kas kupon diterima setiap kuartal tanpa jeda likuiditas.
                </div>
              </div>

              {/* Coupon Calendar projection */}
              <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>Proyeksi Penerimaan Kupon Bulanan</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800">
                    Estimasi Rp4.850.000 / bln
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Kupon dibayarkan langsung ke Cash RDN FAC0127 dan dapat otomatis di-reinvestasikan ke Reksa Dana Pasar Uang.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: PORTFOLIO X-RAY & GOAL ALIGNMENT                   */}
          {/* ========================================================= */}
          {activeTab === 'portfolio-xray' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold">Portfolio X-Ray Transparency</h4>
                    <p className="text-[10px] text-slate-400">Konsolidasi seluruh aset & kesesuaian target</p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 font-mono">
                    87% Aligned
                  </span>
                </div>

                {/* Asset Class Split */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-300 mb-1">
                    <span>Komposisi Kelas Aset</span>
                    <span>100% Total</span>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden w-full">
                    <div className="h-full bg-orange-500 w-[40%]" title="Saham 40%" />
                    <div className="h-full bg-emerald-500 w-[35%]" title="Reksa Dana 35%" />
                    <div className="h-full bg-sky-500 w-[20%]" title="Obligasi SBN 20%" />
                    <div className="h-full bg-slate-400 w-[5%]" title="Cash 5%" />
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[9px] text-slate-300">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> Saham 40%</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> RD 35%</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500" /> Obligasi 20%</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Cash 5%</span>
                  </div>
                </div>

                {/* Sector Exposure */}
                <div className="pt-2 border-t border-slate-800 text-[10px] space-y-1">
                  <div className="text-slate-400 font-semibold">Eksposur Sektoral Utama:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-800 p-2 rounded-lg">
                      <div className="text-slate-400">Financials</div>
                      <div className="font-bold text-white font-mono">42.5%</div>
                    </div>
                    <div className="bg-slate-800 p-2 rounded-lg">
                      <div className="text-slate-400">Consumer</div>
                      <div className="font-bold text-white font-mono">22.8%</div>
                    </div>
                    <div className="bg-slate-800 p-2 rounded-lg">
                      <div className="text-slate-400">Gov. SBN</div>
                      <div className="font-bold text-white font-mono">20.0%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal Alignment Advice */}
              <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 text-orange-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span>Keselarasan dengan TRIMA+ JADI</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Portofolio Anda 87% selaras dengan profil risiko Moderat. Alokasikan Rp25 juta kas sisa ke Trimegah Fixed Income Plan untuk mencapai 95% alignment sempurna & percepat pembukaan Tier Pro Investor.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-[10px] text-slate-500">
            TRIMVESTOR Loyalty & Engagement Platform
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Tutup Hub
          </button>
        </div>
      </div>
    </div>
  );
};
