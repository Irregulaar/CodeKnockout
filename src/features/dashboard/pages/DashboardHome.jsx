import DashboardNavbar from "../components/DashboardNavbar";
import DashboardHeader from "../components/DashboardHeader";

function DashboardHome() {
  return (
    <div className="relative flex h-screen w-full flex-row">
      <DashboardNavbar />
      <DashboardHeader />
    </div>
  );
}

export default DashboardHome;
