"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    fetchSportsMerchOrders,
    fetchFestMerchOrders,
    verifyMerchOrder,
    sendConfirmationMails,
    sendCustomEmailAPI,
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
    Ticket,
    Send,
    UserPlus,
    Users
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
    const [nameFilter, setNameFilter] = useState("");
    const [sendingMails, setSendingMails] = useState(false);

    // Custom Email State
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [emailSubject, setEmailSubject] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [isBulkEmail, setIsBulkEmail] = useState(false);

    useEffect(() => {
        loadData();
    }, [verifiedFilter, yearFilter, hostelFilter, nameFilter]);

    const loadData = async () => {
        setLoading(true);
        try {
            const filters = {
                verified: verifiedFilter === "all" ? undefined : verifiedFilter,
                academicYear: yearFilter === "all" ? undefined : yearFilter,
                hostelName: hostelFilter || undefined,
                name: nameFilter || undefined
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

    const handleSendCustomEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailSubject || !emailMessage) {
            toast.error("Subject and message are required");
            return;
        }

        setSendingMails(true);
        try {
            const data = {
                subject: emailSubject,
                message: emailMessage,
                ...(isBulkEmail ? {
                    merchType: activeTab,
                    filters: {
                        academicYear: yearFilter,
                        hostelName: hostelFilter
                    }
                } : {
                    userIds: selectedUserIds
                })
            };

            const res = await sendCustomEmailAPI(data);
            if (res.success) {
                toast.success(res.message);
                setIsEmailModalOpen(false);
                setEmailSubject("");
                setEmailMessage("");
                setSelectedUserIds([]);
            }
        } catch (error) {
            toast.error("Failed to send custom emails");
        } finally {
            setSendingMails(false);
        }
    };

    const toggleUserSelection = (id: string) => {
        setSelectedUserIds(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const handleExport = (format: "excel" | "pdf") => {
        const filters = {
            verified: verifiedFilter === "all" ? "" : verifiedFilter,
            academicYear: yearFilter === "all" ? "" : yearFilter,
            hostelName: hostelFilter || "",
            name: nameFilter || ""
        };

        const params = new URLSearchParams();
        if (filters.verified) params.append("verified", filters.verified);
        if (filters.academicYear) params.append("academicYear", filters.academicYear);
        if (filters.hostelName) params.append("hostelName", filters.hostelName);
        if (filters.name) params.append("name", filters.name);

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
                        <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent uppercase">
                            Merch Management
                        </h1>
                        <p className="text-gray-400 mt-2">Manage orders, verify payments, and send confirmations.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => {
                                setIsBulkEmail(true);
                                setIsEmailModalOpen(true);
                            }}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl font-bold transition"
                        >
                            <Users size={18} />
                            Send Custom to All
                        </button>
                        {selectedUserIds.length > 0 && (
                            <button
                                onClick={() => {
                                    setIsBulkEmail(false);
                                    setIsEmailModalOpen(true);
                                }}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition animate-pulse"
                            >
                                <UserPlus size={18} />
                                Send to {selectedUserIds.length} Selected
                            </button>
                        )}
                        <button
                            onClick={handleSendMails}
                            disabled={sendingMails}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold transition disabled:opacity-50"
                        >
                            {sendingMails ? <RefreshCcw className="animate-spin h-5 w-5" /> : <Mail size={18} />}
                            Send Conf. Emails
                        </button>
                        <button
                            onClick={() => handleExport("excel")}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold transition text-sm"
                        >
                            <TableIcon size={16} />
                            Excel
                        </button>
                        <button
                            onClick={() => handleExport("pdf")}
                            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl font-bold transition text-sm"
                        >
                            <FileText size={16} />
                            PDF
                        </button>
                    </div>
                </div>

                {/* EMAIL MODAL */}
                {isEmailModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <div className="bg-[#111] border border-white/10 w-full max-w-lg rounded-3xl p-8 space-y-6 shadow-2xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black italic">
                                    {isBulkEmail ? `BULK EMAIL (${activeTab.toUpperCase()})` : `SEND TO ${selectedUserIds.length} SELECTED`}
                                </h2>
                                <button onClick={() => setIsEmailModalOpen(false)} className="text-gray-500 hover:text-white transition">
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSendCustomEmail} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Subject Line</label>
                                    <input
                                        type="text"
                                        required
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        placeholder="e.g. Update regarding your order"
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Message Body</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={emailMessage}
                                        onChange={(e) => setEmailMessage(e.target.value)}
                                        placeholder="Type your message here..."
                                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition resize-none"
                                    />
                                </div>
                                {isBulkEmail && (
                                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[11px] text-purple-400 font-medium">
                                        Note: This will be sent to ALL <strong>verified</strong> {activeTab} merch users matching your current filters.
                                    </div>
                                )}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEmailModalOpen(false)}
                                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition border border-white/5"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={sendingMails}
                                        className="flex-[2] py-3 bg-white text-black hover:bg-gray-100 rounded-xl font-bold transition flex items-center justify-center gap-2"
                                    >
                                        {sendingMails ? <RefreshCcw className="animate-spin" size={18} /> : (
                                            <>
                                                <Send size={18} />
                                                Send Now
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

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
                                onClick={() => {
                                    setActiveTab("fest");
                                    setSelectedUserIds([]); // Clear selection when switching tabs
                                }}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold transition ${activeTab === "fest" ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}
                            >
                                <Ticket size={18} />
                                Fest
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                            {/* Name Filter */}
                            <input
                                type="text"
                                placeholder="Search by Name..."
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)}
                                className="bg-black border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 text-sm w-full md:w-48 transition-all"
                            />

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
                                    setNameFilter("");
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

                {/* Table Section — Desktop */}
                <div className="hidden md:block bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Sel.</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Student Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Hostel/Year</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Size</th>
                                    {activeTab === "sports" && (
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Merch Details</th>
                                    )}
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Verify</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-20">
                                            <div className="flex flex-col items-center gap-3">
                                                <RefreshCcw className="animate-spin text-orange-500" size={40} />
                                                <span className="text-gray-400 font-medium">Fetching orders...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : activeTab === "sports" ? (
                                    sportsOrders.length === 0 ? (
                                        <tr><td colSpan={8} className="text-center py-20 text-gray-500">No sports merch orders found</td></tr>
                                    ) : sportsOrders.map((order) => (
                                        <tr key={order._id} className={`hover:bg-white/[0.02] transition ${selectedUserIds.includes(order._id) ? 'bg-purple-500/5' : ''}`}>
                                            <td className="px-6 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUserIds.includes(order._id)}
                                                    onChange={() => toggleUserSelection(order._id)}
                                                    className="w-4 h-4 rounded-md accent-purple-600 cursor-pointer"
                                                />
                                            </td>
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
                                                <div className="text-xs font-mono text-orange-400 break-all">{order.transactionId}</div>
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
                                                            <Mail size={10} /> Confirmed
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    festOrders.length === 0 ? (
                                        <tr><td colSpan={8} className="text-center py-20 text-gray-500">No fest merch orders found</td></tr>
                                    ) : festOrders.map((order) => (
                                        <tr key={order._id} className={`hover:bg-white/[0.02] transition ${selectedUserIds.includes(order._id) ? 'bg-purple-500/5' : ''}`}>
                                            <td className="px-6 py-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUserIds.includes(order._id)}
                                                    onChange={() => toggleUserSelection(order._id)}
                                                    className="w-4 h-4 rounded-md accent-purple-600 cursor-pointer"
                                                />
                                            </td>
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
                                                <div className="text-xs font-mono text-purple-400 break-all">{order.transactionId || order.razorpay_payment_id || 'RAZORPAY'}</div>
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
                                                            <Mail size={10} /> Confirmed
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

                {/* Card Section — Mobile */}
                <div className="md:hidden space-y-4">
                    {loading ? (
                        <div className="text-center py-20 flex flex-col items-center gap-3">
                            <RefreshCcw className="animate-spin text-orange-500" size={32} />
                            <span className="text-gray-400">Loading orders...</span>
                        </div>
                    ) : (activeTab === "sports" ? sportsOrders : festOrders).length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-gray-500">
                            No matching orders found
                        </div>
                    ) : (activeTab === "sports" ? sportsOrders : festOrders).map((order) => (
                        <div
                            key={order._id}
                            className={`bg-[#111] border rounded-3xl p-5 space-y-4 relative overflow-hidden transition-all ${selectedUserIds.includes(order._id) ? 'border-purple-500 ring-1 ring-purple-500/20 shadow-lg shadow-purple-500/5' : 'border-white/10'
                                }`}
                        >
                            {/* Selection Checkbox (Floating) */}
                            <div className="absolute top-4 right-4">
                                <input
                                    type="checkbox"
                                    checked={selectedUserIds.includes(order._id)}
                                    onChange={() => toggleUserSelection(order._id)}
                                    className="w-6 h-6 rounded-lg accent-purple-600 cursor-pointer shadow-xl shadow-black"
                                />
                            </div>

                            <div className="space-y-1 pr-10">
                                <h3 className="text-lg font-black tracking-tight">{order.name}</h3>
                                <div className="text-xs text-gray-400 truncate">{order.email}</div>
                                <div className="text-xs text-gray-500 font-medium">{order.phone}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Location</p>
                                    <p className="text-white font-medium truncate">{order.hostelName}</p>
                                    <p className="text-xs text-gray-400">{order.academicYear}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Size</p>
                                    <span className="inline-flex px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white font-black text-xs">
                                        {order.size || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1 bg-black/40 p-3 rounded-2xl border border-white/5">
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Transaction / Payment ID</p>
                                <p className="text-xs font-mono text-orange-400 break-all">
                                    {order.transactionId || order.razorpay_payment_id || 'manual-entry'}
                                </p>
                                <p className="text-[9px] text-gray-600 mt-1 uppercase font-bold">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>

                            {activeTab === "sports" && (
                                <div className="flex items-center justify-between p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                                    <div className="text-sm font-bold text-yellow-500">{order.merchName}</div>
                                    <div className="text-xs font-black px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded">#{order.merchNumber}</div>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                <div className="flex flex-col gap-1">
                                    {order.verified ? (
                                        <div className="flex items-center gap-1.5 text-green-500 text-xs font-black uppercase tracking-wider">
                                            <CheckCircle2 size={14} /> Verified
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-gray-600 text-xs font-black uppercase tracking-wider">
                                            <XCircle size={14} /> Pending Approval
                                        </div>
                                    )}
                                    {order.emailSent && (
                                        <div className="flex items-center gap-1 text-blue-400 text-[10px] font-bold uppercase tracking-wide">
                                            <Mail size={10} /> Confirmed Email Sent
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-gray-500 font-bold uppercase transition">Set Verified</span>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={order.verified}
                                            onChange={() => handleVerify(activeTab, order._id, order.verified)}
                                            className="sr-only peer"
                                        />
                                        <div className={`w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${activeTab === 'sports' ? 'peer-checked:bg-orange-600' : 'peer-checked:bg-purple-600'}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
