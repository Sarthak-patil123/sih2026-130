import { Application } from '../types';

export const initialApplications: Application[] = [
  {
    id: "APP-2026-00124",
    projectId: "PROJ-2026-001",
    projectName: "Integrated Agro & Fruit Processing Complex",
    companyName: "ABC Food Processing Pvt. Ltd.",
    approvalId: "APPR-FIRE-04",
    approval: "Fire Safety Provisional NOC",
    department: "Maharashtra Fire & Emergency Services",
    submittedOn: "18 Aug 2026",
    lastUpdated: "10 Sept 2026",
    deadline: "02 Oct 2026",
    status: "Under Review",
    priority: "High",
    assignedOfficer: "Shri V. R. Shinde (Divisional Fire Officer, Nagpur)",
    feesPaid: "₹25,000",
    paymentRef: "MAH-EPAY-994821",
    timeline: [
      { step: "Application Submitted", date: "18 Aug 2026", status: "completed", remarks: "Application and online fee received successfully." },
      { step: "Documents Verified", date: "24 Aug 2026", status: "completed", remarks: "All 5 uploaded statutory documents verified." },
      { step: "Officer Review", date: "02 Sept 2026", status: "current", remarks: "Technical review of fire egress drawings underway." },
      { step: "Inspection Scheduled", date: "Pending", status: "upcoming", remarks: "Site audit by sub-officer to verify hydrant access." },
      { step: "Final Approval & NOC", date: "Pending", status: "upcoming", remarks: "Issuance of digitally signed Fire NOC certificate." }
    ],
    documents: [
      { name: "Application Form (Form 1A)", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "1.4 MB", uploadDate: "18 Aug 2026" },
      { name: "Company Registration Certificate", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "2.1 MB", uploadDate: "18 Aug 2026" },
      { name: "Building Plan & Elevation Drawings", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "8.4 MB", uploadDate: "18 Aug 2026" },
      { name: "Land Ownership / Possession Deed", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "4.2 MB", uploadDate: "18 Aug 2026" },
      { name: "Fire Safety & Hydrant Scheme Drawing", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "6.8 MB", uploadDate: "18 Aug 2026" }
    ],
    queries: [
      {
        id: "QRY-101",
        raisedBy: "Shri V. R. Shinde (Fire Officer)",
        raisedDate: "05 Sept 2026",
        queryText: "Please verify setback distance of 6 meters on north boundary for fire tender turnaround as per NBC 2016 Part 4.",
        deadline: "20 Sept 2026",
        status: "Resolved",
        response: "Revised north boundary drawing with 6.5m clear driveway attached and verified.",
        responseDate: "08 Sept 2026"
      }
    ],
    inspectionId: "INSP-2026-088"
  },
  {
    id: "APP-2026-00125",
    projectId: "PROJ-2026-001",
    projectName: "Integrated Agro & Fruit Processing Complex",
    companyName: "ABC Food Processing Pvt. Ltd.",
    approvalId: "APPR-FACT-07",
    approval: "Factory Licence & Machinery Approval",
    department: "Directorate of Industrial Safety & Health (DISH)",
    submittedOn: "22 Aug 2026",
    lastUpdated: "08 Sept 2026",
    deadline: "11 Oct 2026",
    status: "Under Review",
    priority: "Medium",
    assignedOfficer: "Shri A. K. Patwardhan (Joint Director DISH)",
    feesPaid: "₹45,000",
    paymentRef: "MAH-EPAY-995112",
    timeline: [
      { step: "Application Submitted", date: "22 Aug 2026", status: "completed", remarks: "Form 1 and machinery load schedules submitted." },
      { step: "Documents Scrutiny", date: "29 Aug 2026", status: "completed", remarks: "Electrical load calculation and layout approved in-principle." },
      { step: "Safety Officer Review", date: "08 Sept 2026", status: "current", remarks: "Reviewing worker safety protocol for pulp boiling boilers." },
      { step: "Joint Site Inspection", date: "Pending", status: "upcoming", remarks: "Inspection of high pressure boilers & emergency exits." },
      { step: "Licence Grant", date: "Pending", status: "upcoming", remarks: "Issuance of Factory License under Factories Act 1948." }
    ],
    documents: [
      { name: "Machinery Layout & Flow Diagram", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "5.1 MB", uploadDate: "22 Aug 2026" },
      { name: "Electrical Connected Load Sanction", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "1.9 MB", uploadDate: "22 Aug 2026" },
      { name: "Boiler Safety Compliance Certificate", required: true, uploaded: true, status: "Under Review", fileUrl: "#", fileSize: "3.2 MB", uploadDate: "22 Aug 2026" },
      { name: "Worker Occupational Health Protocol", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "1.2 MB", uploadDate: "22 Aug 2026" }
    ],
    queries: []
  },
  {
    id: "APP-2026-00126",
    projectId: "PROJ-2026-001",
    projectName: "Integrated Agro & Fruit Processing Complex",
    companyName: "ABC Food Processing Pvt. Ltd.",
    approvalId: "APPR-MPCB-03",
    approval: "Consent to Establish (CTE - Orange Category)",
    department: "Maharashtra Pollution Control Board (MPCB)",
    submittedOn: "28 Aug 2026",
    lastUpdated: "28 Aug 2026",
    deadline: "27 Oct 2026",
    status: "Pending",
    priority: "High",
    assignedOfficer: "Dr. Sandeep Mane (Sub-Regional Officer, MPCB Nagpur)",
    feesPaid: "₹75,000",
    paymentRef: "MAH-EPAY-996041",
    timeline: [
      { step: "Application Submitted", date: "28 Aug 2026", status: "completed", remarks: "Online Form submitted along with ETP engineering drawings." },
      { step: "Preliminary Scrutiny", date: "Pending", status: "upcoming", remarks: "Desk officer checking effluent load calculations." },
      { step: "Field Officer Inspection", date: "Pending", status: "upcoming", remarks: "Site audit for discharge point and green belt plan." },
      { step: "Consent Committee Review", date: "Pending", status: "upcoming", remarks: "Approval by Regional Consent Committee." },
      { step: "CTE Sanction Letter", date: "Pending", status: "upcoming", remarks: "Grant of Consent to Establish." }
    ],
    documents: [
      { name: "ETP / STP Process Design & Layout", required: true, uploaded: true, status: "Under Review", fileUrl: "#", fileSize: "4.8 MB", uploadDate: "28 Aug 2026" },
      { name: "Air Pollution Control Equipment Data", required: true, uploaded: true, status: "Under Review", fileUrl: "#", fileSize: "2.3 MB", uploadDate: "28 Aug 2026" },
      { name: "Water Budget & Recycling Plan", required: true, uploaded: true, status: "Under Review", fileUrl: "#", fileSize: "1.7 MB", uploadDate: "28 Aug 2026" },
      { name: "MIDC Drainage Connection Undertaking", required: true, uploaded: false, status: "Pending", fileUrl: null, fileSize: null, uploadDate: null }
    ],
    queries: []
  },
  {
    id: "APP-2026-00127",
    projectId: "PROJ-2026-001",
    projectName: "Integrated Agro & Fruit Processing Complex",
    companyName: "ABC Food Processing Pvt. Ltd.",
    approvalId: "APPR-ENV-05",
    approval: "State Environmental Impact Clearance",
    department: "Environment & Climate Change Dept (SEIAA)",
    submittedOn: "15 Aug 2026",
    lastUpdated: "04 Sept 2026",
    deadline: "29 Sept 2026",
    status: "Inspection Pending",
    priority: "High",
    assignedOfficer: "Dr. Pratibha Joshi (Environmental Officer, SEIAA)",
    feesPaid: "₹1,00,000",
    paymentRef: "MAH-EPAY-993991",
    timeline: [
      { step: "EIA Application Submitted", date: "15 Aug 2026", status: "completed", remarks: "EMP and baseline environment study submitted." },
      { step: "Technical Committee Scrutiny", date: "25 Aug 2026", status: "completed", remarks: "Terms of Reference (ToR) compliance verified." },
      { step: "Site Inspection Scheduled", date: "04 Sept 2026", status: "current", remarks: "Physical inspection of agro-processing plot scheduled for 18 Sept 2026." },
      { step: "SEAC Appraisal", date: "Pending", status: "upcoming", remarks: "Presentation before State Expert Appraisal Committee." },
      { step: "Environmental Clearance", date: "Pending", status: "upcoming", remarks: "Final EC sanction order." }
    ],
    documents: [
      { name: "Environment Management Plan (EMP)", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "12.4 MB", uploadDate: "15 Aug 2026" },
      { name: "Baseline Quality Monitoring Report", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "7.9 MB", uploadDate: "15 Aug 2026" },
      { name: "Rainwater Harvesting Feasibility Study", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "3.5 MB", uploadDate: "15 Aug 2026" }
    ],
    queries: [],
    inspectionId: "INSP-2026-092"
  },
  {
    id: "APP-2026-00128",
    projectId: "PROJ-2026-001",
    projectName: "Integrated Agro & Fruit Processing Complex",
    companyName: "ABC Food Processing Pvt. Ltd.",
    approvalId: "APPR-WATER-06",
    approval: "Industrial Water Permission & Pipeline Sanction",
    department: "MIDC Water Supply Wing",
    submittedOn: "12 Aug 2026",
    lastUpdated: "09 Sept 2026",
    deadline: "26 Sept 2026",
    status: "Query Raised",
    priority: "Medium",
    assignedOfficer: "Er. Rameshwar Jadhav (Executive Engineer, MIDC Water)",
    feesPaid: "₹15,000",
    paymentRef: "MAH-EPAY-992140",
    timeline: [
      { step: "Water Demand Application", date: "12 Aug 2026", status: "completed", remarks: "Demand of 150 KL/day logged." },
      { step: "Hydraulic Feasibility Check", date: "20 Aug 2026", status: "completed", remarks: "Butibori 300mm feeder line capacity confirmed." },
      { step: "Technical Query Raised", date: "09 Sept 2026", status: "current", remarks: "Officer raised query on internal recycling ratio & revised land document." },
      { step: "Sanction & Meter Installation", date: "Pending", status: "upcoming", remarks: "Final water sanction order and valve fitting." }
    ],
    documents: [
      { name: "Water Requirement & Balance Flow Chart", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "1.8 MB", uploadDate: "12 Aug 2026" },
      { name: "Plot Land Ownership Document", required: true, uploaded: false, status: "Action Required", fileUrl: null, fileSize: null, uploadDate: null },
      { name: "ETP Treated Water Recycling Plan", required: true, uploaded: true, status: "Under Review", fileUrl: "#", fileSize: "2.6 MB", uploadDate: "12 Aug 2026" }
    ],
    queries: [
      {
        id: "QRY-102",
        raisedBy: "Er. Rameshwar Jadhav (MIDC Water)",
        raisedDate: "09 Sept 2026",
        queryText: "Please upload the revised land demarcation document showing exact location of underground water sump and main pipeline entry point.",
        deadline: "22 Sept 2026",
        status: "Open",
        response: null,
        responseDate: null
      }
    ]
  },
  {
    id: "APP-2026-00120",
    projectId: "PROJ-2026-001",
    projectName: "Integrated Agro & Fruit Processing Complex",
    companyName: "ABC Food Processing Pvt. Ltd.",
    approvalId: "APPR-REG-01",
    approval: "Project Registration & In-Principle Clearance",
    department: "Directorate of Industries",
    submittedOn: "10 Aug 2026",
    lastUpdated: "16 Aug 2026",
    deadline: "17 Aug 2026",
    approvedDate: "16 Aug 2026",
    status: "Approved",
    priority: "High",
    assignedOfficer: "Smt. Anjali Kulkarni, IAS (Joint Director)",
    feesPaid: "₹5,000",
    paymentRef: "MAH-EPAY-990812",
    certificateNo: "MAH/IND/REG/2026/0941",
    timeline: [
      { step: "Online Application Filed", date: "10 Aug 2026", status: "completed", remarks: "Basic project info & DPR received." },
      { step: "Scrutiny of Company KYC", date: "12 Aug 2026", status: "completed", remarks: "MCA registration & PAN validated." },
      { step: "Nodal Officer Clearance", date: "14 Aug 2026", status: "completed", remarks: "Project alignment with Maharashtra Industrial Policy verified." },
      { step: "Registration Issued", date: "16 Aug 2026", status: "completed", remarks: "Registration certificate generated with QR Code." }
    ],
    documents: [
      { name: "Company Incorporation Certificate", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "1.9 MB", uploadDate: "10 Aug 2026" },
      { name: "Enterprise PAN & GSTIN Copy", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "1.1 MB", uploadDate: "10 Aug 2026" },
      { name: "Detailed Project Report (DPR)", required: true, uploaded: true, status: "Verified", fileUrl: "#", fileSize: "9.2 MB", uploadDate: "10 Aug 2026" }
    ],
    queries: []
  }
];
