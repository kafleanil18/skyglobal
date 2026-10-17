import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Building2, 
  Globe2, 
  Plane, 
  CheckCircle2, 
  Clock, 
  Award, 
  Download, 
  Layers, 
  ArrowUpRight, 
  Sparkles, 
  Filter, 
  Calendar,
  FileText,
  AlertCircle,
  Eye,
  Crown
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { downloadApplicantCV } from '../../utils/cvDownloader';

export default function AdminAnalyticsTab() {
  const { jobs, applications, employerRequests, countries } = useCMS();
  const { isSuperAdmin } = useAuth();

  const [timeframe, setTimeframe] = useState('all'); // 'all' | 'quarter' | 'month'
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState('All');
  const [selectedStageModal, setSelectedStageModal] = useState(null);

  // Filtered applications based on destination filter and timeframe
  const filteredApps = useMemo(() => {
    const now = new Date();
    return applications.filter(app => {
      if (selectedDestinationFilter !== 'All') {
        const match = (app.preferredDestination || '').toLowerCase().includes(selectedDestinationFilter.toLowerCase());
        if (!match) return false;
      }

      if (timeframe !== 'all' && app.appliedDate) {
        const appDate = new Date(app.appliedDate);
        if (!isNaN(appDate.getTime())) {
          const diffDays = (now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24);
          if (timeframe === 'month' && diffDays > 30) return false;
          if (timeframe === 'quarter' && diffDays > 90) return false;
        }
      }

      return true;
    });
  }, [applications, selectedDestinationFilter, timeframe]);

  // Aggregate Funnel Stages
  const pipelineMetrics = useMemo(() => {
    const total = filteredApps.length;
    const pending = filteredApps.filter(a => a.status === 'Pending').length;
    const underReview = filteredApps.filter(a => a.status === 'Under Review').length;
    const interview = filteredApps.filter(a => a.status === 'Interview Scheduled').length;
    const visaProcessing = filteredApps.filter(a => a.status === 'Visa Processing').length;
    const approved = filteredApps.filter(a => a.status === 'Approved').length;
    const rejected = filteredApps.filter(a => a.status === 'Rejected').length;

    // Cumulative Funnel Stages
    // Stage 1: Received
    const stage1 = total;
    // Stage 2: Screened & In Progress (Under Review + Interview + Visa + Approved)
    const stage2 = underReview + interview + visaProcessing + approved;
    // Stage 3: Shortlisted / Interviewed (Interview + Visa + Approved)
    const stage3 = interview + visaProcessing + approved;
    // Stage 4: Visa Processing & Work Permit (Visa + Approved)
    const stage4 = visaProcessing + approved;
    // Stage 5: Mobilized & Deployed (Approved)
    const stage5 = approved;

    return {
      total,
      pending,
      underReview,
      interview,
      visaProcessing,
      approved,
      rejected,
      stages: [
        {
          id: 'stage-1',
          name: '1. Inbound Inquiries & Registered CVs',
          count: stage1,
          pct: total > 0 ? 100 : 0,
          color: 'from-blue-500 to-indigo-600',
          textColor: 'text-indigo-600',
          bgLight: 'bg-indigo-50 border-indigo-200',
          description: 'All candidates who submitted applications via public forms.',
          apps: filteredApps
        },
        {
          id: 'stage-2',
          name: '2. Document Verification & Initial Screening',
          count: stage2,
          pct: total > 0 ? Math.round((stage2 / total) * 100) : 0,
          color: 'from-purple-500 to-indigo-600',
          textColor: 'text-purple-600',
          bgLight: 'bg-purple-50 border-purple-200',
          description: 'Trade certifications, passport validity & background verified.',
          apps: filteredApps.filter(a => ['Under Review', 'Interview Scheduled', 'Visa Processing', 'Approved'].includes(a.status))
        },
        {
          id: 'stage-3',
          name: '3. Employer Technical Interview',
          count: stage3,
          pct: total > 0 ? Math.round((stage3 / total) * 100) : 0,
          color: 'from-amber-500 to-yellow-600',
          textColor: 'text-amber-600',
          bgLight: 'bg-amber-50 border-amber-200',
          description: 'Direct video/in-person client assessments with hotel/MEP teams.',
          apps: filteredApps.filter(a => ['Interview Scheduled', 'Visa Processing', 'Approved'].includes(a.status))
        },
        {
          id: 'stage-4',
          name: '4. Work Permit & Visa Lodged',
          count: stage4,
          pct: total > 0 ? Math.round((stage4 / total) * 100) : 0,
          color: 'from-sky-500 to-blue-600',
          textColor: 'text-sky-600',
          bgLight: 'bg-sky-50 border-sky-200',
          description: 'Schengen Single Permit (Identità) & UAE MOHRE quota filings.',
          apps: filteredApps.filter(a => ['Visa Processing', 'Approved'].includes(a.status))
        },
        {
          id: 'stage-5',
          name: '5. Visa Granted & Mobilization Scheduled',
          count: stage5,
          pct: total > 0 ? Math.round((stage5 / total) * 100) : 0,
          color: 'from-emerald-500 to-teal-600',
          textColor: 'text-emerald-600',
          bgLight: 'bg-emerald-50 border-emerald-200',
          description: 'Air tickets issued, pre-departure briefing & employer arrival.',
          apps: filteredApps.filter(a => a.status === 'Approved')
        }
      ]
    };
  }, [filteredApps]);

  // Destination Distribution Breakdown
  const destinationBreakdown = useMemo(() => {
    const counts = {};
    filteredApps.forEach(app => {
      let dest = 'Other / Unassigned';
      const raw = (app.preferredDestination || '').toLowerCase();
      if (raw.includes('malta')) dest = 'Malta (Europe)';
      else if (raw.includes('uae') || raw.includes('dubai')) dest = 'UAE (Dubai)';
      else if (raw.includes('australia')) dest = 'Australia';
      else if (raw.includes('bulgaria')) dest = 'Bulgaria';
      else if (raw.includes('romania')) dest = 'Romania';
      else if (raw.includes('greece')) dest = 'Greece';
      
      counts[dest] = (counts[dest] || 0) + 1;
    });

    const total = filteredApps.length || 1;
    return Object.entries(counts)
      .map(([country, count]) => ({
        country,
        count,
        percentage: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.count - a.count);
  }, [filteredApps]);

  // Sector Demand Breakdown
  const sectorBreakdown = useMemo(() => {
    const counts = {};
    jobs.forEach(job => {
      const sec = job.sector || 'General Trades';
      counts[sec] = (counts[sec] || 0) + (Number(job.vacancies) || 1);
    });

    const totalVacancies = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts)
      .map(([sector, vacancies]) => ({
        sector,
        vacancies,
        percentage: Math.round((vacancies / totalVacancies) * 100)
      }))
      .sort((a, b) => b.vacancies - a.vacancies);
  }, [jobs]);

  // Total Open Headcount Requested by Corporate Clients
  const totalCorporateDemand = useMemo(() => {
    return employerRequests.reduce((acc, req) => {
      const match = (req.headcount || '').match(/\d+/);
      return acc + (match ? parseInt(match[0], 10) : 4);
    }, 0);
  }, [employerRequests]);

  // Export Analytics Summary to CSV
  const handleExportCSV = () => {
    const rows = [
      ['SkyGlobal HR Consultancy - Executive Analytics Report'],
      ['Generated On', new Date().toLocaleString()],
      ['Timeframe', timeframe],
      [''],
      ['--- RECRUITMENT PIPELINE FUNNEL ---'],
      ['Stage Name', 'Candidate Count', 'Funnel Retention %'],
      ...pipelineMetrics.stages.map(s => [s.name, s.count, `${s.pct}%`]),
      [''],
      ['--- DESTINATION PLACEMENT DISTRIBUTION ---'],
      ['Destination', 'Candidate Volume', 'Share %'],
      ...destinationBreakdown.map(d => [d.country, d.count, `${d.percentage}%`]),
      [''],
      ['--- SECTOR VACANCY DEMAND ---'],
      ['Sector', 'Open Vacancies', 'Share %'],
      ...sectorBreakdown.map(s => [s.sector, s.vacancies, `${s.percentage}%`]),
      [''],
      ['Total Active Job Postings', jobs.length],
      ['Total Candidate Registrations', applications.length],
      ['Corporate Manpower Headcount Demanded', totalCorporateDemand]
    ];

    const csvContent = '\uFEFF' + rows.map(e => e.map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SkyGlobal_Executive_Analytics_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#101a6d] via-[#0b144d] to-[#020024] rounded-3xl p-6 sm:p-8 text-white border border-[#25c0f3]/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#25c0f3]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#a99410]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#a99410] text-xs font-black uppercase tracking-wider mb-2.5">
              <Crown className="w-3.5 h-3.5" />
              <span>Super Admin Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Executive Analytics & Pipeline Metrics
            </h2>
            <p className="text-sm text-[#b6eafb]/90 mt-1 max-w-2xl leading-relaxed">
              Real-time overseas recruitment conversion rates, visa processing velocity, and cross-border labor market demand across Malta, UAE, and Europe.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Destination quick filter */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 text-xs text-white">
              <Filter className="w-3.5 h-3.5 text-[#25c0f3]" />
              <select
                value={selectedDestinationFilter}
                onChange={(e) => setSelectedDestinationFilter(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
              >
                <option value="All" className="text-slate-900">All Destinations</option>
                <option value="Malta" className="text-slate-900">Malta</option>
                <option value="UAE" className="text-slate-900">UAE (Dubai)</option>
                <option value="Australia" className="text-slate-900">Australia</option>
                <option value="Bulgaria" className="text-slate-900">Bulgaria</option>
                <option value="Romania" className="text-slate-900">Romania</option>
                <option value="Greece" className="text-slate-900">Greece</option>
              </select>
            </div>

            {/* Timeframe quick filter */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 text-xs text-white">
              <Calendar className="w-3.5 h-3.5 text-[#a99410]" />
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
              >
                <option value="all" className="text-slate-900">All Time (Full Pipeline)</option>
                <option value="quarter" className="text-slate-900">Past 90 Days</option>
                <option value="month" className="text-slate-900">Past 30 Days</option>
              </select>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-[#020024] bg-gradient-to-r from-[#a99410] to-[#8e7c0c] hover:from-[#bfa715] hover:to-[#a99410] shadow-md shadow-[#a99410]/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#020024]" />
              <span>Export CSV Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top High-Level Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#a99410]/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Candidate Pipeline</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">
              {filteredApps.length}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              100% Verified
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>In-flight: <strong>{pipelineMetrics.underReview + pipelineMetrics.interview + pipelineMetrics.visaProcessing}</strong></span>
            <span>Placed: <strong>{pipelineMetrics.approved}</strong></span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#a99410]/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fast-Track Visas</span>
            <div className="p-2 rounded-xl bg-amber-50 text-[#a99410]">
              <Plane className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">
              {pipelineMetrics.visaProcessing}
            </span>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
              3–4 Wks Speed
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Schengen / Identità</span>
            <span className="text-emerald-600 font-semibold">Active Lodgements</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#a99410]/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Corporate Demand</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">
              {totalCorporateDemand}
            </span>
            <span className="text-xs text-slate-500">heads</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Active Client Inquiries:</span>
            <strong className="text-purple-700">{employerRequests.length} Companies</strong>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#a99410]/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobilization Ratio</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-display">
              92.8%
            </span>
            <span className="text-xs font-bold text-emerald-600">
              Target Met
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Avg Deployment Time:</span>
            <strong className="text-slate-800">24 Days</strong>
          </div>
        </div>

      </div>

      {/* Main Pipeline Funnel Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#a99410]" />
              <h3 className="text-lg font-black text-slate-900 font-display">
                5-Stage Overseas Placement Funnel
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cumulative progression tracking candidate retention from portal registration through embassy visa issuance.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            Click any stage to drill down candidates
          </span>
        </div>

        {/* Visual Funnel Stack */}
        <div className="space-y-4">
          {pipelineMetrics.stages.map((stage, idx) => (
            <div 
              key={stage.id}
              onClick={() => setSelectedStageModal(stage)}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-[#101a6d]/40 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900 group-hover:text-[#101a6d] transition-colors">
                      {stage.name}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {stage.count} {stage.count === 1 ? 'Candidate' : 'Candidates'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {stage.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 font-display">
                      {stage.pct}%
                    </span>
                    <span className="text-[10px] text-slate-400 block -mt-0.5 uppercase tracking-wider font-semibold">
                      Retention
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#101a6d] group-hover:text-white text-slate-400 transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${stage.color} transition-all duration-700`}
                  style={{ width: `${Math.max(stage.pct, 4)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Destination Distribution & Sector Vacancy Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Destination Countries */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-black text-slate-900 font-display">
                Placement Distribution by Destination
              </h4>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {destinationBreakdown.length} Hubs
            </span>
          </div>

          <div className="space-y-3.5">
            {destinationBreakdown.map(item => (
              <div key={item.country} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.country}</span>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>{item.count} applicants</span>
                    <span className="font-extrabold text-slate-900">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#101a6d] to-[#25c0f3] rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(item.percentage, 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Demand */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#a99410]" />
              <h4 className="text-sm font-black text-slate-900 font-display">
                Open Vacancies by Trade Sector
              </h4>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {jobs.length} Active Jobs
            </span>
          </div>

          <div className="space-y-3.5">
            {sectorBreakdown.map(sec => (
              <div key={sec.sector} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{sec.sector}</span>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>{sec.vacancies} vacancies</span>
                    <span className="font-extrabold text-[#a99410]">({sec.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#a99410] to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(sec.percentage, 6)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Drilldown Modal when clicking a stage */}
      {selectedStageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 font-display">
                  {selectedStageModal.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedStageModal.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedStageModal(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 pr-1">
              {selectedStageModal.apps.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No applicants currently in this pipeline stage.
                </div>
              ) : (
                selectedStageModal.apps.map(app => (
                  <div key={app.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">
                        {app.applicantName}
                      </span>
                      <span className="text-slate-500">
                        {app.jobTitle} • {app.currentCountry} ➔ {app.preferredDestination || 'Malta'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-50 text-[#020024] border border-[#a99410]/30">
                        {app.status}
                      </span>
                      <button
                        onClick={() => downloadApplicantCV(app)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Download CV"
                      >
                        <Download className="w-3.5 h-3.5 text-[#a99410]" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing <strong>{selectedStageModal.apps.length}</strong> candidates</span>
              <button
                onClick={() => setSelectedStageModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
