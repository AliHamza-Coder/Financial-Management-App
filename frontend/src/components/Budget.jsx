import { useState, useReducer, useEffect } from "react";
import { Pencil, Trash } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import styles from "../styles/Budget.module.css";

const budgetReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.budgets;
    case "ADD":
      return [{ id: Date.now(), name: action.name, amount: parseFloat(action.amount) }, ...state];
    case "EDIT":
      return state.map((budget) =>
        budget.id === action.id ? { ...budget, name: action.name, amount: parseFloat(action.amount) } : budget
      );
    case "DELETE":
      return state.filter((budget) => budget.id !== action.id);
    default:
      return state;
  }
};

export default function BudgetManager() {
  const [budgets, dispatch] = useReducer(budgetReducer, []);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Retrieve budgets from localStorage on component mount
  useEffect(() => {
    const storedBudgets = JSON.parse(localStorage.getItem("budgets")) || [];
    dispatch({ type: "SET", budgets: storedBudgets });
  }, []);

  // Save budgets to localStorage whenever the state changes
  useEffect(() => {
    if (budgets.length > 0) {
      localStorage.setItem("budgets", JSON.stringify(budgets));
    }
  }, [budgets]);

  const handleSubmit = () => {
    if (!name.trim() || isNaN(amount) || amount.toString().trim() === "") return;
    if (editingId) {
      dispatch({ type: "EDIT", id: editingId, name, amount });
      setEditingId(null);
    } else {
      const newBudget = { id: Date.now(), name, amount };
      dispatch({ type: "ADD", ...newBudget });
    }
    setName("");
    setAmount("");
  };

  const handleEdit = (budget) => {
    setName(budget.name);
    setAmount(budget.amount);
    setEditingId(budget.id);
  };

  const filteredBudgets = budgets.filter((budget) =>
    budget.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const chartData = budgets.reduce((acc, item) => {
    const date = new Date(item.id).toLocaleDateString();
    const existing = acc.find((data) => data.date === date);
    if (existing) {
      existing.amount += parseFloat(item.amount);
    } else {
      acc.push({ date, amount: parseFloat(item.amount) });
    }
    return acc;
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.navbarTitle}>Budget Manager</h1>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search Budget"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>
      <div className={styles.mainContent}>
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Budget Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="amount" stroke="#007bff" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.budgetSection}>
          <div className={styles.inputContainer}>
            <input className={styles.inputField} placeholder="Budget Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={styles.inputField} placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button className={styles.btn} onClick={handleSubmit}>{editingId ? "Update" : "Add"}</button>
          </div>
          <ul className={styles.budgetList}>
            <h2 className={styles.historyTitle}>History</h2>
            {filteredBudgets.map((budget) => (
              <li key={budget.id} className={styles.budgetItem}>
                <div>
                  <span className={styles.budgetName}>{budget.name}</span> - PKR{budget.amount} (Added at {new Date(budget.id).toLocaleTimeString()})
                </div>
                <div className={styles.btnGroup}>
                  <button onClick={() => handleEdit(budget)} className={styles.editBtn}><Pencil size={18} /></button>
                  <button onClick={() => dispatch({ type: "DELETE", id: budget.id })} className={styles.deleteBtn}><Trash size={18} /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
