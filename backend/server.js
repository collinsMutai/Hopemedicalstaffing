const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();  // Import dotenv to load environment variables

const app = express();
const port = 3000;

// Setup file upload using multer (this will handle resume uploads)
const upload = multer({ dest: 'uploads/' });

// Allow CORS for your Angular app running on http://localhost:4200
const corsOptions = {
  origin: 'http://localhost:4200',  // Allow requests from this origin
  methods: ['GET', 'POST'],         // Allow GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true,                // Allow credentials (cookies, authorization headers)
};

// Use CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies (if you need to handle JSON data)
app.use(express.json());

// Setup Nodemailer transporter using your SMTP details
const transporter = nodemailer.createTransport({
  host: 'mail.hopemedicalstaffing.com',  // Namecheap shared hosting SMTP server
  port: 587,  // Port 587 for TLS (common for shared hosting SMTP servers)
  secure: false,  // Use TLS instead of SSL
  auth: {
    user: process.env.EMAIL_USER,  // Your email address (from .env file)
    pass: process.env.EMAIL_PASS,  // Your email password (from .env file)
  },
  tls: {
    rejectUnauthorized: false, // Avoid issues with self-signed certificates
  },
});

// POST route to send email with file attachment
app.post('/send-email', upload.single('resume'), (req, res) => {
  const { name, email, phone, role } = req.body;
  const filePath = req.file.path;

  // Prepare the email data
  const mailOptions = {
    from: 'info@hopemedicalstaffing.com',  // Use the email address you're authenticated with
    to: 'info@hopemedicalstaffing.com',  // The destination email address (info@hopemedicalstaffing.com)
    replyTo: email,  // Allow reply to the applicant's email address
    subject: `Job Application for ${role}`,  // Email subject
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nRole: ${role}`,  // Plain text body of the email
    attachments: [
      {
        filename: req.file.originalname,  // Resume file name
        path: filePath,  // Path to the resume file
        contentType: 'application/pdf',  // Content type (PDF)
      },
    ],
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email: ' + error.message);
    }
    res.status(200).send('Email sent successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
