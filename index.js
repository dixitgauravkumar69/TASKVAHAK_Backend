import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import Showusers from "./routes/showUsersRoutes.js";
import deleteuserRoute from "./routes/deleteuserRoute.js";
import updateuserRoutes from "./routes/updateuserRoutes.js";
import loginRoutes from "./routes/loginRoutes.js"
import taskRoutes from "./routes/Tasks.js";
import hodRoutes from "./routes/hodRoute.js";
import facultyListRoutes from "./routes/hodRoutePre.js"
import facultyTaskspreRoute from "./routes/facultyTaskspre.js";
import facultyTaskp from "./routes/facultyRoute.js"

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI )
  .then(() => console.log(`TASKVAHAK is Activated and Connected`))
  .catch(err => console.error(err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin", Showusers);
app.use("/api/admin", deleteuserRoute);
app.use("/api/admin", updateuserRoutes);
app.use("/api/user",loginRoutes);
app.use("/api/user", taskRoutes);
app.use("/api/hod", hodRoutes);
app.use("/api/hod", facultyListRoutes);
app.use("/api/faculty",facultyTaskspreRoute);
app.use("/api/faculty",facultyTaskp);


app.get("/", (req, res) => {
  res.send("Welcome to TASKVAHAK API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
