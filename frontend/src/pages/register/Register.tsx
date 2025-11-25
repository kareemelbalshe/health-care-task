import { useCallback, useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/redux/store";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../../lib/redux/slices/authSlice";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
  });

  const validate = useCallback(() => {
    const newErrors: any = {};

    if (!username.trim()) newErrors.username = "Username is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (role === "doctor" && !specialization.trim())
      newErrors.specialization = "Specialization is required for doctors";

    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10,15}$/.test(phone))
      newErrors.phone = "Phone must be numeric";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [username, email, password, role, specialization, phone]);

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
      if (user.role === "doctor") navigate("/doctor/dashboard");
      else if (user.role === "finance") navigate("/finance/dashboard");
      else navigate("/dashboard/patient");
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validate()) return;

      try {
        const result = await dispatch(
          handleRegister({
            email,
            password,
            username,
            role,
            specialization,
            phone,
          })
        ).unwrap();

        if (result?.user?.role === "doctor") navigate("/dashboard/doctor");
        else if (result?.user?.role === "finance")
          navigate("/dashboard/finance");
        else navigate("/dashboard/patient");
      } catch (error: any) {
        toast.error(error?.message || "Registration failed");
      }
    },
    [
      email,
      password,
      username,
      role,
      specialization,
      phone,
      dispatch,
      navigate,
      validate,
    ]
  );

  const doctorSpecializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Psychiatry",
    "General Surgery",
    "Radiology",
    "ENT",
    "Ophthalmology",
    "Dentistry",
    "Gynecology",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mt-5 mb-20 mx-auto p-6 bg-white shadow rounded-xl"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

      <div className="space-y-4">
        <Input
          id="username"
          label="Username"
          placeholder="Enter Username"
          value={username}
          setValue={setUsername}
          required
          error={errors.username}
        />

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

        <div className="w-full">
          <label
            htmlFor="role"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            Role <span className="text-red-500">*</span>
          </label>

          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="
              w-full h-11 p-3 border-4 border-[#5C5C5C]
              rounded-lg bg-inherit
              text-sm
              focus:outline-none focus:border-blue-500
              transition
            "
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {role === "doctor" && (
          <div className="w-full">
            <label
              htmlFor="specialization"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Specialization <span className="text-red-500">*</span>
            </label>

            <select
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="
        w-full h-11 p-3 border-4 border-[#5C5C5C]
        rounded-lg bg-inherit
        text-sm
        focus:outline-none focus:border-blue-500
        transition
      "
            >
              <option value="">Select Specialization</option>

              {doctorSpecializations.map((sp) => (
                <option key={sp} value={sp}>
                  {sp}
                </option>
              ))}
            </select>

            {errors.specialization && (
              <p className="text-red-500 text-sm mt-1">
                {errors.specialization}
              </p>
            )}
          </div>
        )}

        <Input
          id="phone"
          label="Phone"
          placeholder="Enter Phone"
          value={phone}
          setValue={setPhone}
          required
          error={errors.phone}
        />

        <Button type="submit" text="Register" />
      </div>
    </form>
  );
}
