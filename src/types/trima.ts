export type RiskProfile = 'Konservatif' | 'Moderat' | 'Agresif';

export type GoalCategory = 
  | 'Pensiun'
  | 'Rumah'
  | 'Pendidikan'
  | 'Pernikahan'
  | 'Kendaraan'
  | 'Kekayaan / Freedom';

export interface MutualFund {
  id: string;
  name: string;
  type: 'Pasar Uang' | 'Pendapatan Tetap' | 'Saham';
  manager: string; // e.g. PT Trimegah Asset Management
  aum: string;
  return1Y: number;
  return3Y?: number;
  riskScore: 1 | 2 | 3 | 4 | 5;
  nav: number;
  minBuy: number;
  isTrimaPick: boolean;
  theme?: 'Conservative' | 'Income' | 'Balanced' | 'Growth' | 'Short-Term' | 'Long-Term';
  isSpotlight?: boolean;
  spotlightReason?: string;
  pointsReward: number; // e.g. +500 pts on investment
  thesis: {
    summary: string;
    analystRationale: string;
    benchmarkComparison: string;
    topHoldings: { name: string; percentage: number; type: string }[];
  };
}

export interface BondPick {
  id: string;
  name: string;
  issuer: string;
  type: 'Pemerintah (SBN)' | 'Korporasi' | 'Sukuk';
  coupon: number; // e.g. 6.85%
  yieldPercent: number; // e.g. 6.65%
  maturityDate: string; // e.g. '15 Mei 2029'
  tenor: string; // e.g. '5 Tahun'
  minBuy: number; // e.g. 1000000 (Rp1.000.000)
  rating: string; // e.g. 'idAAA'
  riskLevel: 'Rendah' | 'Menengah';
  indicativeReturn: string;
  couponSchedule: string; // e.g. 'Tiap 3 Bulan (15 Feb, 15 Mei, 15 Ags, 15 Nov)'
  nextCouponDate: string;
  whyPicked: string;
  pointsReward: number; // e.g. +750 pts on investment
}

export interface InvestmentCalendarItem {
  id: string;
  date: string; // e.g. '28 Sep'
  day: number;
  month: string;
  type: 'coupon' | 'fund-spotlight' | 'bond-offering' | 'maturity' | 'corp-action';
  title: string;
  subtitle: string;
  tag: string;
  status: 'upcoming' | 'today' | 'passed';
  pointsHint?: string;
}

export type TrimvestorTier = 'Investor' | 'Explorer' | 'Pro Investor' | 'Wealth';

export interface TrimvestorState {
  points: number;
  tier: TrimvestorTier;
  nextTierPoints: number;
  aumPointsMultiplier: number;
  recentActivities: {
    id: string;
    title: string;
    category: 'Investasi' | 'Holding AUM' | 'Recurring DCA' | 'Edukasi' | 'Check-Up';
    points: number;
    date: string;
  }[];
}

export type PremiumFeatureCategory = 'Fund Intelligence' | 'Bond Intelligence' | 'Equity Intelligence' | 'Portfolio Intelligence';

export interface PremiumFeature {
  id: string;
  title: string;
  category: PremiumFeatureCategory;
  requiredTier: TrimvestorTier;
  requiredPoints: number;
  isUnlocked: boolean;
  description: string;
  badge?: string;
}

export interface ModelPortfolio {
  id: string;
  name: string;
  profile: RiskProfile;
  horizon: string;
  expectedReturn: number; // e.g. 11.5% p.a.
  description: string;
  allocations: {
    type: 'Pasar Uang' | 'Pendapatan Tetap' | 'Saham';
    percentage: number;
    fundId: string;
    fundName: string;
    color: string;
  }[];
}

export interface VirtualPocket {
  id: string;
  name: string;
  category: GoalCategory;
  targetAmount: number; // FV
  currentAmount: number; // PV
  initialDeposit: number;
  monthlyDca: number;
  targetMonths: number;
  elapsedMonths: number;
  riskProfile: RiskProfile;
  portfolioModelId: string;
  portfolioName: string;
  createdAt: string;
  autoDcaEnabled: boolean;
  autoDcaDate: number; // day of month (e.g. 25)
  dcaSource: string; // e.g. 'Cash RDN FAC0127'
  status: 'on-track' | 'drift-warning' | 'completed';
  driftDetails?: {
    currentDistribution: { [key: string]: number };
    idealDistribution: { [key: string]: number };
    driftDelta: number;
    suggestedRebalanceNotes: string;
  };
  smartNudge?: {
    type: 'positive' | 'warning' | 'info';
    message: string;
    actionLabel?: string;
    recommendedDcaAdjustment?: number;
  };
  historicalTrajectory: {
    month: number;
    label: string;
    targetVal: number;
    actualVal: number;
  }[];
}

export interface StockTicker {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  value: string;
  frequency: string;
  peRatio?: number;
  pbvRatio?: number;
  roe?: number;
  divYield?: number;
  marketCap?: string;
}

export interface MarketIndexData {
  name: string;
  code: string;
  current: number;
  change: number;
  changePercent: number;
  prev: number;
  open: number;
  high: number;
  low: number;
  value: string;
  freq: string;
}
