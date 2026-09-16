# 📱 MediNova — Mobile App & Installation Guide for SIH Judges

MediNova has been transformed into a **Progressive Web App (PWA) and Native Android App** format while retaining 100% of the original syndromic surveillance features, zero-PII privacy engine, Recharts analytics, and interactive campus risk maps.

---

## 🚀 3 Ways to Experience the App Format

### 1. 📲 1-Tap Install on Any Mobile Phone (Recommended for Judges)
Judges can install MediNova directly to their smartphone home screen in 5 seconds without visiting the Google Play Store or Apple App Store:

- **Android (Chrome / Edge / Brave / Samsung Internet)**:
  1. Open [https://medinovas.netlify.app/](https://medinovas.netlify.app/)
  2. Tap the floating **"Install MediNova App"** banner or tap browser menu `(⋮)` → **"Install App"** / **"Add to Home Screen"**.
  3. The app will install with its native icon, splash screen, and full-screen display (no browser URL bar).

- **iOS / iPhone (Safari)**:
  1. Open [https://medinovas.netlify.app/](https://medinovas.netlify.app/) in Safari.
  2. Tap the **Share** button (box with upward arrow) at the bottom.
  3. Scroll down and tap **"Add to Home Screen"** → Tap **"Add"**.
  4. Launch **MediNova** from your home screen just like a native iOS app.

---

### 2. 💻 Interactive Smartphone Simulator (For Desktop & Laptop Presentations)
When presenting to judges on a laptop or projector:
1. Open the website on your laptop.
2. Click the **"📱 App Mode"** button in the top navigation bar or the **"📱 Phone App View"** button on the landing page.
3. MediNova will render inside an interactive **iPhone 15 Pro / Pixel 8 smartphone frame** with:
   - Realistic phone chassis and side buttons
   - Dynamic Island / Notch and live clock/battery status bar
   - Native bottom navigation bar with haptic-like role switching
   - 1-click switcher back to full desktop view anytime

---

### 3. 🤖 Native Android `.apk` Build (Capacitor + Android Studio)
The codebase includes the complete native Android project in the `android/` directory.

#### To build a native Android APK:
```bash
# 1. Build the web distribution and sync assets with Android
npm run cap:build

# 2. Open the project in Android Studio
npx cap open android
```
- In Android Studio: Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**.
- The `.apk` file will be generated in `android/app/build/outputs/apk/debug/app-debug.apk`.
- You can install this `.apk` on any Android device via USB or by sharing the file.

---

## 🌟 Mobile App Format Features & Architecture

| Feature | Description | Status |
|---|---|---|
| **Mobile Bottom Bar** | Touch-optimized bottom navigation with role-specific tabs (Student, Official, Admin) and live badge counters. | ✅ Active |
| **PWA Web Manifest** | Configured for `standalone` display, `portrait-primary` orientation, `#0d9488` theme, and custom icons. | ✅ Active |
| **Service Worker** | Pre-caches offline assets, handles network fallbacks, and enables fast launch. | ✅ Active |
| **Emergency SOS Beacon** | 1-tap campus ambulance & health clinic quick-dial accessible from anywhere. | ✅ Active |
| **Zero-PII Privacy** | All symptom reports tokenized with anonymous cryptographic IDs before trend analysis. | ✅ Active |
| **Spatial Cluster Engine** | Rolling 48-hour syndromic surveillance detecting outbreaks across campus hostels. | ✅ Active |
| **Interactive Risk Map** | Live color-coded schematic of campus zones and hostels. | ✅ Active |

---

## 🛠️ Key Scripts Summary

| Command | Action |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Compile optimized production build into `dist/` |
| `npm run cap:build` | Build Vite project and synchronize with Android native assets |
| `npm run cap:open` | Open Android Studio project |
