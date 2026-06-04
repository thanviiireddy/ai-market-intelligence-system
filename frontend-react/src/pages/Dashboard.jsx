import { useState } from "react";
import { 
  Search, 
  Sparkles, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers
} from "lucide-react";

export default function Dashboard({ reports = [], onLaunchResearch, onViewReport }) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onLaunchResearch(topic);
    }
  };

  // Calculate statistics
  const totalReports = reports.length;
  const avgVerification = totalReports > 0 
    ? Math.round(reports.reduce((acc, r) => acc + (r.verification?.score || 0), 0) / totalReports)
    : 0;
  const totalWords = reports.reduce((acc, r) => acc + (r.report?.split(/\s+/).length || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome banner */}
      <div className="text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
          Market Intelligence Hub
        </h1>
        <p className="mt-2.5 text-zinc-400 text-sm max-w-2xl">
          Activate autonomous agent groups to outline, crawl, compile, and index industry analytics instantly.
        </p>
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border-zinc-800/80 text-left">
          <span className="text-xs font-semibold text-zinc-500 block">Total Runs Initiated</span>
          <div className="text-3xl font-extrabold text-zinc-50 tracking-tight mt-1.5">{totalReports}</div>
          <span className="text-[10px] text-zinc-500 mt-1 block">Full analyst reports</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border-zinc-800/80 text-left">
          <span className="text-xs font-semibold text-zinc-500 block">Average Compliance Rating</span>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight mt-1.5">{avgVerification}%</div>
          <span className="text-[10px] text-zinc-500 mt-1 block">Verification score avg</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border-zinc-800/80 text-left">
          <span className="text-xs font-semibold text-zinc-500 block">Research Database Size</span>
          <div className="text-3xl font-extrabold text-indigo-400 tracking-tight mt-1.5">{(totalWords / 1000).toFixed(1)}k</div>
          <span className="text-[10px] text-zinc-500 mt-1 block">Indexed words of intelligence</span>
        </div>
        <div className="glass-panel rounded-2xl p-5 border-zinc-800/80 text-left">
          <span className="text-xs font-semibold text-zinc-500 block">Operational Core Nodes</span>
          <div className="text-3xl font-extrabold text-purple-400 tracking-tight mt-1.5">5/5</div>
          <span className="text-[10px] text-zinc-500 mt-1 block">Groq + ChromaDB Online</span>
        </div>
      </div>

      {/* Large Input Console */}
      <div className="glass-panel rounded-3xl p-8 border-zinc-800/80 text-left relative overflow-hidden bg-gradient-to-br from-zinc-900/60 to-zinc-950/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-xs font-semibold text-indigo-400 mb-4 uppercase tracking-wider">
            <Sparkles size={12} />
            Autonomous Analysis Terminal
          </div>
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight mb-2">
            Initiate Real-Time Competitive Deep Dive
          </h2>
          <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
            Outline a research target. Our engine triggers web scans via Tavily, scores consistency, compiles markdown structures, and saves records directly to ChromaDB vectors.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 rounded-xl bg-black/40 border border-zinc-800 hover:border-zinc-700 transition focus-within:border-indigo-500/80">
              <Search size={18} className="text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Query market, company, industry sector..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-transparent outline-none w-full py-4 text-sm text-zinc-100 placeholder-zinc-500 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={!topic.trim()}
              className="bg-indigo-600 border border-indigo-500/50 hover:bg-indigo-500 text-zinc-50 font-bold px-6 py-4 rounded-xl transition duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-sm flex items-center gap-1.5"
            >
              Analyze
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Grid of Recent reports and templates */}
      <div className="grid md:grid-cols-3 gap-6 text-left">
        {/* Recent Reports Table/List */}
        <div className="md:col-span-2 glass-panel rounded-2xl p-6 border-zinc-800/80">
          <div className="flex items-center justify-between mb-4 border-b border-zinc-800/60 pb-3">
            <h3 className="font-bold text-zinc-200 text-sm uppercase tracking-wider flex items-center gap-2">
              <Clock size={14} className="text-indigo-400" />
              Recent Intelligence Operations
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono">
              Last {reports.slice(0, 5).length} entries
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No recent analytics records. Launch a query to begin.
            </div>
          ) : (
            <div className="divide-y divide-zinc-900/60">
              {reports.slice(0, 5).map((r, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between py-3.5 group hover:bg-zinc-900/10 cursor-pointer transition px-1.5 rounded-lg"
                  onClick={() => onViewReport(r)}
                >
                  <div className="overflow-hidden mr-4">
                    <span className="font-bold text-sm text-zinc-200 group-hover:text-indigo-400 transition truncate block">
                      {r.topic}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">
                      {r.timestamp || "Just now"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-semibold text-zinc-400">Score</span>
                      <span className="text-xs font-mono text-emerald-400">
                        {r.verification?.score || "—"}/100
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-zinc-700 group-hover:text-zinc-400 transform group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Small templates directions grid */}
        <div className="glass-panel rounded-2xl p-6 border-zinc-800/80">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-800/60 pb-3">
            <TrendingUp size={14} className="text-indigo-400" />
            <h3 className="font-bold text-zinc-200 text-sm uppercase tracking-wider">
              Trending Sectors
            </h3>
          </div>
          
          <div className="space-y-3.5">
            <button
              onClick={() => onLaunchResearch("Indian EV Market")}
              className="flex items-center justify-between w-full text-left p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/40 hover:bg-zinc-900/40 transition group"
            >
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Automotive</span>
                <h4 className="font-bold text-xs text-zinc-200 mt-0.5 group-hover:text-zinc-100">Indian EV Infrastructure</h4>
              </div>
              <ArrowRight size={12} className="text-zinc-600 group-hover:text-zinc-400 transition" />
            </button>

            <button
              onClick={() => onLaunchResearch("Global Semiconductor Supply Chain")}
              className="flex items-center justify-between w-full text-left p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/40 hover:bg-zinc-900/40 transition group"
            >
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wide">Technology</span>
                <h4 className="font-bold text-xs text-zinc-200 mt-0.5 group-hover:text-zinc-100">Foundry Constraints</h4>
              </div>
              <ArrowRight size={12} className="text-zinc-600 group-hover:text-zinc-400 transition" />
            </button>

            <button
              onClick={() => onLaunchResearch("GenAI Enterprise Software Dev")}
              className="flex items-center justify-between w-full text-left p-3 rounded-xl bg-zinc-900/20 border border-zinc-800/40 hover:bg-zinc-900/40 transition group"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">Software</span>
                <h4 className="font-bold text-xs text-zinc-200 mt-0.5 group-hover:text-zinc-100">Developer Velocity</h4>
              </div>
              <ArrowRight size={12} className="text-zinc-600 group-hover:text-zinc-400 transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
