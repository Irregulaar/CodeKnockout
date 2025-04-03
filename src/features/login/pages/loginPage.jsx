import LandingHeader from "../../../components/landing/landingHeader";
import LandingFooter from "../../../components/landing/landingFooter";
import LoginBody from "../components/loginBody";

function loginPage() {
  return (
    <div className="bg-regular relative flex h-screen w-full flex-col items-center justify-between">
      <LandingHeader />
      <LoginBody />
      <LandingFooter />
    </div>
  );
}

export default loginPage;
