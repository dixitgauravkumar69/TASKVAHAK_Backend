import express from "express";
import mongoose from "mongoose";
import HODTask from "../models/Hod.js";
import User from "../models/User.js";


const router = express.Router();

/**
 * 📌 Get all tasks (HOD Dashboard)
 */
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await HODTask.find().populate("assignedTo", "name email");
   
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


router.get("/facultylist", async (req, res) => {
  try {
    const { branch } = req.query; // frontend se branch bhejna

    let query = { role: "faculty" };
    if (branch) {
      // Exact match nahi, case-insensitive partial match use karte hain
      query.branch = { $regex: new RegExp(branch, "i") };
    }

    const facultyList = await User.find(query);
    console.log(facultyList);
    res.status(200).json(facultyList);
  } catch (error) {
    console.error("Error fetching faculty:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.get("/hod-tasks", async (req, res) => {
  try {
    const Hodtasklist = await HODTask.find().lean(); // use .lean() to get plain JS objects
    res.status(200).json(Hodtasklist);
  } catch (error) {
    console.error("Error fetching HOD tasks:", error);
    res.status(500).json({ error: "Failed to fetch HOD tasks" });
  }
});


/**
 * 📌 Create Task
 */
router.post("/assign-task", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { title, description, deadline, priority, assignedTo, assignedRole, createdBy, branch, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and Description required" });
    }

    const task = new HODTask({ title, description, deadline, priority, assignedTo, assignedRole, createdBy, branch, status });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



/**
 * 📌 Update Task (Edit or Change Status)
 */
router.put("/edithodtask/:id", async (req, res) => {
  try {
    const task = await HODTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

/**
 * 📌 Delete Task
 */
router.delete("/deletetasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await HODTask.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});








export default router;
