import mongoose from "mongoose";

const HODTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      required: false, // optional if user doesn't provide
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    assignedTo: {
      type: String, // faculty name 
      required: true,
    },
    createdBy: {
      type: String, // HOD's name
      required: true,
    },
   
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HODTask", HODTaskSchema);
