const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "project.alderder@gmail.com",
    pass: process.env.NODEMAILER_PASS,
  },
});

module.exports = transporter;
