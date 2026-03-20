"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    fetchSportsMerchOrders,
    fetchFestMerchOrders,
    verifyMerchOrder,
    sendConfirmationMails,
    getExportExcelUrl,
    getExportPDFUrl,
    SportsMerchOrder,
    FestMerchOrder,
} from "../../services/merchService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Download, 
  FileText, 
  Table as TableIcon, 
  RefreshCcw,
  Trophy,
  Ticket
} from "lucide-react";

export default function MerchDashboard() {
    const router = useRouter();
    const [sportsOrders, setSportsOrders] = useState<SportsMerchOrder[]>([]);
    const [festOrders, setFestOrders] = useState<FestMerchOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"sports" | "fest">("sports");
    const [verifiedFilter, setVerifiedFilter] = useState("all");
    const [yearFilter, setYearFilter] = useState("all");
    const [hostelFilter, setHostelFilter] = useState("");
    const [sendingMails, setSendingMails] = useState(false);

    useEffect(() => {
        loadData();
    }, [verifiedFilter, yearFilter, hostelFilter]);

    const loadData = async () => {
        setLoading(true);
        try {
            const filters = {
                verified: verifiedFilter === "all" ? undefined : verifiedFilter,
                academicYear: yearFilter === "all" ? undefined : yearFilter,
                hostelName: hostelFilter || undefined
            };
            
            const [sportsRes, festRes] = await Promise.all([
                fetchSportsMerchOrders(filters),
                fetchFestMerchOrders(filters),
            ]);
            if (sportsRes.success) setSportsOrders(sportsRes.orders);
            if (festRes.success) setFestOrders(festRes.orders);
        } catch (error: any) {
            toast.error("Failed to load merch data");
            if (error.response?.status === 401) router.push("/");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (type: "sports" | "fest", id: string, currentStatus: boolean) => {
        try {
            const res = await verifyMerchOrder(type, id, !currentStatus);
            if (res.success) {
                toast.success(`Order marked as ${!currentStatus ? 'verified' : 'unverified'}`);
                loadData();
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleSendMails = async () => {
        setSendingMails(true);
        try {
            const res = await sendConfirmationMails();
            if (res.success) {
                toast.success(res.message);
                loadData();
            }
        } catch (error) {
            toast.error("Failed to send emails");
        } finally {
            setSendingMails(false);
        }
    };

    const handleExport = (format: "excel" | "pdf") => {
        const filters = {
            verified: verifiedFilter === "all" ? "" : verifiedFilter,
            academicYear: yearFilter === "all" ? "" : yearFilter,
            hostelName: hostelFilter || ""
        };
        
        const params = new URLSearchParams();
        if (filters.verified) params.append("verified", filters.verified);
        if (filters.academicYear) params.append("academicYear", filters.academicYear);
        if (filters.hostelName) params.append("hostelName", filters.hostelName);

        const baseUrl = format === "excel" ? getExportExcelUrl(activeTab) : getExportPDFUrl(activeTab);
        const url = `${baseUrl}?${params.toString()}`;
        window.open(url, "_blank");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-10 font-[family-name:var(--font-geist-sans)]">
            <ToastContainer theme="dark" />
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            MERCH MANAGEMENT
                        </h1>
                        <p className="text-gray-400 mt-2">Manage orders, verify payments, and send confirmations.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button 
                            onClick={handleSendMails}
                            disabled={sendingMails}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold transition disabled:opacity-50"
                        >
                            {sendingMails ? <RefreshCcw className="animate-spin h-5 w-5" /> : <Mail size={18} />}
                            Send Confirmation Emails
                        </button>
                        <button 
                            onClick={() => handleExport("excel")}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold transition"
                        >
                            <TableIcon size={18} />
                            Export Excel
                        </button>
                        <button 
                            onClick={() => handleExport("pdf")}
                            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl font-bold transition"
                        >
                            <FileText size={18} />
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Tabs & Filters */}
                <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex p-1 bg-black/40 rounded-xl w-full md:w-auto">
                            <button 
                                onClick={() => setActiveTab("sports")}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold transition ${activeTab === "sports" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
                            >
                                <Trophy size={18} />
                                Sports
                            </button>
                            <button 
                                onClick={() => setActiveTab("fest")}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold transition ${activeTab === "fest" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
                            >
                                <Ticket size={18} />
                                Fest
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                            {/* Hostel Filter */}
                            <input 
                                type="text"
                                placeholder="Search by Hostel..."
                                value={hostelFilter}
                                onChange={(e) => setHostelFilter(e.target.value)}
                                className="bg-black border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-sm w-full md:w-48 transition-all"
                            />

                            {/* Year Filter */}
                            <select 
                                value={yearFilter}
                                onChange={(e) => setYearFilter(e.target.value)}
                                className="bg-black border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-sm"
                            >
                                <option value="all">Every Year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>

                            {/* Verification Filter */}
                            <select 
                                value={verifiedFilter}
                                onChange={(e) => setVerifiedFilter(e.target.value)}
                                className="bg-black border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-sm"
                            >
                                <option value="all">All Orders</option>
                                <option value="true">Verified Only</option>
                                <option value="false">Non-Verified</option>
                            </select>

                            <button 
                                onClick={() => {
                                    setYearFilter("all");
                                    setVerifiedFilter("all");
                                    setHostelFilter("");
                                }}
                                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition text-gray-400 hover:text-white font-medium text-xs"
                                title="Clear All Filters"
                            >
                                Clear
                            </button>

                            <button 
                                onClick={loadData}
                                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition"
                            >
                                <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Student Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Hostel/Year</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Size</th>
                                    {activeTab === "sports" && (
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Merch Details</th>
                                    )}
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Verification</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-20">
                                            <div className="flex flex-col items-center gap-3">
                                                <RefreshCcw className="animate-spin text-orange-500" size={40} />
                                                <span className="text-gray-400 font-medium">Fetching orders...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : activeTab === "sports" ? (
                                    sportsOrders.length === 0 ? (
                                        <tr><td colSpan={7} className="text-center py-20 text-gray-500">No sports merch orders found</td></tr>
                                    ) : sportsOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-white/[0.02] transition">
                                            <td className="px-6 py-4">
                                                <div className="font-bold">{order.name}</div>
                                                <div className="text-xs text-gray-500">{order.email}</div>
                                                <div className="text-xs text-gray-500">{order.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">{order.hostelName}</div>
                                                <div className="text-xs text-gray-400">{order.academicYear}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-mono text-orange-400">{order.transactionId}</div>
                                                <div className="text-[10px] text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">
                                                    {order.size || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold">{order.merchName}</div>
                                                <div className="inline-flex items-center px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-xs font-bold mt-1">
                                                    #{order.merchNumber}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={order.verified}
                                                    onChange={() => handleVerify("sports", order._id, order.verified)}
                                                    className="w-5 h-5 rounded border-white/20 bg-black/40 text-orange-500 focus:ring-orange-500 accent-orange-500 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-center gap-1">
                                                    {order.verified ? (
                                                        <span className="flex items-center gap-1 text-green-500 text-xs font-bold">
                                                            <CheckCircle2 size={14} /> Verified
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-gray-500 text-xs font-bold">
                                                            <XCircle size={14} /> Pending
                                                        </span>
                                                    )}
                                                    {order.emailSent && (
                                                        <span className="flex items-center gap-1 text-blue-400 text-[10px] font-bold">
                                                            <Mail size={10} /> Email Sent
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    festOrders.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center py-20 text-gray-500">No fest merch orders found</td></tr>
                                    ) : festOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-white/[0.02] transition">
                                            <td className="px-6 py-4">
                                                <div className="font-bold">{order.name}</div>
                                                <div className="text-xs text-gray-500">{order.email}</div>
                                                <div className="text-xs text-gray-500">{order.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">{order.hostelName}</div>
                                                <div className="text-xs text-gray-400">{order.academicYear}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-mono text-purple-400">{order.transactionId}</div>
                                                <div className="text-[10px] text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">
                                                    {order.size || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={order.verified}
                                                    onChange={() => handleVerify("fest", order._id, order.verified)}
                                                    className="w-5 h-5 rounded border-white/20 bg-black/40 text-purple-500 focus:ring-purple-500 accent-purple-500 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-center gap-1">
                                                    {order.verified ? (
                                                        <span className="flex items-center gap-1 text-green-500 text-xs font-bold">
                                                            <CheckCircle2 size={14} /> Verified
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-gray-500 text-xs font-bold">
                                                            <XCircle size={14} /> Pending
                                                        </span>
                                                    )}
                                                    {order.emailSent && (
                                                        <span className="flex items-center gap-1 text-blue-400 text-[10px] font-bold">
                                                            <Mail size={10} /> Email Sent
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
