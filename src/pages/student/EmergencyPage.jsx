import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PhoneCall, 
  ShieldAlert, 
  Ambulance, 
  Building, 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  X,
  PhoneForwarded
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const EmergencyPage = () => {
  const { emergencyContacts, parentSettings, addToast } = useApp();

  const [isEmergencyTriggered, setIsEmergencyTriggered] = useState(false);
  const [beaconCountdown, setBeaconCountdown] = useState(null);

  const triggerImmediateHelp = () => {
    setIsEmergencyTriggered(true);
    addToast('🚨 SOS Emergency Beacon Dispatched to Campus Health Clinic & Ambulance Unit!', 'error', 6000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Top Warning & SOS Beacon Card */}
      <div className="bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold backdrop-blur-xs border border-white/30">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
              <span>24/7 CAMPUS EMERGENCY DESK ACTIVE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Urgent Medical & Crisis Help
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              If you or a peer are experiencing severe acute illness, injury, breathing distress, or fainting, request immediate campus ambulance dispatch.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={triggerImmediateHelp}
              className="w-full md:w-auto px-8 py-5 rounded-2xl bg-white hover:bg-rose-50 text-rose-700 font-extrabold text-base sm:text-lg shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 beacon-high-risk"
            >
              <PhoneCall className="w-6 h-6 animate-pulse text-rose-600" />
              <span>Get Immediate Emergency Help</span>
            </button>
          </div>
        </div>

        {/* Institutional notice */}
        <div className="relative z-10 p-3 bg-black/20 rounded-2xl border border-white/15 text-[11px] text-rose-100 flex items-center justify-between">
          <span>📍 Emergency Station: Campus Health Bay 1 (Building #8)</span>
          <span className="font-bold">Average Response: &lt; 3 mins</span>
        </div>
      </div>

      {/* Emergency Hotlines Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Priority Emergency Telephone Hotlines</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Institutional Contacts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.title}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                  Priority Contact
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-2">{contact.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{contact.subtitle}</p>
                <div className="mt-3 p-2 rounded-xl bg-slate-50 border border-slate-100 font-mono font-bold text-base text-slate-900">
                  {contact.number}
                </div>
              </div>

              <a
                href={`tel:${contact.number.replace(/\s+/g, '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  addToast(`Dialing emergency contact: ${contact.number}`, 'error');
                }}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {contact.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Parent/Guardian Notification Status */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-purple-600" />
            <h3 className="font-extrabold text-sm text-slate-900">Parent / Guardian Emergency Notification</h3>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            parentSettings.enabled ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-600'
          }`}>
            {parentSettings.enabled ? 'Configured & Enabled' : 'Optional / Disabled'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {parentSettings.enabled
            ? `Emergency contact set to ${parentSettings.name} (${parentSettings.relationship} • ${parentSettings.phone}). Automated notification triggers only in severe hospital admissions.`
            : 'You have not enabled routine guardian notifications. Routine symptom reports remain strictly private and are never shared.'}
        </p>
      </div>

      {/* Immediate SOS Modal */}
      {isEmergencyTriggered && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-200 text-center space-y-5 animate-slide-up">
            
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto beacon-high-risk">
              <Ambulance className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Emergency Beacon Activated
              </h3>
              <p className="text-xs text-slate-500">
                Paramedics & Hostel Warden desk alerted with your location telemetry.
              </p>
            </div>

            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Dispatched Unit:</span>
                <span className="font-bold text-rose-800">Campus Ambulance #2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Duty Paramedic:</span>
                <span className="font-bold text-slate-900">EMT Officer In-charge</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Estimated Arrival:</span>
                <span className="font-extrabold text-rose-700 font-mono text-sm">&lt; 2 Minutes</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="tel:9999900108"
                onClick={(e) => {
                  e.preventDefault();
                  addToast('Direct voice call connected to Campus EMT', 'info');
                }}
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneForwarded className="w-4 h-4" />
                <span>Speak to Paramedic on Call (+91 99999-00108)</span>
              </a>

              <button
                onClick={() => setIsEmergencyTriggered(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Dismiss / I am in Safe Care
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EmergencyPage;
