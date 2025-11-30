import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../lib/redux/store";
import { handleGetVisitById } from "../../../lib/redux/slices/visitSlice";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/loader/loader";
import Button from "../../../components/button/Button";
import { handleGetMedicines } from "../../../lib/redux/slices/medicineSlice";

export default function ViewVisit() {
  const dispatch = useDispatch<AppDispatch>();
  const { visit, error, loading } = useSelector(
    (state: RootState) => state.visit
  );
  const { medicines } = useSelector((state: RootState) => state.medicine);
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const visitId = useParams().id as string;

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (visitId) {
      dispatch(handleGetVisitById(visitId));
      dispatch(handleGetMedicines(visitId));
    }
  }, [dispatch, visitId]);

  // Calculate total medicines cost
  const totalMedicineCost = useMemo(() => {
    if (!medicines || medicines.length === 0) return 0;
    return medicines.reduce(
      (acc, med) => acc + Number(med.cost || 0) * Number(med.count),
      0
    );
  }, [medicines]);

  const doctorCost = visit?.cost || 0;
  const grandTotal = doctorCost + totalMedicineCost;
  return (
    <div>
      {loading && <Loader />}

      <div className="flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold">View Visit</h1>

        {user.user.role === "doctor" && (
          <Button
            width="120px"
            text="Add Medicine"
            onClick={() =>
              navigate(`/dashboard/doctor/add-medicine/${visitId}`)
            }
          />
        )}
      </div>

      {visit && (
        <div className="mt-5 space-y-3 mx-auto w-fit bg-white shadow-md p-5 rounded-2xl border border-gray-200">
          <h2 className="text-xl font-bold mb-2">Visit Details</h2>

          <p>
            <strong>Status:</strong> {visit.status}
          </p>
          <p>
            <strong>Payment Status:</strong> {visit.paymentStatus}
          </p>
          <p>
            <strong>Doctor Cost:</strong> {doctorCost} EGP
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(visit.startDate).toLocaleString()}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(visit.endDate).toLocaleString()}
          </p>

          <p>
            <strong>Doctor:</strong> {visit.doctor.username}
          </p>
          <p>
            <strong>Specialization:</strong> {visit.doctor.specialization}
          </p>

          <p>
            <strong>Patient:</strong> {visit.patient.username}
          </p>
          <p>
            <strong>Email:</strong> {visit.patient.email}
          </p>
          <p>
            <strong>Phone:</strong> {visit.patient.phone}
          </p>
          <p>
            <strong>Notes:</strong> {visit.notes}
          </p>
        </div>
      )}

      {medicines?.length > 0 && (
        <div className="m-5 space-y-3 mx-auto w-fit">
          <h2 className="text-xl font-bold">Medicines</h2>

          {medicines.map((medicine) => (
            <div
              key={medicine._id}
              className="w-full flex flex-wrap items-center gap-4 bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition border border-gray-200"
            >
              <p>
                <strong>Name:</strong> {medicine.name}
              </p>
              <p>
                <strong>Count:</strong> {medicine.count}
              </p>
              <p>
                <strong>Description:</strong> {medicine.description}
              </p>
              <p>
                <strong>Cost:</strong> {medicine.cost} EGP
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Total Cost Box */}
      <div className="mx-auto w-fit my-10 bg-purple-50 border border-purple-200 shadow-md p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-purple-700 mb-2">
          Total Summary
        </h2>

        <p className="text-lg">
          <strong>Total Medicines Cost:</strong> {totalMedicineCost} EGP
        </p>

        <p className="text-lg">
          <strong>Doctor Cost:</strong> {doctorCost} EGP
        </p>

        <p className="text-xl my-3 font-bold text-purple-900">
          Grand Total: {grandTotal} EGP
        </p>
      </div>
    </div>
  );
}
