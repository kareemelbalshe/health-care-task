import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../../Layout";
import LazyWrapper from "../functions/LazyWrapper";
import ProtectedRoute from "../../pages/dashboard/ProtectedRoute";

const NotFound = lazy(() => import("../../pages/not-found/NotFound"));
const Home = lazy(() => import("../../pages/home/Home"));
const Login = lazy(() => import("../../pages/login/Login"));
const Register = lazy(() => import("../../pages/register/Register"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: LazyWrapper(Home) },
      { path: "/login", element: LazyWrapper(Login) },
      { path: "/register", element: LazyWrapper(Register) },
      { path: "*", element: LazyWrapper(NotFound) },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      { path: "doctor", element: <div>Doctor Page</div> },
      { path: "finance", element: <div>Finance Page</div> },
      { path: "patient", element: <div>Patient Page</div> },
    ],
  },
]);
