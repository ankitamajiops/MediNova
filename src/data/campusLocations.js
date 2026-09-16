/**
 * Campus Map Locations and Schematic Layout Definition
 */

export const CAMPUS_BUILDINGS = [
  {
    id: 'hostel_a',
    name: 'Hostel A (Aryabhatta Hall)',
    type: 'Hostel',
    description: 'Undergraduate Boys Residence Block (Floors 1-4). Houses 450 students with attached dining hall.',
    capacity: 450,
    warden: 'Prof. S. K. Verma',
    svgPos: { x: 120, y: 110, width: 140, height: 100, labelX: 190, labelY: 160 },
    gridArea: 'col-span-1 md:col-span-1',
    zone: 'North Quad'
  },
  {
    id: 'hostel_b',
    name: 'Hostel B (Gargi Hall)',
    type: 'Hostel',
    description: 'Undergraduate Girls Residence Block (Floors 1-4). Houses 420 students.',
    capacity: 420,
    warden: 'Dr. Anita Desai',
    svgPos: { x: 440, y: 110, width: 140, height: 100, labelX: 510, labelY: 160 },
    gridArea: 'col-span-1 md:col-span-1',
    zone: 'East Quad'
  },
  {
    id: 'hostel_c',
    name: 'Hostel C (Kalam Hall - Freshers)',
    type: 'Hostel',
    description: 'First-Year Undergraduate Residence Block with dedicated study lounges.',
    capacity: 380,
    warden: 'Dr. Rajiv Anand',
    svgPos: { x: 120, y: 390, width: 140, height: 100, labelX: 190, labelY: 440 },
    gridArea: 'col-span-1 md:col-span-1',
    zone: 'South Quad'
  },
  {
    id: 'hostel_d',
    name: 'Hostel D (Sarabhai PG Block)',
    type: 'Hostel',
    description: 'Postgraduate & Doctoral Scholar Residence Block.',
    capacity: 250,
    warden: 'Prof. M. K. Roy',
    svgPos: { x: 740, y: 110, width: 130, height: 90, labelX: 805, labelY: 155 },
    gridArea: 'col-span-1 md:col-span-1',
    zone: 'North-East Quad'
  },
  {
    id: 'cafeteria',
    name: 'Central Food Court & Mess Hub',
    type: 'Dining',
    description: 'Main campus student dining center, multi-cuisine food stalls, and common kitchen area.',
    capacity: 800,
    warden: 'Food Safety Officer: Mr. N. Gupta',
    svgPos: { x: 280, y: 120, width: 130, height: 80, labelX: 345, labelY: 160 },
    gridArea: 'col-span-1 md:col-span-1',
    zone: 'Central Spine'
  },
  {
    id: 'academic_block',
    name: 'Main Academic Complex',
    type: 'Academic',
    description: 'Department lecture theaters, computer centres, and faculty offices (Lecture Halls 1-12).',
    capacity: 2500,
    warden: 'Dean of Academic Affairs',
    svgPos: { x: 280, y: 230, width: 300, height: 130, labelX: 430, labelY: 295 },
    gridArea: 'col-span-1 md:col-span-2',
    zone: 'Central Complex'
  },
  {
    id: 'health_centre',
    name: 'Campus Health & Wellness Centre',
    type: 'Medical',
    description: '24/7 primary healthcare clinic, emergency ambulance bay, and pharmacy dispensary.',
    capacity: 50,
    warden: 'Chief Medical Officer: Dr. R. Sharma',
    svgPos: { x: 620, y: 240, width: 140, height: 110, labelX: 690, labelY: 295 },
    gridArea: 'col-span-1 md:col-span-1',
    zone: 'Medical Wing'
  },
  {
    id: 'sports_complex',
    name: 'Sports Arena & Gymnasium',
    type: 'Recreation',
    description: 'Indoor multi-purpose badminton courts, fitness gymnasium, and Olympic-size running track.',
    capacity: 600,
    warden: 'Sports Officer: Coach D. Singh',
    svgPos: { x: 440, y: 390, width: 150, height: 100, labelX: 515, labelY: 440 },
    gridArea: 'col-span-1 md:col-span-1',
    zone: 'South-East Zone'
  },
  {
    id: 'day_scholars',
    name: 'Day Scholars / Commuter Hub',
    type: 'Commuter',
    description: 'Bus terminus, transit parking zone, and day scholar student lounge.',
    capacity: 1200,
    warden: 'Transport Coordinator',
    svgPos: { x: 620, y: 390, width: 140, height: 90, labelX: 690, labelY: 435 },
    gridArea: 'col-span-1 md:col-span-1',
    zone: 'Transit Gate'
  }
];
