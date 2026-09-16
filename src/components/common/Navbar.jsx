import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  ShieldCheck, 
  Bell, 
  PhoneCall, 
  User, 
  LogOut, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown,
  Building2,
  Stethoscope,
  Shield,
  HelpCircle,
  Smartphone,
  Monitor,
  Download
} from 'lucide-react';
import NotificationPanel from './NotificationPanel';

export const Navbar = ({ onToggleMobileSidebar }) => {
  const { 
    currentRole, 
    setCurrentRole, 
    navigateToRole, 
    userProfiles, 
    notifications, 
    startDemoTour,
    clusterAnalysis,
    isAppSimulatorMode,
    setIsAppSimulatorMode,
    setIsInstallModalOpen
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);


  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const highRiskCount = clusterAnalysis.highRiskZonesCount || 0;

  const currentProfile = userProfiles[currentRole] || {
    name: 'Guest User',
    role: 'Visitor',
    avatar: 'GU'
  };

  const getRoleLabel = () => {
    if (currentRole === 'student') return { label: 'Student Portal', color: 'bg-teal-50 text-teal-700 border-teal-200' };
    if (currentRole === 'official') return { label: 'Health Official', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    if (currentRole === 'admin') return { label: 'Administrator', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    return { label: 'Public View', color: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  const roleInfo = getRoleLabel();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Top Emergency Advisory Bar if high risk cluster is active */}
        {highRiskCount > 0 && currentRole !== 'landing' && (
          <div className="bg-rose-600 text-white text-xs font-semibold px-4 py-1.5 flex items-center justify-between transition-all">
            <div className="flex items-center gap-2 max-w-4xl mx-auto text-center truncate">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="font-bold uppercase tracking-wider bg-rose-700/80 px-1.5 py-0.5 rounded text-[10px]">
                Active Campus Alert
              </span>
              <span className="truncate">
                Hostel A: Gastrointestinal cluster under investigation. Maintain water & food hygiene.
              </span>
            </div>
            {currentRole === 'official' && (
              <button 
                onClick={() => navigateToRole('official', 'alerts')}
                className="underline hover:text-rose-100 text-[11px] font-bold whitespace-nowrap ml-2"
              >
                Inspect Alert →
              </button>
            )}
          </div>
        )}

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Mobile Menu Toggle & Brand */}
            <div className="flex items-center gap-3">
              {currentRole !== 'landing' && currentRole !== 'login' && (
                <button
                  onClick={onToggleMobileSidebar}
                  className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
                  aria-label="Toggle Navigation"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              <button 
                onClick={() => navigateToRole('landing')}
                className="flex items-center gap-2.5 group text-left focus:outline-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-mediblue-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-all">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold text-lg text-slate-900 tracking-tight">
                      Medi<span className="text-brand-600">Nova</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-1.5 py-0.2 rounded-md border border-brand-200">
                      SIH 2024–25
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                    Campus Health Sentinel
                  </p>
                </div>
              </button>
            </div>

            {/* Middle: Quick Role Navigator (visible if not on landing) */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => navigateToRole('landing')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  currentRole === 'landing' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateToRole('student', 'dashboard')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentRole === 'student' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🎓 Student</span>
              </button>
              <button
                onClick={() => navigateToRole('official', 'dashboard')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentRole === 'official' ? 'bg-mediblue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🩺 Health Official</span>
              </button>
              <button
                onClick={() => navigateToRole('admin', 'dashboard')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  currentRole === 'admin' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🛡️ Admin</span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Desktop / App Mode Switcher (Visible on desktop) */}
              <button
                onClick={() => setIsAppSimulatorMode(!isAppSimulatorMode)}
                className={`hidden md:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                  isAppSimulatorMode
                    ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title="Toggle Smartphone Simulator Mode for SIH Judges"
              >
                <Smartphone className="w-3.5 h-3.5 text-teal-300" />
                <span>{isAppSimulatorMode ? 'App Frame' : 'App Mode'}</span>
              </button>

              {/* Install App Quick Launcher */}
              <button
                onClick={() => setIsInstallModalOpen(true)}
                className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 px-2.5 py-1.5 rounded-xl transition-all"
                title="Install Progressive Web App on Mobile or Desktop"
              >
                <Download className="w-3.5 h-3.5 text-teal-600" />
                <span>Install App</span>
              </button>

              {/* SIH Demo Tour Launcher */}
              <button
                onClick={() => startDemoTour(1)}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-1.5 rounded-xl shadow-xs transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-100" />
                <span>SIH Demo Pitch</span>
              </button>

              {/* Emergency Quick Link */}
              <button
                onClick={() => navigateToRole('student', 'emergency')}
                className="flex items-center gap-1.5 text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-xl transition-all"
                title="Immediate Campus Emergency Assistance"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                <span className="hidden sm:inline">Emergency</span>
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                title="Campus Health Advisories & Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* User / Role Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all text-left"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-mediblue-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentProfile.avatar}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">{currentProfile.name}</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{roleInfo.label}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-slide-up">
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed In As</p>
                      <p className="text-sm font-bold text-slate-900">{currentProfile.name}</p>
                      <p className="text-xs text-slate-500">{currentProfile.id || currentProfile.role}</p>
                    </div>

                    <div className="py-1">
                      <p className="px-4 py-1 text-[11px] font-semibold text-slate-400 uppercase">Switch Active Role</p>
                      <button
                        onClick={() => {
                          navigateToRole('student', 'dashboard');
                          setIsProfileMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center gap-2 hover:bg-slate-50 ${
                          currentRole === 'student' ? 'text-brand-600 font-bold bg-brand-50/50' : 'text-slate-700'
                        }`}
                      >
                        <User className="w-4 h-4 text-teal-600" />
                        <span>Student Portal (Aditya Roy)</span>
                      </button>

                      <button
                        onClick={() => {
                          navigateToRole('official', 'dashboard');
                          setIsProfileMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center gap-2 hover:bg-slate-50 ${
                          currentRole === 'official' ? 'text-mediblue-600 font-bold bg-blue-50/50' : 'text-slate-700'
                        }`}
                      >
                        <Stethoscope className="w-4 h-4 text-mediblue-600" />
                        <span>Health Official (Dr. Ramesh Sharma)</span>
                      </button>

                      <button
                        onClick={() => {
                          navigateToRole('admin', 'dashboard');
                          setIsProfileMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center gap-2 hover:bg-slate-50 ${
                          currentRole === 'admin' ? 'text-purple-600 font-bold bg-purple-50/50' : 'text-slate-700'
                        }`}
                      >
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span>Platform Administrator</span>
                      </button>
                    </div>

                    {/* App Actions in Profile */}
                    <div className="border-t border-slate-100 py-1 bg-teal-50/30">
                      <button
                        onClick={() => {
                          setIsInstallModalOpen(true);
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-teal-700 hover:bg-teal-50 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4 text-teal-600" />
                        <span>Install MediNova PWA App</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsAppSimulatorMode(!isAppSimulatorMode);
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Smartphone className="w-4 h-4 text-slate-600" />
                        <span>{isAppSimulatorMode ? 'Exit Phone Simulator' : 'Open Phone Simulator'}</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          navigateToRole('login');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-slate-400" />
                        <span>Change Login / Role Switcher</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Notification Drawer */}
      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};

export default Navbar;
