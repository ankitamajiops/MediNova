/**
 * MediNova - Early Cluster Detection Service
 * Rule-Based Early Warning & Explainable Rationale Engine
 * 
 * IMPORTANT DISCLAIMER:
 * This algorithm is designed as an early-warning community health surveillance tool.
 * It does NOT medically diagnose disease or replace qualified clinical evaluation.
 */

// Configurable detection thresholds
export const DEFAULT_THRESHOLDS = {
  highRiskReportCount: 10,      // Reports >= 10 in time window = HIGH RISK
  moderateRiskReportCount: 5,   // Reports >= 5 in time window = MODERATE RISK
  timeWindowHours: 48,          // Rolling time window in hours
  minConfidenceHigh: 90,        // Base confidence for high risk clusters
  minConfidenceModerate: 75,    // Base confidence for moderate risk
};

// Common syndromic symptom groupings for college campuses
export const SYNDROMIC_PATTERNS = [
  {
    patternId: 'food_borne_gi',
    name: 'Possible Food-Borne / Gastrointestinal Cluster',
    primarySymptoms: ['vomiting', 'stomach_pain', 'diarrhea', 'fever'],
    suggestedActions: [
      'Conduct immediate inspection of hostel mess kitchen & food storage facilities',
      'Test drinking water samples from all floor coolers for bacterial/chemical contamination',
      'Issue advisory to hostel residents on ORS, fluid intake, and meal precautions',
      'Set up an expedited triage desk at the Campus Health Centre for affected students',
      'Cross-check supplier batches for dairy, drinking water cans, and cooked poultry'
    ]
  },
  {
    patternId: 'respiratory_flu',
    name: 'Possible Viral Respiratory / Influenza Cluster',
    primarySymptoms: ['cough', 'sore_throat', 'fever', 'headache', 'fatigue'],
    suggestedActions: [
      'Advise symptomatic students to self-isolate and wear surgical masks in lecture halls',
      'Ensure adequate cross-ventilation in shared reading rooms and hostel corridors',
      'Distribute free masks and thermal screeners at hostel entrances',
      'Monitor daily absentee rates in academic departments'
    ]
  },
  {
    patternId: 'vector_borne',
    name: 'Possible Vector-Borne / Seasonal Viral Spike',
    primarySymptoms: ['fever', 'headache', 'fatigue', 'skin_allergy'],
    suggestedActions: [
      'Schedule anti-larval spray and fogging operations around identified hotspot quads',
      'Inspect cooling towers, drainage channels, and terrace containers for standing water',
      'Provide rapid NS1/IgM dengue and malaria screening tests at the Health Centre'
    ]
  },
  {
    patternId: 'dermatological',
    name: 'Possible Contact Dermatitis / Water Quality Issue',
    primarySymptoms: ['skin_allergy', 'headache'],
    suggestedActions: [
      'Test bathing and washroom overhead tank water for pH and chlorine balance',
      'Clean and disinfect hostel overhead storage reservoirs',
      'Advise students to avoid sharing towels and personal hygiene items'
    ]
  }
];

/**
 * Run cluster detection over aggregated symptom reports
 * @param {Array} reports - List of anonymous symptom reports
 * @param {Object} customThresholds - Configurable thresholds
 * @returns {Object} Detected alerts, location risk matrix, and stats
 */
export function analyzeClusters(reports = [], customThresholds = {}) {
  const thresholds = { ...DEFAULT_THRESHOLDS, ...customThresholds };
  const cutoffTime = Date.now() - (thresholds.timeWindowHours * 3600 * 1000);

  // Filter reports within the active rolling window
  const activeReports = reports.filter(r => new Date(r.timestamp).getTime() >= cutoffTime);

  // Group reports by location
  const locationGroups = {};
  activeReports.forEach(report => {
    const locId = report.locationId || 'unknown';
    if (!locationGroups[locId]) {
      locationGroups[locId] = {
        locationId: locId,
        locationName: report.locationName || locId,
        reports: [],
        symptomCounts: {},
        severeCount: 0
      };
    }
    locationGroups[locId].reports.push(report);
    if (report.severity === 'Severe') locationGroups[locId].severeCount++;

    (report.symptoms || []).forEach(sym => {
      locationGroups[locId].symptomCounts[sym] = (locationGroups[locId].symptomCounts[sym] || 0) + 1;
    });
  });

  const alerts = [];
  const locationRiskMatrix = {};

  Object.values(locationGroups).forEach(group => {
    const totalReports = group.reports.length;
    let riskLevel = 'LOW';
    let confidence = 50;
    let matchedPattern = null;
    let dominantSymptoms = [];

    // Sort symptoms by frequency
    dominantSymptoms = Object.entries(group.symptomCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([sym]) => sym);

    // Identify matching syndromic pattern
    let maxMatchCount = 0;
    SYNDROMIC_PATTERNS.forEach(pattern => {
      const matchCount = pattern.primarySymptoms.filter(s => (group.symptomCounts[s] || 0) > 0).length;
      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        matchedPattern = pattern;
      }
    });

    if (!matchedPattern) {
      matchedPattern = SYNDROMIC_PATTERNS[0];
    }

    // Determine Risk Level & Confidence
    if (totalReports >= thresholds.highRiskReportCount) {
      riskLevel = 'HIGH';
      // Compute explainable confidence based on symptom correlation & volume
      const baseConfidence = thresholds.minConfidenceHigh;
      const bonus = Math.min(8, (totalReports - thresholds.highRiskReportCount) * 0.6 + group.severeCount * 1.2);
      confidence = Math.min(98, Math.round(baseConfidence + bonus));
    } else if (totalReports >= thresholds.moderateRiskReportCount) {
      riskLevel = 'MODERATE';
      const baseConfidence = thresholds.minConfidenceModerate;
      const bonus = Math.min(10, (totalReports - thresholds.moderateRiskReportCount) * 2);
      confidence = Math.round(baseConfidence + bonus);
    } else {
      riskLevel = 'LOW';
      confidence = Math.max(45, Math.round(30 + totalReports * 8));
    }

    // Create explainable alert if Moderate or High
    if (riskLevel === 'HIGH' || riskLevel === 'MODERATE') {
      const topSymptomNames = dominantSymptoms.slice(0, 3).map(s => {
        return s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }).join(', ');

      const alertId = `ALERT-${group.locationId.toUpperCase()}-${Date.now().toString().slice(-4)}`;

      alerts.push({
        id: alertId,
        title: `${matchedPattern.name}`,
        locationId: group.locationId,
        locationName: group.locationName,
        riskLevel,
        confidence,
        timeWindow: `Last ${thresholds.timeWindowHours} hours`,
        reportCount: totalReports,
        severeCount: group.severeCount,
        matchedSymptoms: dominantSymptoms.slice(0, 4),
        symptomCounts: group.symptomCounts,
        patternId: matchedPattern.patternId,
        reason: `${totalReports} similar symptom reports (${topSymptomNames}) were recorded from ${group.locationName} within the last ${thresholds.timeWindowHours} hours.`,
        suggestedActions: matchedPattern.suggestedActions,
        status: riskLevel === 'HIGH' ? 'Under Active Investigation' : 'Advisory Monitored',
        timestamp: new Date().toISOString(),
        isOfficialVerified: false,
        disclaimer: 'Early-warning indicator based on aggregated reporting trends. Requires official institutional verification.'
      });
    }

    locationRiskMatrix[group.locationId] = {
      locationId: group.locationId,
      locationName: group.locationName,
      riskLevel,
      confidence,
      reportCount: totalReports,
      dominantSymptoms: dominantSymptoms.slice(0, 3),
      lastUpdated: new Date().toISOString()
    };
  });

  // Ensure all known campus locations have a risk status
  const defaultCampusIds = ['hostel_a', 'hostel_b', 'hostel_c', 'hostel_d', 'academic_block', 'cafeteria', 'sports_complex', 'health_centre', 'day_scholars'];
  defaultCampusIds.forEach(id => {
    if (!locationRiskMatrix[id]) {
      locationRiskMatrix[id] = {
        locationId: id,
        locationName: id.replace(/_/g, ' ').toUpperCase(),
        riskLevel: 'LOW',
        confidence: 40,
        reportCount: 0,
        dominantSymptoms: [],
        lastUpdated: new Date().toISOString()
      };
    }
  });

  // Sort alerts by risk priority (HIGH first, then higher report count)
  alerts.sort((a, b) => {
    if (a.riskLevel === 'HIGH' && b.riskLevel !== 'HIGH') return -1;
    if (a.riskLevel !== 'HIGH' && b.riskLevel === 'HIGH') return 1;
    return b.reportCount - a.reportCount;
  });

  return {
    alerts,
    locationRiskMatrix,
    totalActiveReports: activeReports.length,
    highRiskZonesCount: Object.values(locationRiskMatrix).filter(z => z.riskLevel === 'HIGH').length,
    moderateRiskZonesCount: Object.values(locationRiskMatrix).filter(z => z.riskLevel === 'MODERATE').length
  };
}
