import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "cancelled"],
      default: "scheduled",
    },
    notes: String,
    cost: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Visit", visitSchema);
