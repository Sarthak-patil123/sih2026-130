import { Scheme } from '../types';

export const initialSchemes: Scheme[] = [
  {
    id: "SCH-PSI-2019",
    name: "Package Scheme of Incentives (PSI 2019) — Industrial Promotion Subsidy (IPS)",
    department: "Industries Department, Govt. of Maharashtra",
    industry: "Food Processing & Manufacturing",
    category: "State Policy Incentive",
    eligibilityCriteria: "New industrial units established in Zone D / D+ / Vidarbha with capital investment > ₹25 Crore.",
    status: "Eligible",
    benefits: "Up to 80% Gross SGST reimbursement for 10 years, 5% Interest Subsidy on Term Loans (max ₹1 Cr/yr), 100% Stamp Duty Exemption.",
    requiredDocuments: [
      "Project Registration Certificate",
      "Term Loan Sanction Letter",
      "Chartered Accountant Capital Expenditure Certificate",
      "MPCB Consent to Operate / Establish"
    ],
    applicationDeadline: "31 March 2027",
    matchingScore: 98,
    eligibleSectors: ["Food Processing", "Manufacturing", "Automotive", "Textiles"],
    minInvestmentCr: 25,
    applicableDistricts: ["Nagpur", "Wardha", "Amravati", "Chandrapur", "Aurangabad", "Nanded"]
  },
  {
    id: "SCH-AGRO-2023",
    name: "Maharashtra Agro & Food Processing Policy — Capital Investment Grant",
    department: "Agriculture & Marketing Department, Govt. of Maharashtra",
    industry: "Food Processing",
    category: "Sectoral Grant",
    eligibilityCriteria: "Direct primary and secondary agro-processing units, fruit pulp preservation, and modern cold storage chains.",
    status: "Eligible",
    benefits: "25% Capital Subsidy on plant and machinery up to ₹5.00 Crore, 50% cold chain freight subsidy for export shipments.",
    requiredDocuments: [
      "FSSAI Manufacturing License (or applied copy)",
      "Technical Appraisal Report from National Institute of Food Tech",
      "Detailed Project Report with Raw Material Tie-up"
    ],
    applicationDeadline: "31 December 2026",
    matchingScore: 95,
    eligibleSectors: ["Food Processing", "Agriculture"],
    minInvestmentCr: 5,
    applicableDistricts: ["All Districts of Maharashtra"]
  },
  {
    id: "SCH-POWER-2024",
    name: "Industrial Power Tariff Concession & Duty Exemption Scheme",
    department: "Energy Department / MSEDCL",
    industry: "All Industrial Sectors",
    category: "Utility Subsidy",
    eligibilityCriteria: "HT Industrial power consumers in Vidarbha, Marathwada, and North Maharashtra zones with contracted load > 100 kVA.",
    status: "Eligible",
    benefits: "₹1.50 per unit electricity tariff rebate for 5 years from commercial operations, 100% electricity duty waiver for 7 years.",
    requiredDocuments: [
      "MSEDCL HT Connection Sanction Letter",
      "Factory Registration Certificate",
      "Electrical Inspector Test Report"
    ],
    applicationDeadline: "Open Scheme",
    matchingScore: 90,
    eligibleSectors: ["All Manufacturing", "Food Processing", "Automotive", "Textiles", "Chemicals"],
    minInvestmentCr: 1,
    applicableDistricts: ["Nagpur", "Amravati", "Aurangabad", "Nashik", "Nanded"]
  },
  {
    id: "SCH-MSME-CAP",
    name: "Vidarbha-Marathwada Special MSME Capital Incentive Scheme",
    department: "Directorate of Industries",
    industry: "MSME Engineering & Agro",
    category: "Regional Development",
    eligibilityCriteria: "Enterprises with investment in plant & machinery up to ₹50 Crore under Micro, Small & Medium category.",
    status: "Check Eligibility",
    benefits: "Additional 10% Capital Subsidy on innovative technology adoption, patent registration subsidy up to ₹10 Lakh.",
    requiredDocuments: [
      "Udyam Registration Certificate",
      "Audited Balance Sheets (if existing)",
      "Machinery Invoices & Quotations"
    ],
    applicationDeadline: "31 October 2026",
    matchingScore: 82,
    eligibleSectors: ["Food Processing", "Automotive & Engineering", "Textiles"],
    minInvestmentCr: 2,
    applicableDistricts: ["Nagpur", "Bhandara", "Gondia", "Gadchiroli", "Jalna"]
  },
  {
    id: "SCH-MEDA-GREEN",
    name: "MEDA Industrial Rooftop Solar & Clean Energy Incentive",
    department: "Maharashtra Energy Development Agency (MEDA)",
    industry: "Green & Renewable Energy",
    category: "Sustainability Subsidy",
    eligibilityCriteria: "Industrial units installing captive rooftop solar power plants with minimum 50 kWp capacity.",
    status: "Check Eligibility",
    benefits: "15% capital grant on solar EPC cost, accelerated depreciation benefit, and net-metering priority clearance.",
    requiredDocuments: [
      "MEDA Grid Connectivity Feasibility Certificate",
      "Roof Structural Stability Certificate",
      "Vendor Empanelment Agreement"
    ],
    applicationDeadline: "15 January 2027",
    matchingScore: 78,
    eligibleSectors: ["All Industrial Sectors"],
    minInvestmentCr: 0.5,
    applicableDistricts: ["All Districts of Maharashtra"]
  }
];
