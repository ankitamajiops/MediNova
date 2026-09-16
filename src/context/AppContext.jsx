import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  INITIAL_SYMPTOM_REPORTS, 
  INITIAL_CAMPUS_ISSUES, 
  INITIAL_NOTIFICATIONS, 
  HEALTHCARE_FACILITIES,
  EMERGENCY_CONTACTS,
  HEALTH_AWARENESS_ARTICLES,
  SYMPTOMS_LIST,
  CAMPUS_LOCATIONS
} from '../data/mockData';
import { analyzeClusters, DEFAULT_THRESHOLDS } from '../services/clusterDetection';

const AppContext = createContext();

export const DEMO_STEPS = [
  {
    step: 1,
    title: '1. Login as Student',
    role: 'student',
    tab: 'dashboard',
    instruction: 'Welcome to MediNova! Notice the zero-PII student dashboard and campus health advisory.'
  },
  {
    step: 2,
    title: '2. Student Dashboard Pulse',
    role: 'student',
    tab: 'dashboard',
    instruction: 'Students see real-time campus advisory notices without any student identities exposed.'
  },
  {
    step: 3,
    title: '3. Submit Symptom Report',
    role: 'student',
    tab: 'report-symptoms',
    instruction: 'Report symptoms (e.g. Fever, Vomiting, Stomach Pain in Hostel A) with mandatory consent.'
  },
  {
    step: 4,
    title: '4. Anonymous Submission Receipt',
    role: 'student',
    tab: 'my-reports',
    instruction: 'Student gets a zero-PII cryptographic submission token and local timeline tracker.'
  },
  {
    step: 5,
    title: '5. Switch to Health Official',
    role: 'official',
    tab: 'dashboard',
    instruction: 'Switch role to Health Officer to see the aggregated surveillance dashboard.'
  },
  {
    step: 6,
    title: '6. Live Report Counter & KPIs',
    role: 'official',
    tab: 'dashboard',
    instruction: 'Observe 47+ reports today, 3 active alerts, and Hostel A flagged as a High-Risk Zone.'
  },
  {
    step: 7,
    title: '7. Inspect High-Risk Cluster Alert',
    role: 'official',
    tab: 'alerts',
    instruction: 'Open the Food-Borne Illness Cluster alert for Hostel A (92% Confidence).'
  },
  {
    step: 8,
    title: '8. Explainable Rationale & Actions',
    role: 'official',
    tab: 'alerts',
    instruction: 'Review plain-English explainability reasons and official containment checklist.'
  },
  {
    step: 9,
    title: '9. Interactive Campus Risk Map',
    role: 'official',
    tab: 'risk-map',
    instruction: 'Explore the color-coded campus schematic: Hostel A 🔴, Hostel B 🟡, Hostel C 🟢.'
  },
  {
    step: 10,
    title: '10. Analytics & Syndromic Trends',
    role: 'official',
    tab: 'analytics',
    instruction: 'Review Recharts graphs for daily timeline, symptom donut, and hostel comparisons.'
  },
  {
    step: 11,
    title: '11. Healthcare & Emergency Hub',
    role: 'student',
    tab: 'emergency',
    instruction: 'Demonstrate the 1-tap campus ambulance beacon, health centre desk, and medical directory.'
  },
  {
    step: 12,
    title: '12. Privacy Center & k-Anonymity',
    role: 'student',
    tab: 'privacy',
    instruction: 'Inspect privacy controls, consent management, and zero-PII architecture.'
  }
];

export const AppProvider = ({ children }) => {
  // Active role: 'landing', 'student', 'official', 'admin', 'login'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('medinova_role') || 'landing';
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('medinova_tab') || 'dashboard';
  });

  // Reports state
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('medinova_reports');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_SYMPTOM_REPORTS;
  });

  // Campus Issues state
  const [campusIssues, setCampusIssues] = useState(() => {
    const saved = localStorage.getItem('medinova_issues');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CAMPUS_ISSUES;
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('medinova_notifs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Thresholds state
  const [thresholds, setThresholds] = useState(() => {
    const saved = localStorage.getItem('medinova_thresholds');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_THRESHOLDS;
  });

  // Student's private submitted reports tracker
  const [mySubmissions, setMySubmissions] = useState(() => {
    const saved = localStorage.getItem('medinova_my_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'MY-SUB-101',
        anonymousToken: 'ANON-8F29A',
        locationName: 'Hostel A (Aryabhatta Hall)',
        symptoms: ['fever', 'stomach_pain'],
        severity: 'Moderate',
        onset: 'Yesterday morning',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        status: 'Aggregated & Analyzed in Trend Matrix'
      }
    ];
  });

  // Parent emergency notification settings
  const [parentSettings, setParentSettings] = useState(() => {
    const saved = localStorage.getItem('medinova_parent_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      enabled: false,
      name: 'Sunil Roy',
      relationship: 'Father',
      phone: '+91 98765-11223',
      notifyOnEmergencyAdmission: true,
      notifyOnCampusAdvisory: false
    };
  });

  // Privacy consent switches
  const [privacyPreferences, setPrivacyPreferences] = useState(() => {
    const saved = localStorage.getItem('medinova_privacy_prefs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      anonymousTrendAnalysis: true,
      emergencyContactNotification: false,
      healthAwarenessPush: true,
      dataRetentionDays: 30
    };
  });

  // SIH Guided Tour State
  const [demoStepIndex, setDemoStepIndex] = useState(0); // 0 = inactive
  const [isDemoBarOpen, setIsDemoBarOpen] = useState(true);

  // App Simulator Mode (Smartphone Frame for Desktop Presentation)
  const [isAppSimulatorMode, setIsAppSimulatorMode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'app' || urlParams.get('app') === 'true') return true;
    return localStorage.getItem('medinova_app_mode') === 'true';
  });

  // App Install Modal state
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Save app simulator preference
  useEffect(() => {
    localStorage.setItem('medinova_app_mode', isAppSimulatorMode ? 'true' : 'false');
  }, [isAppSimulatorMode]);


  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('medinova_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('medinova_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('medinova_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('medinova_issues', JSON.stringify(campusIssues));
  }, [campusIssues]);

  useEffect(() => {
    localStorage.setItem('medinova_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('medinova_thresholds', JSON.stringify(thresholds));
  }, [thresholds]);

  useEffect(() => {
    localStorage.setItem('medinova_my_submissions', JSON.stringify(mySubmissions));
  }, [mySubmissions]);

  useEffect(() => {
    localStorage.setItem('medinova_parent_settings', JSON.stringify(parentSettings));
  }, [parentSettings]);

  useEffect(() => {
    localStorage.setItem('medinova_privacy_prefs', JSON.stringify(privacyPreferences));
  }, [privacyPreferences]);

  // Compute cluster analysis reactively
  const clusterAnalysis = useMemo(() => {
    return analyzeClusters(reports, thresholds);
  }, [reports, thresholds]);

  // Toast manager
  const addToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Role Switcher helper
  const navigateToRole = (role, defaultTab = 'dashboard') => {
    setCurrentRole(role);
    setActiveTab(defaultTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add new anonymous symptom report
  const addSymptomReport = (formData) => {
    const anonymousToken = `ANON-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newReport = {
      id: `REP-${Date.now().toString().slice(-6)}`,
      anonymousToken,
      locationId: formData.locationId,
      locationName: formData.locationName,
      symptoms: formData.symptoms,
      severity: formData.severity,
      onset: formData.onset,
      timestamp: new Date().toISOString(),
      status: 'Aggregated & Analyzed',
      prescriptionFile: formData.hasFile ? formData.fileName : null
    };

    setReports(prev => [newReport, ...prev]);

    // Save locally for student's private timeline
    const personalRecord = {
      id: `MY-SUB-${Date.now().toString().slice(-4)}`,
      anonymousToken,
      locationName: formData.locationName,
      symptoms: formData.symptoms,
      severity: formData.severity,
      onset: formData.onset,
      timestamp: new Date().toISOString(),
      status: 'Aggregated & Analyzed in Trend Matrix'
    };
    setMySubmissions(prev => [personalRecord, ...prev]);

    // Add alert notification if high severity or cluster trigger
    addToast('Anonymous report submitted successfully. Your identity is 100% protected.', 'success');

    return { success: true, anonymousToken, reportId: newReport.id };
  };

  // Add new campus hygiene issue
  const addCampusIssue = (formData) => {
    const newIssue = {
      id: `ISSUE-${Date.now().toString().slice(-4)}`,
      category: formData.category,
      location: formData.location,
      description: formData.description,
      status: 'Open',
      reportedAt: new Date().toISOString(),
      isAnonymous: formData.isAnonymous,
      assignedTeam: 'Assigned to Sanitation & Facility Desk',
      priority: formData.priority || 'Moderate'
    };

    setCampusIssues(prev => [newIssue, ...prev]);
    addToast('Campus hygiene issue reported successfully.', 'success');
    return newIssue;
  };

  // Update Campus Issue
  const updateCampusIssueStatus = (issueId, newStatus, assignedTeam) => {
    setCampusIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          status: newStatus,
          assignedTeam: assignedTeam || issue.assignedTeam
        };
      }
      return issue;
    }));
    addToast(`Issue status updated to "${newStatus}".`, 'info');
  };

  // Update Alert Status
  const updateAlertStatus = (alertId, newStatus) => {
    addToast(`Alert ${alertId} updated to "${newStatus}".`, 'info');
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read.', 'info');
  };

  const broadcastNotification = (title, message, type = 'info', roleTarget = 'all') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
      roleTarget
    };
    setNotifications(prev => [newNotif, ...prev]);
    addToast('Broadcast announcement dispatched across campus.', 'success');
  };

  // Demo Tour controls
  const startDemoTour = (stepIndex = 1) => {
    setDemoStepIndex(stepIndex);
    const stepObj = DEMO_STEPS.find(s => s.step === stepIndex);
    if (stepObj) {
      setCurrentRole(stepObj.role);
      setActiveTab(stepObj.tab);
    }
  };

  const nextDemoStep = () => {
    if (demoStepIndex < DEMO_STEPS.length) {
      startDemoTour(demoStepIndex + 1);
    } else {
      setDemoStepIndex(0);
      addToast('SIH Demo flow completed! Feel free to explore all modules.', 'success');
    }
  };

  const prevDemoStep = () => {
    if (demoStepIndex > 1) {
      startDemoTour(demoStepIndex - 1);
    }
  };

  const exitDemoTour = () => {
    setDemoStepIndex(0);
  };

  // Reset demo data to canonical SIH state
  const resetDemoData = () => {
    setReports(INITIAL_SYMPTOM_REPORTS);
    setCampusIssues(INITIAL_CAMPUS_ISSUES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setThresholds(DEFAULT_THRESHOLDS);
    setMySubmissions([
      {
        id: 'MY-SUB-101',
        anonymousToken: 'ANON-8F29A',
        locationName: 'Hostel A (Aryabhatta Hall)',
        symptoms: ['fever', 'stomach_pain'],
        severity: 'Moderate',
        onset: 'Yesterday morning',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        status: 'Aggregated & Analyzed in Trend Matrix'
      }
    ]);
    setParentSettings({
      enabled: false,
      name: 'Sunil Roy',
      relationship: 'Father',
      phone: '+91 98765-11223',
      notifyOnEmergencyAdmission: true,
      notifyOnCampusAdvisory: false
    });
    setPrivacyPreferences({
      anonymousTrendAnalysis: true,
      emergencyContactNotification: false,
      healthAwarenessPush: true,
      dataRetentionDays: 30
    });
    addToast('Demo data reset to default SIH cluster seed state (Hostel A 20-report High Risk cluster active).', 'info');
  };

  // Mock User Profiles
  const userProfiles = {
    student: {
      name: 'Aditya Roy',
      id: 'STU2024-8841',
      role: 'Undergraduate Student',
      department: 'Computer Science & Engineering',
      hostel: 'Hostel A (Aryabhatta Hall)',
      room: 'Room 214 (Kept Private)',
      bloodGroup: 'O+ (Encrypted on Device)',
      avatar: 'AR'
    },
    official: {
      name: 'Dr. Ramesh Sharma',
      id: 'MED-OFFICER-01',
      role: 'Chief Medical Officer & Health Sentinel Director',
      department: 'Campus Health & Wellness Directorate',
      license: 'MCI-88219-DEL',
      avatar: 'RS'
    },
    admin: {
      name: 'Prof. Alok Gupta',
      id: 'ADMIN-ROOT',
      role: 'Dean of Student Affairs & Platform Administrator',
      department: 'University Administration',
      avatar: 'AG'
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        navigateToRole,
        reports,
        campusIssues,
        notifications,
        thresholds,
        setThresholds,
        clusterAnalysis,
        mySubmissions,
        parentSettings,
        setParentSettings,
        privacyPreferences,
        setPrivacyPreferences,
        addSymptomReport,
        addCampusIssue,
        updateCampusIssueStatus,
        updateAlertStatus,
        markNotificationRead,
        markAllNotificationsRead,
        broadcastNotification,
        resetDemoData,
        toasts,
        addToast,
        removeToast,
        userProfiles,
        demoStepIndex,
        startDemoTour,
        nextDemoStep,
        prevDemoStep,
        exitDemoTour,
        isDemoBarOpen,
        setIsDemoBarOpen,
        isAppSimulatorMode,
        setIsAppSimulatorMode,
        isInstallModalOpen,
        setIsInstallModalOpen,
        symptomsList: SYMPTOMS_LIST,
        campusLocations: CAMPUS_LOCATIONS,
        healthcareFacilities: HEALTHCARE_FACILITIES,
        emergencyContacts: EMERGENCY_CONTACTS,
        healthArticles: HEALTH_AWARENESS_ARTICLES
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
