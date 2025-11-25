import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import img from "./assets/—Pngtree—blue stethoscope medical instrument isolated_21272341.png";
export default function Layout() {
  return (
    <>
      {" "}
      <div className="flex items-start justify-start">
        <Header />
        <div className="fixed top-1/2 right-0 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 pointer-events-none select-none z-[-1]">
          <img
            src={img}
            alt="img"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        <div className="w-full mt-20 h-[calc(100vh-80px)] overflow-y-scroll  hide-scrollbar">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
