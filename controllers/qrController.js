// qrController.js
const qrCode = require('qrcode-reader');
const jimp = require('jimp');

const readQRCode = async (imageData) => {
  try {
    const buffer = Buffer.from(imageData, 'base64');
    const image = await jimp.read(buffer);
    const qr = new qrCode();
    
    return new Promise((resolve, reject) => {
      qr.callback = (err, value) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(value.result);
          resolve(value.result);
        }
      };
      qr.decode(image.bitmap);
    });
  } catch (error) {
    console.error('Error reading QR Code:', error);
    throw error;
  }
};

module.exports = { readQRCode };
