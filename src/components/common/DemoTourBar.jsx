import React, { useState } from 'react';
import { useApp, DEMO_STEPS } from '../../context/AppContext';
import { 
  PlayCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2, 
  CheckCircle2,
  Users,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const DemoTourBar = () => {
  const { 
    demoStepIndex, 
    startDemoTour, 
    nextDemoStep, 
    prevDemoStep, 
    exitDemoTour, 
    resetDemoData,
    currentRole,
    navigateToRole,
    isDemoBarOpen,
    setIsDemoBarOpen
  } = useApp();

  const [isMinimized, setIsMinimized] = useState(false);

  const activeStepObj = DEMO_STEPS.find(s => s.step === demoStepIndex);

  if (demoStepIndex === 0 && !isDemoBarOpen) {
    return (
      <button
        onClick={() => {
          setIsDemoBarOpen(true);
          startDemoTour(1);
        }}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-gradient-to-r from-teal-600 to-mediblue-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold text-xs border border-white/20 animate-pulse-subtle"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>Launch SIH 3-Min Demo Tour</span>
      </button>
    );
  }

  return (
    <aside 
      aria-label="Smart India Hackathon Presentation Controller"
      className="fixed bottom-3 left-3 right-3 md:left-6 md:right-6 z-40 transition-all transform pointer-events-auto"
    >
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 text-white rounded-2xl shadow-2xl p-3.5 md:p-4 transition-all">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2.5 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            <span className="font-bold text-xs md:text-sm tracking-wide bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              SIH 2024–25 Demo Mode
            </span>
            <span className="hidden sm:inline-block text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
              Campus Health Sentinel Pitch
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick role switcher pills */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => navigateToRole('student', 'dashboard')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                  currentRole === 'student' ? 'bg-teal-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎓 Student
              </button>
              <button
                onClick={() => navigateToRole('official', 'dashboard')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                  currentRole === 'official' ? 'bg-mediblue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                🩺 Health Official
              </button>
              <button
                onClick={() => navigateToRole('admin', 'dashboard')}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                  currentRole === 'admin' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                🛡️ Admin
              </button>
            </div>

            <button
              onClick={resetDemoData}
              title="Reset all reports and alerts to default SIH seed state"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Reset Seed Data</span>
            </button>

            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                exitDemoTour();
                setIsDemoBarOpen(false);
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Close demo bar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tour content */}
        {!isMinimized && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-teal-300 bg-teal-950/80 border border-teal-800 px-2 py-0.5 rounded-md">
                  Step {demoStepIndex > 0 ? demoStepIndex : 1} of {DEMO_STEPS.length}
                </span>
                <h4 className="text-xs md:text-sm font-semibold text-white truncate">
                  {activeStepObj ? activeStepObj.title : 'Interactive 3-Minute SIH Presentation Tour'}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                {activeStepObj 
                  ? activeStepObj.instruction 
                  : 'Click Next to step through student reporting, zero-PII aggregation, cluster detection, official alert investigation, and campus risk mapping.'}
              </p>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevDemoStep}
                  disabled={demoStepIndex <= 1}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1 border border-slate-700 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <select
                  value={demoStepIndex || 1}
                  onChange={(e) => startDemoTour(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-xl px-2 py-1.5 font-medium focus:outline-hidden focus:ring-1 focus:ring-teal-500 max-w-[150px] md:max-w-[200px]"
                >
                  {DEMO_STEPS.map(s => (
                    <option key={s.step} value={s.step}>
                      {s.step}. {s.title.replace(/^\d+\.\s*/, '')}
                    </option>
                  ))}
                </select>

                <button
                  onClick={nextDemoStep}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-mediblue-600 hover:from-teal-400 hover:to-mediblue-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md hover:shadow-teal-500/20 transition-all"
                >
                  <span>{demoStepIndex === DEMO_STEPS.length ? 'Finish Tour' : 'Next Step'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DemoTourBar;
