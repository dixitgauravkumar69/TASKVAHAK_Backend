import express from "express";
import facultyTask from "../models/facultyTask.js";



const router = express.Router();


router.get("/tasks", async (req, res) => {
  try {
    const tasks = await facultyTask.find();
   
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});





router.put("/complete-taskM/:taskId", async (req, res) => {
  try {
    const Tid = req.params.taskId;

    const updatedTask = await facultyTask.findByIdAndUpdate(
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


/**
 * 📌 Create Task
 */
router.post("/add-tasks", async (req, res) => {
  try {
   
    const { title, description, deadline, priority, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and Description required" });
    }

    const task = new facultyTask({ title, description, deadline, priority, status });
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
router.put("/edit-tasks/:id", async (req, res) => {
  try {
    const task = await facultyTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

/**
 * 📌 Delete Task
 */
router.delete("/delete-tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await facultyTask.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});








export default router;
