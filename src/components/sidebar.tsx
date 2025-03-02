import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Power, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

type SidebarProps = {
    navItems: { name: string; icon: any }[];
    handleSignOut: () => void;
    onActiveChange?: (name: string) => void;
}

const Sidebar = ({ navItems, handleSignOut, onActiveChange }: SidebarProps) => {
    const [active, setActive] = useState(navItems[0]?.name);

    const handleActiveChange = (name: string) => {
        setActive(name);
        onActiveChange && onActiveChange(name);
    };

    const { user } = useAuthStore();

    console.log(user)

    return (
        <aside className="w-72 bg-white dark:bg-gray-900 shadow-xl h-screen flex flex-col justify-between p-5 border-r border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard</h1>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Button
                            key={item.name}
                            variant={active === item.name ? "default" : "ghost"}
                            className="w-full justify-start mb-2"
                            onClick={() => handleActiveChange(item.name)}
                        >
                            <item.icon className="w-5 h-5 mr-2" /> {item.name}
                        </Button>
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
