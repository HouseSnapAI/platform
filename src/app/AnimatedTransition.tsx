'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const AnimatedTransition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [page, setPage] = useState(pathname);

    useEffect(() => {
        setPage(pathname);
    }, [pathname]);

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