import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Terminal, Activity, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  activeCompanySymbol: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, isLoading, activeCompanySymbol }) => {
  const [inputVal, setInputVal] = useState('Analyse Reliance Industries');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const quickPresets = [
    { label: 'Reliance', query: 'Analyse Reliance Industries', flag: '🇮🇳' },
    { label: 'Tata Motors', query: 'Analyse Tata Motors', flag: '🇮🇳' },
    { label: 'TCS', query: 'Analyse TCS', flag: '🇮🇳' },
    { label: 'Infosys', query: 'Analyse Infosys', flag: '🇮🇳' },
    { label: 'HDFC Bank', query: 'Analyse HDFC Bank', flag: '🇮🇳' },
    { label: 'ICICI Bank', query: 'Analyse ICICI Bank', flag: '🇮🇳' },
    { label: 'SBI', query: 'Analyse State Bank of India', flag: '🇮🇳' },
    { label: 'Apple', query: 'Analyse Apple', flag: '🇺🇸' },
    { label: 'Nvidia', query: 'Analyse Nvidia', flag: '🇺🇸' },
    { label: 'Microsoft', query: 'Analyse Microsoft', flag: '🇺🇸' },
    { label: 'Tesla', query: 'Analyse Tesla', flag: '🇺🇸' },
  ];

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 text-zinc-100 select-none sticky top-0 z-50">
      {/* Top Ticker Tape */}
      <div className="bg-zinc-900/90 border-b border-zinc-800/80 px-4 py-1.5 text-[11px] font-mono flex items-center justify-between overflow-x-auto gap-6 text-zinc-400">
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>FINPULSE_TERMINAL v2.5</span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-4 text-xs">
            <span>NIFTY 50: <strong className="text-emerald-400">24,845.20 (+0.42%)</strong></span>
            <span>SENSEX: <strong className="text-emerald-400">81,520.10 (+0.38%)</strong></span>
            <span>S&P 500: <strong className="text-emerald-400">5,820.40 (+0.25%)</strong></span>
            <span>NASDAQ: <strong className="text-emerald-400">18,340.60 (+0.55%)</strong></span>
            <span>BRENT CRUDE: <strong className="text-zinc-300">$74.20/bbl</strong></span>
            <span>USD/INR: <strong className="text-zinc-300">₹84.15</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-zinc-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            FEED ONLINE
          </span>
          <span className="text-zinc-600">•</span>
          <span>{timeStr}</span>
        </div>
      </div>

      {/* Bloomberg Command Bar */}
      <div className="px-4 py-3 bg-zinc-950 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black font-mono text-sm tracking-tighter">
            FP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm tracking-wide text-zinc-100 font-mono">FINPULSE EQUITY TERMINAL</h1>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">STUDENT & RESEARCH EDITION</span>
            </div>
            <p className="text-[11px] text-zinc-400">Automated financial data retrieval, ratio computation & RAG assistant</p>
          </div>
        </div>

        {/* Command Input Box */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center gap-1.5 text-amber-400 font-mono text-xs pointer-events-none">
              <span className="font-bold">&gt;</span>
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter command, e.g. 'Analyse Reliance Industries' or ticker..."
              className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-amber-500/80 rounded-md py-2 pl-8 pr-28 text-sm font-mono text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-colors shadow-inner"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              <button
                type="submit"
                disabled={isLoading}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 text-zinc-950 font-bold text-xs font-mono rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>FETCHING</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>EXEC</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Active ticker badge */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-xs">
          <span className="text-zinc-500">ACTIVE:</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded font-semibold">
            {activeCompanySymbol}
          </span>
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="px-4 py-1.5 bg-zinc-900/60 border-t border-zinc-800/60 flex items-center gap-2 overflow-x-auto text-xs font-mono">
        <span className="text-[11px] text-zinc-500 uppercase shrink-0 font-medium">Quick Analyse:</span>
        {quickPresets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              setInputVal(preset.query);
              onSearch(preset.query);
            }}
            className="px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 hover:border-amber-500/40 text-zinc-300 hover:text-amber-300 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>{preset.flag}</span>
            <span>{preset.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
