export interface HistoricalYearData {
  year: string;
  revenue: number; // ₹ Cr or $M
  netProfit: number;
  operatingProfit: number;
  eps: number;
  totalDebt: number;
  totalEquity: number;
  operatingCashFlow: number;
  capex: number;
  freeCashFlow: number;
  roe: number; // %
  roce: number; // %
  debtToEquity: number;
  opm: number; // %
  npm: number; // %
}

export interface QuarterlyData {
  quarter: string;
  revenue: number;
  netProfit: number;
  operatingMargin: number;
  eps: number;
}

export interface CompanyDocument {
  id: string;
  title: string;
  type: 'ANNUAL_REPORT' | 'EARNINGS_CALL' | 'INVESTOR_PRESENTATION' | 'AUDIT_NOTE' | 'REGULATORY_FILING';
  period: string;
  summary: string;
  keyHighlights: string[];
  extractedMetrics?: { label: string; value: string }[];
  date: string;
  sourceUrl?: string;
}

export interface SegmentBreakdown {
  name: string;
  revenueShare: number; // %
  revenueAmount: number;
  growthYoY: number; // %
  ebitMargin: number; // %
}

export interface SensitivityItem {
  wacc: number;
  terminalGrowth: number;
  fairValue: number;
}

export interface ValuationModel {
  currentPrice: number;
  dcfFairValue: number;
  grahamNumber?: number;
  peFairValue?: number;
  upsideDownsidePercent: number;
  recommendation: 'STRONG BUY' | 'BUY' | 'HOLD' | 'REDUCE' | 'SELL';
  wacc: number;
  terminalGrowthRate: number;
  assumedGrowth5Y: number;
  sensitivityMatrix: SensitivityItem[];
}

export interface FinancialMetricSet {
  revenue: number;
  revenueFormatted: string;
  netProfit: number;
  netProfitFormatted: string;
  eps: number;
  epsFormatted: string;
  roe: number;
  roeFormatted: string;
  roce: number;
  roceFormatted: string;
  debtToEquity: number;
  debtToEquityFormatted: string;
  pe: number;
  peFormatted: string;
  pb: number;
  pbFormatted: string;
  evEbitda: number;
  dividendYield: number;
  freeCashFlow: number;
  freeCashFlowFormatted: string;
  operatingMargin: number;
  netMargin: number;
  currentRatio: number;
  interestCoverage: number;
  marketCapFormatted: string;
  enterpriseValueFormatted: string;
}

export interface TrendMetric {
  direction: 'up' | 'down' | 'flat';
  cagr3Y: number;
  yoy?: number;
  changePercentage?: number;
  badge: '📈' | '📉' | '➡️';
  description: string;
}

export interface TrendsSet {
  revenueGrowth: TrendMetric;
  profitGrowth: TrendMetric;
  debtTrend: TrendMetric;
}

export interface HealthScorecard {
  overall: number; // 0 - 100
  profitability: number;
  financialHealth: number;
  growth: number;
  valuationScore: number;
  moatRating: 'Wide' | 'Narrow' | 'None';
  summaryBulletPoints: string[];
}

export interface CompanyAnalysis {
  companyName: string;
  symbol: string;
  exchange: string;
  currency: string;
  currencyCode: string;
  unit: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  sector: string;
  industry: string;
  description: string;
  isinOrCik?: string;

  metrics: FinancialMetricSet;
  trends: TrendsSet;
  historicalData: HistoricalYearData[];
  quarterlyData: QuarterlyData[];
  segments: SegmentBreakdown[];
  documents: CompanyDocument[];
  valuation: ValuationModel;
  healthScore: HealthScorecard;

  dataSource: {
    source: string;
    lastUpdated: string;
    filingYear: string;
    isRealtimeGrounding: boolean;
  };
  liveQuote?: {
    fiftyTwoWeekHigh?: number;
    fiftyTwoWeekLow?: number;
    volume?: number;
    lastTradeTime?: string;
    sparkline?: number[];
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: { source: string; snippet: string }[];
  suggestedFollowUps?: string[];
}
