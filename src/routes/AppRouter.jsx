import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/landing";
import Test from "../pages/test";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
