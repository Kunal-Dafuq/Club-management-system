import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;