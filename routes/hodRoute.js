import express from 'express';
import Tasks from '../models/Tasks.js';

const router = express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const { branch } = req.query; // branch will come from frontend query param
    console.log(branch);

    const filter = { assignedRole: "HOD" };
    if (branch) filter.branch = branch; // apply branch filter if provided

    const tasks = await Tasks.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put("/complete-task/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Tasks.findByIdAndUpdate(
      req.params.id,
      { status: status || "Completed" },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating task", error });
  }
});


export default router;