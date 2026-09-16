import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  ShieldCheck, 
  Lock, 
  User, 
  Key, 
  ArrowRight, 
  CheckCircle2,
  Stethoscope,
  Shield,
  Building2,
  AlertCircle
} from 'lucide-react';
import PrivacyShieldBadge from '../components/common/PrivacyShieldBadge';

export const LoginPage = () => {
  const { navigateToRole, addToast } = useApp();

  const [selectedRole, setSelectedRole] = useState('student');
  const [collegeId, setCollegeId] = useState('STU2024-8841');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const demoAccounts = {
    student: {
      id: 'STU2024-8841',
      name: 'Aditya Roy',
      title: 'Undergraduate Student (Hostel A)',
      badge: 'Student Portal Access',
      color: 'border-teal-500 bg-teal-50/50 text-teal-800'
    },
    official: {
      id: 'MED-OFFICER-01',
      name: 'Dr. Ramesh Sharma',
      title: 'Chief Medical Officer',
      badge: 'Surveillance & Alert Access',
      color: 'border-blue-500 bg-blue-50/50 text-blue-800'
    },
    admin: {
      id: 'ADMIN-ROOT',
      name: 'Prof. Alok Gupta',
      title: 'Dean of Student Affairs',
      badge: 'Platform Administration',
      color: 'border-purple-500 bg-purple-50/50 text-purple-800'
    }
  };

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setCollegeId(demoAccounts[roleKey].id);
    setPassword('••••••••••••');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!collegeId.trim()) {
      addToast('Please enter your College ID', 'error');
      return;
    }
    addToast(`Authenticated successfully as ${demoAccounts[selectedRole].name}`, 'success');
    navigateToRole(selectedRole, 'dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-teal-50/40 via-slate-50 to-white">
      <div className="w-full max-w-xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-mediblue-600 text-white shadow-soft mx-auto">
            <Activity className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Institutional Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            MediNova Campus Health Sentinel — Smart India Hackathon Prototype
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft-lg space-y-6">
          
          {/* Role selector chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Demo Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'student'
                    ? 'border-teal-600 bg-teal-50 text-teal-800 ring-2 ring-teal-600/20 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4 text-teal-600" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('official')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'official'
                    ? 'border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-600/20 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-mediblue-600" />
                <span>Health Official</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  selectedRole === 'admin'
                    ? 'border-purple-600 bg-purple-50 text-purple-800 ring-2 ring-purple-600/20 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Administrator</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Pre-fill card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800">{demoAccounts[selectedRole].name}</p>
              <p className="text-[11px] text-slate-500">{demoAccounts[selectedRole].title} • {demoAccounts[selectedRole].id}</p>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-1 rounded bg-white border border-slate-200 text-slate-600 shadow-2xs">
              Demo Mode Active
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College ID / Institutional Roll Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  placeholder="e.g. STU2024-8841"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-800 font-medium"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your institutional password"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-800 font-medium"
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-teal-600 hover:underline cursor-pointer">
                Institutional SSO help?
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-mediblue-600 hover:from-teal-500 hover:to-mediblue-500 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Authenticate & Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Privacy Guarantee Statement */}
          <div className="pt-2 text-center space-y-2 border-t border-slate-100">
            <PrivacyShieldBadge text="Your health information is protected • Zero PII Leakage" />
            <p className="text-[11px] text-slate-400">
              Institutional single sign-on prototype with zero tracking of personal health consultations.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;
