import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../lib/redux/store";

export default function RoleRoute({ allowedRoles }: { allowedRoles: string[] }) {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const role = user.user.role;

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}
