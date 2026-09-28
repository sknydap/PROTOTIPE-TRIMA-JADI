import React from 'react';
import { Crown, ChevronRight, Zap } from 'lucide-react';
import { TrimvestorState } from '../types/trima';

interface TrimvestorPointsBarProps {
  trimvestor: TrimvestorState;
  onOpenHub: () => void;
  onOpenAumModal?: () => void;
}

export const TrimvestorPointsBar: React.FC<TrimvestorPointsBarProps> = ({
  trimvestor,
  onOpenHub,
  onOpenAumModal,
}) => {
  const pointsToNext = Math.max(0, trimvestor.nextTierPoints - trimvestor.points);

  return (
    <div className="px-3.5 py-1">
      <div className="p-2 rounded-xl bg-slate-900 text-white shadow-2xs border border-slate-800/90 flex items-center justify-between">
        {/* Left: Tier & Points Status */}
        <div 
          onClick={onOpenHub}
          className="flex items-center gap-2 cursor-pointer group flex-1"
        >
          <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Crown className="w-3.5 h-3.5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                Trimvestor {trimvestor.tier}
              </span>
              <span className="text-[8px] px-1 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                {trimvestor.aumPointsMultiplier}x AUM
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-200 mt-0.5 leading-none font-mono">
              <span className="text-amber-300">{trimvestor.points.toLocaleString('id-ID')}</span> pts
              <span className="text-[9px] text-slate-400 font-normal ml-1 font-sans">
                ({pointsToNext.toLocaleString('id-ID')} ke Pro)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick AUM Pop Up Trigger & Hub Chevron */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenAumModal && (
            <button
              onClick={onOpenAumModal}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/40 text-[9.5px] font-bold transition-colors cursor-pointer"
              title="Buka Pop Up Peluang AUM"
            >
              <Zap className="w-3 h-3 text-orange-400 fill-orange-400" />
              <span>AUM Engine</span>
            </button>
          )}

          <button
            onClick={onOpenHub}
            className="w-6 h-6 rounded-md hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Buka Trimvestor Hub"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

