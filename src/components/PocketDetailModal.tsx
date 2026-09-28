import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  RefreshCw, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { VirtualPocket } from '../types/trima';
import { formatRupiah, formatPercent } from '../utils/formatters';

interface PocketDetailModalProps {
  pocket: VirtualPocket | null;
  onClose: () => void;
  onRebalancePocket: (pocketId: string) => void;
  onToggleAutoDca: (pocketId: string) => void;
}

export const PocketDetailModal: React.FC<PocketDetailModalProps> = ({
  pocket,
  onClose,
  onRebalancePocket,
  onToggleAutoDca,
}) => {
  const [rebalanceInProgress, setRebalanceInProgress] = useState(false);

  if (!pocket) return null;

  const progressPercent = Math.min(100, Math.round((pocket.currentAmount / pocket.targetAmount) * 100));
  const hasDrift = pocket.status === 'drift-warning';

  const handleRebalanceClick = () => {
    setRebalanceInProgress(true);
    setTimeout(() => {
      onRebalancePocket(pocket.id);
      setRebalanceInProgress(false);
    }, 1500);
  };

  // Trajectory SVG Graph Math
  const trajectory = pocket.historicalTrajectory;
  const svgWidth = 340;
  const svgHeight = 120;
  const maxTargetVal = pocket.targetAmount * 1.05;

  const targetCoords = trajectory.map((pt, idx) => {
    const x = (idx / (trajectory.length - 1)) * svgWidth;
    const y = svgHeight - (pt.targetVal / maxTargetVal) * (svgHeight - 20) - 10;
    return `${x},${y}`;
  });

  const actualPoints = trajectory.filter(pt => pt.actualVal > 0);
  const actualCoords = actualPoints.map((pt, idx) => {
    const x = (idx / (trajectory.length - 1)) * svgWidth;
    const y = svgHeight - (pt.actualVal / maxTargetVal) * (svgHeight - 20) - 10;
    return `${x},${y}`;
  });

  const targetPath = `M ${targetCoords.join(' L ')}`;
  const actualPath = actualCoords.length > 1 ? `M ${actualCoords.join(' L ')}` : '';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/65 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                TRIMA+ JADI Intelligence
              </span>
              <span className="text-[10px] text-slate-500">
                Profil: {pocket.riskProfile}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {pocket.name}
            </h3>
            <p className="text-xs text-slate-500">
              Model: {pocket.portfolioName} · Dibuat: {pocket.createdAt}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 text-xs">
          {/* Main Progress & Value Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Akumulasi Nilai Investasi (NAB Kini)</span>
              <span>Target ($FV$)</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                {formatRupiah(pocket.currentAmount)}
              </span>
              <span className="text-sm font-bold font-mono text-slate-300">
                {formatRupiah(pocket.targetAmount)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Pencapaian: {progressPercent}%</span>
                <span>Sisa {Math.max(0, pocket.targetMonths - pocket.elapsedMonths)} bulan</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3.1.4 Feature 1: Tracking Graph & Dynamic Valuation */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>Tracking Graph & Dynamic Valuation</span>
              </div>
              <span className="text-[10px] text-slate-400">Update Harian Bursa</span>
            </div>

            <p className="text-[11px] text-slate-500">
              Sistem membandingkan grafik pertumbuhan aktual portofolio terhadap garis lintasan target teoritis.
            </p>

            {/* Chart SVG */}
            <div className="relative h-32 w-full pt-2">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* Dotted Target Line */}
                <path 
                  d={targetPath} 
                  fill="none" 
                  stroke="#94A3B8" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                />
                {/* Actual Realized Line */}
                {actualPath && (
                  <path 
                    d={actualPath} 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />
                )}
                {/* Actual points circles */}
                {actualCoords.map((coord, idx) => {
                  const [cx, cy] = coord.split(',');
                  return (
                    <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                  );
                })}
              </svg>

              {/* Chart Legend */}
              <div className="flex items-center justify-center gap-4 mt-2 text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-4 h-0.5 border-t-2 border-dashed border-slate-400" />
                  <span>Lintasan Target</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-3 h-1 bg-emerald-500 rounded-full" />
                  <span>Pertumbuhan Aktual (NAB)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3.1.4 Feature 2: Smart Nudges & Portfolio Check-Up */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Smart Nudges & Portfolio Check-Up</span>
            </div>

            {hasDrift && pocket.driftDetails ? (
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2.5">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-amber-900 text-xs">
                      Terjadi Pergeseran Porsi Aset (Asset Drift: {pocket.driftDetails.driftDelta}%)
                    </h5>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      {pocket.driftDetails.suggestedRebalanceNotes}
                    </p>
                  </div>
                </div>

                {/* Distribution comparison */}
                <div className="grid grid-cols-3 gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-100 text-[10px]">
                  <div>
                    <span className="text-slate-400">Pasar Uang</span>
                    <div className="font-bold text-slate-800">
                      {pocket.driftDetails.currentDistribution['Pasar Uang']}%{' '}
                      <span className="text-slate-400 font-normal">(Ideal {pocket.driftDetails.idealDistribution['Pasar Uang']}%)</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Pend. Tetap</span>
                    <div className="font-bold text-slate-800">
                      {pocket.driftDetails.currentDistribution['Pendapatan Tetap']}%{' '}
                      <span className="text-slate-400 font-normal">(Ideal {pocket.driftDetails.idealDistribution['Pendapatan Tetap']}%)</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Saham</span>
                    <div className="font-bold text-amber-700">
                      {pocket.driftDetails.currentDistribution['Saham']}%{' '}
                      <span className="text-slate-400 font-normal">(Ideal {pocket.driftDetails.idealDistribution['Saham']}%)</span>
                    </div>
                  </div>
                </div>

                {/* 3.1.4 Feature 4: Dynamic Rebalancing 1-Klik */}
                <button
                  onClick={handleRebalanceClick}
                  disabled={rebalanceInProgress}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${rebalanceInProgress ? 'animate-spin' : ''}`} />
                  <span>
                    {rebalanceInProgress ? 'Memproses Rebalance 1-Klik...' : 'Rebalance Portofolio 1-Klik'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-[11px]">
                  <strong className="font-semibold text-emerald-900">Portofolio Berada di Jalur Optimal.</strong>{' '}
                  Porsi aset berada dalam toleransi batas risiko ideal model {pocket.portfolioName}.
                </div>
              </div>
            )}
          </div>

          {/* 3.1.4 Feature 3: Auto-Debit DCA Engine */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>Auto-Debit DCA Engine</span>
              </div>
              <button
                onClick={() => onToggleAutoDca(pocket.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                  pocket.autoDcaEnabled
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {pocket.autoDcaEnabled ? 'Aktif' : 'Nonaktif'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-400 text-[10px]">Nominal DCA Rutin</span>
                <div className="font-bold text-slate-800 font-mono">
                  {formatRupiah(pocket.monthlyDca)} / bln
                </div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-400 text-[10px]">Tanggal Debet Otomatis</span>
                <div className="font-bold text-slate-800">
                  Tanggal {pocket.autoDcaDate} Tiap Bulan
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
              <span>Sumber Rekening Dana: <strong>{pocket.dcaSource}</strong></span>
              <span className="text-orange-600 font-semibold cursor-pointer hover:underline">
                Ubah Jadwal
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Tutup Pemantauan
          </button>
        </div>
      </div>
    </div>
  );
};
