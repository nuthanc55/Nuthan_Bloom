import React from 'react';
import { CompanyAnalysis } from '../types/finance.js';
import { TrendingUp, TrendingDown, Info, ShieldAlert, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardMetricsProps {
  data: CompanyAnalysis;
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ data }) => {
  const { metrics, trends } = data;

  const keyMetricCards = [
    {
      label: 'Revenue',
      value: metrics.revenueFormatted,
      formula: 'Gross Top-line Sales / Operating Turnover',
      category: 'Topline',
      highlight: true,
    },
    {
      label: 'Net Profit',
      value: metrics.netProfitFormatted,
      formula: 'Profit After Tax (PAT) / Bottom-line Earnings',
      category: 'Bottomline',
      highlight: true,
    },
    {
      label: 'EPS',
      value: metrics.epsFormatted,
      formula: 'Net Income / Weighted Diluted Share Count',
      category: 'Per Share',
      highlight: false,
    },
    {
      label: 'ROE',
      value: metrics.roeFormatted,
      formula: '(Net Profit / Shareholder Equity) × 100',
      category: 'Return',
      status: metrics.roe >= 15 ? 'good' : metrics.roe >= 8 ? 'moderate' : 'low',
      highlight: false,
    },
    {
      label: 'ROCE',
      value: metrics.roceFormatted,
      formula: 'EBIT / (Total Equity + Total Debt) × 100',
      category: 'Capital Efficiency',
      status: metrics.roce >= 15 ? 'good' : metrics.roce >= 9 ? 'moderate' : 'low',
      highlight: false,
    },
    {
      label: 'Debt / Equity',
      value: metrics.debtToEquityFormatted,
      formula: 'Total Borrowings / Total Shareholder Equity',
      category: 'Solvency',
      status: metrics.debtToEquity <= 0.6 ? 'good' : metrics.debtToEquity <= 1.2 ? 'moderate' : 'high',
      highlight: false,
    },
    {
      label: 'P/E Ratio',
      value: metrics.peFormatted,
      formula: 'Current Market Price / Diluted EPS',
      category: 'Valuation',
      highlight: false,
    },
    {
      label: 'P/B Ratio',
      value: metrics.pbFormatted,
      formula: 'Current Market Price / Book Value Per Share',
      category: 'Valuation',
      highlight: false,
    },
  ];

  return (
    <section className="space-y-4 font-mono">
      {/* 8 Primary Financial Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-amber-400">
              [KEY FINANCIAL METRICS & VALUATION RATIOS]
            </h3>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">Calculated from audited annual filings</span>
          </div>
          <span className="text-[11px] text-zinc-400">Currency: {data.currency} ({data.currencyCode})</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {keyMetricCards.map((metric) => (
            <div
              key={metric.label}
              className={`p-3 rounded-lg border transition-all relative group ${
                metric.highlight
                  ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/60'
                  : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-300">
                  {metric.label}
                </span>
                <span className="text-[9px] text-zinc-500">{metric.category}</span>
              </div>

              <div className="text-sm sm:text-base font-bold text-zinc-100 tracking-tight truncate">
                {metric.value}
              </div>

              {/* Tooltip on hover */}
              <div className="mt-1 text-[10px] text-zinc-500 truncate" title={metric.formula}>
                {metric.formula}
              </div>

              {metric.status && (
                <div className="mt-1.5 flex items-center gap-1 text-[10px]">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      metric.status === 'good'
                        ? 'bg-emerald-400'
                        : metric.status === 'moderate'
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                    }`}
                  />
                  <span className="capitalize text-zinc-400">{metric.status}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3 Core Requested Trend Cards: Revenue Growth 📈, Profit Growth 📈, Debt Trend 📉 */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs uppercase font-bold tracking-wider text-amber-400">
            [HISTORICAL TREND VECTORS & MOMENTUM]
          </h3>
          <span className="text-[11px] text-zinc-500">3-Year Compound Annual Growth & Trajectory</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Revenue Growth Card */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{trends.revenueGrowth.badge}</span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-zinc-200">
                    Revenue Growth
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {trends.revenueGrowth.cagr3Y >= 0 ? '+' : ''}{trends.revenueGrowth.cagr3Y}% 3Y CAGR
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {trends.revenueGrowth.description}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>YoY Trajectory</span>
              <span className="font-semibold text-zinc-200">
                {(trends.revenueGrowth.yoy ?? 0) >= 0 ? '+' : ''}{trends.revenueGrowth.yoy ?? 0}%
              </span>
            </div>
          </div>

          {/* Profit Growth Card */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{trends.profitGrowth.badge}</span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-zinc-200">
                    Profit Growth
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {trends.profitGrowth.cagr3Y >= 0 ? '+' : ''}{trends.profitGrowth.cagr3Y}% 3Y CAGR
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {trends.profitGrowth.description}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>YoY Bottomline Delta</span>
              <span className="font-semibold text-zinc-200">
                {(trends.profitGrowth.yoy ?? 0) >= 0 ? '+' : ''}{trends.profitGrowth.yoy ?? 0}%
              </span>
            </div>
          </div>

          {/* Debt Trend Card */}
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{trends.debtTrend.badge}</span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-zinc-200">
                    Debt Trend
                  </h4>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                    trends.debtTrend.direction === 'down'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {(trends.debtTrend.changePercentage ?? 0) >= 0 ? '+' : ''}{trends.debtTrend.changePercentage ?? 0}% Trend
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {trends.debtTrend.description}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Solvency Posture</span>
              <span className="font-semibold text-zinc-200">
                {metrics.debtToEquity <= 0.6 ? 'Low Leverage (Strong)' : 'Manageable Leverage'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
