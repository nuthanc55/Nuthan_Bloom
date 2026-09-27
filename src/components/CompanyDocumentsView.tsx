import React, { useState } from 'react';
import { CompanyDocument } from '../types/finance.js';
import { FileText, ExternalLink, MessageSquare, CheckCircle, Search, Calendar, Tag } from 'lucide-react';

interface CompanyDocumentsViewProps {
  documents: CompanyDocument[];
  onAskAboutDoc: (doc: CompanyDocument) => void;
}

export const CompanyDocumentsView: React.FC<CompanyDocumentsViewProps> = ({
  documents,
  onAskAboutDoc,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredDocs = filterType === 'ALL'
    ? documents
    : documents.filter(d => d.type === filterType);

  const activeDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const getDocBadge = (type: CompanyDocument['type']) => {
    switch (type) {
      case 'ANNUAL_REPORT':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/40">ANNUAL REPORT</span>;
      case 'EARNINGS_CALL':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">CONCALL TRANSCRIPT</span>;
      case 'AUDIT_NOTE':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40">AUDITOR REPORT</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700">FILING</span>;
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-5 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-100">
            OFFICIAL COMPANY FILINGS & REGULATORY DISCLOSURES (RAG STORE)
          </h3>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          {['ALL', 'ANNUAL_REPORT', 'EARNINGS_CALL', 'AUDIT_NOTE'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2 py-1 rounded transition-colors text-[11px] cursor-pointer ${
                filterType === t
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Document List Sidebar */}
        <div className="lg:col-span-4 space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {filteredDocs.map((doc) => {
            const isSelected = doc.id === activeDoc?.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-zinc-800/90 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  {getDocBadge(doc.type)}
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {doc.date}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-zinc-200 line-clamp-1">{doc.title}</h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{doc.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Document Detailed Inspector */}
        {activeDoc && (
          <div className="lg:col-span-8 bg-zinc-950/80 border border-zinc-800 rounded-lg p-4 md:p-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getDocBadge(activeDoc.type)}
                    <span className="text-xs text-zinc-400">Period: {activeDoc.period}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{activeDoc.title}</h3>
                </div>

                <button
                  onClick={() => onAskAboutDoc(activeDoc)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask AI About This Filing</span>
                </button>
              </div>

              {/* Summary */}
              <div className="mt-4">
                <h5 className="text-[11px] uppercase font-bold text-zinc-400 mb-1.5">Executive Summary</h5>
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded border border-zinc-800">
                  {activeDoc.summary}
                </p>
              </div>

              {/* Extracted Key Metrics if available */}
              {activeDoc.extractedMetrics && activeDoc.extractedMetrics.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-[11px] uppercase font-bold text-zinc-400 mb-2">Key Extracted Disclosures</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {activeDoc.extractedMetrics.map((m, idx) => (
                      <div key={idx} className="p-2 rounded bg-zinc-900 border border-zinc-800">
                        <span className="text-[10px] text-zinc-500 block truncate">{m.label}</span>
                        <span className="text-xs font-bold text-amber-300 truncate block mt-0.5">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Analyst Takeaways */}
              <div className="mt-4">
                <h5 className="text-[11px] uppercase font-bold text-zinc-400 mb-2">Core Audit & Management Takeaways</h5>
                <ul className="space-y-2">
                  {activeDoc.keyHighlights.map((highlight, idx) => (
                    <li key={idx} className="text-xs text-zinc-300 flex items-start gap-2 bg-zinc-900/40 p-2 rounded border border-zinc-800/60">
                      <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Source Citation Footer */}
            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Indexed in Vector/RAG Memory Context for Assistant</span>
              {activeDoc.sourceUrl && (
                <a
                  href={activeDoc.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-amber-400 hover:underline"
                >
                  Official Filing Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
