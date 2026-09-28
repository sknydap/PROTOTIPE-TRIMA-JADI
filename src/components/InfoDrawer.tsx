import React from 'react';
import { X, Bell, Settings, TrendingUp, Lightbulb, Zap, Clock, BarChart3, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

interface InfoDrawerProps {
  type: string | null;
  onClose: () => void;
  accountNumber: string;
  cashBalance: number;
}

export const InfoDrawer: React.FC<InfoDrawerProps> = ({
  type,
  onClose,
  accountNumber,
  cashBalance,
}) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl p-4 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 capitalize">
            {type === 'notifications' && 'Pemberitahuan & Notifikasi Pintar'}
            {type === 'settings' && 'Pengaturan Akun Trima+'}
            {type === 'picks' && 'Trima+ Picks Riset Terpilih'}
            {type === 'insights' && 'Trimegah Daily Market Insights'}
            {type === 'fast-order' && 'Fast Order Eksekusi Kilat'}
            {type === 'running-trade' && 'Running Trade Live Feed'}
            {type === 'broker-ranking' && 'Broker Ranking Volume'}
            {type === 'rdn-detail' && 'Detail Rekening Dana Nasabah (RDN)'}
            {type === 'all-stocks' && 'Daftar Seluruh Saham IDX'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3 text-xs text-slate-600">
          {type === 'notifications' && (
            <div className="space-y-2">
              <div className="p-2.5 bg-orange-50/70 border border-orange-200 rounded-xl">
                <div className="font-bold text-orange-900 text-xs">TRIMA+ JADI Intelligence</div>
                <p className="text-[11px] text-orange-800 mt-0.5">
                  Pengingat Auto-Debit DCA untuk DP Rumah Impian dijadwalkan 2 hari lagi. Saldo Cash RDN mencukupi.
                </p>
                <div className="text-[9px] text-orange-600 mt-1">2 jam yang lalu</div>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="font-bold text-slate-800 text-xs">Trimegah Morning Notes</div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  IHSG diproyeksikan menguji level 8.750 didorong oleh inflow asing pada sektor perbankan.
                </p>
                <div className="text-[9px] text-slate-400 mt-1">08:15 WIB</div>
              </div>
            </div>
          )}

          {type === 'rdn-detail' && (
            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Bank Kustodian:</span>
                  <span className="font-semibold text-slate-800">PT Bank Central Asia Tbk</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nomor RDN:</span>
                  <span className="font-mono font-bold text-slate-800">{accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Saldo Tersedia:</span>
                  <span className="font-mono font-bold text-emerald-600">{formatRupiah(cashBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status Rekening:</span>
                  <span className="font-semibold text-emerald-600">Terverifikasi Aktif (KSEI)</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 text-[10px] text-blue-800 rounded-lg flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Dana RDN dipisahkan sepenuhnya sesuai regulasi OJK & IDX.</span>
              </div>
            </div>
          )}

          {type === 'settings' && (
            <div className="space-y-2">
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
                <span>Keamanan Biometrik / Face ID</span>
                <span className="text-emerald-600 font-bold">Aktif</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
                <span>Notifikasi Intelligence JADI</span>
                <span className="text-emerald-600 font-bold">Aktif</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
                <span>Mata Uang Basis</span>
                <span className="text-slate-700 font-bold">IDR (Rupiah)</span>
              </div>
            </div>
          )}

          {(type === 'picks' || type === 'insights' || type === 'fast-order' || type === 'running-trade' || type === 'broker-ranking' || type === 'all-stocks') && (
            <div className="space-y-2 text-center py-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="font-bold text-slate-800 text-xs">
                Fitur Terhubung dengan Riset Trimegah
              </div>
              <p className="text-[11px] text-slate-500">
                Data real-time IDX dan rekomendasi Trima+ terintegrasi langsung dalam pengambilan keputusan investasi Anda.
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
