const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs"); // Required to read and delete the file
require("dotenv").config(); // Import dotenv to load environment variables

const app = express();
const port = 3000;

// Setup file upload using multer (this will handle resume uploads)
const upload = multer({ dest: "uploads/" });

// Allow CORS for your Angular app running on http://localhost:4200
const corsOptions = {
  origin: "http://localhost:4200", // Allow requests from this origin
  methods: ["GET", "POST"], // Allow GET and POST requests
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Use CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies (if you need to handle JSON data)
app.use(express.json());

// Setup Nodemailer transporter using your SMTP details
const transporter = nodemailer.createTransport({
  host: "mail.hopemedicalstaffing.com", // Namecheap shared hosting SMTP server
  port: 587, // Port 587 for TLS (common for shared hosting SMTP servers)
  secure: false, // Use TLS instead of SSL
  auth: {
    user: process.env.EMAIL_USER, // Your email address (from .env file)
    pass: process.env.EMAIL_PASS, // Your email password (from .env file)
  },
  tls: {
    rejectUnauthorized: false, // Avoid issues with self-signed certificates
  },
});

// POST route to send email with file attachment
app.post("/send-email", upload.single("resume"), (req, res) => {
  const { name, email, phone, role } = req.body;
  const filePath = req.file.path;

  // Prepare the email body (HTML content with a message)
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0; color: #333;">
      <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 40px 40px 40px 60px; border-radius: 10px; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #e6a493; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; color: white;">
          <h1 style="font-family: 'Syne', sans-serif; font-size: 28px; margin: 0;">Job Application for ${role}</h1>
        </div>

        <div style="padding: 20px 0; font-size: 16px; line-height: 1.6;">
          <p>Hello,</p>
          <p>You have received a new job application for the position of <strong style="color: #4D3E3A;">${role}</strong>:</p>

          <div style="background-color: #f1f1f1; border-left: 4px solid #e6a493; padding: 15px 20px; font-style: italic; margin-bottom: 30px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>

          <p><strong>Attached is the applicant's resume (PDF):</strong></p>
        </div>

        <div style="margin-top: 30px; text-align: center;">
          <h2 style="font-size: 22px; color: #4D3E3A;">Contact Information</h2>
          <p>Email: <a href="mailto:info@hopemedicalstaffing.com" style="color: #e6a493; text-decoration: none;">info@hopemedicalstaffing.com</a></p>
          <p>Phone: <a href="tel:503-747-5544" style="color: #e6a493; text-decoration: none;">503-747-5544</a></p>
          <p>Fax: <a href="tel:503-751-2962" style="color: #e6a493; text-decoration: none;">503-751-2962</a></p>
          <p>Address: 797 NE Kathryn St. Hillsboro, OR 97124</p>
        </div>
      </div>
    </div>
  `;

  // Prepare the email data
  const mailOptions = {
    from: "info@hopemedicalstaffing.com", // Sender's email
    to: "info@hopemedicalstaffing.com", // Recipient's email
    replyTo: email, // Applicant's email
    subject: `Job Application for ${role}`, // Email subject
    html: htmlContent, // HTML body with applicant details
    attachments: [
      {
        filename: req.file.originalname, // Resume file name
        path: filePath, // Path to the uploaded resume file
        contentType: "application/pdf", // Content type (PDF)
      },
    ],
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    // Once the email is sent successfully, delete the file
    if (error) {
      return res.status(500).send("Error sending email: " + error.message);
    }

    // Delete the file from the server after sending the email
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
        return res.status(500).send("Error deleting the file: " + err.message); // Add this to return a response if file deletion fails
      }
      console.log("File successfully deleted:", filePath); // Log success message
    });

    res.status(200).json({ message: "Email sent successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
