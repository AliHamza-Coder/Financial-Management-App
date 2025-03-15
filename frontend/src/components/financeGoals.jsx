import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic to handle client-side rendering
import styles from "../styles/FinanceGoals.module.css";

// Dynamically import jsPDF and html2canvas to avoid issues during server-side rendering
const jsPDF = dynamic(() => import("jspdf"), { ssr: false });
const html2canvas = dynamic(() => import("html2canvas"), { ssr: false });

export default function FinanceGoals({ income, totalExpenses }) {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");

  // Fetch goals from localStorage on load
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(storedGoals);
  }, []);

  // Save goals to localStorage when goals are updated
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem("goals", JSON.stringify(goals));
    }
  }, [goals]);

  const savings = income - totalExpenses;

  const addGoal = () => {
    if (!goalName || !goalAmount || !goalDeadline)
      return alert("Please enter all fields!");

    const goalProgress = Math.min((savings / Number(goalAmount)) * 100, 100);

    const newGoal = {
      id: Date.now(),
      name: goalName,
      amount: Number(goalAmount),
      deadline: goalDeadline,
      progress: goalProgress,
    };

    setGoals([...goals, newGoal]);
    setGoalName("");
    setGoalAmount("");
    setGoalDeadline("");
  };

  // 📌 Function to download PDF of goals
  const downloadPDF = () => {
    const input = document.getElementById("goals-report");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Finance_Goals_Report.pdf");
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎯 Financial Goals Tracker</h1>

      <div className={styles.goalInputContainer}>
        <h2 className={styles.subtitle}>Set a New Goal</h2>
        <input
          type="text"
          placeholder="Goal Name (e.g., Buy a Car)"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="number"
          placeholder="Target Amount ($)"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="date"
          value={goalDeadline}
          onChange={(e) => setGoalDeadline(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={addGoal} className={styles.addButton}>
          ➕ Add Goal
        </button>
      </div>

      <button onClick={downloadPDF} className={styles.downloadButton}>
        📄 Download Goals Report
      </button>

      <div id="goals-report" className={styles.goalsContainer}>
        <h2 className={styles.subtitle}>Your Financial Goals</h2>

        {goals.length === 0 ? (
          <p className={styles.noGoalsText}>You have not set any goals yet.</p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className={styles.goalItem}>
              <h3 className={styles.goalName}>{goal.name}</h3>
              <p>
                🎯 Target:{" "}
                <span className={styles.boldText}>${goal.amount}</span>
              </p>
              <p>
                📅 Deadline:{" "}
                <span className={styles.boldText}>{goal.deadline}</span>
              </p>
              <p>
                💰 Current Savings:{" "}
                <span className={styles.boldText}>${savings}</span>
              </p>
              <div className={styles.progressBarContainer}>
                <div
                  className={`${styles.progressBar} ${
                    goal.progress >= 100 ? styles.completed : styles.inProgress
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <p className={styles.progressText}>
                Progress:{" "}
                <span
                  className={goal.progress >= 100 ? styles.completedText : styles.inProgressText}
                >
                  {(goal.progress || 0).toFixed(2)}%
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

