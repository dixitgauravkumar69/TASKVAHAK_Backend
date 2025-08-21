import crypto from "crypto";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

const generateTempPassword = () => crypto.randomBytes(4).toString("hex");

export const createUser = async (req, res) => {
  try {
    const { name, email, role,branch } = req.body;

    const plainPassword = generateTempPassword();

    const user = new User({ name, email, role,branch });
    await user.setPassword(plainPassword);
    await user.save();

    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #2d89ef;">🎉 Congratulations, ${name}!</h2>
        <p>We are excited to welcome you to <strong style="color: #2d89ef;">TASKVAHAK</strong>.</p>
        
        <p>Your account has been successfully created by the administrator.  
           Here are your login details:</p>

        <table style="border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 6px 12px; border: 1px solid #ccc;"><b>Role</b></td>
            <td style="padding: 6px 12px; border: 1px solid #ccc;">${role}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; border: 1px solid #ccc;"><b>Branch</b></td>
            <td style="padding: 6px 12px; border: 1px solid #ccc;">${branch}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; border: 1px solid #ccc;"><b>id</b></td>
            <td style="padding: 6px 12px; border: 1px solid #ccc;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; border: 1px solid #ccc;"><b>Password</b></td>
            <td style="padding: 6px 12px; border: 1px solid #ccc;">${plainPassword}</td>
          </tr>
        </table>

        <p style="margin-top: 20px;">
          You can log in using the link below:<br/>
          <a href="https://taskvahak.vercel.app/login" 
             style="background-color: #2d89ef; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
             🔑 Login to TASKVAHAK
          </a>
        </p>

        <p style="margin-top: 30px;">We’re glad to have you onboard! 🚀<br/>
        — The <strong>TASKVAHAK</strong> Team</p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "🎉 Welcome to TASKVAHAK - Your Account Details",
      html: htmlMessage
    });

    res.json({ success: true, message: "User created and credentials sent to email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
