import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Visit from "../models/Visit.js";
import Medicine from "../models/Medicine.js";

export const createFinance = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username:name,
      email,
      password,
      role: "finance",
      followDoctor: req.user.id,
      phone,
    });

    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const getCostMedicinesToVisit = asyncHandler(async (req, res) => {
  try {
    const medicines = await Medicine.find({
      visitId: req.params.visitId,
    });

    const totalCost = medicines.reduce((total, treatment) => {
      return total + treatment.cost;
    }, 0);

    res.json({ medicines, totalCost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
