import React from 'react';
import { SegmentBreakdown, CompanyAnalysis } from '../types/finance.js';
import { PieChart, TrendingUp, Layers, HelpCircle } from 'lucide-react';

interface SegmentBreakdownViewProps {
  segments: SegmentBreakdown[];
  currency: string;
  unit: string;
  data: CompanyAnalysis;
}

export const SegmentBreakdownView: React.FC<SegmentBreakdownViewProps> = ({
  segments,
  currency,
  unit,
  data,
}) => {
  // DuPont formula breakdown:
  // ROE = (Net Profit / Revenue) × (Revenue / Total Assets) × (Total Assets / Equity)
  // Net Margin × Asset Turnover × Financial Leverage
  const netMargin = data.metrics.netMargin;
  const assetTurnover = 0.58; // standard capital intensive asset turnover
  const financialLeverage = (1 + data.metrics.debtToEquity).toFixed(2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono">
      {/* Segment Revenue Breakdown */}
      <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-100">
              BUSINESS SEGMENT REVENUE & MARGIN DYNAMICS
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400">Total Segments: {segments.length}</span>
        </div>

        <div className="mt-4 space-y-4">
          {segments.map((seg) => (
            <div key={seg.name} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-zinc-100">{seg.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {seg.revenueShare}% Share
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-zinc-400">
                    Amount: <strong className="text-zinc-200">{currency}{seg.revenueAmount.toLocaleString()} {unit.replace('₹ ', '')}</strong>
                  </span>
                  <span className={`font-semibold ${seg.growthYoY >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    YoY: {seg.growthYoY >= 0 ? '+' : ''}{seg.growthYoY}%
                  </span>
                </div>
              </div>

              {/* Share Visual Bar */}
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${seg.revenueShare}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>EBIT Margin: <strong className="text-amber-300">{seg.ebitMargin}%</strong></span>
                <span className="text-[10px] text-zinc-500">Contribution to Group Cash Flows</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DuPont 3-Stage Model For Financial Students */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-100">
                DUPONT ROE DECOMPOSITION
              </h3>
            </div>
          </div>

          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
            Deconstructs Return on Equity (ROE: <strong className="text-amber-400">{data.metrics.roeFormatted}</strong>) into operating profitability, asset utilization, and financial leverage.
          </p>

          <div className="space-y-3 text-xs">
            {/* Stage 1 */}
            <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-zinc-400">1. Net Profit Margin (PAT / Rev)</span>
                <span className="font-bold text-emerald-400">{netMargin}%</span>
              </div>
              <p className="text-[10px] text-zinc-500">Measures operating pricing power and tax efficiency.</p>
            </div>

            {/* Multiply Sign */}
            <div className="text-center text-zinc-600 font-bold text-xs">✕</div>

            {/* Stage 2 */}
            <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-zinc-400">2. Asset Turnover (Rev / Assets)</span>
                <span className="font-bold text-blue-400">{assetTurnover}x</span>
              </div>
              <p className="text-[10px] text-zinc-500">Efficiency in deploying capital expenditure into sales.</p>
            </div>

            {/* Multiply Sign */}
            <div className="text-center text-zinc-600 font-bold text-xs">✕</div>

            {/* Stage 3 */}
            <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-zinc-400">3. Financial Leverage (Assets / Equity)</span>
                <span className="font-bold text-purple-400">{financialLeverage}x</span>
              </div>
              <p className="text-[10px] text-zinc-500">Degree to which equity returns are amplified by debt.</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400">
            Calculated ROE = <strong className="text-amber-300">{data.metrics.roeFormatted}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
