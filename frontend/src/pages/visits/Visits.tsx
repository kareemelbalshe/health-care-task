import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/redux/store";
import AnyTable from "../../components/table/anyTable";
import Loader from "../../components/loader/loader";
import {
  handleGetVisitsToDoctor,
  handleUpdateVisitToPatient,
} from "../../lib/redux/slices/visitSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/input/Input";

export default function Visits() {
  const dispatch = useDispatch<AppDispatch>();

  const { visits, error, loading } = useSelector(
    (state: RootState) => state.visit
  );

  const authUser = useSelector((state: RootState) => state.auth.user.user);

  const doctorId =
  authUser?.role === "doctor"
    ? authUser?._id
    : authUser?.followDoctor;

  const [date, setDate] = useState("");
  const [patientName, setPatientName] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // fetch visits
  useEffect(() => {
    if (!doctorId) return;

    dispatch(
      handleGetVisitsToDoctor({
        doctorId,
        date,
        patientName,
        paymentStatus,
      })
    );
  }, [dispatch, doctorId, date, patientName, paymentStatus]);

  return (
    <div className="mb-20 flex flex-col gap-5 w-full lg:items-center p-6">
      {loading && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
        <input
          type="date"
          className="w-full h-11 p-3 mt-7 border-4 border-[#5C5C5C] rounded-lg bg-inherit text-sm focus:outline-none focus:border-blue-500 transition"
          placeholder="Date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <Input
          label="Patient Name"
          type="text"
          placeholder="Search by patient name"
          value={patientName}
          setValue={setPatientName}
        />

        <Input
          label="Payment Status"
          type="text"
          placeholder="paid / pending / canceled"
          value={paymentStatus}
          setValue={setPaymentStatus}
        />
      </div>

      {/* Table */}
      <AnyTable
        tbodys={visits}
        titleHeader="Visits"
        thead={[
          "Status",
          "Payment Status",
          "Cost",
          "Created At",
          "Start Date",
          "End Date",
          "Patient",
          "Email",
          "Phone",
        ]}
        headerData={[
          "status",
          "paymentStatus",
          "cost",
          "createdAt",
          "startDate",
          "endDate",
          "patient.username",
          "patient.email",
          "patient.phone",
        ]}
        view={true}
        linkView={
          authUser?.user?.role === "doctor"
            ? `/dashboard/doctor/view-visit/`
            : `/dashboard/finance/view-visit/`
        }
        edit={true}
        linkEdit={
          authUser?.user?.role === "doctor"
            ? `/dashboard/doctor/edit-visit/`
            : `/dashboard/finance/edit-visit/`
        }
        canc={true}
        handleCancel={(id: string) =>
          dispatch(
            handleUpdateVisitToPatient({ visitId: id, status: "canceled" })
          )
        }
      />
    </div>
  );
}
