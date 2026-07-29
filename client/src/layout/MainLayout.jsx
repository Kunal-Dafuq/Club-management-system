import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

/**
 * Main application layout.
 * Renders full-screen immersive viewport on the landing route ("/")
 * and standard padding for secondary internal pages.
 */
const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <main className={`flex-1 ${isHome ? "pt-0" : "pt-24"}`}>
        <Outlet />
      </main>
      {!isHome && <Footer />}
    </div>
  );
};

export default MainLayout;