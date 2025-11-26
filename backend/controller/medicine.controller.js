import asyncHandler from "express-async-handler";
import Medicine from "../models/Medicine.js";
import Visit from "../models/Visit.js";

export const getMedicinesToVisit = asyncHandler(async (req, res) => {
  try {
    const medicines = await Medicine.find({
      visitId: req.params.visitId,
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const createMedicine = asyncHandler(async (req, res) => {
  try {
    const { visitId } = req.params;
    const { name, count, description, cost } = req.body;

    const visit = await Visit.findOne({ _id: visitId });

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    if (req.user.id != visit.doctor) {
      return res
        .status(403)
        .json({ message: "Only doctor can create medicines" });
    }

    const medicine = await Medicine.create({
      visitId,
      name,
      count,
      description,
      cost,
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const updateMedicine = asyncHandler(async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const deleteMedicine = asyncHandler(async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
