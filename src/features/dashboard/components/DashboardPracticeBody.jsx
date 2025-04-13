import { useState } from "react";
import { FaPython } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import { IoLogoJavascript } from "react-icons/io";
import { TbBrandCSharp } from "react-icons/tb";
import { DiJava } from "react-icons/di";

function DashboardPracticeBody() {
  return (
    <div className="w-[90%] text-white flex-col justify-start flex gap-2 mb-15">
      <span className="text-[25px] font-semibold">Code practice</span>
      <div className="w-full flex flex-col gap-2 bg-dark p-3 rounded h-fit">
        <p className="font-semibold text-[20px]">Filters</p>
        <div className="flex flex-row gap-2 w-full">
          <div className="w-full flex flex-col gap-1">
            <p className="text-[12px]">Search</p>
            <div className="w-full h-7 bg-moredark px-3 text-[10px] rounded flex justify-center items-center">
              <input type="text" className="w-full h-full outline-none bg-moredark" placeholder="Search" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[12px]">Sort by</p>
            <div className="w-full h-7 bg-moredark px-3 text-[10px] rounded flex justify-center items-center">
              <select className="w-full h-full outline-none bg-moredark">
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="others">Other's challenges</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[12px]">Difficulty</p>
            <div className="w-full h-7 bg-moredark px-3 text-[10px] rounded flex justify-center items-center">
              <select className="w-full h-full outline-none bg-moredark">
                <option value="">All difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full gap-2">
        {Array(5)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="bg-dark w-full h-fit p-2 gap-2 flex-row flex rounded hover:brightness-125 transition-all duration-300
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

                <p className="text-[12px] font-light text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>

                <div className="flex flex-row gap-2 items-center h-fit">
                  <div
                    className="flex flex-row gap-1 items-center opacity-70 hover:opacity-100 transition-all duration-300
                      hover:text-blue-300 hover:scale-110 cursor-pointer"
                  >
                    <AiTwotoneLike className="w-5 h-5 flex-shrink-0" />
                    <span className="text-[0.8rem] font-light leading-none mt-1">872</span>
                  </div>
                  <span className="text-[12px] font-light text-gray-400 leading-none mt-1">For keven</span>
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
