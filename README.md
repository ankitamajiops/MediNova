# 🏥 MediNova — Campus Health Sentinel
### *A Privacy-Preserving Community Health Early Warning System for College Campuses*
**Smart India Hackathon (SIH) Prototype**

---

## 🌟 Overview & Core Idea
College hostels and university campuses frequently experience preventable spikes in food-borne gastroenteritis, seasonal viral influenza, and dengue infections. Due to social stigma and fear of quarantine isolation, students often avoid visiting clinics until symptoms become severe.

**MediNova: Campus Health Sentinel** solves this challenge by enabling students to securely and anonymously log symptoms. The platform aggregates syndromic data across rolling 48-hour windows by hostel block. When anomalous spatial concentrations are detected, the system triggers **Explainable Early-Warning Alerts** for college health officials with **Zero PII (Personally Identifiable Information) leakage**.

---

## 🚀 Quick Start & How to Run

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Launch
```bash
# 1. Open the project folder
cd MediNova

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev
```

The application will be live at `http://localhost:3000` (or `http://localhost:5173`).

---

## 🔑 Demo Login Credentials (1-Click Auto-Fill Available)

| Role | Demo ID | Password | Access & Responsibilities |
|---|---|---|---|
| **🎓 Student** | `STU2024-8841` | *(Any / Demo)* | Anonymous symptom reporting, hygiene tickets, healthcare locator, 24/7 SOS emergency beacon, privacy center |
| **🩺 Health Official** | `MED-OFFICER-01` | *(Any / Demo)* | Real-time syndromic surveillance, explainable high-risk alerts, campus risk map, Recharts analytics |
| **🛡️ Administrator** | `ADMIN-ROOT` | *(Any / Demo)* | Cluster threshold & sensitivity tuning sliders, campus broadcast notifications, immutable audit log |

*(Tip: On the Institutional Sign-In page or top navigation, click on any role chip for instantaneous 1-click access without manual typing).*

---

## 📋 12-Step SIH 3-Minute Presentation Demo Flow

MediNova includes a dedicated, persistent **SIH Demo Tour Bar** at the bottom of the screen to guide judges through the complete end-to-end loop:

1. **Launch**: Click `"Launch SIH Demo Pitch"` or step through using the bottom tour bar.
2. **Step 1 — Student Login**: Enter as student (`STU2024-8841`).
3. **Step 2 — Student Dashboard**: Observe active campus advisory for Hostel B without any student identities exposed.
4. **Step 3 — Symptom Report**: Open Anonymous Health Report and log Fever + Vomiting in Hostel A with mandatory consent.
5. **Step 4 — Anonymization Token**: Observe the generated cryptographic token (`#ANON-8F29A`) and zero-PII confirmation receipt.
6. **Step 5 — 1-Click Role Switch**: Switch to Health Official (`Dr. Ramesh Sharma`).
7. **Step 6 — Live KPI Update**: Watch Today's Report counter update in real-time.
8. **Step 7 — High-Risk Cluster Alert**: Inspect the High-Risk Food-Borne Illness Alert flagged for Hostel A (92% confidence).
9. **Step 8 — Explainable AI Rationale**: Review the plain-English explanation (*"20 similar gastrointestinal symptom reports recorded from Hostel A within 48 hours"*) and actionable containment checklist.
10. **Step 9 — Interactive Risk Map**: Explore the color-coded campus map (Hostel A 🔴, Hostel B 🟡, Hostel C 🟢).
11. **Step 10 — Healthcare Discovery & Emergency SOS**: Demonstrate 1-tap campus ambulance dispatch and clinic directory.
12. **Step 11 — Privacy Center & k-Anonymity**: Review consent management and zero-PII guarantee.
13. **Step 12 — 1-Click Reset**: Click `"Reset Seed Data"` anytime to restore default demo state.

---

## ⚙️ Key Technical Features & Algorithms

### 1. ⚡ Rule-Based Cluster Detection Engine (`src/services/clusterDetection.js`)
- **Temporal Grouping**: Rolling 48-hour window ($\Delta t = 48\text{h}$).
- **Spatial Aggregation**: Grouped by hostel/zone (Hostel A, Hostel B, Cafeteria, etc.).
- **Syndromic Pattern Matching**: Evaluates co-occurrence across 4 syndromes (Food-Borne GI, Respiratory Flu, Vector-Borne Dengue, Contact Dermatitis).
- **Threshold Rules**:
  - $\ge 10$ reports in 48h $\rightarrow$ **HIGH RISK** (Confidence $\ge 90\%$)
  - $5 \text{ to } 9$ reports in 48h $\rightarrow$ **MODERATE RISK** (Confidence $70-89\%$)
  - $< 5$ reports $\rightarrow$ **LOW RISK** (Baseline)
- **Configurable Sensitivities**: Parameters can be tuned in real time by Administrators via the Admin Dashboard.

### 2. 🛡️ Privacy by Design (Zero-PII)
- Zero student names, room numbers, or phone numbers are shared to public or health surveillance dashboards.
- Reports receive salted one-way anonymous tokens.
- Complete student consent control with data withdrawal capabilities.

### 3. 📊 Responsive Visualizations (Recharts)
- Daily Symptom Reports Area Chart with Outbreak Threshold line.
- Symptom Frequency Distribution Bar Chart (Fever, Vomiting, Stomach Pain, Cough, etc.).
- Hostel-wise Spatial Concentration Bar Chart.
- Weekly 7-Day Moving Average Line Chart.

### 4. 🗺️ Campus Health Risk Map
- Color-coded interactive campus schematic.
- Building popup inspectors with localized symptom breakdowns and 1-tap area advisory broadcasting.

### 5. 🚨 Emergency Medical Hub
- 1-tap SOS Emergency Beacon simulating instant campus ambulance and EMT dispatch.
- Campus clinic 24/7 direct desk, duty medical officer directory, and GPS navigation assistant.

---

## 📁 Project Structure

```
MediNova/
├── index.html                           # App entry point, meta tags, Inter/Plus Jakarta Sans fonts
├── package.json                         # React 18, Vite, Lucide-React, Recharts, Tailwind CSS
├── vite.config.js                       # Vite server configuration
├── tailwind.config.js                   # Healthcare color palette (Teal, Medical Blue, Risk colors)
├── postcss.config.js                    # PostCSS configuration
├── README.md                            # Complete SIH project documentation
└── src/
    ├── main.jsx                         # React DOM mount with AppProvider
    ├── App.jsx                          # Role-based router, navigation, toast & demo tour container
    ├── index.css                        # Design tokens, typography, radar pulse animations
    ├── context/
    │   └── AppContext.jsx               # Global state, localStorage persistence, cluster analysis, toasts
    ├── data/
    │   ├── mockData.js                  # Seed dataset: 20-report Hostel A cluster, facilities, hotlines
    │   └── campusLocations.js           # Campus building profiles, zones, wardens, capacities
    ├── services/
    │   └── clusterDetection.js          # Rule-based cluster detection & explainable rationale generator
    ├── components/
    │   └── common/
    │       ├── Navbar.jsx               # Header with role indicator, emergency button, notifications
    │       ├── Sidebar.jsx              # Role-tailored responsive sidebar navigation
    │       ├── Footer.jsx               # SIH disclaimers, medical safety notices, quick links
    │       ├── RiskBadge.jsx            # 🟢 Low / 🟡 Moderate / 🔴 High animated risk badges
    │       ├── NotificationPanel.jsx    # Popover drawer for campus health advisories
    │       ├── DemoTourBar.jsx          # 12-step guided SIH presentation tour toolbar
    │       ├── PrivacyShieldBadge.jsx   # Visual zero-PII privacy guarantee badge
    │       └── Toast.jsx                # Toast feedback system
    └── pages/
        ├── LandingPage.jsx              # Hero, REPORT→ACT workflow visualizer, live simulator, FAQ
        ├── LoginPage.jsx                # 1-click demo role switcher with institutional styling
        ├── student/
        │   ├── StudentDashboard.jsx     # Greeting, campus health status, advisory notice, quick actions
        │   ├── SymptomReportForm.jsx    # Anonymous symptom logger with multi-select & consent
        │   ├── CampusIssueReportForm.jsx# Hygiene/water ticket submission & status tracking
        │   ├── HealthcareLocator.jsx    # Directory of campus clinic, hospitals, pharmacies & clinics
        │   ├── EmergencyPage.jsx        # 🚨 Urgent Help SOS beacon, hotlines, ambulance dispatch
        │   ├── HealthAwareness.jsx      # Health guides, hydration calculator, medical safety notices
        │   ├── MyReports.jsx            # Private student submission timeline with crypto tokens
        │   ├── PrivacyCenter.jsx        # Consent management, data policies, k-anonymity breakdown
        │   └── ParentNotification.jsx   # Optional guardian emergency contact setup
        ├── official/
        │   ├── OfficialDashboard.jsx    # KPIs (47 reports, 3 alerts), High-Risk banner, risk matrix
        │   ├── AlertsView.jsx           # Explainable alert cards with plain-English reasons & checklists
        │   ├── AnalyticsView.jsx        # Recharts suite: Daily Line, Symptom Bar, Hostel Comparisons
        │   ├── CampusRiskMap.jsx        # Interactive campus schematic with building drill-downs
        │   ├── SymptomTrends.jsx        # Tabular filterable stream of aggregated submissions
        │   └── CampusIssuesManagement.jsx# Review and assign actions on student hygiene reports
        └── admin/
            └── AdminDashboard.jsx       # Cluster threshold sliders, broadcast composer, audit log
```

---

## 🔮 Future Backend & IoT Integration Points
1. **REST / GraphQL Backend**: Connect endpoints (`POST /api/reports/anonymous`, `GET /api/clusters/active`, `POST /api/issues`).
2. **IoT Water Quality Telemetry**: Direct integration with hostel water cooler sensors (pH, TDS, turbidity).
3. **IDSP Municipal Sync**: Anonymized data pipeline to Indian Integrated Disease Surveillance Programme servers.
4. **Bayesian ML Models**: Evolving from rule-based thresholds to seasonal machine learning models.

---

## ⚖️ Medical Safety Disclaimer
MediNova is an early-warning and community health trend surveillance platform, **not a diagnostic medical device**. Risk levels represent statistical spatial clusters requiring official institutional verification. In medical emergencies, always consult qualified healthcare practitioners at the Campus Health Centre.

*Developed with pride by Team MediNova for Smart India Hackathon.*
