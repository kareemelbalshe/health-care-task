import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  try {
    const { username, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, phone, address },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.role === "doctor") {
      await User.deleteMany({ followDoctor: req.params.id });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
