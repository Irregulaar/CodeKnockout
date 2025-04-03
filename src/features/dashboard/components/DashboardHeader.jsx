import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";

function DashboardHeader() {
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal(!openModal);
  }

  return (
    <div className="relative flex h-10 w-full justify-end">
      <div className="mr-1 mt-1">
        <img onClick={handleOpenModal} className="h-full w-auto cursor-pointer rounded-lg" src="/test.jpg" />

        {openModal && (
          <div
            className="bg-dark absolute z-10 flex h-fit w-25 -translate-x-16 translate-y-1 flex-col items-start rounded p-1
              text-[12px] text-white"
          >
            <div className="hover:bg-light flex w-full flex-row items-center justify-start gap-2 p-2 transition-all duration-300">
              <IoMdSettings size={15} className="transition-all" />
              <a className="cursor-pointer transition-all duration-300">Settings</a>
            </div>
            <div className="h-px w-[100%] self-center bg-white opacity-30"></div>
            <div className="hover:bg-light flex w-full flex-row items-center justify-start gap-2 p-2 transition-all duration-300">
              <RiLogoutBoxLine size={15} className="transition-all" />
              <a className="cursor-pointer transition-all duration-300">Logout</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardHeader;
