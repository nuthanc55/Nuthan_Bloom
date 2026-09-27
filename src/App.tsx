import React, { useState, useEffect } from 'react';
import { CompanyAnalysis, CompanyDocument } from './types/finance.js';
import { Navbar } from './components/Navbar.js';
import { CompanyHeader } from './components/CompanyHeader.js';
import { DashboardMetrics } from './components/DashboardMetrics.js';
import { FinancialCharts } from './components/FinancialCharts.js';
import { SegmentBreakdownView } from './components/SegmentBreakdownView.js';
import { CompanyDocumentsView } from './components/CompanyDocumentsView.js';
import { ValuationDcfView } from './components/ValuationDcfView.js';
import { AssistantChatView } from './components/AssistantChatView.js';
import { HealthScorecardView } from './components/HealthScorecardView.js';
import { BENCHMARK_COMPANIES } from './server/benchmarkData.js';
import {
  BarChart3,
  Calculator,
  FileText,
  Bot,
  ShieldCheck,
  Download,
  Share2,
  RefreshCw,
  Terminal,
  Printer,
  Copy,
  Check
} from 'lucide-react';

export default function App() {
  const [companyData, setCompanyData] = useState<CompanyAnalysis>(BENCHMARK_COMPANIES.reliance);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CHARTS' | 'VALUATION' | 'DOCUMENTS' | 'ASSISTANT' | 'HEALTH'>('OVERVIEW');
  const [externalQuestion, setExternalQuestion] = useState<string>('');
  const [copiedMemo, setCopiedMemo] = useState<boolean>(false);

  // Fetch initial company (Reliance Industries) on mount
  useEffect(() => {
    handleSearch('Analyse Reliance Industries');
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const data = await res.json();
        setCompanyData(data);
      }
    } catch (err) {
      console.error('Error fetching company data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAboutDoc = (doc: CompanyDocument) => {
    setExternalQuestion(`What are the key financial takeaways and risks in ${doc.title} (${doc.period})?`);
    setActiveTab('ASSISTANT');
  };

  const handleCopyMemo = () => {
    const memo = `=====================================================
FINPULSE EQUITY RESEARCH MEMORANDUM
COMPANY: ${companyData.companyName} (${companyData.symbol})
EXCHANGE: ${companyData.exchange} | SECTOR: ${companyData.sector}
MARKET PRICE: ${companyData.currency}${companyData.currentPrice}
-----------------------------------------------------
KEY FINANCIAL RATIOS & AUDITED METRICS:
- Revenue: ${companyData.metrics.revenueFormatted} (${companyData.trends.revenueGrowth.badge} 3Y CAGR: ${companyData.trends.revenueGrowth.cagr3Y}%)
- Net Profit: ${companyData.metrics.netProfitFormatted} (${companyData.trends.profitGrowth.badge} 3Y CAGR: ${companyData.trends.profitGrowth.cagr3Y}%)
- Diluted EPS: ${companyData.metrics.epsFormatted}
- ROE: ${companyData.metrics.roeFormatted}
- ROCE: ${companyData.metrics.roceFormatted}
- Debt to Equity: ${companyData.metrics.debtToEquityFormatted} (${companyData.trends.debtTrend.badge} Trend: ${companyData.trends.debtTrend.changePercentage ?? 0}%)
- P/E Multiple: ${companyData.metrics.peFormatted}
- Price to Book: ${companyData.metrics.pbFormatted}
- Free Cash Flow: ${companyData.metrics.freeCashFlowFormatted}
-----------------------------------------------------
VALUATION (DCF):
- Intrinsic Fair Value: ${companyData.currency}${companyData.valuation.dcfFairValue}
- Implied Upside/Downside: ${companyData.valuation.upsideDownsidePercent}%
- Analyst Rating: ${companyData.valuation.recommendation}
=====================================================`;

    navigator.clipboard.writeText(memo);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-mono selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bloomberg-style Navigation & Command Line */}
      <Navbar
        onSearch={handleSearch}
        isLoading={isLoading}
        activeCompanySymbol={companyData.symbol}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 space-y-4">
        {/* Loading Overlay Notice if searching */}
        {isLoading && (
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>COLLECTING STATUTORY FILINGS & COMPUTING DERIVED RATIOS FOR {companyData.symbol}...</span>
            </div>
            <span className="text-[11px] text-zinc-400">RAG pipeline executing</span>
          </div>
        )}

        {/* Company Identity & Real-time Quote Banner */}
        <CompanyHeader data={companyData} />

        {/* The 8 Primary Metrics & 3 Core Trends (Explicitly requested by user) */}
        <DashboardMetrics data={companyData} />

        {/* Terminal Workspace Navigation Tabs */}
        <div className="border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`px-3 py-2 border-b-2 font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'OVERVIEW'
                  ? 'border-amber-400 text-amber-400 bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>OVERVIEW & CHARTS</span>
            </button>

            <button
              onClick={() => setActiveTab('VALUATION')}
              className={`px-3 py-2 border-b-2 font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'VALUATION'
                  ? 'border-amber-400 text-amber-400 bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>DCF VALUATION MODEL</span>
            </button>

            <button
              onClick={() => setActiveTab('DOCUMENTS')}
              className={`px-3 py-2 border-b-2 font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'DOCUMENTS'
                  ? 'border-amber-400 text-amber-400 bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>COMPANY REPORTS ({companyData.documents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ASSISTANT')}
              className={`px-3 py-2 border-b-2 font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'ASSISTANT'
                  ? 'border-amber-400 text-amber-400 bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 font-bold">AI RESEARCH ASSISTANT</span>
            </button>

            <button
              onClick={() => setActiveTab('HEALTH')}
              className={`px-3 py-2 border-b-2 font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'HEALTH'
                  ? 'border-amber-400 text-amber-400 bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HEALTH & MOAT</span>
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 pb-1.5">
            <button
              onClick={handleCopyMemo}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-amber-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy formatted equity research memorandum"
            >
              {copiedMemo ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedMemo ? 'COPIED MEMO' : 'COPY RESEARCH MEMO'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-amber-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print terminal report"
            >
              <Printer className="w-3 h-3" />
              <span>PRINT</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="pt-2">
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-4">
              <FinancialCharts
                historicalData={companyData.historicalData}
                quarterlyData={companyData.quarterlyData}
                currency={companyData.currency}
                unit={companyData.unit}
                livePriceHistory={companyData.liveQuote?.sparkline}
                currentPrice={companyData.currentPrice}
              />
              <SegmentBreakdownView
                segments={companyData.segments}
                currency={companyData.currency}
                unit={companyData.unit}
                data={companyData}
              />
            </div>
          )}

          {activeTab === 'VALUATION' && (
            <ValuationDcfView
              valuation={companyData.valuation}
              currentPrice={companyData.currentPrice}
              currency={companyData.currency}
              freeCashFlow={companyData.metrics.freeCashFlow}
              totalDebt={companyData.historicalData[companyData.historicalData.length - 1]?.totalDebt || 0}
              totalEquity={companyData.historicalData[companyData.historicalData.length - 1]?.totalEquity || 0}
              pe={companyData.metrics.pe}
              pb={companyData.metrics.pb}
              eps={companyData.metrics.eps}
            />
          )}

          {activeTab === 'DOCUMENTS' && (
            <CompanyDocumentsView
              documents={companyData.documents}
              onAskAboutDoc={handleAskAboutDoc}
            />
          )}

          {activeTab === 'ASSISTANT' && (
            <AssistantChatView
              company={companyData}
              initialQuestion={externalQuestion}
              onClearInitialQuestion={() => setExternalQuestion('')}
            />
          )}

          {activeTab === 'HEALTH' && (
            <HealthScorecardView
              scorecard={companyData.healthScore}
              data={companyData}
            />
          )}
        </div>
      </main>

      {/* Terminal Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-3 px-4 text-xs font-mono text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-3">
          <span className="text-amber-400/80 font-bold">FINPULSE RESEARCH WORKSTATION</span>
          <span>•</span>
          <span>BSE / NSE / SEC EDGAR Statutory Data Grounding</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-zinc-500">
          <span>Formula Engine: Ind-AS / US-GAAP Compliant</span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> System Operational
          </span>
        </div>
      </footer>
    </div>
  );
}
