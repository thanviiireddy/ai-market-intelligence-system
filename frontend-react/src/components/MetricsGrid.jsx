import { 
  ShieldCheck, 
  FileCheck, 
  BookOpen, 
  Milestone 
} from "lucide-react";

export default function MetricsGrid({ verificationScore = 0, reviewScore = 0, wordCount = 0, sourcesCount = 0 }) {
  // Compute depth score based on word count
  const getDepthScore = () => {
    if (wordCount === 0) return 0;
    if (wordCount > 1500) return 98;
    if (wordCount > 1000) return 88;
    if (wordCount > 500) return 75;
    return 55;
  };

  const metrics = [
    {
      label: "Verification Rating",
      value: `${verificationScore}/100`,
      desc: "Completeness validation check",
      icon: ShieldCheck,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    },
    {
      label: "Report Quality Rating",
      value: `${reviewScore}/100`,
      desc: "LLM structural guidelines compliance",
      icon: FileCheck,
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    },
    {
      label: "Research Depth Score",
      value: `${getDepthScore()}/100`,
      desc: `Derived from ${wordCount.toLocaleString()} total report words`,
      icon: Milestone,
      color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    },
    {
      label: "Web Sources Analyzed",
      value: sourcesCount || "—",
      desc: "Verified citations referenced",
      icon: BookOpen,
      color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div 
            key={idx} 
            className="glass-panel rounded-2xl p-5 border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs font-semibold text-zinc-400 truncate">
                {m.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${m.color}`}>
                <Icon size={16} />
              </div>
            </div>
            <div className="text-2xl font-black text-zinc-50 tracking-tight">
              {m.value}
            </div>
            <p className="text-[10px] text-zinc-500 truncate mt-1">
              {m.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
