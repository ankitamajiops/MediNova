import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Activity, 
  Calendar, 
  Filter, 
  Download,
  Info
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const AnalyticsView = () => {
  const { reports, clusterAnalysis, addToast } = useApp();

  const [timeRange, setTimeRange] = useState('7d');

  // 1. Daily Symptom Reports Timeline (past 7 days)
  const dailyTimelineData = [
    { day: 'Mon (Aug 10)', reports: 18, gastro: 4, respiratory: 8, threshold: 25 },
    { day: 'Tue (Aug 11)', reports: 22, gastro: 6, respiratory: 10, threshold: 25 },
    { day: 'Wed (Aug 12)', reports: 20, gastro: 5, respiratory: 9, threshold: 25 },
    { day: 'Thu (Aug 13)', reports: 27, gastro: 9, respiratory: 11, threshold: 25 },
    { day: 'Fri (Aug 14)', reports: 34, gastro: 15, respiratory: 12, threshold: 25 },
    { day: 'Sat (Aug 15)', reports: 42, gastro: 21, respiratory: 13, threshold: 25 },
    { day: 'Sun (Today)', reports: 47, gastro: 24, respiratory: 14, threshold: 25 },
  ];

  // 2. Symptom Distribution Data
  const symptomDistributionData = [
    { name: 'Fever', count: 42, color: '#f43f5e' },
    { name: 'Headache', count: 37, color: '#8b5cf6' },
    { name: 'Stomach Pain', count: 31, color: '#f59e0b' },
    { name: 'Cough', count: 26, color: '#0ea5e9' },
    { name: 'Vomiting', count: 18, color: '#ec4899' },
    { name: 'Fatigue', count: 16, color: '#f97316' },
    { name: 'Sore Throat', count: 14, color: '#06b6d4' },
    { name: 'Skin Allergy', count: 12, color: '#10b981' },
    { name: 'Diarrhea', count: 9, color: '#d97706' },
  ];

  // 3. Hostel-Wise Reports Comparison Data
  const hostelComparisonData = [
    { name: 'Hostel A (Aryabhatta)', reports: 20, risk: 'High', fill: '#ef4444' },
    { name: 'Hostel B (Gargi)', reports: 8, risk: 'Moderate', fill: '#f59e0b' },
    { name: 'Central Cafeteria', reports: 5, risk: 'Moderate', fill: '#f59e0b' },
    { name: 'Academic Complex', reports: 4, risk: 'Low', fill: '#10b981' },
    { name: 'Hostel C (Kalam)', reports: 2, risk: 'Low', fill: '#10b981' },
    { name: 'Hostel D (PG Block)', reports: 1, risk: 'Low', fill: '#10b981' },
    { name: 'Day Scholars', reports: 3, risk: 'Low', fill: '#10b981' },
  ];

  // 4. Weekly Trend with 7-Day Moving Average
  const weeklyMovingAverageData = [
    { week: 'Week 1', actual: 95, movingAverage: 90, baseline: 100 },
    { week: 'Week 2', actual: 110, movingAverage: 102, baseline: 100 },
    { week: 'Week 3', actual: 105, movingAverage: 104, baseline: 100 },
    { week: 'Week 4 (Current)', actual: 186, movingAverage: 145, baseline: 100 },
  ];

  const PIE_COLORS = ['#f43f5e', '#8b5cf6', '#f59e0b', '#0ea5e9', '#ec4899', '#f97316', '#06b6d4', '#10b981'];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Syndromic Analytics & Surveillance Charts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Interactive Recharts visualizations of community symptom timelines, spatial clusters, and epidemic moving averages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast('Analytics report dataset exported as CSV.', 'success')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Dataset</span>
          </button>
          <PrivacyShieldBadge text="Anonymized Aggregated Data" />
        </div>
      </div>

      {/* Grid 1: Daily Symptom Reports Timeline (Area Chart) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              <span>1. Daily Symptom Reports vs Campus Outbreak Threshold</span>
            </h3>
            <p className="text-xs text-slate-500">
              Surveillance timeline illustrating the gastrointestinal spike over the last 48 hours.
            </p>
          </div>
          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            Alert: Gastro spike detected Sat-Sun
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTimelineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorGastro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <ReferenceLine y={25} label={{ value: 'Normal Campus Baseline (25)', fill: '#f59e0b', fontSize: 11 }} stroke="#f59e0b" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="reports" name="Total Daily Reports" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReports)" />
              <Area type="monotone" dataKey="gastro" name="Gastrointestinal Reports (Fever/Vomit/Stomach)" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGastro)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid 2: Symptom Distribution & Hostel-wise Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 2: Symptom Breakdown Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-mediblue-600" />
                <span>2. Symptom Frequency Distribution</span>
              </h3>
              <p className="text-xs text-slate-500">Aggregated breakdown across all active campus cases.</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600">Total: 205 Logs</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={symptomDistributionData} layout="vertical" margin={{ top: 5, right: 30, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Case Count" radius={[0, 8, 8, 0]}>
                  {symptomDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Hostel-wise Comparison */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-purple-600" />
                <span>3. Hostel & Area Spatial Concentration</span>
              </h3>
              <p className="text-xs text-slate-500">Reveals Hostel A as the primary epidemiological focal point.</p>
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Hostel A: 20 Cases
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostelComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="reports" name="Active Reports (48h)" radius={[8, 8, 0, 0]}>
                  {hostelComparisonData.map((entry, index) => (
                    <Cell key={`cell-hostel-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Grid 3: Weekly Health Trend & Moving Average */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>4. Weekly Health Trend & 7-Day Moving Average</span>
            </h3>
            <p className="text-xs text-slate-500">Long-term epidemiological tracking comparing monthly campus baseline with current outbreak.</p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
            Week 4: 186 Submissions
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyMovingAverageData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <ReferenceLine y={100} label={{ value: 'Expected Campus Average (100)', fill: '#64748b', fontSize: 11 }} stroke="#94a3b8" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="actual" name="Actual Total Weekly Reports" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="movingAverage" name="Moving Average" stroke="#0284c7" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsView;
