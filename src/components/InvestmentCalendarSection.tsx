import React, { useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { INVESTMENT_CALENDAR } from '../data/mockData';
import { InvestmentCalendarItem } from '../types/trima';

interface InvestmentCalendarSectionProps {
  onSelectItem: (item: InvestmentCalendarItem) => void;
}

export const InvestmentCalendarSection: React.FC<InvestmentCalendarSectionProps> = ({
  onSelectItem,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<'Sep' | 'Okt'>('Okt');

  const filteredItems = INVESTMENT_CALENDAR.filter(item => 
    selectedMonth === 'Sep' ? item.month === 'Sep' : item.month === 'Okt'
  );

  return (
    <div className="px-3.5 pt-1.5 pb-1 space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-none">
              Agenda Kupon & SBN
            </h3>
            <p className="text-[9.5px] text-slate-400 mt-0.5 leading-none">
              Jadwal kupon & penawaran obligasi bulanan
            </p>
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg text-[9.5px] font-semibold">
          <button
            onClick={() => setSelectedMonth('Sep')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              selectedMonth === 'Sep' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sep
          </button>
          <button
            onClick={() => setSelectedMonth('Okt')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              selectedMonth === 'Okt' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Okt
          </button>
        </div>
      </div>

      {/* Calendar Items List (Compact & Senada) */}
      <div className="space-y-1">
        {filteredItems.slice(0, 3).map((item) => {
          const isToday = item.status === 'today';

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                isToday 
                  ? 'bg-orange-50/50 border-orange-300/80 shadow-2xs' 
                  : 'bg-white border-slate-200/70 hover:border-orange-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* Date Badge */}
                <div className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center shrink-0 border ${
                  isToday 
                    ? 'bg-orange-500 text-white border-orange-600 font-extrabold shadow-2xs' 
                    : 'bg-slate-50 text-slate-800 border-slate-200 font-bold'
                }`}>
                  <span className="text-[7.5px] uppercase leading-none">{item.month}</span>
                  <span className="text-[11px] font-mono font-bold leading-none mt-0.5">{item.day}</span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="text-[10.5px] font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                      {item.title}
                    </span>
                    {isToday && (
                      <span className="text-[7px] font-black px-1 rounded bg-orange-100 text-orange-800 uppercase shrink-0">
                        Hari Ini
                      </span>
                    )}
                  </div>
                  <div className="text-[9.5px] text-slate-400 truncate mt-1 leading-none">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 pl-1">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

