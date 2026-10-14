import React, { useState } from 'react';
import { SALARY_BENCHMARKS } from '../data/insightsData';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  CheckCircle2, 
  FileSpreadsheet, 
  Mail, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function SalaryGuide() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleDownload = (e) => {
    e.preventDefault();
    if (!email) return;
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setEmail('');
    }, 4000);
  };

  return (
    <section id="salary-guide" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-sky-800">
              <BarChart3 className="w-3.5 h-3.5" />
              Global Tech Market Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-3">
              2026/2027 Global Tech & Engineering Salary Benchmarks
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Real-world compensation data sourced from over 14,500 international placements across premier tech ecosystems.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Fastest Rising Sector</span>
              <span className="text-sm font-bold text-white">AI & Autonomous Systems (+24% YoY)</span>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Table */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6 text-slate-200">Role / Discipline</th>
                  <th className="py-4 px-6">North America (USD)</th>
                  <th className="py-4 px-6">United Kingdom (GBP)</th>
                  <th className="py-4 px-6">European Union (EUR)</th>
                  <th className="py-4 px-6">Asia-Pacific (SGD / JPY)</th>
                  <th className="py-4 px-6 text-sky-400">UAE (0% Tax USD)</th>
                  <th className="py-4 px-6 text-right">Market Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {SALARY_BENCHMARKS.map((bench) => (
                  <tr key={bench.role} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">
                      {bench.role}
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                      {bench.us}
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                      {bench.uk}
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                      {bench.eu}
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                      {bench.apac}
                    </td>
                    <td className="py-4 px-6 text-sky-300 font-semibold font-mono text-xs">
                      {bench.uae}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        {bench.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Salary Report Download Box */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 border border-sky-800/50 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4" />
              Comprehensive 64-Page Report
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Download the 2026/2027 International Tech Salary & Relocation Guide
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Includes comprehensive tax breakdown tables, visa qualification criteria, cost-of-living indexes, and relocation stipend standard benchmarks.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            {downloadSuccess ? (
              <div className="bg-emerald-900/60 border border-emerald-600 rounded-2xl p-4 flex items-center gap-3 text-emerald-300 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Success! The PDF report link has been sent to your email.</span>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter corporate or personal email..."
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Get Free PDF
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
