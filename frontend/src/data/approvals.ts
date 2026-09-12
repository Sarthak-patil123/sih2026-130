import { ApprovalTemplate } from '../types';

export const approvalTemplates: ApprovalTemplate[] = [
  {
    id: "APPR-REG-01",
    name: "Project Registration & In-Principle Approval",
    nameMr: "प्रकल्प नोंदणी व तत्त्वतः मंजुरी",
    department: "Directorate of Industries",
    departmentMr: "उद्योग संचालनालय",
    category: "Pre-Establishment",
    slaDays: 7,
    isParallel: false,
    order: 1,
    dependsOn: [],
    requiredDocs: [
      "Company Registration / Certificate of Incorporation",
      "PAN Card of Enterprise",
      "Detailed Project Report (DPR)",
      "Board Resolution / Authorized Signatory Letter"
    ],
    description: "Statutory acknowledgement and issuance of single-window industrial registration number.",
    
    // Plain Language & AI Contextual Intelligence
    plainLanguageEn: "Official government registration verifying your company and issuing your single-window industrial project ID.",
    plainLanguageMr: "आपल्या कंपनीची अधिकृत शासकीय नोंदणी आणि सिंगल विंडो इंडस्ट्रियल प्रोजेक्ट आयडी मिळवण्याची प्रक्रिया.",
    whyNeededEn: "Required as the foundational gateway before any department (MIDC, MPCB, Fire) accepts statutory clearance applications.",
    whyNeededMr: "कोणत्याही विभागात (MIDC, MPCB, अग्निशामक) मंजुरीसाठी अर्ज करण्यापूर्वी ही प्राथमिक शासकीय नोंदणी आवश्यक आहे.",
    whatHappensNextEn: "Once approved, parallel clearance applications for Land, Fire NOC, and Pollution Consent will unlock.",
    whatHappensNextMr: "नोंदणी मंजूर झाल्यावर जमीन, अग्निशामक NOC आणि प्रदूषण संमतीसाठी एकाच वेळी अर्ज करण्याचे मार्ग खुले होतात."
  },
  {
    id: "APPR-LAND-02",
    name: "MIDC Building Plan & Setback Approval",
    nameMr: "MIDC इमारत आराखडा व बांधकाम मंजुरी",
    department: "Maharashtra Industrial Development Corporation (MIDC)",
    departmentMr: "महाराष्ट्र औद्योगिक विकास महामंडळ (MIDC)",
    category: "Pre-Establishment",
    slaDays: 21,
    isParallel: true,
    order: 2,
    dependsOn: ["APPR-REG-01"],
    requiredDocs: [
      "Land Allotment Letter / Possession Receipt",
      "Architect Certified Building Layout Plan",
      "Structural Stability Certificate",
      "Site Topography Survey Map"
    ],
    description: "Clearance of civil drawings, setbacks, FAR compliance, and plot demarcation.",
    plainLanguageEn: "Approval showing your factory building, boundary distances, and roads meet industrial safety standards.",
    plainLanguageMr: "आपली फॅक्टरी इमारत, सीमा अंतर (Setback) आणि रस्ते सुरक्षिततेच्या नियमांनुसार आहेत याची तपासणी व मंजुरी.",
    whyNeededEn: "Mandatory before undertaking any civil construction on the MIDC plot.",
    whyNeededMr: "MIDC प्लॉटवर कोणतेही बांधकाम सुरू करण्यापूर्वी ही कायदेशीर मंजुरी आवश्यक आहे.",
    whatHappensNextEn: "Town planning officer verifies FAR and issues provisional building construction permit.",
    whatHappensNextMr: "नगररचना अधिकारी आराखडा तपासून तात्पुरती बांधकाम परवानगी जारी करतात."
  },
  {
    id: "APPR-FIRE-04",
    name: "Fire Safety Provisional NOC",
    nameMr: "अग्निशामक सुरक्षा तात्पुरती NOC",
    department: "Maharashtra Fire & Emergency Services",
    departmentMr: "महाराष्ट्र अग्निशामक व आपत्कालीन सेवा",
    category: "Pre-Establishment",
    slaDays: 15,
    isParallel: true,
    order: 3,
    dependsOn: ["APPR-REG-01", "APPR-LAND-02"],
    requiredDocs: [
      "Approved Architectural Building Plan",
      "Fire Hydrant & Sprinkler Layout Drawing",
      "Emergency Evacuation & Access Road Scheme",
      "Fire Consultant Safety Audit Report"
    ],
    description: "Provisional fire safety clearance for industrial layout, hydrant lines, and hazard mitigation.",
    plainLanguageEn: "Verification that your factory has adequate emergency exits, water tanks, and hydrants in case of fire.",
    plainLanguageMr: "आग लागल्यास सुरक्षेसाठी आपत्कालीन रस्ते, पाण्याच्या टाक्या आणि अग्निशामक यंत्रणा सज्ज असल्याची खात्री.",
    whyNeededEn: "Guarantees life safety for factory workers and complies with National Building Code Part 4.",
    whyNeededMr: "कामगारांच्या सुरक्षिततेसाठी आणि राष्ट्रीय इमारत संहितेचे पालन करण्यासाठी आवश्यक.",
    whatHappensNextEn: "Officer schedules site inspection to inspect access driveway and static water sump.",
    whatHappensNextMr: "अधिकारी रस्त्याची रुंदी आणि पाण्याच्या टाक्या तपासण्यासाठी प्रत्यक्ष जागेची पाहणी करतात."
  },
  {
    id: "APPR-MPCB-03",
    name: "Consent to Establish (CTE - Orange Category)",
    nameMr: "प्रदूषण नियंत्रण संमती (CTE - ऑरेंज श्रेणी)",
    department: "Maharashtra Pollution Control Board (MPCB)",
    departmentMr: "महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB)",
    category: "Pre-Establishment",
    slaDays: 30,
    isParallel: true,
    order: 4,
    dependsOn: ["APPR-REG-01"],
    requiredDocs: [
      "Manufacturing Process Flow Chart",
      "Effluent Treatment Plant (ETP) / STP Scheme",
      "Air Emission & Chimney Stack Details",
      "Hazardous Waste Disposal Agreement"
    ],
    description: "Statutory environmental consent under Water Act (1974) and Air Act (1981).",
    plainLanguageEn: "Permission confirming that waste water and air emissions from your food processing will be safely treated.",
    plainLanguageMr: "कारखान्यातून बाहेर पडणारे सांडपाणी आणि हवा सुरक्षितपणे प्रक्रिया करून सोडली जाईल याची शासकीय परवानगी.",
    whyNeededEn: "Mandatory under Water & Air Pollution Control Acts before installing plant & machinery.",
    whyNeededMr: "जल व वायू प्रदूषण नियंत्रण कायद्यांतर्गत यंत्रसामग्री बसवण्यापूर्वी ही संमती घेणे अनिवार्य आहे.",
    whatHappensNextEn: "MPCB regional committee evaluates ETP design and issues Consent to Establish letter.",
    whatHappensNextMr: "MPCB समिती ईटीपी डिझाइन तपासून स्थापना संमती पत्र जारी करते."
  },
  {
    id: "APPR-ENV-05",
    name: "State Environmental Clearance (SEIAA)",
    nameMr: "राज्य पर्यावरण आघात मंजुरी (SEIAA)",
    department: "Environment & Climate Change Department",
    departmentMr: "पर्यावरण व हवामान बदल विभाग",
    category: "Pre-Establishment",
    slaDays: 45,
    isParallel: false,
    order: 5,
    dependsOn: ["APPR-MPCB-03"],
    requiredDocs: [
      "Comprehensive Environment Management Plan (EMP)",
      "Baseline Air, Water & Soil Quality Report",
      "Water Balance & Rainwater Harvesting Scheme",
      "Public Hearing / Local Body Consultation Record"
    ],
    description: "Environmental impact clearance for major industrial units and agro-processing clusters.",
    plainLanguageEn: "Comprehensive review verifying your industrial unit causes minimal impact to local water, air, and ecology.",
    plainLanguageMr: "आपल्या प्रकल्पामुळे स्थानिक हवा, पाणी व पर्यावरणावर विपरीत परिणाम होणार नाही याची खात्री.",
    whyNeededEn: "Mandatory for projects above ₹25 Cr or specified industrial thresholds.",
    whyNeededMr: "₹२५ कोटींपेक्षा जास्त गुंतवणूक असलेल्या मोठ्या प्रकल्पांसाठी कायद्याने बंधनकारक.",
    whatHappensNextEn: "Expert Appraisal Committee evaluates project report in monthly technical hearing.",
    whatHappensNextMr: "तज्ज्ञ समिती तांत्रिक सुनावणी घेऊन पर्यावरण मंजुरी आदेश पारित करते."
  },
  {
    id: "APPR-WATER-06",
    name: "Industrial Water Connection Permission",
    nameMr: "औद्योगिक पाणी पुरवठा मंजुरी",
    department: "MIDC Water Supply Wing",
    departmentMr: "MIDC पाणी पुरवठा विभाग",
    category: "Infrastructure",
    slaDays: 14,
    isParallel: true,
    order: 6,
    dependsOn: ["APPR-LAND-02"],
    requiredDocs: [
      "Water Requirement Calculation Sheet",
      "Effluent Recycling System Design",
      "Plot Possession & Boundary Map"
    ],
    description: "Sanction of daily industrial pipeline connection and water meter allocation.",
    plainLanguageEn: "Sanction to connect your factory to the MIDC main industrial water pipeline.",
    plainLanguageMr: "MIDC च्या मुख्य औद्योगिक जलवाहिनीमधून कारखान्याला पाण्याचे कनेक्शन मिळण्याची परवानगी.",
    whyNeededEn: "Provides guaranteed clean process water required for agro-processing operations.",
    whyNeededMr: "अन्न प्रक्रियेसाठी आवश्यक असणाऱ्या नियमित पाणी पुरवठ्याची खात्री देते.",
    whatHappensNextEn: "Executive Engineer verifies pipeline branch and sanctions connection valve.",
    whatHappensNextMr: "कार्यकारी अभियंता पाईपलाईन तपासून जलजोडणी आदेश देतात."
  }
];
