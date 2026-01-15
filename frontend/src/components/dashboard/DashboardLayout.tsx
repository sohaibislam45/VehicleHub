"use client";

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
    children,
    role
}: {
    children: React.ReactNode;
    role?: 'user' | 'admin';
}) {
    return (
        <ProtectedRoute role={role}>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <Sidebar role={role} />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
