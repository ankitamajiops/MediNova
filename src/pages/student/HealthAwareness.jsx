import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  Droplet, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Heart, 
  Clock, 
  ArrowRight,
  Thermometer,
  X
} from 'lucide-react';
import PrivacyShieldBadge from '../../components/common/PrivacyShieldBadge';

export const HealthAwareness = () => {
  const { healthArticles, addToast } = useApp();

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [weightKg, setWeightKg] = useState(65);
  const [activityMinutes, setActivityMinutes] = useState(30);

  // Daily water intake calculation: ~35ml/kg + 350ml per 30m of activity
  const recommendedLiters = ((weightKg * 35 + (activityMinutes / 30) * 350) / 1000).toFixed(1);
  const recommendedGlasses = Math.round(recommendedLiters * 4);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Student Health & Preventive Wellness
          </h1>
          <PrivacyShieldBadge text="Institutional Health Guides" />
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Practical medical guides, food safety checklists, seasonal illness advisories, and wellness calculators.
        </p>
      </div>

      {/* Interactive Tool: Campus Hydration Calculator */}
      <div className="bg-gradient-to-r from-teal-600 via-brand-600 to-mediblue-700 rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
              <Droplet className="w-3.5 h-3.5 text-cyan-200" />
              <span>Interactive Campus Health Tool</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              Daily Hydration & Electrolyte Calculator
            </h2>
            <p className="text-xs sm:text-sm text-teal-100">
              Proper hydration prevents seasonal fatigue, headaches, and reduces vulnerability to heat exhaustion.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[200px] w-full md:w-auto">
            <span className="text-xs font-bold text-teal-200 block uppercase tracking-wider">Your Recommended Target</span>
            <span className="text-3xl sm:text-4xl font-black text-white font-display mt-0.5 block">
              {recommendedLiters} <span className="text-lg font-bold">Liters</span>
            </span>
            <span className="text-[11px] text-teal-100 font-medium">approx. {recommendedGlasses} glasses / day</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/15">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span>Your Body Weight:</span>
              <span className="font-bold text-teal-200">{weightKg} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="110"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-300"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span>Daily Physical Activity / Sports:</span>
              <span className="font-bold text-teal-200">{activityMinutes} mins</span>
            </div>
            <input
              type="range"
              min="0"
              max="120"
              step="15"
              value={activityMinutes}
              onChange={(e) => setActivityMinutes(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-300"
            />
          </div>
        </div>
      </div>

      {/* Curated Health Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthArticles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md ${
                  art.badgeColor === 'rose' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  art.badgeColor === 'teal' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                  art.badgeColor === 'emerald' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {art.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.readTime}</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{art.summary}</p>

              {/* Key Bullet Points Preview */}
              <div className="mt-4 space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Key Action Points:</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {art.keyPoints.slice(0, 2).map((kp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setSelectedArticle(art)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Read Complete Health Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Medical Safety Disclaimer */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-center text-xs text-slate-600">
        ⚕️ <strong>Institutional Medical Disclaimer:</strong> The educational materials provided here are for general community health awareness only. For serious, worsening, or acute symptoms, always consult a qualified healthcare practitioner at the Campus Health Centre.
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5 animate-slide-up">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {selectedArticle.summary}
            </p>

            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Recommended Precautions & Medical Protocols:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedArticle.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              ⚠️ In case of high fever, persistent vomiting, or dehydration, visit the Health Centre (Building #8) immediately.
            </div>

            <button
              onClick={() => setSelectedArticle(null)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default HealthAwareness;
