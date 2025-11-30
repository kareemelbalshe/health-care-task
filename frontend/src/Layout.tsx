import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import img from "./assets/Untitled_3x.png";
export default function Layout() {
  return (
    <>
      {" "}
      <div className="flex items-start justify-start">
        <Header />
        <div className="fixed bottom-15 right-5  w-48 h-48 md:w-72 md:h-72 pointer-events-none select-none z-[-1]">
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
