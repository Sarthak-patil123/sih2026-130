export const mockAnalyticsData = {
  summary: {
    applicationsReceived: 1420,
    applicationsApproved: 1048,
    applicationsPending: 244,
    applicationsRejected: 128,
    overallSLACompliance: 87.4,
    averageClearanceDays: 11.2,
    queriesRaisedTotal: 312,
    inspectionsConducted: 419,
    activeEnterprises: 3840
  },

  // Before Single Window vs Current Performance (Admin Impact View)
  impactComparison: {
    avgApprovalTimeDays: { before: 18, current: 11, unit: "Days" },
    incompleteApplicationsRate: { before: 31, current: 16, unit: "%" },
    slaComplianceRate: { before: 62, current: 87.4, unit: "%" },
    physicalVisitsRequired: { before: 6.4, current: 1.2, unit: "Visits" }
  },

  // Application Flow Funnel
  approvalFunnel: [
    { stage: "Applications Received", stageMr: "अर्ज प्राप्त झाले", count: 1420, percentage: 100, dropRate: 0 },
    { stage: "Documents Complete", stageMr: "कागदपत्रे पूर्ण", count: 1180, percentage: 83.1, dropRate: 16.9 },
    { stage: "Under Officer Review", stageMr: "विभागीय पुनरावलोकन", count: 890, percentage: 62.7, dropRate: 20.4 },
    { stage: "Field Inspection", stageMr: "प्रत्यक्ष जागा पाहणी", count: 420, percentage: 29.5, dropRate: 33.2 },
    { stage: "Final Statutory Decision", stageMr: "अंतिम निर्णय (मंजूर/नाकारले)", count: 1176, percentage: 82.8, dropRate: 0 }
  ],

  // Department Performance Matrix Heatmap
  departmentPerformance: [
    {
      id: "dept-ind",
      department: "Directorate of Industries",
      departmentMr: "उद्योग संचालनालय",
      applications: 410,
      approved: 382,
      pending: 22,
      rejected: 6,
      avgProcessingDays: 5.8,
      slaTargetDays: 7,
      complianceRate: 94.6,
      status: "Excellent",
      heatmapScore: "green"
    },
    {
      id: "dept-fire",
      department: "Maharashtra Fire & Emergency Services",
      departmentMr: "महाराष्ट्र अग्निशामक सेवा",
      applications: 320,
      approved: 268,
      pending: 41,
      rejected: 11,
      avgProcessingDays: 12.4,
      slaTargetDays: 15,
      complianceRate: 89.2,
      status: "Normal",
      heatmapScore: "green"
    },
    {
      id: "dept-mpcb",
      department: "Maharashtra Pollution Control Board (MPCB)",
      departmentMr: "महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)",
      applications: 275,
      approved: 184,
      pending: 73,
      rejected: 18,
      avgProcessingDays: 28.5,
      slaTargetDays: 30,
      complianceRate: 81.5,
      status: "Moderate",
      heatmapScore: "yellow"
    },
    {
      id: "dept-seiaa",
      department: "Environment & Climate Change Dept (SEIAA)",
      departmentMr: "पर्यावरण व हवामान बदल विभाग (SEIAA)",
      applications: 145,
      approved: 76,
      pending: 58,
      rejected: 11,
      avgProcessingDays: 44.2,
      slaTargetDays: 35,
      complianceRate: 64.8,
      status: "Bottleneck",
      heatmapScore: "red"
    },
    {
      id: "dept-dish",
      department: "Directorate of Industrial Safety & Health (DISH)",
      departmentMr: "औद्योगिक सुरक्षा व आरोग्य संचालनालय (DISH)",
      applications: 160,
      approved: 92,
      pending: 54,
      rejected: 14,
      avgProcessingDays: 24.1,
      slaTargetDays: 20,
      complianceRate: 72.0,
      status: "Delayed",
      heatmapScore: "yellow"
    },
    {
      id: "dept-midc",
      department: "MIDC Water & Infrastructure Wing",
      departmentMr: "MIDC पाणी व पायाभूत सुविधा विभाग",
      applications: 110,
      approved: 86,
      pending: 18,
      rejected: 6,
      avgProcessingDays: 13.1,
      slaTargetDays: 14,
      complianceRate: 88.0,
      status: "Normal",
      heatmapScore: "green"
    }
  ],

  // 6-Month Processing Time & Inflow Trend
  monthlyTrend: [
    { month: "Apr", received: 110, approved: 92, avgDays: 14.8 },
    { month: "May", received: 145, approved: 120, avgDays: 13.5 },
    { month: "Jun", received: 190, approved: 155, avgDays: 12.8 },
    { month: "Jul", received: 230, approved: 180, avgDays: 12.1 },
    { month: "Aug", received: 295, approved: 230, avgDays: 11.6 },
    { month: "Sep (MTD)", received: 240, approved: 185, avgDays: 11.2 }
  ],

  // Bottleneck Radar & Root Cause Ranking
  bottlenecks: [
    {
      rank: 1,
      id: "BN-01",
      approval: "State Environmental Clearance (SEIAA)",
      approvalMr: "पर्यावरण आघात मंजुरी (SEIAA)",
      stage: "Expert Committee Appraisal",
      level: "Critical",
      metric: "Avg 44.2 Days (SLA: 35 Days)",
      applicationCount: 58,
      reason: "High backlog in Expert Appraisal Committee scheduling and review of baseline reports.",
      recommendation: "Convene bi-weekly virtual SEIAA evaluation hearings for low-emission agro units.",
      costOfDelay: "5 days delay • 2 dependent approvals blocked • 1 field inspection affected"
    },
    {
      rank: 2,
      id: "BN-02",
      approval: "Factory Licence & Boiler Scrutiny (DISH)",
      approvalMr: "फॅक्टरी परवाना व बॉयलर स्क्रूटनी (DISH)",
      stage: "Safety Officer Physical Audit",
      level: "Warning",
      metric: "Avg 24.1 Days (SLA: 20 Days)",
      applicationCount: 54,
      reason: "Shortage of certified boiler safety inspectors in Nagpur and Pune industrial corridors.",
      recommendation: "Empanel certified third-party chartered safety engineers for preliminary audits.",
      costOfDelay: "4.1 days delay • Commissioning schedule pushed back 2 weeks"
    },
    {
      rank: 3,
      id: "BN-03",
      approval: "Water Connection Demarcation (MIDC)",
      approvalMr: "पाणी जोडणी नकाशा मंजुरी (MIDC)",
      stage: "Applicant Query Resubmission",
      level: "Watch",
      metric: "Query Resolution Taking Avg 9.2 Days",
      applicationCount: 18,
      reason: "Delays by applicants in uploading revised pipeline branch drawing after initial objection.",
      recommendation: "Provide standard CAD templates in Document Locker for underground water sumps.",
      costOfDelay: "Applicant document revision turnaround delay"
    }
  ],

  // Bottleneck Radar Dimensions (Scale 0-100 where higher is smoother)
  radarDimensions: [
    { dimension: "Documentation", score: 86, fullMark: 100 },
    { dimension: "Desk Review", score: 78, fullMark: 100 },
    { dimension: "Site Inspection", score: 65, fullMark: 100 },
    { dimension: "Query Resolution", score: 72, fullMark: 100 },
    { dimension: "Final Decision", score: 92, fullMark: 100 }
  ]
};
