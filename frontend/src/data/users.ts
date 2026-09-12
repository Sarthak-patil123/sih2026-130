import { User } from '../types';

export const mockUsers: {
  entrepreneur: User;
  officer: User;
  admin: User;
} = {
  entrepreneur: {
    id: "ENT-9942",
    name: "Rajesh S. Deshmukh",
    nameMr: "राजेश एस. देशमुख",
    email: "rajesh.deshmukh@abcfood.in",
    role: "entrepreneur",
    companyName: "ABC Food Processing Pvt. Ltd.",
    companyNameMr: "एबीसी फूड प्रोसेसिंग प्रा. लि.",
    registrationNumber: "U15400MH2024PTC392811",
    pan: "AABCA8923F",
    gst: "27AABCA8923F1Z8",
    udyam: "UDYAM-MH-20-0098412",
    contact: "+91 98230 45678",
    address: "Plot B-14, Butibori Industrial Area, Nagpur, Maharashtra - 441122",
    designation: "Managing Director"
  },
  officer: {
    id: "OFF-2026-024",
    name: "Smt. Anjali Kulkarni, IAS",
    nameMr: "श्रीमती अंजली कुलकर्णी, भा.प्र.से.",
    email: "anjali.kulkarni@maharashtra.gov.in",
    role: "officer",
    designation: "Joint Director of Industries & Nodal Approvals Officer",
    designationMr: "सहसंचालक (उद्योग) आणि नोडल मंजुरी अधिकारी",
    department: "Directorate of Industries, Govt. of Maharashtra",
    departmentMr: "उद्योग संचालनालय, महाराष्ट्र शासन",
    jurisdiction: "Nagpur & Vidarbha Industrial Zone",
    jurisdictionMr: "नागपूर व विदर्भ औद्योगिक परिक्षेत्र",
    contact: "+91 712 2561980",
    badgeNumber: "MH-IND-NODAL-024"
  },
  admin: {
    id: "ADM-STATE-001",
    name: "Dr. Suresh P. Mehta, IAS",
    nameMr: "डॉ. सुरेश पी. मेहता, भा.प्र.से.",
    email: "suresh.mehta@maharashtra.gov.in",
    role: "admin",
    designation: "Principal Secretary (Industries & Reforms)",
    designationMr: "प्रधान सचिव (उद्योग व सुधारणा)",
    department: "Department of Industries, Energy & Labour, Govt. of Maharashtra",
    departmentMr: "उद्योग, ऊर्जा व कामगार विभाग, महाराष्ट्र शासन",
    jurisdiction: "State of Maharashtra (State Headquarters, Mantralaya, Mumbai)",
    contact: "+91 22 22025114",
    badgeNumber: "MH-STATE-ADMIN-01"
  }
};
