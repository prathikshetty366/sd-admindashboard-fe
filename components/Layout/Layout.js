import React from 'react';
import styles from './layout.module.scss';
import Image from 'next/image';
import logo from "@/public/assets/login/spd-logo.png";
import { useRouter } from 'next/router';

function Layout({ children }) {
    const router = useRouter();
    const { pathname } = router;

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <div className={styles.layoutContainer}>
            <div className={styles.topbar}>
                <Image src={logo} width={80} height={90} alt='logo' />
                <h2>Admin Dashboard</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h3
                        className={pathname === '/bookings' ? styles.active : ''}
                        onClick={() => navigateTo('/bookings')}
                    >
                        Bookings
                    </h3>
                    <h3
                        className={pathname === '/billing' ? styles.active : ''}
                        onClick={() => navigateTo('/billing')}
                    >
                        Billing
                    </h3>
                    <h3
                        className={pathname === '/dashboard' ? styles.active : ''}
                        onClick={() => navigateTo('/dashboard')}
                    >
                        Dashboard
                    </h3>
                    <h3
                        className={pathname === '/analytics' ? styles.active : ''}
                        onClick={() => navigateTo('/analytics')}
                    >
                        Analytics
                    </h3>
                </div>
                <div className={styles.window}>{children}</div>
            </div>
        </div>
    );
}

export default Layout;
