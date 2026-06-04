import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Search, 
  Database, 
  Server, 
  Menu, 
  X, 
  TrendingUp, 
  HelpCircle,
  Settings
} from "lucide-react";
import { checkHealth } from "../services/api";

export default function Sidebar({ activeView, onViewChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check backend server status periodically
  useEffect(() => {
    const runPing = async () => {
      const status = await checkHealth();
      setApiOnline(status);
    };
    runPing();
    const interval = setInterval(runPing, 10000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "research", label: "Research Studio", icon: Search },
    { id: "memory", label: "Vector Vault", icon: Database },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-50"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-45 flex flex-col border-r border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header/Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-zinc-50 font-bold shrink-0">
              M
            </div>
            {!collapsed && (
              <span className="font-semibold text-lg tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-300 bg-clip-text text-transparent truncate">
                MarketMind AI
              </span>
            )}
          </div>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center w-6 h-6 rounded-md hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3.5 w-full px-4 py-3 rounded-xl font-medium text-sm transition-all group relative
                  ${active 
                    ? "bg-zinc-900 text-indigo-400 border border-zinc-800/60" 
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/40"
                  }
                `}
              >
                <Icon size={18} className={`${active ? "text-indigo-400" : "text-zinc-400 group-hover:text-zinc-200"}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
                
                {/* Collapsed Tooltip */}
                {collapsed && (
                  <div className="absolute left-22 scale-0 group-hover:scale-100 transition-all origin-left px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-semibold whitespace-nowrap shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Panel Status / Profile */}
        <div className="p-4 border-t border-zinc-800/60 space-y-4">
          {/* API Health indicator */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-zinc-900/30 border border-zinc-800/40">
            <Server size={16} className={apiOnline ? "text-emerald-500" : "text-amber-500"} />
            {!collapsed && (
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-semibold text-zinc-300">System API</span>
                <span className={`text-[10px] font-medium ${apiOnline ? "text-emerald-400" : "text-amber-400"}`}>
                  {apiOnline ? "Operational (Online)" : "Offline (Connecting)"}
                </span>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-800 border border-zinc-700/60 flex items-center justify-center font-semibold text-zinc-200 uppercase shrink-0 text-sm">
              TR
            </div>
            {!collapsed && (
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-semibold text-zinc-100 truncate">Thanvi Reddy</span>
                <span className="text-[10px] font-medium text-zinc-500 truncate">Enterprise Analyst</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
