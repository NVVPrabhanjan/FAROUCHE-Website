"use client";
import React, { useState } from "react";
import { addResult } from "../../services/adminService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HOSTEL_TYPES = ["National", "International"] as const;
const MATCH_TYPES  = ["General", "Finals"] as const;

export default function AddResultPage() {
    const [name,              setName]              = useState("");
    const [teams,             setTeams]             = useState("");
    const [matchType,         setMatchType]         = useState<"General" | "Finals">("General");
    const [winner,            setWinner]            = useState("");
    const [runner,            setRunner]            = useState("");
    const [category,          setCategory]          = useState("");
    const [hostelType,        setHostelType]        = useState<"National" | "International">("National");
    const [runnerType,        setRunnerType]        = useState<"National" | "International">("National");
    const [manOfTheMatch,     setManOfTheMatch]     = useState("");
    const [winnerImg,         setWinnerImg]         = useState<File | null>(null);
    const [runnerImg,         setRunnerImg]         = useState<File | null>(null);
    const [manOfTheMatchImg,  setManOfTheMatchImg]  = useState<File | null>(null);
    const [loading,           setLoading]           = useState(false);

    const isFinals = matchType === "Finals";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!winnerImg) { toast.error("Winner image is required"); return; }
        if (isFinals && !runnerImg) { toast.error("Runner image is required for Finals"); return; }

        const data = new FormData();
        data.append("name",          name);
        data.append("teams",         teams);
        data.append("matchType",     matchType);
        data.append("winner",        winner);
        data.append("category",      category);
        data.append("hostelType",    hostelType);
        data.append("manofthematch", manOfTheMatch);
        data.append("winnerImg",     winnerImg);

        if (isFinals) {
            data.append("runner",     runner);
            data.append("runnerType", runnerType);
            data.append("runnerImg",  runnerImg!);
        }

        if (manOfTheMatchImg) {
            data.append("manOfTheMatchImg", manOfTheMatchImg);
        }

        setLoading(true);
        try {
            await addResult(data);
            toast.success("Result added successfully!");
            setName(""); setTeams(""); setWinner(""); setRunner("");
            setCategory(""); setManOfTheMatch("");
            setWinnerImg(null); setRunnerImg(null); setManOfTheMatchImg(null);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add result");
        } finally {
            setLoading(false);
        }
    };

    const inputCls   = "w-full bg-input border border-border p-3 rounded text-foreground focus:outline-none focus:ring-1 focus:ring-primary";
    const labelCls   = "block text-muted-foreground font-medium mb-2 text-sm";
    const sectionCls = "border border-border rounded-lg p-5 space-y-4";

    const FileField = ({ label, file, onChange, required = false }: { label: string; file: File | null; onChange: (f: File) => void; required?: boolean }) => (
        <div>
            <label className={labelCls}>{label}{required && " *"}</label>
            <input type="file" accept="image/*"
                onChange={e => e.target.files && onChange(e.target.files[0])}
                className={inputCls} />
            {file && <p className="text-xs text-green-400 mt-1">✓ {file.name}</p>}
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto bg-card text-card-foreground p-6 md:p-10 rounded-xl shadow-md border border-border">
            <ToastContainer theme="dark" />
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary">Add Match Result</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className={sectionCls}>
                    <h2 className="font-semibold text-foreground">Match Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Event Name *</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)}
                                className={inputCls} required placeholder="e.g. Cricket Final" />
                        </div>
                        <div>
                            <label className={labelCls}>Teams *</label>
                            <input type="text" value={teams} onChange={e => setTeams(e.target.value)}
                                className={inputCls} required placeholder="e.g. NH2 vs MH" />
                        </div>
                        <div>
                            <label className={labelCls}>Category *</label>
                            <input type="text" value={category} onChange={e => setCategory(e.target.value)}
                                className={inputCls} required placeholder="e.g. Cricket" />
                        </div>
                        <div>
                            <label className={labelCls}>Match Type *</label>
                            <select value={matchType} onChange={e => setMatchType(e.target.value as "General" | "Finals")} className={inputCls}>
                                {MATCH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Hostel Type *</label>
                            <select value={hostelType} onChange={e => setHostelType(e.target.value as "National" | "International")} className={inputCls}>
                                {HOSTEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={sectionCls}>
                    <h2 className="font-semibold text-foreground">Winner Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Winner Team / Name *</label>
                            <input type="text" value={winner} onChange={e => setWinner(e.target.value)}
                                className={inputCls} required placeholder="e.g. NH2" />
                        </div>
                        <FileField label="Winner Image" file={winnerImg} onChange={setWinnerImg} required />
                    </div>
                </div>

                {isFinals && (
                    <div className={sectionCls}>
                        <h2 className="font-semibold text-foreground">Runner-Up Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelCls}>Runner-Up Team / Name *</label>
                                <input type="text" value={runner} onChange={e => setRunner(e.target.value)}
                                    className={inputCls} required placeholder="e.g. MH" />
                            </div>
                            <FileField label="Runner-Up Image" file={runnerImg} onChange={setRunnerImg} required />
                            <div className="md:col-span-2">
                                <label className={labelCls}>Runner-Up Hostel Type *</label>
                                <select value={runnerType} onChange={e => setRunnerType(e.target.value as "National" | "International")} className={inputCls}>
                                    {HOSTEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                <div className={sectionCls}>
                    <h2 className="font-semibold text-foreground">Man of the Match <span className="text-muted-foreground font-normal text-sm">(optional)</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Player Name</label>
                            <input type="text" value={manOfTheMatch} onChange={e => setManOfTheMatch(e.target.value)}
                                className={inputCls} placeholder="e.g. Rahul M" />
                        </div>
                        <FileField label="Player Photo" file={manOfTheMatchImg} onChange={setManOfTheMatchImg} />
                    </div>
                </div>

                <button type="submit" disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50">
                    {loading ? "Saving..." : "Save Result"}
                </button>
            </form>
        </div>
    );
}
