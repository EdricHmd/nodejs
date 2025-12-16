import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (options) => {
    // 1. Tạo transporter (cấu hình SMTP)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    // 2. Cấu hình email
    const mailOptions = {
        from: `"Support Team" <${process.env.SMTP_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: options.html
    };
    // 3. Gửi email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.log("Error: %s", error.message);
        throw new Error('Email could not be sent');
    }
}