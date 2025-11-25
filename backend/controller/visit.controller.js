import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Visit from "../models/Visit.js";

export const getVisitsToDoctor = asyncHandler(async (req, res) => {
  try {
    const { date, patientName, paymentStatus } = req.query;
    const { doctorId } = req.params;

    let filter = {
      doctor: doctorId,
    };

    let selectedDate = date ? new Date(date) : new Date();
    let startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    let endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));

    filter.startDate = { $gte: startOfDay, $lte: endOfDay };

    if (patientName) {
      const patients = await User.find({
        role: "patient",
        username: { $regex: patientName, $options: "i" },
      });

      filter.patient = { $in: patients.map((p) => p._id) };
    }

    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    const visits = await Visit.find(filter)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .sort({ startDate: -1 });

    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const getVisitById = asyncHandler(async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization");

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const getCurrentActiveVisit = asyncHandler(async (req, res) => {
  try {
    const currentVisit = await Visit.findOne({
      doctor: req.params.id,
      status: "in-progress",
    }).populate("patient", "name email phone");

    res.json(currentVisit);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const createVisit = asyncHandler(async (req, res) => {
  try {
    const { notes } = req.body;
    const { doctorId } = req.params;
    const visit = await Visit.create({
      patient: req.user.id,
      doctor: doctorId,
      status: "scheduled",
      notes,
      paymentStatus: "pending",
    });
    res.status(201).json({ visit });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const updateVisit = asyncHandler(async (req, res) => {
  try {
    const { status, paymentStatus, cost, startDate, endDate } = req.body;
    const visit = await Visit.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status,
          paymentStatus,
          cost,
          startDate,
          endDate,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
