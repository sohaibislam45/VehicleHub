"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: 'enabled' | 'disabled';
    photoURL?: string;
    avatar?: string;
    createdAt: string;
}

export default function ManageUsersPage() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/admin/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
        try {
            const response = await api.patch(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(users.map(u => u._id === userId ? { ...u, role: response.data.role } : u));
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Failed to update user role");
        }
    };

    const toggleStatus = async (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'enabled' ? 'disabled' : 'enabled';
        if (!window.confirm(`Are you sure you want to ${newStatus === 'enabled' ? 'enable' : 'disable'} this user?`)) return;

        try {
            const response = await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
            setUsers(users.map(u => u._id === userId ? { ...u, status: response.data.status } : u));
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update user status");
        }
    };

    const handleDelete = async (userId: string) => {
        if (userId === currentUser?._id) return;
        if (!window.confirm("Are you sure you want to PERMANENTLY delete this user? This cannot be undone.")) return;
        try {
            await api.delete(`/admin/users/${userId}`);
            setUsers(users.filter(u => u._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-wrap items-center justify-between gap-6 mb-10">
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl font-black text-white tracking-tight">Manage Users</h2>
                    <p className="text-slate-400 font-medium">Control access levels and monitor active sessions</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-5 h-12 rounded-xl bg-surface-dark border border-border-dark text-sm font-bold text-white hover:bg-white/5 transition-all">
                        <span className="material-symbols-outlined text-lg">file_download</span>
                        Export List
                    </button>
                    <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary text-background-dark text-sm font-black hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">person_add</span>
                        Invite User
                    </button>
                </div>
            </header>

            {/* Search */}
            <section className="mb-6">
                <div className="bg-surface-dark p-2 rounded-2xl border border-border-dark flex items-center gap-2 shadow-sm">
                    <div className="flex-1 flex items-center gap-3 px-4">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-500 font-medium"
                            placeholder="Search users by name, email or ID..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Table */}
            <div className="bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-border-dark">
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">User</th>
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Contact</th>
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Role</th>
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Access Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-dark">
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className={`hover:bg-white/[0.01] transition-colors group ${u.status === 'disabled' ? 'opacity-50' : ''}`}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-full overflow-hidden border-2 border-primary/20 bg-white/5 flex items-center justify-center text-primary font-bold">
                                                {u.photoURL || u.avatar ? (
                                                    <img src={u.photoURL || u.avatar} alt={u.name} className="object-cover size-full" />
                                                ) : (
                                                    u.name.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white group-hover:text-primary transition-colors">
                                                    {u.name} {u._id === currentUser?._id && <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400 ml-1">YOU</span>}
                                                </p>
                                                <p className="text-xs text-slate-500 font-medium">Joined {new Date(u.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-400">
                                        {u.email}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border uppercase ${u.role === 'admin'
                                            ? 'bg-primary/10 text-primary border-primary/20'
                                            : 'bg-white/10 text-slate-300 border-white/10'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className={`size-2 rounded-full ${u.status === 'enabled' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                                            <span className={`text-sm font-bold ${u.status === 'enabled' ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {u.status === 'enabled' ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                disabled={u._id === currentUser?._id || u.status === 'disabled'}
                                                className="bg-background-dark border-none rounded-lg text-xs font-bold focus:ring-1 focus:ring-primary py-1.5 pl-3 pr-8 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-white"
                                            >
                                                <option value="user">Standard User</option>
                                                <option value="admin">Admin</option>
                                            </select>

                                            <button
                                                onClick={() => toggleStatus(u._id, u.status)}
                                                disabled={u._id === currentUser?._id}
                                                className={`p-2 rounded-lg transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed ${u.status === 'enabled'
                                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                                                    : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                                                    }`}
                                                title={u.status === 'enabled' ? "Disable User" : "Enable User"}
                                            >
                                                <span className="material-symbols-outlined text-lg">
                                                    {u.status === 'enabled' ? 'block' : 'check_circle'}
                                                </span>
                                            </button>

                                            <button
                                                onClick={() => handleDelete(u._id)}
                                                disabled={u._id === currentUser?._id}
                                                className="p-2 rounded-lg bg-white/5 text-slate-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                                title="Permanently Delete"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
