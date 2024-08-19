'use client'

import { fetchUserInfo } from '@/utils/db';
import { useUser } from '@auth0/nextjs-auth0/client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const AnimatedTransition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [page, setPage] = useState(pathname);
    const { user } = useUser();
    useEffect(() => {
        setPage(pathname);
    }, [pathname]);

    useEffect(() => {
        if (window) {
            const handleBeforeUnload = async () => {
                localStorage.clear();
                if (user?.email) {
                    await fetchUserInfo(user.email);
                }
            };

            window.addEventListener('beforeunload', handleBeforeUnload);

            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, [user?.email]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={page}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0 } }} // Snap in instantly
                exit={{ opacity: 0, transition: { duration: 0.5 } }} // Fade out
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimatedTransition