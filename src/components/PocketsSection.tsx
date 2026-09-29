import React from 'react';
import { Target, ChevronRight, Plus } from 'lucide-react';
import { VirtualPocket } from '../types/trima';
import { formatRupiah } from '../utils/formatters';

interface PocketsSectionProps {
  pockets: VirtualPocket[];
  onOpenPocketsDrawer: () => void;
  onOpenCreatePocket: () => void;
}

export const PocketsSection: React.FC<PocketsSectionProps> = ({
  pockets,
  onOpenPocketsDrawer,
  onOpenCreatePocket,
}) => {
  const totalCollected = pockets.reduce((acc, p) => acc + p.currentAmount, 0);
  const totalTarget = pockets.reduce((acc, p) => acc + p.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? Math.min(100, Math.round((totalCollected / totalTarget) * 100)) : 0;
  const hasDrift = pockets.some(p => p.status === 'drift-warning');

  return (
    <div className="px-4 pt-2.5 pb-1">
      <div 
        onClick={onOpenPocketsDrawer}
        className="w-full p-3 bg-white hover:bg-orange-50/40 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Target className="w-4.5 h-4.5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 leading-none">
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                Kantong Investasi JADI
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200/60 shrink-0">
                {pockets.length} Aktif
              </span>
              {hasDrift && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 shrink-0">
                  Rebalance
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 leading-none truncate">
              <span className="font-semibold text-slate-800 font-mono">
                {formatRupiah(totalCollected, true)}
              </span>
              <span className="text-slate-300">/</span>
              <span>{formatRupiah(totalTarget, true)}</span>
              <span className="text-orange-600 font-bold font-mono">({overallProgress}%)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCreatePocket();
            }}
            className="w-7 h-7 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            title="Tambah Kantong Baru"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>

          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-colors" />
        </div>
      </div>
    </div>
  );
};

