import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function LandingFooter() {
  return (
    <section className="bg-dark text-regular relative order-2 grid h-fit w-full grid-cols-1 place-content-around place-items-start gap-2 p-5 text-[14px] md:grid-cols-2 md:place-items-center">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-5">
        <p className="">© 2025 Code Knockout</p>
        <a className="text-dark cursor-pointer text-[11px] hover:underline">Terms of service</a>
      </div>

      <div className="order-[-1] flex flex-row gap-5 md:order-1">
        <FaGithub size={25} className="text-dark cursor-pointer transition-all duration-300 hover:text-white" />
        <FaDiscord size={25} className="text-dark cursor-pointer transition-all duration-300 hover:text-white" />
        <FaTwitter size={25} className="text-dark cursor-pointer transition-all duration-300 hover:text-white" />
      </div>
    </section>
  );
}

export default LandingFooter;
