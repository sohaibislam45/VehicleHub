import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout role="user">{children}</DashboardLayout>;
}
