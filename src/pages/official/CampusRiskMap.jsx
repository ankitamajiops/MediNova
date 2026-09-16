import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CAMPUS_BUILDINGS } from '../../data/campusLocations';
import { 
  Map, 
  Building2, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  Info, 
  Users, 
  Clock, 
  Activity,
  Send,
  PhoneCall,
  X
} from 'lucide-react';
import RiskBadge from '../../components/common/RiskBadge';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const CampusRiskMap = () => {
  const { clusterAnalysis, campusLocations, broadcastNotification, addToast } = useApp();

  const [selectedBuilding, setSelectedBuilding] = useState(CAMPUS_BUILDINGS[0]); // Default to Hostel A
  const [mapMode, setMapMode] = useState('schematic'); // 'schematic' or 'grid'

  const locationRiskMatrix = clusterAnalysis.locationRiskMatrix || {};

  const getBuildingRisk = (buildingId) => {
    return locationRiskMatrix[buildingId] || {
      riskLevel: 'LOW',
      reportCount: 0,
      confidence: 40,
      dominantSymptoms: []
    };
  };

  const handleIssueAreaAdvisory = (building) => {
    broadcastNotification(
      `Area Health Notice: ${building.name}`,
      `Health officials have active containment measures in ${building.name}. Please follow personal hygiene guidelines.`,
      'moderate_risk',
      'all'
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md border border-teal-200">
              SPATIAL HEALTH SENTINEL
            </span>
            <span className="text-xs text-slate-400">Live Campus Quad Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Campus Health Risk & Hotspot Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Aggregated epidemiological risk zoning across hostel blocks, cafeterias, and academic facilities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PrivacyShieldBadge text="Aggregated Spatial Telemetry (Zero-PII)" />
        </div>
      </div>

      {/* Map Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Center: Interactive Visual Campus Schematic Map (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-slate-700 space-y-4">
          
          {/* Map Top Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-teal-400" />
              <span className="text-xs sm:text-sm font-bold text-white">
                MediNova Interactive Campus Schematic
              </span>
            </div>

            {/* Legend pills */}
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>🔴 High Risk (Hostel A)</span>
              </span>
              <span className="flex items-center gap-1 text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>🟡 Moderate (Hostel B / Mess)</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>🟢 Low Risk / Baseline</span>
              </span>
            </div>
          </div>

          {/* SVG & Card Interactive Campus Grounds */}
          <div className="relative bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 min-h-[420px] flex flex-col justify-between overflow-hidden">
            
            {/* Background Grid Pattern & Campus Walkways */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Simulated Campus Grid Blocks */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Row 1: North Quad */}
              {CAMPUS_BUILDINGS.slice(0, 3).map((building) => {
                const riskInfo = getBuildingRisk(building.id);
                const isSelected = selectedBuilding?.id === building.id;
                const isHigh = riskInfo.riskLevel === 'HIGH';
                const isMod = riskInfo.riskLevel === 'MODERATE';

                return (
                  <div
                    key={building.id}
                    onClick={() => setSelectedBuilding(building)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isSelected ? 'ring-2 ring-teal-400 scale-[1.02]' : ''
                    } ${
                      isHigh ? 'bg-rose-950/90 border-rose-600 shadow-glow-red' :
                      isMod ? 'bg-amber-950/80 border-amber-600' :
                      'bg-slate-900/90 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {building.zone}
                        </span>
                        {isHigh && (
                          <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors leading-tight">
                        {building.name}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{building.type}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">{riskInfo.reportCount} Reports</span>
                      <RiskBadge level={riskInfo.riskLevel} size="sm" showPulse={false} />
                    </div>
                  </div>
                );
              })}

              {/* Row 2: Central Quad (Cafeteria, Academic, Health Centre) */}
              {CAMPUS_BUILDINGS.slice(3, 6).map((building) => {
                const riskInfo = getBuildingRisk(building.id);
                const isSelected = selectedBuilding?.id === building.id;
                const isHigh = riskInfo.riskLevel === 'HIGH';
                const isMod = riskInfo.riskLevel === 'MODERATE';

                return (
                  <div
                    key={building.id}
                    onClick={() => setSelectedBuilding(building)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isSelected ? 'ring-2 ring-teal-400 scale-[1.02]' : ''
                    } ${
                      isHigh ? 'bg-rose-950/90 border-rose-600 shadow-glow-red' :
                      isMod ? 'bg-amber-950/80 border-amber-600' :
                      building.id === 'health_centre' ? 'bg-teal-950/80 border-teal-600' :
                      'bg-slate-900/90 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {building.zone}
                        </span>
                        {isMod && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        )}
                        {building.id === 'health_centre' && (
                          <span className="text-[10px] font-bold bg-teal-800 text-teal-200 px-1.5 py-0.2 rounded">
                            24/7 OPD
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors leading-tight">
                        {building.name}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{building.type}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">
                        {building.id === 'health_centre' ? 'Facility Active' : `${riskInfo.reportCount} Reports`}
                      </span>
                      <RiskBadge level={riskInfo.riskLevel} size="sm" showPulse={false} />
                    </div>
                  </div>
                );
              })}

              {/* Row 3: South Quad (Hostel D, Sports Complex, Day Scholars) */}
              {CAMPUS_BUILDINGS.slice(6, 9).map((building) => {
                const riskInfo = getBuildingRisk(building.id);
                const isSelected = selectedBuilding?.id === building.id;
                const isHigh = riskInfo.riskLevel === 'HIGH';
                const isMod = riskInfo.riskLevel === 'MODERATE';

                return (
                  <div
                    key={building.id}
                    onClick={() => setSelectedBuilding(building)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isSelected ? 'ring-2 ring-teal-400 scale-[1.02]' : ''
                    } ${
                      isHigh ? 'bg-rose-950/90 border-rose-600 shadow-glow-red' :
                      isMod ? 'bg-amber-950/80 border-amber-600' :
                      'bg-slate-900/90 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {building.zone}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-white group-hover:text-teal-300 transition-colors leading-tight">
                        {building.name}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{building.type}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">{riskInfo.reportCount} Reports</span>
                      <RiskBadge level={riskInfo.riskLevel} size="sm" showPulse={false} />
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Bottom Map Note */}
            <div className="relative z-10 mt-4 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>📍 Tap any campus building to inspect aggregated symptom telemetry.</span>
              <span className="text-teal-400 font-bold">100% Privacy Protected</span>
            </div>

          </div>

        </div>

        {/* Right: Building Deep Dive Inspector (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between space-y-5">
          {selectedBuilding ? (
            (() => {
              const riskInfo = getBuildingRisk(selectedBuilding.id);
              const isHigh = riskInfo.riskLevel === 'HIGH';

              return (
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {selectedBuilding.type} • {selectedBuilding.zone}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 font-display mt-1">
                        {selectedBuilding.name}
                      </h3>
                      <p className="text-xs text-slate-500">Supervisory Warden: {selectedBuilding.warden}</p>
                    </div>
                    <RiskBadge level={riskInfo.riskLevel} size="md" />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedBuilding.description}
                  </p>

                  {/* Metrics Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Active 48h Symptom Reports:</span>
                      <span className="font-extrabold text-slate-900">{riskInfo.reportCount} submissions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Building Capacity:</span>
                      <span className="font-semibold text-slate-700">{selectedBuilding.capacity} students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cluster Confidence Index:</span>
                      <span className="font-mono font-bold text-teal-700">{riskInfo.confidence}%</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex flex-col gap-1">
                      <span className="text-slate-500">Dominant Symptom Pattern:</span>
                      <div className="flex flex-wrap gap-1">
                        {riskInfo.dominantSymptoms.length > 0 ? (
                          riskInfo.dominantSymptoms.map(sym => (
                            <span key={sym} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded font-semibold text-[11px]">
                              {sym.replace(/_/g, ' ')}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 text-xs">No active symptom concentration</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions for Health Official */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => handleIssueAreaAdvisory(selectedBuilding)}
                      className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Issue Area Advisory to Residents</span>
                    </button>

                    <button
                      onClick={() => {
                        addToast(`Sanitation & Water inspection team dispatched to ${selectedBuilding.name}`, 'info');
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
                    >
                      Dispatch Facility Inspection
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Building2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-xs">Select any campus building on the map to inspect its health risk index.</p>
            </div>
          )}

          <div className="p-3 bg-brand-50 rounded-2xl border border-brand-200 text-[11px] text-brand-900 flex items-start gap-2">
            <PrivacyShieldBadge size="xs" text="Aggregated" />
            <p className="leading-snug">
              Individual student room numbers and names are never rendered on public risk maps.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CampusRiskMap;
