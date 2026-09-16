import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ShieldCheck, Heart, ExternalLink, Award } from 'lucide-react';

export const Footer = () => {
  const { navigateToRole } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-white font-display font-extrabold text-base tracking-tight">
                Medi<span className="text-teal-400">Nova</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Campus Health Sentinel: A Privacy-Preserving Community Health Early Warning System for College Campuses.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[11px] text-teal-300 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Smart India Hackathon Prototype</span>
            </div>
          </div>

          {/* Col 2: Architecture & Workflow */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Detection Workflow</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>1. Anonymous Symptom Reporting</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>2. Zero-PII Aggregation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>3. Syndromic Cluster Detection</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>4. Explainable Official Alerts</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>5. Proactive Campus Containment</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Portals & Tools</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => navigateToRole('student', 'dashboard')} className="hover:text-teal-400 transition-colors">
                  Student Portal & Health Report
                </button>
              </li>
              <li>
                <button onClick={() => navigateToRole('official', 'dashboard')} className="hover:text-teal-400 transition-colors">
                  Health Official Surveillance Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigateToRole('official', 'risk-map')} className="hover:text-teal-400 transition-colors">
                  Campus Health Risk Map
                </button>
              </li>
              <li>
                <button onClick={() => navigateToRole('student', 'emergency')} className="hover:text-rose-400 transition-colors">
                  Emergency Medical Hotlines
                </button>
              </li>
              <li>
                <button onClick={() => navigateToRole('student', 'privacy')} className="hover:text-teal-400 transition-colors">
                  Privacy Center & Consent Policies
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Disclaimer */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Medical Safety Notice</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              MediNova is an early-warning and community health trend surveillance platform, <strong className="text-slate-300">not a diagnostic medical device</strong>. Risk levels indicate statistical clusters requiring official institutional verification.
            </p>
            <p className="text-[11px] text-slate-400">
              In clinical emergencies, always consult qualified healthcare professionals or call campus ambulance services directly.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2024–2026 MediNova Team. Built for Smart India Hackathon (SIH).</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateToRole('student', 'privacy')} className="hover:text-slate-300 transition-colors">
              Zero-PII Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => navigateToRole('student', 'emergency')} className="hover:text-rose-400 transition-colors">
              Campus Emergency (24x7)
            </button>
            <span>•</span>
            <span className="text-slate-400">Build v1.0.4-SIH-PROTOTYPE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
