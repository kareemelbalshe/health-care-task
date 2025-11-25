import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visit",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    min: 0,
  },
  description: String,
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
});


export default mongoose.model("Medicine", medicineSchema);