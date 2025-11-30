"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


import { handleGetVisitById, handleUpdateVisit } from "../../../lib/redux/slices/visitSlice";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import type { AppDispatch, RootState } from "../../../lib/redux/store";

export default function EditVisit() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { visit, loading, error } = useSelector(
    (state: RootState) => state.visit
  );

  const [cost, setCost] = useState(0);
  const [status, setStatus] = useState("scheduled");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 10));
  const [startTime, setStartTime] = useState(new Date().toISOString().substring(11, 16));
  const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10));
  const [endTime, setEndTime] = useState(new Date().toISOString().substring(11, 16));

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (id) dispatch(handleGetVisitById(id));
  }, [id]);

  useEffect(() => {
    if (!visit) return;

    setCost(visit.cost || 0);
    setStatus(visit.status || "scheduled");
    setPaymentStatus(visit.paymentStatus || "pending");

    if (visit.startDate) {
      setStartDate(visit.startDate.substring(0, 10));
      setStartTime(visit.startDate.substring(11, 16));
    }

    if (visit.endDate) {
      setEndDate(visit.endDate.substring(0, 10));
      setEndTime(visit.endDate.substring(11, 16));
    }
  }, [visit]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!startDate || !startTime)
      return toast.error("Start date and time are required");

    if (!endDate || !endTime)
      return toast.error("End date and time are required");

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const now = new Date();

    if (start <= now) return toast.error("Start must be in the future");
    if (end <= start) return toast.error("End must be after start");

    const data = {
      status,
      paymentStatus,
      cost,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };


    dispatch(handleUpdateVisit({ visitId: id!, data }))
  };

  return (
    <div className="max-w-xl mx-auto mb-4 mt-4 bg-white shadow-lg p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Visit</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Cost"
          placeholder="Enter visit cost"
          type="number"
          min={0}
          value={cost}
          setValue={(v) => setCost(Number(v))}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            placeholder="Start Date"
            value={startDate}
            setValue={setStartDate}
          />

          <Input
            label="Start Time"
            type="time"
            placeholder="Start Time"
            value={startTime}
            setValue={setStartTime}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="End Date"
            type="date"
            placeholder="End Date"
            value={endDate}
            setValue={setEndDate}
          />

          <Input
            label="End Time"
            type="time"
            placeholder="End Time"
            value={endTime}
            setValue={setEndTime}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-11 p-3 border-4 border-[#5C5C5C] rounded-lg bg-inherit text-sm focus:outline-none focus:border-blue-500 transition"
          >
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm mb-1 font-medium">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full h-11 p-3 border-4 border-[#5C5C5C] rounded-lg bg-inherit text-sm focus:outline-none focus:border-blue-500 transition"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <Button
            text="Reset"
            className="bg-gray-500 hover:bg-gray-600"
            onClick={() => window.location.reload()}
          />

          <Button
            text={loading ? "Saving..." : "Update"}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
