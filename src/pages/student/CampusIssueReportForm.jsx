import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertOctagon, 
  ShieldCheck, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Plus, 
  Check, 
  AlertTriangle,
  Building,
  EyeOff
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const CampusIssueReportForm = () => {
  const { campusIssues, addCampusIssue, addToast } = useApp();

  const [category, setCategory] = useState('Poor Hostel Food Quality');
  const [location, setLocation] = useState('Hostel A - Mess Dining Hall');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Poor Hostel Food Quality',
    'Unsafe / Cloudy Drinking Water',
    'Dirty Washrooms / Sanitation Issue',
    'Mosquito Breeding / Stagnant Water',
    'Garbage Accumulation',
    'Mess Hygiene Concern',
    'Air Conditioning / Ventilation Issue',
    'Other Campus Hygiene Problem'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast('Please describe the hygiene issue in detail.', 'warning');
      return;
    }

    addCampusIssue({
      category,
      location,
      description,
      priority,
      isAnonymous
    });

    setDescription('');
    setShowSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Report Campus Hygiene / Food Issue
          </h1>
          <PrivacyShieldBadge text="Direct Facility Action" />
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Report unhygienic mess conditions, contaminated drinking water dispensers, dirty washrooms, or mosquito breeding sites.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Issue Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Exact Location / Block *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Hostel A - 2nd Floor Water Cooler, Wing C"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Description & Details *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the condition, smell, appearance, or number of affected students..."
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500 leading-relaxed"
            />
          </div>

          {/* Priority & Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Urgency Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Low', 'Moderate', 'High'].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      priority === p 
                        ? p === 'High' ? 'bg-rose-50 border-rose-500 text-rose-700 ring-1 ring-rose-500'
                          : p === 'Moderate' ? 'bg-amber-50 border-amber-500 text-amber-700 ring-1 ring-amber-500'
                          : 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Optional Site Photo
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setHasPhoto(!hasPhoto);
                    addToast(hasPhoto ? 'Photo removed' : 'Mock photo attached (cooler_leak.jpg)', 'info');
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    hasPhoto 
                      ? 'bg-amber-50 border-amber-500 text-amber-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <UploadCloud className="w-4 h-4 text-amber-600" />
                  <span>{hasPhoto ? 'Photo Attached (1)' : 'Attach Photo'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Anonymous toggle */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-slate-500" />
              <div>
                <span className="font-bold text-slate-800 block">Submit Anonymously</span>
                <span className="text-[11px] text-slate-500">Your roll number will not be attached to this facility ticket</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Submit Campus Issue Ticket</span>
          </button>
        </form>
      </div>

      {/* Reported Issues Tracker */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-display font-extrabold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-600" />
          <span>Active Campus Hygiene Issues ({campusIssues.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campusIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  {issue.category}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                  issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {issue.status}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">{issue.location}</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{issue.description}</p>
              </div>

              <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Assigned: <strong className="text-slate-600">{issue.assignedTeam}</strong></span>
                <span>{issue.isAnonymous ? '🔒 Anonymous' : 'Student Report'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CampusIssueReportForm;
