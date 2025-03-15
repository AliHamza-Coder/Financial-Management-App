import { useState, useReducer, useEffect } from "react";
import { Pencil, Trash } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import styles from "../styles/Expenses.module.css";

const expenseReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.expenses;
        case "ADD":
            return [action.expense, ...state];
        case "EDIT":
            return state.map(exp => exp.id === action.expense.id ? action.expense : exp);
        case "DELETE":
            return state.filter(exp => exp.id !== action.id);
        default:
            return state;
    }
};

export default function ExpenseManager() {
    const [expenses, dispatch] = useReducer(expenseReducer, []);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);

    // Load expenses from localStorage when component mounts
    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
        dispatch({ type: "SET", expenses: storedExpenses });
    }, []);

    // Save expenses to localStorage whenever the expenses list changes
    useEffect(() => {
        if (expenses.length > 0) {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    }, [expenses]);

    const handleSubmit = () => {
        if (!name || !amount) return;
        
        if (editingId) {
            const updatedExpense = { id: editingId, name, amount };
            dispatch({ type: "EDIT", expense: updatedExpense });
        } else {
            const newExpense = { id: Date.now(), name, amount };
            dispatch({ type: "ADD", expense: newExpense });
        }

        setName("");
        setAmount("");
        setEditingId(null);
    };

    const handleDelete = (id) => {
        dispatch({ type: "DELETE", id });
    };

    const handleEdit = (expense) => {
        setName(expense.name);
        setAmount(expense.amount);
        setEditingId(expense.id);
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <h1>Expense Manager</h1>
                <input
                    className={styles.searchBar}
                    type="text"
                    placeholder="Search Expenses"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </nav>

            <div className={styles.chartContainer}>
                <h2>Expense Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={expenses}>
                        <XAxis dataKey="id" hide />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="amount" stroke="#ff4500" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div>
                <input
                    className={styles.inputField}
                    placeholder="Expense Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className={styles.inputField}
                    placeholder="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button className={styles.btn} onClick={handleSubmit}>
                    {editingId ? "Update" : "Add"}
                </button>

                <ul className={styles.expenseList}>
                    {expenses.map((expense) => (
                        <li key={expense.id} className={styles.expenseItem}>
                            <div>
                                <span>{expense.name}</span> - ${expense.amount}
                            </div>
                            <button onClick={() => handleEdit(expense)}><Pencil size={18} /></button>
                            <button onClick={() => handleDelete(expense.id)}><Trash size={18} /></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}




// "use client"; // Ensure it runs on the client side

// import { useState, useReducer } from "react";
// import { Pencil, Trash } from "lucide-react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import styles from "../styles/Expenses.module.css"; // Use module CSS

// const expenseReducer = (state, action) => {
//     switch (action.type) {
//         case "ADD":
//             return [{ id: Date.now(), name: action.name, amount: parseFloat(action.amount) }, ...state];
//         case "EDIT":
//             return state.map((expense) =>
//                 expense.id === action.id ? { ...expense, name: action.name, amount: parseFloat(action.amount) } : expense
//             );
//         case "DELETE":
//             return state.filter((expense) => expense.id !== action.id);
//         default:
//             return state;
//     }
// };

// export default function ExpenseManager() {
//     const [expenses, dispatch] = useReducer(expenseReducer, []);
//     const [history, setHistory] = useState([]);
//     const [name, setName] = useState("");
//     const [amount, setAmount] = useState("");
//     const [search, setSearch] = useState("");
//     const [editingId, setEditingId] = useState(null);

//     const handleSubmit = () => {
//         if (editingId) {
//             dispatch({ type: "EDIT", id: editingId, name, amount });
//             setEditingId(null);
//         } else {
//             const newExpense = { id: Date.now(), name, amount };
//             dispatch({ type: "ADD", ...newExpense });
//             setHistory((prev) => [newExpense, ...prev]);
//         }
//         setName("");
//         setAmount("");
//     };

//     const handleEdit = (expense) => {
//         setName(expense.name);
//         setAmount(expense.amount);
//         setEditingId(expense.id);
//     };

//     const filteredExpenses = expenses.filter((expense) =>
//         expense.name.toLowerCase().includes(search.toLowerCase())
//     );

//     const chartData = history.reduce((acc, item) => {
//         const date = new Date(item.id).toLocaleDateString();
//         const existing = acc.find((data) => data.date === date);
//         if (existing) {
//             existing.amount += parseFloat(item.amount);
//         } else {
//             acc.push({ date, amount: parseFloat(item.amount) });
//         }
//         return acc;
//     }, []);

//     return (
//         <div className={styles.container}>
//             {/* Navbar */}
//             <nav className={styles.navbar}>
//                 <h1>Expense Manager</h1>
//                 <input
//                     className={styles.searchBar}
//                     type="text"
//                     placeholder="Search Expenses"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </nav>

//             {/* Chart Section */}
//             <div className={styles.chartContainer}>
//                 <h2>Expense Trends</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={chartData}>
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <Line type="monotone" dataKey="amount" stroke="#ff4500" />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>

//             {/* Expense List */}
//             <div>
//                 <input
//                     className={styles.inputField}
//                     placeholder="Expense Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                     className={styles.inputField}
//                     placeholder="Amount"
//                     type="number"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                 />
//                 <button className={styles.btn} onClick={handleSubmit}>
//                     {editingId ? "Update" : "Add"}
//                 </button>

//                 <ul className={styles.expenseList}>
//                     {filteredExpenses.map((expense) => (
//                         <li key={expense.id} className={styles.expenseItem}>
//                             <div>
//                                 <span>{expense.name}</span> - ${expense.amount}
//                             </div>
//                             <button onClick={() => handleEdit(expense)}><Pencil size={18} /></button>
//                             <button onClick={() => dispatch({ type: "DELETE", id: expense.id })}><Trash size={18} /></button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }
