"use client";

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
    children,
    role = 'user'
}: {
    children: React.ReactNode;
    role?: 'user' | 'admin';
}) {
    return (
        <ProtectedRoute role={role}>
            <div className="bg-background-dark min-h-screen flex font-display">
                <DashboardSidebar role={role} />
                <main className="flex-1 ml-72 px-12 py-8 overflow-y-auto custom-scrollbar">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
