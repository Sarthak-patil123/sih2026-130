import { Inspection } from '../types';

export const initialInspections: Inspection[] = [
  {
    id: "INSP-2026-088",
    applicationId: "APP-2026-00124",
    approval: "Fire Safety Provisional NOC",
    department: "Maharashtra Fire & Emergency Services",
    inspectionType: "Fire Safety & Access Road Audit",
    date: "18 Sept 2026",
    time: "11:00 AM IST",
    officer: "Officer 24 - Shri V. R. Shinde",
    officerContact: "+91 94221 88310",
    location: "Plot B-14, Butibori MIDC Phase II, Nagpur",
    purpose: "Physical verification of 6.5m clear driveway for fire tender, static water tank reservoir volume (100,000 Litres), and fire exit staircase width.",
    requiredDocuments: [
      "Site Layout Plan with Fire Hydrant Ring",
      "Structural Fire Retardant Coating Certificate",
      "Underground Static Water Sump Calculation"
    ],
    status: "Scheduled",
    remarks: "Applicant requested to ensure all site perimeter access gates are unlocked for vehicle test drive.",
    completedDate: null,
    reportSummary: null
  },
  {
    id: "INSP-2026-092",
    applicationId: "APP-2026-00127",
    approval: "State Environmental Impact Clearance",
    department: "Environment & Climate Change Dept (SEIAA)",
    inspectionType: "Baseline Environment & Green Belt Site Inspection",
    date: "22 Sept 2026",
    time: "02:30 PM IST",
    officer: "Dr. Pratibha Joshi (Environmental Officer)",
    officerContact: "+91 712 2548900",
    location: "Plot B-14, Butibori Industrial Area, Nagpur",
    purpose: "Verification of 33% mandatory green belt plantation boundary, storm water drainage diversion channel, and ambient air monitoring station points.",
    requiredDocuments: [
      "Landscape and Plantation Species Master Plan",
      "Zero Liquid Discharge (ZLD) Schematic",
      "Public Hearing Minutes Copy"
    ],
    status: "Scheduled",
    remarks: "Local Gram Panchayat representative and MIDC area manager to be present.",
    completedDate: null,
    reportSummary: null
  },
  {
    id: "INSP-2026-074",
    applicationId: "APP-2026-00120",
    approval: "Project Registration & In-Principle Clearance",
    department: "Directorate of Industries",
    inspectionType: "Industrial Land Boundary Demarcation Survey",
    date: "14 Aug 2026",
    time: "10:00 AM IST",
    officer: "Smt. Anjali Kulkarni, IAS",
    officerContact: "+91 712 2561980",
    location: "Plot B-14, Butibori Industrial Area, Nagpur",
    purpose: "Site boundary check, road access verification, and power feeder distance check.",
    requiredDocuments: [
      "MIDC Allotment Letter",
      "Possession Receipt"
    ],
    status: "Completed",
    remarks: "Survey completed satisfactorily. Plot boundaries match MIDC master layout.",
    completedDate: "14 Aug 2026",
    reportSummary: "Land is vacant, non-agricultural converted, and ready for immediate factory civil construction."
  }
];
