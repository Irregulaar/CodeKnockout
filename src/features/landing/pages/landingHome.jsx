import React from "react";
import { useEffect, useState } from "react";

import LandingHeader from "../../../components/landing/landingHeader";
import LandingFooter from "../../../components/landing/landingFooter";
import LandingBody from "../components/landingBody";

function LandingHome() {
  return (
    <div className="bg-regular relative flex h-screen w-full flex-col items-center justify-between">
      <LandingHeader />
      <LandingBody />
      <LandingFooter />
    </div>
  );
}

export default LandingHome;
