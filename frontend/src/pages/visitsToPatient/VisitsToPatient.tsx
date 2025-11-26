import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/redux/store";
import { handleGetVisitsToPatient, handleUpdateVisitToPatient } from "../../lib/redux/slices/visitSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../../components/table/pagination/Pagination";
import AnyTable from "../../components/table/anyTable";
import Loader from "../../components/loader/loader";

export default function VisitsToPatient() {
  const dispatch = useDispatch<AppDispatch>();
  const { patientVisits, error, loading } = useSelector(
    (state: RootState) => state.visit
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const patientId = useSelector((state: RootState) => state.auth.user.user?._id);
  console.log(patientId);
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    dispatch(
      handleGetVisitsToPatient({
        patientId,
        page,
        limit,
      })
    );
  }, [dispatch, patientId, page, limit]);

  console.log(patientVisits)
  return (
    <div className="mb-20 flex flex-col gap-5 w-full lg:items-center p-6">
        {loading && <Loader/>}
        <AnyTable
        tbodys={patientVisits?.visits}
        titleHeader="Visits"
        thead={["Status", "Payment Status", "Cost", "Created At", "Doctor", "Specialization"]}
        headerData={["status", "paymentStatus", "cost", "createdAt","doctor.username","doctor[specialization]"]}
        view={true}
        linkView={`/dashboard/patient/view-visit/`}
        canc={true}
        handleCancel={(id: string) => dispatch(handleUpdateVisitToPatient({ visitId: id, status: "canceled" }))}
      />
      <Pagination
        page={page}
        onPageChange={setPage}
        lastPage={patientVisits?.totalPages || 1}
      />
    </div>
  );
}
