import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { triggerResearch } from "./services/api";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ResearchWorkspace from "./pages/ResearchWorkspace";
import MemoryDashboard from "./pages/MemoryDashboard";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [reports, setReports] = useLocalStorage("market_intelligence_reports", []);
  
  // Workspace states
  const [currentReport, setCurrentReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [error, setError] = useState(null);

  // Triggers the research query pipeline
  const handleLaunchResearch = async (topic) => {
    if (!topic.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setActiveStepIndex(0);
      setActiveView("research");
      setCurrentReport(null);

      // Start a simulated timer to increment agent workflow steps
      // in order to show live agent activity while waiting for the blocking HTTP response.
      const simTimer = setInterval(() => {
        setActiveStepIndex((prev) => {
          if (prev < 4) return prev + 1;
          clearInterval(simTimer);
          return prev;
        });
      }, 5000); // Progress agents every 5 seconds

      // Run synchronous API query
      const result = await triggerResearch(topic);
      
      clearInterval(simTimer);
      
      // Inject local timestamp details
      const formattedTimestamp = new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      const payload = {
        ...result,
        timestamp: formattedTimestamp
      };

      // Set state and save to local storage history list
      setCurrentReport(payload);
      setReports((prevList) => {
        // Prevent duplicate topic saves
        const filtered = prevList.filter(item => item.topic.toLowerCase() !== topic.toLowerCase());
        return [payload, ...filtered];
      });
      
      setActiveStepIndex(4);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to generate report");
      setActiveStepIndex(-1);
    } finally {
      setLoading(false);
    }
  };

  // Switch workspace display target to open a past report
  const handleViewReport = (report) => {
    setCurrentReport(report);
    setActiveView("research");
  };

  // Delete report handler
  const handleDeleteReport = (topicToDelete) => {
    setReports((prevList) => prevList.filter(r => r.topic !== topicToDelete));
    if (currentReport && currentReport.topic === topicToDelete) {
      setCurrentReport(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Collapsible Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Panel content */}
      <main className="md:pl-64 min-h-screen flex flex-col">
        <div className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {activeView === "dashboard" && (
            <Dashboard 
              reports={reports} 
              onLaunchResearch={handleLaunchResearch} 
              onViewReport={handleViewReport} 
            />
          )}

          {activeView === "research" && (
            <ResearchWorkspace
              reportData={currentReport}
              loading={loading}
              activeStepIndex={activeStepIndex}
              onLaunchResearch={handleLaunchResearch}
              error={error}
            />
          )}

          {activeView === "memory" && (
            <MemoryDashboard
              reports={reports}
              onViewReport={handleViewReport}
              onDeleteReport={handleDeleteReport}
            />
          )}
        </div>
      </main>
    </div>
  );
}
