import { Button } from "@/components/ui/button";
import { Home, Package, Power, Settings, User, Users, ChevronLeft, ChevronRight, SidebarOpen } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Settings", icon: Settings, path: "/#" },
];

type SidebarProps = {
    handleSignOut: () => void;
    isCollapsed: boolean;
    onIsCollapsedChange: (value: boolean) => void;
};

const Sidebar = ({ handleSignOut, isCollapsed, onIsCollapsedChange }: SidebarProps) => {
    const pathname = usePathname();
    const { user } = useAuthStore();

    return (
        <aside className={clsx(
            "fixed left-0 top-0 shadow-lg bg-white dark:bg-gray-900 shadow-xl h-screen flex flex-col justify-between border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
            isCollapsed ? "w-20" : "w-64"
        )}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4">
                {!isCollapsed &&
                    <div className="flex items-center gap-2">
                        {/* Logo */}
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <img src="/vercel.svg" alt="Logo" className="w-8 h-8" />
                        </div>
                        {/* Sidebar Name (Hidden when isCollapsed) */}
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
                    </div>}
                {/* Collapse Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onIsCollapsedChange(!isCollapsed)}
                >
                    {isCollapsed ? <SidebarOpen className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </Button>
            </div>

            {/* Navigation */}
            <div className="flex flex-col flex-grow p-3 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={clsx(
                            "flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200",
                            {
                                "bg-black text-white font-semibold dark:bg-gray-800 hover:text-black hover:bg-gray-200": pathname === item.path,
                                "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800": pathname !== item.path,
                            }
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                ))}
            </div>

            {/* User Profile & Logout */}
            <div className="border-t p-4 flex flex-col transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    {!isCollapsed && (<div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.displayName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>)}
                </div>
                <Button
                    variant="ghost"
                    className="mt-3 hover:bg-red-300"
                    onClick={handleSignOut}
                >
                    <Power className="w-5 h-5" />  {!isCollapsed && "Logout"}
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;