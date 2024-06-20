// Import modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Express instance
const app = express();

// Port for the server
const port = 3000;

// Middleware setup
// Parse application/x-www-form-urlencoded and application/json request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set the view engine to use EJS templating
app.set('view engine', 'ejs');

// Set the directory for views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// GET request to the root URL ('/')
app.get('/', (req, res) => {
  // Render the 'index.ejs' template
  res.render('index');
});

// POST request to the '/generate' endpoint
app.post('/generate', (req, res) => {
  // Retrieve the quantity from the request body and parse it as an integer
  const quantity = parseInt(req.body.quantity);
  // Generate an array of numbers from 1 to 'quantity'
  const numbers = Array.from({ length: quantity }, (_, index) => index + 1);
  // Send JSON response with the generated numbers array
  res.json({ numbers });
});

// Start the server, listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
