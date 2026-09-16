import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  ShieldCheck, 
  EyeOff, 
  Database, 
  Users, 
  Sliders, 
  CheckCircle2, 
  XCircle,
  FileText,
  Key
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const PrivacyCenter = () => {
  const { privacyPreferences, setPrivacyPreferences, addToast } = useApp();

  const handleToggle = (key) => {
    const updated = {
      ...privacyPreferences,
      [key]: !privacyPreferences[key]
    };
    setPrivacyPreferences(updated);
    addToast(`Privacy preference updated: ${key}`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            MediNova Privacy & Consent Center
          </h1>
          <PrivacyShieldBadge text="k-Anonymity Protected" />
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Transparent data governance policies. Learn how your privacy is protected and manage your consent preferences.
        </p>
      </div>

      {/* Consent Toggles Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sliders className="w-5 h-5 text-teal-600" />
          <h2 className="text-base font-extrabold text-slate-900">Consent & Telemetry Preferences</h2>
        </div>

        <div className="space-y-4">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Anonymous Trend Analysis
              </h4>
              <p className="text-xs text-slate-500">
                Allow your anonymous symptom counts to be grouped into rolling 48-hour cluster detection models.
              </p>
            </div>
            <button
              onClick={() => handleToggle('anonymousTrendAnalysis')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                privacyPreferences.anonymousTrendAnalysis ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                privacyPreferences.anonymousTrendAnalysis ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Emergency Contact Notification
              </h4>
              <p className="text-xs text-slate-500">
                Authorize optional dispatch of emergency SMS to your designated guardian during critical clinical admissions only.
              </p>
            </div>
            <button
              onClick={() => handleToggle('emergencyContactNotification')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                privacyPreferences.emergencyContactNotification ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                privacyPreferences.emergencyContactNotification ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Campus Health Awareness Advisories
              </h4>
              <p className="text-xs text-slate-500">
                Receive proactive hygiene and seasonal prevention advisories issued by the Campus Health Centre.
              </p>
            </div>
            <button
              onClick={() => handleToggle('healthAwarenessPush')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                privacyPreferences.healthAwarenessPush ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                privacyPreferences.healthAwarenessPush ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars of MediNova Privacy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar 1: What We Collect */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
            <Database className="w-5 h-5" />
            <span>1. What We Collect</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>Reported symptom categories (e.g. Fever, Stomach Pain).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>General campus zone or hostel block (e.g. Hostel A).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>Approximate onset time window (e.g. past 24-48 hours).</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: What Is Anonymized */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-mediblue-700 font-bold text-sm">
            <EyeOff className="w-5 h-5" />
            <span>2. What Is Anonymized</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>Your name, email address, and institutional roll number are never linked to syndromic data.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>Specific room numbers and bed numbers are strictly excluded.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>Reports receive salted one-way hash tokens (`#ANON-XXXXX`).</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: Who Can Access Information */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
            <Users className="w-5 h-5" />
            <span>3. Who Can Access Information</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span><strong>Health Officials:</strong> See aggregated counts and cluster confidence metrics only.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span><strong>Sanitation Teams:</strong> See hygiene tickets for water coolers and washrooms.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span><strong>Public / Students:</strong> See generalized campus risk ratings (🟢/🟡/🔴).</span>
            </li>
          </ul>
        </div>

        {/* Pillar 4: Consent & Data Rights */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Key className="w-5 h-5" />
            <span>4. Student Data Rights</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>You have the absolute right to revoke consent at any time.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>Historical symptom logs auto-expire and purge after 30 days.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
              <span>Zero commercial data monetization or third-party ad sharing.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};

export default PrivacyCenter;
