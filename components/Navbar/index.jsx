import React from "react";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { WebImages } from "@/assets/logo";

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
              <a href="/orders">Orders</a>
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
