import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, ShieldAlert, AlertTriangle, Info, Sparkles, X } from 'lucide-react';

export const NotificationPanel = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'high_risk':
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'moderate_risk':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'awareness':
        return <Sparkles className="w-5 h-5 text-teal-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/30 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white shadow-2xl h-full flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-100 rounded-lg text-brand-700">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Campus Health Alerts</h3>
              <p className="text-xs text-slate-500">{unreadCount} unread early-warning advisories</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 bg-brand-50 px-2.5 py-1.5 rounded-lg border border-brand-200"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No campus health notifications</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  notif.read 
                    ? 'bg-slate-50/50 border-slate-200 opacity-80' 
                    : 'bg-white border-brand-200 shadow-soft ring-1 ring-brand-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    notif.type === 'high_risk' ? 'bg-rose-100' :
                    notif.type === 'moderate_risk' ? 'bg-amber-100' :
                    notif.type === 'awareness' ? 'bg-teal-100' : 'bg-blue-100'
                  }`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className={`text-sm font-semibold truncate ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 flex-shrink-0">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                    {!notif.read && (
                      <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100">
                        New Alert
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          🔒 Notifications contain anonymized community health advisories only.
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
