import LandingHeader from "../../../components/landing/landingHeader";
import LandingFooter from "../../../components/landing/landingFooter";
import RegisterBody from "../components/registerBody";

function loginPage() {
  return (
    <div className="bg-regular relative flex h-screen w-full flex-col items-center justify-between">
      <LandingHeader />
      <RegisterBody />
      <LandingFooter />
    </div>
  );
}

export default loginPage;
