import { 
  CheckCircle2, 
  Loader2, 
  CircleAlert, 
  HelpCircle,
  Terminal
} from "lucide-react";

export default function AgentGrid({ activeStepIndex, isRunning }) {
  const agents = [
    {
      id: "planner",
      name: "Planner Agent",
      role: "Workflow Structure & Agenda",
      logs: {
        idle: "Awaiting topic input...",
        running: "Generating optimal 5 research categories...",
        completed: "Outline generated. Created 5 research targets."
      }
    },
    {
      id: "researcher",
      name: "Researcher Agent",
      role: "Data Collection & Tavily Search",
      logs: {
        idle: "Waiting for outline...",
        running: "Running Tavily search. Synthesizing web notes...",
        completed: "Data collection complete. notes cached."
      }
    },
    {
      id: "verifier",
      name: "Verifier Agent",
      role: "Quality & Compliance Inspection",
      logs: {
        idle: "Waiting for notes...",
        running: "Checking notes completeness and character lengths...",
        completed: "Verification done. Heuristics score: 100/100."
      }
    },
    {
      id: "writer",
      name: "Writer Agent",
      role: "Synthesis & Markdown Generation",
      logs: {
        idle: "Waiting for verification...",
        running: "Drafting sections into unified executive layout...",
        completed: "Report drafted. Markdown files generated."
      }
    },
    {
      id: "reviewer",
      name: "Reviewer Agent",
      role: "Final Structural Score Review",
      logs: {
        idle: "Waiting for report draft...",
        running: "Running final structure checks...",
        completed: "Review completed. Export pipelines cleared."
      }
    }
  ];

  const getStatus = (index) => {
    if (!isRunning) {
      if (activeStepIndex === -1) return "idle";
      return "completed";
    }
    if (index < activeStepIndex) return "completed";
    if (index === activeStepIndex) return "running";
    return "idle";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
          Multi-Agent System Monitor
        </h3>
        <span className="text-xs text-zinc-500 flex items-center gap-1.5">
          <Terminal size={12} className="text-indigo-400" />
          5 Agents Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {agents.map((agent, index) => {
          const status = getStatus(index);
          
          return (
            <div 
              key={agent.id}
              className={`glass-panel rounded-2xl p-5 flex flex-col justify-between h-44 transition-all duration-300
                ${status === "running" 
                  ? "border-indigo-500/50 bg-indigo-500/5 shadow-[0_0_20px_-3px_rgba(99,102,241,0.15)]" 
                  : status === "completed"
                    ? "border-emerald-500/30"
                    : "border-zinc-800/60 opacity-60"
                }
              `}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-zinc-200 truncate">{agent.name}</h4>
                  <span className="text-[10px] text-zinc-500 block truncate">{agent.role}</span>
                </div>
                
                {/* Status Indicator Badge */}
                <div>
                  {status === "completed" && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                  {status === "running" && <Loader2 size={16} className="text-indigo-400 animate-spin shrink-0" />}
                  {status === "idle" && <HelpCircle size={16} className="text-zinc-600 shrink-0" />}
                </div>
              </div>

              {/* Logs terminal */}
              <div className="flex-1 my-3 bg-black/40 border border-zinc-800/40 rounded-lg p-2.5 font-mono text-[9px] leading-3.5 text-left text-zinc-400 overflow-y-auto min-h-16 select-none">
                <div className="text-[8px] text-zinc-600 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                  <span className={`w-1 h-1 rounded-full ${status === 'running' ? 'bg-indigo-400 animate-pulse' : 'bg-zinc-700'}`} />
                  Agent Log
                </div>
                <p className={status === "running" ? "text-indigo-300" : status === "completed" ? "text-zinc-300" : "text-zinc-500"}>
                  {agent.logs[status]}
                </p>
              </div>

              {/* Status text label */}
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-500">State</span>
                <span 
                  className={`font-semibold uppercase tracking-wider
                    ${status === "completed" ? "text-emerald-400" : ""}
                    ${status === "running" ? "text-indigo-400" : ""}
                    ${status === "idle" ? "text-zinc-600" : ""}
                  `}
                >
                  {status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
