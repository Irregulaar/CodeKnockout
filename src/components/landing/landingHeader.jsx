import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import React, { useState } from "react";

function LandingHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <section
      className={`text-regular bg-regular fixed z-10 flex h-13 w-full flex-row items-center justify-around text-[12px] ${showMenu ? "bg-dark" : ""}`}
    >
      <div>
        <a href="/" className="cursor-pointer text-[20px] font-semibold">
          Code Knockout
        </a>
      </div>

      <div className="flex gap-5 text-[12px]">
        <a className="hover:bg-dark hidden cursor-pointer hover:underline md:block">Home</a>
        <a className="hidden cursor-pointer hover:underline md:block">About</a>
      </div>

      <div className="flex gap-5">
        <a href="/login" className="hidden cursor-pointer items-center justify-center text-center hover:underline md:flex">
          Log in
        </a>
        <a
          href="/register"
          className="bg-light hidden h-7 w-20 cursor-pointer items-center justify-center rounded-full text-center hover:underline md:flex"
        >
          Sign up
        </a>
        {showMenu ? (
          <IoMdClose size={35} onClick={handleMenuClick} className="text-regular cursor-pointer md:hidden" />
        ) : (
          <HiMenuAlt3 size={35} onClick={handleMenuClick} className="text-regular cursor-pointer md:hidden" />
        )}
      </div>

      {showMenu && (
        <div className="bg-regular bg-dark absolute top-13 right-0 flex h-fit w-full flex-col items-start justify-center gap-5 p-5">
          <a className="cursor-pointer hover:underline">Home</a>
          <a className="cursor-pointer hover:underline">About</a>
          <a href="/login" className="cursor-pointer font-bold hover:underline">
            Log in
          </a>
          <a
            href="/register"
            className="bg-light flex h-7 w-full cursor-pointer items-center justify-center rounded-full text-center hover:underline"
          >
            Sign up
          </a>
        </div>
      )}
    </section>
  );
}

export default LandingHeader;
