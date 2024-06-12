import React from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { WebImages } from "@/public/assets/login";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Image src={WebImages.logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.menu}>
          <ul>
            <li className={styles.menu_items}>Home</li>
            <li className={styles.menu_items}>
              <Link href="/orders">Orders</Link>
            </li>
            <li className={styles.menu_items}>Users</li>
            <li className={styles.menu_items}>Vehicles</li>
            <li className={styles.menu_items}>Garages</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
