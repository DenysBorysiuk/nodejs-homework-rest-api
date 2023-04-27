const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "denys.borysiuk@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "denys.borysiuk@meta.ua" };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
