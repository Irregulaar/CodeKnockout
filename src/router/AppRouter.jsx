import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import your page components
import LandingHome from "../features/landing/pages/landingHome";
import LoginPage from "../features/login/pages/loginPage";
import RegisterPage from "../features/register/pages/registerPage";
import DashboardHome from "../features/dashboard/pages/DashboardHome";
import DashboardDuel from "../features/dashboard/pages/DashboardDuel";
import DashboardPractice from "../features/dashboard/pages/DashboardPractice";
import DuelCombat from "../features/duels/pages/duelCombat";
import Settings from "../features/settings/pages/settingsHome";
// Import other pages as needed

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingHome />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/duel" element={<DashboardDuel />} />
        <Route path="/practice" element={<DashboardPractice />} />
        <Route path="/combat" element={<DuelCombat />} />
        <Route path="/settings" element={<Settings />} />

        {/* Add more routes as needed */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}

        {/* Redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
