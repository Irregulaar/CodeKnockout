import DashboardNavbar from "../components/DashboardNavbar";
import DashboardHeader from "../components/DashboardHeader";

import { IoIosTrendingUp } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";
import { CiMedal } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";

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
            <div className="bg-dark p-6 rounded-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Elo</h3>
                <IoIosTrendingUp size={20} className="text-gray-400 text-xs" />
                {/* <span className="text-xs text-green-400">+25</span> */}
              </div>
              <p className="text-2xl font-bold text-white">1200</p>
            </div>

            <div className="bg-dark p-6 rounded-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Win rate</h3>
                <IoStatsChart size={20} className="text-gray-400 text-xs" />
                {/* <span className="text-xs text-green-400">+25</span> */}
              </div>
              <p className="text-2xl font-bold text-white">50%</p>
            </div>

            <div className="bg-dark p-6 rounded-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total duel wins</h3>
                <FaTrophy size={20} className="text-gray-400 text-xs" />
                {/* <span className="text-xs text-green-400">+25</span> */}
              </div>
              <p className="text-2xl font-bold text-white">872</p>
            </div>

            <div className="bg-dark p-6 rounded-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total streak</h3>
                <FaTrophy size={20} className="text-gray-400 text-xs" />
                {/* <span className="text-xs text-green-400">+25</span> */}
              </div>
              <p className="text-2xl font-bold text-white">872</p>
            </div>
          </div>
          {/* Recent Activity with improved design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-wider">Recent Duels</h3>
                <button
                  className="text-xs text-gray-400 hover:text-white transition-all border-1 px-1 py-0.5 rounded-md border-white/20
                    cursor-pointer"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#ffffff08] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-light rounded-full"></div>
                    <div className="flex flex-col">
                      <span className="text-white text-sm">Player123</span>
                      <span className="text-gray-400 text-xs">Hoy</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-xs font-medium px-2 py-1 bg-green-400/10 rounded-full">Won</span>
                    <span className="text-[12px] font-semibold">+50</span>
                  </div>
                </div>
                {/* Similar styling for other matches */}
              </div>
            </div>

            <div className="bg-dark p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-sm font-bold uppercase tracking-wider">Upcoming Events</h3>
              </div>
              <div className="space-y-4">
                <div
                  className="p-3 bg-[#ffffff08] rounded-lg flex flex-col gap-1 hover:bg-[#ffffff16] hover:-translate-y-1
                    transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CiMedal size={20} className="text-green-300 text-xs" />
                      <span className="text-white text-sm">Daily Challenge</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CiClock1 size={20} className="text-[#7566a3] text-xs" />
                      <span className="text-[#7566a3] font-semibold text-xs">2h</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. aaaaa
                  </span>
                  <span className="text-green-400 text-xs">Reward: +50 elo</span>
                  <div className="w-full bg-[#ffffff15] rounded-full h-1.5">
                    <div className="bg-[#7566a3] h-1.5 rounded-full w-[70%]"></div>
                  </div>
                </div>

                <div
                  className="p-3 bg-[#ffffff08] rounded-lg flex flex-col gap-1 hover:bg-[#ffffff16] hover:-translate-y-1
                    transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CiMedal size={20} className="text-green-300 text-xs" />
                      <span className="text-white text-sm">Weekly Challenge</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CiClock1 size={20} className="text-[#7566a3] text-xs" />
                      <span className="text-[#7566a3] font-semibold text-xs">2d 4h</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. aaaaa
                  </span>
                  <span className="text-green-400 text-xs">Reward: +50 elo</span>
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
