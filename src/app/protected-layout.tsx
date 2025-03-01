'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedLayout({ children }: { readonly children: React.ReactNode }) {
    const router = useRouter();
    const { user, loading } = useAuthStore();

    useEffect(() => {
        if (!user) {
            console.log('logged out');
            router.push('/login');
        }
        if (user) {
            console.log('logged in');
            router.push('/');
        }
    }, [user, loading, router]);

    return <>{children}</>;
}