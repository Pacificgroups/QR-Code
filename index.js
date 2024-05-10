// index.js
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use express-fileupload middleware
app.use(fileUpload());

// Use routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
