"use client"; // Ensures this runs only on the client

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBars,
  faHome,
  faDollarSign,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../lib/directusAuth";

import styles from "../styles/Home.module.css";

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.log("No token found, redirecting to login...");
        router.push("/login");
        return;
      }

      try {
        const userData = await getUser(token);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("authToken");
        router.push("/login");
      }
    };

    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, [router]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <nav className={`${styles.sideBar} ${isExpanded ? styles.expanded : ""}`}>
        <div className={styles.toggleBtn} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem} onClick={() => router.push("/")}>
            <FontAwesomeIcon icon={faHome} className={styles.icon} />
            {isExpanded && <span>Dashboard</span>}
          </li>
          <li
            className={styles.menuItem}
            onClick={() => router.push("/budget")}
          >
            <FontAwesomeIcon icon={faDollarSign} className={styles.icon} />
            {isExpanded && <span>Budgets</span>}
          </li>
          <li
            className={styles.menuItem}
            onClick={() => router.push("/financial-goal")}
          >
            <FontAwesomeIcon icon={faBullseye} className={styles.icon} />
            {isExpanded && <span>Goals</span>}
          </li>
          <li
            className={styles.menuItem}
            onClick={() => router.push("/expense")}
          >
            <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
            {isExpanded && <span>Expense</span>}
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div
        className={`${styles.mainContent} ${isExpanded ? styles.shifted : ""}`}
      >
        <header className={styles.header}>
          <span>
            Salam, Welcome back{" "}
            <strong>{user ? user.data.first_name : "User"}!</strong>
          </span>
        </header>

        <div className={styles.cardsContainer}>
          <div className={`${styles.card} ${styles.balanceCard}`}>
            <span className={styles.cardTitle}>Balance</span>
            <h2>$265,9874,72</h2>
            <div className={styles.cardFooter}>
              <span>2765 8437 9087 ****</span>
              <span className={styles.expiryDate}>27/22</span>
            </div>
          </div>
          <div className={`${styles.card} ${styles.incomeCard}`}>
            <span className={styles.cardTitle}>Income</span>
            <h2>$62,870.14</h2>
            <div className={styles.cardFooterInline}>
              <span>This week's income</span>
              <span className={styles.positive}>+ 12.23%</span>
            </div>
          </div>
          <div className={`${styles.card} ${styles.expensesCard}`} onClick={() => router.push("/expenses")}>
            <span className={styles.cardTitle}>Expenses</span>
            <h2>$70,235.87</h2>
            <div className={styles.cardFooterInline}>
              <span>This week's expenses</span>
              <span className={styles.negative}>- 15.74%</span>
            </div>
          </div>
          <div className={`${styles.card} ${styles.extraWidth}`} onClick={() => router.push("/investment")}>
            <h2><span className={styles.cardTitle}>Your Investments</span></h2>
            <div className={styles.investList}></div>
          </div>
          <div className={`${styles.card} ${styles.statsCard}`} onClick={() => router.push("/investmentTracker")}>
            <h3>Your Finance Statistics</h3>
            <div className={styles.cardFooterInline}>
              <h4>No Goal set</h4>
            </div>
          </div>
          <div className={`${styles.card} ${styles.savingsCard}`} onClick={() => router.push("/financegoal")}>
            <h3>Set Goals</h3>
            <div className={styles.cardFooterInline}>
              <h4>No Goal set</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
