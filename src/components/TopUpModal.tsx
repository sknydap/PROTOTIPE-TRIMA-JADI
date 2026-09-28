import React, { useState } from 'react';
import { X, ArrowUpRight, ArrowDownLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

interface TopUpModalProps {
  isOpen: boolean;
  action: 'topup' | 'withdraw';
  currentBalance: number;
  accountNumber: string;
  onClose: () => void;
  onSubmit: (amount: number, type: 'topup' | 'withdraw') => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  action,
  currentBalance,
  accountNumber,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<number>(5000000);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const isTopUp = action === 'topup';

  const handleConfirm = () => {
    onSubmit(amount, action);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl p-4 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              {isTopUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {isTopUp ? 'Top Up Saldo Cash RDN' : 'Tarik Dana ke Bank Pribadi'}
              </h3>
              <p className="text-[10px] text-slate-500">Rekening {accountNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-slate-900">
              {isTopUp ? 'Top Up Berhasil!' : 'Penarikan Diproses!'}
            </div>
            <p className="text-[10px] text-slate-500">
              Saldo RDN Anda telah diperbarui secara instan.
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Saldo Cash RDN Saat Ini:</span>
              <span className="font-bold text-slate-900 font-mono">{formatRupiah(currentBalance)}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Nominal {isTopUp ? 'Setoran' : 'Penarikan'}
              </label>
              <input
                type="number"
                step="500000"
                min="100000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-mono font-bold rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <div className="flex gap-1.5 mt-2">
                {[1000000, 5000000, 10000000, 25000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className="flex-1 py-1 text-[10px] font-semibold border rounded-lg hover:bg-slate-50 text-slate-600 border-slate-200"
                  >
                    {formatRupiah(amt, true)}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center gap-1.5 text-[10px] text-blue-900">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Transaksi aman terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK).</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
            >
              Konfirmasi {isTopUp ? 'Top Up' : 'Tarik Dana'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
