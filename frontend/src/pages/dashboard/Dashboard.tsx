import { useSelector } from "react-redux";
import DashboardSlider from "../../components/dashboardSlide/DashboardSlider";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../lib/redux/store";
import Header from "../../components/header/Header";
import { IoCalendarSharp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

export default function Dashboard() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  const sliderDoctorLinks = [
    {
      path: "/dashboard/doctor/profile",
      label: "profile",
      icon: <FaInfoCircle />,
    },
    {
      path: "/dashboard/doctor/visits",
      label: "Visits",
      icon: <IoCalendarSharp />,
    },
    {
      path: "/dashboard/doctor/finance",
      label: "Finance",
      icon: <FaMoneyCheckDollar />,
    },
  ];

  const sliderFinanceLinks = [
    {
      path: "/dashboard/finance/visits",
      label: "Visits",
      icon: <IoCalendarSharp />,
    },
  ];
  const sliderPatientLinks = [
    {
      path: "/dashboard/patient/visits",
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

  return (
    <div className="flex items-start justify-start">
      <Header />
      <DashboardSlider links={selectedLinks} />
      <div className="w-full mt-20 h-[calc(100vh-80px)] overflow-y-scroll hide-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
