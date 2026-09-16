import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Map, 
  BarChart3, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  Search,
  Filter,
  RefreshCw,
  Building,
  Clock,
  EyeOff
} from 'lucide-react';
import RiskBadge from '../../components/common/RiskBadge';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const OfficialDashboard = () => {
  const { 
    reports, 
    clusterAnalysis, 
    setActiveTab, 
    campusIssues, 
    thresholds,
    campusLocations,
    addToast
  } = useApp();

  const [selectedTimeFilter, setSelectedTimeFilter] = useState('48h');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('all');

  const alerts = clusterAnalysis.alerts || [];
  const locationRiskMatrix = clusterAnalysis.locationRiskMatrix || {};
  const totalReportsCount = reports.length;
  const highRiskAlert = alerts.find(a => a.riskLevel === 'HIGH');
  const openIssuesCount = campusIssues.filter(i => i.status !== 'Resolved').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Top Title & Surveillance Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-mediblue-50 text-mediblue-700 px-2.5 py-0.5 rounded-md border border-mediblue-200">
              CAMPUS HEALTH SENTINEL
            </span>
            <span className="text-[10px] text-slate-400">Live 48h Window</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Community Health Monitoring & Early Warning
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time syndromic cluster detection, zero-PII aggregated telemetry, and outbreak containment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('risk-map')}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Map className="w-4 h-4" />
            <span>Campus Risk Map</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Charts & Analytics</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Reports Today */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reports Today</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-display">
                {totalReportsCount > 40 ? totalReportsCount : 47}
              </span>
              <span className="text-xs font-bold text-rose-600">+14% vs yesterday</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Aggregated anonymous student submissions</p>
          </div>
          <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 flex items-center gap-1">
            <PrivacyShieldBadge size="xs" text="Zero PII Attached" />
          </div>
        </div>

        {/* KPI 2: Active Alerts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Cluster Alerts</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-display">{alerts.length}</span>
              <span className="text-xs font-bold text-rose-600">Requires Action</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">1 High Risk • {alerts.length - 1} Moderate</p>
          </div>
          <button
            onClick={() => setActiveTab('alerts')}
            className="text-[11px] text-rose-600 hover:text-rose-700 font-bold border-t border-slate-100 pt-2 flex items-center justify-between"
          >
            <span>Review explainable alerts</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* KPI 3: High Risk Zones */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">High Risk Zones</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Building className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900 font-display">
                {clusterAnalysis.highRiskZonesCount || 1}
              </span>
              <RiskBadge level="HIGH" size="sm" />
            </div>
            <p className="text-[11px] text-slate-700 font-semibold mt-1">Hostel A (Aryabhatta Hall)</p>
          </div>
          <button
            onClick={() => setActiveTab('risk-map')}
            className="text-[11px] text-teal-600 hover:text-teal-700 font-bold border-t border-slate-100 pt-2 flex items-center justify-between"
          >
            <span>Open interactive map</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* KPI 4: Reports This Week */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reports This Week</span>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-display">186</span>
              <span className="text-xs font-bold text-emerald-600">Within Threshold</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Rolling 7-day campus baseline</p>
          </div>
          <button
            onClick={() => setActiveTab('analytics')}
            className="text-[11px] text-purple-600 hover:text-purple-700 font-bold border-t border-slate-100 pt-2 flex items-center justify-between"
          >
            <span>View weekly trendline</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* HIGH RISK ALERT HERO BANNER (Explainable Gastro Cluster in Hostel A) */}
      {highRiskAlert && (
        <div className="bg-gradient-to-br from-rose-900 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-700 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
                CRITICAL EARLY-WARNING ALERT
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-rose-950 border border-rose-800 text-rose-300 px-2.5 py-1 rounded-lg">
                Confidence: {highRiskAlert.confidence}%
              </span>
              <RiskBadge level="HIGH" size="sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {highRiskAlert.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                📍 <strong>Location:</strong> {highRiskAlert.locationName} • <strong>Time Period:</strong> {highRiskAlert.timeWindow} • <strong>Correlated Reports:</strong> {highRiskAlert.reportCount} submissions.
              </p>
              
              {/* Explainable Rationale Box */}
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-rose-800/60 text-xs space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider text-[11px] block">
                  Algorithmic Explainability Rationale:
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  "{highRiskAlert.reason}"
                </p>
              </div>

              {/* Matched symptoms chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-slate-400">Matched Symptoms:</span>
                {highRiskAlert.matchedSymptoms.map(sym => (
                  <span key={sym} className="px-2.5 py-0.5 rounded-md bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold">
                    {sym.replace(/_/g, ' ').toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-2.5 bg-black/30 p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
                Recommended Actions:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {highRiskAlert.suggestedActions.slice(0, 3).map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span className="leading-snug">{act}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab('alerts')}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Initiate Protocol Containment →</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 border-t border-rose-900/60 pt-2 flex items-center justify-between">
            <span>🔒 Location data is aggregated to protect individual student privacy.</span>
            <span>{highRiskAlert.disclaimer}</span>
          </div>
        </div>
      )}

      {/* Campus Zone Risk Status Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
              Campus Health Risk Matrix (Rolling 48 Hours)
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated spatial surveillance across residence halls, food courts, and academic blocks.
            </p>
          </div>
          <PrivacyShieldBadge size="xs" text="Aggregated k-Anonymity Guard" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3">Campus Location / Zone</th>
                <th className="py-3 px-3">Active Reports (48h)</th>
                <th className="py-3 px-3">Primary Symptoms</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campusLocations.map((loc) => {
                const matrix = locationRiskMatrix[loc.id] || {
                  riskLevel: 'LOW',
                  reportCount: 0,
                  confidence: 40,
                  dominantSymptoms: []
                };

                return (
                  <tr key={loc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      <div>
                        <span>{loc.name}</span>
                        <span className="text-[10px] text-slate-400 block font-normal">{loc.type} • Capacity: {loc.capacity}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700">
                      {matrix.reportCount} reports
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {matrix.dominantSymptoms.length > 0 ? (
                          matrix.dominantSymptoms.map(s => (
                            <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">
                              {s.replace(/_/g, ' ')}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 text-[11px]">Normal baseline</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <RiskBadge level={matrix.riskLevel} size="sm" />
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                      {matrix.confidence}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setActiveTab('risk-map')}
                        className="text-xs font-bold text-teal-600 hover:text-teal-700"
                      >
                        Inspect Map →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default OfficialDashboard;
