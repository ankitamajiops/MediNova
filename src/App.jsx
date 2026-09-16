import React, { useState } from 'react';
import { useApp } from './context/AppContext';

// Common Components
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/Toast';
import DemoTourBar from './components/common/DemoTourBar';
import MobileBottomNav from './components/common/MobileBottomNav';
import AppInstallBanner from './components/common/AppInstallBanner';
import AppDeviceSimulator from './components/common/AppDeviceSimulator';

// Landing & Auth
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import SymptomReportForm from './pages/student/SymptomReportForm';
import CampusIssueReportForm from './pages/student/CampusIssueReportForm';
import HealthcareLocator from './pages/student/HealthcareLocator';
import EmergencyPage from './pages/student/EmergencyPage';
import HealthAwareness from './pages/student/HealthAwareness';
import MyReports from './pages/student/MyReports';
import PrivacyCenter from './pages/student/PrivacyCenter';
import ParentNotification from './pages/student/ParentNotification';

// Official Pages
import OfficialDashboard from './pages/official/OfficialDashboard';
import AlertsView from './pages/official/AlertsView';
import AnalyticsView from './pages/official/AnalyticsView';
import CampusRiskMap from './pages/official/CampusRiskMap';
import SymptomTrends from './pages/official/SymptomTrends';
import CampusIssuesManagement from './pages/official/CampusIssuesManagement';

// Admin Page
import AdminDashboard from './pages/admin/AdminDashboard';

export const App = () => {
  const { 
    currentRole, 
    activeTab, 
    isAppSimulatorMode, 
    setIsAppSimulatorMode, 
    isInstallModalOpen, 
    setIsInstallModalOpen 
  } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Render content based on currentRole and activeTab
  const renderRoleContent = () => {
    // 1. Landing Page
    if (currentRole === 'landing') {
      return <LandingPage />;
    }

    // 2. Login Page
    if (currentRole === 'login') {
      return <LoginPage />;
    }

    // 3. Student Role Views
    if (currentRole === 'student') {
      switch (activeTab) {
        case 'report-symptoms':
          return <SymptomReportForm />;
        case 'campus-issues':
          return <CampusIssueReportForm />;
        case 'healthcare':
          return <HealthcareLocator />;
        case 'emergency':
          return <EmergencyPage />;
        case 'awareness':
          return <HealthAwareness />;
        case 'my-reports':
          return <MyReports />;
        case 'privacy':
          return <PrivacyCenter />;
        case 'parent-contact':
          return <ParentNotification />;
        case 'dashboard':
        default:
          return <StudentDashboard />;
      }
    }

    // 4. Health Official Role Views
    if (currentRole === 'official') {
      switch (activeTab) {
        case 'alerts':
          return <AlertsView />;
        case 'analytics':
          return <AnalyticsView />;
        case 'risk-map':
          return <CampusRiskMap />;
        case 'trends':
          return <SymptomTrends />;
        case 'campus-issues-mgmt':
          return <CampusIssuesManagement />;
        case 'settings':
          return <AdminDashboard />;
        case 'dashboard':
        default:
          return <OfficialDashboard />;
      }
    }

    // 5. Admin Role Views
    if (currentRole === 'admin') {
      return <AdminDashboard />;
    }

    return <LandingPage />;
  };

  const isPortalLayout = currentRole === 'student' || currentRole === 'official' || currentRole === 'admin';

  // Base App Layout
  const appContent = (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white pb-16 lg:pb-0">
      
      {/* Top Navigation */}
      <Navbar onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />

      {/* Main Body */}
      {isPortalLayout ? (
        <div className="flex-1 flex">
          {/* Role Sidebar for Desktop */}
          <Sidebar 
            isMobileOpen={isMobileSidebarOpen} 
            onCloseMobile={() => setIsMobileSidebarOpen(false)} 
          />

          {/* Portal Content Area */}
          <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
            <div className="flex-1 p-3 sm:p-6 lg:p-8">
              {renderRoleContent()}
            </div>
            <Footer />
          </main>
        </div>
      ) : (
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1">
            {renderRoleContent()}
          </div>
          <Footer />
        </main>
      )}

      {/* Native Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Interactive Elements */}
      <DemoTourBar />
      <ToastContainer />

      {/* PWA Install Banner & Modal */}
      <AppInstallBanner 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />

    </div>
  );

  // If in App Simulator Mode on desktop, wrap inside Smartphone Frame
  if (isAppSimulatorMode) {
    return (
      <AppDeviceSimulator 
        onExitAppMode={() => setIsAppSimulatorMode(false)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      >
        {appContent}
      </AppDeviceSimulator>
    );
  }

  return appContent;
};

export default App;

