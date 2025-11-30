import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleCreateFinance } from "../../lib/redux/slices/financeSlice";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import type { AppDispatch, RootState } from "../../lib/redux/store";

export default function CreateFinance() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.finance);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!email.trim() || !email.includes("@")) {
      toast.error("Valid email is required");
      return false;
    }

    if (!password.trim() || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (!phone.trim() || phone.length < 10) {
      toast.error("Valid phone number is required");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    dispatch(
      handleCreateFinance({
        name,
        email,
        password,
        phone,
      })
    );
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="p-5 max-w-xl mx-auto bg-white rounded-lg shadow-md mt-4">
      <h1 className="text-2xl font-bold mb-6">Create Finance User</h1>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          label="Name"
          placeholder="Enter name"
          value={name}
          setValue={setName}
        />

        <Input
          label="Email"
          placeholder="Enter email"
          type="email"
          value={email}
          setValue={setEmail}
        />

        <Input
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          setValue={setPassword}
        />

        <Input
          label="Phone"
          placeholder="Enter phone number"
          value={phone}
          setValue={setPhone}
        />

        <Button
          type="submit"
          text={loading ? "Creating..." : "Create"}
          width="120px"
        />
      </form>
    </div>
  );
}
