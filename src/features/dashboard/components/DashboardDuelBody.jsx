import { RiSwordLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { CiTrophy } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";

function DashboardDuelBody() {
  return (
    <div className="flex flex-col gap-2 w-[90%] h-fit text-white mb-10">
      <span className="text-[30px] font-semibold">Duels</span>

      <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 w-full h-fit">
        <div className="flex flex-col gap-2 w-fit h-fit md:w-full md:h-full bg-dark p-3 rounded text-gray-300">
          <div className="flex flex-row gap-2 w-full h-fit items-center">
            <RiSwordLine className="text-purple-400 text-[30px]" />
            <span className="text-[20px] font-semibold text-white">Random duel</span>
          </div>
          <span className="text-gray-300/50 text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </span>
          <div className="flex flex-col gap-1 w-full h-fit">
            <span className="text-gray-300 text-[14px]">Difficulty</span>
            <div className="flex bg-moredark rounded text-white w-full h-fit items-center p-1">
              <select className="bg-moredark text-white rounded w-full outline-none">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full h-fit">
            <span className="text-gray-300 text-[14px]">Language</span>
            <div className="flex bg-moredark rounded text-white w-full h-fit items-center p-1">
              <select className="w-full bg-moredark outline-none">
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
              </select>
            </div>
          </div>
          <button
            className="bg-light text-white rounded p-1 flex justify-center items-center w-full h-fit px-2 self-center my-2 gap-2"
          >
            <CiSearch className="text-[20px]" />
            <span>Search duel</span>
          </button>
          <span className="text-gray-300/50 self-center text-[12px]">estimate time: 10 minutes</span>
        </div>

        <div className="flex flex-col gap-2 w-fit h-fit md:w-full md:h-full bg-dark p-3 rounded text-gray-300">
          <div className="flex flex-row gap-2 w-full h-fit items-center">
            <CiTrophy className="text-purple-400 text-[30px]" />
            <span className="text-[20px] font-semibold text-white">Qualifying duel</span>
          </div>
          <span className="text-gray-300/50 text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </span>

          <div className="flex flex-col gap-2 w-full h-fit">
            <span className="text-gray-300 text-[14px]">Language</span>
            <div className="flex bg-moredark rounded text-white w-full h-fit items-center p-1">
              <select className="w-full bg-moredark outline-none">
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full h-fit bg-moredark rounded p-2">
            <div className="flex flex-row gap-2 w-full h-fit items-center justify-between">
              <span className="text-gray-300 text-[14px]">Your current ELO:</span>
              <span className="text-white text-[14px]">1200</span>
            </div>
          </div>
          <button
            className="bg-light text-white rounded p-1 flex justify-center items-center w-full h-fit px-2 self-center my-2 gap-2"
          >
            <CiSearch className="text-[20px]" />
            <span>Search qualifying duel</span>
          </button>
          <span className="text-gray-300/50 self-center text-[12px]">Will look for opponents with an elo similar to yours</span>
        </div>

        <div className="flex flex-col gap-2 w-fit h-fit md:w-full md:h-full bg-dark p-3 rounded text-gray-300">
          <div className="flex flex-row gap-2 w-full h-fit items-center">
            <CiClock1 className="text-purple-400 text-[30px]" />
            <span className="text-[20px] font-semibold text-white">Current event</span>
          </div>
          <span className="text-gray-300/50 text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </span>

          <div className="flex flex-col gap-3 w-full h-fit bg-moredark rounded-md p-2">
            <div className="flex flex-row gap-2 w-full h-fit items-center">
              <span className="text-gray-800 text-[14px] bg-green-300 px-1 rounded font-semibold">In progress</span>
              <span className="text-gray-300 text-[12px]">ends in 10 minutes</span>
            </div>
            <span className="text-gray-400 text-[12px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </span>
            <div className="flex flex-row gap-2 w-full h-fit items-center justify-between">
              <span className="text-gray-300 text-[12px]">Participants:</span>
              <span className="text-gray-300 text-[12px]">10</span>
            </div>
            <div className="flex flex-row gap-2 w-full h-fit items-center justify-between">
              <span className="text-gray-300 text-[12px]">Reward:</span>
              <span className="text-green-300 text-[12px]">1000</span>
            </div>
          </div>
          <button
            className="bg-light text-white rounded p-1 flex justify-center items-center w-full h-fit px-2 self-center my-2 gap-2"
          >
            <span>Participe now</span>
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-2 w-full h-fit justify-between items-center mt-5">
        <span className="text-[30px] font-semibold">Rooms</span>
        <button className="bg-light text-white px-4 py-1 h-fit rounded-md">
          <span>Create room</span>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 w-full h-fit items-center">
          <input type="text" className="bg-dark text-white rounded w-full outline-none p-2" placeholder="Search room" />
        </div>
        <div className="flex flex-row flex-wrap gap-2 w-full h-fit">
          <div className="bg-dark w-full md:w-60 h-fit rounded p-2 flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center justify-between">
              <span>Room name</span>
              <div className="flex flex-row gap-2 items-center">
                <FaUserGroup className="text-gray-300 text-[15px]" />
                <span className="text-gray-300 text-[12px]">1/2</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <span className="text-gray-300 text-[12px] bg-light rounded p-1">JavaScript</span>
              <span className="text-yellow-800 text-[12px] bg-yellow-300 rounded p-1 font-semibold">Medium</span>
            </div>

            <div className="flex flex-row gap-2 items-center justify-between">
              <span className="text-gray-400 text-[12px]">
                Created by <span className="text-white">keven</span>
              </span>
              <button className="bg-moredark text-[14px] font-semibold text-white p-2 h-fit rounded-md">
                <span>Join</span>
              </button>
            </div>
          </div>
          <div className="bg-dark w-full md:w-60 h-fit rounded p-2 flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center justify-between">
              <span>Room name</span>
              <div className="flex flex-row gap-2 items-center">
                <FaUserGroup className="text-gray-300 text-[15px]" />
                <span className="text-gray-300 text-[12px]">1/2</span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <span className="text-gray-300 text-[12px] bg-light rounded p-1">JavaScript</span>
              <span className="text-yellow-800 text-[12px] bg-yellow-300 rounded p-1 font-semibold">Medium</span>
            </div>

            <div className="flex flex-row gap-2 items-center justify-between">
              <span className="text-gray-400 text-[12px]">
                Created by <span className="text-white">keven</span>
              </span>
              <button className="bg-moredark text-[14px] font-semibold text-white p-2 h-fit rounded-md">
                <span>Join</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardDuelBody;
