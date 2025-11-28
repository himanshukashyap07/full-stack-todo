import DashboardHeader from "../components/DashboardHeader";
import TodoPage from "../components/Todo";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
        <TodoPage/>
    </div>
  );
}