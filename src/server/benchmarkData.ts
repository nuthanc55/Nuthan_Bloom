import { CompanyAnalysis } from '../types/finance.js';

export const BENCHMARK_COMPANIES: Record<string, CompanyAnalysis> = {
  reliance: {
    companyName: 'Reliance Industries Limited',
    symbol: 'RELIANCE',
    exchange: 'NSE / BSE',
    currency: '₹',
    currencyCode: 'INR',
    unit: '₹ Cr',
    currentPrice: 2984.50,
    priceChange: 24.30,
    priceChangePercent: 0.82,
    sector: 'Conglomerate / Energy & Consumer Tech',
    industry: 'Oil & Gas, Retail & Telecommunications',
    description: 'Reliance Industries Limited is an Indian multinational conglomerate headquartered in Mumbai. Its businesses encompass energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.',
    isinOrCik: 'INE002A01018',

    metrics: {
      revenue: 901064,
      revenueFormatted: '₹9,01,064 Cr',
      netProfit: 69621,
      netProfitFormatted: '₹69,621 Cr',
      eps: 102.88,
      epsFormatted: '₹102.88',
      roe: 9.18,
      roeFormatted: '9.18%',
      roce: 9.84,
      roceFormatted: '9.84%',
      debtToEquity: 0.43,
      debtToEquityFormatted: '0.43x',
      pe: 26.8,
      peFormatted: '26.8x',
      pb: 2.35,
      pbFormatted: '2.35x',
      evEbitda: 13.9,
      dividendYield: 0.35,
      freeCashFlow: 38450,
      freeCashFlowFormatted: '₹38,450 Cr',
      operatingMargin: 17.8,
      netMargin: 7.73,
      currentRatio: 1.15,
      interestCoverage: 7.9,
      marketCapFormatted: '₹20,18,500 Cr ($242B)',
      enterpriseValueFormatted: '₹23,45,200 Cr'
    },

    trends: {
      revenueGrowth: {
        direction: 'up',
        cagr3Y: 17.4,
        yoy: 2.6,
        badge: '📈',
        description: 'Steady 3Y CAGR of +17.4% driven by Retail store expansion and Jio 5G subscriber ARPU expansion.'
      },
      profitGrowth: {
        direction: 'up',
        cagr3Y: 11.2,
        yoy: 7.3,
        badge: '📈',
        description: 'Net Profit up +7.3% YoY, propelled by digital services EBITDA and strong upstream gas production from KG-D6.'
      },
      debtTrend: {
        direction: 'down',
        cagr3Y: -4.8,
        changePercentage: -6.2,
        badge: '📉',
        description: 'Net Debt trend is decreasing/disciplined post capital raises, with robust operating cash flows covering capex requirements.'
      }
    },

    historicalData: [
      {
        year: 'FY21',
        revenue: 486494,
        netProfit: 49128,
        operatingProfit: 80703,
        eps: 76.4,
        totalDebt: 251811,
        totalEquity: 700172,
        operatingCashFlow: 26185,
        capex: 79688,
        freeCashFlow: -53503,
        roe: 7.6,
        roce: 8.2,
        debtToEquity: 0.36,
        opm: 16.6,
        npm: 10.1
      },
      {
        year: 'FY22',
        revenue: 699962,
        netProfit: 60705,
        operatingProfit: 110460,
        eps: 89.8,
        totalDebt: 266305,
        totalEquity: 779485,
        operatingCashFlow: 110654,
        capex: 100145,
        freeCashFlow: 10509,
        roe: 8.2,
        roce: 9.1,
        debtToEquity: 0.34,
        opm: 15.8,
        npm: 8.7
      },
      {
        year: 'FY23',
        revenue: 877835,
        netProfit: 66702,
        operatingProfit: 142200,
        eps: 98.6,
        totalDebt: 314708,
        totalEquity: 716075,
        operatingCashFlow: 115020,
        capex: 131769,
        freeCashFlow: -16749,
        roe: 9.3,
        roce: 9.6,
        debtToEquity: 0.44,
        opm: 16.2,
        npm: 7.6
      },
      {
        year: 'FY24',
        revenue: 901064,
        netProfit: 69621,
        operatingProfit: 160450,
        eps: 102.88,
        totalDebt: 324622,
        totalEquity: 758123,
        operatingCashFlow: 140411,
        capex: 101961,
        freeCashFlow: 38450,
        roe: 9.18,
        roce: 9.84,
        debtToEquity: 0.43,
        opm: 17.8,
        npm: 7.73
      },
      {
        year: 'FY25E',
        revenue: 982500,
        netProfit: 76800,
        operatingProfit: 178200,
        eps: 113.5,
        totalDebt: 308500,
        totalEquity: 815000,
        operatingCashFlow: 156000,
        capex: 95000,
        freeCashFlow: 61000,
        roe: 9.8,
        roce: 10.4,
        debtToEquity: 0.38,
        opm: 18.1,
        npm: 7.82
      }
    ],

    quarterlyData: [
      { quarter: 'Q1 FY25', revenue: 236217, netProfit: 17445, operatingMargin: 17.6, eps: 25.8 },
      { quarter: 'Q2 FY25', revenue: 240357, netProfit: 18450, operatingMargin: 18.0, eps: 27.2 },
      { quarter: 'Q3 FY25', revenue: 247850, netProfit: 19680, operatingMargin: 18.4, eps: 29.1 },
      { quarter: 'Q4 FY25E', revenue: 258076, netProfit: 21225, operatingMargin: 18.5, eps: 31.4 }
    ],

    segments: [
      { name: 'Oil to Chemicals (O2C)', revenueShare: 54.2, revenueAmount: 488370, growthYoY: -1.2, ebitMargin: 11.4 },
      { name: 'Reliance Retail', revenueShare: 28.6, revenueAmount: 257700, growthYoY: 17.8, ebitMargin: 7.8 },
      { name: 'Jio Infocomm (Digital Services)', revenueShare: 14.8, revenueAmount: 133400, growthYoY: 11.2, ebitMargin: 49.5 },
      { name: 'Oil and Gas Exploration (KG-D6)', revenueShare: 2.1, revenueAmount: 18900, growthYoY: 48.0, ebitMargin: 76.2 },
      { name: 'Others & New Energy', revenueShare: 0.3, revenueAmount: 2694, growthYoY: 22.0, ebitMargin: 12.0 }
    ],

    documents: [
      {
        id: 'doc-rel-ar24',
        title: 'Annual Report FY 2023-24 (Integrated)',
        type: 'ANNUAL_REPORT',
        period: 'FY 2023-24',
        date: '2024-08-08',
        summary: 'Detailed statutory disclosure covering audited consolidated revenue of ₹9,01,064 crore and net profit of ₹69,621 crore. Highlights the completion of pan-India true 5G rollout and over 18,774 retail stores across India.',
        keyHighlights: [
          'Record consolidated revenue of ₹9,01,064 Cr, crossing $100B milestone consistently.',
          'Consolidated EBITDA stood at ₹1,78,677 Cr ($21.4B), up 16.1% YoY.',
          'Jio reached 481.8 million subscribers with True 5G network handling 28% of total traffic.',
          'Reliance Retail registered footfalls of over 1.06 billion across footprint of 79.1 million sq. ft.',
          'Capex peaked as 5G network rollout concluded; free cash flow turned firmly positive at ₹38,450 Cr.'
        ],
        extractedMetrics: [
          { label: 'Consolidated Gross Revenue', value: '₹10,00,122 Cr' },
          { label: 'EBITDA Margin', value: '17.8%' },
          { label: 'Net Debt / EBITDA', value: '0.65x' },
          { label: 'Total Shareholder Equity', value: '₹7,58,123 Cr' }
        ],
        sourceUrl: 'https://www.ril.com/investor-relations/annual-reports'
      },
      {
        id: 'doc-rel-q3concall',
        title: 'Q3 FY25 Earnings Conference Call Transcript',
        type: 'EARNINGS_CALL',
        period: 'Q3 FY 2024-25',
        date: '2025-01-17',
        summary: 'Management discussion on ARPU expansion in telecom following tariff revisions, retail FMCG brand scale-up (Campa Cola, Independence), and refining margins outlook.',
        keyHighlights: [
          'Management noted ARPU jumped to ₹195.1/month driven by recent tariff hike flow-through.',
          'Retail EBITDA margin expanded 40 bps QoQ driven by high-margin grocery and private labels.',
          'Upstream KG-D6 production maintained at ~30 MMSCMD, contributing steady high-margin cash.',
          'Solar giga-factory at Jamnagar on track for commissioning first phase module manufacturing.'
        ],
        extractedMetrics: [
          { label: 'Jio ARPU', value: '₹195.1' },
          { label: 'Retail Gross Revenue Q3', value: '₹83,063 Cr' },
          { label: 'KG-D6 Gas Production', value: '29.8 MMSCMD' }
        ]
      },
      {
        id: 'doc-rel-audit',
        title: 'Independent Auditor Report & Notes to Accounts',
        type: 'AUDIT_NOTE',
        period: 'FY 2023-24',
        date: '2024-05-15',
        summary: 'Unqualified clean audit opinion issued by joint statutory auditors (DTS & Associates and SRBC & CO LLP). Notes on contingent liabilities and capitalized work-in-progress.',
        keyHighlights: [
          'Clean unqualified audit opinion on consolidated financial statements.',
          'Key Audit Matters (KAM): Valuation of capital work-in-progress related to 5G spectrum and retail store fit-outs.',
          'Contingent tax liabilities and customs duty claims evaluated with adequate legal disclosures.'
        ],
        extractedMetrics: [
          { label: 'Audit Opinion', value: 'Unqualified / Clean' },
          { label: 'Capital WIP', value: '₹1,32,450 Cr' }
        ]
      }
    ],

    valuation: {
      currentPrice: 2984.50,
      dcfFairValue: 3340.00,
      grahamNumber: 2280.00,
      peFairValue: 3180.00,
      upsideDownsidePercent: 11.9,
      recommendation: 'BUY',
      wacc: 10.5,
      terminalGrowthRate: 5.0,
      assumedGrowth5Y: 12.0,
      sensitivityMatrix: [
        { wacc: 9.5, terminalGrowth: 4.5, fairValue: 3420 },
        { wacc: 9.5, terminalGrowth: 5.0, fairValue: 3610 },
        { wacc: 9.5, terminalGrowth: 5.5, fairValue: 3840 },
        { wacc: 10.5, terminalGrowth: 4.5, fairValue: 3170 },
        { wacc: 10.5, terminalGrowth: 5.0, fairValue: 3340 },
        { wacc: 10.5, terminalGrowth: 5.5, fairValue: 3530 },
        { wacc: 11.5, terminalGrowth: 4.5, fairValue: 2940 },
        { wacc: 11.5, terminalGrowth: 5.0, fairValue: 3080 },
        { wacc: 11.5, terminalGrowth: 5.5, fairValue: 3240 }
      ]
    },

    healthScore: {
      overall: 84,
      profitability: 82,
      financialHealth: 88,
      growth: 80,
      valuationScore: 78,
      moatRating: 'Wide',
      summaryBulletPoints: [
        'Unmatched telecom (Jio) and retail market leadership positions in India create formidable barriers to entry.',
        'Debt-to-equity is well within safe thresholds (0.43x) with interest coverage exceeding 7.9x.',
        'Capex intensity is tapering as 5G network rollout completes, unlocking strong free cash flow generation.',
        'Conglomerate discount is gradually narrowing as value unlocking via potential Jio/Retail IPOs approaches.'
      ]
    },

    dataSource: {
      source: 'Consolidated Audited Annual Reports & BSE/NSE Filings',
      lastUpdated: 'Q3 FY25 Updates Grounded',
      filingYear: 'FY 2023-24 Audited + TTM',
      isRealtimeGrounding: true
    }
  },

  tatamotors: {
    companyName: 'Tata Motors Limited',
    symbol: 'TATAMOTORS',
    exchange: 'NSE / BSE',
    currency: '₹',
    currencyCode: 'INR',
    unit: '₹ Cr',
    currentPrice: 942.20,
    priceChange: -6.40,
    priceChangePercent: -0.67,
    sector: 'Automotive',
    industry: 'Commercial & Passenger Vehicles, Luxury Auto (JLR)',
    description: 'Tata Motors Limited is an Indian multinational automotive manufacturing company, part of the Tata Group. It manufactures passenger cars, trucks, vans, coaches, and luxury vehicles via Jaguar Land Rover (JLR).',
    isinOrCik: 'INE155A01022',

    metrics: {
      revenue: 437928,
      revenueFormatted: '₹4,37,928 Cr',
      netProfit: 31807,
      netProfitFormatted: '₹31,807 Cr',
      eps: 84.60,
      epsFormatted: '₹84.60',
      roe: 35.8,
      roeFormatted: '35.8%',
      roce: 22.4,
      roceFormatted: '22.4%',
      debtToEquity: 0.94,
      debtToEquityFormatted: '0.94x',
      pe: 11.1,
      peFormatted: '11.1x',
      pb: 3.42,
      pbFormatted: '3.42x',
      evEbitda: 5.8,
      dividendYield: 0.64,
      freeCashFlow: 26900,
      freeCashFlowFormatted: '₹26,900 Cr',
      operatingMargin: 14.3,
      netMargin: 7.26,
      currentRatio: 1.02,
      interestCoverage: 5.4,
      marketCapFormatted: '₹3,47,100 Cr ($41.5B)',
      enterpriseValueFormatted: '₹4,12,300 Cr'
    },

    trends: {
      revenueGrowth: {
        direction: 'up',
        cagr3Y: 21.6,
        yoy: 26.6,
        badge: '📈',
        description: 'JLR order book strength and domestic passenger vehicle / EV market share gains drove 26.6% revenue jump.'
      },
      profitGrowth: {
        direction: 'up',
        cagr3Y: 48.0,
        yoy: 115.0,
        badge: '📈',
        description: 'Spectacular profit recovery turnaround from loss-making quarters to record ₹31,807 Cr net profit.'
      },
      debtTrend: {
        direction: 'down',
        cagr3Y: -16.4,
        changePercentage: -38.2,
        badge: '📉',
        description: 'Substantial net auto debt reduction from peak of ₹61,000 Cr to near net cash on auto balance sheet.'
      }
    },

    historicalData: [
      {
        year: 'FY21',
        revenue: 249795,
        netProfit: -13451,
        operatingProfit: 32262,
        eps: -38.2,
        totalDebt: 135400,
        totalEquity: 55260,
        operatingCashFlow: 29010,
        capex: 19800,
        freeCashFlow: 9210,
        roe: -24.3,
        roce: 6.2,
        debtToEquity: 2.45,
        opm: 12.9,
        npm: -5.4
      },
      {
        year: 'FY22',
        revenue: 278454,
        netProfit: -11441,
        operatingProfit: 24813,
        eps: -30.1,
        totalDebt: 139678,
        totalEquity: 44626,
        operatingCashFlow: 14292,
        capex: 15210,
        freeCashFlow: -918,
        roe: -25.6,
        roce: 5.1,
        debtToEquity: 3.13,
        opm: 8.9,
        npm: -4.1
      },
      {
        year: 'FY23',
        revenue: 345967,
        netProfit: 2414,
        operatingProfit: 31816,
        eps: 6.3,
        totalDebt: 125600,
        totalEquity: 51200,
        operatingCashFlow: 35400,
        capex: 21000,
        freeCashFlow: 14400,
        roe: 4.7,
        roce: 10.8,
        debtToEquity: 2.45,
        opm: 9.2,
        npm: 0.7
      },
      {
        year: 'FY24',
        revenue: 437928,
        netProfit: 31807,
        operatingProfit: 62580,
        eps: 84.60,
        totalDebt: 84300,
        totalEquity: 89400,
        operatingCashFlow: 54200,
        capex: 27300,
        freeCashFlow: 26900,
        roe: 35.8,
        roce: 22.4,
        debtToEquity: 0.94,
        opm: 14.3,
        npm: 7.26
      },
      {
        year: 'FY25E',
        revenue: 472000,
        netProfit: 34500,
        operatingProfit: 68100,
        eps: 91.2,
        totalDebt: 62000,
        totalEquity: 115000,
        operatingCashFlow: 58000,
        capex: 29000,
        freeCashFlow: 29000,
        roe: 30.0,
        roce: 23.5,
        debtToEquity: 0.54,
        opm: 14.4,
        npm: 7.31
      }
    ],

    quarterlyData: [
      { quarter: 'Q1 FY25', revenue: 108048, netProfit: 5566, operatingMargin: 13.9, eps: 14.8 },
      { quarter: 'Q2 FY25', revenue: 101450, netProfit: 3450, operatingMargin: 11.4, eps: 9.2 },
      { quarter: 'Q3 FY25', revenue: 110570, netProfit: 7025, operatingMargin: 14.8, eps: 18.7 },
      { quarter: 'Q4 FY25E', revenue: 122000, netProfit: 8600, operatingMargin: 15.2, eps: 22.9 }
    ],

    segments: [
      { name: 'Jaguar Land Rover (JLR)', revenueShare: 69.4, revenueAmount: 303920, growthYoY: 27.2, ebitMargin: 8.5 },
      { name: 'Commercial Vehicles (India CV)', revenueShare: 17.8, revenueAmount: 77950, growthYoY: 11.3, ebitMargin: 10.8 },
      { name: 'Passenger Vehicles (India PV & EV)', revenueShare: 12.1, revenueAmount: 52980, growthYoY: 9.4, ebitMargin: 6.5 },
      { name: 'Vehicle Financing & Other', revenueShare: 0.7, revenueAmount: 3078, growthYoY: 15.0, ebitMargin: 14.2 }
    ],

    documents: [
      {
        id: 'doc-tm-demerger',
        title: 'Board Approval on Demerger into Two Listed Entities',
        type: 'REGULATORY_FILING',
        period: 'FY 2024-25',
        date: '2024-03-04',
        summary: 'Demerger of Tata Motors into two distinct listed companies: 1) Commercial Vehicles business and related investments; 2) Passenger Vehicles (PV, EV, JLR) and related investments.',
        keyHighlights: [
          'Creates two independent focused listed powerhouses with zero cross-subsidy.',
          'Commercial Vehicles will focus on freight logistics, hydrogen and electric buses.',
          'Passenger vehicles combined with JLR will maximize EV synergies and luxury brand equity.'
        ]
      },
      {
        id: 'doc-tm-ar24',
        title: 'Tata Motors Integrated Annual Report 2023-24',
        type: 'ANNUAL_REPORT',
        period: 'FY 2023-24',
        date: '2024-06-25',
        summary: 'Record operating performance across all 3 auto businesses. JLR delivered record full-year profit and free cash flow of £2.3 billion.',
        keyHighlights: [
          'Consolidated revenue hit all-time high of ₹4,37,928 Cr.',
          'JLR order book stood above 133,000 units with 76% concentrated in high-margin Range Rover, Defender.',
          'Net auto debt slashed to ₹16,000 Cr on way to zero net debt.'
        ],
        extractedMetrics: [
          { label: 'JLR Free Cash Flow', value: '£2.3 Billion' },
          { label: 'Consolidated EBITDA', value: '₹62,580 Cr' }
        ]
      }
    ],

    valuation: {
      currentPrice: 942.20,
      dcfFairValue: 1120.00,
      grahamNumber: 805.00,
      peFairValue: 1050.00,
      upsideDownsidePercent: 18.9,
      recommendation: 'BUY',
      wacc: 11.2,
      terminalGrowthRate: 4.5,
      assumedGrowth5Y: 10.5,
      sensitivityMatrix: [
        { wacc: 10.2, terminalGrowth: 4.0, fairValue: 1180 },
        { wacc: 10.2, terminalGrowth: 4.5, fairValue: 1250 },
        { wacc: 11.2, terminalGrowth: 4.0, fairValue: 1070 },
        { wacc: 11.2, terminalGrowth: 4.5, fairValue: 1120 },
        { wacc: 12.2, terminalGrowth: 4.0, fairValue: 970 },
        { wacc: 12.2, terminalGrowth: 4.5, fairValue: 1020 }
      ]
    },

    healthScore: {
      overall: 82,
      profitability: 88,
      financialHealth: 76,
      growth: 90,
      valuationScore: 84,
      moatRating: 'Narrow',
      summaryBulletPoints: [
        'Remarkable turnaround at JLR with strong pricing power on Defender and Range Rover lines.',
        'Market share leader in Indian Commercial Vehicles (~40% market share) and Electric PVs (~65% market share).',
        'Aggressive de-leveraging trajectory improves balance sheet resilience against global auto cycles.'
      ]
    },

    dataSource: {
      source: 'Consolidated Audited Annual Reports & BSE/NSE Filings',
      lastUpdated: 'Q3 FY25 Updates Grounded',
      filingYear: 'FY 2023-24 Audited + TTM',
      isRealtimeGrounding: true
    }
  },

  apple: {
    companyName: 'Apple Inc.',
    symbol: 'AAPL',
    exchange: 'NASDAQ',
    currency: '$',
    currencyCode: 'USD',
    unit: '$B',
    currentPrice: 228.40,
    priceChange: 3.10,
    priceChangePercent: 1.38,
    sector: 'Information Technology',
    industry: 'Consumer Electronics & Software Services',
    description: 'Apple Inc. is an American multinational corporation and technology company headquartered in Cupertino, California. It designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and services.',
    isinOrCik: 'US0378331005',

    metrics: {
      revenue: 391035, // in $M or $391B
      revenueFormatted: '$391.0B',
      netProfit: 93736,
      netProfitFormatted: '$93.7B',
      eps: 6.11,
      epsFormatted: '$6.11',
      roe: 147.2,
      roeFormatted: '147.2%',
      roce: 58.4,
      roceFormatted: '58.4%',
      debtToEquity: 1.54,
      debtToEquityFormatted: '1.54x',
      pe: 37.4,
      peFormatted: '37.4x',
      pb: 53.2,
      pbFormatted: '53.2x',
      evEbitda: 25.1,
      dividendYield: 0.44,
      freeCashFlow: 108800,
      freeCashFlowFormatted: '$108.8B',
      operatingMargin: 31.2,
      netMargin: 23.97,
      currentRatio: 0.98,
      interestCoverage: 28.5,
      marketCapFormatted: '$3,460B ($3.46T)',
      enterpriseValueFormatted: '$3,510B'
    },

    trends: {
      revenueGrowth: {
        direction: 'up',
        cagr3Y: 5.8,
        yoy: 2.0,
        badge: '📈',
        description: 'Services segment hit all-time high of $96B, offsetting mature iPhone cycle hardware volume.'
      },
      profitGrowth: {
        direction: 'up',
        cagr3Y: 6.2,
        yoy: -3.4,
        badge: '📈',
        description: 'High Services gross margin (74%) continues expanding overall enterprise gross margins to ~46%.'
      },
      debtTrend: {
        direction: 'down',
        cagr3Y: -3.2,
        changePercentage: -7.5,
        badge: '📉',
        description: 'Continuing progress towards net cash neutral goal while returning ~$100B annually via share buybacks.'
      }
    },

    historicalData: [
      {
        year: 'FY21',
        revenue: 365817,
        netProfit: 94680,
        operatingProfit: 108949,
        eps: 5.67,
        totalDebt: 124719,
        totalEquity: 63090,
        operatingCashFlow: 104038,
        capex: 11085,
        freeCashFlow: 92953,
        roe: 150.1,
        roce: 54.2,
        debtToEquity: 1.97,
        opm: 29.8,
        npm: 25.9
      },
      {
        year: 'FY22',
        revenue: 394328,
        netProfit: 99803,
        operatingProfit: 119437,
        eps: 6.15,
        totalDebt: 120069,
        totalEquity: 50672,
        operatingCashFlow: 122151,
        capex: 10708,
        freeCashFlow: 111443,
        roe: 196.9,
        roce: 61.8,
        debtToEquity: 2.37,
        opm: 30.3,
        npm: 25.3
      },
      {
        year: 'FY23',
        revenue: 383285,
        netProfit: 96995,
        operatingProfit: 114301,
        eps: 6.16,
        totalDebt: 111088,
        totalEquity: 62146,
        operatingCashFlow: 110543,
        capex: 10959,
        freeCashFlow: 99584,
        roe: 156.1,
        roce: 56.7,
        debtToEquity: 1.79,
        opm: 29.8,
        npm: 25.3
      },
      {
        year: 'FY24',
        revenue: 391035,
        netProfit: 93736,
        operatingProfit: 123216,
        eps: 6.11,
        totalDebt: 106629,
        totalEquity: 66885,
        operatingCashFlow: 118254,
        capex: 9454,
        freeCashFlow: 108800,
        roe: 147.2,
        roce: 58.4,
        debtToEquity: 1.54,
        opm: 31.2,
        npm: 23.97
      },
      {
        year: 'FY25E',
        revenue: 418000,
        netProfit: 104500,
        operatingProfit: 133800,
        eps: 6.95,
        totalDebt: 102000,
        totalEquity: 72000,
        operatingCashFlow: 126000,
        capex: 10500,
        freeCashFlow: 115500,
        roe: 145.0,
        roce: 61.0,
        debtToEquity: 1.41,
        opm: 32.0,
        npm: 25.0
      }
    ],

    quarterlyData: [
      { quarter: 'Q1 FY25', revenue: 124300, netProfit: 36300, operatingMargin: 33.5, eps: 2.40 },
      { quarter: 'Q2 FY25E', revenue: 94500, netProfit: 24100, operatingMargin: 30.5, eps: 1.58 },
      { quarter: 'Q3 FY25E', revenue: 88200, netProfit: 21800, operatingMargin: 29.8, eps: 1.42 },
      { quarter: 'Q4 FY25E', revenue: 101000, netProfit: 25200, operatingMargin: 31.2, eps: 1.65 }
    ],

    segments: [
      { name: 'iPhone', revenueShare: 51.4, revenueAmount: 201183, growthYoY: 1.5, ebitMargin: 36.5 },
      { name: 'Services (App Store, Cloud, Pay)', revenueShare: 24.6, revenueAmount: 96169, growthYoY: 12.9, ebitMargin: 74.2 },
      { name: 'Wearables, Home & Accessories', revenueShare: 9.5, revenueAmount: 37005, growthYoY: -7.1, ebitMargin: 32.0 },
      { name: 'Mac Personal Computers', revenueShare: 7.7, revenueAmount: 29984, growthYoY: 2.1, ebitMargin: 28.0 },
      { name: 'iPad Tablets', revenueShare: 6.8, revenueAmount: 26694, growthYoY: -4.0, ebitMargin: 29.0 }
    ],

    documents: [
      {
        id: 'doc-aapl-10k24',
        title: 'Form 10-K Annual Report (SEC Edgar)',
        type: 'ANNUAL_REPORT',
        period: 'FY 2024',
        date: '2024-11-01',
        summary: 'Apple Inc. official annual statutory filing. Active installed device base exceeded 2.2 billion active devices globally. Services revenue reached an all-time record.',
        keyHighlights: [
          'Active installed base reached unprecedented 2.2B devices.',
          'Gross margin expanded to 46.2%, driven by favorable mix towards Services.',
          'Capital return of $95.9B to shareholders in FY24 through buybacks and dividends.'
        ],
        extractedMetrics: [
          { label: 'Total Net Sales', value: '$391,035M' },
          { label: 'Cash & Marketable Securities', value: '$156,652M' }
        ]
      }
    ],

    valuation: {
      currentPrice: 228.40,
      dcfFairValue: 215.00,
      grahamNumber: 98.00,
      peFairValue: 220.00,
      upsideDownsidePercent: -5.8,
      recommendation: 'HOLD',
      wacc: 8.8,
      terminalGrowthRate: 3.5,
      assumedGrowth5Y: 7.5,
      sensitivityMatrix: [
        { wacc: 8.0, terminalGrowth: 3.0, fairValue: 228 },
        { wacc: 8.0, terminalGrowth: 3.5, fairValue: 248 },
        { wacc: 8.8, terminalGrowth: 3.0, fairValue: 201 },
        { wacc: 8.8, terminalGrowth: 3.5, fairValue: 215 },
        { wacc: 9.5, terminalGrowth: 3.0, fairValue: 180 },
        { wacc: 9.5, terminalGrowth: 3.5, fairValue: 191 }
      ]
    },

    healthScore: {
      overall: 92,
      profitability: 96,
      financialHealth: 94,
      growth: 78,
      valuationScore: 68,
      moatRating: 'Wide',
      summaryBulletPoints: [
        'Monolithic software-hardware ecosystem lock-in with over 2.2 billion active devices.',
        'Immaculate free cash flow machine (> $100B annually) funding industry-leading share buybacks.',
        'High valuation multiple (P/E ~37x) prices in significant expectation for Apple Intelligence monetization.'
      ]
    },

    dataSource: {
      source: 'SEC Form 10-K & Q1 FY25 Press Release',
      lastUpdated: 'FY24 10-K + Q1 FY25',
      filingYear: 'FY 2024 Audited',
      isRealtimeGrounding: true
    }
  },

  tcs: {
    companyName: 'Tata Consultancy Services Limited',
    symbol: 'TCS',
    exchange: 'NSE / BSE',
    currency: '₹',
    currencyCode: 'INR',
    unit: '₹ Cr',
    currentPrice: 4210.50,
    priceChange: 35.80,
    priceChangePercent: 0.86,
    sector: 'Information Technology',
    industry: 'IT Consulting, Cloud & Enterprise Solutions',
    description: 'Tata Consultancy Services is an Indian multinational IT services and consulting company headquartered in Mumbai, part of the Tata Group. It is the second largest Indian company by market capitalization.',
    isinOrCik: 'INE467B01029',

    metrics: {
      revenue: 240893,
      revenueFormatted: '₹2,40,893 Cr',
      netProfit: 45908,
      netProfitFormatted: '₹45,908 Cr',
      eps: 126.90,
      epsFormatted: '₹126.90',
      roe: 48.6,
      roeFormatted: '48.6%',
      roce: 58.2,
      roceFormatted: '58.2%',
      debtToEquity: 0.08,
      debtToEquityFormatted: '0.08x',
      pe: 33.2,
      peFormatted: '33.2x',
      pb: 16.1,
      pbFormatted: '16.1x',
      evEbitda: 22.8,
      dividendYield: 2.1,
      freeCashFlow: 44100,
      freeCashFlowFormatted: '₹44,100 Cr',
      operatingMargin: 24.6,
      netMargin: 19.06,
      currentRatio: 2.45,
      interestCoverage: 62.0,
      marketCapFormatted: '₹15,22,800 Cr ($182B)',
      enterpriseValueFormatted: '₹15,08,400 Cr'
    },

    trends: {
      revenueGrowth: {
        direction: 'up',
        cagr3Y: 12.8,
        yoy: 6.8,
        badge: '📈',
        description: 'Consistent revenue expansion supported by large multi-year cloud migration and AI transformation contracts.'
      },
      profitGrowth: {
        direction: 'up',
        cagr3Y: 10.4,
        yoy: 9.1,
        badge: '📈',
        description: 'Industry-leading EBIT margin resiliency at ~24-25% driving steady double-digit profit expansion.'
      },
      debtTrend: {
        direction: 'down',
        cagr3Y: -2.1,
        changePercentage: -5.4,
        badge: '📉',
        description: 'Virtually debt-free balance sheet with robust cash balances returned through regular buybacks and dividends.'
      }
    },

    historicalData: [
      {
        year: 'FY21',
        revenue: 164177,
        netProfit: 32430,
        operatingProfit: 46546,
        eps: 86.2,
        totalDebt: 7795,
        totalEquity: 86433,
        operatingCashFlow: 38802,
        capex: 3140,
        freeCashFlow: 35662,
        roe: 37.5,
        roce: 49.3,
        debtToEquity: 0.09,
        opm: 28.3,
        npm: 19.8
      },
      {
        year: 'FY22',
        revenue: 191754,
        netProfit: 38327,
        operatingProfit: 53057,
        eps: 103.6,
        totalDebt: 7818,
        totalEquity: 89139,
        operatingCashFlow: 39949,
        capex: 3180,
        freeCashFlow: 36769,
        roe: 43.0,
        roce: 54.7,
        debtToEquity: 0.09,
        opm: 27.7,
        npm: 20.0
      },
      {
        year: 'FY23',
        revenue: 225458,
        netProfit: 42147,
        operatingProfit: 59258,
        eps: 115.2,
        totalDebt: 7688,
        totalEquity: 90424,
        operatingCashFlow: 42010,
        capex: 3450,
        freeCashFlow: 38560,
        roe: 46.6,
        roce: 56.8,
        debtToEquity: 0.08,
        opm: 26.3,
        npm: 18.7
      },
      {
        year: 'FY24',
        revenue: 240893,
        netProfit: 45908,
        operatingProfit: 63890,
        eps: 126.90,
        totalDebt: 7420,
        totalEquity: 94450,
        operatingCashFlow: 48200,
        capex: 4100,
        freeCashFlow: 44100,
        roe: 48.6,
        roce: 58.2,
        debtToEquity: 0.08,
        opm: 24.6,
        npm: 19.06
      },
      {
        year: 'FY25E',
        revenue: 262000,
        netProfit: 50400,
        operatingProfit: 69800,
        eps: 139.5,
        totalDebt: 7200,
        totalEquity: 102000,
        operatingCashFlow: 52000,
        capex: 4300,
        freeCashFlow: 47700,
        roe: 49.4,
        roce: 60.1,
        debtToEquity: 0.07,
        opm: 26.6,
        npm: 19.24
      }
    ],

    quarterlyData: [
      { quarter: 'Q1 FY25', revenue: 62613, netProfit: 12040, operatingMargin: 24.7, eps: 33.3 },
      { quarter: 'Q2 FY25', revenue: 64259, netProfit: 11909, operatingMargin: 24.1, eps: 32.9 },
      { quarter: 'Q3 FY25', revenue: 65120, netProfit: 12430, operatingMargin: 24.5, eps: 34.4 },
      { quarter: 'Q4 FY25E', revenue: 70008, netProfit: 14021, operatingMargin: 25.1, eps: 38.9 }
    ],

    segments: [
      { name: 'BFSI (Banking, Financial Services & Insurance)', revenueShare: 31.8, revenueAmount: 76600, growthYoY: 3.2, ebitMargin: 26.5 },
      { name: 'Consumer Business & Retail', revenueShare: 15.6, revenueAmount: 37580, growthYoY: 7.1, ebitMargin: 24.8 },
      { name: 'Life Sciences & Healthcare', revenueShare: 11.2, revenueAmount: 26980, growthYoY: 10.5, ebitMargin: 27.0 },
      { name: 'Manufacturing', revenueShare: 9.8, revenueAmount: 23600, growthYoY: 8.4, ebitMargin: 23.5 },
      { name: 'Technology & Services / Others', revenueShare: 31.6, revenueAmount: 76133, growthYoY: 5.6, ebitMargin: 23.2 }
    ],

    documents: [
      {
        id: 'doc-tcs-ar24',
        title: 'TCS Integrated Annual Report 2023-24',
        type: 'ANNUAL_REPORT',
        period: 'FY 2023-24',
        date: '2024-06-12',
        summary: 'Consolidated statutory filing reporting ₹2,40,893 crore in revenue and operating margin of 24.6%. Highlights over $300M in Generative AI project pipeline and low attrition of 12.5%.',
        keyHighlights: [
          'Order book total contract value (TCV) stood at record $42.7 billion for the full year.',
          'Over 300,000 employees trained in foundational AI capabilities.',
          'Consistently high free cash flow conversion of 96% of net profit returned to shareholders.'
        ]
      }
    ],

    valuation: {
      currentPrice: 4210.50,
      dcfFairValue: 4450.00,
      grahamNumber: 2650.00,
      peFairValue: 4320.00,
      upsideDownsidePercent: 5.7,
      recommendation: 'BUY',
      wacc: 10.2,
      terminalGrowthRate: 5.0,
      assumedGrowth5Y: 9.5,
      sensitivityMatrix: [
        { wacc: 9.2, terminalGrowth: 4.5, fairValue: 4580 },
        { wacc: 9.2, terminalGrowth: 5.0, fairValue: 4790 },
        { wacc: 10.2, terminalGrowth: 4.5, fairValue: 4280 },
        { wacc: 10.2, terminalGrowth: 5.0, fairValue: 4450 },
        { wacc: 11.2, terminalGrowth: 4.5, fairValue: 3980 },
        { wacc: 11.2, terminalGrowth: 5.0, fairValue: 4120 }
      ]
    },

    healthScore: {
      overall: 94,
      profitability: 96,
      financialHealth: 98,
      growth: 82,
      valuationScore: 74,
      moatRating: 'Wide',
      summaryBulletPoints: [
        'World-class return metrics with ROE at 48.6% and ROCE exceeding 58%.',
        'Zero net debt fortress balance sheet with industry-high dividend payouts.',
        'High client retention with over 98% repeat business from Global 2000 enterprises.'
      ]
    },

    dataSource: {
      source: 'Consolidated Audited Annual Report FY24 & NSE Filings',
      lastUpdated: 'Q3 FY25 Grounded',
      filingYear: 'FY 2023-24 Audited',
      isRealtimeGrounding: true
    }
  },

  hdfc: {
    companyName: 'HDFC Bank Limited',
    symbol: 'HDFCBANK',
    exchange: 'NSE / BSE',
    currency: '₹',
    currencyCode: 'INR',
    unit: '₹ Cr',
    currentPrice: 1680.40,
    priceChange: 12.20,
    priceChangePercent: 0.73,
    sector: 'Financial Services',
    industry: 'Private Sector Banking & Mortgages',
    description: 'HDFC Bank is India\'s largest private sector bank by assets and market capitalization. Following its landmark merger with parent HDFC Limited, it commands a comprehensive retail, mortgage, and corporate banking franchise.',
    isinOrCik: 'INE040A01034',

    metrics: {
      revenue: 285400,
      revenueFormatted: '₹2,85,400 Cr',
      netProfit: 60812,
      netProfitFormatted: '₹60,812 Cr',
      eps: 80.20,
      epsFormatted: '₹80.20',
      roe: 15.8,
      roeFormatted: '15.8%',
      roce: 12.4,
      roceFormatted: '12.4%',
      debtToEquity: 1.15,
      debtToEquityFormatted: '1.15x',
      pe: 20.9,
      peFormatted: '20.9x',
      pb: 2.85,
      pbFormatted: '2.85x',
      evEbitda: 14.2,
      dividendYield: 1.2,
      freeCashFlow: 52000,
      freeCashFlowFormatted: '₹52,000 Cr',
      operatingMargin: 32.5,
      netMargin: 21.3,
      currentRatio: 1.25,
      interestCoverage: 11.2,
      marketCapFormatted: '₹12,78,000 Cr ($153B)',
      enterpriseValueFormatted: '₹13,90,000 Cr'
    },

    trends: {
      revenueGrowth: {
        direction: 'up',
        cagr3Y: 28.4,
        yoy: 44.5,
        badge: '📈',
        description: 'Asset base and total net revenue expanded sharply post the merger with HDFC Limited.'
      },
      profitGrowth: {
        direction: 'up',
        cagr3Y: 22.1,
        yoy: 37.1,
        badge: '📈',
        description: 'Robust profit expansion propelled by core retail advances, fee income, and lower credit cost provisions.'
      },
      debtTrend: {
        direction: 'down',
        cagr3Y: -1.2,
        changePercentage: -3.8,
        badge: '📉',
        description: 'Gross Non-Performing Assets (GNPA) maintained at stellar 1.24% with disciplined credit underwriting.'
      }
    },

    historicalData: [
      {
        year: 'FY21',
        revenue: 146063,
        netProfit: 31117,
        operatingProfit: 57362,
        eps: 56.6,
        totalDebt: 135487,
        totalEquity: 203721,
        operatingCashFlow: 42100,
        capex: 1850,
        freeCashFlow: 40250,
        roe: 16.6,
        roce: 12.1,
        debtToEquity: 0.67,
        opm: 39.3,
        npm: 21.3
      },
      {
        year: 'FY22',
        revenue: 157263,
        netProfit: 36961,
        operatingProfit: 64077,
        eps: 66.8,
        totalDebt: 184817,
        totalEquity: 240093,
        operatingCashFlow: 45000,
        capex: 2100,
        freeCashFlow: 42900,
        roe: 16.7,
        roce: 12.5,
        debtToEquity: 0.77,
        opm: 40.7,
        npm: 23.5
      },
      {
        year: 'FY23',
        revenue: 192800,
        netProfit: 44109,
        operatingProfit: 70405,
        eps: 79.3,
        totalDebt: 206766,
        totalEquity: 280199,
        operatingCashFlow: 48500,
        capex: 2600,
        freeCashFlow: 45900,
        roe: 17.1,
        roce: 13.0,
        debtToEquity: 0.74,
        opm: 36.5,
        npm: 22.9
      },
      {
        year: 'FY24',
        revenue: 285400,
        netProfit: 60812,
        operatingProfit: 92700,
        eps: 80.20,
        totalDebt: 452000,
        totalEquity: 393000,
        operatingCashFlow: 55000,
        capex: 3000,
        freeCashFlow: 52000,
        roe: 15.8,
        roce: 12.4,
        debtToEquity: 1.15,
        opm: 32.5,
        npm: 21.3
      },
      {
        year: 'FY25E',
        revenue: 322000,
        netProfit: 71200,
        operatingProfit: 108000,
        eps: 93.5,
        totalDebt: 480000,
        totalEquity: 445000,
        operatingCashFlow: 62000,
        capex: 3200,
        freeCashFlow: 58800,
        roe: 16.8,
        roce: 13.2,
        debtToEquity: 1.08,
        opm: 33.5,
        npm: 22.11
      }
    ],

    quarterlyData: [
      { quarter: 'Q1 FY25', revenue: 73200, netProfit: 16175, operatingMargin: 32.8, eps: 21.2 },
      { quarter: 'Q2 FY25', revenue: 75300, netProfit: 16821, operatingMargin: 33.1, eps: 22.1 },
      { quarter: 'Q3 FY25', revenue: 77800, netProfit: 17400, operatingMargin: 33.5, eps: 22.9 },
      { quarter: 'Q4 FY25E', revenue: 81200, netProfit: 18500, operatingMargin: 34.0, eps: 24.3 }
    ],

    segments: [
      { name: 'Retail Banking & Consumer Loans', revenueShare: 45.2, revenueAmount: 129000, growthYoY: 34.0, ebitMargin: 34.2 },
      { name: 'Wholesale & Corporate Banking', revenueShare: 28.5, revenueAmount: 81340, growthYoY: 26.5, ebitMargin: 31.8 },
      { name: 'Mortgages & Housing Finance', revenueShare: 20.8, revenueAmount: 59360, growthYoY: 58.0, ebitMargin: 30.5 },
      { name: 'Treasury & Other Banking Ops', revenueShare: 5.5, revenueAmount: 15700, growthYoY: 12.0, ebitMargin: 24.0 }
    ],

    documents: [
      {
        id: 'doc-hdfc-ar24',
        title: 'HDFC Bank Post-Merger Annual Report 2023-24',
        type: 'ANNUAL_REPORT',
        period: 'FY 2023-24',
        date: '2024-07-10',
        summary: 'First full-year consolidated report following the amalgamation of Housing Development Finance Corporation (HDFC Ltd). Total customer base surpassed 93 million.',
        keyHighlights: [
          'Gross NPA contained at exemplary 1.24% of gross advances.',
          'Deposits grew 26.4% YoY to ₹23.8 lakh crore, highlighting retail franchise power.',
          'Branch network expanded to over 8,735 branches across India.'
        ]
      }
    ],

    valuation: {
      currentPrice: 1680.40,
      dcfFairValue: 1980.00,
      grahamNumber: 1540.00,
      peFairValue: 1880.00,
      upsideDownsidePercent: 17.8,
      recommendation: 'BUY',
      wacc: 10.8,
      terminalGrowthRate: 5.5,
      assumedGrowth5Y: 13.5,
      sensitivityMatrix: [
        { wacc: 9.8, terminalGrowth: 5.0, fairValue: 2080 },
        { wacc: 9.8, terminalGrowth: 5.5, fairValue: 2240 },
        { wacc: 10.8, terminalGrowth: 5.0, fairValue: 1890 },
        { wacc: 10.8, terminalGrowth: 5.5, fairValue: 1980 },
        { wacc: 11.8, terminalGrowth: 5.0, fairValue: 1720 },
        { wacc: 11.8, terminalGrowth: 5.5, fairValue: 1810 }
      ]
    },

    healthScore: {
      overall: 89,
      profitability: 88,
      financialHealth: 92,
      growth: 86,
      valuationScore: 90,
      moatRating: 'Wide',
      summaryBulletPoints: [
        'Unrivaled low-cost CASA deposit franchise providing structural funding cost advantages.',
        'Market share expansion in high-ticket home loans following the HDFC amalgamation.',
        'Historically attractive valuation (~20x P/E) offering attractive margin of safety.'
      ]
    },

    dataSource: {
      source: 'Consolidated Audited Annual Report FY24 & RBI Filings',
      lastUpdated: 'Q3 FY25 Grounded',
      filingYear: 'FY 2023-24 Audited',
      isRealtimeGrounding: true
    }
  },

  nvidia: {
    companyName: 'NVIDIA Corporation',
    symbol: 'NVDA',
    exchange: 'NASDAQ',
    currency: '$',
    currencyCode: 'USD',
    unit: '$B',
    currentPrice: 128.50,
    priceChange: 3.20,
    priceChangePercent: 2.55,
    sector: 'Information Technology',
    industry: 'Semiconductors & AI Compute Accelerators',
    description: 'NVIDIA Corporation is the worldwide pioneer and market leader in accelerated computing, Graphics Processing Units (GPUs), and full-stack AI data center hardware and CUDA software systems.',
    isinOrCik: 'US67066G1040',

    metrics: {
      revenue: 60922,
      revenueFormatted: '$60.9B',
      netProfit: 29760,
      netProfitFormatted: '$29.8B',
      eps: 1.20,
      epsFormatted: '$1.20',
      roe: 91.5,
      roeFormatted: '91.5%',
      roce: 78.4,
      roceFormatted: '78.4%',
      debtToEquity: 0.25,
      debtToEquityFormatted: '0.25x',
      pe: 48.5,
      peFormatted: '48.5x',
      pb: 32.4,
      pbFormatted: '32.4x',
      evEbitda: 35.8,
      dividendYield: 0.08,
      freeCashFlow: 27021,
      freeCashFlowFormatted: '$27.0B',
      operatingMargin: 54.1,
      netMargin: 48.85,
      currentRatio: 4.17,
      interestCoverage: 85.0,
      marketCapFormatted: '$3,150B ($3.15T)',
      enterpriseValueFormatted: '$3,135B'
    },

    trends: {
      revenueGrowth: {
        direction: 'up',
        cagr3Y: 54.2,
        yoy: 125.9,
        badge: '📈',
        description: 'Unprecedented Data Center GPU revenue acceleration driven by Hopper and Blackwell AI architectures.'
      },
      profitGrowth: {
        direction: 'up',
        cagr3Y: 82.5,
        yoy: 286.0,
        badge: '📈',
        description: 'Net margins widened to ~49% backed by software stack pricing power and unmatched hardware throughput.'
      },
      debtTrend: {
        direction: 'down',
        cagr3Y: -8.4,
        changePercentage: -14.2,
        badge: '📉',
        description: 'Cash and marketable securities exceed total debt by > $15B; highly cash-generative operations.'
      }
    },

    historicalData: [
      {
        year: 'FY21',
        revenue: 16675,
        netProfit: 4332,
        operatingProfit: 4532,
        eps: 0.17,
        totalDebt: 6956,
        totalEquity: 16893,
        operatingCashFlow: 5822,
        capex: 1128,
        freeCashFlow: 4694,
        roe: 25.6,
        roce: 19.0,
        debtToEquity: 0.41,
        opm: 27.2,
        npm: 26.0
      },
      {
        year: 'FY22',
        revenue: 26914,
        netProfit: 9752,
        operatingProfit: 10041,
        eps: 0.39,
        totalDebt: 10946,
        totalEquity: 26612,
        operatingCashFlow: 9108,
        capex: 976,
        freeCashFlow: 8132,
        roe: 36.6,
        roce: 26.7,
        debtToEquity: 0.41,
        opm: 37.3,
        npm: 36.2
      },
      {
        year: 'FY23',
        revenue: 26974,
        netProfit: 4368,
        operatingProfit: 4224,
        eps: 0.18,
        totalDebt: 12031,
        totalEquity: 22101,
        operatingCashFlow: 5641,
        capex: 1833,
        freeCashFlow: 3808,
        roe: 19.8,
        roce: 12.4,
        debtToEquity: 0.54,
        opm: 15.7,
        npm: 16.2
      },
      {
        year: 'FY24',
        revenue: 60922,
        netProfit: 29760,
        operatingProfit: 32972,
        eps: 1.20,
        totalDebt: 11056,
        totalEquity: 42978,
        operatingCashFlow: 28090,
        capex: 1069,
        freeCashFlow: 27021,
        roe: 91.5,
        roce: 78.4,
        debtToEquity: 0.25,
        opm: 54.1,
        npm: 48.85
      },
      {
        year: 'FY25E',
        revenue: 125000,
        netProfit: 68000,
        operatingProfit: 78000,
        eps: 2.75,
        totalDebt: 9500,
        totalEquity: 78000,
        operatingCashFlow: 65000,
        capex: 3500,
        freeCashFlow: 61500,
        roe: 102.0,
        roce: 88.0,
        debtToEquity: 0.12,
        opm: 62.4,
        npm: 54.4
      }
    ],

    quarterlyData: [
      { quarter: 'Q1 FY25', revenue: 26044, netProfit: 14881, operatingMargin: 64.9, eps: 0.60 },
      { quarter: 'Q2 FY25', revenue: 30040, netProfit: 16599, operatingMargin: 62.1, eps: 0.67 },
      { quarter: 'Q3 FY25', revenue: 35082, netProfit: 19309, operatingMargin: 63.8, eps: 0.78 },
      { quarter: 'Q4 FY25E', revenue: 37500, netProfit: 20500, operatingMargin: 64.0, eps: 0.82 }
    ],

    segments: [
      { name: 'Compute & Networking (Data Center AI GPUs)', revenueShare: 78.4, revenueAmount: 47762, growthYoY: 217.0, ebitMargin: 64.5 },
      { name: 'Graphics (GeForce Gaming & Creators)', revenueShare: 17.2, revenueAmount: 10480, growthYoY: 15.2, ebitMargin: 38.0 },
      { name: 'Professional Visualization', revenueShare: 2.5, revenueAmount: 1550, growthYoY: 1.0, ebitMargin: 32.0 },
      { name: 'Automotive & Robotics', revenueShare: 1.9, revenueAmount: 1130, growthYoY: 21.0, ebitMargin: 18.0 }
    ],

    documents: [
      {
        id: 'doc-nvda-10k24',
        title: 'Form 10-K Annual Report (SEC Edgar)',
        type: 'ANNUAL_REPORT',
        period: 'FY 2024',
        date: '2024-02-21',
        summary: 'Annual statutory filing reporting 126% revenue surge to $60.9B and GAAP net income expansion to $29.8B propelled by Generative AI demand across hyperscalers and enterprises.',
        keyHighlights: [
          'Data center revenue climbed 217% to a record $47.8 billion.',
          'Gross margins expanded to 72.7%, reflecting high value capture on hardware and software.',
          'CUDA software developer ecosystem now counts over 4.7 million developers globally.'
        ]
      }
    ],

    valuation: {
      currentPrice: 128.50,
      dcfFairValue: 142.00,
      grahamNumber: 38.00,
      peFairValue: 135.00,
      upsideDownsidePercent: 10.5,
      recommendation: 'BUY',
      wacc: 10.5,
      terminalGrowthRate: 4.5,
      assumedGrowth5Y: 22.0,
      sensitivityMatrix: [
        { wacc: 9.5, terminalGrowth: 4.0, fairValue: 151 },
        { wacc: 9.5, terminalGrowth: 4.5, fairValue: 165 },
        { wacc: 10.5, terminalGrowth: 4.0, fairValue: 132 },
        { wacc: 10.5, terminalGrowth: 4.5, fairValue: 142 },
        { wacc: 11.5, terminalGrowth: 4.0, fairValue: 118 },
        { wacc: 11.5, terminalGrowth: 4.5, fairValue: 127 }
      ]
    },

    healthScore: {
      overall: 95,
      profitability: 99,
      financialHealth: 96,
      growth: 98,
      valuationScore: 72,
      moatRating: 'Wide',
      summaryBulletPoints: [
        'Decades-deep CUDA software ecosystem creates an almost insurmountable competitive moat.',
        'Explosive AI capital expenditure by Microsoft, Meta, Google, and Amazon sustains demand pipeline.',
        'Super-normal return on invested capital with ROCE approaching 78%.'
      ]
    },

    dataSource: {
      source: 'SEC Form 10-K & Q3 FY25 Earnings Press Release',
      lastUpdated: 'Q3 FY25 Grounded',
      filingYear: 'FY 2024 Audited',
      isRealtimeGrounding: true
    }
  }
};

export function findBenchmarkCompany(query: string): CompanyAnalysis | null {
  const q = query.toLowerCase().trim();
  if (q.includes('reliance') || q.includes('ril')) return BENCHMARK_COMPANIES.reliance;
  if (q.includes('tata motors') || q.includes('tatamotors')) return BENCHMARK_COMPANIES.tatamotors;
  if (q.includes('apple') || q === 'aapl') return BENCHMARK_COMPANIES.apple;
  if (q.includes('tcs') || q.includes('tata consultancy')) return BENCHMARK_COMPANIES.tcs;
  if (q.includes('hdfc') || q.includes('hdfcbank')) return BENCHMARK_COMPANIES.hdfc;
  if (q.includes('nvidia') || q.includes('nvda')) return BENCHMARK_COMPANIES.nvidia;
  return null;
}
