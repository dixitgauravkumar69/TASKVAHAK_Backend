import nodemailer from "nodemailer";
import { MAIL_CONFIG } from "../config/mail.js";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: MAIL_CONFIG.service,
    auth: MAIL_CONFIG.auth
  });

  await transporter.sendMail({
    from: `"${MAIL_CONFIG.fromName}" <${MAIL_CONFIG.fromEmail}>`,
    to,
    subject,
    html
  });
};
