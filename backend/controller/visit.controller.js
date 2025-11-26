import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Visit from "../models/Visit.js";

export const getVisitsToDoctor = asyncHandler(async (req, res) => {
  try {
    const { date, patientName, paymentStatus } = req.query;
    const { doctorId } = req.params;

    let filter = { doctor: doctorId };

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

    if (date) {
      const selectedDate = new Date(date);

      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      filter.$or = [
        { startDate: null },
        {
          startDate: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      ];
    }

    const visits = await Visit.find(filter)
      .populate("patient", "username email phone")
      .sort({ createdAt: -1 });

    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const getVisitById = asyncHandler(async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate("patient", "username email phone")
      .populate("doctor", "username specialization");

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
    }).populate("patient", "username email phone");

    res.json(currentVisit);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const getVisitsToPatient = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { patientId } = req.params;

    const skip = (page - 1) * limit;

    let filter = { patient: patientId };

    const total = await Visit.countDocuments(filter);

    const visits = await Visit.find(filter)
      .populate("doctor", "username specialization")
      .sort({ startDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      visits,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const createVisit = asyncHandler(async (req, res) => {
  try {
    const { notes } = req.body;
    const { doctorId } = req.params;

    const existingVisit = await Visit.findOne({
      patient: req.user.id,
      doctor: doctorId,
      status: { $in: ["scheduled"] },
    });

    if (existingVisit) {
      return res.status(400).json({
        message: "You already have a scheduled visit with this doctor.",
      });
    }

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
    console.log(req.params.id);
    // const visitToSave = await Visit.findById(req.params.id);
    // if (!visitToSave) {
    //   return res.status(404).json({ message: "Visit not found" });
    // }

    // if(visitToSave.status === "completed") {
    //   return res.status(400).json({ message: "Completed visits cannot be modified" });
    // }

    // if(visitToSave.status === "cancelled") {
    //   return res.status(400).json({ message: "Cancelled visits cannot be modified" });
    // }

    // const doctor = await User.findById(visitToSave.doctor);
    // const finances = await User.find({ followDoctor: doctor._id });
    // const loggedUser = req.user;

    // if (loggedUser.role === "doctor" && loggedUser._id.equals(doctor._id)) {
    //   return res.status(403).json({ message: "You cannot modify your own visit" });
    // }

    // if (
    //   loggedUser.role === "finance" &&
    //   finances.some((f) => f._id.equals(loggedUser._id))
    // ) {
    //   return res.status(403).json({ message: "You cannot modify your own visit" });
    // }

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

    res.status(200).json(visit);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
