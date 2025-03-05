import { Button } from "@/components/ui/button";
import { Home, Package, Power, Settings, User, Users } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Settings", icon: Settings, path: "/#" },
];

type SidebarProps = {
    handleSignOut: () => void;
}

const Sidebar = ({ handleSignOut }: SidebarProps) => {
    const pathname = usePathname();
    const { user } = useAuthStore();

    return (
        <aside className="w-64 bg-white dark:bg-gray-900 shadow-xl h-screen flex flex-col justify-between p-5 border-r border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard</h1>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={clsx(
                                "flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200",
                                {
                                    "bg-black text-white font-semibold dark:bg-gray-800 hover:text-black hover:bg-gray-200": pathname === item.path, // Ativo: fundo preto, texto branco, hover preto
                                    "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800": pathname !== item.path, // Normal
                                }
                            )}
                        >
                            <item.icon className="w-5 h-5 mr-3" /> {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* User Profile & Logout */}
            <div className="border-t pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.displayName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                    <Power className="w-5 h-5" />
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
