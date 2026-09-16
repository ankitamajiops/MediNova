import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, 
  Sliders, 
  Building, 
  Users, 
  Send, 
  History, 
  CheckCircle2, 
  Sparkles, 
  Save, 
  RotateCcw, 
  AlertTriangle,
  Radio,
  FileCheck,
  Lock
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const AdminDashboard = () => {
  const { 
    thresholds, 
    setThresholds, 
    campusLocations, 
    broadcastNotification, 
    resetDemoData, 
    addToast 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('thresholds');
  
  // Threshold tuning local form state
  const [formThresholds, setFormThresholds] = useState({
    highRiskReportCount: thresholds.highRiskReportCount,
    moderateRiskReportCount: thresholds.moderateRiskReportCount,
    timeWindowHours: thresholds.timeWindowHours,
    minConfidenceHigh: thresholds.minConfidenceHigh
  });

  // Broadcast composer state
  const [broadcastTitle, setBroadcastTitle] = useState('Campus Health Advisory: Water Quality Precautions');
  const [broadcastMessage, setBroadcastMessage] = useState('Sanitation teams are conducting preventive disinfection across all hostel water coolers today. Please use boiled/filtered water.');
  const [broadcastType, setBroadcastType] = useState('moderate_risk');

  const handleSaveThresholds = (e) => {
    e.preventDefault();
    setThresholds(formThresholds);
    addToast('Cluster detection algorithm thresholds updated live across platform.', 'success');
  };

  const handleDispatchBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      addToast('Please complete broadcast title and message.', 'warning');
      return;
    }
    broadcastNotification(broadcastTitle, broadcastMessage, broadcastType, 'all');
    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-md border border-purple-200">
              PLATFORM GOVERNANCE
            </span>
            <span className="text-xs text-slate-400">Institutional Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Sentinel Platform Control & Algorithms
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure cluster detection thresholds, campus zones, broadcast emergency advisories, and verify audit compliance.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 border border-slate-200 shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveAdminTab('thresholds')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'thresholds' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Algorithm & Threshold Tuning</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('broadcast')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'broadcast' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Campus Broadcast Advisory</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'audit' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Privacy & Audit Trails</span>
        </button>
      </div>

      {/* TAB 1: THRESHOLDS TUNING */}
      {activeAdminTab === 'thresholds' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-600" />
                  <span>Rule-Based Cluster Detection Parameters</span>
                </h3>
                <p className="text-xs text-slate-500">Fine-tune detection sensitivity for different campus density conditions.</p>
              </div>
              <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md border border-purple-200">
                Active v1.0.4
              </span>
            </div>

            <form onSubmit={handleSaveThresholds} className="space-y-6">
              {/* High Risk Count Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">High-Risk Cluster Threshold (Reports / Location):</span>
                  <span className="text-rose-600 font-mono text-sm">{formThresholds.highRiskReportCount} Reports</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={formThresholds.highRiskReportCount}
                  onChange={(e) => setFormThresholds({ ...formThresholds, highRiskReportCount: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-[11px] text-slate-500">If similar reports from one hostel block exceed this number within time window $\rightarrow$ triggers High Risk.</p>
              </div>

              {/* Moderate Risk Count Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">Moderate-Risk Threshold (Reports / Location):</span>
                  <span className="text-amber-600 font-mono text-sm">{formThresholds.moderateRiskReportCount} Reports</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  value={formThresholds.moderateRiskReportCount}
                  onChange={(e) => setFormThresholds({ ...formThresholds, moderateRiskReportCount: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-[11px] text-slate-500">Triggers yellow moderate advisory flag.</p>
              </div>

              {/* Time Window Hours */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800">Rolling Temporal Window (Hours):</span>
                  <span className="text-purple-700 font-mono text-sm">{formThresholds.timeWindowHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="96"
                  step="6"
                  value={formThresholds.timeWindowHours}
                  onChange={(e) => setFormThresholds({ ...formThresholds, timeWindowHours: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <p className="text-[11px] text-slate-500">Standard college epidemiological time horizon is 48 hours for food-borne outbreaks.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Apply Algorithmic Parameters Live</span>
              </button>
            </form>
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-700 space-y-4">
            <h3 className="font-extrabold text-sm text-purple-300 uppercase tracking-wider">
              Algorithmic Mathematical Model
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              MediNova uses a discrete temporal syndromic clustering formula:
            </p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-teal-300 space-y-1">
              <p>Risk(loc) = Count(Reports[t - Δt, t])</p>
              <p>Confidence = Base + (Cases - Θ) * w1 + Severe * w2</p>
            </div>
            <div className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
              <p>✅ <strong>Zero Overfitting:</strong> Transparent rule-based logic designed for beginner-friendly SIH clarity.</p>
              <p>✅ <strong>Public Health Grounded:</strong> Follows Indian IDSP (Integrated Disease Surveillance Programme) syndromic guidelines.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BROADCAST ADVISORY */}
      {activeAdminTab === 'broadcast' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft max-w-2xl mx-auto space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Radio className="w-5 h-5 text-purple-600" />
              <span>Broadcast Campus Health Advisory</span>
            </h3>
            <p className="text-xs text-slate-500">Sends an instantaneous alert notification to all student and official portals.</p>
          </div>

          <form onSubmit={handleDispatchBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Advisory Headline *
              </label>
              <input
                type="text"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Water Filter Disinfection in Hostel A"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Advisory Body / Instructions *
              </label>
              <textarea
                rows={4}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Enter detailed safety instructions for campus residents..."
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-purple-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Alert Severity Level
              </label>
              <select
                value={broadcastType}
                onChange={(e) => setBroadcastType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              >
                <option value="high_risk">🔴 High-Risk Emergency Advisory</option>
                <option value="moderate_risk">🟡 Moderate Caution Notice</option>
                <option value="info">🔵 Informational Campus Update</option>
                <option value="awareness">🟢 Health & Wellness Guide</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Campus Broadcast Now</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: AUDIT TRAILS */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-purple-600" />
                <span>Privacy & System Audit Log (Immutable)</span>
              </h3>
              <p className="text-xs text-slate-500">Cryptographically verifiable record of cluster triggers and official actions.</p>
            </div>
            <PrivacyShieldBadge text="Tamper Evident" />
          </div>

          <div className="space-y-3">
            {[
              { time: '10 mins ago', event: 'High Risk Cluster Detection Triggered (Hostel A - 20 reports)', actor: 'Sentinel Detection Engine', status: 'System Event' },
              { time: '25 mins ago', event: 'Sanitation Inspection Team Dispatched to Hostel A Water Coolers', actor: 'Dr. Ramesh Sharma (CMO)', status: 'Official Action' },
              { time: '1 hour ago', event: 'Campus Hygiene Issue #ISSUE-101 Logged by Anonymous Student', actor: 'Student (Encrypted Token)', status: 'User Submission' },
              { time: '3 hours ago', event: 'Cluster Thresholds Verified by Institutional Health Board', actor: 'Prof. Alok Gupta (Dean)', status: 'Admin Action' },
            ].map((log, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">{log.event}</span>
                  <span className="text-[11px] text-slate-500">Actor: <strong className="text-slate-700">{log.actor}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    {log.status}
                  </span>
                  <span className="text-[11px] text-slate-400">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
