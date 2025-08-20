import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
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
      required: true,
    },
    assignedBy: {
      type:String,
      required: true,
    },
    assignedRole: {
      type: String,
      enum: ["Principal", "HOD"],
      required: true,
    },
    branch: {
      type: String,
      enum: ["", "CSE & Allied", "ECE", "ME", "CIVIL", "EE"], // null hata ke empty string use ki
      default: "",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto add hoga
  }
);

export default mongoose.model("Task", taskSchema);
