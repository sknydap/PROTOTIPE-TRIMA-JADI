import React from 'react';
import { 
  X, 
  Target, 
  ChevronRight, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { VirtualPocket } from '../types/trima';
import { formatRupiah } from '../utils/formatters';

interface PocketsDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pockets: VirtualPocket[];
  onOpenCreatePocket: () => void;
  onSelectPocket: (pocket: VirtualPocket) => void;
}

export const PocketsDrawerModal: React.FC<PocketsDrawerModalProps> = ({
  isOpen,
  onClose,
  pockets,
  onOpenCreatePocket,
  onSelectPocket,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/65 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Kantong Investasi TRIMA+ JADI
                </h3>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700">
                  {pockets.length} Aktif
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Sub-Account Ledger terisolasi berbasis 4 pilar J·A·D·I
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

        {/* Content */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
          {pockets.map((pocket) => {
            const progressPercent = Math.min(100, Math.round((pocket.currentAmount / pocket.targetAmount) * 100));
            const hasDrift = pocket.status === 'drift-warning';

            return (
              <div
                key={pocket.id}
                onClick={() => {
                  onClose();
                  onSelectPocket(pocket);
                }}
                className="group bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs hover:border-orange-300 transition-all cursor-pointer relative overflow-hidden"
              >
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    hasDrift ? 'bg-amber-500' : 'bg-gradient-to-r from-orange-500 to-amber-400'
                  }`}
                />

                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {pocket.name}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                      <span>{pocket.portfolioName}</span>
                      <span aria-hidden="true">·</span>
                      <span>Profil: {pocket.riskProfile}</span>
                    </div>
                  </div>

                  <div>
                    {hasDrift ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>Drift Alert</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>On-Track</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-900 tabular-nums">
                      {formatRupiah(pocket.currentAmount)}
                    </span>
                    <span className="text-slate-500 text-[11px] tabular-nums">
                      Target: {formatRupiah(pocket.targetAmount, true)} ({progressPercent}%)
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        hasDrift 
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                          : 'bg-gradient-to-r from-orange-500 to-amber-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>DCA: <strong className="text-slate-800">{formatRupiah(pocket.monthlyDca)}/bln</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-orange-600 font-semibold">
                    <span>Pantau Intelligence &rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenCreatePocket();
            }}
            className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Kantong JADI Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
