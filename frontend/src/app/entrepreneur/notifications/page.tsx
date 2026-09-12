'use client';

import React, { useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { usePortal } from '@/context/PortalContext';
import { NotificationCard } from '@/components/cards/NotificationCard';
import { Button } from '@/components/common/Button';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = usePortal();
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "action") return n.type === "action";
    if (filter === "warning") return n.type === "warning";
    if (filter === "success") return n.type === "success";
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F2942]">Notification & Compliance Centre</h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time alerts on statutory deadlines, officer queries, inspection dates, and clearance approvals.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCheck}
            onClick={markAllAsRead}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-3">
        {[
          { key: "all", label: "All Alerts", count: notifications.length },
          { key: "unread", label: "Unread", count: unreadCount },
          { key: "action", label: "Action Required", count: notifications.filter(n => n.type === "action").length },
          { key: "warning", label: "Deadlines Approaching", count: notifications.filter(n => n.type === "warning").length },
          { key: "success", label: "Approvals Granted", count: notifications.filter(n => n.type === "success").length }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              filter === t.key
                ? "bg-[#0F2942] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {t.label}
            <span className={`ml-1.5 rounded px-1.5 py-0.2 text-[10px] ${
              filter === t.key ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={markAsRead}
            />
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center text-slate-400 text-xs">
            <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-600">No notifications in this category</p>
            <p className="mt-0.5">You are all caught up with your statutory compliance alerts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
