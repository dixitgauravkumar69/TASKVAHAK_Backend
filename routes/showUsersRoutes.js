import express from "express";

const router = express.Router();
import User from "../models/User.js";

// Route to show all users
router.get("/Showusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;