import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  FilePlus2, 
  AlertOctagon, 
  PhoneCall, 
  ShieldCheck, 
  ShieldAlert, 
  BarChart3, 
  Map, 
  Layers, 
  Sliders, 
  Building, 
  Send, 
  History,
  Lock,
  Sparkles,
  Home
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { currentRole, activeTab, setActiveTab, clusterAnalysis, campusIssues, navigateToRole } = useApp();

  // If in landing or login, don't show the role bottom nav, show quick role switcher / home bar
  if (currentRole === 'landing' || currentRole === 'login') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 py-1.5 px-3 shadow-lg lg:hidden pb-safe">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => navigateToRole('landing')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              currentRole === 'landing' ? 'text-brand-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Overview</span>
          </button>

          <button
            onClick={() => navigateToRole('student', 'dashboard')}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 hover:text-teal-600 transition-all"
          >
            <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-0.5 font-bold text-xs">
              🎓
            </div>
            <span className="text-[10px] font-medium">Student App</span>
          </button>

          <button
            onClick={() => navigateToRole('official', 'dashboard')}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 hover:text-blue-600 transition-all"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-0.5 font-bold text-xs">
              🩺
            </div>
            <span className="text-[10px] font-medium">Official Hub</span>
          </button>

          <button
            onClick={() => navigateToRole('student', 'emergency')}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-rose-600 font-bold transition-all"
          >
            <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-0.5">
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <span className="text-[10px]">SOS</span>
          </button>
        </div>
      </nav>
    );
  }

  const openIssuesCount = campusIssues.filter(i => i.status === 'Open' || i.status === 'Under Investigation').length;
  const activeAlertsCount = (clusterAnalysis.alerts || []).length;

  // Student bottom nav items
  const studentTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'report-symptoms', label: 'Report', icon: FilePlus2, highlight: true },
    { id: 'campus-issues', label: 'Hygiene', icon: AlertOctagon },
    { id: 'emergency', label: 'SOS 24/7', icon: PhoneCall, isEmergency: true },
    { id: 'privacy', label: 'Privacy', icon: Lock }
  ];

  // Official bottom nav items
  const officialTabs = [
    { id: 'dashboard', label: 'Hub', icon: LayoutDashboard },
    { id: 'alerts', label: 'Alerts', icon: ShieldAlert, badge: activeAlertsCount > 0 ? activeAlertsCount : null, badgeColor: 'bg-rose-500 text-white' },
    { id: 'risk-map', label: 'Risk Map', icon: Map, badge: 'Live', badgeColor: 'bg-teal-500 text-white' },
    { id: 'analytics', label: 'Trends', icon: BarChart3 },
    { id: 'campus-issues-mgmt', label: 'Issues', icon: Layers, badge: openIssuesCount > 0 ? openIssuesCount : null }
  ];

  // Admin bottom nav items
  const adminTabs = [
    { id: 'dashboard', label: 'Admin', icon: LayoutDashboard },
    { id: 'thresholds', label: 'Thresholds', icon: Sliders },
    { id: 'zones', label: 'Zones', icon: Building },
    { id: 'broadcast', label: 'Broadcast', icon: Send },
    { id: 'audit', label: 'Audit', icon: History }
  ];

  let currentTabs = studentTabs;
  let activeThemeColor = 'text-teal-600';
  let activeBgColor = 'bg-teal-50 text-teal-700';

  if (currentRole === 'official') {
    currentTabs = officialTabs;
    activeThemeColor = 'text-mediblue-600';
    activeBgColor = 'bg-blue-50 text-blue-700';
  } else if (currentRole === 'admin') {
    currentTabs = adminTabs;
    activeThemeColor = 'text-purple-600';
    activeBgColor = 'bg-purple-50 text-purple-700';
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 py-1 px-2 shadow-2xl lg:hidden pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {currentTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.highlight) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative -top-3 flex flex-col items-center justify-center group focus:outline-hidden"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isActive 
                    ? 'bg-gradient-to-tr from-brand-600 to-teal-500 text-white ring-4 ring-teal-100' 
                    : 'bg-gradient-to-tr from-brand-600 to-brand-500 text-white group-hover:scale-105'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-700 mt-0.5">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all active:scale-95 focus:outline-hidden ${
                isActive 
                  ? `${activeBgColor} font-bold` 
                  : tab.isEmergency 
                    ? 'text-rose-600 font-semibold' 
                    : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${
                  isActive 
                    ? activeThemeColor 
                    : tab.isEmergency 
                      ? 'text-rose-600 animate-pulse' 
                      : 'text-slate-400'
                }`} />

                {tab.badge && (
                  <span className={`absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full text-[9px] font-extrabold flex items-center justify-center shadow-xs ${
                    tab.badgeColor || 'bg-rose-500 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] leading-tight truncate max-w-[62px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
