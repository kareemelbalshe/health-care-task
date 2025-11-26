import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../lib/redux/store";
import { handleCreateMedicine } from "../../../lib/redux/slices/medicineSlice";
import { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function AddMedicine() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.medicine);
  const visitId = useParams().id as string;

  const [name, setName] = useState("");
  const [count, seCount] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState<number | string>("");

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Medicine name is required");
      return false;
    }

    if (!count || Number(count) <= 0) {
      toast.error("Amount must be greater than 0");
      return false;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (cost === "" || Number(cost) < 0) {
      toast.error("Cost must be 0 or more");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    dispatch(
      handleCreateMedicine({
        visitId,
        name,
        count: Number(count),
        description,
        cost: Number(cost),
      })
    );
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div>
      <form
        className="p-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h2 className="text-xl font-bold mb-3">Add Medicine</h2>

        <Input
          label="Name"
          placeholder="Medicine Name"
          value={name}
          setValue={setName}
        />

        <Input
          label="Amount"
          placeholder="Medicine Amount"
          value={count}
          setValue={seCount}
          type="number"
        />

        <Input
          label="Description"
          placeholder="Medicine Description"
          value={description}
          setValue={setDescription}
        />

        <Input
          label="Cost"
          placeholder="Medicine Cost"
          value={cost}
          setValue={setCost}
          type="number"
        />

        <div className="flex justify-between mt-4">
          <Button
            type="reset"
            text="Reset"
            width="100px"
            onClick={() => window.location.reload()}
          />

          <Button
            type="submit"
            text={loading ? "Saving..." : "Add"}
            width="100px"
          />
        </div>
      </form>
    </div>
  );
}
