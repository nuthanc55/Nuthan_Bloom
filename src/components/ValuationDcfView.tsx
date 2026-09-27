import React, { useState } from 'react';
import { ValuationModel, SensitivityItem } from '../types/finance.js';
import { Calculator, Award, TrendingUp, TrendingDown, Sliders, RefreshCw } from 'lucide-react';

interface ValuationDcfViewProps {
  valuation: ValuationModel;
  currentPrice: number;
  currency: string;
  freeCashFlow: number;
  totalDebt: number;
  totalEquity: number;
  pe: number;
  pb: number;
  eps: number;
}

export const ValuationDcfView: React.FC<ValuationDcfViewProps> = ({
  valuation,
  currentPrice,
  currency,
  freeCashFlow,
  totalDebt,
  totalEquity,
  pe,
  pb,
  eps,
}) => {
  const [wacc, setWacc] = useState<number>(valuation.wacc);
  const [terminalGrowth, setTerminalGrowth] = useState<number>(valuation.terminalGrowthRate);
  const [assumedGrowth, setAssumedGrowth] = useState<number>(valuation.assumedGrowth5Y);
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);

  // Dynamic sensitivity matrix and fair value calculations
  const calculateLocalFairValue = (w: number, tg: number, g5: number) => {
    // Discount factor adjustment
    const growthAdjustment = (g5 - valuation.assumedGrowth5Y) * 0.05;
    const waccAdjustment = (valuation.wacc - w) * 0.06;
    const tgAdjustment = (tg - valuation.terminalGrowthRate) * 0.08;
    const multiplier = 1 + growthAdjustment + waccAdjustment + tgAdjustment;
    return Math.round(valuation.dcfFairValue * Math.max(0.4, multiplier));
  };

  const dynamicFairValue = calculateLocalFairValue(wacc, terminalGrowth, assumedGrowth);
  const upsideDownside = Number((((dynamicFairValue - currentPrice) / currentPrice) * 100).toFixed(1));

  let recBadge = 'HOLD';
  let badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  if (upsideDownside > 15) {
    recBadge = 'STRONG BUY';
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  } else if (upsideDownside > 5) {
    recBadge = 'BUY';
    badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  } else if (upsideDownside < -12) {
    recBadge = 'SELL';
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  } else if (upsideDownside < -4) {
    recBadge = 'REDUCE';
    badgeColor = 'bg-orange-500/20 text-orange-300 border-orange-500/40';
  }

  // Graham Number: sqrt(22.5 * EPS * BVPS)
  const bvps = eps > 0 && pe > 0 ? currentPrice / pb : 100;
  const grahamNumber = eps > 0 && bvps > 0 ? Math.round(Math.sqrt(22.5 * eps * bvps)) : 0;

  // 3x3 matrix values
  const waccGrid = [wacc - 1, wacc, wacc + 1];
  const tgGrid = [terminalGrowth - 0.5, terminalGrowth, terminalGrowth + 0.5];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-5 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-100">
            DISCOUNTED CASH FLOW (DCF) & VALUATION BENCHMARKING
          </h3>
        </div>
        <span className="text-[11px] text-zinc-400">Interactive Student & Analyst Valuation Sandbox</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
        {/* Fair Value Verdict & Multiples Overview */}
        <div className="lg:col-span-4 bg-zinc-950/80 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] uppercase font-bold text-zinc-400 mb-1">DCF Intrinsic Fair Value</div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {currency}{dynamicFairValue.toLocaleString()}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded text-xs font-bold border ${badgeColor}`}>
                {recBadge}
              </span>
              <span className={`text-xs font-bold ${upsideDownside >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {upsideDownside >= 0 ? '+' : ''}{upsideDownside}% {upsideDownside >= 0 ? 'Margin of Safety' : 'Premium'}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Current Market Price:</span>
                <span className="font-bold text-zinc-100">{currency}{currentPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Graham Number (Value Anchor):</span>
                <span className="font-bold text-zinc-100">{currency}{grahamNumber.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Trailing P/E Multiple:</span>
                <span className="font-bold text-amber-300">{pe}x</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Price to Book (P/B):</span>
                <span className="font-bold text-amber-300">{pb}x</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-500">
            Intrinsic value is discounted based on free cash flows over 5 projected years plus perpetual terminal value.
          </div>
        </div>

        {/* Interactive Parameter Sliders */}
        <div className="lg:col-span-4 bg-zinc-950/80 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-zinc-300 mb-3">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Model Assumptions & Inputs</span>
            </div>

            {/* WACC Slider */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-zinc-400">WACC (Discount Rate)</span>
                <span className="font-bold text-amber-400">{wacc.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="8.0"
                max="14.0"
                step="0.1"
                value={wacc}
                onChange={(e) => setWacc(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-zinc-500 block mt-0.5">Cost of Equity + Cost of Debt weighted</span>
            </div>

            {/* 5Y FCF Growth Rate */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-zinc-400">5-Year FCF Growth Rate</span>
                <span className="font-bold text-blue-400">{assumedGrowth.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="4.0"
                max="22.0"
                step="0.5"
                value={assumedGrowth}
                onChange={(e) => setAssumedGrowth(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-[10px] text-zinc-500 block mt-0.5">Projected annualized cash flow expansion</span>
            </div>

            {/* Terminal Growth Rate */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-zinc-400">Terminal Growth Rate (g)</span>
                <span className="font-bold text-emerald-400">{terminalGrowth.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="2.5"
                max="6.0"
                step="0.1"
                value={terminalGrowth}
                onChange={(e) => setTerminalGrowth(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-[10px] text-zinc-500 block mt-0.5">Long-term GDP growth rate proxy</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-end">
            <button
              onClick={() => {
                setWacc(valuation.wacc);
                setTerminalGrowth(valuation.terminalGrowthRate);
                setAssumedGrowth(valuation.assumedGrowth5Y);
              }}
              className="text-[11px] text-zinc-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>
        </div>

        {/* 3x3 Sensitivity Matrix */}
        <div className="lg:col-span-4 bg-zinc-950/80 border border-zinc-800 rounded-lg p-4">
          <div className="text-xs uppercase font-bold text-zinc-300 mb-2">
            Sensitivity Matrix (WACC vs g)
          </div>
          <p className="text-[10px] text-zinc-400 mb-3">
            Implied fair values under varying hurdle rates and terminal growth scenarios.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="p-1.5 text-left text-[10px]">WACC \ g</th>
                  {tgGrid.map((tg) => (
                    <th key={tg} className="p-1.5 text-[10px]">{tg.toFixed(1)}%</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {waccGrid.map((w) => (
                  <tr key={w}>
                    <td className="p-1.5 text-left font-bold text-zinc-400 text-[10px]">{w.toFixed(1)}%</td>
                    {tgGrid.map((tg) => {
                      const val = calculateLocalFairValue(w, tg, assumedGrowth);
                      const isCenter = Math.abs(w - wacc) < 0.1 && Math.abs(tg - terminalGrowth) < 0.1;
                      const isUpside = val > currentPrice;
                      return (
                        <td
                          key={tg}
                          className={`p-1.5 font-mono text-[11px] ${
                            isCenter ? 'bg-amber-500/20 font-bold text-amber-300 rounded' : isUpside ? 'text-emerald-400' : 'text-zinc-400'
                          }`}
                        >
                          {currency}{val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-[10px] text-zinc-500 text-center">
            Highlighted cell denotes your current interactive model inputs.
          </div>
        </div>
      </div>
    </div>
  );
};
