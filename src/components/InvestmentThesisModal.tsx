import React from 'react';
import { X, Award, CheckCircle2, TrendingUp, ShieldCheck, PieChart } from 'lucide-react';
import { MutualFund } from '../types/trima';
import { formatRupiah } from '../utils/formatters';

interface InvestmentThesisModalProps {
  fund: MutualFund | null;
  onClose: () => void;
}

export const InvestmentThesisModal: React.FC<InvestmentThesisModalProps> = ({
  fund,
  onClose,
}) => {
  if (!fund) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[88vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab bar on mobile */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 uppercase tracking-wider">
                Trima+ Picks Kurasi Analis
              </span>
              <span className="text-[10px] font-semibold text-slate-500">
                TAM Expertise
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {fund.name}
            </h3>
            <p className="text-xs text-slate-500">
              {fund.manager} · Tipe: <span className="font-semibold text-slate-700">{fund.type}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 space-y-4 text-xs">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
              <div className="text-[10px] text-slate-400">1Y Return</div>
              <div className="text-sm font-extrabold text-emerald-600">+{fund.return1Y}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Total Kelolaan</div>
              <div className="text-xs font-bold text-slate-800">{fund.aum}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">NAB per Unit</div>
              <div className="text-xs font-bold text-slate-800">{formatRupiah(fund.nav)}</div>
            </div>
          </div>

          {/* Investment Thesis Section: "Mengapa Produk Ini?" */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Award className="w-4 h-4 text-orange-500" />
              <span>Investment Thesis: Mengapa Produk Ini?</span>
            </div>
            <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100/80 text-slate-700 leading-relaxed">
              <p className="font-semibold text-orange-950 mb-1">
                "{fund.thesis.summary}"
              </p>
              <p className="text-slate-600 text-[11px]">
                {fund.thesis.analystRationale}
              </p>
            </div>
          </div>

          {/* Benchmark Comparison */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Kinerja vs Benchmark (Alpha Generation)</span>
            </div>
            <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 text-emerald-900 font-medium text-[11px]">
              {fund.thesis.benchmarkComparison}
            </div>
          </div>

          {/* Top 5 Holdings */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <div className="flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-sky-600" />
                <span>Top 5 Efek Portofolio (Transparansi Aset)</span>
              </div>
              <span className="text-[10px] font-normal text-slate-400">Fund Fact Sheet Resmi</span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {fund.thesis.topHoldings.map((holding, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between bg-white text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-800">{holding.name}</span>
                    <div className="text-[10px] text-slate-400">{holding.type}</div>
                  </div>
                  <div className="font-bold text-slate-900 tabular-nums">
                    {holding.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
