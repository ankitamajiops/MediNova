import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  Send, 
  Download, 
  Share2, 
  CheckSquare, 
  Square,
  Sparkles,
  Info,
  Check,
  X
} from 'lucide-react';
import RiskBadge from '../../components/common/RiskBadge';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const AlertsView = () => {
  const { 
    clusterAnalysis, 
    updateAlertStatus, 
    broadcastNotification, 
    addToast 
  } = useApp();

  const alerts = clusterAnalysis.alerts || [];

  const [activeTabFilter, setActiveTabFilter] = useState('all');
  const [selectedAlertModal, setSelectedAlertModal] = useState(null);
  const [checkedActionMap, setCheckedActionMap] = useState({});

  const toggleActionCheck = (alertId, actionIndex) => {
    const key = `${alertId}-${actionIndex}`;
    setCheckedActionMap(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    addToast('Containment action checklist updated.', 'info');
  };

  const handleIssueAdvisory = (alert) => {
    broadcastNotification(
      `Campus Health Advisory: ${alert.locationName}`,
      `Preventative health protocol active for ${alert.locationName}. Students advised to follow food & water precautions.`,
      'high_risk',
      'all'
    );
  };

  const filteredAlerts = alerts.filter(a => {
    if (activeTabFilter === 'high') return a.riskLevel === 'HIGH';
    if (activeTabFilter === 'moderate') return a.riskLevel === 'MODERATE';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Explainable Early-Warning Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Syndromic cluster detections with transparent reasoning and recommended response checklists.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PrivacyShieldBadge text="Aggregated Syndromic Telemetry" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTabFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTabFilter === 'all' 
              ? 'bg-slate-900 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Alerts ({alerts.length})
        </button>
        <button
          onClick={() => setActiveTabFilter('high')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTabFilter === 'high' 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>🔴 High Risk</span>
          <span className="bg-white/20 text-white px-1.5 py-0.2 rounded text-[10px]">
            {alerts.filter(a => a.riskLevel === 'HIGH').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTabFilter('moderate')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTabFilter === 'moderate' 
              ? 'bg-amber-500 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>🟡 Moderate Risk</span>
          <span className="bg-white/20 text-white px-1.5 py-0.2 rounded text-[10px]">
            {alerts.filter(a => a.riskLevel === 'MODERATE').length}
          </span>
        </button>
      </div>

      {/* Alerts Cards List */}
      <div className="space-y-6">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Active Alerts in this Category</h3>
            <p className="text-xs text-slate-500">All campus residential zones currently operating within normal parameters.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-soft hover:shadow-soft-lg transition-all space-y-5 ${
                alert.riskLevel === 'HIGH' ? 'border-rose-300 ring-1 ring-rose-200' : 'border-amber-200'
              }`}
            >
              {/* Top Banner Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className={`p-2.5 rounded-2xl ${
                    alert.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {alert.riskLevel === 'HIGH' ? <ShieldAlert className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 font-display">
                        {alert.title}
                      </h3>
                      <RiskBadge level={alert.riskLevel} size="sm" />
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>📍 {alert.locationName}</span>
                      <span>•</span>
                      <span>⏱️ {alert.timeWindow}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-400">{alert.id}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Algorithmic Confidence:</div>
                  <div className="text-2xl font-black text-slate-900 font-display">
                    {alert.confidence}%
                  </div>
                </div>
              </div>

              {/* Explainable Rationale Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Why Was This Alert Triggered? (Explainability Rationale)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  "{alert.reason}"
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-slate-500 font-medium">Correlated Symptoms ({alert.reportCount} reports):</span>
                  {alert.matchedSymptoms.map(sym => (
                    <span key={sym} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-semibold text-xs shadow-2xs">
                      {sym.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {alert.severeCount > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-bold text-xs">
                      {alert.severeCount} Severe Cases
                    </span>
                  )}
                </div>
              </div>

              {/* Recommended Action Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Official Institutional Containment Checklist:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {alert.suggestedActions.map((action, idx) => {
                    const isDone = checkedActionMap[`${alert.id}-${idx}`];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleActionCheck(alert.id, idx)}
                        className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-start gap-2.5 ${
                          isDone 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 line-through opacity-80' 
                            : 'bg-white border-slate-200 text-slate-800 hover:border-teal-400'
                        }`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {isDone ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <span className="leading-snug">{action}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      updateAlertStatus(alert.id, 'Under Investigation');
                      addToast(`Alert ${alert.id} status marked: Under Active Investigation`, 'info');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    Mark Under Investigation
                  </button>

                  <button
                    onClick={() => handleIssueAdvisory(alert)}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Issue Public Health Advisory</span>
                  </button>

                  <button
                    onClick={() => {
                      addToast('Incident notification SMS/Email dispatched to Hostel Wardens and Sanitation Staff.', 'success');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all"
                  >
                    Notify Wardens & Sanitation
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToast(`Exported incident summary PDF: ${alert.id}.pdf`, 'success');
                  }}
                  className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Export Report PDF</span>
                </button>
              </div>

              {/* Safety statement */}
              <div className="text-[11px] text-slate-400 italic">
                ℹ️ {alert.disclaimer}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default AlertsView;
