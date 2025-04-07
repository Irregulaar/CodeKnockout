import { useState } from "react";

import { FaArrowLeft } from "react-icons/fa";

function SettingsAccount({ onBack }) {
  const [makeChanges, setMakeChanges] = useState(true);

  return (
    <div className="relative w-[90%]">
      <div className={"flex flex-col gap-2"}>
        <FaArrowLeft size={20} className="mb-5 md:hidden cursor-pointer" onClick={onBack} />
        <h1 className="font-semibold text-2xl">Account Settings</h1>
        <p className="mb-10">Manage your account information and preferences.</p>

        <div className="flex flex-col items-start mb-5">
          <p className="text-[12px]">Profile Image</p>
          <div className="flex flex-row gap-3 justify-center items-center">
            <img src="/test.jpg" alt="Profile" className="w-15 h-15 rounded-full" />
            <button
              className="rounded w-fit h-fit pl-2 pr-2 pt-1 pb-1 bg-light cursor-pointer hover:brightness-140 transition-all
                duration-300"
            >
              Update Image
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full md:w-[100%] gap-2">
          <div className="w-full">
            <p className="text-[12px]">Username</p>
            <input type="text" className="rounded w-full h-fit pl-2 pr-2 pt-1 pb-1 bg-light outline-none" placeholder="" />
          </div>
          <div className="w-full">
            <p className="text-[12px]">Email Address</p>
            <input type="text" className="rounded w-full h-fit pl-2 pr-2 pt-1 pb-1 bg-light outline-none" placeholder="" />
          </div>
        </div>

        <button
          className={`w-fit h-fit pr-2 pl-2 pt-1 pb-1 bg-light rounded mt-10
            ${makeChanges ? "opacity-100 cursor-pointer hover:brightness-125 transition-all duration-300" : "opacity-50 cursor-auto"}`}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
}

export default SettingsAccount;
