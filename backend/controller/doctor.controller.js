import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const getDoctorsByFilter = asyncHandler(async (req, res) => {
  try {
    const {
      username,
      email,
      specialization,
      phone,
      address,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (page - 1) * limit;

    let filter = { role: "doctor" };

    if (username) {
      filter.username = { $regex: username, $options: "i" };
    }

    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }

    if (specialization) {
      filter.specialization = { $regex: specialization, $options: "i" };
    }

    if (phone) {
      filter.phone = { $regex: phone, $options: "i" };
    }

    if (address) {
      filter.address = { $regex: address, $options: "i" };
    }

    const total = await User.countDocuments(filter);

    const doctors = await User.find(filter)
      .select("username email phone specialization address createdAt")
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
