import DashboardNavbar from "../components/DashboardNavbar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardDuelBody from "../components/DashboardDuelBody";

function DashboardDuel() {
  return (
    <div className="relative flex h-screen w-full flex-row">
      <DashboardNavbar />
      <div className="flex flex-col relative h-full w-full ml-20 md:ml-50">
        <DashboardHeader />
        <DashboardDuelBody />
      </div>
    </div>
  );
}

export default DashboardDuel;
