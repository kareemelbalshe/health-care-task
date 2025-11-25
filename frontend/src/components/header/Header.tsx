import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../lib/redux/store";
import Button from "../button/Button";
import { logout } from "../../lib/redux/slices/authSlice";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header className="w-full fixed h-20 top-0 left-0 z-10 p-5 flex items-center justify-between bg-blue-500 border-b-4 border-b-blue-800 text-white">
      <Link to={`/`}>
        <h1 className="text-3xl font-bold">Kareem Health Care</h1>
      </Link>
      {isAuthenticated ? (
        <ul className="flex items-center gap-4 justify-center">
          <li className="font-bold text-lg">{user.user.username}</li>
          {user.user.role === "doctor" && (
            <li>
              <Link
                className="bg-blue-700 px-4 py-2.5 rounded-xl"
                to={`/dashboard/doctor`}
              >
                Doctor Dashboard
              </Link>
            </li>
          )}
          {user.user.role === "finance" && (
            <li>
              <Link
                className="bg-blue-700 px-4 py-2.5 rounded-xl"
                to={`/dashboard/finance`}
              >
                Finance Dashboard
              </Link>
            </li>
          )}
          {user.user.role === "patient" && (
            <li>
              <Link
                className="bg-blue-700 px-4 py-2.5 rounded-xl"
                to={`/dashboard/patient`}
              >
                Patient Dashboard
              </Link>
            </li>
          )}
          <li>
            <Button text="Logout" onClick={logoutHandler} />
          </li>
        </ul>
      ) : (
        <ul className="flex items-center gap-4">
          <li>
            <Link className="bg-blue-700 px-4 py-2.5 rounded-xl" to={`/login`}>
              Login
            </Link>
          </li>
          <li>
            <Link
              className="bg-blue-700 px-4 py-2.5 rounded-xl"
              to={`/register`}
            >
              Register
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
