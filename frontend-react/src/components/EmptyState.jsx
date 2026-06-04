import { 
  Compass, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  BrainCircuit 
} from "lucide-react";

export default function EmptyState({ onSelectTopic }) {
  const templates = [
    {
      title: "Indian EV Market",
      desc: "Analyze government policies, charging infrastructure networks, and key manufacturing leaders.",
      badge: "Automotive"
    },
    {
      title: "Global Semiconductor Supply Chain",
      desc: "Analyze geopolitics, foundry investments, and fab constraints shaping tech hardware production.",
      badge: "Technology"
    },
    {
      title: "GenAI Enterprise Tools Impact",
      desc: "Explore developer velocity improvements, licensing debates, and code repository integrations.",
      badge: "Software"
    },
    {
      title: "Commercial Space Flight Constellations",
      desc: "Examine satellite bands, launcher availability, and payload market forecasts.",
      badge: "Aerospace"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-center">
      {/* Visual Header */}
      <div className="relative inline-flex items-center justify-center p-5 rounded-3xl bg-zinc-900 border border-zinc-800/80 mb-8">
        <BrainCircuit size={48} className="text-indigo-400" />
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500 animate-ping" />
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-500" />
      </div>

      <h2 className="text-4xl font-extrabold tracking-tight text-zinc-50 mb-3 bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
        Market intelligence, automated
      </h2>
      <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-12">
        Enter an industry query to activate our multi-agent network. Gather web search feeds, score text quality, and formulate detailed research papers in real-time.
      </p>

      {/* Feature Highlighters */}
      <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
        <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/40 backdrop-blur-sm">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/20">
            <Compass size={18} />
          </div>
          <h4 className="font-semibold text-zinc-200 text-sm mb-1.5">Sequential Planning</h4>
          <p className="text-xs text-zinc-400 leading-5">The workflow generates five distinct sections for a balanced deep dive into market opportunities and dynamics.</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/40 backdrop-blur-sm">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
            <ShieldCheck size={18} />
          </div>
          <h4 className="font-semibold text-zinc-200 text-sm mb-1.5">Dual-Stage Verification</h4>
          <p className="text-xs text-zinc-400 leading-5">Integrates automatic length compliance and structural validation scoring to guarantee professional documentation levels.</p>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/40 backdrop-blur-sm">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
            <TrendingUp size={18} />
          </div>
          <h4 className="font-semibold text-zinc-200 text-sm mb-1.5">Vector Store Recall</h4>
          <p className="text-xs text-zinc-400 leading-5">Every generated document is indexed into local ChromaDB collections, facilitating instant semantic recall later.</p>
        </div>
      </div>

      {/* Templates Selector */}
      <div className="text-left">
        <div className="flex items-center gap-2 mb-6">
          <Search size={16} className="text-indigo-400" />
          <h3 className="font-semibold text-zinc-300 text-sm uppercase tracking-wider">Example Research Templates</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {templates.map((tpl, i) => (
            <button
              key={i}
              onClick={() => onSelectTopic(tpl.title)}
              className="group p-5 rounded-2xl bg-zinc-900/45 border border-zinc-800/80 text-left hover:bg-zinc-900/80 hover:border-zinc-700/80 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-semibold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/5 border border-indigo-500/10 uppercase tracking-wider shrink-0">
                  {tpl.badge}
                </span>
                <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <h4 className="font-bold text-zinc-200 text-sm group-hover:text-zinc-50 transition-colors mb-1 truncate">
                {tpl.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                {tpl.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
