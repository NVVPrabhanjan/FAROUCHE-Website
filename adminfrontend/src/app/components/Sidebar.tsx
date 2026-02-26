"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, CalendarPlus, Trophy, Image as ImageIcon, LogOut, X, Users, ActivitySquare } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    className?: string;
}

export default function Sidebar({ isOpen = true, onClose, className = "" }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [role, setRole] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        setRole(localStorage.getItem("adminRole") || "viewer");
        setUsername(localStorage.getItem("adminUsername") || "Admin");
    }, []);

    const canWrite = role === "super_admin" || role === "admin";
    const isSuperAdmin = role === "super_admin";

    const menuItems = [
        { name: 'Attendance', href: '/dashboard', icon: LayoutDashboard, show: true },
        { name: 'Add Events', href: '/dashboard/events', icon: CalendarPlus, show: canWrite },
        { name: 'Add Results', href: '/dashboard/results', icon: Trophy, show: canWrite },
        { name: 'Gallery', href: '/dashboard/gallery', icon: ImageIcon, show: true },

        { name: 'Admin Management', href: '/dashboard/admins', icon: Users, show: isSuperAdmin },
        { name: 'Activity Log', href: '/dashboard/activity', icon: ActivitySquare, show: isSuperAdmin },
    ];

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("adminRole");
        localStorage.removeItem("adminUsername");
        localStorage.removeItem("adminToken");
        router.push("/");
    };


    const roleBadgeClass =
        role === "super_admin" ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
        role === "admin"       ? "bg-purple-500/20 text-purple-300 border-purple-500/30" :
                                 "bg-gray-500/20   text-gray-300   border-gray-500/30";
    const roleLabel =
        role === "super_admin" ? "Super Admin" :
        role === "admin"       ? "Main Admin"  : "Viewer";

    return (
        <>
            
            {isOpen && onClose && (
                <div
                    className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            
            <div className={`
                fixed top-0 left-0 h-full w-64
                bg-black/40 backdrop-blur-xl border-r border-white/10 text-card-foreground
                p-4 flex flex-col
                transition-transform duration-300 ease-in-out z-[70] shadow-2xl
                ${className}
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-bold text-center w-full bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                    {onClose && (
                        <button onClick={onClose} className="md:hidden text-muted-foreground hover:text-foreground">
                            <X size={24} />
                        </button>
                    )}
                </div>

                
                <div className="mb-6 px-1">
                    <p className="text-white text-sm font-medium truncate">{username}</p>
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border font-semibold ${roleBadgeClass}`}>
                        {roleLabel}
                    </span>
                </div>

                <nav className="flex-1 space-y-1">
                    {menuItems.filter(item => item.show).map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                    isActive
                                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-l-4 border-purple-500'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon size={20} className={isActive ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300"} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-900/10 rounded-lg mt-auto"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );
}
