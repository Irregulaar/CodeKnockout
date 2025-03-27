import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Layout from "../components/landing/Layout";
import "../styles/global.css";

function Landing() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <Layout />
      <Footer />
    </div>
  );
}

export default Landing;
