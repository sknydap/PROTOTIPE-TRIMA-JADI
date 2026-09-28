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
    <div className="px-3.5 pt-1.5 pb-0.5">
      <div 
        onClick={onOpenPocketsDrawer}
        className="w-full px-2.5 py-1.5 bg-white hover:bg-orange-50/40 rounded-xl border border-slate-200/80 shadow-2xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Target className="w-3.5 h-3.5" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-[11px] font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                Kantong Investasi JADI
              </span>
              <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded-full bg-orange-50 text-orange-600 border border-orange-200/60 shrink-0">
                {pockets.length} Aktif
              </span>
              {hasDrift && (
                <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200/60 shrink-0">
                  Rebalance
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 mt-0.5 text-[9.5px] text-slate-500 leading-none truncate">
              <span className="font-semibold text-slate-800 font-mono">
                {formatRupiah(totalCollected, true)}
              </span>
              <span className="text-slate-300">/</span>
              <span>{formatRupiah(totalTarget, true)}</span>
              <span className="text-orange-600 font-bold font-mono">({overallProgress}%)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCreatePocket();
            }}
            className="w-5.5 h-5.5 rounded-md bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 flex items-center justify-center transition-colors cursor-pointer"
            title="Tambah Kantong Baru"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 transition-colors" />
        </div>
      </div>
    </div>
  );
};

