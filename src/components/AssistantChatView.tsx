import React, { useState, useRef, useEffect } from 'react';
import { CompanyAnalysis, ChatMessage } from '../types/finance.js';
import { Bot, Send, Sparkles, User, RefreshCw, FileText, CornerDownRight, HelpCircle } from 'lucide-react';

interface AssistantChatViewProps {
  company: CompanyAnalysis;
  initialQuestion?: string;
  onClearInitialQuestion?: () => void;
}

export const AssistantChatView: React.FC<AssistantChatViewProps> = ({
  company,
  initialQuestion,
  onClearInitialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      sender: 'assistant',
      text: `Hello! I am your **FinPulse AI Equity Research Assistant**. I have fully indexed the financial statements, calculated metrics, ratios, and latest filings for **${company.companyName}** (${company.symbol}).\n\nAsk me anything about management commentary, balance sheet health, segment EBITDA margins, valuation, or risks cited in the annual reports.`,
      timestamp: 'Just now',
      citations: [
        {
          source: company.documents[0]?.title || 'Audited Annual Report',
          snippet: `Revenue: ${company.metrics.revenueFormatted}, Net Profit: ${company.metrics.netProfitFormatted}, ROCE: ${company.metrics.roceFormatted}`
        }
      ],
      suggestedFollowUps: [
        `What is management's guidance on 5G/Retail capex and free cash flow?`,
        `Explain why ROCE is ${company.metrics.roceFormatted} and how it trended over 3 years`,
        `Analyze the debt maturity profile and interest coverage ratio (${company.metrics.interestCoverage}x)`,
        `What are the principal risk factors highlighted in the latest auditor report?`
      ]
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAsking]);

  // Handle external question triggers (e.g. from Documents view)
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim().length > 0) {
      handleSend(initialQuestion);
      if (onClearInitialQuestion) onClearInitialQuestion();
    }
  }, [initialQuestion]);

  const handleSend = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || isAsking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsAsking(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company,
          question: q,
          history: messages.map(m => ({ role: m.sender, content: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Analysis complete.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
        suggestedFollowUps: data.suggestedFollowUps || [],
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Error analyzing question: ${err.message || 'Please check your connection.'}`,
        timestamp: 'Now',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAsking(false);
    }
  };

  const samplePrompts = [
    `Summarize management guidance on Capex & debt`,
    `What are the biggest risks in the latest filing?`,
    `Explain the ROCE & ROE spread`,
    `Break down retail and digital segment profitability`,
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-5 font-mono flex flex-col h-[640px]">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-100">
              AI RAG FINANCIAL RESEARCH ASSISTANT
            </h3>
            <p className="text-[10px] text-zinc-400">
              Grounded on {company.companyName} ({company.symbol}) financial statements & reports
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            RAG ACTIVE
          </span>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="py-2.5 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0 border-b border-zinc-800/60">
        <span className="text-zinc-500 shrink-0">Quick prompts:</span>
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            disabled={isAsking}
            className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 text-zinc-300 hover:text-amber-300 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg p-3.5 border ${
                  isUser
                    ? 'bg-amber-500/10 border-amber-500/30 text-zinc-100'
                    : 'bg-zinc-950/80 border-zinc-800 text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1.5 text-[10px] text-zinc-500">
                  <span className="font-bold uppercase tracking-wider text-zinc-400">
                    {isUser ? 'You (Analyst)' : 'FinPulse Assistant'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Body Text */}
                <div className="leading-relaxed whitespace-pre-wrap space-y-2 text-xs">
                  {msg.text}
                </div>

                {/* Citations if any */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/80">
                    <span className="text-[10px] uppercase font-bold text-amber-400/90 block mb-1">
                      Audited Data Citations & Sources:
                    </span>
                    <div className="space-y-1">
                      {msg.citations.map((c, i) => (
                        <div
                          key={i}
                          className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-start gap-1.5"
                        >
                          <FileText className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-zinc-200">{c.source}</strong>: {c.snippet}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow up pills */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/80">
                    <span className="text-[10px] text-zinc-400 block mb-1.5">Suggested Next Inquiries:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((fu, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(fu)}
                          className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 border border-zinc-700 text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <CornerDownRight className="w-2.5 h-2.5 text-amber-400" />
                          <span>{fu}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isAsking && (
          <div className="flex gap-3 text-xs justify-start">
            <div className="w-7 h-7 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Querying financial data & company reports via RAG...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputQuestion);
        }}
        className="pt-3 border-t border-zinc-800 shrink-0 relative flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={`Ask anything about ${company.companyName}'s financial reports or metrics...`}
          className="flex-1 bg-zinc-950 border border-zinc-700 rounded-md py-2 px-3 text-xs font-mono text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || isAsking}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
};
