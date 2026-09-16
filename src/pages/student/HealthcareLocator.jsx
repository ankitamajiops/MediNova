import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  PhoneCall, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Stethoscope, 
  Pill, 
  ShieldAlert, 
  Search,
  ExternalLink,
  X
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const HealthcareLocator = () => {
  const { healthcareFacilities, addToast } = useApp();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacilityModal, setSelectedFacilityModal] = useState(null);

  const filters = [
    { id: 'all', label: 'All Services' },
    { id: 'health_centre', label: 'Campus Health Centre' },
    { id: 'hospitals', label: 'Nearby Hospitals' },
    { id: 'clinics', label: 'Clinics & Labs' },
    { id: 'pharmacies', label: '24/7 Pharmacies' },
    { id: 'emergency', label: 'Emergency Ambulances' }
  ];

  const filteredFacilities = healthcareFacilities.filter(fac => {
    const matchesFilter = activeFilter === 'all' || fac.category === activeFilter;
    const matchesSearch = fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fac.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fac.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Campus & Nearby Healthcare Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Verified medical facilities, duty doctors, 24x7 pharmacies, and ambulance bays.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Campus Clinic Open 24/7</span>
          </span>
        </div>
      </div>

      {/* Search & Category Filter Pills */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search facility name, doctor, or specialty..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === f.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Badge & Distance */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                  {facility.badge}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{facility.distance}</span>
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                {facility.name}
              </h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{facility.type}</p>

              {/* Status */}
              <div className="mt-3 flex items-center gap-2 text-xs">
                <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-700 font-bold">{facility.status}</span>
              </div>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                📍 {facility.address}
              </p>

              {facility.doctorOnDuty && (
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-700 block">Duty Medical Officer:</span>
                  <span className="text-teal-800 font-medium">{facility.doctorOnDuty}</span>
                </div>
              )}

              {facility.services && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {facility.services.slice(0, 3).map((srv, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {srv}
                    </span>
                  ))}
                  {facility.services.length > 3 && (
                    <span className="text-[10px] font-bold text-teal-600 px-1 py-0.5">
                      +{facility.services.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href={`tel:${facility.emergencyPhone || facility.phone}`}
                onClick={(e) => {
                  e.preventDefault();
                  addToast(`Dialing ${facility.name}: ${facility.emergencyPhone || facility.phone}`, 'info');
                }}
                className="py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-teal-200 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                <span>Call Now</span>
              </a>

              <button
                onClick={() => setSelectedFacilityModal(facility)}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>Directions</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Facility Map & Directions Modal */}
      {selectedFacilityModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-slide-up">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                  {selectedFacilityModal.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedFacilityModal.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedFacilityModal.address}</p>
              </div>
              <button
                onClick={() => setSelectedFacilityModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Schematic Campus Route Preview */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-teal-400 font-bold">Campus Navigation Assistant</span>
                <span className="text-slate-400">{selectedFacilityModal.distance}</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <p>🚶 <strong>Fastest Campus Route:</strong> Exit your hostel → Walk through North Promenade past Central Library → Building #8.</p>
                <p>🚑 <strong>Emergency Vehicle Access:</strong> Gate 1 South Ramp.</p>
              </div>
              <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700 text-[11px] text-teal-300 flex items-center justify-between">
                <span>Direct Hotline: {selectedFacilityModal.phone}</span>
                <span className="font-bold">Active 24x7</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  addToast(`Opening navigation route to ${selectedFacilityModal.name}`, 'success');
                  setSelectedFacilityModal(null);
                }}
                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Start Turn-by-Turn GPS</span>
              </button>

              <button
                onClick={() => setSelectedFacilityModal(null)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default HealthcareLocator;
