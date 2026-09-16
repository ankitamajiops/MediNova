/**
 * MediNova - Mock Data Store
 * Seed data for Smart India Hackathon Prototype
 */

export const SYMPTOMS_LIST = [
  { id: 'fever', label: 'Fever / High Temperature', category: 'General', icon: 'Thermometer' },
  { id: 'vomiting', label: 'Vomiting / Nausea', category: 'Gastrointestinal', icon: 'Activity' },
  { id: 'stomach_pain', label: 'Stomach Pain / Cramps', category: 'Gastrointestinal', icon: 'AlertCircle' },
  { id: 'diarrhea', label: 'Diarrhea / Loose Motion', category: 'Gastrointestinal', icon: 'AlertTriangle' },
  { id: 'cough', label: 'Cough / Cold', category: 'Respiratory', icon: 'Wind' },
  { id: 'sore_throat', label: 'Sore Throat / Difficulty Swallowing', category: 'Respiratory', icon: 'Smile' },
  { id: 'headache', label: 'Severe Headache', category: 'Neurological', icon: 'Brain' },
  { id: 'fatigue', label: 'Extreme Fatigue / Body Ache', category: 'General', icon: 'BatteryLow' },
  { id: 'skin_allergy', label: 'Skin Rash / Allergy / Itching', category: 'Dermatological', icon: 'Sparkles' },
  { id: 'menstrual_concern', label: 'Menstrual Health Concern', category: 'Wellness', icon: 'Heart' },
  { id: 'other', label: 'Other Symptom', category: 'General', icon: 'PlusCircle' },
];

export const CAMPUS_LOCATIONS = [
  { id: 'hostel_a', name: 'Hostel A (Aryabhatta Hall)', type: 'Hostel', capacity: 450, coordinates: [28.545, 77.192] },
  { id: 'hostel_b', name: 'Hostel B (Gargi Hall)', type: 'Hostel', capacity: 420, coordinates: [28.547, 77.194] },
  { id: 'hostel_c', name: 'Hostel C (Kalam Hall - Freshers)', type: 'Hostel', capacity: 380, coordinates: [28.543, 77.190] },
  { id: 'hostel_d', name: 'Hostel D (Sarabhai PG Block)', type: 'Hostel', capacity: 250, coordinates: [28.549, 77.196] },
  { id: 'academic_block', name: 'Main Academic Complex (Blocks 1-4)', type: 'Academic', capacity: 2500, coordinates: [28.546, 77.191] },
  { id: 'cafeteria', name: 'Central Food Court & Mess Hub', type: 'Dining', capacity: 800, coordinates: [28.545, 77.193] },
  { id: 'sports_complex', name: 'Sports Arena & Gymnasium', type: 'Recreation', capacity: 600, coordinates: [28.542, 77.195] },
  { id: 'health_centre', name: 'Campus Health & Wellness Centre', type: 'Medical', capacity: 50, coordinates: [28.544, 77.193] },
  { id: 'day_scholars', name: 'Day Scholars / Off-Campus Commuters', type: 'Commuter', capacity: 1200, coordinates: [28.540, 77.188] },
];

export const ISSUE_CATEGORIES = [
  'Poor Hostel Food Quality',
  'Unsafe / Cloudy Drinking Water',
  'Dirty Washrooms / Sanitation Issue',
  'Mosquito Breeding / Stagnant Water',
  'Garbage Accumulation',
  'Mess Hygiene Concern',
  'Air Conditioning / Ventilation Issue',
  'Other Campus Hygiene Problem'
];

// Seed 20 Gastrointestinal reports in Hostel A (High Risk cluster) + other distributed campus reports
export const INITIAL_SYMPTOM_REPORTS = [
  // Cluster in Hostel A (20 reports within last 48 hours: Fever, Vomiting, Stomach Pain)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `REP-HA-${1000 + i}`,
    anonymousToken: `ANON-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    locationId: 'hostel_a',
    locationName: 'Hostel A (Aryabhatta Hall)',
    symptoms: i % 3 === 0 
      ? ['fever', 'vomiting', 'stomach_pain'] 
      : i % 2 === 0 
        ? ['vomiting', 'stomach_pain', 'diarrhea'] 
        : ['fever', 'stomach_pain'],
    severity: i % 4 === 0 ? 'Severe' : 'Moderate',
    onset: 'Within last 24-48 hours',
    timestamp: new Date(Date.now() - (i * 2.1 * 3600 * 1000)).toISOString(),
    status: 'Aggregated & Analyzed',
    isClusterSeed: true
  })),

  // Moderate cluster in Hostel B (8 reports: Cold, Sore Throat, Cough)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `REP-HB-${2000 + i}`,
    anonymousToken: `ANON-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    locationId: 'hostel_b',
    locationName: 'Hostel B (Gargi Hall)',
    symptoms: ['cough', 'sore_throat', i % 2 === 0 ? 'headache' : 'fatigue'],
    severity: 'Mild',
    onset: '2-3 days ago',
    timestamp: new Date(Date.now() - (i * 5 * 3600 * 1000)).toISOString(),
    status: 'Aggregated & Analyzed',
    isClusterSeed: false
  })),

  // Minor reports in Cafeteria (5 reports)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `REP-CAF-${3000 + i}`,
    anonymousToken: `ANON-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    locationId: 'cafeteria',
    locationName: 'Central Food Court & Mess Hub',
    symptoms: ['stomach_pain', 'fatigue'],
    severity: 'Mild',
    onset: 'Yesterday',
    timestamp: new Date(Date.now() - (i * 6 * 3600 * 1000)).toISOString(),
    status: 'Aggregated & Analyzed',
    isClusterSeed: false
  })),

  // Hostel C (2 isolated reports: Low Risk)
  {
    id: 'REP-HC-4001',
    anonymousToken: 'ANON-7782A1',
    locationId: 'hostel_c',
    locationName: 'Hostel C (Kalam Hall - Freshers)',
    symptoms: ['skin_allergy'],
    severity: 'Mild',
    onset: 'Today morning',
    timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    status: 'Aggregated & Analyzed'
  },
  {
    id: 'REP-HC-4002',
    anonymousToken: 'ANON-8893B2',
    locationId: 'hostel_c',
    locationName: 'Hostel C (Kalam Hall - Freshers)',
    symptoms: ['headache'],
    severity: 'Mild',
    onset: 'Yesterday',
    timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    status: 'Aggregated & Analyzed'
  },

  // Academic Block (4 isolated reports)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `REP-ACAD-${5000 + i}`,
    anonymousToken: `ANON-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    locationId: 'academic_block',
    locationName: 'Main Academic Complex (Blocks 1-4)',
    symptoms: ['headache', 'fatigue'],
    severity: 'Mild',
    onset: 'Yesterday',
    timestamp: new Date(Date.now() - (i * 8 * 3600 * 1000)).toISOString(),
    status: 'Aggregated & Analyzed'
  })),

  // Sports Complex & Day scholars (8 reports)
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `REP-OTH-${6000 + i}`,
    anonymousToken: `ANON-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    locationId: i % 2 === 0 ? 'sports_complex' : 'day_scholars',
    locationName: i % 2 === 0 ? 'Sports Arena & Gymnasium' : 'Day Scholars / Off-Campus Commuters',
    symptoms: i % 2 === 0 ? ['fatigue'] : ['cough', 'fever'],
    severity: 'Mild',
    onset: 'Within last 2 days',
    timestamp: new Date(Date.now() - (i * 7 * 3600 * 1000)).toISOString(),
    status: 'Aggregated & Analyzed'
  }))
];

export const INITIAL_CAMPUS_ISSUES = [
  {
    id: 'ISSUE-101',
    category: 'Unsafe / Cloudy Drinking Water',
    location: 'Hostel A - 2nd Floor Water Cooler',
    description: 'Water from the cooler on floor 2 has a yellowish tint and slight metallic smell since yesterday evening.',
    status: 'In Progress',
    reportedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    isAnonymous: true,
    assignedTeam: 'Hostel Maintenance & Water Testing Team',
    priority: 'High'
  },
  {
    id: 'ISSUE-102',
    category: 'Poor Hostel Food Quality',
    location: 'Hostel A & B Shared Dining Hall',
    description: 'Dinner served on Friday had undercooked paneer and sour curd. Multiple wingmates felt uneasy afterwards.',
    status: 'Under Investigation',
    reportedAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    isAnonymous: true,
    assignedTeam: 'Mess Hygiene Committee',
    priority: 'High'
  },
  {
    id: 'ISSUE-103',
    category: 'Mosquito Breeding / Stagnant Water',
    location: 'Sports Complex Behind Basketball Court',
    description: 'Stagnant rainwater has collected in discarded drums behind the indoor court. Heavy mosquito presence in evening.',
    status: 'Open',
    reportedAt: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
    isAnonymous: false,
    assignedTeam: 'Campus Sanitation',
    priority: 'Moderate'
  },
  {
    id: 'ISSUE-104',
    category: 'Dirty Washrooms / Sanitation Issue',
    location: 'Academic Block 2 - Ground Floor',
    description: 'Handwash dispensers empty for 3 days and tap water pressure very low.',
    status: 'Resolved',
    reportedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    isAnonymous: true,
    assignedTeam: 'Housekeeping Services',
    priority: 'Low'
  }
];

export const HEALTHCARE_FACILITIES = [
  {
    id: 'fac-1',
    name: 'MediNova Campus Health & Wellness Centre',
    type: 'College Health Centre',
    category: 'health_centre',
    distance: 'On Campus (Building #8)',
    status: 'Open 24/7',
    isOpen: true,
    address: 'Near Central Library & Block 3, North Campus',
    phone: '+91 11-2659-1000 (Ext 404)',
    emergencyPhone: '+91 11-2659-9999',
    doctorOnDuty: 'Dr. Ramesh Sharma (Chief Medical Officer)',
    services: ['OPD Consultations', 'First Aid & Trauma Care', 'Free Generic Pharmacy', '24x7 Ambulance', 'Pathology Sample Collection', 'Mental Health Counseling'],
    bedsAvailable: 12,
    badge: 'Official Campus Facility'
  },
  {
    id: 'fac-2',
    name: 'All India Institute of Medical Sciences (AIIMS) / Apex District Hospital',
    type: 'Multi-Specialty Government Hospital',
    category: 'hospitals',
    distance: '3.2 km (approx. 10 mins)',
    status: 'Open 24/7 (Emergency & Trauma)',
    isOpen: true,
    address: 'Ring Road, Ansari Nagar, New Delhi',
    phone: '+91 11-2658-8500',
    emergencyPhone: '102 / 108',
    doctorOnDuty: 'Trauma & Emergency Specialist Team',
    services: ['24/7 Emergency & ICU', 'Advanced Pathology & Radiology', 'Epidemic Containment Unit', 'Specialist Consultations'],
    bedsAvailable: 45,
    badge: 'Tier-1 Referral Hospital'
  },
  {
    id: 'fac-3',
    name: 'City Care Polyclinic & Diagnostic Centre',
    type: 'Private Clinic & Diagnostic Lab',
    category: 'clinics',
    distance: '1.1 km (approx. 4 mins)',
    status: 'Open Today: 8:00 AM – 10:00 PM',
    isOpen: true,
    address: 'Gate 2 Commercial Complex, University Road',
    phone: '+91 98765-43210',
    doctorOnDuty: 'Dr. Priya Nair (Internal Medicine)',
    services: ['Rapid Blood & Stool Tests', 'Ultrasound', 'General Physician OPD', 'Nebulization & IV Fluids'],
    bedsAvailable: 4,
    badge: 'Empaneled Clinic'
  },
  {
    id: 'fac-4',
    name: 'Apollo 24/7 & MedPlus Campus Pharmacy',
    type: 'Retail & Emergency Pharmacy',
    category: 'pharmacies',
    distance: '0.4 km (Near Campus Gate 1)',
    status: 'Open 24 Hours',
    isOpen: true,
    address: 'Shop 12, Student Activity Centre Market',
    phone: '+91 11-4567-8900',
    doctorOnDuty: 'Registered Pharmacist on Desk',
    services: ['Prescription Medicines', 'ORS & Electrolytes', 'First Aid Kits', 'Thermal & Oximeter Screeners', 'Sanitizers & Masks'],
    bedsAvailable: 0,
    badge: '24/7 Pharmacy'
  },
  {
    id: 'fac-5',
    name: 'Campus Quick-Response Ambulance Unit',
    type: 'Emergency Paramedic Service',
    category: 'emergency',
    distance: 'Stationed at Health Centre Gate',
    status: 'On Standby (2 Units Active)',
    isOpen: true,
    address: 'Bay 1 & 2, Health Centre Ground',
    phone: '+91 99999-00108',
    emergencyPhone: '+91 99999-00108',
    doctorOnDuty: 'Senior EMT & Paramedic Crew',
    services: ['Oxygen Support', 'Basic Life Support (BLS)', 'Automated Defibrillator (AED)', 'Rapid Hospital Transfer'],
    bedsAvailable: 2,
    badge: 'Immediate Response'
  }
];

export const EMERGENCY_CONTACTS = [
  { title: 'Campus Health Centre Emergency', number: '+91 11-2659-9999', subtitle: 'Direct 24/7 desk at campus clinic', icon: 'PhoneCall' },
  { title: 'Campus Quick Ambulance', number: '+91 99999-00108', subtitle: 'Stationed on campus for immediate dispatch', icon: 'Ambulance' },
  { title: 'National Emergency Ambulance Service', number: '108 / 102', subtitle: 'Government Emergency Medical Response', icon: 'ShieldAlert' },
  { title: 'Chief Hostel Warden Control Room', number: '+91 11-2659-1122', subtitle: 'Hostel emergency assistance & warden on duty', icon: 'Building' },
  { title: 'Campus Security & Women Helpline', number: '+91 11-2659-1090', subtitle: '24/7 campus gate & patrol control', icon: 'ShieldCheck' },
  { title: 'Tele-MANAS Student Mental Health Helpline', number: '14416', subtitle: 'Toll-free psychological first-aid & counseling', icon: 'HeartHandshake' }
];

export const HEALTH_AWARENESS_ARTICLES = [
  {
    id: 'art-1',
    title: 'Food & Drinking Water Safety in Hostels',
    category: 'Food Safety',
    readTime: '3 min read',
    summary: 'Practical precautions to prevent acute gastroenteritis, food poisoning, and water-borne infections in shared campus living.',
    keyPoints: [
      'Always drink filtered/boiled water from certified campus dispensers.',
      'Avoid consuming cut fruits, raw street food, or open curd during humid seasons.',
      'Wash hands with soap for at least 20 seconds before every meal.',
      'If you experience persistent vomiting or loose motion, start ORS immediately and visit the Health Centre.'
    ],
    badgeColor: 'blue'
  },
  {
    id: 'art-2',
    title: 'Seasonal Viral Illnesses & Dengue Prevention',
    category: 'Seasonal Care',
    readTime: '4 min read',
    summary: 'Recognizing early symptoms of seasonal influenza, dengue, and preventing mosquito breeding around hostel balconies and cooler trays.',
    keyPoints: [
      'Empty any stagnant water containers, plant trays, and cooler trays once a week (Dry Day initiative).',
      'Use mosquito repellents or nets, especially during dawn and dusk hours.',
      'Dengue warning signs: high fever, retro-orbital eye pain, severe joint aches, and skin petechiae.',
      'Never self-medicate with NSAIDs (like Ibuprofen/Aspirin) without a doctor consultation if dengue is suspected.'
    ],
    badgeColor: 'teal'
  },
  {
    id: 'art-3',
    title: 'Optimal Hydration & Electrolyte Balance',
    category: 'Wellness',
    readTime: '2 min read',
    summary: 'How dehydration impairs cognitive performance during exams and simple ways to stay energized.',
    keyPoints: [
      'Aim for 2.5 to 3.5 liters of fluid intake daily, adjusting for sports and hot weather.',
      'Carry a reusable stainless steel water bottle across lecture halls.',
      'Signs of mild dehydration: dark yellow urine, dry lips, afternoon headaches, and brain fog.',
      'Coconut water, lemon water, and buttermilk are healthy natural electrolyte sources.'
    ],
    badgeColor: 'emerald'
  },
  {
    id: 'art-4',
    title: 'When to Seek Immediate Medical Attention',
    category: 'Emergency Guide',
    readTime: '3 min read',
    summary: 'Red-flag clinical symptoms that require urgent medical consultation at the Campus Health Centre.',
    keyPoints: [
      'High fever (>102°F) persisting for more than 48 hours despite paracetamol.',
      'Inability to retain liquids due to continuous vomiting for over 6 hours.',
      'Shortness of breath, chest tightness, or wheezing.',
      'Severe localized abdominal pain, especially in the lower right quadrant.'
    ],
    badgeColor: 'rose'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Possible Gastrointestinal Cluster Detected',
    message: 'High-risk cluster identified in Hostel A (20 similar reports within 48h). Health officials have initiated food & water inspection.',
    timestamp: '10 mins ago',
    type: 'high_risk',
    read: false,
    roleTarget: 'all'
  },
  {
    id: 'notif-2',
    title: 'Campus Health Advisory: Hostel B & Cafeteria',
    message: 'Mild increase in respiratory and cold symptoms detected in Hostel B. Students are advised to maintain hygiene and wear masks in crowded areas.',
    timestamp: '2 hours ago',
    type: 'moderate_risk',
    read: false,
    roleTarget: 'student'
  },
  {
    id: 'notif-3',
    title: 'Water Quality Inspection Team Dispatched',
    message: 'Sanitation team has collected water samples from Hostel A water coolers following student hygiene reports.',
    timestamp: '4 hours ago',
    type: 'info',
    read: true,
    roleTarget: 'official'
  },
  {
    id: 'notif-4',
    title: 'Seasonal Dengue Prevention Protocol Active',
    message: 'Weekly campus fogging scheduled this Thursday from 5:00 PM to 7:00 PM across all hostel quads.',
    timestamp: '1 day ago',
    type: 'awareness',
    read: true,
    roleTarget: 'all'
  }
];
