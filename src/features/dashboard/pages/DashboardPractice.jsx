import DashboardNavbar from "../components/DashboardNavbar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardPracticeBody from "../components/DashboardPracticeBody";

function DashboardPractice() {
  return (
    <div className="relative flex h-screen w-full flex-row">
      <DashboardNavbar />
      <div className="flex flex-col relative h-full w-full ml-50">
        <DashboardHeader />
        <DashboardPracticeBody />
      </div>
    </div>
  );
}

export default DashboardPractice;
