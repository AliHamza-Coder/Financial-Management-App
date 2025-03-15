import { useState, useEffect, createContext, useContext } from "react";
// Correct import of the useAuth hook
import { useAuth } from "./authContext"; // Check the relative path here
import { getUser } from "../lib/directusAuth";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [budget, setBudget] = useState([]);
  const [expense, setExpense] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // Use the useAuth hook to access the token
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.log("No token found.");
        return;
      }

      try {
        const userData = await getUser(token);
        console.log("User Data:", userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch("http://localhost:8055/items/Money?fields=*,expense.*");
        const res2 = await fetch("http://localhost:8055/items/Money?fields=*,budget.*");

        const data1 = await res1.json();
        const data2 = await res2.json();

        const budgetData = data2.data[0]?.budget || [];
        const expenseData = data1.data[0]?.expense || [];

        setBudget(budgetData);
        setExpense(expenseData);

        const totalBudgetAmount = budgetData.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        const totalExpenseAmount = expenseData.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

        setTotalBudget(totalBudgetAmount);
        setTotalExpense(totalExpenseAmount);

        console.log("Budget Data:", budgetData);
        console.log("Expense Data:", expenseData);
        console.log("Total Budget Amount:", totalBudgetAmount);
        console.log("Total Expense Amount:", totalExpenseAmount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Fetch data once on initial render

  return (
    <DataContext.Provider value={{ budget, expense, totalBudget, totalExpense }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
