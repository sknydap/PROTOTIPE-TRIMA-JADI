import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, Calendar, Award } from 'lucide-react';
import { BondPick } from '../types/trima';
import { formatRupiah } from '../utils/formatters';

interface BondDetailModalProps {
  bond: BondPick | null;
  onClose: () => void;
  onBuyBond: (bond: BondPick, amount: number) => void;
  cashBalance: number;
}

export const BondDetailModal: React.FC<BondDetailModalProps> = ({
  bond,
  onClose,
  onBuyBond,
  cashBalance,
}) => {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(5000000);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!bond) return null;

  const handleExecute = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onBuyBond(bond, purchaseAmount);
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  const calculatedYearlyCoupon = (purchaseAmount * bond.coupon) / 100;
  const netMonthlyCoupon = (calculatedYearlyCoupon * 0.9) / 12; // 10% final tax

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/65 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Trima+ Bond Picks
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                Rating {bond.rating}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {bond.name}
            </h3>
            <p className="text-xs text-slate-500">
              Penerbit: {bond.issuer}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Pemesanan Obligasi Berhasil!
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Unit {bond.name} senilai {formatRupiah(purchaseAmount)} telah tercatat di kustodian KSEI. Anda memperoleh <strong className="text-amber-600 font-bold">+{bond.pointsReward} Trimvestor Points</strong>!
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4 text-xs">
            {/* Kupon & Return Metrics */}
            <div className="grid grid-cols-3 gap-2 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
              <div>
                <div className="text-[10px] text-slate-500">Kupon Pasti (p.a.)</div>
                <div className="text-base font-extrabold text-emerald-700 font-mono">
                  {bond.coupon.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Yield to Maturity</div>
                <div className="text-sm font-bold text-slate-800 font-mono">
                  {bond.yieldPercent.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Tenor / Jatuh Tempo</div>
                <div className="text-xs font-bold text-slate-800">
                  {bond.tenor}
                </div>
              </div>
            </div>

            {/* Why This Bond */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Why This Bond? (Analisis Fixed Income Trimegah)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-700 leading-relaxed text-[11px]">
                {bond.whyPicked}
              </div>
            </div>

            {/* Passive Income Simulation */}
            <div className="bg-sky-50/70 p-3 rounded-2xl border border-sky-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-950">Simulasi Arus Kas Kupon Pasif</span>
                <span className="text-[10px] text-sky-700 font-semibold">Pajak Obligasi 10%</span>
              </div>
              <div className="flex items-baseline justify-between pt-1 border-t border-sky-100">
                <div>
                  <div className="text-[10px] text-slate-500">Estimasi Kupon Bersih / Bulan</div>
                  <div className="text-base font-extrabold font-mono text-sky-800">
                    {formatRupiah(Math.round(netMonthlyCoupon))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500">Jadwal Pembayaran</div>
                  <div className="text-xs font-semibold text-slate-700">{bond.couponSchedule}</div>
                </div>
              </div>
            </div>

            {/* Investment Amount Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-800">Nominal Investasi</label>
                <span className="text-[10px] text-slate-500">
                  Saldo Cash RDN: {formatRupiah(cashBalance)}
                </span>
              </div>
              <input
                type="number"
                step="1000000"
                min={bond.minBuy}
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="flex gap-2 mt-2">
                {[1000000, 5000000, 10000000, 25000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setPurchaseAmount(amt)}
                    className="flex-1 py-1 text-[10px] font-semibold border rounded-lg hover:bg-slate-50 text-slate-600 border-slate-200"
                  >
                    {formatRupiah(amt, true)}
                  </button>
                ))}
              </div>
            </div>

            {/* Points Earning Note */}
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-[11px] text-amber-900">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
                <span>Dapatkan <strong>+{bond.pointsReward} Trimvestor Points</strong> & AUM points bulanan.</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {!isSuccess && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleExecute}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 active:scale-95 transition-all"
            >
              Beli Obligasi ({formatRupiah(purchaseAmount)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
