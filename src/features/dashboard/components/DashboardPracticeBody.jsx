import { useState } from "react";
import { FaPython } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandCSharp } from "react-icons/tb";
import { DiJava } from "react-icons/di";

function DashboardPracticeBody() {
  return (
    <div className="w-full text-white flex-row justify-center flex gap-10">
      <div className="w-[30%] flex flex-col gap-2 bg-dark p-2 rounded h-fit">
        <p className="font-semibold text-[20px] mb-5">Filters</p>
        <div>
          <p className="text-[12px]">Sort by</p>
          <select className="w-full h-fit bg-moredark outline-none p-1 text-[10px] rounded">
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
            <option value="others">Other's challenges</option>
          </select>
        </div>
        <div>
          <p className="text-[12px]">Difficulty</p>
          <select className="w-full h-fit bg-moredark outline-none p-1 text-[10px] rounded">
            <option value="">All difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-2">
        {Array(5)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="bg-dark w-[80%] h-fit p-2 gap-2 flex-row flex rounded hover:brightness-125 transition-all duration-300
                cursor-pointer"
            >
              <div className="flex flex-col gap-2 items-start">
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-[12px] bg-green-300 rounded p-1 text-green-800 font-bold">Easy</p>
                  <p className="text-[14px]">A challengue with problem</p>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <p className="font-light bg-moredark text-[10px] p-1 rounded">Algorithm</p>
                  <p className="font-light bg-moredark text-[10px] p-1 rounded">Mathematics</p>
                </div>

                <div
                  className="flex flex-row gap-1 items-center opacity-70 hover:opacity-100 transition-all duration-300
                    hover:text-blue-300 hover:scale-110 cursor-pointer"
                >
                  <MdFavoriteBorder size={12} className="" />
                  <p className="text-[10px] text-center font-light">872</p>
                </div>
              </div>

              <div className="ml-auto flex flex-row gap-2">
                <FaPython size={35} className="text-blue-300 bg-moredark p-1 rounded" />
                <IoLogoJavascript size={35} className="text-blue-300 bg-moredark p-1 rounded" />
                <TbBrandCSharp size={35} className="text-blue-300 bg-moredark p-1 rounded" />
                <DiJava size={35} className="text-blue-300 bg-moredark p-1 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DashboardPracticeBody;
