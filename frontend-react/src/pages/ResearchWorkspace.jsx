import { useState } from "react";
import { Search, Sparkles, AlertCircle } from "lucide-react";
import PipelineFlow from "../components/PipelineFlow";
import AgentGrid from "../components/AgentGrid";
import MetricsGrid from "../components/MetricsGrid";
import ExecutiveSummary from "../components/ExecutiveSummary";
import ReportViewer from "../components/ReportViewer";
import SkeletonLoader from "../components/SkeletonLoader";
import EmptyState from "../components/EmptyState";
import { extractExecutiveSummary } from "../utils/reportExtractor";

export default function ResearchWorkspace({
  reportData,
  loading,
  activeStepIndex,
  onLaunchResearch,
  error
}) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && !loading) {
      onLaunchResearch(topic);
    }
  };

  const hasData = reportData && reportData.report;

  // Extract metrics variables
  const reportText = reportData?.report || "";
  const wordCount = reportText ? reportText.split(/\s+/).length : 0;
  const verificationScore = reportData?.verification?.score || 0;
  const reviewScore = reportData?.review?.score || 0;

  // Citations extraction
  const getCitationsCount = () => {
    if (!reportText) return 0;
    const urls = new Set();
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const nakedUrlRegex = /(https?:\/\/[^\s]+)/g;
    let match;
    linkRegex.lastIndex = 0;
    while ((match = linkRegex.exec(reportText)) !== null) {
      urls.add(match[2]);
    }
    nakedUrlRegex.lastIndex = 0;
    while ((match = nakedUrlRegex.exec(reportText)) !== null) {
      let url = match[1].trim();
      if (url.endsWith(".") || url.endsWith(",") || url.endsWith(")")) {
        url = url.slice(0, -1);
      }
      urls.add(url);
    }
    return urls.size;
  };

  // Run executive summary parser
  const summary = hasData 
    ? extractExecutiveSummary(reportText, reportData.topic)
    : { insights: [], opportunities: [], risks: [], trends: [] };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/60 pb-6 text-left">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Research Studio</h1>
          <p className="text-xs text-zinc-400 mt-1.5">
            Query market intelligence reports, monitor AI agents, and inspect parsed outcomes.
          </p>
        </div>

        {/* Action input bar */}
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md w-full sm:w-80 md:w-96">
          <div className="flex-1 flex items-center gap-2 px-3 rounded-lg bg-zinc-900/40 border border-zinc-800 focus-within:border-indigo-500/80 transition">
            <Search size={14} className="text-zinc-500 shrink-0" />
            <input
              type="text"
              placeholder="Start research target..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
              className="bg-transparent outline-none w-full py-2.5 text-xs text-zinc-200 placeholder-zinc-500 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={!topic.trim() || loading}
            className="bg-zinc-50 border border-zinc-300 hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2.5 rounded-lg text-xs transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            Launch
          </button>
        </form>
      </div>

      {/* Error alert wrapper */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-400 text-sm text-left">
          <AlertCircle size={18} className="shrink-0" />
          <p className="font-medium">Failed to run analysis: {error}</p>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-8 text-left">
          <PipelineFlow activeStepIndex={activeStepIndex} isRunning={true} />
          <AgentGrid activeStepIndex={activeStepIndex} isRunning={true} />
          <SkeletonLoader type="workspace" />
        </div>
      )}

      {/* Empty State Welcome Dashboard */}
      {!loading && !hasData && (
        <EmptyState onSelectTopic={(t) => {
          setTopic(t);
          onLaunchResearch(t);
        }} />
      )}

      {/* Data Viewer Dashboard */}
      {!loading && hasData && (
        <div className="space-y-8 text-left">
          {/* Active workflow history indicators */}
          <div className="space-y-4">
            <PipelineFlow activeStepIndex={4} isRunning={false} />
            <AgentGrid activeStepIndex={4} isRunning={false} />
          </div>

          {/* Metrics summary widgets */}
          <MetricsGrid 
            verificationScore={verificationScore}
            reviewScore={reviewScore}
            wordCount={wordCount}
            sourcesCount={getCitationsCount()}
          />

          {/* Executive summarized key findings */}
          <ExecutiveSummary summary={summary} />

          {/* Full Markdown Report content */}
          <div className="pt-4">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
              Intelligence Document Reader
            </h3>
            <ReportViewer reportText={reportText} topic={reportData.topic} />
          </div>
        </div>
      )}
    </div>
  );
}
