import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  FilePlus2, 
  AlertOctagon, 
  MapPin, 
  PhoneCall, 
  BookOpen, 
  Clock, 
  Lock, 
  UserCheck, 
  ShieldAlert, 
  BarChart3, 
  Map, 
  TrendingUp, 
  Sliders, 
  Building, 
  Send, 
  History,
  HeartPulse,
  Sparkles,
  Layers,
  HelpCircle,
  X
} from 'lucide-react';
import PrivacyShieldBadge from './PrivacyShieldBadge';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { currentRole, activeTab, setActiveTab, clusterAnalysis, campusIssues } = useApp();

  const openIssuesCount = campusIssues.filter(i => i.status === 'Open' || i.status === 'Under Investigation').length;
  const activeAlertsCount = (clusterAnalysis.alerts || []).length;

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'report-symptoms', label: 'Report Symptoms', icon: FilePlus2, highlight: true },
    { id: 'campus-issues', label: 'Campus Hygiene Issues', icon: AlertOctagon, badge: null },
    { id: 'healthcare', label: 'Find Healthcare', icon: MapPin, badge: null },
    { id: 'emergency', label: 'Emergency Help', icon: PhoneCall, alertBadge: '24/7' },
    { id: 'awareness', label: 'Health Awareness', icon: BookOpen, badge: null },
    { id: 'my-reports', label: 'My Submissions', icon: Clock, badge: null },
    { id: 'privacy', label: 'Privacy Center', icon: Lock, badge: 'Protected' },
    { id: 'parent-contact', label: 'Parent Emergency', icon: UserCheck, badge: null },
  ];

  const officialNavItems = [
    { id: 'dashboard', label: 'Surveillance Hub', icon: LayoutDashboard, badge: null },
    { id: 'alerts', label: 'Explainable Alerts', icon: ShieldAlert, badge: activeAlertsCount > 0 ? `${activeAlertsCount} Active` : null, badgeColor: 'bg-rose-500 text-white' },
    { id: 'analytics', label: 'Analytics & Recharts', icon: BarChart3, badge: null },
    { id: 'risk-map', label: 'Campus Risk Map', icon: Map, badge: 'Live', badgeColor: 'bg-teal-500 text-white' },
    { id: 'trends', label: 'Symptom Trends', icon: TrendingUp, badge: null },
    { id: 'campus-issues-mgmt', label: 'Campus Issues Review', icon: Layers, badge: openIssuesCount > 0 ? `${openIssuesCount}` : null },
    { id: 'settings', label: 'Protocol Thresholds', icon: Sliders, badge: null },
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Admin Hub', icon: LayoutDashboard, badge: null },
    { id: 'thresholds', label: 'Threshold Tuning', icon: Sliders, badge: 'Config' },
    { id: 'zones', label: 'Campus Zones & Facilities', icon: Building, badge: null },
    { id: 'broadcast', label: 'Broadcast Advisory', icon: Send, badge: null },
    { id: 'audit', label: 'Privacy & Audit Trail', icon: History, badge: 'Verified' },
  ];

  let navItems = studentNavItems;
  if (currentRole === 'official') navItems = officialNavItems;
  if (currentRole === 'admin') navItems = adminNavItems;

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 
        flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Role Header Banner */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Active Environment
            </span>
            <h3 className="text-xs font-bold text-slate-800 capitalize flex items-center gap-1.5 mt-0.5">
              {currentRole === 'student' && <span className="text-teal-600 font-bold">🎓 Student Portal</span>}
              {currentRole === 'official' && <span className="text-mediblue-600 font-bold">🩺 Health Official</span>}
              {currentRole === 'admin' && <span className="text-purple-600 font-bold">🛡️ Platform Admin</span>}
            </h3>
          </div>
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? currentRole === 'student'
                      ? 'bg-teal-50 text-teal-800 shadow-xs border border-teal-200/80 font-bold'
                      : currentRole === 'official'
                        ? 'bg-blue-50 text-blue-800 shadow-xs border border-blue-200/80 font-bold'
                        : 'bg-purple-50 text-purple-800 shadow-xs border border-purple-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${
                    isActive 
                      ? currentRole === 'student' ? 'text-teal-600' : currentRole === 'official' ? 'text-mediblue-600' : 'text-purple-600'
                      : 'text-slate-400'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.alertBadge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200">
                    {item.alertBadge}
                  </span>
                )}

                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    item.badgeColor || 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Privacy Status Card */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50/50 space-y-2">
          <PrivacyShieldBadge size="xs" text="Zero PII • Aggregated Analytics" />
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500 leading-relaxed shadow-2xs">
            <span className="font-semibold text-slate-700 block mb-0.5">Campus Sentinel Engine</span>
            Rule-based early cluster detection active on rolling 48-hour windows.
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
