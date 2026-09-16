import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FilePlus2, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Check, 
  Sparkles, 
  Thermometer, 
  Activity, 
  AlertTriangle, 
  Wind, 
  Smile, 
  Brain, 
  BatteryLow, 
  Heart, 
  PlusCircle, 
  X,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const SymptomReportForm = () => {
  const { 
    symptomsList, 
    campusLocations, 
    addSymptomReport, 
    setActiveTab, 
    navigateToRole,
    addToast 
  } = useApp();

  const [selectedSymptoms, setSelectedSymptoms] = useState(['fever', 'vomiting', 'stomach_pain']);
  const [selectedLocation, setSelectedLocation] = useState('hostel_a');
  const [onset, setOnset] = useState('Within last 24-48 hours');
  const [severity, setSeverity] = useState('Moderate');
  const [hasConsent, setHasConsent] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState(null);

  const getSymptomIcon = (id) => {
    switch (id) {
      case 'fever': return <Thermometer className="w-4 h-4 text-rose-500" />;
      case 'vomiting': return <Activity className="w-4 h-4 text-amber-500" />;
      case 'stomach_pain': return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'diarrhea': return <AlertTriangle className="w-4 h-4 text-amber-700" />;
      case 'cough': return <Wind className="w-4 h-4 text-blue-500" />;
      case 'sore_throat': return <Smile className="w-4 h-4 text-cyan-500" />;
      case 'headache': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'fatigue': return <BatteryLow className="w-4 h-4 text-orange-500" />;
      case 'skin_allergy': return <Sparkles className="w-4 h-4 text-teal-500" />;
      case 'menstrual_concern': return <Heart className="w-4 h-4 text-pink-500" />;
      default: return <PlusCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const toggleSymptom = (symId) => {
    if (selectedSymptoms.includes(symId)) {
      if (selectedSymptoms.length === 1) {
        addToast('Please keep at least one symptom selected.', 'warning');
        return;
      }
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symId]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      addToast(`Prescription attached: ${file.name} (Encrypted locally)`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!hasConsent) {
      addToast('Please provide consent before submitting the anonymous report.', 'error');
      return;
    }

    if (selectedSymptoms.length === 0) {
      addToast('Please select at least one symptom.', 'error');
      return;
    }

    const locObj = campusLocations.find(l => l.id === selectedLocation) || { name: selectedLocation };

    setIsSubmitting(true);

    setTimeout(() => {
      const result = addSymptomReport({
        locationId: selectedLocation,
        locationName: locObj.name,
        symptoms: selectedSymptoms,
        severity,
        onset,
        hasFile: Boolean(uploadedFileName),
        fileName: uploadedFileName
      });

      setIsSubmitting(false);
      setSubmittedReceipt({
        token: result.anonymousToken,
        reportId: result.reportId,
        location: locObj.name,
        symptomCount: selectedSymptoms.length,
        severity
      });
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Title & Privacy Banner */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Anonymous Health Report
          </h1>
          <PrivacyShieldBadge text="100% Anonymized" />
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-brand-50/80 p-3 rounded-2xl border border-brand-200/80">
          🔒 <strong className="text-brand-900">Privacy Notice:</strong> Your report helps identify community health trends across campus. Individual medical information is never shown during community trend analysis.
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        
        {/* 1. Symptoms Multi-select */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            1. Select Health Symptoms You Are Experiencing *
          </label>
          <p className="text-[11px] text-slate-500">Tap to select all symptoms that apply to your current condition:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {symptomsList.map((sym) => {
              const isSelected = selectedSymptoms.includes(sym.id);
              return (
                <button
                  type="button"
                  key={sym.id}
                  onClick={() => toggleSymptom(sym.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all text-left ${
                    isSelected
                      ? 'bg-teal-50/90 border-teal-500 text-teal-900 ring-1 ring-teal-500 shadow-2xs font-bold'
                      : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {getSymptomIcon(sym.id)}
                    <span>{sym.label}</span>
                  </div>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-md border border-slate-300 bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Campus Location */}
        <div className="space-y-1.5 border-t border-slate-100 pt-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            2. Primary Hostel / Campus Residence *
          </label>
          <p className="text-[11px] text-slate-500">Used strictly for aggregated spatial cluster analysis. No room numbers requested.</p>
          
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            required
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          >
            {campusLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.type})
              </option>
            ))}
          </select>
        </div>

        {/* 3. Symptom Onset & Severity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
          
          {/* Approximate Start Time */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              3. Symptom Start Time *
            </label>
            <select
              value={onset}
              onChange={(e) => setOnset(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            >
              <option>Within last 12 hours</option>
              <option>Within last 24-48 hours</option>
              <option>3 to 5 days ago</option>
              <option>More than 5 days ago</option>
            </select>
          </div>

          {/* Severity Level */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              4. Symptom Severity Level *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Mild', 'Moderate', 'Severe'].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setSeverity(lvl)}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                    severity === lvl
                      ? lvl === 'Severe' 
                        ? 'bg-rose-50 border-rose-500 text-rose-700 ring-1 ring-rose-500'
                        : lvl === 'Moderate'
                          ? 'bg-amber-50 border-amber-500 text-amber-700 ring-1 ring-amber-500'
                          : 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 4. Optional Medical Report / Prescription Upload */}
        <div className="space-y-1.5 border-t border-slate-100 pt-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            5. Optional Medical Prescription / Doctor Note (Optional)
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-teal-400 transition-colors bg-slate-50/50">
            <input
              type="file"
              id="medical-file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg"
            />
            <label htmlFor="medical-file" className="cursor-pointer flex flex-col items-center gap-1.5">
              <UploadCloud className="w-6 h-6 text-teal-600" />
              <span className="text-xs font-semibold text-slate-700">
                {uploadedFileName ? uploadedFileName : 'Click to attach prescription or lab test'}
              </span>
              <span className="text-[10px] text-slate-400">PDF, JPG up to 5MB (Kept locally on device)</span>
            </label>
          </div>
        </div>

        {/* 5. Mandatory Consent Checkbox */}
        <div className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200/80 space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasConsent}
              onChange={(e) => setHasConsent(e.target.checked)}
              required
              className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 h-4 w-4 border-slate-300"
            />
            <span className="text-xs text-teal-900 font-medium leading-relaxed">
              <strong>Consent Guarantee:</strong> I consent to the use of my anonymous and aggregated report for campus community health trend analysis. I understand that my individual identity is 100% confidential.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-mediblue-600 hover:from-teal-500 hover:to-mediblue-500 text-white font-extrabold text-sm shadow-md hover:shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Securing & Submitting Anonymous Log...</span>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>Submit Anonymous Report</span>
            </>
          )}
        </button>

      </form>

      {/* Submission Success Receipt Modal */}
      {submittedReceipt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-5 animate-slide-up">
            
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-soft">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 font-display">
                Report Submitted Successfully
              </h3>
              <p className="text-xs text-slate-500">
                Your individual identity is not displayed in community trend analysis.
              </p>
            </div>

            {/* Receipt details */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Anonymous Token:</span>
                <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {submittedReceipt.token}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Area:</span>
                <span className="font-semibold text-slate-800">{submittedReceipt.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Logged Symptoms:</span>
                <span className="font-semibold text-slate-800">{submittedReceipt.symptomCount} selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Severity:</span>
                <span className="font-semibold text-slate-800">{submittedReceipt.severity}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-[11px]">
                <span className="text-slate-400">Analysis Status:</span>
                <span className="text-emerald-600 font-bold">Aggregated in Active 48h Window</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setSubmittedReceipt(null);
                  navigateToRole('official', 'dashboard');
                }}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <span>Switch to Health Official to See Live Update →</span>
              </button>

              <button
                onClick={() => {
                  setSubmittedReceipt(null);
                  setActiveTab('my-reports');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                View in My Submissions Timeline
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SymptomReportForm;
