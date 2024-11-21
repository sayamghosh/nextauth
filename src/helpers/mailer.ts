import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export async function sendMail({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: string;
}) {
  try {
    const hashedToken = await bcryptjs.hash(email, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "78db4b728eb472", //❌
        pass: "e317daff44a2fb", //❌
      },
    });

    const mailOptions = {
      from: "sayam@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password", // Subject line
      html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </P>`, // html body
    };
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Message sent:");
    return mailResponse;
  } catch (error: any) {
    throw new Error("Error sending email", error);
  }
}
