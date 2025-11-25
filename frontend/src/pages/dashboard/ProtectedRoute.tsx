import { useSelector } from "react-redux";
import DashboardSlider from "../../components/dashboardSlide/DashboardSlider";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../lib/redux/store";
import Header from "../../components/header/Header";
import { IoCalendarSharp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { MdMonetizationOn } from "react-icons/md";

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const sliderDoctorLinks = [
    {
      path: "/profile",
      label: "Profile",
      icon: <FaInfoCircle />,
    },
    {
      path: "/patient-visits",
      label: "Visits",
      icon: <IoCalendarSharp />,
    },
    {
      path: "/finance",
      label: "Finance",
      icon: <FaMoneyCheckDollar />,
    },
  ];

  const sliderFinanceLinks = [
    {
      path: "/patient-visits",
      label: "Visits",
      icon: <IoCalendarSharp />,
    },
    {
      path: "/finance",
      label: "Finance",
      icon: <MdMonetizationOn />,
    },
  ];
  const sliderPatientLinks = [
    {
      path: "/my-visits",
      label: "visits",
      icon: <IoCalendarSharp />,
    },
  ];
  const role = user.user.role;

  const selectedLinks =
    role === "doctor"
      ? sliderDoctorLinks
      : role === "finance"
      ? sliderFinanceLinks
      : sliderPatientLinks;

  return isAuthenticated ? (
    <div className="flex items-start justify-start">
      <Header />
      <DashboardSlider links={selectedLinks} />
      <div className="w-full mt-20 h-[calc(100vh-80px)] overflow-y-scroll  hide-scrollbar">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}
