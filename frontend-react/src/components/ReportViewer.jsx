import { useState, useRef, useEffect } from "react";
import { 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  ChevronRight, 
  ExternalLink,
  Printer
} from "lucide-react";
import { extractHeadings, extractCitations } from "../utils/markdownParser";

export default function ReportViewer({ reportText = "", topic = "" }) {
  const [copied, setCopied] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const contentRef = useRef(null);
  
  const headings = extractHeadings(reportText);
  const citations = extractCitations(reportText);

  // Copy report to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Download raw txt file
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.toLowerCase().replace(/\s+/g, "_")}_report.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Print report
  const handlePrint = () => {
    window.print();
  };

  // Scroll target handler
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHeadingId(id);
    }
  };

  // Build markdown headings with mock styles on scroll
  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const handleScroll = () => {
      const headingEls = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      let currentActive = "";
      
      for (const el of headingEls) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          currentActive = el.id;
        }
      }
      
      if (currentActive) {
        setActiveHeadingId(currentActive);
      }
    };

    contentEl.addEventListener("scroll", handleScroll);
    return () => contentEl.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Split plain text into headings and paragraphs to render dynamically with modern styles
  const renderFormattedReport = () => {
    const lines = reportText.split("\n");
    return lines.map((line, idx) => {
      const cleanLine = line.trim();
      if (!cleanLine) return <div key={idx} className="h-4" />;

      // Match headings
      const headingMatch = /^(#{1,3})\s+(.+)$/.exec(cleanLine);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].replace(/[*_]/g, "");
        const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

        if (level === 1) {
          return (
            <h1 
              key={idx} 
              id={id} 
              className="text-2xl font-extrabold text-zinc-100 mt-8 mb-4 border-b border-zinc-800 pb-2 text-left"
            >
              {text}
            </h1>
          );
        } else if (level === 2) {
          return (
            <h2 
              key={idx} 
              id={id} 
              className="text-lg font-bold text-zinc-200 mt-6 mb-3 text-left"
            >
              {text}
            </h2>
          );
        } else {
          return (
            <h3 
              key={idx} 
              id={id} 
              className="text-sm font-semibold text-zinc-300 mt-4 mb-2 text-left"
            >
              {text}
            </h3>
          );
        }
      }

      // Check bullet items
      if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-sm text-zinc-300 leading-7 text-left my-1">
            {cleanLine.slice(2).replace(/[*_`]/g, "")}
          </li>
        );
      }

      // Match raw numbered list
      if (/^\d+\.\s+/.test(cleanLine)) {
        return (
          <li key={idx} className="ml-5 list-decimal text-sm text-zinc-300 leading-7 text-left my-1">
            {cleanLine.replace(/^\d+\.\s+/, "").replace(/[*_`]/g, "")}
          </li>
        );
      }

      // Standard paragraph
      return (
        <p key={idx} className="text-sm text-zinc-300 leading-7 text-left my-3 font-normal">
          {cleanLine.replace(/[*_`]/g, "")}
        </p>
      );
    });
  };

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Side Table of Contents (Hidden on mobile) */}
      <div className="hidden md:block col-span-1 text-left space-y-5">
        <div className="glass-panel rounded-2xl p-5 border-zinc-800/80 sticky top-6">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <BookOpen size={13} className="text-indigo-400" />
            Table of Contents
          </h4>
          
          {headings.length === 0 ? (
            <span className="text-xs text-zinc-600 block">No structure outline found</span>
          ) : (
            <nav className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
              {headings.map((h, i) => (
                <button
                  key={i}
                  onClick={() => scrollToHeading(h.id)}
                  className={`flex items-center gap-1.5 w-full text-left rounded-lg transition-all text-xs font-medium py-1.5 px-2
                    ${activeHeadingId === h.id 
                      ? "text-indigo-400 bg-indigo-500/5 border border-indigo-500/10" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30"
                    }
                    ${h.level === 2 ? "pl-5" : ""}
                    ${h.level === 3 ? "pl-8" : ""}
                  `}
                >
                  <ChevronRight size={10} className={`shrink-0 transition-transform ${activeHeadingId === h.id ? "rotate-90 text-indigo-400" : "text-zinc-600"}`} />
                  <span className="truncate">{h.text}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Main Report Body */}
      <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
        <div className="glass-panel rounded-3xl border-zinc-800/80 overflow-hidden flex flex-col">
          {/* Header Action bar */}
          <div className="px-6 py-4 border-b border-zinc-800/60 flex items-center justify-between bg-zinc-900/30">
            <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase shrink-0">
              Analyst Report Output
            </span>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition"
              >
                <Download size={12} />
                <span>Download</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition"
              >
                <Printer size={12} />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Reader container */}
          <div 
            ref={contentRef}
            className="p-8 max-h-[600px] overflow-y-auto bg-zinc-950/40 select-text scroll-smooth"
          >
            <div className="max-w-2xl mx-auto space-y-2">
              {renderFormattedReport()}
            </div>

            {/* Citations / bibliography drawer */}
            {citations.length > 0 && (
              <div className="max-w-2xl mx-auto mt-12 pt-8 border-t border-zinc-800/80 text-left">
                <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen size={14} className="text-indigo-400" />
                  Sources & Citations
                </h3>
                <ol className="space-y-3">
                  {citations.map((url, i) => (
                    <li key={i} className="flex items-start gap-3 py-1.5 px-2.5 rounded-lg bg-zinc-900/10 border border-zinc-900/40 hover:bg-zinc-900/40 transition">
                      <span className="text-[10px] font-mono text-zinc-500 mt-1 shrink-0">
                        [{i + 1}]
                      </span>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-400 hover:underline flex items-center gap-1 truncate"
                      >
                        <span className="truncate">{url}</span>
                        <ExternalLink size={10} className="shrink-0 text-indigo-500" />
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
