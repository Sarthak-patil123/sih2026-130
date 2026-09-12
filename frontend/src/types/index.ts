export type UserRole = 'entrepreneur' | 'officer' | 'admin';

export interface User {
  id: string;
  name: string;
  nameMr: string;
  email: string;
  role: UserRole;
  designation?: string;
  designationMr?: string;
  companyName?: string;
  companyNameMr?: string;
  registrationNumber?: string;
  pan?: string;
  gst?: string;
  udyam?: string;
  contact?: string;
  address?: string;
  department?: string;
  departmentMr?: string;
  jurisdiction?: string;
  jurisdictionMr?: string;
  badgeNumber?: string;
}

export interface Blocker {
  id: string;
  approvalName: string;
  approvalNameMr: string;
  issue: string;
  issueMr: string;
  impact: string;
  impactMr: string;
  actionRequired: string;
  actionRequiredMr: string;
  severity: 'critical' | 'warning' | 'info';
  applicationId?: string;
}

export type BlockerItem = Blocker;

export interface NextBestAction {
  id: string;
  type: 'danger' | 'warning' | 'success' | 'info';
  title: string;
  titleMr: string;
  subtitle: string;
  deadline: string;
  actionLabel: string;
  actionLabelMr: string;
  link: string;
}

export interface Project {
  id: string;
  projectName: string;
  projectNameMr: string;
  companyName: string;
  companyNameMr: string;
  industry: string;
  industryMr: string;
  projectType: string;
  projectTypeMr: string;
  investment: string;
  investmentValue: number;
  landArea: string;
  employees: string;
  employeesCount: number;
  productionCapacity: string;
  district: string;
  districtMr: string;
  taluka: string;
  industrialArea: string;
  address: string;
  overallReadiness: number;
  overallProgress?: number;
  journeyProgress: number;
  readinessBreakdown: {
    documentation: number;
    approvals: number;
    inspections: number;
    compliance: number;
  };
  blockers: Blocker[];
  nextBestActions: NextBestAction[];
  totalApprovals: number;
  approvedCount: number;
  underReviewCount: number;
  pendingCount: number;
  actionRequiredCount: number;
  status: string;
  createdAt: string;
  estimatedCommissioning: string;
}

export interface TimelineStep {
  step: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  remarks: string;
}

export interface ApplicationDocument {
  name: string;
  required: boolean;
  uploaded: boolean;
  status: string;
  fileUrl?: string | null;
  fileSize?: string | null;
  uploadDate?: string | null;
}

export interface ApplicationQuery {
  id: string;
  raisedBy: string;
  raisedDate: string;
  queryText: string;
  deadline: string;
  status: 'Open' | 'Resolved';
  response?: string | null;
  responseDate?: string | null;
}

export interface Application {
  id: string;
  projectId: string;
  projectName: string;
  companyName: string;
  approvalId: string;
  approval: string;
  department: string;
  submittedOn: string;
  lastUpdated: string;
  deadline: string;
  status: 'Under Review' | 'Pending' | 'Approved' | 'Rejected' | 'Inspection Pending' | 'Query Raised' | 'Action Required' | string;
  priority: 'High' | 'Medium' | 'Low' | string;
  assignedOfficer: string;
  feesPaid: string;
  paymentRef?: string | null;
  timeline: TimelineStep[];
  documents: ApplicationDocument[];
  queries: ApplicationQuery[];
  inspectionId?: string;
  approvedDate?: string;
  certificateNo?: string;
  officerRemarks?: string;
  rejectionReason?: string;
}

export type ApplicationItem = Application;

export interface DocumentUsedIn {
  id: string;
  name: string;
  dept: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  nameMr?: string;
  category: string;
  status: 'Verified' | 'Expiring' | 'Missing' | 'Under Review' | 'Pending Upload' | 'Pending' | string;
  uploadedDate?: string | null;
  uploadDate?: string | null;
  expiryDate?: string | null;
  daysToExpiry?: number;
  fileSize?: string | null;
  fileType?: string | null;
  fileName?: string | null;
  verifiedBy?: string | null;
  mandatory?: boolean;
  usedIn?: DocumentUsedIn[];
  requiredFor?: string;
  plainExplanation?: string;
}

export interface Inspection {
  id: string;
  applicationId: string;
  approval: string;
  department: string;
  inspectionType: string;
  date: string;
  time: string;
  officer: string;
  officerContact: string;
  location: string;
  purpose: string;
  requiredDocuments: string[];
  status: 'Scheduled' | 'Completed' | 'Pending' | 'Rescheduled' | string;
  remarks: string;
  completedDate?: string | null;
  reportSummary?: string | null;
}

export type InspectionItem = Inspection;

export interface InspectionFormData {
  id?: string;
  applicationId?: string;
  approval?: string;
  department?: string;
  inspectionType?: string;
  date?: string;
  time?: string;
  officer?: string;
  officerContact?: string;
  location?: string;
  purpose?: string;
  requiredDocuments?: string[];
  status?: string;
  remarks?: string;
}

export interface Scheme {
  id: string;
  name: string;
  department: string;
  industry: string;
  category: string;
  eligibilityCriteria: string;
  status: string;
  benefits: string;
  requiredDocuments: string[];
  applicationDeadline: string;
  matchingScore?: number;
  eligibleSectors?: string[];
  minInvestmentCr?: number;
  applicableDistricts?: string[];
}

export type SchemeItem = Scheme;

export interface NotificationItem {
  id: string;
  type: 'action' | 'warning' | 'inspection' | 'success' | 'info' | string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
  priority?: 'high' | 'medium' | 'low' | string;
  applicationId?: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  event: string;
  eventMr: string;
  applicationId: string;
  actor: string;
  actorRole: string;
  department: string;
  actionType: string;
  sha256Hash: string;
  prevBlockHash: string;
  status: string;
}

export interface District {
  id: string;
  name: string;
  nameMr: string;
  region: string;
  projectsCount: number;
  avgProcessingDays: number;
  slaCompliance: number;
  pendingCount: number;
  majorIndustries: string[];
  x: number;
  y: number;
  status: 'good' | 'warning' | 'delayed';
}

export interface ApprovalTemplate {
  id: string;
  name: string;
  nameMr: string;
  department: string;
  departmentMr: string;
  category: string;
  slaDays: number;
  isParallel: boolean;
  order: number;
  dependsOn: string[];
  requiredDocs: string[];
  description: string;
  plainLanguageEn: string;
  plainLanguageMr: string;
  whyNeededEn: string;
  whyNeededMr: string;
  whatHappensNextEn: string;
  whatHappensNextMr: string;
}

export interface BottleneckItem {
  id: string;
  rank: number;
  approval: string;
  approvalMr?: string;
  stage: string;
  metric: string;
  level: 'Critical' | 'Warning' | 'Watch' | 'Info' | string;
  reason: string;
  recommendation: string;
  applicationCount: number;
  costOfDelay: string;
}
