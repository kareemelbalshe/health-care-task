import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/redux/store";
import { useNavigate } from "react-router-dom";
import { handleGetDoctors } from "../../lib/redux/slices/doctorSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/input/Input";
import Pagination from "../../components/table/pagination/Pagination";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/loader";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { doctors, error, loading } = useSelector(
    (state: RootState) => state.doctor
  );
  

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(
      handleGetDoctors({
        page,
        limit,
        username,
        email,
        phone,
        specialization,
        address,
      })
    );
  }, [
    dispatch,
    page,
    limit,
    username,
    email,
    phone,
    specialization,
    address,
  ]);

  return (
    <div className="p-6">

      {loading && <Loader />}

      <div className="w-full p-4 flex items-center justify-center gap-4 mb-6 bg-white rounded-xl shadow">
        <Input placeholder="Doctor Name" value={username} setValue={setUsername}/>
        <Input placeholder="Email" value={email} setValue={setEmail}/>
        <Input placeholder="Phone" value={phone} setValue={setPhone}/>
        <Input placeholder="Specialization" value={specialization} setValue={setSpecialization}/>
        <Input placeholder="Address" value={address} setValue={setAddress}/>
        <Button text="See More" onClick={() => setLimit(limit + 10)} />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {doctors?.doctors?.map((doc: any) => (
          <div
            key={doc._id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition cursor-pointer border border-gray-200"
            onClick={() => navigate(`/profile/${doc._id}`)}
          >
            <h2 className="text-xl font-bold text-gray-800">{doc.username}</h2>
            <p className="text-gray-600 mt-1">{doc.email}</p>
            <p className="text-gray-600 mt-1">{doc.phone}</p>
            <p className="text-blue-600 font-medium mt-2">
              {doc.specialization}
            </p>
            <p className="text-gray-500 mt-1">{doc.address}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Pagination
          page={page}
          lastPage={doctors?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
