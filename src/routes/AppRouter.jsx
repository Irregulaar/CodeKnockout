import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/landing";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
