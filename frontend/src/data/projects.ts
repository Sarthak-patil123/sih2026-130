import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: "PROJ-2026-001",
    projectName: "Integrated Agro & Fruit Processing Complex",
    projectNameMr: "एकात्मिक कृषी व फळ प्रक्रिया प्रकल्प",
    companyName: "ABC Food Processing Pvt. Ltd.",
    companyNameMr: "एबीसी फूड प्रोसेसिंग प्रा. लि.",
    industry: "Food Processing",
    industryMr: "अन्न प्रक्रिया व कृषी उद्योग",
    projectType: "New Industrial Unit",
    projectTypeMr: "नवीन औद्योगिक घटक (Greenfield)",
    investment: "₹50 Crore",
    investmentValue: 500000000,
    landArea: "15 Acres (65,340 sq.m.)",
    employees: "200 Persons",
    employeesCount: 200,
    productionCapacity: "1,200 MT/month processed fruit pulp & concentrates",
    district: "Nagpur",
    districtMr: "नागपूर",
    taluka: "Nagpur Rural",
    industrialArea: "Butibori MIDC Phase II",
    address: "Plot B-14, Sector 4, Butibori Industrial Area, Nagpur, Maharashtra - 441122",
    
    // Project Passport & Readiness Breakdown
    overallReadiness: 74,
    journeyProgress: 68,
    readinessBreakdown: {
      documentation: 86,
      approvals: 70,
      inspections: 50,
      compliance: 100
    },
    
    // Active Blockers
    blockers: [
      {
        id: "BLK-01",
        approvalName: "Environmental Approval (SEIAA)",
        approvalNameMr: "पर्यावरण मंजुरी (SEIAA)",
        issue: "Environmental Impact Baseline Report is missing",
        issueMr: "पर्यावरण परिणाम बेसलाइन अहवाल अपलोड केलेला नाही",
        impact: "1 approval blocked • 2 downstream pipeline processes waiting",
        impactMr: "१ मंजुरी प्रलंबित • पुढील २ प्रक्रिया थांबलेल्या आहेत",
        actionRequired: "Upload Environmental Baseline Study",
        actionRequiredMr: "पर्यावरण बेसलाइन अभ्यास अहवाल अपलोड करा",
        severity: "critical",
        applicationId: "APP-2026-00127"
      },
      {
        id: "BLK-02",
        approvalName: "Industrial Water Permission",
        approvalNameMr: "औद्योगिक पाणी परवानगी",
        issue: "Officer Query Raised: Revised boundary map with underground sump needed",
        issueMr: "अधिकाऱ्याची शंका: भूमिगत संप सह सुधारित सीमा नकाशा आवश्यक आहे",
        impact: "MIDC Water sanction delayed until drawing revised",
        impactMr: "सुधारित नकाशा मिळेपर्यंत पाणी मंजुरी आदेश प्रलंबित",
        actionRequired: "Upload Revised Demarcation Document",
        actionRequiredMr: "सुधारित रेखांकन नकाशा अपलोड करा",
        severity: "warning",
        applicationId: "APP-2026-00128"
      }
    ],

    // Next Best Action recommendations
    nextBestActions: [
      {
        id: "NBA-01",
        type: "danger",
        title: "Upload revised land document",
        titleMr: "सुधारित जमीन नकाशा अपलोड करा",
        subtitle: "Water Permission • MIDC Water Supply Wing",
        deadline: "22 September 2026",
        actionLabel: "Resolve now",
        actionLabelMr: "आता सोडवा",
        link: "/entrepreneur/applications/APP-2026-00128"
      },
      {
        id: "NBA-02",
        type: "warning",
        title: "Fire safety inspection upcoming",
        titleMr: "अग्निशामक सुरक्षा तपासणी नियोजित",
        subtitle: "18 September at 11:00 AM • Officer 24",
        deadline: "18 September 2026",
        actionLabel: "View inspection",
        actionLabelMr: "तपासणी पहा",
        link: "/entrepreneur/inspections"
      },
      {
        id: "NBA-03",
        type: "success",
        title: "Fire Provisional NOC approved",
        titleMr: "अग्निशामक तात्पुरती NOC मंजूर झाली",
        subtitle: "Certificate #MAH/FIRE/2026/0941 generated",
        deadline: "Completed",
        actionLabel: "View approval",
        actionLabelMr: "मंजुरी पहा",
        link: "/entrepreneur/applications/APP-2026-00124"
      }
    ],

    totalApprovals: 6,
    approvedCount: 2,
    underReviewCount: 2,
    pendingCount: 1,
    actionRequiredCount: 1,
    status: "In Progress",
    createdAt: "10 Aug 2026",
    estimatedCommissioning: "March 2027"
  },
  {
    id: "PROJ-2026-002",
    projectName: "Sahyadri Precision Auto Engineering",
    projectNameMr: "सह्याद्री प्रिसिजन ऑटो इंजिनिअरिंग",
    companyName: "Sahyadri Auto Components Ltd.",
    companyNameMr: "सह्याद्री ऑटो कॉम्पोनंट्स लि.",
    industry: "Automotive & Engineering",
    industryMr: "ऑटोमोटिव्ह व अभियांत्रिकी",
    projectType: "Expansion of Existing Unit",
    projectTypeMr: "विद्यमान प्रकल्पाचा विस्तार",
    investment: "₹35 Crore",
    investmentValue: 350000000,
    landArea: "8.5 Acres (37,000 sq.m.)",
    employees: "150 Persons",
    employeesCount: 150,
    productionCapacity: "45,000 Precision Gears/month",
    district: "Pune",
    districtMr: "पुणे",
    taluka: "Khed",
    industrialArea: "Chakan MIDC Phase III",
    address: "Plot C-22, Chakan Industrial Area, Pune, Maharashtra - 410501",
    overallReadiness: 92,
    journeyProgress: 88,
    readinessBreakdown: {
      documentation: 100,
      approvals: 88,
      inspections: 80,
      compliance: 100
    },
    blockers: [],
    nextBestActions: [
      {
        id: "NBA-04",
        type: "info",
        title: "You're all set",
        titleMr: "सर्व काही व्यवस्थित आहे",
        subtitle: "All submissions are in order. No action required from you right now.",
        deadline: "On track",
        actionLabel: "View Dashboard",
        actionLabelMr: "डॅशबोर्ड पहा",
        link: "/entrepreneur/dashboard"
      }
    ],
    totalApprovals: 8,
    approvedCount: 7,
    underReviewCount: 1,
    pendingCount: 0,
    actionRequiredCount: 0,
    status: "Near Completion",
    createdAt: "15 June 2026",
    estimatedCommissioning: "November 2026"
  }
];
