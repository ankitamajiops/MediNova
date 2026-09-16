import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  ShieldCheck, 
  Lock, 
  Bell, 
  Map, 
  MapPin, 
  AlertTriangle, 
  BookOpen, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingUp, 
  Layers, 
  HeartHandshake,
  PhoneCall,
  PlayCircle,
  HelpCircle,
  Zap,
  Smartphone,
  Download
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import PrivacyShieldBadge from '../components/common/PrivacyShieldBadge';

export const LandingPage = () => {
  const { 
    navigateToRole, 
    startDemoTour, 
    clusterAnalysis,
    setIsAppSimulatorMode,
    setIsInstallModalOpen 
  } = useApp();


  // Interactive mini simulation state on landing page
  const [simReportCount, setSimReportCount] = useState(12);
  const [simLocation, setSimLocation] = useState('Hostel A (Aryabhatta Hall)');

  const simRiskLevel = simReportCount >= 10 ? 'HIGH' : simReportCount >= 5 ? 'MODERATE' : 'LOW';
  const simConfidence = simReportCount >= 10 ? Math.min(96, 85 + simReportCount) : Math.round(50 + simReportCount * 4);

  const workflowSteps = [
    {
      step: '01',
      title: 'REPORT',
      subtitle: 'Student Symptom Logging',
      desc: 'Students submit multi-symptom reports and hygiene tickets in under 30 seconds with explicit consent.',
      icon: '📝',
      color: 'border-teal-400 bg-teal-50 text-teal-700'
    },
    {
      step: '02',
      title: 'ANONYMIZE',
      subtitle: 'Zero-PII Tokenization',
      desc: 'All names, emails, and room numbers are stripped. Records receive cryptographic anonymous tokens.',
      icon: '🛡️',
      color: 'border-blue-400 bg-blue-50 text-blue-700'
    },
    {
      step: '03',
      title: 'ANALYZE',
      subtitle: 'Spatial & Temporal Grouping',
      desc: 'Sentinel engine aggregates reports into rolling 48-hour windows by hostel block and zone.',
      icon: '⚡',
      color: 'border-cyan-400 bg-cyan-50 text-cyan-700'
    },
    {
      step: '04',
      title: 'DETECT',
      subtitle: 'Rule-Based Pattern Match',
      desc: 'Identifies symptom co-occurrences (e.g. Fever + Vomiting) crossing configured threshold baselines.',
      icon: '🔍',
      color: 'border-amber-400 bg-amber-50 text-amber-700'
    },
    {
      step: '05',
      title: 'ALERT',
      subtitle: 'Explainable Notifications',
      desc: 'Authorized health officials receive plain-English alerts with confidence scores and symptom tags.',
      icon: '🚨',
      color: 'border-rose-400 bg-rose-50 text-rose-700'
    },
    {
      step: '06',
      title: 'ACT',
      subtitle: 'Targeted Interventions',
      desc: 'Authorities inspect food/water facilities, dispatch sanitation teams, and publish proactive health advisories.',
      icon: '🩺',
      color: 'border-emerald-400 bg-emerald-50 text-emerald-700'
    }
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Anonymous Symptom Reporting',
      desc: 'Students log symptoms freely without fear of stigma or disciplinary backlash. No student identity is linked to public trends.',
      color: 'text-teal-600 bg-teal-50'
    },
    {
      icon: Zap,
      title: 'Early Cluster Detection',
      desc: 'Real-time syndromic surveillance identifies disease spikes (gastroenteritis, flu, dengue) days before clinical testing.',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: ShieldAlert,
      title: 'Explainable AI Alerts',
      desc: 'Transparent rationale ("Why was this alert triggered?") paired with recommended containment action plans.',
      color: 'text-rose-600 bg-rose-50'
    },
    {
      icon: Map,
      title: 'Campus Health Risk Map',
      desc: 'Interactive color-coded campus schematic displaying aggregated risk levels (🟢 Low, 🟡 Moderate, 🔴 High) across all hostels.',
      color: 'text-cyan-600 bg-cyan-50'
    },
    {
      icon: MapPin,
      title: 'Healthcare Locator',
      desc: 'Comprehensive directory of the campus health clinic, nearby hospitals, polyclinics, and 24x7 pharmacies with 1-tap call.',
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      icon: Layers,
      title: 'Campus Issue Reporting',
      desc: 'Students report unsafe drinking water, bad mess food, or mosquito breeding directly to maintenance teams.',
      color: 'text-amber-600 bg-amber-50'
    },
    {
      icon: BookOpen,
      title: 'Health Awareness Guides',
      desc: 'Curated wellness articles on water safety, viral flu precautions, hydration calculators, and when to seek medical help.',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      icon: UserCheck,
      title: 'Optional Parent Notification',
      desc: 'Student-controlled emergency contacts only alerted during severe institutional emergency admissions.',
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-20 bg-gradient-to-b from-teal-50/60 via-slate-50 to-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-semibold shadow-2xs animate-fade-in">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span>Smart India Hackathon 2024–25 Prototype • Team MediNova</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-brand-600">
                CAMPUS HEALTH SENTINEL
              </h2>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Privacy-Preserving Community Health <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-600 via-mediblue-600 to-cyan-600 bg-clip-text text-transparent">
                  Early Warning System
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
              Detect campus health risks early. Protect student privacy with Zero-PII aggregation. Empower health officials to stop outbreaks before they spread.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigateToRole('student', 'dashboard')}
                className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md hover:shadow-teal-500/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>🎓 Student App</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToRole('official', 'dashboard')}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-slate-900/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 border border-slate-700"
              >
                <span>🩺 Official Surveillance</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() => setIsAppSimulatorMode(true)}
                className="px-5 py-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-sm shadow-xs border border-teal-200 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Smartphone className="w-4 h-4 text-teal-600" />
                <span>📱 Phone App View</span>
              </button>

              <button
                onClick={() => startDemoTour(1)}
                className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-yellow-100" />
                <span>SIH Demo Pitch</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>100% Zero-PII Protected</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Rolling 48h Spatial Cluster Engine</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>Explainable Actionable Rationale</span>
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 2. VISUAL WORKFLOW: REPORT → ANONYMIZE → ANALYZE → DETECT → ALERT → ACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            End-to-End Operational Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            How MediNova Early Warning Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A frictionless loop from individual anonymous student symptoms to campus-wide preventative containment.
          </p>
        </div>

        {/* Workflow Chain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {workflowSteps.map((item, idx) => (
            <div 
              key={item.step}
              className={`p-4 rounded-2xl border ${item.color} shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-black tracking-wider opacity-60">STEP {item.step}</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
                <p className="text-[11px] font-semibold text-slate-700 mb-2">{item.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              {idx < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-300 rounded-full p-1 shadow-xs text-slate-400">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE CLUSTER SIMULATION WIDGET (Judges can test right here) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left explanation */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Live Algorithmic Demonstration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Experience Cluster Detection in Real-Time
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Adjust the symptom report slider to see how MediNova’s syndromic rule matcher evaluates spatial concentration and triggers early alerts before a full outbreak occurs.
              </p>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                    <span>Simulated Gastrointestinal Reports (within 48 hours):</span>
                    <span className="font-bold text-teal-400 text-sm">{simReportCount} Reports</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={simReportCount}
                    onChange={(e) => setSimReportCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 (Isolated)</span>
                    <span>5 (Moderate Threshold)</span>
                    <span>10 (High Risk Threshold)</span>
                    <span>25 (Severe Spike)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Campus Location:
                  </label>
                  <select
                    value={simLocation}
                    onChange={(e) => setSimLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:ring-1 focus:ring-teal-400"
                  >
                    <option>Hostel A (Aryabhatta Hall)</option>
                    <option>Hostel B (Gargi Hall)</option>
                    <option>Central Food Court & Mess Hub</option>
                    <option>Hostel C (Kalam Hall - Freshers)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Dynamic Alert Box */}
            <div className="lg:col-span-6 bg-slate-800/90 rounded-2xl p-5 sm:p-6 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Calculated Risk Status
                </span>
                <RiskBadge level={simRiskLevel} size="md" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {simRiskLevel === 'HIGH' && <ShieldAlert className="w-5 h-5 text-rose-400" />}
                  {simRiskLevel === 'MODERATE' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  {simRiskLevel === 'LOW' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  <span>
                    {simRiskLevel === 'HIGH' ? 'Possible Food-Borne Illness Cluster Detected' :
                     simRiskLevel === 'MODERATE' ? 'Moderate Symptom Concentration Monitored' :
                     'Normal Baseline Activity'}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Location: <strong className="text-slate-200">{simLocation}</strong> • Time Window: <strong className="text-slate-200">Last 48 hours</strong>
                </p>
              </div>

              {/* Confidence meter */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Algorithmic Confidence Score:</span>
                  <span className="font-bold text-teal-300">{simConfidence}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      simRiskLevel === 'HIGH' ? 'bg-rose-500' :
                      simRiskLevel === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${simConfidence}%` }}
                  />
                </div>
              </div>

              {/* Explainability Rationale */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700 text-xs space-y-1">
                <span className="font-bold text-teal-400 block text-[11px] uppercase tracking-wider">
                  Explainable Rationale
                </span>
                <p className="text-slate-300 leading-relaxed">
                  "{simReportCount} symptom reports (Fever, Vomiting, Stomach Pain) recorded from {simLocation} within 48 hours."
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => navigateToRole('official', 'alerts')}
                  className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                >
                  <span>Inspect in Official Surveillance Hub →</span>
                </button>
                <span className="text-[10px] text-slate-400">Rule-based prototype v1.0</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRIVACY FIRST: ZERO-PII ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-50/60 rounded-3xl p-6 sm:p-10 border border-brand-200/80">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <PrivacyShieldBadge text="Institutional Zero-PII Guarantee" size="sm" />
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Privacy by Design: What We Collect vs What Officials See
            </h2>
            <p className="text-sm text-slate-600">
              Students often avoid reporting sickness due to fear of quarantine stigma. MediNova is strictly built to safeguard student confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: What Bad / Invasive systems do */}
            <div className="bg-white rounded-2xl p-5 border border-rose-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <span className="p-1 rounded-md bg-rose-100 text-xs">❌</span>
                <span>Invasive Traditional Systems (Forbidden)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2 text-rose-900 bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Exposes Personal Identity:</strong> Shows names like "Rahul Sharma, Room 204".</span>
                </li>
                <li className="flex items-start gap-2 text-rose-900 bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Real-time GPS Tracking:</strong> Tracks student movements and phone locations.</span>
                </li>
                <li className="flex items-start gap-2 text-rose-900 bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Mandatory Parent Alerts:</strong> Broadcasts personal medical history automatically.</span>
                </li>
              </ul>
            </div>

            {/* Right: How MediNova protects students */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <span className="p-1 rounded-md bg-emerald-100 text-xs">✅</span>
                <span>MediNova Privacy-Preserving Sentinel</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2 text-emerald-900 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Aggregated Analytics:</strong> "Hostel A — 20 reports — Fever/Vomiting — High Risk".</span>
                </li>
                <li className="flex items-start gap-2 text-emerald-900 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Cryptographic Tokens:</strong> Reports assigned random tokens (`#ANON-8F29A`) stored locally.</span>
                </li>
                <li className="flex items-start gap-2 text-emerald-900 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Student Consent Control:</strong> Toggles to withdraw report data or enable optional emergency contacts.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KEY FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Comprehensive Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Complete Feature Set for Students & Officials
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Engineered to empower modern college campuses with proactive healthcare tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${feat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. EXPECTED IMPACT & FUTURE SCOPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Impact card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-100 rounded-xl text-teal-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Expected Campus Impact</h3>
                <p className="text-xs text-slate-500">Measurable improvements in campus community health</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-display">85%</span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Faster Cluster Detection</p>
                <p className="text-[11px] text-slate-500">Catches gastro spikes within 24-48 hours</p>
              </div>
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-mediblue-700 font-display">100%</span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Privacy Guarantee</p>
                <p className="text-[11px] text-slate-500">Zero student PII on public dashboards</p>
              </div>
              <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-display">4x</span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Student Reporting Rate</p>
                <p className="text-[11px] text-slate-500">Anonymous portal removes quarantine stigma</p>
              </div>
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-display">90%</span>
                <p className="text-xs font-semibold text-slate-700 mt-1">Food/Water Containment</p>
                <p className="text-[11px] text-slate-500">Rapid sanitation dispatch prevents campus spread</p>
              </div>
            </div>
          </div>

          {/* Future scope card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-xl text-mediblue-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Future Scope & Scalability</h3>
                <p className="text-xs text-slate-500">Post-hackathon development roadmap</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-5 h-5 rounded-lg bg-teal-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">1</span>
                <div>
                  <strong className="text-slate-900 block">AI-Powered Syndromic Modeling:</strong>
                  Transition from rule-based thresholds to Bayesian anomaly detection algorithms trained on seasonal epidemiology data.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-5 h-5 rounded-lg bg-teal-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">2</span>
                <div>
                  <strong className="text-slate-900 block">Municipal Health Directorate API Sync:</strong>
                  Automatic anonymized data sharing with district chief medical officers and IDSP (Integrated Disease Surveillance Programme).
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-5 h-5 rounded-lg bg-teal-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">3</span>
                <div>
                  <strong className="text-slate-900 block">IoT Water Quality Sensor Integration:</strong>
                  Real-time TDS, turbidity, and chlorine telemetry directly connected from hostel water coolers to the risk map.
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 7. QUICK DEMO LAUNCH FOOTER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-600 to-mediblue-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold">
            Ready to Explore the MediNova Prototype?
          </h2>
          <p className="text-sm sm:text-base text-teal-100 max-w-2xl mx-auto">
            Test the complete workflow as a Student, Health Official, or Administrator.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateToRole('student', 'report-symptoms')}
              className="px-6 py-3.5 rounded-2xl bg-white text-teal-800 font-extrabold text-sm shadow-md hover:bg-teal-50 transition-all"
            >
              Submit Anonymous Health Report
            </button>
            <button
              onClick={() => navigateToRole('official', 'dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-sm shadow-md hover:bg-slate-800 border border-teal-300/30 transition-all"
            >
              View Official Surveillance Dashboard
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
