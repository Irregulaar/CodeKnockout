import { FaCode } from "react-icons/fa6";
import { FaFreeCodeCamp } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";

function DashboardNavbar() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className={`group bg-dark fixed md:absolute z-10 flex h-screen w-15 flex-col items-center text-white transition-all
        hover:w-55 ${openModal && "w-[50%]"}`}
    >
      <div
        onClick={() => setOpenModal(!openModal)}
        className={`hover:bg-light flex w-full flex-row items-center p-2 group-hover:grid-cols-[auto_auto] md:hidden
          ${openModal && "grid-cols-[auto_auto]"}`}
      >
        <AiOutlineMenuUnfold
          size={40}
          className={`${openModal && "row-span-2"} rounded-full p-2 transition-all group-hover:row-span-2 `}
        />
        <p
          className={` col-start-2 text-[12px] font-bold group-hover:ml-2 group-hover:block ${openModal ? "block ml-2" : "hidden"}
            `}
        >
          Close
        </p>
      </div>
      <div className="block h-px w-[100%] bg-white opacity-10 md:hidden"></div>

      <a
        href="/dashboard"
        className={`${openModal && "grid-cols-[auto_auto] place-items-start"} hover:bg-light grid w-full grid-cols-1
          place-content-start place-items-center items-center p-2 group-hover:grid-cols-[auto_auto] group-hover:place-items-start
          cursor-pointer`}
      >
        <FaHome size={40} className={`${openModal && "row-span-2"} rounded-full p-2 transition-all group-hover:row-span-2`} />
        <p
          className={`${openModal ? "block ml-2" : "hidden"} col-start-2 text-[12px] font-bold group-hover:ml-2 group-hover:block`}
        >
          Home
        </p>
        <p className={`${openModal ? "block ml-2" : "hidden"} col-start-2 text-[8px] group-hover:ml-2 group-hover:block`}>
          Access your dashboard for stats and upcoming events
        </p>
      </a>
      <div className="h-px w-[100%] bg-white opacity-10"></div>
      <a
        href="/practice"
        className={`${openModal && "grid-cols-[auto_auto] place-items-start"} hover:bg-light grid w-full grid-cols-1
          place-content-start place-items-center items-center p-2 group-hover:grid-cols-[auto_auto] group-hover:place-items-start
          cursor-pointer`}
      >
        <FaCode size={40} className={`${openModal && "row-span-2"} rounded-full p-2 transition-all group-hover:row-span-2`} />
        <p
          className={`${openModal ? "block ml-2" : "hidden"} col-start-2 text-[12px] font-bold group-hover:ml-2 group-hover:block`}
        >
          Practice
        </p>
        <p className={`${openModal ? "block ml-2" : "hidden"} col-start-2 text-[8px] group-hover:ml-2 group-hover:block`}>
          Engage in coding challenges to enhance skills
        </p>
      </a>

      <a
        href="/duel"
        className={`${openModal && "grid-cols-[auto_auto] place-items-start"} hover:bg-light grid w-full grid-cols-1
          place-content-start place-items-center items-center p-2 group-hover:grid-cols-[auto_auto] group-hover:place-items-start
          cursor-pointer`}
      >
        <FaFreeCodeCamp
          size={40}
          className={`${openModal && "row-span-2"} rounded-full p-2 transition-all group-hover:row-span-2`}
        />
        <p
          className={`${openModal ? "block ml-2" : "hidden"} col-start-2 text-[12px] font-bold group-hover:ml-2 group-hover:block`}
        >
          Duels
        </p>
        <p className={`${openModal ? "block ml-2" : "hidden"} col-start-2 text-[8px] group-hover:ml-2 group-hover:block`}>
          Compete in real-time coding duels with peers
        </p>
      </a>

      <a
        className={`${openModal && "grid-cols-[auto_auto] place-items-start"} hover:bg-light grid w-full grid-cols-1
          place-content-start place-items-center items-center p-2 group-hover:grid-cols-[auto_auto] group-hover:place-items-start
          cursor-pointer`}
      >
        <MdLeaderboard
          size={40}
          className={`${openModal && "row-span-2"} rounded-full p-2 transition-all group-hover:row-span-2`}
        />
        <p
          className={`${openModal ? "block ml-2" : "hidden"} col-start-2 text-[12px] font-bold group-hover:ml-2 group-hover:block`}
        >
          Leaderboard
        </p>
        <p className={`${openModal ? "block ml-2" : "hidden"} col-start-2 text-[8px] group-hover:ml-2 group-hover:block`}>
          View top players and their achievements
        </p>
      </a>
    </div>
  );
}

export default DashboardNavbar;
