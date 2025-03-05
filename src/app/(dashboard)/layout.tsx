"use client";

import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { logoutUser } = useAuthStore();

  const handleSignOut = async () => {
    await logoutUser();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        handleSignOut={handleSignOut}
      />

      <main className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
