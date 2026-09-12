import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ShieldAlert, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { NotificationItem } from '../../types';

export interface NotificationCardProps {
  notification: NotificationItem;
  onMarkRead?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "action":
        return <AlertCircle className="h-5 w-5 text-rose-600" />;
      case "warning":
        return <Clock className="h-5 w-5 text-amber-600" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
      case "inspection":
        return <ShieldAlert className="h-5 w-5 text-purple-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBorderColor = () => {
    if (!notification.read) {
      switch (notification.type) {
        case "action": return "border-l-4 border-l-rose-500 bg-rose-50/20";
        case "warning": return "border-l-4 border-l-amber-500 bg-amber-50/20";
        case "success": return "border-l-4 border-l-emerald-500 bg-emerald-50/20";
        case "inspection": return "border-l-4 border-l-purple-500 bg-purple-50/20";
        default: return "border-l-4 border-l-blue-500 bg-blue-50/20";
      }
    }
    return "border-l-4 border-l-slate-200 bg-white opacity-80";
  };

  return (
    <div className={`rounded-lg border border-slate-200 p-4 transition-all ${getBorderColor()}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-1 rounded-md bg-white shadow-2xs mt-0.5">{getIcon()}</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className={`text-sm font-bold ${notification.read ? "text-slate-700" : "text-slate-900"}`}>
                {notification.title}
              </h4>
              {!notification.read && (
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{notification.message}</p>
            <span className="inline-block text-[11px] text-slate-400 font-medium pt-1">
              {notification.timestamp}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!notification.read && onMarkRead && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-50 cursor-pointer"
              title="Mark as Read"
            >
              <Check className="h-3 w-3" /> Mark read
            </button>
          )}
          {notification.link && (
            <Link
              href={notification.link}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F2942] hover:text-blue-700 bg-white border border-slate-200 px-2.5 py-1 rounded hover:bg-slate-50"
            >
              Action <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
