import React from 'react';
import { CompanyAnalysis } from '../types/finance.js';
import { Building2, ExternalLink, ShieldCheck, Database, FileCheck, TrendingUp, TrendingDown, Layers } from 'lucide-react';

interface CompanyHeaderProps {
  data: CompanyAnalysis;
}

export const CompanyHeader: React.FC<CompanyHeaderProps> = ({ data }) => {
  const isPositive = data.priceChange >= 0;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-5 shadow-sm text-zinc-100 font-mono">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Company Title & Identifiers */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {data.exchange}: {data.symbol}
            </span>
            <span className="px-2 py-0.5 rounded text-xs bg-zinc-800 text-zinc-300 border border-zinc-700">
              {data.sector}
            </span>
            <span className="text-zinc-500 text-xs hidden sm:inline">|</span>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              ISIN: {data.isinOrCik || 'N/A'}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
            {data.companyName}
          </h2>

          <p className="text-xs text-zinc-400 mt-1 max-w-2xl line-clamp-2">
            {data.description}
          </p>
        </div>

        {/* Live Quote & Valuation Summary */}
        <div className="flex flex-row lg:flex-col items-baseline lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-zinc-800 shrink-0 gap-3">
          <div className="text-left lg:text-right">
            <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {data.currency}{data.currentPrice.toLocaleString()}
            </div>
            <div className={`text-xs font-semibold flex items-center gap-1 mt-0.5 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>
                {isPositive ? '+' : ''}{data.priceChange.toFixed(2)} ({isPositive ? '+' : ''}{data.priceChangePercent.toFixed(2)}%)
              </span>
              <span className="text-zinc-500 font-normal ml-1">Today</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-400 text-left lg:text-right">
            <div>
              <span className="text-zinc-500 block text-[10px]">MARKET CAP</span>
              <span className="text-zinc-200 font-medium">{data.metrics.marketCapFormatted}</span>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <span className="text-zinc-500 block text-[10px]">ENTERPRISE VAL</span>
              <span className="text-zinc-200 font-medium">{data.metrics.enterpriseValueFormatted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grounding and Data Verification Pipeline Bar */}
      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Filings: {data.dataSource.filingYear}</span>
          </span>
          {data.liveQuote?.fiftyTwoWeekHigh && data.liveQuote?.fiftyTwoWeekLow && (
            <>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">
                52W Range: <strong className="text-zinc-200">{data.currency}{data.liveQuote.fiftyTwoWeekLow.toLocaleString()} - {data.currency}{data.liveQuote.fiftyTwoWeekHigh.toLocaleString()}</strong>
              </span>
            </>
          )}
          {data.liveQuote?.volume && (
            <>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">
                Vol: <strong className="text-zinc-200">{data.liveQuote.volume.toLocaleString()}</strong>
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE EXCHANGE FEED
          </span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700">
            {data.dataSource.lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
};
