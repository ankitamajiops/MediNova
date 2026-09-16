import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  ShieldCheck, 
  Trash2, 
  FilePlus2, 
  CheckCircle2, 
  Lock, 
  AlertCircle,
  Hash
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const MyReports = () => {
  const { mySubmissions, setActiveTab, addToast } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            My Health Reports & Timeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Personal local records of your submitted symptoms. Only you can view this history.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('report-symptoms')}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
        >
          <FilePlus2 className="w-4 h-4" />
          <span>New Symptom Report</span>
        </button>
      </div>

      {/* Privacy Notice Card */}
      <div className="bg-brand-50/80 rounded-2xl p-4 border border-brand-200/80 flex items-start gap-3 text-xs">
        <Lock className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
        <p className="text-brand-900 leading-relaxed">
          <strong>Confidentiality Promise:</strong> These submission tokens are stored securely in your browser's private enclave. Public health officials and campus wardens only see bulk aggregated counts without names or roll numbers.
        </p>
      </div>

      {/* Reports Timeline */}
      <div className="space-y-4">
        {mySubmissions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400 space-y-3">
            <Clock className="w-12 h-12 mx-auto opacity-30 text-teal-600" />
            <h3 className="font-bold text-base text-slate-700">No Prior Symptom Submissions</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You have not logged any health reports yet. Submitting symptoms helps protect campus health.
            </p>
            <button
              onClick={() => setActiveTab('report-symptoms')}
              className="mt-2 px-5 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold"
            >
              Log First Symptom Report
            </button>
          </div>
        ) : (
          mySubmissions.map((sub, index) => (
            <div
              key={sub.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center border border-teal-200">
                    #{mySubmissions.length - index}
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {sub.anonymousToken || 'ANON-TOKEN'}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2">
                      {new Date(sub.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{sub.status || 'Submitted & Aggregated'}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Logged Symptoms:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {sub.symptoms.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px]">
                        {s.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Reported Severity:</span>
                  <span className={`inline-block mt-1 font-bold ${
                    sub.severity === 'Severe' ? 'text-rose-600' :
                    sub.severity === 'Moderate' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {sub.severity || 'Moderate'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Recorded Area:</span>
                  <span className="text-slate-800 font-semibold block mt-1">
                    {sub.locationName || 'Hostel A'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                <span>Aggregated into Sentinel Rolling Surveillance Model</span>
                <span className="text-slate-500">Encrypted on device</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default MyReports;
