import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export function LoadingSpinner({
    className,
}: {
    className?: string;
}) {
    return (
        <div>
            <Loader className="w-8 h-8 animate-spin" />
        </div>
    );
}