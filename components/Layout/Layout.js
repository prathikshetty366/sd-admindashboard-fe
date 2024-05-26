import React from 'react'
import styles from './layout.module.scss'

function Layout({ children }) {
    return (
        <div className={styles.layoutContainer}>
            <div className={styles.topbar}>
                <h2>Logo</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h2 >Bookings</h2>
                    <h2>Bookings</h2>
                    <h2>Bookings</h2>
                    <h2>Bookings</h2>
                </div>
                <div className={styles.window}>{children}</div>
            </div>
        </div>
    )
}

export default Layout