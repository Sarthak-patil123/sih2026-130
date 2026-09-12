import { DocumentItem } from '../types';

export const initialDocuments: DocumentItem[] = [
  {
    id: "DOC-001",
    name: "Enterprise PAN Card",
    nameMr: "संस्थेचे पॅन कार्ड",
    category: "Corporate Legal",
    status: "Verified",
    uploadedDate: "10 Aug 2026",
    expiryDate: null,
    fileSize: "1.1 MB",
    fileType: "PDF",
    fileName: "PAN_ABC_Food_Processing.pdf",
    verifiedBy: "Directorate of Industries",
    mandatory: true,
    usedIn: [
      { id: "APPR-REG-01", name: "Project Registration", dept: "Directorate of Industries" },
      { id: "APPR-MPCB-03", name: "Pollution Consent", dept: "MPCB" },
      { id: "SCH-PSI-2019", name: "PSI 2019 Subsidy Scheme", dept: "Industries Dept" }
    ],
    plainExplanation: "Permanent Account Number verifying business legal entity for tax and corporate compliance."
  },
  {
    id: "DOC-002",
    name: "Maharashtra GSTIN Registration",
    nameMr: "महाराष्ट्र जीएसटी नोंदणी प्रमाणपत्र",
    category: "Tax & Compliance",
    status: "Verified",
    uploadedDate: "10 Aug 2026",
    expiryDate: null,
    fileSize: "1.4 MB",
    fileType: "PDF",
    fileName: "GSTIN_27AABCA8923F1Z8.pdf",
    verifiedBy: "State GST Dept",
    mandatory: true,
    usedIn: [
      { id: "APPR-REG-01", name: "Project Registration", dept: "Directorate of Industries" },
      { id: "SCH-PSI-2019", name: "Industrial Promotion Subsidy (IPS)", dept: "Industries Dept" },
      { id: "SCH-POWER-2024", name: "Power Tariff Rebate", dept: "Energy Dept" }
    ],
    plainExplanation: "State goods & service tax certificate enabling tax-incentive claims and interstate trade."
  },
  {
    id: "DOC-003",
    name: "Certificate of Incorporation (MCA)",
    nameMr: "कंपनी नोंदणी प्रमाणपत्र (MCA)",
    category: "Corporate Legal",
    status: "Verified",
    uploadedDate: "10 Aug 2026",
    expiryDate: null,
    fileSize: "2.1 MB",
    fileType: "PDF",
    fileName: "COI_U15400MH2024PTC392811.pdf",
    verifiedBy: "Ministry of Corporate Affairs",
    mandatory: true,
    usedIn: [
      { id: "APPR-REG-01", name: "Project Registration", dept: "Directorate of Industries" },
      { id: "APPR-LAND-02", name: "MIDC Building Plan", dept: "MIDC" },
      { id: "APPR-FIRE-04", name: "Fire Safety NOC", dept: "Fire Services" }
    ],
    plainExplanation: "Foundational legal document proving private limited company establishment in India."
  },
  {
    id: "DOC-004",
    name: "MIDC Land Allotment & Possession Deed",
    nameMr: "MIDC जमीन वाटप व ताबा पावती",
    category: "Land & Civil",
    status: "Missing",
    uploadedDate: null,
    expiryDate: null,
    fileSize: null,
    fileType: null,
    fileName: null,
    verifiedBy: null,
    mandatory: true,
    usedIn: [
      { id: "APPR-LAND-02", name: "Building Plan Approval", dept: "MIDC" },
      { id: "APPR-FIRE-04", name: "Fire NOC", dept: "Fire Services" },
      { id: "APPR-WATER-06", name: "Water Sanction", dept: "MIDC Water Wing" }
    ],
    plainExplanation: "Official plot lease deed from MIDC establishing boundary coordinates and ownership."
  },
  {
    id: "DOC-005",
    name: "Architectural Factory Layout Plan",
    nameMr: "वास्तुविशारद प्रमाणित इमारत आराखडा",
    category: "Civil Engineering",
    status: "Verified",
    uploadedDate: "18 Aug 2026",
    expiryDate: null,
    fileSize: "8.4 MB",
    fileType: "PDF",
    fileName: "Architect_Building_Plan_Final_Rev2.pdf",
    verifiedBy: "MIDC Town Planning Wing",
    mandatory: true,
    usedIn: [
      { id: "APPR-LAND-02", name: "Building Plan Approval", dept: "MIDC" },
      { id: "APPR-FIRE-04", name: "Fire NOC", dept: "Fire Services" },
      { id: "APPR-FACT-07", name: "Factory Licence", dept: "DISH" }
    ],
    plainExplanation: "Detailed scaled architectural CAD layout demonstrating setbacks, roads, and building FAR."
  },
  {
    id: "DOC-006",
    name: "Fire Safety & Hydrant Scheme Drawing",
    nameMr: "अग्निशामक सुरक्षा व हायड्रंट आराखडा",
    category: "Fire & Safety",
    status: "Expiring",
    uploadedDate: "18 Aug 2026",
    expiryDate: "09 Oct 2026",
    daysToExpiry: 27,
    fileSize: "6.8 MB",
    fileType: "PDF",
    fileName: "Fire_Hydrant_Evacuation_Map.pdf",
    verifiedBy: "Maharashtra Fire Services",
    mandatory: true,
    usedIn: [
      { id: "APPR-FIRE-04", name: "Fire Provisional NOC", dept: "Fire Services" }
    ],
    plainExplanation: "Fire hydrant ring layout, static water reservoir calculation, and fire tender turning radius."
  },
  {
    id: "DOC-007",
    name: "Effluent Treatment Plant (ETP) Engineering Design",
    nameMr: "सांडपाणी प्रक्रिया प्रकल्प (ETP) डिझाइन",
    category: "Environmental",
    status: "Under Review",
    uploadedDate: "28 Aug 2026",
    expiryDate: null,
    fileSize: "4.8 MB",
    fileType: "PDF",
    fileName: "ETP_STP_Detailed_Engineering.pdf",
    verifiedBy: "MPCB Technical Desk",
    mandatory: true,
    usedIn: [
      { id: "APPR-MPCB-03", name: "Pollution Consent to Establish", dept: "MPCB" },
      { id: "APPR-ENV-05", name: "Environmental Clearance", dept: "SEIAA" }
    ],
    plainExplanation: "Chemical and biological waste water neutralization scheme ensuring zero liquid discharge."
  },
  {
    id: "DOC-008",
    name: "Baseline Environmental Quality Study Report",
    nameMr: "पर्यावरण बेसलाइन गुणवत्ता अभ्यास अहवाल",
    category: "Environmental",
    status: "Missing",
    uploadedDate: null,
    expiryDate: null,
    fileSize: null,
    fileType: null,
    fileName: null,
    verifiedBy: null,
    mandatory: true,
    usedIn: [
      { id: "APPR-ENV-05", name: "State Environmental Clearance", dept: "SEIAA" }
    ],
    plainExplanation: "3-month ambient air, groundwater, and noise quality testing report by NABL accredited lab."
  }
];
