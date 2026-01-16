"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    photoURL?: string;
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
            setUsers(users.map(u => u._id === userId ? response.data : u));
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Failed to update user role");
        }
    };

    const handleDelete = async (userId: string) => {
        if (userId === currentUser?._id) {
            alert("You cannot delete yourself!");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this user? This will also remove their associated data.")) return;
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
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-white mb-1">Manage Users</h2>
                    <p className="text-slate-400 text-sm">Monitor user activity and manage system permissions.</p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search name, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 w-64 pl-10"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
                </div>
            </header>

            <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-full overflow-hidden bg-primary/20 border border-white/10 flex items-center justify-center text-primary font-bold">
                                                {u.photoURL ? (
                                                    <img src={u.photoURL} alt={u.name} className="object-cover size-full" />
                                                ) : (
                                                    u.name.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-100 mb-0.5">
                                                    {u.name} {u._id === currentUser?._id && <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400 ml-1 underline underline-offset-2">YOU</span>}
                                                </h4>
                                                <p className="text-xs text-slate-500 font-mono">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            disabled={u._id === currentUser?._id}
                                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-primary/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                                        >
                                            <option value="user" className="bg-background-dark">User</option>
                                            <option value="admin" className="bg-background-dark">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => handleDelete(u._id)}
                                            disabled={u._id === currentUser?._id}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
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
