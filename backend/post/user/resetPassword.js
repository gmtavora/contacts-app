const db = require("../../db");
const nodemailer = require("nodemailer");

module.exports = async (request, response) => {
  const {input} = request.body;

  if (!input) return response.status(400).send("Invalid request.");

  try {
    let userInfo = await db.searchUserByUsername(input);
    if (!userInfo) userInfo = await db.searchUserByEmail(input);
    
    if (!userInfo) return response.status(403).send("Email or username not found");

    const newPassword = await db.resetPassword(userInfo.id);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 0,
      auth: {user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD}
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_PASSWORD_RESET,
      to: userInfo.email,
      replyTo: "noreply@email.com",
      subject: "Password reset requested",
      text: `You requested a password reset. Your new password is ${newPassword}`
    });

    console.log(`Message sent: ${info.messageId}`)
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.status(200).send("Password reseted successfully.");
};