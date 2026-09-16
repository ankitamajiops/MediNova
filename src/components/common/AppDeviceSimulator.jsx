import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Monitor, 
  RotateCcw, 
  Wifi, 
  Battery, 
  Signal, 
  QrCode, 
  Download, 
  ExternalLink,
  Sparkles,
  Info,
  X,
  ChevronDown
} from 'lucide-react';

export const AppDeviceSimulator = ({ children, onExitAppMode, onOpenInstallModal }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [deviceModel, setDeviceModel] = useState('iphone'); // 'iphone' | 'pixel' | 'compact'
  const [scale, setScale] = useState(1);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Set device frame dimensions
  let frameWidth = 'max-w-[412px]';
  let frameHeight = 'h-[860px]';
  let frameBorderRadius = 'rounded-[50px]';

  if (deviceModel === 'iphone') {
    frameWidth = 'max-w-[400px]';
    frameHeight = 'h-[850px]';
    frameBorderRadius = 'rounded-[52px]';
  } else if (deviceModel === 'pixel') {
    frameWidth = 'max-w-[412px]';
    frameHeight = 'h-[870px]';
    frameBorderRadius = 'rounded-[46px]';
  } else if (deviceModel === 'compact') {
    frameWidth = 'max-w-[375px]';
    frameHeight = 'h-[780px]';
    frameBorderRadius = 'rounded-[44px]';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 py-6 px-3 flex flex-col items-center justify-start text-white">
      
      {/* Top Judges Toolbar Ribbon */}
      <div className="w-full max-w-5xl mb-5 flex flex-wrap items-center justify-between gap-3 bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 px-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1.5 rounded-xl text-xs font-bold">
            <Smartphone className="w-4 h-4 text-teal-400" />
            <span>SIH Mobile App Presentation Mode</span>
          </div>
          <span className="hidden md:inline-block text-xs text-slate-400">
            Interactive phone simulator for judges
          </span>
        </div>

        {/* Center: Device Select & Scale */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900/90 rounded-xl p-1 border border-slate-700 flex items-center gap-1 text-xs">
            <button
              onClick={() => setDeviceModel('iphone')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                deviceModel === 'iphone' ? 'bg-brand-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              iPhone 15 Pro
            </button>
            <button
              onClick={() => setDeviceModel('pixel')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                deviceModel === 'pixel' ? 'bg-brand-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pixel 8
            </button>
            <button
              onClick={() => setDeviceModel('compact')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                deviceModel === 'compact' ? 'bg-brand-600 text-white font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Compact
            </button>
          </div>
        </div>

        {/* Right Actions: QR Code / Install / Exit to Desktop */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-xl transition-all"
            title="Scan QR to open on phone"
          >
            <QrCode className="w-3.5 h-3.5 text-teal-300" />
            <span className="hidden sm:inline">Phone QR</span>
          </button>

          <button
            onClick={onOpenInstallModal}
            className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-xl shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>

          <button
            onClick={onExitAppMode}
            className="flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl shadow-xs transition-all"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop View</span>
          </button>
        </div>
      </div>

      {/* Main Smartphone Bezel Frame */}
      <div className="relative flex justify-center w-full">
        
        {/* Hardware Mockup Outer Shell */}
        <div 
          className={`
            relative w-full ${frameWidth} ${frameHeight} ${frameBorderRadius}
            bg-slate-950 p-[11px] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)]
            ring-1 ring-slate-800 transition-all duration-300 flex flex-col
          `}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        >
          {/* Side Hardware Buttons (Mock) */}
          <div className="absolute -left-[14px] top-[120px] w-[3px] h-[32px] bg-slate-700 rounded-l-md" />
          <div className="absolute -left-[14px] top-[165px] w-[3px] h-[55px] bg-slate-700 rounded-l-md" />
          <div className="absolute -left-[14px] top-[230px] w-[3px] h-[55px] bg-slate-700 rounded-l-md" />
          <div className="absolute -right-[14px] top-[170px] w-[3px] h-[75px] bg-slate-700 rounded-r-md" />

          {/* Inner Screen Container */}
          <div className="relative w-full h-full bg-slate-50 rounded-[42px] overflow-hidden flex flex-col text-slate-800 shadow-inner">
            
            {/* Top iOS / Android Status Bar */}
            <div className="h-10 bg-slate-900 text-white px-6 flex items-center justify-between z-50 flex-shrink-0 select-none">
              {/* Clock */}
              <span className="text-[12px] font-bold tracking-tight text-slate-200">
                {currentTime || '9:41'}
              </span>

              {/* Dynamic Island / Notch */}
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-slate-200">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Scrollable App Application Canvas */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col pb-20 custom-app-scroll bg-slate-50">
              {children}
            </div>

            {/* Bottom iOS Home Bar Indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400/80 rounded-full z-50 pointer-events-none" />

          </div>
        </div>

      </div>

      {/* QR Code Presentation Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-center text-white relative shadow-2xl animate-scale-up">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="font-display font-extrabold text-lg text-white">
              Open App on Your Phone
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Scan with your phone camera or visit link in mobile browser:
            </p>

            {/* Simulated Clean SVG QR Code */}
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto mb-4 shadow-md">
              <div className="w-44 h-44 flex flex-col items-center justify-center text-slate-900 border border-slate-200 rounded-xl bg-slate-50 p-2">
                <Smartphone className="w-10 h-10 text-brand-600 mb-2" />
                <span className="text-[11px] font-bold text-brand-700 text-center">
                  medinovas.netlify.app
                </span>
                <span className="text-[10px] text-slate-500 text-center mt-1">
                  1-Tap PWA Install on Mobile
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="https://medinovas.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Visit https://medinovas.netlify.app/</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AppDeviceSimulator;
