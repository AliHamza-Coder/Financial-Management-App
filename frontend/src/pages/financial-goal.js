import FinanceGoals from "@/components/financeGoals";
import Sidebar from "@/components/Sidebar";

const financeGoal = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <FinanceGoals />
    </div>
  );
};

export default financeGoal;
