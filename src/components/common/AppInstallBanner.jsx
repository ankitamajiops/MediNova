import React, { useState, useEffect } from 'react';
import { 
  Download, 
  X, 
  Smartphone, 
  Share2, 
  PlusSquare, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const AppInstallBanner = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA / App mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone || 
                         document.referrer.includes('android-app://');

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt event (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Auto-show unobtrusive mini-banner on mobile web after 3 seconds if not dismissed
      const dismissed = localStorage.getItem('medinova_pwa_banner_dismissed');
      if (!dismissed) {
        setTimeout(() => setIsBannerVisible(true), 2500);
      }
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsBannerVisible(false);
      console.log('[MediNova PWA] App was installed successfully');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('[MediNova PWA] User accepted the install prompt');
        setIsInstalled(true);
        setIsBannerVisible(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      // Show iOS modal guide
      if (onClose) {
        // will keep modal open for iOS instructions
      }
    } else {
      // Fallback: alert instructions
      alert('To install MediNova:\n1. Tap the browser menu (⋮ or Share icon)\n2. Select "Install App" or "Add to Home Screen"');
    }
  };

  const handleDismissBanner = () => {
    setIsBannerVisible(false);
    localStorage.setItem('medinova_pwa_banner_dismissed', 'true');
    if (onClose) onClose();
  };

  // If already installed, don't show prompt
  if (isInstalled) return null;

  return (
    <>
      {/* Floating Bottom / Top Install Callout on Mobile Browsers */}
      {isBannerVisible && !isOpen && (
        <div className="fixed top-18 left-3 right-3 z-50 sm:left-auto sm:right-6 sm:max-w-md animate-slide-down">
          <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-teal-400 p-0.5 flex-shrink-0 flex items-center justify-center text-white shadow-xs">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Install MediNova App</span>
                  <span className="text-[9px] bg-teal-500/30 text-teal-300 font-extrabold px-1.5 py-0.2 rounded border border-teal-500/40">
                    PWA
                  </span>
                </p>
                <p className="text-[11px] text-slate-300 leading-tight">
                  Instant 1-tap mobile install for SIH judges
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleInstallClick}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
              <button
                onClick={handleDismissBanner}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explicit Modal Dialog when user or judge clicks "Install App" in Navbar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-scale-up">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-mediblue-600 mx-auto flex items-center justify-center text-white shadow-soft mb-3">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-slate-900">
                Install MediNova Mobile App
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Zero app-store friction • Works offline • Full-screen native experience
              </p>
            </div>

            {/* Highlights */}
            <div className="py-4 space-y-2.5">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-teal-50/70 border border-teal-100 text-xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-teal-900 block">1-Tap Fast Launch</span>
                  <span className="text-teal-700 text-[11px]">Instant home screen shortcut with native app icon and splash screen.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs">
                <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-900 block">Offline Cache & Emergency SOS</span>
                  <span className="text-blue-700 text-[11px]">Fast local loading and emergency ambulance beacons even with unstable campus Wi-Fi.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-xs">
                <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-purple-900 block">Zero-PII Privacy Protection</span>
                  <span className="text-purple-700 text-[11px]">Encrypted client storage with tokenized anonymous syndromic surveillance.</span>
                </div>
              </div>
            </div>

            {/* Instructions based on OS */}
            {isIOS ? (
              <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-700">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🍎 iOS / Safari Installation:</span>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600">
                  <li>Tap the <Share2 className="w-3.5 h-3.5 inline text-blue-600" /> <b>Share</b> button in Safari toolbar.</li>
                  <li>Scroll down and tap <PlusSquare className="w-3.5 h-3.5 inline text-slate-700" /> <b>"Add to Home Screen"</b>.</li>
                  <li>Tap <b>Add</b> in the top right corner.</li>
                </ol>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3 px-4 bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-700 hover:to-teal-600 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{deferredPrompt ? 'Add App to Home Screen Now' : 'Install MediNova App'}</span>
                </button>
                <p className="text-[11px] text-center text-slate-400">
                  Supported on Chrome, Edge, Safari, Brave, Samsung Internet & Android OS
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AppInstallBanner;
