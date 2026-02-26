"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Filter } from "lucide-react";

interface LogEntry {
  _id: string;
  adminName: string;
  adminRole: string;
  action: string;
  detail: string;
  createdAt: string;
}

const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const API = isLocal ? "http://localhost:4000" : "https://your-production-backend.com";

async function fetchWithToken(url: string) {
  const token = localStorage.getItem("adminToken");
  return fetch(url, {
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  ADD_EVENT:       { label: "Add Event",        color: "bg-green-500/20 text-green-300 border-green-500/30" },
  EDIT_EVENT:      { label: "Edit Event",        color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  DELETE_EVENT:    { label: "Delete Event",      color: "bg-red-500/20 text-red-300 border-red-500/30" },
  ADD_RESULT:      { label: "Add Result",        color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  DELETE_RESULT:   { label: "Delete Result",     color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  MARK_ATTENDANCE: { label: "Attendance",        color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  SEND_EMAIL:      { label: "Send Email",        color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  ROLE_CHANGE:     { label: "Role Change",       color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  ADMIN_SIGNUP:    { label: "Admin Signup",      color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
};

export default function ActivityLogPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("adminRole") !== "super_admin") {
      router.push("/dashboard");
    }
  }, []);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchWithToken(`${API}/api/v1/admin/audit-log?page=${page}&limit=50`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        setTotalPages(data.totalPages || 1);
      }
    } catch {  }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  const filtered = filter === "ALL"
    ? logs
    : logs.filter(l => l.action === filter);

  function ActionBadge({ action }: { action: string }) {
    const meta = ACTION_LABELS[action] ?? { label: action, color: "bg-gray-500/20 text-gray-300 border-gray-500/30" };
    return (
      <span className={`inline-block px-2.5 py-0.5 rounded-full border text-xs font-semibold ${meta.color}`}>
        {meta.label}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Activity Log</h1>
          <p className="text-gray-400 text-sm mt-1">Everything every admin has done — in real time</p>
        </div>
        <div className="flex items-center gap-3">
          
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-400" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-white/5 border border-white/10 text-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All Actions</option>
              {Object.entries(ACTION_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={loadLogs}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      
      <div className="bg-black/30 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-500">Loading activity…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">No activity found</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 text-left">Timestamp</th>
                <th className="px-5 py-3 text-left">Admin</th>
                <th className="px-5 py-3 text-left">Action</th>
                <th className="px-5 py-3 text-left">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(log => (
                <tr key={log._id} className="hover:bg-white/3 transition-colors">
                  <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-white font-medium">{log.adminName}</p>
                    <p className="text-gray-500 text-[10px] capitalize">{log.adminRole?.replace("_", " ")}</p>
                  </td>
                  <td className="px-5 py-3"><ActionBadge action={log.action} /></td>
                  <td className="px-5 py-3 text-gray-300 text-xs max-w-xs">{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 rounded-lg text-sm text-gray-300 bg-white/5 hover:bg-white/10 disabled:opacity-30"
          >
            Previous
          </button>
          <span className="text-gray-400 text-sm">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 rounded-lg text-sm text-gray-300 bg-white/5 hover:bg-white/10 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
