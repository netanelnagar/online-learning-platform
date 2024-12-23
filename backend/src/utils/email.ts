import nodemailer from 'nodemailer';
import { convert } from 'html-to-text';
import { ITeacher } from '../types/teacher-types';
import { IStudent } from '../types/student-types';
import { IAdmin } from '../types/admin-types';

export default class Email {
  to: string;
  firstName: string;
  token: string;
  from: string;

  constructor(user: ITeacher | IStudent | IAdmin, token: string) {
    this.to = user.email;
    this.firstName = user.username.split(' ')[0];
    this.token = token;
    this.from = `Netanel Nagar <${process.env.MODE!.startsWith("dev") ? process.env.EMAIL_FROM_DEV : process.env.EMAIL_FROM_PROD}>`;
  }

  newTransport() {
    if (process.env.Mode!.toLowerCase().startsWith("prod")) {
    // Mailersend 
    return nodemailer.createTransport({
      host: process.env.MAILERSEND_HOST!,
      port: Number(process.env.MAILERSEND_PORT!),
      secure: false,
      auth: {
        user: process.env.MAILERSEND_USERNAME,
        pass: process.env.MAILERSEND_PASSWORD
      }
    });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: Number(process.env.EMAIL_PORT!),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    } as nodemailer.TransportOptions);
  }

  // Send the actual email
  async send(html: string, subject: string) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, { wordwrap: 130 })
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(welcomeHtmlMsg(this.firstName), 'Welcome to the Online Courses Platform!');
  }

  async sendPasswordReset() {
    await this.send(
      resetHtmlMsg(this.token),
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};


function welcomeHtmlMsg(username: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Online Courses Platform</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #007bff;
      color: white;
      padding: 10px 0;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
    }
    .content {
      margin: 20px 0;
    }
    .content h2 {
      color: #333;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      color: #666;
    }
    .btn {
      display: inline-block;
      margin: 20px 0;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to Online Courses Platform</h1>
    </div>
    <div class="content">
      <h2>Hi ${username},</h2>
      <p>We're excited to have you onboard! Thank you for joining <strong> Online Courses Platform</strong>. We are committed to providing you with the best experience possible.</p>
      <p>To get started, click the button below to explore your account and learn more about our services.</p>
      <a href="[Your Link Here]" class="btn">Get Started</a>
      <p>If you have any questions, feel free to reply to this email or contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
    </div>
    <div class="footer">
      <p>&copy;  Online Courses Platform 2024. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`
}

function resetHtmlMsg(resetUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #dc3545;
      color: white;
      padding: 10px 0;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
    }
    .content {
      margin: 20px 0;
    }
    .content h2 {
      color: #333;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      color: #666;
    }
    .btn {
      display: inline-block;
      margin: 20px 0;
      padding: 10px 20px;
      background-color: #dc3545;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .btn:hover {
      background-color: #c82333;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <h2>Hello,</h2>
      <p>You requested to reset your password. Please click the button below to set a new password. This link is valid for only <strong>10 minutes</strong>.</p>
      <p>this your token: <a style="color: #dc3545;">${resetUrl}</a></p>
      <p>If you did not request a password reset, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; Online Courses Platform 2024. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`}