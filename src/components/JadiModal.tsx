import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Award, 
  Target, 
  Zap, 
  Clock, 
  Calculator, 
  CheckCircle2, 
  Info,
  Calendar,
  Layers,
  Activity,
  Compass
} from 'lucide-react';
import { RiskProfile, GoalCategory, VirtualPocket, ModelPortfolio, MutualFund } from '../types/trima';
import { MODEL_PORTFOLIOS, MUTUAL_FUNDS } from '../data/mockData';
import { formatRupiah, calculateRequiredMonthlyDca } from '../utils/formatters';

interface JadiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPocketCreated: (pocket: VirtualPocket, deductedCash: number) => void;
  onOpenThesis: (fundId: string) => void;
  cashBalance: number;
}

type Step = 'journey' | 'advisory' | 'decision' | 'executing' | 'intelligence';

export const JadiModal: React.FC<JadiModalProps> = ({
  isOpen,
  onClose,
  onPocketCreated,
  onOpenThesis,
  cashBalance,
}) => {
  // Wizard Stage
  const [currentStep, setCurrentStep] = useState<Step>('journey');

  // J - Journey Form State
  const [goalCategory, setGoalCategory] = useState<GoalCategory>('Rumah');
  const [goalName, setGoalName] = useState('Beli Rumah Impian');
  const [targetAmount, setTargetAmount] = useState<number>(200000000); // 200 Juta
  const [targetYears, setTargetYears] = useState<number>(3); // 3 Tahun (36 Bulan)
  const [initialDeposit, setInitialDeposit] = useState<number>(20000000); // 20 Juta

  // A - Advisory State
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('Moderat');

  // D - Decision State
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('balanced');
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [createdPocket, setCreatedPocket] = useState<VirtualPocket | null>(null);

  if (!isOpen) return null;

  // Selected Model Portfolio
  const activePortfolio = MODEL_PORTFOLIOS.find(p => p.id === selectedPortfolioId) || MODEL_PORTFOLIOS[1];

  // Live DCA Calculation based on active portfolio's expected return
  const totalMonths = targetYears * 12;
  const estimatedMonthlyDca = calculateRequiredMonthlyDca(
    targetAmount,
    initialDeposit,
    totalMonths,
    activePortfolio.expectedReturn
  );

  // Quick preset handlers
  const handlePresetSelect = (preset: { category: GoalCategory; name: string; defaultTarget: number; defaultYears: number }) => {
    setGoalCategory(preset.category);
    setGoalName(preset.name);
    setTargetAmount(preset.defaultTarget);
    setTargetYears(preset.defaultYears);
  };

  // Sync risk profile with portfolio
  const handleRiskSelect = (risk: RiskProfile) => {
    setRiskProfile(risk);
    if (risk === 'Konservatif') setSelectedPortfolioId('stability');
    if (risk === 'Moderat') setSelectedPortfolioId('balanced');
    if (risk === 'Agresif') setSelectedPortfolioId('growth');
  };

  // Execute Direct 1-Click Order (Basket Order Engine)
  const handleExecuteBasketOrder = () => {
    setCurrentStep('executing');
    setExecutionLog([
      'Menginisialisasi Basket Order Engine TRIMA+ JADI...',
      `Memvalidasi saldo Cash RDN FAC0127 (${formatRupiah(initialDeposit)})...`,
    ]);

    setTimeout(() => {
      setExecutionLog(prev => [
        ...prev,
        'Memecah order atomic ke produk Trima+ Picks & TAM...',
        ...activePortfolio.allocations.map(
          a => `Routing order: ${formatRupiah((initialDeposit * a.percentage) / 100)} ke ${a.fundName} (${a.percentage}%)... Selesai`
        ),
      ]);
    }, 900);

    setTimeout(() => {
      setExecutionLog(prev => [
        ...prev,
        'Mengunci unit penyertaan ke Virtual Sub-Account Ledger...',
        'Mengaktifkan Intelligence Daemon & Auto-Debit DCA Engine...',
        'Status: Sukses! Kantong Investasi Aktif.',
      ]);

      // Construct Virtual Pocket
      const newPocket: VirtualPocket = {
        id: `pocket-${Date.now()}`,
        name: goalName,
        category: goalCategory,
        targetAmount,
        currentAmount: initialDeposit,
        initialDeposit,
        monthlyDca: estimatedMonthlyDca,
        targetMonths: totalMonths,
        elapsedMonths: 0,
        riskProfile,
        portfolioModelId: activePortfolio.id,
        portfolioName: activePortfolio.name,
        createdAt: new Date().toISOString().split('T')[0],
        autoDcaEnabled: true,
        autoDcaDate: 25,
        dcaSource: 'Cash RDN FAC0127',
        status: 'on-track',
        smartNudge: {
          type: 'positive',
          message: `Intelligence Aktif: Auto-debit DCA sebesar ${formatRupiah(estimatedMonthlyDca)} dijadwalkan tanggal 25 tiap bulan untuk menjaga lintasan target.`,
          actionLabel: 'Lihat Jadwal',
        },
        historicalTrajectory: [
          { month: 0, label: 'Bulan 0', targetVal: initialDeposit, actualVal: initialDeposit },
          { month: Math.round(totalMonths * 0.25), label: `Bln ${Math.round(totalMonths * 0.25)}`, targetVal: Math.round(targetAmount * 0.3), actualVal: 0 },
          { month: Math.round(totalMonths * 0.5), label: `Bln ${Math.round(totalMonths * 0.5)}`, targetVal: Math.round(targetAmount * 0.58), actualVal: 0 },
          { month: totalMonths, label: `Bln ${totalMonths} (Goal)`, targetVal: targetAmount, actualVal: 0 },
        ],
      };

      setCreatedPocket(newPocket);
      onPocketCreated(newPocket, initialDeposit);
      setCurrentStep('intelligence');
    }, 2200);
  };

  const stepsList: { key: Step; label: string; code: string }[] = [
    { key: 'journey', label: 'Journey', code: 'J' },
    { key: 'advisory', label: 'Advisory', code: 'A' },
    { key: 'decision', label: 'Decision', code: 'D' },
    { key: 'intelligence', label: 'Intelligence', code: 'I' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/65 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
              JADI
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900">TRIMA+ JADI</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700">
                  Goal-Based
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Journey · Advisory · Decision · Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          {stepsList.map((st, idx) => {
            const isCurrent = currentStep === st.key;
            const isCompleted = 
              (currentStep === 'advisory' && idx === 0) ||
              (currentStep === 'decision' && idx <= 1) ||
              ((currentStep === 'executing' || currentStep === 'intelligence') && idx <= 3);

            return (
              <div key={st.key} className="flex items-center gap-1.5 flex-1 justify-center first:justify-start last:justify-end">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isCurrent 
                    ? 'bg-orange-500 text-white shadow-xs' 
                    : isCompleted 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {isCompleted && !isCurrent ? <Check className="w-3 h-3 stroke-[3]" /> : st.code}
                </div>
                <span className={`text-[11px] font-semibold hidden xs:inline ${
                  isCurrent ? 'text-orange-600 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  {st.label}
                </span>
                {idx < stepsList.length - 1 && (
                  <div className="w-4 sm:w-6 h-0.5 bg-slate-200 mx-1" />
                )}
              </div>
            );
          })}
        </div>

        {/* Body Content by Step */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* ========================================================= */}
          {/* 3.1.1 STAGE 1: J - JOURNEY                                */}
          {/* ========================================================= */}
          {currentStep === 'journey' && (
            <div className="space-y-4 text-xs">
              <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100/90 text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-orange-950 mb-1">
                  <Compass className="w-4 h-4 text-orange-600" />
                  <span>J - Journey: Petakan Alur Perjalanan Finansial</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Tidak perlu pusing memilih ribuan produk. Cukup tentukan kantong tujuan (Virtual Pocket) yang ingin dicapai, sistem akan menghitung setoran optimalnya secara presisi.
                </p>
              </div>

              {/* Goal Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Pilih Kategori Tujuan Impian
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { category: 'Pendidikan' as GoalCategory, name: 'Dana Pendidikan Anak', defaultTarget: 120000000, defaultYears: 3 },
                    { category: 'Rumah' as GoalCategory, name: 'DP Rumah Impian 2028', defaultTarget: 200000000, defaultYears: 3 },
                    { category: 'Pensiun' as GoalCategory, name: 'Dana Pensiun Mandiri', defaultTarget: 500000000, defaultYears: 5 },
                    { category: 'Pernikahan' as GoalCategory, name: 'Pernikahan Bahagia', defaultTarget: 80000000, defaultYears: 2 },
                    { category: 'Kendaraan' as GoalCategory, name: 'Beli Mobil Keluarga', defaultTarget: 150000000, defaultYears: 2 },
                    { category: 'Kekayaan / Freedom' as GoalCategory, name: 'Financial Freedom Basket', defaultTarget: 1000000000, defaultYears: 7 },
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        goalName === preset.name
                          ? 'bg-orange-50 border-orange-400 text-orange-700 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[11px] leading-tight truncate">{preset.name}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">{preset.category}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nama Kantong Tujuan (Virtual Pocket)
                </label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  placeholder="Contoh: DP Rumah Impian"
                />
              </div>

              {/* Target Nominal (FV) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800">
                    Target Nominal Masa Depan ($FV$)
                  </label>
                  <span className="text-xs font-extrabold text-orange-600 font-mono">
                    {formatRupiah(targetAmount)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  {[50000000, 100000000, 250000000, 500000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTargetAmount(amt)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold border ${
                        targetAmount === amt
                          ? 'bg-orange-50 text-orange-600 border-orange-300'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {formatRupiah(amt, true)}
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="20000000"
                  max="1000000000"
                  step="10000000"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Jangka Waktu (t) & Dana Awal (PV) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Jangka Waktu ($t$)
                  </label>
                  <select
                    value={targetYears}
                    onChange={(e) => setTargetYears(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
                  >
                    <option value={1}>1 Tahun (12 bln)</option>
                    <option value={2}>2 Tahun (24 bln)</option>
                    <option value={3}>3 Tahun (36 bln)</option>
                    <option value={5}>5 Tahun (60 bln)</option>
                    <option value={7}>7 Tahun (84 bln)</option>
                    <option value={10}>10 Tahun (120 bln)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Dana Awal Disetor ($PV$)
                  </label>
                  <input
                    type="number"
                    step="1000000"
                    min="1000000"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none"
                  />
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Saldo Cash: {formatRupiah(cashBalance)}
                  </div>
                </div>
              </div>

              {/* Automated DCA Calculation Result Box */}
              <div className="p-3.5 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 rounded-2xl border border-orange-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Calculator className="w-4 h-4 text-orange-600" />
                  <span>Kalkulasi Setoran Rutin Bulanan (DCA)</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-orange-600 font-mono">
                    {formatRupiah(estimatedMonthlyDca)}
                    <span className="text-xs font-normal text-slate-500"> / bulan</span>
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                    Auto-Debit RDN
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-slate-500 leading-tight">
                  Perjalanan Finansial &rarr; Target Dana ({formatRupiah(targetAmount, true)}) &rarr; {totalMonths} Bulan &rarr; Kebutuhan DCA Rutin.
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3.1.2 STAGE 2: A - ADVISORY                               */}
          {/* ========================================================= */}
          {currentStep === 'advisory' && (
            <div className="space-y-4 text-xs">
              <div className="bg-sky-50/70 p-3 rounded-2xl border border-sky-100/90 text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-sky-950 mb-1">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>A - Advisory: Rekomendasi Trima+ Picks & TAM</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Sistem bertindak sebagai penasihat investasi cerdas. Menggabungkan profil toleransi risiko Anda dengan keahlian manajer investasi profesional PT Trimegah Asset Management (TAM).
                </p>
              </div>

              {/* Risk Profile Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Tentukan Profil Risiko Anda:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Konservatif', 'Moderat', 'Agresif'] as RiskProfile[]).map((risk) => (
                    <button
                      key={risk}
                      type="button"
                      onClick={() => handleRiskSelect(risk)}
                      className={`p-3 rounded-2xl text-center border transition-all ${
                        riskProfile === risk
                          ? 'bg-orange-50 border-orange-400 text-orange-700 font-bold shadow-2xs ring-1 ring-orange-400'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{risk}</div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {risk === 'Konservatif' && 'Volatilitas minimal'}
                        {risk === 'Moderat' && 'Seimbang & stabil'}
                        {risk === 'Agresif' && 'Pertumbuhan tinggi'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Integrated Products Showcase with "Mengapa Produk Ini?" */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Produk Reksa Dana Terkurasi untuk Profil Anda:
                  </span>
                  <span className="text-[10px] text-orange-600 font-semibold">
                    100% TAM Picks
                  </span>
                </div>

                {MUTUAL_FUNDS.map((fund) => (
                  <div 
                    key={fund.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-orange-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">{fund.name}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-semibold">
                            {fund.type}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          1Y Return: <strong className="text-emerald-600 font-mono">+{fund.return1Y}%</strong> · AUM: {fund.aum}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenThesis(fund.id)}
                        className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-[10px] border border-orange-200 transition-colors"
                      >
                        Mengapa Produk Ini?
                      </button>
                    </div>

                    <div className="mt-2 text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded-xl">
                      "{fund.thesis.summary}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3.1.3 STAGE 3: D - DECISION                               */}
          {/* ========================================================= */}
          {currentStep === 'decision' && (
            <div className="space-y-4 text-xs">
              <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/90 text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-1">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>D - Decision: Eksekusi Direct 1-Klik (Basket Order)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Tidak perlu membeli produk satu per satu. Melalui Basket Order Engine, sistem memecah setoran awal Anda secara serentak ke produk dalam keranjang, lalu mengunci unitnya ke dalam Virtual Pocket Anda.
                </p>
              </div>

              {/* 3 Curated Model Portfolios per Prompt */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Pilih Racikan Keranjang Portofolio:
                </label>

                {MODEL_PORTFOLIOS.map((portfolio) => {
                  const isSelected = selectedPortfolioId === portfolio.id;
                  return (
                    <div
                      key={portfolio.id}
                      onClick={() => setSelectedPortfolioId(portfolio.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-orange-50/50 border-orange-400 shadow-xs ring-1 ring-orange-400'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {portfolio.name}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-semibold">
                              {portfolio.profile} · {portfolio.horizon}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {portfolio.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-emerald-600 font-mono">
                            ~{portfolio.expectedReturn}%
                          </span>
                          <div className="text-[9px] text-slate-400">Exp. Return p.a.</div>
                        </div>
                      </div>

                      {/* Visual Allocation Bar */}
                      <div className="mt-3">
                        <div className="flex h-2.5 rounded-full overflow-hidden w-full">
                          {portfolio.allocations.map((alloc) => (
                            <div
                              key={alloc.type}
                              style={{ width: `${alloc.percentage}%`, backgroundColor: alloc.color }}
                              className="h-full first:rounded-l-full last:rounded-r-full"
                              title={`${alloc.type}: ${alloc.percentage}%`}
                            />
                          ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-600">
                          {portfolio.allocations.map((alloc) => (
                            <div key={alloc.type} className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: alloc.color }} />
                              <span>{alloc.type}: <strong>{alloc.percentage}%</strong></span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Direct 1-Click Order Summary & Breakdown */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Rincian Pembelian Direct 1-Klik</span>
                  <span className="font-mono text-orange-600">{formatRupiah(initialDeposit)}</span>
                </div>

                <div className="divide-y divide-slate-200/60 text-[11px]">
                  {activePortfolio.allocations.map((alloc) => {
                    const allocatedAmount = (initialDeposit * alloc.percentage) / 100;
                    return (
                      <div key={alloc.type} className="py-1.5 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-slate-800">{alloc.fundName}</span>
                          <span className="text-slate-400 text-[10px] ml-1">({alloc.percentage}%)</span>
                        </div>
                        <span className="font-mono font-bold text-slate-800">
                          {formatRupiah(allocatedAmount)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* EXECUTING BASKET ORDER ANIMATION                          */}
          {/* ========================================================= */}
          {currentStep === 'executing' && (
            <div className="py-8 space-y-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-500 text-white flex items-center justify-center animate-bounce shadow-lg shadow-orange-500/30">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Mengeksekusi Direct 1-Klik Basket Order
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Memecah order atomic ke seluruh produk Trima+ Picks & TAM...
                </p>
              </div>

              <div className="max-w-xs mx-auto text-left bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-[10px] space-y-1 overflow-hidden shadow-inner">
                {executionLog.map((log, i) => (
                  <div key={i} className="animate-in fade-in duration-300">
                    &gt; {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3.1.4 STAGE 4: I - INTELLIGENCE (SUCCESS STATE)            */}
          {/* ========================================================= */}
          {currentStep === 'intelligence' && createdPocket && (
            <div className="space-y-4 text-xs">
              <div className="text-center py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Kantong Investasi Berhasil Dibuat!
                </h4>
                <p className="text-xs text-slate-500">
                  Sistem Intelligence Daemon kini mengawal target Anda 24/7
                </p>
              </div>

              {/* Pocket Overview Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 rounded-2xl shadow-md">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Virtual Pocket</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    Intelligence On-Track
                  </span>
                </div>
                <div className="text-base font-extrabold">{createdPocket.name}</div>
                <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-slate-700/80">
                  <div>
                    <div className="text-[10px] text-slate-400">Modal Disetor</div>
                    <div className="text-sm font-bold font-mono text-emerald-400">
                      {formatRupiah(createdPocket.currentAmount)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Target Nominal (FV)</div>
                    <div className="text-sm font-bold font-mono">
                      {formatRupiah(createdPocket.targetAmount)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Intelligence 4 Pillars Highlight */}
              <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-blue-950">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Fitur Intelligence Aktif:</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Tracking Graph & Dynamic Valuation:</strong> NAB harian dipantau terhadap garis lintasan target.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Auto-Debit DCA Engine:</strong> Setoran {formatRupiah(createdPocket.monthlyDca)} terjadwal otomatis tiap tgl 25.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Dynamic Rebalancing (1-Klik):</strong> Notifikasi pintar otomatis saat terjadi deviasi porsi portofolio.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          {currentStep === 'journey' && (
            <button
              onClick={() => setCurrentStep('advisory')}
              className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
            >
              <span>Lanjut ke Tahap Advisory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {currentStep === 'advisory' && (
            <>
              <button
                onClick={() => setCurrentStep('journey')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={() => setCurrentStep('decision')}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
              >
                <span>Lanjut ke Decision & Eksekusi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {currentStep === 'decision' && (
            <>
              <button
                onClick={() => setCurrentStep('advisory')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleExecuteBasketOrder}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 active:scale-95 transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Jadikan Investasi (Direct 1-Klik)</span>
              </button>
            </>
          )}

          {currentStep === 'intelligence' && (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm"
            >
              Selesai & Buka Beranda
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
