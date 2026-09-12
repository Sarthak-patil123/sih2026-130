export interface ComplianceSegment {
  status: string;
  label: string;
  labelMr: string;
  score: string;
  color: string;
}

export interface RenewalItem {
  id: string;
  title: string;
  titleMr: string;
  department: string;
  expiresInDays: number;
  expiryDate: string;
  status: string;
  usedInCount: number;
  actionRequired: string;
  applicationId: string;
}

export interface CalendarEvent {
  id: string;
  day: number;
  month: string;
  year: number;
  title: string;
  titleMr: string;
  department: string;
  type: string;
  time: string;
  venue: string;
  officer: string;
  applicationId: string;
  status: string;
}

export interface ComplianceData {
  healthScore: number;
  segments: {
    documents: ComplianceSegment;
    approvals: ComplianceSegment;
    renewals: ComplianceSegment;
    queries: ComplianceSegment;
  };
  upcomingActionsDueCount: number;
  renewalsList: RenewalItem[];
  calendarEvents: CalendarEvent[];
}

export const mockComplianceData: ComplianceData = {
  healthScore: 84,
  segments: {
    documents: { status: "good", label: "Documents", labelMr: "कागदपत्रे", score: "8/10 Verified", color: "emerald" },
    approvals: { status: "good", label: "Approvals", labelMr: "मंजुऱ्या", score: "2/6 Issued", color: "emerald" },
    renewals: { status: "warning", label: "Renewals", labelMr: "नूतनीकरण", score: "1 Expiring in 27d", color: "amber" },
    queries: { status: "action", label: "Queries", labelMr: "शंका निरसन", score: "1 Action Required", color: "rose" }
  },
  upcomingActionsDueCount: 2,
  renewalsList: [
    {
      id: "REN-01",
      title: "Fire Safety Certificate Renewal",
      titleMr: "अग्निशामक सुरक्षा प्रमाणपत्र नूतनीकरण",
      department: "Maharashtra Fire Services",
      expiresInDays: 27,
      expiryDate: "09 Oct 2026",
      status: "Expiring Soon",
      usedInCount: 3,
      actionRequired: "Apply for Annual Fire Audit Renewal",
      applicationId: "APP-2026-00124"
    },
    {
      id: "REN-02",
      title: "Factory Operating Licence (DISH)",
      titleMr: "फॅक्टरी ऑपरेटिंग परवाना (DISH)",
      department: "Directorate of Industrial Safety",
      expiresInDays: 43,
      expiryDate: "25 Oct 2026",
      status: "Renewal Approaching",
      usedInCount: 2,
      actionRequired: "File Form 2 Renewal Schedule",
      applicationId: "APP-2026-00125"
    }
  ],
  calendarEvents: [
    {
      id: "EVT-01",
      day: 18,
      month: "September",
      year: 2026,
      title: "Fire Safety Joint Site Inspection",
      titleMr: "अग्निशामक संयुक्त जागा पाहणी",
      department: "Fire & Emergency Services",
      type: "inspection",
      time: "11:00 AM IST",
      venue: "Plot B-14, Butibori MIDC Phase II, Nagpur",
      officer: "Officer 24 (Shri V. R. Shinde)",
      applicationId: "APP-2026-00124",
      status: "Scheduled"
    },
    {
      id: "EVT-02",
      day: 22,
      month: "September",
      year: 2026,
      title: "Water Demarcation Document SLA Deadline",
      titleMr: "पाणी जोडणी सुधारित नकाशा सादर करण्याची अंतिम मुदत",
      department: "MIDC Water Supply Wing",
      type: "deadline",
      time: "05:00 PM IST",
      venue: "Single Window Online Portal",
      officer: "Er. Rameshwar Jadhav",
      applicationId: "APP-2026-00128",
      status: "Action Required"
    },
    {
      id: "EVT-03",
      day: 25,
      month: "September",
      year: 2026,
      title: "Factory Safety Machinery Scrutiny Target",
      titleMr: "कारखाना सुरक्षा व बॉयलर स्क्रूटनी अंतिम तारीख",
      department: "DISH Maharashtra",
      type: "milestone",
      time: "End of Day",
      venue: "DISH Regional Office Nagpur",
      officer: "Shri A. K. Patwardhan",
      applicationId: "APP-2026-00125",
      status: "Under Review"
    },
    {
      id: "EVT-04",
      day: 30,
      month: "September",
      year: 2026,
      title: "Monthly MPCB ETP Effluent Monitoring Report",
      titleMr: "मासिक MPCB सांडपाणी तपासणी अहवाल",
      department: "Maharashtra Pollution Control Board",
      type: "compliance",
      time: "11:59 PM IST",
      venue: "MPCB Online Portal",
      officer: "Dr. Sandeep Mane",
      applicationId: "APP-2026-00126",
      status: "Upcoming Periodic Filing"
    }
  ]
};
