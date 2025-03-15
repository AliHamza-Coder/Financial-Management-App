import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";
import { useRouter } from "next/navigation";
import { FaBars, FaHome, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChartLine,faBars,faHome,faDollarSign,faBullseye,faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  return (
    <div className={`${styles.sidebar} ${expanded ? styles.expanded : ""}`}>
      {/* Toggle Button */}
      <div className={styles.toggleBtn} onClick={() => setExpanded(!expanded)}>
        <FaBars />
      </div>

      {/* Navigation Menu */}
      
      <ul className={styles.menu}>
        <li className={styles.menuItem} onClick={() => router.push( "/") }>
          <FaHome className={styles.icon} />
          {expanded && <span>Dashboard</span>}
        </li>

        <li className={styles.menuItem} onClick={() => router.push("/budget")}>
          <FontAwesomeIcon icon={faDollarSign} className={styles.icon} />
          {expanded && <span>Budgets</span>}
        </li>       
        <li className={styles.menuItem} onClick={() => router.push("/financial-goal")}>
          <FontAwesomeIcon icon={faBullseye} className={styles.icon} />
          {expanded && <span>Goals</span>}
        </li>
        <li className={styles.menuItem} onClick={() => router.push("/expense")}>
          <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
          {expanded && <span>Expense</span>}
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;
