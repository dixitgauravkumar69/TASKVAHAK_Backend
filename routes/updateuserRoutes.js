import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Route to update a user by ID
router.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body; // The fields to update (name, email, role, branch)

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
