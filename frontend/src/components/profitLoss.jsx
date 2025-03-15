"use client";

import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import styles from "../styles/LossProfit.module.css";

export default function LossProfit({ budgets, expenses }) {
  const [income, setIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    if (!budgets?.length || !expenses?.length) return;
    setIncome(budgets.reduce((acc, budget) => acc + Number(budget.amount || 0), 0));
    setTotalExpenses(expenses.reduce((acc, expense) => acc + Number(expense.amount || 0), 0));
  }, [budgets, expenses]);

  const profitLoss = income - totalExpenses;

  if (!budgets?.length || !expenses?.length) {
    return <p className={styles.loading}>Loading data...</p>;
  }

  const pieData = {
    labels: expenses.map((exp) => exp.name),
    datasets: [
      {
        data: expenses.map((exp) => Number(exp.amount)),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"],
      },
    ],
  };

  const lineData = {
    labels: expenses.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "Daily Expenses",
        data: expenses.map((exp) => Number(exp.amount)),
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <img src="Finovalogo.png" alt="Company Logo" className={styles.logo} />
        <h1 className={styles.navbarTitle}>Profit & Loss Summary</h1>
      </nav>

      <div className={styles.summaryBox}>
        <p>Income: ${income}</p>
        <p>Expenses: ${totalExpenses}</p>
        <p className={profitLoss >= 0 ? styles.profit : styles.loss}>
          {profitLoss >= 0 ? "Profit" : "Loss"}: ${Math.abs(profitLoss)}
        </p>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Expenses Breakdown</h2>
          <Pie data={pieData} options={chartOptions} />
        </div>
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Daily Expenses Trend</h2>
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
