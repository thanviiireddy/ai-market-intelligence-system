import { 
  Lightbulb, 
  TrendingUp, 
  ShieldAlert, 
  Rocket 
} from "lucide-react";

export default function ExecutiveSummary({ summary }) {
  const { insights = [], opportunities = [], risks = [], trends = [] } = summary;

  const sections = [
    {
      title: "Key Market Insights",
      items: insights,
      icon: Lightbulb,
      borderColor: "border-indigo-500/20",
      iconColor: "text-indigo-400 bg-indigo-500/5",
    },
    {
      title: "Key Strategic Opportunities",
      items: opportunities,
      icon: Rocket,
      borderColor: "border-emerald-500/20",
      iconColor: "text-emerald-400 bg-emerald-500/5",
    },
    {
      title: "Key Vulnerabilities & Risks",
      items: risks,
      icon: ShieldAlert,
      borderColor: "border-rose-500/20",
      iconColor: "text-rose-400 bg-rose-500/5",
    },
    {
      title: "Evolving Industry Trends",
      items: trends,
      icon: TrendingUp,
      borderColor: "border-amber-500/20",
      iconColor: "text-amber-400 bg-amber-500/5",
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider text-left">
        Executive Overview Dashboard
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((sec, i) => {
          const Icon = sec.icon;
          return (
            <div 
              key={i} 
              className={`glass-panel rounded-2xl p-5 border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-200 text-left relative overflow-hidden`}
            >
              {/* Card Title Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${sec.iconColor} ${sec.borderColor}`}>
                  <Icon size={16} />
                </div>
                <h4 className="font-bold text-zinc-100 text-sm tracking-tight">{sec.title}</h4>
              </div>

              {/* Card List items */}
              <ul className="space-y-2.5">
                {sec.items.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
