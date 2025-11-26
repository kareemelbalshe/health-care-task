import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/redux/store";
import {
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
} from "../../lib/redux/slices/userSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/loader";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { handleCreateVisit } from "../../lib/redux/slices/visitSlice";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const { user: loggingUser } = useSelector((state: RootState) => state.auth);
  const profileId = (useParams().id as string) || loggingUser?.user?._id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [address, setAddress] = useState("");

  const [notes, setNotes] = useState("");
  const [isBook, setIsBook] = useState(false);

  const isOwner = Boolean(
    loggingUser?.user?._id && user?._id && loggingUser.user._id === user._id
  );

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (!profileId) return;
    dispatch(handleGetUser({ id: profileId }));
  }, [dispatch, profileId]);

  console.log(user);
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setSpecialization(user.specialization || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!profileId) return;
    const result = await dispatch(
      handleUpdateUser({
        id: profileId,
        username,
        phone,
        address,
      })
    ).unwrap();

    if (result?.user?._id) {
      toast.success("User updated successfully");
    }
  };

  const handleDelete = async () => {
    if (!profileId) return;
    const result = await dispatch(handleDeleteUser({ id: profileId })).unwrap();

    if (result?.user?._id) {
      toast.success("User deleted successfully");
    }
  };

  const handleBook = async () => {
    if (!loggingUser?.user?._id || loggingUser?.user?.role !== "patient") {
      toast.error("Please login as patient to book an appointment");
      return;
    }
    if (!profileId) return;
    const result = await dispatch(
      handleCreateVisit({ doctorId: profileId, notes })
    ).unwrap();
    toast.success(result || "Appointment booked successfully");
    setNotes("");
    setIsBook(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col gap-4 bg-white rounded-lg shadow-md mt-4 mb-20">
      {loading && <Loader />}
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <Input
        placeholder="Username"
        value={username}
        setValue={setUsername}
        disabled={!isOwner}
      />
      <Input placeholder="Email" value={email} setValue={setEmail} disabled />
      <Input
        placeholder="Phone"
        value={phone}
        setValue={setPhone}
        disabled={!isOwner}
      />
      <Input
        placeholder="Specialization"
        value={specialization}
        setValue={setSpecialization}
        disabled
      />
      <Input
        placeholder="Address"
        value={address}
        setValue={setAddress}
        disabled={!isOwner}
      />

      {isOwner ? (
        <div className="flex gap-4">
          <Button text="Update Profile" onClick={handleUpdate} />
          <Button
            text="Delete Profile"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          />
        </div>
      ) : (
        <div className="flex gap-4 flex-col">
          <Button
            text="Book an appointment"
            onClick={() => setIsBook(!isBook)}
          />
          {isBook && (
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Notes"
                value={notes}
                setValue={setNotes}
                required
              />
              <Button text="Submit" onClick={handleBook} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
