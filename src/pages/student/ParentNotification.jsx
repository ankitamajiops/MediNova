import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  PhoneCall, 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle,
  Save
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const ParentNotification = () => {
  const { parentSettings, setParentSettings, addToast } = useApp();

  const [formData, setFormData] = useState({
    enabled: parentSettings.enabled,
    name: parentSettings.name || 'Sunil Roy',
    relationship: parentSettings.relationship || 'Father',
    phone: parentSettings.phone || '+91 98765-11223',
    notifyOnEmergencyAdmission: parentSettings.notifyOnEmergencyAdmission ?? true,
    notifyOnCampusAdvisory: parentSettings.notifyOnCampusAdvisory ?? false
  });

  const handleSave = (e) => {
    e.preventDefault();
    setParentSettings(formData);
    addToast('Parent / Guardian emergency notification settings updated.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Parent / Guardian Emergency Notification
          </h1>
          <PrivacyShieldBadge text="Optional & Student-Controlled" />
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Designate an emergency guardian contact for severe clinical emergencies. Routine symptom reports remain strictly confidential.
        </p>
      </div>

      {/* Critical Privacy Guarantee Banner */}
      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 flex items-start gap-3 text-xs text-purple-900 leading-relaxed">
        <HeartHandshake className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="block text-purple-950 font-bold mb-0.5">Student Privacy Guarantee:</strong>
          MediNova will <span className="underline font-bold">NEVER</span> automatically notify parents about everyday cold, fever, or anonymous symptom logs. This channel is only triggered if you are admitted to an emergency medical bed or referral hospital with your explicit verification.
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        
        {/* Enable toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="space-y-0.5">
            <span className="font-bold text-xs sm:text-sm text-slate-900 block">
              Enable Guardian Emergency Notification
            </span>
            <span className="text-[11px] text-slate-500">
              Allows the Campus Chief Medical Officer to send critical emergency alerts to this contact
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              formData.enabled ? 'bg-purple-600' : 'bg-slate-300'
            }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              formData.enabled ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {formData.enabled && (
          <div className="space-y-4 pt-2 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Parent / Guardian Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sunil Roy"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Relationship *
                </label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Local Guardian</option>
                  <option value="Sibling">Elder Sibling</option>
                  <option value="Other">Other Family Contact</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Emergency Mobile Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +91 98765-11223"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Notification Triggers */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Notification Trigger Conditions:
              </span>
              
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={formData.notifyOnEmergencyAdmission}
                  onChange={(e) => setFormData({ ...formData, notifyOnEmergencyAdmission: e.target.checked })}
                  className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mt-0.5"
                />
                <span><strong>Emergency ICU / Referral Hospitalization:</strong> Dispatch automated SMS & phone trigger immediately upon doctor admission order.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={formData.notifyOnCampusAdvisory}
                  onChange={(e) => setFormData({ ...formData, notifyOnCampusAdvisory: e.target.checked })}
                  className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mt-0.5"
                />
                <span><strong>Campus Wide Health Advisories:</strong> Send weekly digest of major campus epidemic advisories (Optional).</span>
              </label>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Guardian Settings</span>
        </button>

      </form>

    </div>
  );
};

export default ParentNotification;
