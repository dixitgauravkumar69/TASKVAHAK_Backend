import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "user" },
    branch: {
      type: String,
      default: "N/A",
      required: function () {
        // branch is required only if role is HOD or Faculty
        return this.role === "HOD" || this.role === "faculty";
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.methods.setPassword = async function (plain) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(plain, salt);
};

// Method to validate entered password
userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model("User", userSchema);
