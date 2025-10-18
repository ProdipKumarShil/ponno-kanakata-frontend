"use client";

import AdminDashboard from "@/components/admin/dashboard";
import { useLanguage } from "@/context/language-context";

export default function AdminDashboardPage() {
    const { language } = useLanguage();
    return <AdminDashboard language={language} />;
}
