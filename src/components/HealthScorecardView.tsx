import React from 'react';
import { HealthScorecard, CompanyAnalysis } from '../types/finance.js';
import { ShieldCheck, Award, AlertTriangle, TrendingUp, CheckCircle, Scale } from 'lucide-react';

interface HealthScorecardViewProps {
  scorecard: HealthScorecard;
  data: CompanyAnalysis;
}

export const HealthScorecardView: React.FC<HealthScorecardViewProps> = ({
  scorecard,
  data,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 65) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getMoatBadge = (rating: HealthScorecard['moatRating']) => {
    if (rating === 'Wide') {
      return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">WIDE MOAT</span>;
    }
    if (rating === 'Narrow') {
      return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">NARROW MOAT</span>;
    }
    return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">NO MOAT</span>;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-5 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-100">
            FINANCIAL HEALTH SCORECARD & ECONOMIC MOAT RATING
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Competitive Moat:</span>
          {getMoatBadge(scorecard.moatRating)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
        {/* Overall Score */}
        <div className="p-4 rounded-lg bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between text-center">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">Composite Health</span>
            <div className={`text-4xl font-extrabold ${getScoreColor(scorecard.overall).split(' ')[0]}`}>
              {scorecard.overall}
            </div>
            <span className="text-[10px] text-zinc-400 block mt-1">out of 100</span>
          </div>
          <div className="mt-3 text-[10px] text-zinc-500 border-t border-zinc-800 pt-2">
            Institutional Rank: Top Tier
          </div>
        </div>

        {/* Profitability Sub-score */}
        <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">Profitability</span>
              <span className="text-xs font-bold text-zinc-200">{scorecard.profitability}/100</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${scorecard.profitability}%` }} />
            </div>
            <p className="text-[10px] text-zinc-500">
              ROE ({data.metrics.roeFormatted}) & ROCE ({data.metrics.roceFormatted}) return spread.
            </p>
          </div>
        </div>

        {/* Financial Solvency Sub-score */}
        <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">Balance Sheet</span>
              <span className="text-xs font-bold text-zinc-200">{scorecard.financialHealth}/100</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${scorecard.financialHealth}%` }} />
            </div>
            <p className="text-[10px] text-zinc-500">
              Debt/Equity ({data.metrics.debtToEquityFormatted}) & Interest Coverage ({data.metrics.interestCoverage}x).
            </p>
          </div>
        </div>

        {/* Growth Velocity Sub-score */}
        <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">Growth Velocity</span>
              <span className="text-xs font-bold text-zinc-200">{scorecard.growth}/100</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${scorecard.growth}%` }} />
            </div>
            <p className="text-[10px] text-zinc-500">
              Revenue 3Y CAGR ({data.trends.revenueGrowth.cagr3Y}%) & Profit ({data.trends.profitGrowth.cagr3Y}%).
            </p>
          </div>
        </div>

        {/* Valuation Score */}
        <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">Valuation Appeal</span>
              <span className="text-xs font-bold text-zinc-200">{scorecard.valuationScore}/100</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${scorecard.valuationScore}%` }} />
            </div>
            <p className="text-[10px] text-zinc-500">
              P/E ({data.metrics.peFormatted}) vs DCF Intrinsic Value upside ({data.valuation.upsideDownsidePercent}%).
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Analyst Bullet Points */}
      <div className="mt-4 pt-3 border-t border-zinc-800">
        <h4 className="text-xs uppercase font-bold text-amber-400 mb-2">
          EQUITY ANALYST SUMMARY & STRATEGIC MOAT ASSESSMENT
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {scorecard.summaryBulletPoints.map((point, idx) => (
            <div key={idx} className="p-2.5 rounded bg-zinc-950/70 border border-zinc-800 flex items-start gap-2 text-xs text-zinc-300">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
