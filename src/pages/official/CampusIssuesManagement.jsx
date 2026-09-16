import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Send, 
  Filter, 
  Building,
  Check
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const CampusIssuesManagement = () => {
  const { campusIssues, updateCampusIssueStatus, addToast } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');

  const filteredIssues = campusIssues.filter(i => {
    if (statusFilter === 'open') return i.status === 'Open';
    if (statusFilter === 'in_progress') return i.status === 'In Progress' || i.status === 'Under Investigation';
    if (statusFilter === 'resolved') return i.status === 'Resolved';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Campus Hygiene & Facility Issues Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Review student-reported mess hygiene concerns, water contamination reports, and sanitation tickets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PrivacyShieldBadge text="Facility & Sanitation Desk" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            statusFilter === 'all' 
              ? 'bg-slate-900 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Issues ({campusIssues.length})
        </button>
        <button
          onClick={() => setStatusFilter('open')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            statusFilter === 'open' 
              ? 'bg-amber-500 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Open ({campusIssues.filter(i => i.status === 'Open').length})</span>
        </button>
        <button
          onClick={() => setStatusFilter('in_progress')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            statusFilter === 'in_progress' 
              ? 'bg-blue-600 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>In Progress ({campusIssues.filter(i => i.status === 'In Progress' || i.status === 'Under Investigation').length})</span>
        </button>
        <button
          onClick={() => setStatusFilter('resolved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            statusFilter === 'resolved' 
              ? 'bg-emerald-600 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Resolved ({campusIssues.filter(i => i.status === 'Resolved').length})</span>
        </button>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  {issue.category}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                  issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                  issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  issue.status === 'Under Investigation' ? 'bg-purple-100 text-purple-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {issue.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                📍 {issue.location}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{issue.description}"
              </p>

              <div className="mt-3 text-xs text-slate-500 space-y-1">
                <p>Assigned Desk: <strong className="text-slate-800">{issue.assignedTeam}</strong></p>
                <p className="text-[11px] text-slate-400">
                  Reported: {new Date(issue.reportedAt).toLocaleDateString()} • {issue.isAnonymous ? '🔒 Anonymous Student' : 'Student Report'}
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                {issue.status !== 'In Progress' && issue.status !== 'Resolved' && (
                  <button
                    onClick={() => updateCampusIssueStatus(issue.id, 'In Progress', 'Hostel Water & Sanitation Inspection Crew')}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Assign Sanitation Crew
                  </button>
                )}

                {issue.status !== 'Resolved' && (
                  <button
                    onClick={() => updateCampusIssueStatus(issue.id, 'Resolved', issue.assignedTeam)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                )}
              </div>

              <span className="text-xs font-mono font-bold text-slate-400">{issue.id}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CampusIssuesManagement;
