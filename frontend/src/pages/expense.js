import ExpenseManager from "@/components/expense";
import Sidebar from "@/components/Sidebar";

const expense = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <ExpenseManager />
    </div>
  );
};

export default expense;
