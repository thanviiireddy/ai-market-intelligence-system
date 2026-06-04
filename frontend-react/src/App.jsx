<pre className="whitespace-pre-wrap text-slate-300 leading-8">
  {data.report}
</pre>
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiShield,
  FiFileText,
  FiTrendingUp,
  FiLayers,
} from "react-icons/fi";

function App() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!topic.trim()) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `http://127.0.0.1:8000/research?topic=${topic}`
      );

      setData(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-800 bg-slate-950 p-8">

          <div className="mb-12">
            <h1 className="text-2xl font-bold">
              ⚡ MarketMind AI
            </h1>

            <p className="text-slate-400 mt-2">
              Intelligence Platform
            </p>
          </div>

          <div className="space-y-4">

            <div className="text-slate-300 hover:text-white cursor-pointer">
              Dashboard
            </div>

            <div className="text-slate-300 hover:text-white cursor-pointer">
              Research
            </div>

            <div className="text-slate-300 hover:text-white cursor-pointer">
              Reports
            </div>

            <div className="text-slate-300 hover:text-white cursor-pointer">
              Memory
            </div>

          </div>

        </aside>

        {/* Main */}
        <main className="flex-1 p-12">

          {/* Hero */}
          <div className="mb-12">

            <h1 className="text-6xl font-bold mb-4">
              Market Intelligence
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl">
              Generate professional market research reports using
              autonomous Planner, Researcher, Verifier, Writer,
              and Reviewer AI agents.
            </p>

          </div>

          {/* Search Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-10">

            <div className="flex gap-4">

              <div className="flex items-center flex-1 bg-slate-950 rounded-2xl px-4">

                <FiSearch className="text-slate-500" />

                <input
                  type="text"
                  placeholder="Search market, company, industry..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-transparent outline-none w-full px-4 py-4 text-white"
                />

              </div>

              <button
                onClick={generateReport}
                className="bg-white text-black font-semibold px-8 rounded-2xl hover:bg-slate-200 transition"
              >
                Generate
              </button>

            </div>

          </div>

          {/* Loading */}
          {loading && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
              🔍 Researching market data...
            </div>
          )}

          {/* Results */}
          {data && (
            <>
              {/* Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mb-10">

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
                >
                  <FiShield size={22} className="mb-3 text-green-400" />

                  <p className="text-slate-400 text-sm">
                    Verification
                  </p>

                  <h2 className="text-4xl font-bold">
                    {data.verification.score}
                  </h2>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
                >
                  <FiFileText size={22} className="mb-3 text-blue-400" />

                  <p className="text-slate-400 text-sm">
                    Review
                  </p>

                  <h2 className="text-4xl font-bold">
                    {data.review.score}
                  </h2>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
                >
                  <FiLayers size={22} className="mb-3 text-purple-400" />

                  <p className="text-slate-400 text-sm">
                    Sections
                  </p>

                  <h2 className="text-4xl font-bold">
                    {data.plan.sections.length}
                  </h2>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
                >
                  <FiTrendingUp size={22} className="mb-3 text-orange-400" />

                  <p className="text-slate-400 text-sm">
                    Topic
                  </p>

                  <h2 className="font-semibold">
                    {data.topic}
                  </h2>
                </motion.div>

              </div>

              {/* Research Plan */}
              <div className="mb-10">

                <h2 className="text-2xl font-bold mb-5">
                  Research Plan
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                  {data.plan.sections.map((section, index) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      key={index}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                    >
                      {section}
                    </motion.div>
                  ))}

                </div>

              </div>

              {/* Report */}
              <div>

                <h2 className="text-2xl font-bold mb-5">
                  Final Report
                </h2>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-h-[700px] overflow-y-auto">

                  <pre className="whitespace-pre-wrap text-slate-300 leading-8">
                    {data.report}
                  </pre>

                </div>

              </div>

            </>
          )}

        </main>

      </div>

    </div>
  );
}

export default App;
