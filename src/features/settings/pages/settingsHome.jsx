import { useState } from "react";
import DashboardNavbar from "../../dashboard/components/DashboardNavbar";

import SettingsAccount from "../components/settingsAccount";

function settingsHome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [menu, setMenu] = useState("Account");

  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    // Only hide navbar on mobile
    if (window.innerWidth < 768) {
      setShowNavbar(false);
    }
  };

  return (
    <div className="flex flex-row h-screen w-full text-regular">
      <DashboardNavbar />

      <div className="flex flex-row w-full mt-10">
        <div className="flex flex-row gap-20 ml-25">
          <div className={`flex flex-col gap-2 text-nowrap ${!showNavbar && "hidden md:flex"}`}>
            <p className="text-2xl font-semibold mb-5 md:hidden">Settings</p>
            <div
              onClick={() => handleMenuClick("Account")}
              className="w-fit cursor-pointer hover:bg-light transition-all duration-300 p-2 rounded"
            >
              <p>Account</p>
              <div className={`${menu === "Account" ? "hidden md:block" : "hidden"} w-full h-px bg-white`}></div>
            </div>
            <div className="w-fit cursor-pointer hover:bg-light transition-all duration-300 p-2 rounded">
              <p>Change password</p>
              <div className="hidden w-full h-px bg-white"></div>
            </div>
          </div>

          <div className={`w-full ${showNavbar ? "hidden md:block" : "block"}`}>
            {menu === "Account" ? <SettingsAccount onBack={() => setShowNavbar(true)} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default settingsHome;
