// app/login/page.tsx
"use client";

import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

export default function LoginPage() {
    const { loading, error, setError, loginUser, loginUserWithGoogle, sendPasswordResetLink } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginUser(email, password);
    };

    const handleGoogleLogin = async () => {
        await loginUserWithGoogle();
    };

    const handlePasswordReset = async () => {
        if (!email) {
            toast.error("Please enter your email for password reset.");
            return;
        }
        await sendPasswordResetLink(email);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
                <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
                {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
                <form onSubmit={handleEmailLogin}>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                            placeholder="********"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Login"}
                    </Button>
                </form>
                <div className="flex items-center justify-center mt-4 space-x-2">
                    <span>or</span>
                    <Button onClick={handleGoogleLogin} variant="outline" disabled={loading}>
                        {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Sign in with Google"}
                    </Button>
                </div>
                <div className="mt-4 text-center">
                    <button onClick={handlePasswordReset} className="text-sm text-blue-500 hover:underline">
                        Forgot Password?
                    </button>
                </div>
            </div>
        </div>
    );
}
