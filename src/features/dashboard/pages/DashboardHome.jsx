import DashboardNavbar from "../components/DashboardNavbar";
import DashboardHeader from "../components/DashboardHeader";

function DashboardHome() {
  return (
    <div className="relative flex h-screen w-full flex-row">
      <DashboardNavbar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="p-4 flex flex-col gap-6 ml-15 md:ml-35 md:mr-25">
          {" "}
          {/* Increased gap */}
          {/* Welcome Section */}
          <div className="bg-dark rounded-lg p-6 border-l-4 border-light">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Player!</h2>
            <p className="text-gray-400 text-sm">Ready for today's coding challenges?</p>
          </div>
          {/* Stats Section with improved styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-dark p-6 rounded-lg hover:bg-light transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Elo</h3>
                {/* <span className="text-xs text-green-400">+25</span> */}
              </div>
              <p className="text-3xl font-bold text-white">1200</p>
            </div>

            <div className="bg-dark p-6 rounded-lg hover:bg-light transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Win rate</h3>
                {/* <span className="text-xs text-green-400">+25</span> */}
              </div>
              <p className="text-3xl font-bold text-white">50%</p>
            </div>

            <div className="bg-dark p-6 rounded-lg hover:bg-light transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total duel wins</h3>
                {/* <span className="text-xs text-green-400">+25</span> */}
              </div>
              <p className="text-3xl font-bold text-white">872</p>
            </div>
          </div>
          {/* Recent Activity with improved design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-wider">Recent Duels</h3>
                <button className="text-xs text-gray-400 hover:text-white transition-all">View All</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#ffffff08] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-light rounded-full"></div>
                    <span className="text-white text-sm">Player123</span>
                  </div>
                  <span className="text-green-400 text-xs font-medium px-2 py-1 bg-green-400/10 rounded-full">Won</span>
                </div>
                {/* Similar styling for other matches */}
              </div>
            </div>

            <div className="bg-dark p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-wider">Upcoming Events</h3>
                <button className="text-xs text-gray-400 hover:text-white transition-all">View All</button>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-[#ffffff08] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Daily Challenge</span>
                    <span className="text-[#7566a3] font-semibold text-xs">2h remaining</span>
                  </div>
                  <div className="w-full bg-[#ffffff15] rounded-full h-1.5">
                    <div className="bg-[#7566a3] h-1.5 rounded-full w-[70%]"></div>
                  </div>
                </div>

                <div className="p-3 bg-[#ffffff08] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm">Weekly Challenge</span>
                    <span className="text-[#7566a3] font-semibold text-xs">2h remaining</span>
                  </div>
                  <div className="w-full bg-[#ffffff15] rounded-full h-1.5">
                    <div className="bg-[#7566a3] h-1.5 rounded-full w-[70%]"></div>
                  </div>
                </div>
                {/* Similar styling for other events */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
