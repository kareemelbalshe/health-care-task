import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../../Layout";
import LazyWrapper from "../functions/LazyWrapper";
import RoleRoute from "../../pages/dashboard/RoleRoute";
import Dashboard from "../../pages/dashboard/Dashboard";

const NotFound = lazy(() => import("../../pages/not-found/NotFound"));
const Home = lazy(() => import("../../pages/home/Home"));
const Login = lazy(() => import("../../pages/login/Login"));
const Register = lazy(() => import("../../pages/register/Register"));
const Profile = lazy(() => import("../../pages/profile/Profile"));
const VisitsToPatient = lazy(
  () => import("../../pages/visitsToPatient/VisitsToPatient")
);
const Visits = lazy(() => import("../../pages/visits/Visits"));
const AddMedicine = lazy(
  () => import("../../pages/visits/addMedicine/AddMedicine")
);
const EditVisit = lazy(() => import("../../pages/visits/editVisit/EditVisit"));
const ViewVisit = lazy(() => import("../../pages/visits/viewVisit/ViewVisit"));
const CreateFinance = lazy(
  () => import("../../pages/createFinance/CreateFinance")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: LazyWrapper(Home) },
      { path: "/login", element: LazyWrapper(Login) },
      { path: "/register", element: LazyWrapper(Register) },
      { path: "/profile/:id", element: LazyWrapper(Profile) },
      { path: "*", element: LazyWrapper(NotFound) },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "doctor",
        element: <RoleRoute allowedRoles={["doctor"]} />,
        children: [
          { path: "Profile", element: LazyWrapper(Profile) },
          {
            path: "visits",
            element: LazyWrapper(Visits),
          },

          { path: "edit-visit/:id", element: LazyWrapper(EditVisit) },
          { path: "view-visit/:id", element: LazyWrapper(ViewVisit) },
          { path: "add-medicine/:id", element: LazyWrapper(AddMedicine) },
          {
            path: "finance",
            element: LazyWrapper(CreateFinance),
          },
        ],
      },

      {
        path: "finance",
        element: <RoleRoute allowedRoles={["finance"]} />,
        children: [
          {
            path: "visits",
            element: LazyWrapper(Visits),
          },
          { path: "edit-visit/:id", element: LazyWrapper(EditVisit) },
          { path: "view-visit/:id", element: LazyWrapper(ViewVisit) },
        ],
      },

      {
        path: "patient",
        element: <RoleRoute allowedRoles={["patient"]} />,
        children: [
          { path: "visits", element: LazyWrapper(VisitsToPatient) },
          { path: "view-visit/:id", element: LazyWrapper(ViewVisit) },
        ],
      },
    ],
  },
]);
