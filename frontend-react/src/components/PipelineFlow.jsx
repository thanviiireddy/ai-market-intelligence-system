import { 
  FileText, 
  Search, 
  ShieldAlert, 
  PenTool, 
  CheckCircle 
} from "lucide-react";

export default function PipelineFlow({ activeStepIndex, isRunning }) {
  const steps = [
    { label: "Planner", desc: "Outlining", icon: FileText },
    { label: "Researcher", desc: "Searching", icon: Search },
    { label: "Verifier", desc: "Validating", icon: ShieldAlert },
    { label: "Writer", desc: "Compiling", icon: PenTool },
    { label: "Reviewer", desc: "Scoring", icon: CheckCircle },
  ];

  // Calculate completion percentage
  const getProgressPercentage = () => {
    if (!isRunning && activeStepIndex === -1) return 0;
    if (!isRunning && activeStepIndex >= 4) return 100;
    // Step weights
    return Math.min(Math.max((activeStepIndex + 1) * 20 - 10, 0), 100);
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border-zinc-800/80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
          Research Pipeline Flow
        </h3>
        <span className="text-xs font-mono font-medium text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-lg border border-indigo-500/10">
          Progress: {getProgressPercentage()}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

      {/* Steps nodes */}
      <div className="relative flex items-center justify-between">
        {/* SVG connections overlay */}
        <div className="absolute inset-0 top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 z-0 pointer-events-none px-8 hidden md:block">
          <svg className="w-full h-2 overflow-visible">
            <line
              x1="0"
              y1="4"
              x2="100%"
              y2="4"
              stroke="#27272a"
              strokeWidth="2"
            />
            {isRunning && (
              <line
                x1="0"
                y1="4"
                x2={`${(activeStepIndex / 4) * 100}%`}
                y2="4"
                stroke="url(#indigo-purple-grad)"
                strokeWidth="2.5"
                className="animate-flow-wire"
                style={{ strokeDasharray: "8, 4" }}
              />
            )}
            <defs>
              <linearGradient id="indigo-purple-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Nodes */}
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < activeStepIndex;
          const isActive = index === activeStepIndex && isRunning;
          const isPending = index > activeStepIndex || (!isRunning && activeStepIndex === -1);
          
          return (
            <div key={index} className="flex flex-col items-center text-center relative z-10 shrink-0">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300
                  ${isActive 
                    ? "bg-indigo-500/10 border-indigo-400 text-indigo-400 shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)] animate-pulse" 
                    : isCompleted
                      ? "bg-zinc-900 border-indigo-500 text-indigo-400"
                      : "bg-zinc-950 border-zinc-800 text-zinc-500"
                  }
                `}
              >
                <Icon size={18} />
              </div>
              <span className={`text-xs font-bold mt-2.5 ${isActive ? "text-zinc-200" : isCompleted ? "text-zinc-300" : "text-zinc-500"}`}>
                {step.label}
              </span>
              <span className={`text-[10px] hidden sm:block ${isActive ? "text-indigo-400" : "text-zinc-600"}`}>
                {isActive ? "Active" : isCompleted ? "Done" : "Pending"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
