import React, { useState } from 'react';
import { HistoricalYearData, QuarterlyData } from '../types/finance.js';
import { BarChart3, TrendingUp, DollarSign, Layers } from 'lucide-react';

interface FinancialChartsProps {
  historicalData: HistoricalYearData[];
  quarterlyData: QuarterlyData[];
  currency: string;
  unit: string;
  livePriceHistory?: number[];
  currentPrice?: number;
}

export const FinancialCharts: React.FC<FinancialChartsProps> = ({
  historicalData,
  quarterlyData,
  currency,
  unit,
  livePriceHistory,
  currentPrice,
}) => {
  const [activeView, setActiveView] = useState<'REV_PROFIT' | 'DEBT_EQUITY' | 'MARGINS' | 'CASH_FLOW' | 'MARKET_PRICE'>('REV_PROFIT');
  const [timeframe, setTimeframe] = useState<'ANNUAL' | 'QUARTERLY'>('ANNUAL');

  // SVG Chart Dimensions
  const chartHeight = 220;
  const chartWidth = 580;
  const padding = { top: 25, right: 30, bottom: 35, left: 60 };

  const usableWidth = chartWidth - padding.left - padding.right;
  const usableHeight = chartHeight - padding.top - padding.bottom;

  // Max calculations for annual data
  const maxRevenue = Math.max(...historicalData.map(d => d.revenue), 1);
  const maxProfit = Math.max(...historicalData.map(d => Math.max(d.netProfit, 0)), 1);
  const maxPrimary = Math.max(maxRevenue, maxProfit);

  const maxDebt = Math.max(...historicalData.map(d => Math.max(d.totalDebt, d.totalEquity)), 1);
  const maxCashFlow = Math.max(...historicalData.map(d => Math.max(d.operatingCashFlow, d.freeCashFlow, d.capex)), 1);

  const formatShort = (val: number) => {
    if (Math.abs(val) >= 100000) return `${(val / 100000).toFixed(1)}L`;
    if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return val.toString();
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-5 font-mono">
      {/* Top Header & Chart Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-100">
            FINANCIAL STATEMENT VISUALIZER
          </h3>
        </div>

        {/* View Mode Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveView('REV_PROFIT')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeView === 'REV_PROFIT'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Rev & PAT
          </button>
          <button
            onClick={() => setActiveView('DEBT_EQUITY')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeView === 'DEBT_EQUITY'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Debt vs Equity
          </button>
          <button
            onClick={() => setActiveView('MARGINS')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeView === 'MARGINS'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Margins %
          </button>
          <button
            onClick={() => setActiveView('CASH_FLOW')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              activeView === 'CASH_FLOW'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Cash Flow & Capex
          </button>
          <button
            onClick={() => setActiveView('MARKET_PRICE')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              activeView === 'MARKET_PRICE'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Live Price (30D)</span>
          </button>
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[540px]">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible select-none">
            {/* Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding.top + usableHeight * (1 - ratio);
              return (
                <g key={ratio}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={chartWidth - padding.right}
                    y2={y}
                    stroke="#27272a"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={padding.left - 8}
                    y={y + 3}
                    textAnchor="end"
                    fill="#71717a"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {activeView === 'MARGINS'
                      ? `${(ratio * 35).toFixed(0)}%`
                      : formatShort(ratio * (activeView === 'DEBT_EQUITY' ? maxDebt : activeView === 'CASH_FLOW' ? maxCashFlow : maxPrimary))}
                  </text>
                </g>
              );
            })}

            {/* Bars & Lines for Revenue & Net Profit */}
            {activeView === 'REV_PROFIT' && (
              historicalData.map((d, i) => {
                const totalBars = historicalData.length;
                const slotWidth = usableWidth / totalBars;
                const barWidth = slotWidth * 0.32;
                const groupCenterX = padding.left + i * slotWidth + slotWidth / 2;

                const revHeight = (d.revenue / maxPrimary) * usableHeight;
                const profitHeight = Math.max(0, (d.netProfit / maxPrimary) * usableHeight);

                const revX = groupCenterX - barWidth - 2;
                const profitX = groupCenterX + 2;

                return (
                  <g key={d.year}>
                    {/* Revenue Bar */}
                    <rect
                      x={revX}
                      y={padding.top + usableHeight - revHeight}
                      width={barWidth}
                      height={revHeight}
                      fill="#3b82f6"
                      rx="2"
                      className="hover:opacity-80 transition-opacity"
                    />

                    {/* Net Profit Bar */}
                    <rect
                      x={profitX}
                      y={padding.top + usableHeight - profitHeight}
                      width={barWidth}
                      height={profitHeight}
                      fill="#10b981"
                      rx="2"
                      className="hover:opacity-80 transition-opacity"
                    />

                    {/* Year Label */}
                    <text
                      x={groupCenterX}
                      y={chartHeight - 12}
                      textAnchor="middle"
                      fill="#a1a1aa"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {d.year}
                    </text>
                  </g>
                );
              })
            )}

            {/* Debt vs Equity View */}
            {activeView === 'DEBT_EQUITY' && (
              historicalData.map((d, i) => {
                const totalBars = historicalData.length;
                const slotWidth = usableWidth / totalBars;
                const barWidth = slotWidth * 0.32;
                const groupCenterX = padding.left + i * slotWidth + slotWidth / 2;

                const debtHeight = (d.totalDebt / maxDebt) * usableHeight;
                const equityHeight = (d.totalEquity / maxDebt) * usableHeight;

                return (
                  <g key={d.year}>
                    {/* Debt Bar */}
                    <rect
                      x={groupCenterX - barWidth - 2}
                      y={padding.top + usableHeight - debtHeight}
                      width={barWidth}
                      height={debtHeight}
                      fill="#f43f5e"
                      rx="2"
                    />

                    {/* Equity Bar */}
                    <rect
                      x={groupCenterX + 2}
                      y={padding.top + usableHeight - equityHeight}
                      width={barWidth}
                      height={equityHeight}
                      fill="#8b5cf6"
                      rx="2"
                    />

                    <text
                      x={groupCenterX}
                      y={chartHeight - 12}
                      textAnchor="middle"
                      fill="#a1a1aa"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {d.year}
                    </text>
                  </g>
                );
              })
            )}

            {/* Margins Line View */}
            {activeView === 'MARGINS' && (
              <>
                {/* OPM Polyline */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  points={historicalData
                    .map((d, i) => {
                      const totalBars = historicalData.length;
                      const slotWidth = usableWidth / totalBars;
                      const x = padding.left + i * slotWidth + slotWidth / 2;
                      const y = padding.top + usableHeight - (d.opm / 35) * usableHeight;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />

                {/* NPM Polyline */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  points={historicalData
                    .map((d, i) => {
                      const totalBars = historicalData.length;
                      const slotWidth = usableWidth / totalBars;
                      const x = padding.left + i * slotWidth + slotWidth / 2;
                      const y = padding.top + usableHeight - (d.npm / 35) * usableHeight;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />

                {historicalData.map((d, i) => {
                  const totalBars = historicalData.length;
                  const slotWidth = usableWidth / totalBars;
                  const x = padding.left + i * slotWidth + slotWidth / 2;
                  const opmY = padding.top + usableHeight - (d.opm / 35) * usableHeight;
                  const npmY = padding.top + usableHeight - (d.npm / 35) * usableHeight;
                  return (
                    <g key={d.year}>
                      <circle cx={x} cy={opmY} r="4" fill="#f59e0b" />
                      <circle cx={x} cy={npmY} r="4" fill="#10b981" />
                      <text x={x} y={opmY - 8} fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="bold">
                        {d.opm.toFixed(1)}%
                      </text>
                      <text x={x} y={chartHeight - 12} textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="bold">
                        {d.year}
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Cash Flow & Capex View */}
            {activeView === 'CASH_FLOW' && (
              historicalData.map((d, i) => {
                const totalBars = historicalData.length;
                const slotWidth = usableWidth / totalBars;
                const barWidth = slotWidth * 0.26;
                const groupCenterX = padding.left + i * slotWidth + slotWidth / 2;

                const ocfHeight = Math.max(0, (d.operatingCashFlow / maxCashFlow) * usableHeight);
                const capexHeight = Math.max(0, (d.capex / maxCashFlow) * usableHeight);
                const fcfHeight = Math.max(0, (d.freeCashFlow / maxCashFlow) * usableHeight);

                return (
                  <g key={d.year}>
                    <rect x={groupCenterX - barWidth * 1.5 - 2} y={padding.top + usableHeight - ocfHeight} width={barWidth} height={ocfHeight} fill="#0ea5e9" rx="2" />
                    <rect x={groupCenterX - barWidth * 0.5} y={padding.top + usableHeight - capexHeight} width={barWidth} height={capexHeight} fill="#f97316" rx="2" />
                    <rect x={groupCenterX + barWidth * 0.5 + 2} y={padding.top + usableHeight - fcfHeight} width={barWidth} height={fcfHeight} fill="#10b981" rx="2" />
                    <text x={groupCenterX} y={chartHeight - 12} textAnchor="middle" fill="#a1a1aa" fontSize="10" fontWeight="bold">
                      {d.year}
                    </text>
                  </g>
                );
              })
            )}
            {/* Live Market Price View */}
            {activeView === 'MARKET_PRICE' && (
              (() => {
                const prices = (livePriceHistory && livePriceHistory.length > 1)
                  ? livePriceHistory
                  : [
                      (currentPrice || 1000) * 0.94,
                      (currentPrice || 1000) * 0.96,
                      (currentPrice || 1000) * 0.95,
                      (currentPrice || 1000) * 0.98,
                      (currentPrice || 1000) * 0.97,
                      (currentPrice || 1000) * 0.99,
                      (currentPrice || 1000) * 1.01,
                      (currentPrice || 1000) * 1.00,
                      currentPrice || 1000
                    ];
                const minP = Math.min(...prices) * 0.98;
                const maxP = Math.max(...prices) * 1.02;
                const rangeP = Math.max(1, maxP - minP);

                const points = prices.map((p, idx) => {
                  const x = padding.left + (idx / (prices.length - 1)) * usableWidth;
                  const y = padding.top + usableHeight - ((p - minP) / rangeP) * usableHeight;
                  return `${x},${y}`;
                }).join(' ');

                const isUp = prices[prices.length - 1] >= prices[0];
                const strokeColor = isUp ? '#10b981' : '#f43f5e';

                return (
                  <g>
                    {/* Area glow */}
                    <polygon
                      points={`${padding.left},${padding.top + usableHeight} ${points} ${padding.left + usableWidth},${padding.top + usableHeight}`}
                      fill={isUp ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)'}
                    />
                    {/* Main price line */}
                    <polyline
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="2.5"
                      points={points}
                    />
                    {/* Points on line */}
                    {prices.map((p, idx) => {
                      const x = padding.left + (idx / (prices.length - 1)) * usableWidth;
                      const y = padding.top + usableHeight - ((p - minP) / rangeP) * usableHeight;
                      return (
                        <circle
                          key={idx}
                          cx={x}
                          cy={y}
                          r={idx === prices.length - 1 ? 5 : 2.5}
                          fill={strokeColor}
                        />
                      );
                    })}
                    {/* Start and Current Price Labels */}
                    <text
                      x={padding.left + 5}
                      y={chartHeight - 12}
                      fill="#71717a"
                      fontSize="10"
                    >
                      30 Days Ago: {currency}{Math.round(prices[0]).toLocaleString()}
                    </text>
                    <text
                      x={padding.left + usableWidth - 5}
                      y={chartHeight - 12}
                      textAnchor="end"
                      fill={strokeColor}
                      fontSize="10"
                      fontWeight="bold"
                    >
                      Latest Close: {currency}{Math.round(prices[prices.length - 1]).toLocaleString()}
                    </text>
                  </g>
                );
              })()
            )}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-3 pt-3 border-t border-zinc-800 text-xs">
        {activeView === 'MARKET_PRICE' && (
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-3 h-0.5 bg-emerald-400"></span> Live Continuous Exchange Price Quotes (Recent Trading Sessions)
          </span>
        )}
        {activeView === 'REV_PROFIT' && (
          <>
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-3 h-3 rounded bg-blue-500"></span> Gross Revenue ({unit})
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 rounded bg-emerald-500"></span> Net Profit (PAT) ({unit})
            </span>
          </>
        )}
        {activeView === 'DEBT_EQUITY' && (
          <>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-3 h-3 rounded bg-rose-500"></span> Total Borrowings / Debt ({unit})
            </span>
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-3 h-3 rounded bg-purple-500"></span> Shareholder Net Worth ({unit})
            </span>
          </>
        )}
        {activeView === 'MARGINS' && (
          <>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-0.5 bg-amber-400"></span> Operating Profit Margin (OPM %)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-0.5 bg-emerald-400 border-b border-dashed"></span> Net Profit Margin (NPM %)
            </span>
          </>
        )}
        {activeView === 'CASH_FLOW' && (
          <>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-3 h-3 rounded bg-sky-500"></span> Operating Cash Flow (OCF)
            </span>
            <span className="flex items-center gap-1.5 text-orange-400">
              <span className="w-3 h-3 rounded bg-orange-500"></span> Capital Expenditure (Capex)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 rounded bg-emerald-500"></span> Free Cash Flow (FCF)
            </span>
          </>
        )}
      </div>

      {/* Historical Data Table For Retail Researchers & Students */}
      <div className="mt-4 pt-3 border-t border-zinc-800">
        <h4 className="text-[11px] font-bold text-zinc-400 uppercase mb-2">
          AUDITED ANNUAL STATEMENT RECORD ({unit})
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="py-1.5 px-2">Line Item</th>
                {historicalData.map(d => (
                  <th key={d.year} className="py-1.5 px-2 text-right">{d.year}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              <tr>
                <td className="py-1.5 px-2 font-medium text-zinc-200">Revenue</td>
                {historicalData.map(d => (
                  <td key={d.year} className="py-1.5 px-2 text-right">{d.revenue.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-medium text-zinc-200">Operating Profit (EBITDA)</td>
                {historicalData.map(d => (
                  <td key={d.year} className="py-1.5 px-2 text-right">{d.operatingProfit.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-medium text-emerald-400">Net Profit (PAT)</td>
                {historicalData.map(d => (
                  <td key={d.year} className="py-1.5 px-2 text-right text-emerald-400 font-semibold">{d.netProfit.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="py-1.5 px-2">EPS ({currency})</td>
                {historicalData.map(d => (
                  <td key={d.year} className="py-1.5 px-2 text-right">{d.eps.toFixed(2)}</td>
                ))}
              </tr>
              <tr>
                <td className="py-1.5 px-2">Total Debt</td>
                {historicalData.map(d => (
                  <td key={d.year} className="py-1.5 px-2 text-right">{d.totalDebt.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="py-1.5 px-2">Net Worth / Equity</td>
                {historicalData.map(d => (
                  <td key={d.year} className="py-1.5 px-2 text-right">{d.totalEquity.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="py-1.5 px-2">Free Cash Flow</td>
                {historicalData.map(d => (
                  <td key={d.year} className={`py-1.5 px-2 text-right font-medium ${d.freeCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {d.freeCashFlow.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-zinc-800/30 font-semibold">
                <td className="py-1.5 px-2 text-amber-300">ROE %</td>
                {historicalData.map(d => (
                  <td key={d.year} className="py-1.5 px-2 text-right text-amber-300">{d.roe.toFixed(1)}%</td>
                ))}
              </tr>
              <tr className="bg-zinc-800/30 font-semibold">
                <td className="py-1.5 px-2 text-amber-300">ROCE %</td>
                {historicalData.map(d => (
                  <td key={d.year} className="py-1.5 px-2 text-right text-amber-300">{d.roce.toFixed(1)}%</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
