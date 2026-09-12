import { AuditRecord } from '../types';

export const initialAuditLogs: AuditRecord[] = [
  {
    id: "AUD-89421",
    timestamp: "12 Sept 2026, 14:32:18 IST",
    event: "Application Reviewed & Scrutinized",
    eventMr: "अर्जाची तपासणी व पुनरावलोकन पूर्ण",
    applicationId: "APP-2026-00124",
    actor: "Smt. Anjali Kulkarni (Joint Director)",
    actorRole: "Reviewing Officer",
    department: "Maharashtra Fire Services",
    actionType: "APPROVAL_STAGE_UPDATE",
    sha256Hash: "8f4a3c2b1e9d8c7a6b5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a",
    prevBlockHash: "7e3b2a1c0f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5e4d3c2b",
    status: "Verified & Immutable"
  },
  {
    id: "AUD-89420",
    timestamp: "12 Sept 2026, 14:28:05 IST",
    event: "Revised Statutory Document Uploaded",
    eventMr: "सुधारित कायदेशीर कागदपत्र अपलोड केले",
    applicationId: "APP-2026-00128",
    actor: "Rajesh S. Deshmukh (Managing Director)",
    actorRole: "Entrepreneur",
    department: "MIDC Water Supply Wing",
    actionType: "DOCUMENT_UPLOAD",
    sha256Hash: "5d4c3b2a1f0e9d8c7b6a5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b",
    prevBlockHash: "4c3b2a1f0e9d8c7b6a5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a",
    status: "Verified & Immutable"
  },
  {
    id: "AUD-89419",
    timestamp: "12 Sept 2026, 13:51:40 IST",
    event: "Joint Site Inspection Completed",
    eventMr: "संयुक्त प्रत्यक्ष जागा पाहणी पूर्ण",
    applicationId: "APP-2026-00120",
    actor: "Shri V. R. Shinde (Officer 24)",
    actorRole: "Field Inspector",
    department: "Directorate of Industries",
    actionType: "INSPECTION_COMPLETED",
    sha256Hash: "3b2a1f0e9d8c7b6a5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f",
    prevBlockHash: "2a1f0e9d8c7b6a5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e",
    status: "Verified & Immutable"
  },
  {
    id: "AUD-89418",
    timestamp: "12 Sept 2026, 12:42:10 IST",
    event: "Technical Query Raised on Boundary Map",
    eventMr: "सीमा नकाशावर तांत्रिक शंका उपस्थित केली",
    applicationId: "APP-2026-00128",
    actor: "Er. Rameshwar Jadhav (Executive Engineer)",
    actorRole: "Nodal Desk Officer",
    department: "MIDC Water Supply Wing",
    actionType: "QUERY_RAISED",
    sha256Hash: "1f0e9d8c7b6a5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d",
    prevBlockHash: "0e9d8c7b6a5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c",
    status: "Verified & Immutable"
  }
];
