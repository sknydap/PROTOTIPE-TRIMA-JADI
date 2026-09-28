import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromoBanner } from './components/PromoBanner';
import { PocketsSection } from './components/PocketsSection';
import { PocketsDrawerModal } from './components/PocketsDrawerModal';
import { MarketOverview } from './components/MarketOverview';
import { BottomNav, NavTab } from './components/BottomNav';
import { JadiModal } from './components/JadiModal';
import { PocketDetailModal } from './components/PocketDetailModal';
import { InvestmentThesisModal } from './components/InvestmentThesisModal';
import { TopUpModal } from './components/TopUpModal';
import { WatchlistView } from './components/WatchlistView';
import { SearchView } from './components/SearchView';
import { PortfolioView } from './components/PortfolioView';
import { InfoDrawer } from './components/InfoDrawer';

// Trimvestor Loyalty & AUM Growth Engine Components
import { TrimvestorPointsBar } from './components/TrimvestorPointsBar';
import { AumOpportunityModal } from './components/AumOpportunityModal';
import { BondSwipeCarousel } from './components/BondSwipeCarousel';
import { InvestmentCalendarSection } from './components/InvestmentCalendarSection';
import { TrimvestorHubModal } from './components/TrimvestorHubModal';
import { BondDetailModal } from './components/BondDetailModal';

import { 
  INITIAL_USER_ACCOUNT, 
  INITIAL_POCKETS, 
  MUTUAL_FUNDS, 
  BOND_PICKS,
  INITIAL_TRIMVESTOR_STATE 
} from './data/mockData';
import { 
  VirtualPocket, 
  MutualFund, 
  BondPick, 
  TrimvestorState, 
  InvestmentCalendarItem 
} from './types/trima';
import { Smartphone, Monitor, Wifi, Battery, Signal, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');

  // Account & Financial State
  const [userAccount, setUserAccount] = useState(INITIAL_USER_ACCOUNT);
  const [pockets, setPockets] = useState<VirtualPocket[]>(INITIAL_POCKETS);

  // Trimvestor Loyalty Engine State
  const [trimvestor, setTrimvestor] = useState<TrimvestorState>(INITIAL_TRIMVESTOR_STATE);
  const [isTrimvestorHubOpen, setIsTrimvestorHubOpen] = useState(false);
  const [selectedBondForDetail, setSelectedBondForDetail] = useState<BondPick | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AUM Growth Engine Pop Up State (Per user prompt: Pop Up saja)
  const [isAumModalOpen, setIsAumModalOpen] = useState(false);

  // Pockets Drawer Modal State (Per user prompt: konten kantong jadi tombol)
  const [isPocketsDrawerOpen, setIsPocketsDrawerOpen] = useState(false);

  // Modals & Drawers
  const [isJadiModalOpen, setIsJadiModalOpen] = useState(false);
  const [selectedPocket, setSelectedPocket] = useState<VirtualPocket | null>(null);
  const [selectedThesisFund, setSelectedThesisFund] = useState<MutualFund | null>(null);
  const [topUpModalState, setTopUpModalState] = useState<{ isOpen: boolean; action: 'topup' | 'withdraw' }>({
    isOpen: false,
    action: 'topup',
  });
  const [infoDrawerType, setInfoDrawerType] = useState<string | null>(null);

  // Desktop Simulator View Mode (Device Frame vs Responsive)
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);

  // Helper to show point earning toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleEarnPoints = (amount: number, reason: string) => {
    setTrimvestor(prev => {
      const newPoints = prev.points + amount;
      const upgradedTier = newPoints >= 15000 ? 'Wealth' : newPoints >= 10000 ? 'Pro Investor' : newPoints >= 2500 ? 'Explorer' : 'Investor';
      return {
        ...prev,
        points: newPoints,
        tier: upgradedTier,
        recentActivities: [
          {
            id: `act-${Date.now()}`,
            title: reason,
            category: 'Investasi',
            points: amount,
            date: 'Hari ini',
          },
          ...prev.recentActivities.slice(0, 5),
        ],
      };
    });
    triggerToast(`+${amount} Trimvestor Points didapatkan: ${reason}!`);
  };

  // Handlers for TRIMA+ JADI
  const handleOpenJadiModal = () => {
    setIsJadiModalOpen(true);
  };

  const handlePocketCreated = (newPocket: VirtualPocket, deductedCash: number) => {
    setPockets(prev => [newPocket, ...prev]);
    setUserAccount(prev => ({
      ...prev,
      cashBalance: Math.max(0, prev.cashBalance - deductedCash),
      totalEquity: prev.totalEquity,
    }));
    handleEarnPoints(750, `Setup Kantong JADI: ${newPocket.name}`);
  };

  const handleOpenThesis = (fundId: string) => {
    const fund = MUTUAL_FUNDS.find(f => f.id === fundId);
    if (fund) {
      setSelectedThesisFund(fund);
      handleEarnPoints(50, `Membaca Investment Thesis ${fund.name}`);
    }
  };

  const handleRebalancePocket = (pocketId: string) => {
    setPockets(prev =>
      prev.map(p => {
        if (p.id === pocketId) {
          return {
            ...p,
            status: 'on-track',
            driftDetails: undefined,
            smartNudge: {
              type: 'positive',
              message: 'Rebalance 1-Klik Berhasil: Portofolio telah dikembalikan ke proporsi ideal model secara otomatis.',
              actionLabel: 'Lihat Komposisi',
            },
          };
        }
        return p;
      })
    );
    if (selectedPocket && selectedPocket.id === pocketId) {
      setSelectedPocket(prev => prev ? {
        ...prev,
        status: 'on-track',
        driftDetails: undefined,
        smartNudge: {
          type: 'positive',
          message: 'Rebalance 1-Klik Berhasil: Portofolio telah dikembalikan ke proporsi ideal model secara otomatis.',
          actionLabel: 'Lihat Komposisi',
        },
      } : null);
    }
    handleEarnPoints(200, 'Eksekusi Rebalancing Portofolio 1-Klik');
  };

  const handleToggleAutoDca = (pocketId: string) => {
    setPockets(prev =>
      prev.map(p => {
        if (p.id === pocketId) {
          return {
            ...p,
            autoDcaEnabled: !p.autoDcaEnabled,
          };
        }
        return p;
      })
    );
    if (selectedPocket && selectedPocket.id === pocketId) {
      setSelectedPocket(prev => prev ? { ...prev, autoDcaEnabled: !prev.autoDcaEnabled } : null);
    }
  };

  const handleTopUpConfirm = (amount: number, type: 'topup' | 'withdraw') => {
    if (type === 'topup') {
      setUserAccount(prev => ({
        ...prev,
        cashBalance: prev.cashBalance + amount,
        totalEquity: prev.totalEquity + amount,
      }));
      handleEarnPoints(100, `Top Up Saldo RDN ${amount.toLocaleString('id-ID')}`);
    } else {
      setUserAccount(prev => ({
        ...prev,
        cashBalance: Math.max(0, prev.cashBalance - amount),
        totalEquity: Math.max(0, prev.totalEquity - amount),
      }));
    }
  };

  const handleBuyBond = (bond: BondPick, amount: number) => {
    setUserAccount(prev => ({
      ...prev,
      cashBalance: Math.max(0, prev.cashBalance - amount),
      totalEquity: prev.totalEquity,
    }));
    handleEarnPoints(bond.pointsReward, `Investasi Obligasi: ${bond.name}`);
  };

  const handleSelectBondPickById = (bondId: string) => {
    const b = BOND_PICKS.find(bond => bond.id === bondId);
    if (b) {
      setSelectedBondForDetail(b);
    }
  };

  const handleSelectCalendarItem = (item: InvestmentCalendarItem) => {
    if (item.type === 'fund-spotlight') {
      handleOpenThesis('tam-fixed-income');
    } else if (item.type === 'bond-offering' || item.type === 'coupon') {
      handleSelectBondPickById('bond-sr019');
    } else {
      handleOpenJadiModal();
    }
    handleEarnPoints(50, `Cek Agenda Kalender: ${item.title}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col items-center justify-start sm:py-6 sm:px-4">
      {/* Top Device Bar (Only on wider screens to toggle mobile simulator frame) */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-md mb-3 px-3 text-slate-400 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-semibold text-slate-200">Trima+ Mobile Simulator</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setIsDeviceFrame(true)}
            className={`px-2 py-1 rounded flex items-center gap-1 text-[11px] font-medium transition-colors ${
              isDeviceFrame ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            title="Tampilan Frame Smartphone"
          >
            <Smartphone className="w-3 h-3" />
            <span>HP Mockup</span>
          </button>
          <button
            onClick={() => setIsDeviceFrame(false)}
            className={`px-2 py-1 rounded flex items-center gap-1 text-[11px] font-medium transition-colors ${
              !isDeviceFrame ? 'bg-orange-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
            title="Tampilan Full Width"
          >
            <Monitor className="w-3 h-3" />
            <span>Responsive</span>
          </button>
        </div>
      </header>

      {/* Main Smartphone Shell Container */}
      <div 
        className={`w-full bg-slate-50 relative flex flex-col transition-all overflow-hidden ${
          isDeviceFrame 
            ? 'max-w-md sm:rounded-[44px] sm:border-[10px] sm:border-slate-800 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] sm:ring-1 sm:ring-slate-700 min-h-screen sm:min-h-[850px] sm:max-h-[920px]' 
            : 'max-w-xl rounded-2xl shadow-xl border border-slate-200 min-h-screen'
        }`}
      >
        {/* Floating Trimvestor Reward Toast */}
        {toastMessage && (
          <div className="absolute top-10 left-4 right-4 z-50 p-2.5 rounded-xl bg-slate-900/95 text-white border border-amber-400/50 shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-200">
            <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            </div>
            <div className="flex-1 text-[11px]">
              <div className="font-extrabold text-amber-300 uppercase tracking-wider text-[8.5px]">
                Trimvestor Points Update
              </div>
              <div className="font-semibold text-slate-100">{toastMessage}</div>
            </div>
          </div>
        )}

        {/* Mobile Phone Status Bar */}
        <div className="bg-[#FFF5ED] px-6 pt-2.5 pb-1 flex items-center justify-between text-xs font-semibold text-slate-800 shrink-0 select-none">
          <span className="text-[12.5px] font-bold tracking-tight">9:41</span>
          
          {/* Dynamic Island */}
          <div className="w-22 h-3.5 bg-slate-900 rounded-full hidden sm:block mx-auto -mt-1 shadow-inner" />

          <div className="flex items-center gap-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
          {activeTab === 'beranda' && (
            <main>
              {/* Header with Total Equity, RDN Cash, and 4 Quick Actions (Trima+ JADI) */}
              <Header
                totalEquity={userAccount.totalEquity}
                totalGain={userAccount.totalGain}
                gainPercentage={userAccount.gainPercentage}
                cashBalance={userAccount.cashBalance}
                accountNumber={userAccount.accountNumber}
                trimvestorPoints={trimvestor.points}
                trimvestorTier={trimvestor.tier}
                onOpenJadiModal={handleOpenJadiModal}
                onOpenTopUp={(action) => setTopUpModalState({ isOpen: true, action })}
                onOpenQuickMenu={(menu) => setInfoDrawerType(menu)}
                onOpenTrimvestorHub={() => setIsTrimvestorHubOpen(true)}
              />

              {/* 1. Tombol Kantong Investasi (Clean compact button per user instruction) */}
              <PocketsSection
                pockets={pockets}
                onOpenPocketsDrawer={() => setIsPocketsDrawerOpen(true)}
                onOpenCreatePocket={handleOpenJadiModal}
              />

              {/* 2. Trimvestor Points & Tier Progress Bar with AUM Pop Up Trigger */}
              <TrimvestorPointsBar
                trimvestor={trimvestor}
                onOpenHub={() => setIsTrimvestorHubOpen(true)}
                onOpenAumModal={() => setIsAumModalOpen(true)}
              />

              {/* 3. Langsung di bawah Trimvest Points: Pilihan SUN, SBN & Obligasi (Horizontal Swipe Kanan Kiri) */}
              <BondSwipeCarousel
                onSelectBond={(bond) => setSelectedBondForDetail(bond)}
                onOpenWhyBond={(bond) => setSelectedBondForDetail(bond)}
              />

              {/* 4. Agenda Kupon & SBN (Bond & Fund Investment Calendar Section) */}
              <InvestmentCalendarSection
                onSelectItem={handleSelectCalendarItem}
              />

              {/* 5. Promotional Banner */}
              <PromoBanner onOpenJadiModal={handleOpenJadiModal} />

              {/* 6. Market Overview & Tabs (Saham, Reksa Dana, Obligasi, IHSG Chart, IPO, Most Active) */}
              <MarketOverview
                onOpenQuickMenu={(menu) => setInfoDrawerType(menu)}
                onOpenThesis={handleOpenThesis}
                onSelectBondPick={handleSelectBondPickById}
              />
            </main>
          )}

          {activeTab === 'watchlist' && (
            <main>
              <WatchlistView
                onOpenThesis={handleOpenThesis}
                onOpenJadiModal={handleOpenJadiModal}
              />
            </main>
          )}

          {activeTab === 'cari' && (
            <main>
              <SearchView
                onOpenThesis={handleOpenThesis}
                onOpenJadiModal={handleOpenJadiModal}
              />
            </main>
          )}

          {activeTab === 'portofolio' && (
            <main>
              <PortfolioView
                totalEquity={userAccount.totalEquity}
                cashBalance={userAccount.cashBalance}
                pockets={pockets}
                onOpenCreatePocket={handleOpenJadiModal}
                onSelectPocket={(p) => setSelectedPocket(p)}
              />
            </main>
          )}
        </div>

        {/* Bottom Navigation with elevated Center [+] Button and Shifted Cari */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onOpenAddPocket={handleOpenJadiModal}
          pocketsCount={pockets.length}
        />
      </div>

      {/* AUM Growth Engine Pop Up Modal (Pop Up Saja per user prompt) */}
      <AumOpportunityModal
        isOpen={isAumModalOpen}
        onClose={() => setIsAumModalOpen(false)}
        cashBalance={userAccount.cashBalance}
        onOpenJadiModal={() => {
          setIsAumModalOpen(false);
          setIsJadiModalOpen(true);
        }}
        onSelectFundPick={(fundId) => {
          setIsAumModalOpen(false);
          handleOpenThesis(fundId);
        }}
        onSelectBondPick={(bondId) => {
          setIsAumModalOpen(false);
          handleSelectBondPickById(bondId);
        }}
      />

      {/* Pockets Drawer Modal (Toggled via the compact Kantong Investasi button) */}
      <PocketsDrawerModal
        isOpen={isPocketsDrawerOpen}
        onClose={() => setIsPocketsDrawerOpen(false)}
        pockets={pockets}
        onOpenCreatePocket={handleOpenJadiModal}
        onSelectPocket={(p) => setSelectedPocket(p)}
      />

      {/* TRIMVESTOR Hub & Premium Features Ecosystem Modal */}
      <TrimvestorHubModal
        isOpen={isTrimvestorHubOpen}
        onClose={() => setIsTrimvestorHubOpen(false)}
        trimvestor={trimvestor}
        onSimulateEarnPoints={(pts, reason) => handleEarnPoints(pts, reason)}
        onOpenJadiModal={() => {
          setIsTrimvestorHubOpen(false);
          setIsJadiModalOpen(true);
        }}
      />

      {/* Bond Details & Purchase Modal */}
      <BondDetailModal
        bond={selectedBondForDetail}
        onClose={() => setSelectedBondForDetail(null)}
        onBuyBond={handleBuyBond}
        cashBalance={userAccount.cashBalance}
      />

      {/* Full 4-Step Interactive TRIMA+ JADI Modal (J · A · D · I) */}
      <JadiModal
        isOpen={isJadiModalOpen}
        onClose={() => setIsJadiModalOpen(false)}
        onPocketCreated={handlePocketCreated}
        onOpenThesis={handleOpenThesis}
        cashBalance={userAccount.cashBalance}
      />

      {/* Pocket Intelligence Check-Up Modal */}
      <PocketDetailModal
        pocket={selectedPocket}
        onClose={() => setSelectedPocket(null)}
        onRebalancePocket={handleRebalancePocket}
        onToggleAutoDca={handleToggleAutoDca}
      />

      {/* "Mengapa Produk Ini?" Investment Thesis Modal */}
      <InvestmentThesisModal
        fund={selectedThesisFund}
        onClose={() => setSelectedThesisFund(null)}
      />

      {/* Top Up / Withdraw Modal for Cash RDN */}
      <TopUpModal
        isOpen={topUpModalState.isOpen}
        action={topUpModalState.action}
        currentBalance={userAccount.cashBalance}
        accountNumber={userAccount.accountNumber}
        onClose={() => setTopUpModalState(prev => ({ ...prev, isOpen: false }))}
        onSubmit={handleTopUpConfirm}
      />

      {/* Info / Secondary Menu Drawer */}
      <InfoDrawer
        type={infoDrawerType}
        onClose={() => setInfoDrawerType(null)}
        accountNumber={userAccount.accountNumber}
        cashBalance={userAccount.cashBalance}
      />
    </div>
  );
}
