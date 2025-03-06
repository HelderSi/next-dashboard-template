"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { logoutUser } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    await logoutUser();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar handleSignOut={handleSignOut} isCollapsed={isCollapsed} onIsCollapsedChange={setIsCollapsed} />

      <main className={`flex-1 p-6 transition-all ${isCollapsed ? "ml-16" : "ml-64"}`}>
        <div className="bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </main>
    </div>
  );
}


