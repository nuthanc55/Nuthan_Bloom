export interface LiveMarketQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  regularMarketVolume?: number;
  marketCap?: number;
  currency: string;
  longName?: string;
  historyCloses?: number[];
}

// Maps common queries/tickers to Yahoo Finance symbols
export const TICKER_MAP: Record<string, string> = {
  'reliance': 'RELIANCE.NS',
  'ril': 'RELIANCE.NS',
  'tatamotors': 'TATAMOTORS.NS',
  'tata motors': 'TATAMOTORS.NS',
  'tcs': 'TCS.NS',
  'tata consultancy': 'TCS.NS',
  'hdfc': 'HDFCBANK.NS',
  'hdfcbank': 'HDFCBANK.NS',
  'hdfc bank': 'HDFCBANK.NS',
  'infy': 'INFY.NS',
  'infosys': 'INFY.NS',
  'wipro': 'WIPRO.NS',
  'icici': 'ICICIBANK.NS',
  'icicibank': 'ICICIBANK.NS',
  'icici bank': 'ICICIBANK.NS',
  'sbi': 'SBIN.NS',
  'sbin': 'SBIN.NS',
  'state bank of india': 'SBIN.NS',
  'itc': 'ITC.NS',
  'bharti': 'BHARTIARTL.NS',
  'airtel': 'BHARTIARTL.NS',
  'bharti airtel': 'BHARTIARTL.NS',
  'l&t': 'LT.NS',
  'lt': 'LT.NS',
  'larsentoubro': 'LT.NS',
  'larsen': 'LT.NS',
  'maruti': 'MARUTI.NS',
  'maruti suzuki': 'MARUTI.NS',
  'bajaj finance': 'BAJFINANCE.NS',
  'bajfinance': 'BAJFINANCE.NS',
  'titan': 'TITAN.NS',
  'hindustan unilever': 'HINDUNILVR.NS',
  'hul': 'HINDUNILVR.NS',
  'adani': 'ADANIENT.NS',
  'adani enterprises': 'ADANIENT.NS',
  'apple': 'AAPL',
  'aapl': 'AAPL',
  'nvidia': 'NVDA',
  'nvda': 'NVDA',
  'microsoft': 'MSFT',
  'msft': 'MSFT',
  'google': 'GOOGL',
  'alphabet': 'GOOGL',
  'googl': 'GOOGL',
  'amazon': 'AMZN',
  'amzn': 'AMZN',
  'tesla': 'TSLA',
  'tsla': 'TSLA',
  'meta': 'META',
};

export async function fetchLiveMarketQuote(query: string): Promise<LiveMarketQuote | null> {
  try {
    const clean = query.toLowerCase().replace(/^(analyse|analyze|research|stock|overview of)\s+/i, '').trim();
    
    // Check ticker map first
    let symbol = TICKER_MAP[clean];
    
    if (!symbol) {
      // Try searching via Yahoo Finance search endpoint
      try {
        const searchRes = await fetch(`https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(clean)}&quotesCount=3&newsCount=0`, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(3000),
        });
        if (searchRes.ok) {
          const sJson = await searchRes.json();
          if (sJson.quotes && sJson.quotes.length > 0) {
            // Prefer NSE (.NS) for Indian names, or first quote
            const nseQuote = sJson.quotes.find((q: any) => q.symbol?.endsWith('.NS'));
            symbol = nseQuote?.symbol || sJson.quotes[0].symbol;
          }
        }
      } catch (err) {
        // Fall back to clean string as symbol
        symbol = clean.toUpperCase();
      }
    }

    if (!symbol) symbol = clean.toUpperCase();

    // Fetch live market data via chart endpoint
    const chartRes = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1mo`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(4000),
    });

    if (!chartRes.ok) return null;

    const chartJson = await chartRes.json();
    const result = chartJson?.chart?.result?.[0];
    if (!result || !result.meta) return null;

    const meta = result.meta;
    const currentPrice = meta.regularMarketPrice || meta.chartPreviousClose || 0;
    const prevClose = meta.chartPreviousClose || currentPrice;
    const change = Number((currentPrice - prevClose).toFixed(2));
    const changePercent = prevClose > 0 ? Number(((change / prevClose) * 100).toFixed(2)) : 0;

    const quoteCandles = result.indicators?.quote?.[0]?.close || [];
    const validCloses = quoteCandles.filter((c: any) => typeof c === 'number' && !isNaN(c));

    return {
      symbol: meta.symbol || symbol,
      regularMarketPrice: currentPrice,
      regularMarketChange: change,
      regularMarketChangePercent: changePercent,
      fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: meta.fiftyTwoWeekLow,
      regularMarketVolume: meta.regularMarketVolume,
      currency: meta.currency === 'INR' ? '₹' : meta.currency === 'USD' ? '$' : meta.currency,
      longName: meta.longName || meta.shortName || clean,
      historyCloses: validCloses.slice(-20),
    };
  } catch (err) {
    console.warn('Live market quote fetch error:', err);
    return null;
  }
}
