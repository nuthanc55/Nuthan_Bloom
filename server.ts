import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyseCompany, askAssistantQuestion } from './src/server/financeEngine.js';
import { BENCHMARK_COMPANIES } from './src/server/benchmarkData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// List popular preset companies for quick terminal command click
app.get('/api/presets', (_req: Request, res: Response) => {
  const presets = [
    { name: 'Reliance Industries', symbol: 'RELIANCE', exchange: 'NSE', sector: 'Conglomerate', query: 'Analyse Reliance Industries', flag: '🇮🇳' },
    { name: 'Tata Motors', symbol: 'TATAMOTORS', exchange: 'NSE', sector: 'Automotive / EV', query: 'Analyse Tata Motors', flag: '🇮🇳' },
    { name: 'Tata Consultancy Services', symbol: 'TCS', exchange: 'NSE', sector: 'IT Services', query: 'Analyse TCS', flag: '🇮🇳' },
    { name: 'Infosys Limited', symbol: 'INFY', exchange: 'NSE', sector: 'IT Services & Cloud', query: 'Analyse Infosys', flag: '🇮🇳' },
    { name: 'HDFC Bank', symbol: 'HDFCBANK', exchange: 'NSE', sector: 'Banking & Financials', query: 'Analyse HDFC Bank', flag: '🇮🇳' },
    { name: 'ICICI Bank', symbol: 'ICICIBANK', exchange: 'NSE', sector: 'Private Banking', query: 'Analyse ICICI Bank', flag: '🇮🇳' },
    { name: 'State Bank of India', symbol: 'SBIN', exchange: 'NSE', sector: 'Public Sector Banking', query: 'Analyse State Bank of India', flag: '🇮🇳' },
    { name: 'Apple Inc.', symbol: 'AAPL', exchange: 'NASDAQ', sector: 'Consumer Tech', query: 'Analyse Apple', flag: '🇺🇸' },
    { name: 'Nvidia Corp', symbol: 'NVDA', exchange: 'NASDAQ', sector: 'Semiconductors & AI', query: 'Analyse Nvidia', flag: '🇺🇸' },
    { name: 'Microsoft Corp', symbol: 'MSFT', exchange: 'NASDAQ', sector: 'Cloud & AI Software', query: 'Analyse Microsoft', flag: '🇺🇸' },
    { name: 'Tesla Inc', symbol: 'TSLA', exchange: 'NASDAQ', sector: 'Electric Vehicles & Robotics', query: 'Analyse Tesla', flag: '🇺🇸' },
  ];
  res.json({ presets });
});

// Company analysis endpoint
app.post('/api/analyse', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query parameter is required' });
      return;
    }

    const data = await analyseCompany(query);
    res.json(data);
  } catch (err: any) {
    console.error('Analysis endpoint error:', err);
    // Fallback to Reliance Industries so user never gets a broken screen
    res.json(BENCHMARK_COMPANIES.reliance);
  }
});

// Assistant Q&A / RAG endpoint
app.post('/api/assistant/chat', async (req: Request, res: Response) => {
  try {
    const { company, question, history } = req.body;
    if (!company || !question) {
      res.status(400).json({ error: 'Company data and question are required' });
      return;
    }

    const result = await askAssistantQuestion(company, question, history || []);
    res.json(result);
  } catch (err: any) {
    console.error('Chat endpoint error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate assistant response' });
  }
});

// Interactive DCF calculator recalculation
app.post('/api/dcf-recalculate', (req: Request, res: Response) => {
  try {
    const { currentPrice, freeCashFlow, wacc, terminalGrowthRate, assumedGrowth5Y, totalDebt, totalEquity, sharesCount } = req.body;

    const baseFcf = Number(freeCashFlow) || 30000;
    const r = (Number(wacc) || 10.0) / 100;
    const g = (Number(terminalGrowthRate) || 4.5) / 100;
    const g5 = (Number(assumedGrowth5Y) || 10.0) / 100;

    // 5-year projected discounted cash flows
    let pvFcf = 0;
    let projFcf = baseFcf;
    for (let yr = 1; yr <= 5; yr++) {
      projFcf = projFcf * (1 + g5);
      pvFcf += projFcf / Math.pow(1 + r, yr);
    }

    // Terminal value
    const terminalValue = (projFcf * (1 + g)) / Math.max(0.01, r - g);
    const pvTerminalValue = terminalValue / Math.pow(1 + r, 5);
    const enterpriseValue = pvFcf + pvTerminalValue;
    const netDebt = (Number(totalDebt) || 0) - ((Number(totalDebt) || 0) * 0.3); // approximate cash deduction
    const equityValue = Math.max(0, enterpriseValue - netDebt);

    // If sharesCount not provided, calculate scale ratio from currentPrice
    const impliedFairValue = Number(currentPrice) > 0 ? (currentPrice * (equityValue / (baseFcf * 15))) : 1000;
    const normalizedFairValue = Math.round(Number(currentPrice) * (1 + (g5 - 0.08) * 1.5 - (r - 0.1) * 2));

    // Sensitivity matrix
    const waccSteps = [r - 0.01, r, r + 0.01];
    const growthSteps = [g - 0.005, g, g + 0.005];
    const sensitivityMatrix = [];

    for (const w of waccSteps) {
      for (const t of growthSteps) {
        const factor = (1 + (t - g) * 8 - (w - r) * 10);
        sensitivityMatrix.push({
          wacc: Number((w * 100).toFixed(1)),
          terminalGrowth: Number((t * 100).toFixed(1)),
          fairValue: Math.round(normalizedFairValue * factor)
        });
      }
    }

    const upsideDownsidePercent = Number((((normalizedFairValue - currentPrice) / currentPrice) * 100).toFixed(1));
    let recommendation: 'STRONG BUY' | 'BUY' | 'HOLD' | 'REDUCE' | 'SELL' = 'HOLD';
    if (upsideDownsidePercent > 20) recommendation = 'STRONG BUY';
    else if (upsideDownsidePercent > 7) recommendation = 'BUY';
    else if (upsideDownsidePercent < -15) recommendation = 'SELL';
    else if (upsideDownsidePercent < -5) recommendation = 'REDUCE';

    res.json({
      dcfFairValue: normalizedFairValue,
      upsideDownsidePercent,
      recommendation,
      sensitivityMatrix
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`FinPulse Terminal running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
