import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Filter, 
  Search, 
  Download, 
  Calendar, 
  Building, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const SymptomTrends = () => {
  const { reports, campusLocations, addToast } = useApp();

  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSymptom, setSelectedSymptom] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter(r => {
    const matchLoc = selectedLocation === 'all' || r.locationId === selectedLocation;
    const matchSym = selectedSymptom === 'all' || (r.symptoms || []).includes(selectedSymptom);
    const matchQuery = r.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       r.anonymousToken.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLoc && matchSym && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Symptom Reporting Trends & Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Aggregated stream of anonymized student submissions across rolling surveillance windows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast('Symptom trend dataset exported as CSV.', 'success')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <PrivacyShieldBadge text="Anonymized Telemetry Only" />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-soft grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Filter by Campus Location:
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Locations (Campus Wide)</option>
            {campusLocations.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Filter by Symptom Category:
          </label>
          <select
            value={selectedSymptom}
            onChange={(e) => setSelectedSymptom(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Symptoms</option>
            <option value="fever">Fever</option>
            <option value="vomiting">Vomiting</option>
            <option value="stomach_pain">Stomach Pain</option>
            <option value="diarrhea">Diarrhea</option>
            <option value="cough">Cough</option>
            <option value="headache">Headache</option>
            <option value="skin_allergy">Skin Allergy</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Search Token / Building:
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search token or hostel name..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-teal-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900">
            Anonymized Reports Feed ({filteredReports.length} matches)
          </h3>
          <span className="text-xs text-slate-500">Showing rolling 48h active window</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3">Anonymous Token</th>
                <th className="py-3 px-3">Location Block</th>
                <th className="py-3 px-3">Reported Symptoms</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Onset Window</th>
                <th className="py-3 px-3">Logged Timestamp</th>
                <th className="py-3 px-3">Aggregation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.slice(0, 25).map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-teal-700">
                    <span className="bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {rep.anonymousToken}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800">
                    {rep.locationName}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {rep.symptoms.map(s => (
                        <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">
                          {s.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-bold ${
                      rep.severity === 'Severe' ? 'text-rose-600' :
                      rep.severity === 'Moderate' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {rep.severity}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {rep.onset}
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {new Date(rep.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Analyzed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default SymptomTrends;
