import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
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

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

transporter.use("compile", hbs(handlebarOptions));

async function sendVerificationLink({ user, token }) {
  const mailOptions = {
    from: '"RecipeSoup" <support@recipesoup.app>',
    template: "verify",
    to: user.email,
    subject: "Verify your RecipeSoup email",
    context: {
      name: user.username,
      link: `${variables.url.server}/auth/verify-email/${token}`,
    },
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Could not send verification email");
  }
}

async function sendResetLink({ user, token }) {
  const mailOptions = {
    from: '"RecipeSoup" <support@recipesoup.app>',
    template: "reset",
    to: user.email,
    subject: "Reset your RecipeSoup password",
    context: {
      name: user.username,
      link: `${variables.url.client}/#/reset-password?token=${token}`,
    },
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Could not send verification email");
  }
}

export default {
  sendVerificationLink,
  sendResetLink,
};
