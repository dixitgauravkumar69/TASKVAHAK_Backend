import express from "express";
import HodTask from "../models/Hod.js";
const router=express.Router();



router.get("/faculty-assigned-tasks/:Name", async (req, res) => {
  try {
    const facultyName = req.params.Name;
   
   
    // Assuming your HodTask schema has a field "assignedTo"
    const tasks = await HodTask.find({ assignedTo: facultyName });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this faculty" });
    }
   
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching faculty tasks:", error);
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

router.put("/complete-task/:taskId", async (req, res) => {
  try {
    const Tid = req.params.taskId;

    const updatedTask = await HodTask.findByIdAndUpdate(
      Tid,
      { status: "Completed" }, // update status
      { new: true } // return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task marked as completed",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task", error });
  }
});


export default router;
