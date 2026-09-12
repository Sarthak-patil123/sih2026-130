'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUsers } from '../data/users';
import { initialProjects } from '../data/projects';
import { initialApplications } from '../data/applications';
import { initialDocuments } from '../data/documents';
import { initialInspections } from '../data/inspections';
import { initialSchemes } from '../data/schemes';
import { initialNotifications } from '../data/notifications';
import { initialAuditLogs } from '../data/audit';
import { approvalTemplates } from '../data/approvals';
import { maharashtraDistricts } from '../data/districts';
import {
  User,
  Project,
  Application,
  DocumentItem,
  Inspection,
  Scheme,
  NotificationItem,
  AuditRecord,
  District,
  ApprovalTemplate
} from '../types';

interface CreateProjectFormData {
  projectName?: string;
  companyName?: string;
  industry?: string;
  projectType?: string;
  investment?: string;
  landArea?: string;
  employees?: string;
  productionCapacity?: string;
  district?: string;
  taluka?: string;
  industrialArea?: string;
  address?: string;
}

interface FileMetadata {
  name?: string;
  size?: string;
}

interface InspectionFormData {
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

interface PortalContextType {
  currentUser: User | null;
  loginAs: (role: 'entrepreneur' | 'officer' | 'admin') => void;
  logout: () => void;
  projects: Project[];
  currentProjectId: string;
  setCurrentProjectId: (id: string) => void;
  currentProject: Project;
  createProject: (formData: CreateProjectFormData) => string;
  applications: Application[];
  currentProjectApplications: Application[];
  uploadApplicationDoc: (applicationId: string, docName: string, fileMetadata?: FileMetadata) => void;
  raiseOfficerQuery: (applicationId: string, queryText: string, deadlineDate?: string) => void;
  approveApplication: (applicationId: string, remarks?: string) => void;
  rejectApplication: (applicationId: string, reason?: string) => void;
  documents: DocumentItem[];
  uploadDocument: (docId: string, fileMetadata: FileMetadata) => void;
  inspections: Inspection[];
  scheduleOrUpdateInspection: (inspectionData: InspectionFormData) => void;
  completeInspection: (inspectionId: string, reportSummary?: string) => void;
  schemes: Scheme[];
  applyForScheme: (schemeId: string) => void;
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
  auditLogs: AuditRecord[];
  addAuditRecord: (event: string, eventMr: string, actionType: string, appId: string, actor?: string) => void;
  selectedDistrictId: string;
  setSelectedDistrictId: (id: string) => void;
  districts: District[];
  resetToDemoDefaults: () => void;
  approvalTemplates: ApprovalTemplate[];
}

const PortalContext = createContext<PortalContextType | null>(null);

const STORAGE_KEYS = {
  USER: 'mah_portal_user',
  PROJECTS: 'mah_portal_projects',
  CURRENT_PROJECT_ID: 'mah_portal_current_proj_id',
  APPLICATIONS: 'mah_portal_applications',
  DOCUMENTS: 'mah_portal_documents',
  INSPECTIONS: 'mah_portal_inspections',
  SCHEMES: 'mah_portal_schemes',
  NOTIFICATIONS: 'mah_portal_notifications',
  AUDIT_LOGS: 'mah_portal_audit_logs',
};

const generateSimulatedHash = (): string => {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers.entrepreneur);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentProjectId, setCurrentProjectId] = useState<string>("PROJ-2026-001");
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [inspections, setInspections] = useState<Inspection[]>(initialInspections);
  const [schemes, setSchemes] = useState<Scheme[]>(initialSchemes);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>(initialAuditLogs);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("nagpur");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (savedProjects) setProjects(JSON.parse(savedProjects));

      const savedProjId = localStorage.getItem(STORAGE_KEYS.CURRENT_PROJECT_ID);
      if (savedProjId) setCurrentProjectId(JSON.parse(savedProjId));

      const savedApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedDocs = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      if (savedDocs) setDocuments(JSON.parse(savedDocs));

      const savedInsps = localStorage.getItem(STORAGE_KEYS.INSPECTIONS);
      if (savedInsps) setInspections(JSON.parse(savedInsps));

      const savedSchemes = localStorage.getItem(STORAGE_KEYS.SCHEMES);
      if (savedSchemes) setSchemes(JSON.parse(savedSchemes));

      const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

      const savedAudit = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (savedAudit) setAuditLogs(JSON.parse(savedAudit));
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    }
  }, [currentUser, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    }
  }, [projects, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_PROJECT_ID, JSON.stringify(currentProjectId));
    }
  }, [currentProjectId, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    }
  }, [applications, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
    }
  }, [documents, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(inspections));
    }
  }, [inspections, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(schemes));
    }
  }, [schemes, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  }, [notifications, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    }
  }, [auditLogs, mounted]);

  // Derived current active project
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0];

  // Applications belonging to current active project
  const currentProjectApplications = applications.filter(
    app => app.projectId === currentProjectId || app.companyName === currentProject?.companyName
  );

  // Authentication Helpers
  const loginAs = (role: 'entrepreneur' | 'officer' | 'admin') => {
    if (role === 'officer') {
      setCurrentUser(mockUsers.officer);
    } else if (role === 'admin') {
      setCurrentUser(mockUsers.admin);
    } else {
      setCurrentUser(mockUsers.entrepreneur);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Add Audit Log
  const addAuditRecord = (event: string, eventMr: string, actionType: string, appId: string, actor?: string) => {
    const newRecord: AuditRecord = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }) + ' IST',
      event,
      eventMr,
      applicationId: appId,
      actor: actor || currentUser?.name || 'System Operator',
      actorRole: currentUser?.role === 'officer' ? 'Reviewing Officer' : currentUser?.role === 'admin' ? 'Administrator' : 'Entrepreneur',
      department: currentUser?.department || 'Directorate of Industries',
      actionType,
      sha256Hash: generateSimulatedHash(),
      prevBlockHash: auditLogs[0]?.sha256Hash || generateSimulatedHash(),
      status: "Verified & Immutable"
    };

    setAuditLogs(prev => [newRecord, ...prev]);
  };

  // Add Notification Helper
  const addNotification = (notif: Partial<NotificationItem> & { title: string; message: string; link: string }) => {
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      read: false,
      priority: 'medium',
      type: 'info',
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Project Creation Helper
  const createProject = (formData: CreateProjectFormData): string => {
    const newProjId = `PROJ-2026-00${projects.length + 1}`;
    const invNum = parseFloat(formData.investment || '25') || 25;
    
    const newProject: Project = {
      id: newProjId,
      projectName: formData.projectName || "New Industrial Enterprise",
      projectNameMr: formData.projectName || "नवीन औद्योगिक प्रकल्प",
      companyName: formData.companyName || "Industrial Unit",
      companyNameMr: formData.companyName || "औद्योगिक घटक",
      industry: formData.industry || "Manufacturing",
      industryMr: formData.industry || "उत्पादन उद्योग",
      projectType: formData.projectType || "New Industrial Unit",
      projectTypeMr: "नवीन औद्योगिक घटक (Greenfield)",
      investment: `₹${invNum} Crore`,
      investmentValue: invNum * 10000000,
      landArea: formData.landArea || "10 Acres",
      employees: `${formData.employees || 100} Persons`,
      employeesCount: parseInt(formData.employees || '100') || 100,
      productionCapacity: formData.productionCapacity || "Standard Capacity",
      district: formData.district || "Nagpur",
      districtMr: formData.district || "नागपूर",
      taluka: formData.taluka || "Nagpur Urban",
      industrialArea: formData.industrialArea || "MIDC Industrial Area",
      address: formData.address || `${formData.industrialArea || ''}, ${formData.district || ''}, Maharashtra`,
      overallReadiness: 45,
      journeyProgress: 28,
      readinessBreakdown: {
        documentation: 60,
        approvals: 25,
        inspections: 10,
        compliance: 100
      },
      blockers: [
        {
          id: "BLK-NEW-01",
          approvalName: "Land Possession & Building Plan",
          approvalNameMr: "जमीन ताबा व इमारत आराखडा",
          issue: "MIDC Allotment Letter & Building CAD file upload required",
          issueMr: "MIDC वाटप पत्र आणि इमारत CAD फाईल अपलोड करणे आवश्यक आहे",
          impact: "Civil construction permit and Fire NOC blocked",
          impactMr: "बांधकाम परवानगी आणि अग्निशामक NOC थांबलेली आहे",
          actionRequired: "Upload Building Plan to Document Locker",
          actionRequiredMr: "दस्तऐवज लॉकरमध्ये इमारत योजना अपलोड करा",
          severity: "critical"
        }
      ],
      nextBestActions: [
        {
          id: "NBA-NEW-01",
          type: "danger",
          title: "Upload Building Layout Plan",
          titleMr: "इमारत आराखडा अपलोड करा",
          subtitle: "MIDC Building Plan Approval",
          deadline: "15 Days",
          actionLabel: "Upload now",
          actionLabelMr: "आता अपलोड करा",
          link: "/entrepreneur/documents"
        }
      ],
      totalApprovals: 6,
      approvedCount: 1,
      underReviewCount: 1,
      pendingCount: 4,
      actionRequiredCount: 0,
      status: "In Progress",
      createdAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      estimatedCommissioning: "December 2027"
    };

    const newProjectApps: Application[] = approvalTemplates.slice(0, 6).map((tmpl, idx) => ({
      id: `APP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      projectId: newProjId,
      projectName: newProject.projectName,
      companyName: newProject.companyName,
      approvalId: tmpl.id,
      approval: tmpl.name,
      department: tmpl.department,
      submittedOn: idx === 0 ? newProject.createdAt : "Pending Submission",
      lastUpdated: newProject.createdAt,
      deadline: "30 Days from Submission",
      status: idx === 0 ? "Approved" : (idx === 1 ? "Under Review" : "Pending"),
      priority: idx < 3 ? "High" : "Medium",
      assignedOfficer: "Assigned Nodal Desk Officer",
      feesPaid: idx === 0 ? "₹5,000" : "Unpaid",
      paymentRef: idx === 0 ? `MAH-EPAY-${Math.floor(100000 + Math.random() * 900000)}` : null,
      timeline: [
        { step: "Application Prepared", date: newProject.createdAt, status: "completed", remarks: "Single window requirements verified." },
        { step: "Document Scrutiny", date: idx === 0 ? newProject.createdAt : "Pending", status: idx === 0 ? "completed" : (idx === 1 ? "current" : "upcoming"), remarks: idx === 0 ? "Clearance granted." : "Awaiting preliminary verification." },
        { step: "Site Inspection", date: "Pending", status: "upcoming", remarks: "Joint field inspection as required by norms." },
        { step: "Final Approval", date: "Pending", status: "upcoming", remarks: "Digital issuance of certificate." }
      ],
      documents: tmpl.requiredDocs.map(dName => ({
        name: dName,
        required: true,
        uploaded: idx === 0,
        status: idx === 0 ? "Verified" : "Pending",
        fileUrl: idx === 0 ? "#" : null,
        fileSize: idx === 0 ? "2.0 MB" : null,
        uploadDate: idx === 0 ? newProject.createdAt : null
      })),
      queries: []
    }));

    setProjects(prev => [newProject, ...prev]);
    setApplications(prev => [...newProjectApps, ...prev]);
    setCurrentProjectId(newProjId);

    addNotification({
      type: "success",
      title: "Project Passport & Roadmap Generated",
      message: `Project Passport generated for "${newProject.projectName}". 6 statutory clearances mapped.`,
      link: "/entrepreneur/dashboard"
    });

    addAuditRecord(
      `New Project Passport Created: ${newProject.projectName}`,
      `नवीन प्रोजेक्ट पासपोर्ट तयार केला: ${newProject.projectName}`,
      "PROJECT_CREATION",
      newProjId,
      currentUser?.name
    );

    return newProjId;
  };

  // Upload/Replace in Document Locker
  const uploadDocument = (docId: string, fileMetadata: FileMetadata) => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    let targetDocName = "Document";

    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        targetDocName = doc.name;
        return {
          ...doc,
          status: "Verified",
          uploadedDate: today,
          fileName: fileMetadata.name || `${doc.name.replace(/\s+/g, '_')}.pdf`,
          fileSize: fileMetadata.size || "2.4 MB",
          fileType: "PDF",
          verifiedBy: "Auto Validation & Single Window Desk"
        };
      }
      return doc;
    }));

    // Update Project Readiness & Remove matching Blocker if resolved
    setProjects(prev => prev.map(p => {
      if (p.id === currentProjectId) {
        const updatedBlockers = (p.blockers || []).filter(b => 
          !b.issue.toLowerCase().includes(targetDocName.toLowerCase().substring(0, 8))
        );
        return {
          ...p,
          overallReadiness: Math.min(100, (p.overallReadiness || 74) + 6),
          blockers: updatedBlockers,
          readinessBreakdown: {
            ...p.readinessBreakdown,
            documentation: Math.min(100, (p.readinessBreakdown?.documentation || 86) + 7)
          }
        };
      }
      return p;
    }));

    addAuditRecord(
      `Document Locker Uploaded & Verified: ${targetDocName}`,
      `दस्तऐवज लॉकरमध्ये अपलोड व पडताळणी पूर्ण: ${targetDocName}`,
      "DOCUMENT_VERIFIED",
      docId,
      currentUser?.name
    );

    addNotification({
      type: "success",
      title: "Document Verified in Locker",
      message: `"${targetDocName}" is now verified and available for auto-reuse across all statutory clearances.`,
      link: "/entrepreneur/documents"
    });
  };

  // Entrepreneur uploads missing document inside Application Details
  const uploadApplicationDoc = (applicationId: string, docName: string, fileMetadata?: FileMetadata) => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        const updatedDocs = app.documents.map(d => {
          if (d.name === docName) {
            return {
              ...d,
              uploaded: true,
              status: "Verified",
              uploadDate: today,
              fileSize: fileMetadata?.size || "3.5 MB",
              fileUrl: "#"
            };
          }
          return d;
        });

        // Resolve open query
        const updatedQueries = app.queries.map(q => {
          if (q.status === "Open") {
            return {
              ...q,
              status: "Resolved" as const,
              response: `Revised document "${docName}" uploaded on ${today}.`,
              responseDate: today
            };
          }
          return q;
        });

        const newStatus = app.status === "Query Raised" || app.status === "Action Required" ? "Under Review" : app.status;

        return {
          ...app,
          status: newStatus,
          lastUpdated: today,
          documents: updatedDocs,
          queries: updatedQueries
        };
      }
      return app;
    }));

    // Remove blocker from current project
    setProjects(prev => prev.map(p => {
      if (p.id === currentProjectId) {
        return {
          ...p,
          blockers: (p.blockers || []).filter(b => b.applicationId !== applicationId),
          nextBestActions: (p.nextBestActions || []).filter(a => !a.link.includes(applicationId))
        };
      }
      return p;
    }));

    addAuditRecord(
      `Revised Document Resubmitted: ${docName} for ${applicationId}`,
      `सुधारित कागदपत्र पुन्हा सादर केले: ${docName} (${applicationId})`,
      "QUERY_RESPONSE",
      applicationId,
      currentUser?.name
    );

    addNotification({
      type: "success",
      title: "Query Responded & Document Resubmitted",
      message: `Document attached to ${applicationId}. Status updated to Under Review.`,
      link: `/entrepreneur/applications/${applicationId}`
    });
  };

  // Government Officer Raises a Query
  const raiseOfficerQuery = (applicationId: string, queryText: string, deadlineDate?: string) => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const formattedDeadline = deadlineDate ? new Date(deadlineDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : "25 Sept 2026";

    const newQuery = {
      id: `QRY-${Date.now().toString().slice(-4)}`,
      raisedBy: currentUser?.name ? `${currentUser.name} (${currentUser.designation || 'Officer'})` : "Government Reviewing Officer",
      raisedDate: today,
      queryText: queryText || "Please upload the revised architectural layout plan with fire hydrant marks.",
      deadline: formattedDeadline,
      status: "Open" as const,
      response: null,
      responseDate: null
    };

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: "Query Raised",
          lastUpdated: today,
          queries: [newQuery, ...app.queries]
        };
      }
      return app;
    }));

    // Add Blocker to project
    setProjects(prev => prev.map(p => {
      if (p.id === currentProjectId) {
        const newBlocker = {
          id: `BLK-${Date.now()}`,
          approvalName: `Query on Application ${applicationId}`,
          approvalNameMr: `अर्जावर शंका: ${applicationId}`,
          issue: queryText,
          issueMr: queryText,
          impact: "Clearance processing paused until applicant response",
          impactMr: "उत्तर मिळेपर्यंत मंजुरी प्रक्रिया थांबवली",
          actionRequired: "Respond to Officer Query",
          actionRequiredMr: "अधिकाऱ्याच्या शंकेचे उत्तर द्या",
          severity: "critical" as const,
          applicationId: applicationId
        };
        return {
          ...p,
          blockers: [newBlocker, ...(p.blockers || [])]
        };
      }
      return p;
    }));

    addAuditRecord(
      `Officer Query Raised on ${applicationId}`,
      `अर्जावर अधिकाऱ्याने शंका उपस्थित केली: ${applicationId}`,
      "QUERY_RAISED",
      applicationId,
      currentUser?.name
    );

    addNotification({
      type: "action",
      title: `Action Required: Query on ${applicationId}`,
      message: `${currentUser?.name || 'Reviewing Officer'} raised a query: "${queryText}". Compliance Target: ${formattedDeadline}`,
      link: `/entrepreneur/applications/${applicationId}`,
      priority: "high",
      applicationId: applicationId
    });
  };

  // Government Officer Approves Application
  const approveApplication = (applicationId: string, remarks?: string) => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const certNumber = `MAH/GOV/NOC/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        const updatedTimeline = app.timeline.map(t => ({
          ...t,
          status: "completed" as const
        }));

        return {
          ...app,
          status: "Approved",
          approvedDate: today,
          lastUpdated: today,
          certificateNo: certNumber,
          officerRemarks: remarks || "All statutory criteria and physical inspection parameters satisfied. Approved.",
          timeline: updatedTimeline
        };
      }
      return app;
    }));

    // Update project progress and passport
    setProjects(prev => prev.map(p => {
      if (p.id === currentProjectId) {
        const total = p.totalApprovals || 6;
        const newApproved = (p.approvedCount || 2) + 1;
        return {
          ...p,
          approvedCount: newApproved,
          journeyProgress: Math.min(100, (p.journeyProgress || 68) + 12),
          overallReadiness: Math.min(100, (p.overallReadiness || 74) + 10),
          readinessBreakdown: {
            ...p.readinessBreakdown,
            approvals: Math.min(100, (p.readinessBreakdown?.approvals || 70) + 15)
          }
        };
      }
      return p;
    }));

    addAuditRecord(
      `Statutory Approval Granted: ${applicationId} (Cert #${certNumber})`,
      `कायदेशीर मंजुरी दिली: ${applicationId} (प्रमाणपत्र क्र. ${certNumber})`,
      "APPROVAL_GRANTED",
      applicationId,
      currentUser?.name
    );

    addNotification({
      type: "success",
      title: `Approval Granted: ${applicationId}`,
      message: `Statutory approval for ${applicationId} granted. Certificate #${certNumber} issued.`,
      link: `/entrepreneur/applications/${applicationId}`,
      priority: "medium",
      applicationId: applicationId
    });
  };

  // Government Officer Rejects Application
  const rejectApplication = (applicationId: string, reason?: string) => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: "Rejected",
          lastUpdated: today,
          rejectionReason: reason || "Non-compliance with statutory safety setback norms."
        };
      }
      return app;
    }));

    addAuditRecord(
      `Application Rejected: ${applicationId}`,
      `अर्ज नाकारला: ${applicationId}`,
      "APPLICATION_REJECTED",
      applicationId,
      currentUser?.name
    );

    addNotification({
      type: "warning",
      title: `Application Rejected: ${applicationId}`,
      message: `Application ${applicationId} was rejected. Reason: ${reason || 'Statutory non-compliance'}.`,
      link: `/entrepreneur/applications/${applicationId}`,
      priority: "high",
      applicationId: applicationId
    });
  };

  // Schedule or Reschedule Inspection
  const scheduleOrUpdateInspection = (inspectionData: InspectionFormData) => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    
    if (inspectionData.id) {
      setInspections(prev => prev.map(insp => {
        if (insp.id === inspectionData.id) {
          return {
            ...insp,
            ...inspectionData,
            status: insp.status,
            completedDate: insp.completedDate,
            reportSummary: insp.reportSummary
          } as Inspection;
        }
        return insp;
      }));
    } else {
      const newInsp: Inspection = {
        id: `INSP-2026-${Math.floor(100 + Math.random() * 900)}`,
        applicationId: inspectionData.applicationId || "APP-2026-00124",
        approval: inspectionData.approval || "Statutory Site Audit",
        department: inspectionData.department || "Government Regulatory Authority",
        inspectionType: inspectionData.inspectionType || "On-site Verification",
        date: inspectionData.date || "25 Sept 2026",
        time: inspectionData.time || "11:30 AM IST",
        officer: inspectionData.officer || "Officer 24 - Shri V. R. Shinde",
        officerContact: "+91 94221 88310",
        location: inspectionData.location || "Plot B-14, Butibori Industrial Area, Nagpur",
        purpose: inspectionData.purpose || "Physical verification of compliance parameters.",
        requiredDocuments: inspectionData.requiredDocuments || ["Site Layout Plan", "Building Drawings"],
        status: "Scheduled",
        remarks: inspectionData.remarks || "Scheduled by reviewing nodal officer.",
        completedDate: null,
        reportSummary: null
      };

      setInspections(prev => [newInsp, ...prev]);

      setApplications(prev => prev.map(app => {
        if (app.id === newInsp.applicationId) {
          return { ...app, status: "Inspection Pending", inspectionId: newInsp.id, lastUpdated: today };
        }
        return app;
      }));

      addAuditRecord(
        `Field Inspection Scheduled for ${newInsp.applicationId}`,
        `प्रत्यक्ष तपासणी निश्चित केली: ${newInsp.applicationId}`,
        "INSPECTION_SCHEDULED",
        newInsp.applicationId,
        currentUser?.name
      );

      addNotification({
        type: "inspection",
        title: "Inspection Scheduled",
        message: `Field inspection for ${newInsp.approval} scheduled on ${newInsp.date} at ${newInsp.time}.`,
        link: "/entrepreneur/inspections"
      });
    }
  };

  // Complete Inspection
  const completeInspection = (inspectionId: string, reportSummary?: string) => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    setInspections(prev => prev.map(insp => {
      if (insp.id === inspectionId) {
        return {
          ...insp,
          status: "Completed" as const,
          completedDate: today,
          reportSummary: reportSummary || "Physical verification successfully conducted."
        };
      }
      return insp;
    }));

    addAuditRecord(
      `Inspection Marked Completed: ${inspectionId}`,
      `तपासणी पूर्ण म्हणून नोंदवली: ${inspectionId}`,
      "INSPECTION_COMPLETED",
      inspectionId,
      currentUser?.name
    );

    addNotification({
      type: "success",
      title: "Inspection Completed",
      message: `Site inspection #${inspectionId} marked completed with positive report.`,
      link: "/entrepreneur/inspections"
    });
  };

  // Apply or claim scheme
  const applyForScheme = (schemeId: string) => {
    setSchemes(prev => prev.map(sch => {
      if (sch.id === schemeId) {
        return { ...sch, status: "Applied - Under Scrutiny" };
      }
      return sch;
    }));

    addNotification({
      type: "success",
      title: "Scheme Claim Logged",
      message: "Application for Industrial Incentive submitted to Directorate of Industries.",
      link: "/entrepreneur/schemes"
    });
  };

  // Reset demo state
  const resetToDemoDefaults = () => {
    localStorage.clear();
    setCurrentUser(mockUsers.entrepreneur);
    setProjects(initialProjects);
    setCurrentProjectId("PROJ-2026-001");
    setApplications(initialApplications);
    setDocuments(initialDocuments);
    setInspections(initialInspections);
    setSchemes(initialSchemes);
    setNotifications(initialNotifications);
    setAuditLogs(initialAuditLogs);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <PortalContext.Provider
      value={{
        currentUser,
        loginAs,
        logout,
        projects,
        currentProjectId,
        setCurrentProjectId,
        currentProject,
        createProject,
        applications,
        currentProjectApplications,
        uploadApplicationDoc,
        raiseOfficerQuery,
        approveApplication,
        rejectApplication,
        documents,
        uploadDocument,
        inspections,
        scheduleOrUpdateInspection,
        completeInspection,
        schemes,
        applyForScheme,
        notifications,
        markAsRead,
        markAllAsRead,
        unreadCount,
        auditLogs,
        addAuditRecord,
        selectedDistrictId,
        setSelectedDistrictId,
        districts: maharashtraDistricts,
        resetToDemoDefaults,
        approvalTemplates
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = (): PortalContextType => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
};
