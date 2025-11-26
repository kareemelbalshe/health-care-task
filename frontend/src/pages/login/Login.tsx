import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { handleLogin } from "../../lib/redux/slices/authSlice";
import { useCallback, useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = useCallback(() => {
    const newErrors: any = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, user, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "doctor") navigate(`/dashboard/doctor/Profile`);
      else if (user.role === "finance") navigate("/dashboard/finance/visits");
      else navigate("/dashboard/patient/visits");
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validate()) return;

      try {
        const result = await dispatch(
          handleLogin({
            email,
            password,
          })
        ).unwrap();

        if (result?.user?.role === "doctor")
          navigate(`/dashboard/doctor/Profile`);
        else if (result?.user?.role === "finance")
          navigate("/dashboard/finance/visits");
        else navigate("/dashboard/patient/visits");
      } catch (error: any) {
        toast.error(error?.message || "Login failed");
      }
    },
    [email, password, dispatch, navigate, validate]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-5 p-6 bg-white shadow rounded-xl"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <div className="space-y-4">
        <Input
          id="email"
          label="Email"
          placeholder="Enter Email"
          value={email}
          setValue={setEmail}
          required
          type="email"
          error={errors.email}
        />

        <Input
          id="password"
          label="Password"
          placeholder="Enter Password"
          value={password}
          setValue={setPassword}
          required
          type="password"
          error={errors.password}
        />

        <Button type="submit" text="Login" />
      </div>
    </form>
  );
}
