import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FilePlus2, 
  AlertOctagon, 
  MapPin, 
  PhoneCall, 
  BookOpen, 
  Clock, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  ArrowRight, 
  Sparkles,
  HeartPulse,
  Info,
  Building2
} from 'lucide-react';
import RiskBadge from '../../components/common/RiskBadge';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const StudentDashboard = () => {
  const { 
    userProfiles, 
    setActiveTab, 
    clusterAnalysis, 
    mySubmissions, 
    healthcareFacilities,
    notifications 
  } = useApp();

  const studentProfile = userProfiles.student;
  const highRiskCount = clusterAnalysis.highRiskZonesCount || 0;
  const latestNotif = notifications[0];

  // Dynamic greeting based on current time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const quickActions = [
    {
      id: 'report-symptoms',
      title: 'Report Health Symptoms',
      desc: 'Submit anonymous symptom log to help campus early warning.',
      icon: FilePlus2,
      color: 'bg-teal-600 text-white hover:bg-teal-500',
      badge: 'Anonymous',
      highlight: true
    },
    {
      id: 'campus-issues',
      title: 'Report Hygiene / Food Issue',
      desc: 'Report unsafe drinking water, bad hostel food, or sanitation.',
      icon: AlertOctagon,
      color: 'bg-amber-500 text-white hover:bg-amber-600',
      badge: 'Facility Ticket'
    },
    {
      id: 'healthcare',
      title: 'Find Nearby Healthcare',
      desc: 'Locate 24/7 campus health clinic, pharmacies, & clinics.',
      icon: MapPin,
      color: 'bg-blue-600 text-white hover:bg-blue-500',
      badge: 'Directory'
    },
    {
      id: 'emergency',
      title: 'Emergency Medical Help',
      desc: 'Immediate 1-tap campus ambulance & doctor on duty hotline.',
      icon: PhoneCall,
      color: 'bg-rose-600 text-white hover:bg-rose-500',
      badge: '24/7 Hotline'
    },
    {
      id: 'awareness',
      title: 'Health & Wellness Guides',
      desc: 'Food safety, dengue prevention, & hydration calculators.',
      icon: BookOpen,
      color: 'bg-indigo-600 text-white hover:bg-indigo-500',
      badge: 'Educational'
    },
    {
      id: 'my-reports',
      title: 'My Anonymous Submissions',
      desc: 'View private local receipts and withdrawal options.',
      icon: Clock,
      color: 'bg-slate-700 text-white hover:bg-slate-800',
      badge: `${mySubmissions.length} Logged`
    },
    {
      id: 'privacy',
      title: 'Privacy & Consent Center',
      desc: 'Inspect zero-PII data policies and toggle preferences.',
      icon: Lock,
      color: 'bg-emerald-600 text-white hover:bg-emerald-500',
      badge: 'Zero-PII'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Top Header & Greeting */}
      <div className="bg-gradient-to-r from-teal-700 via-brand-700 to-mediblue-700 rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10 space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs border border-white/20">
            <span>🎓 Student Health Hub</span>
            <span>•</span>
            <span>{studentProfile.hostel}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            {greeting}, Student 👋
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Your anonymous health reports empower MediNova’s early-warning sentinel to protect fellow students from preventable outbreaks.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('report-symptoms')}
            className="px-5 py-3 rounded-2xl bg-white text-teal-900 font-extrabold text-xs sm:text-sm shadow-md hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
          >
            <FilePlus2 className="w-4 h-4 text-teal-600" />
            <span>Report Symptoms Now</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className="px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all border border-rose-400/40"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>Emergency 24x7</span>
          </button>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Campus Health Pulse */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Health Status</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <HeartPulse className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-900">Active Sentinel</span>
              <RiskBadge level={highRiskCount > 0 ? 'HIGH' : 'LOW'} size="sm" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {highRiskCount > 0 
                ? 'High-risk cluster flagged in Hostel A. Official inspection ongoing.' 
                : 'Campus health levels within normal seasonal baseline.'}
            </p>
          </div>
          <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-teal-600" />
            <span>Aggregated 48h rolling window</span>
          </div>
        </div>

        {/* Card 2: My Submissions */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">My Submissions</span>
            <span className="p-1.5 bg-teal-50 text-teal-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-slate-900 font-display">{mySubmissions.length}</span>
            <p className="text-[11px] text-slate-500 mt-1">
              Anonymous reports stored locally in private wallet
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('my-reports')}
            className="text-[11px] text-teal-600 hover:text-teal-700 font-bold border-t border-slate-100 pt-2 flex items-center justify-between"
          >
            <span>View timeline receipts</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3: Active Campus Alert */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Advisory</span>
            <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-xs font-bold text-rose-700 block truncate">
              Hostel A Gastro Alert
            </span>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug line-clamp-2">
              "Increase in stomach-related symptoms detected in Hostel A. Please maintain food and water hygiene."
            </p>
          </div>
          <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-2 flex items-center justify-between">
            <span>Issued by Health Centre</span>
            <span className="text-rose-600 font-bold">Important</span>
          </div>
        </div>

        {/* Card 4: Campus Health Centre */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Health Centre Status</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Open 24/7 • OPD Active</span>
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              Duty: Dr. Ramesh Sharma • 12 observation beds ready
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('healthcare')}
            className="text-[11px] text-mediblue-600 hover:text-mediblue-700 font-bold border-t border-slate-100 pt-2 flex items-center justify-between"
          >
            <span>View directory & emergency</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Main Student Actions Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-display font-extrabold text-slate-900">
            Student Health & Safety Actions
          </h2>
          <PrivacyShieldBadge size="xs" text="Encrypted & Anonymized" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={() => setActiveTab(action.id)}
                className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-0.5 ${
                  action.highlight ? 'ring-2 ring-teal-500/30' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${action.color} shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {action.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {action.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-teal-600 group-hover:text-teal-700">
                  <span>Open module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-Time Campus Advisory Notice Box */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-700 flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <h4 className="text-xs sm:text-sm font-extrabold text-amber-900">
            Campus Hygiene Reminder • Food & Water Safety
          </h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            "Increase in stomach-related symptoms detected in Hostel B & A. Please maintain food and water hygiene. Wash hands thoroughly before meals and consume water only from certified filter stations. Report any food or water odor immediately."
          </p>
          <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-bold text-amber-900">
            <button 
              onClick={() => setActiveTab('awareness')}
              className="underline hover:text-amber-950"
            >
              Read Food Safety Guide →
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveTab('campus-issues')}
              className="underline hover:text-amber-950"
            >
              Report Mess / Cooler Problem →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
