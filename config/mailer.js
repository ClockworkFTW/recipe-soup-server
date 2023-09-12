import nodemailer from "nodemailer";
import variables from "./variables.js";

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    user: variables.mailer.username,
    pass: variables.mailer.password,
  },
});

async function sendVerificationLink({ to, token }) {
  try {
    await transporter.sendMail({
      from: '"RecipeSoup" <support@recipesoup.app>',
      to,
      subject: "Verify your RecipeSoup email",
      text: `Hello,\n\nFollow this link to verify your email address.\n\nhttp://localhost:3000/api/auth/verify-email/${token}\n\nIf you didn’t ask to verify this address, you can ignore this email.\n\nThanks,\nThe RecipeSoup team`,
    });
    console.log(`verification email sent to: ${to}`);
  } catch (error) {
    throw new Error("Could not send verification email");
  }
}

async function sendResetLink({ to, token }) {
  try {
    await transporter.sendMail({
      from: '"RecipeSoup" <support@recipesoup.app>',
      to,
      subject: "Reset your RecipeSoup password",
      text: `Hello,\n\nFollow this link to reset your password.\n\nhttp://localhost:5173/reset-password?token=${token}\n\nIf you didn’t ask to reset your password, you can ignore this email.\n\nThanks,\nThe RecipeSoup team`,
    });
    console.log(`password reset email sent to: ${to}`);
  } catch (error) {
    throw new Error("Could not send password reset email");
  }
}

export default {
  sendVerificationLink,
  sendResetLink,
};
