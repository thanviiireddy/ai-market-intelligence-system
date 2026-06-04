import { useState } from "react";
import { 
  Database, 
  Search, 
  Trash2, 
  ArrowUpRight, 
  FileText,
  Clock,
  Sparkles
} from "lucide-react";

export default function MemoryDashboard({ reports = [], onViewReport, onDeleteReport }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Local filter list
  const filteredReports = reports.filter(r => {
    const q = searchQuery.toLowerCase();
    return (
      r.topic.toLowerCase().includes(q) ||
      (r.report && r.report.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Vector Vault</h1>
          <p className="text-xs text-zinc-400 mt-1.5">
            Query saved report archives, browse persistent vector indexes, and load historical analytics papers.
          </p>
        </div>

        {/* Global archive search */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-zinc-900/40 border border-zinc-800 focus-within:border-indigo-500/80 transition w-full sm:w-80 shrink-0">
          <Search size={14} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            placeholder="Search report archive index..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-xs text-zinc-200 placeholder-zinc-500 font-medium"
          />
        </div>
      </div>

      {/* Database Diagnostics overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 glass-panel rounded-2xl p-5 border-zinc-800/80 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Database size={16} />
            </div>
            <h3 className="font-bold text-zinc-200 text-sm">ChromaDB Persistent Store</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">Collection Name</span>
              <span className="font-mono text-zinc-300">research_memory</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">Total Index Records</span>
              <span className="font-mono text-zinc-300">{reports.length} documents</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">Distance Metric</span>
              <span className="font-mono text-zinc-300">l2 (Squared L2)</span>
            </div>
          </div>
        </div>

        {/* Vector Info banner */}
        <div className="md:col-span-2 glass-panel rounded-2xl p-5 border-zinc-800/80 flex items-center gap-5 bg-gradient-to-r from-zinc-900/40 to-indigo-950/10">
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/15 text-indigo-400 hidden sm:block shrink-0">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="font-bold text-zinc-200 text-sm mb-1">
              Semantic Report Retrieval
            </h4>
            <p className="text-xs text-zinc-400 leading-5">
              Every document compiled is tokenized and stored as high-dimensional vectors. When launching search queries, this database scans embeddings to retrieve matching semantic paragraphs automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Archived Document List */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
          Archived Reports Directory
        </h3>

        {filteredReports.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center text-zinc-500 text-xs border-zinc-800/80">
            No archived files match the search criteria.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((r, i) => {
              const textLength = r.report?.length || 0;
              const wordCount = r.report ? r.report.split(/\s+/).length : 0;
              
              return (
                <div 
                  key={i}
                  className="glass-panel rounded-2xl border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-200 p-5 flex flex-col justify-between h-48 text-left group"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <span className="font-bold text-zinc-200 text-sm tracking-tight group-hover:text-indigo-400 transition truncate block">
                        {r.topic}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteReport(r.topic);
                        }}
                        className="text-zinc-600 hover:text-rose-400 p-1 rounded hover:bg-rose-500/5 transition shrink-0"
                        title="Delete report"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* Stats summary */}
                    <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-3 my-2 pr-1">
                      {r.report?.slice(0, 150).replace(/[#*_`]/g, "")}...
                    </p>
                  </div>

                  {/* Card Footer details */}
                  <div className="border-t border-zinc-900/60 pt-3 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-3.5 text-zinc-500">
                      <span className="flex items-center gap-1">
                        <FileCheck size={11} className="text-zinc-500" />
                        {wordCount} words
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} className="text-zinc-500" />
                        {r.timestamp || "Just now"}
                      </span>
                    </div>

                    <button
                      onClick={() => onViewReport(r)}
                      className="text-indigo-400 group-hover:text-indigo-300 font-semibold flex items-center gap-0.5"
                    >
                      Open
                      <ArrowUpRight size={12} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Minimal placeholder component for layout compatibility
function FileCheck({ size, className }) {
  return <FileText size={size} className={className} />;
}
