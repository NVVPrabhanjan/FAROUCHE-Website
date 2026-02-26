"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ShieldCheck, ShieldAlert, RefreshCw } from "lucide-react";

interface Admin {
  _id: string;
  username: string;
  email: string;
  role: "super_admin" | "admin" | "viewer";
  createdAt: string;
}

const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const API = isLocal ? "http://localhost:4000" : "https://your-production-backend.com";

async function fetchWithToken(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("adminToken");
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
}

export default function AdminManagementPage() {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("adminRole");
    if (role !== "super_admin") { router.push("/dashboard"); return; }
    loadAdmins();
  }, []);

  async function loadAdmins() {
    setLoading(true);
    try {
      const res = await fetchWithToken(`${API}/api/v1/admin/admins`);
      const data = await res.json();
      if (data.success) setAdmins(data.admins);
    } catch {
      showToast("Failed to load admins", false);
    } finally { setLoading(false); }
  }

  async function handleRoleChange(adminId: string, newRole: "admin" | "viewer") {
    setUpdating(adminId);
    try {
      const res = await fetchWithToken(`${API}/api/v1/admin/admins/${adminId}/role`, {
        method: "PUT",
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(prev => prev.map(a => a._id === adminId ? { ...a, role: newRole } : a));
        showToast(data.message, true);
      } else {
        showToast(data.message, false);
      }
    } catch {
      showToast("Update failed", false);
    } finally { setUpdating(null); }
  }

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  function RoleBadge({ role }: { role: string }) {
    const styles = {
      super_admin: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      admin:       "bg-purple-500/20 text-purple-300 border-purple-500/30",
      viewer:      "bg-gray-500/20   text-gray-300   border-gray-500/30",
    }[role] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30";
    const label = { super_admin: "Super Admin", admin: "Main Admin", viewer: "Viewer" }[role] ?? role;
    const Icon  = { super_admin: ShieldAlert, admin: ShieldCheck, viewer: Shield }[role] ?? Shield;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${styles}`}>
        <Icon size={11} /> {label}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
          toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}>{toast.msg}</div>
      )}

      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage roles for all admin accounts</p>
        </div>
        <button
          onClick={loadAdmins}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      
      <div className="bg-black/30 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-gray-500">Loading admins…</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 text-left">Username</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Current Role</th>
                <th className="px-5 py-3 text-left">Joined</th>
                <th className="px-5 py-3 text-left">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {admins.map(admin => (
                <tr key={admin._id} className="hover:bg-white/3 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">{admin.username}</td>
                  <td className="px-5 py-4 text-gray-400">{admin.email}</td>
                  <td className="px-5 py-4"><RoleBadge role={admin.role} /></td>
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {new Date(admin.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-5 py-4">
                    {admin.role === "super_admin" ? (
                      <span className="text-yellow-600 text-xs italic">Protected</span>
                    ) : (
                      <select
                        disabled={!!updating}
                        value={admin.role}
                        onChange={e => handleRoleChange(admin._id, e.target.value as "admin" | "viewer")}
                        className="bg-white/5 border border-white/10 text-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-40"
                      >
                        <option value="admin">Main Admin</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
