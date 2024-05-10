// // routes.js
// const express = require('express');
// const router = express.Router();
// const QRController = require('./controllers/qrController');
// const qr = require('qrcode'); // Import the qrcode package

// // Render the index.ejs template
// router.get('/', (req, res) => {
//   res.render('index', { qrCodeData: null });
// });

// // Handle file upload
// router.post('/upload', async (req, res) => {
//   if (!req.files || !req.files.qrImage) {
//     return res.status(400).send('No file uploaded.'); // Send an error response if no file is uploaded
//   }

//   const qrImage = req.files.qrImage;
//   try {
//     const qrCodeData = await QRController.readQRCode(qrImage.data.toString('base64'));
//     if (qrCodeData) {
//       res.render('index', { qrCodeData }); // Render the index page with QR code data if available
//     } else {
//       res.status(400).send('No QR code found in the uploaded image.'); // Send an error response if no QR code is found
//     }
//   } catch (error) {
//     console.error('Error reading QR Code:', error);
//     res.status(500).send('Error reading QR Code');
//   }
// });

// // Handle QR code generation
// router.post('/generate', (req, res) => {
//   const { qrCodeText } = req.body;
//   qr.toDataURL(qrCodeText, (err, data) => {
//     if (err) {
//       console.error('Error generating QR Code:', err);
//       res.status(500).send('Error generating QR Code');
//     } else {
//       res.render('index', { qrCodeData: data }); // Render the index page with generated QR code data
//     }
//   });
// });

// module.exports = router;



// routes.js
const express = require('express');
const router = express.Router();
const QRController = require('./controllers/qrController');
const qr = require('qrcode');

// Render the index.ejs template
router.get('/', (req, res) => {
  // Pass qrCodeData and qrCodeScanner variables to the template
  res.render('index', { qrCodeData: null, qrCodeScanner: false });
});

// Handle file upload
router.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.qrImage) {
      throw new Error('No file uploaded.');
    }

    const qrImage = req.files.qrImage;
    const qrCodeData = await QRController.readQRCode(qrImage.data.toString('base64'));
    
    // Pass qrCodeData and qrCodeScanner variables to the template
    res.render('index', { qrCodeData, qrCodeScanner: false });
  } catch (error) {
    console.error('Error uploading QR code image:', error);
    res.status(400).send(error.message || 'Error uploading QR code image.');
  }
});

// Handle QR code generation
router.post('/generate', async (req, res) => {
  try {
    const { qrCodeText } = req.body;
    if (!qrCodeText) {
      throw new Error('QR code text is required.');
    }

    const dataUrl = await qr.toDataURL(qrCodeText);
    
    // Pass qrCodeData and qrCodeScanner variables to the template
    res.render('index', { qrCodeData: dataUrl, qrCodeScanner: true });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(400).send(error.message || 'Error generating QR code.');
  }
});

module.exports = router;
