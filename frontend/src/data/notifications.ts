import { NotificationItem } from '../types';

export const initialNotifications: NotificationItem[] = [
  {
    id: "NOTIF-001",
    type: "action",
    title: "Action Required: Query Raised",
    message: "Er. Rameshwar Jadhav (MIDC Water) raised a query: 'Please upload the revised land demarcation document showing exact location of underground water sump.'",
    timestamp: "09 Sept 2026, 04:30 PM",
    read: false,
    link: "/entrepreneur/applications/APP-2026-00128",
    priority: "high",
    applicationId: "APP-2026-00128"
  },
  {
    id: "NOTIF-002",
    type: "warning",
    title: "Deadline Approaching",
    message: "Factory Licence application (APP-2026-00125) SLA review deadline is in 3 days. Directorate of Industrial Safety is finalizing scrutiny.",
    timestamp: "10 Sept 2026, 10:15 AM",
    read: false,
    link: "/entrepreneur/applications/APP-2026-00125",
    priority: "medium",
    applicationId: "APP-2026-00125"
  },
  {
    id: "NOTIF-003",
    type: "inspection",
    title: "Site Inspection Scheduled",
    message: "Site audit for State Environmental Impact Clearance (APP-2026-00127) has been scheduled on 22 Sept 2026 at 02:30 PM by Dr. Pratibha Joshi.",
    timestamp: "04 Sept 2026, 02:00 PM",
    read: false,
    link: "/entrepreneur/inspections",
    priority: "medium",
    applicationId: "APP-2026-00127"
  },
  {
    id: "NOTIF-004",
    type: "success",
    title: "Approval Granted",
    message: "Project Registration & In-Principle Clearance (APP-2026-00120) has been approved by Joint Director Smt. Anjali Kulkarni.",
    timestamp: "16 Aug 2026, 11:45 AM",
    read: true,
    link: "/entrepreneur/applications/APP-2026-00120",
    priority: "low",
    applicationId: "APP-2026-00120"
  },
  {
    id: "NOTIF-005",
    type: "info",
    title: "New Scheme Available",
    message: "Your project qualifies for the Package Scheme of Incentives (PSI 2019) with up to 80% SGST reimbursement.",
    timestamp: "12 Aug 2026, 09:00 AM",
    read: true,
    link: "/entrepreneur/schemes",
    priority: "low"
  }
];
