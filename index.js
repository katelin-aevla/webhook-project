// Create a place to store messages
let receivedWebhooks = [];

// Load the tools we need
const express = require('express');
const bodyParser = require('body-parser');

// Create our app
const app = express();

// Set up our app to understand messages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a simple home page so you can see if your app is running
app.get('/', (req, res) => {
  res.send('Webhook receiver is running! Send POST requests to /webhook');
});

// This is your webhook endpoint
app.post('/webhook', (req, res) => {
  // Print the message to your logs
  console.log('Received webhook data:');
  console.log(JSON.stringify(req.body, null, 2));

  // Save the message
receivedWebhooks.push({
  timestamp: new Date(),
  data: req.body
});

// Keep only the latest 100 messages
if (receivedWebhooks.length > 100) {
  receivedWebhooks.shift();
}
  
  // Send back a success message
  res.status(200).send({
    status: 'success',
    message: 'Webhook received!'
  });
});

// Start the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook receiver is listening on port ${PORT}`);
});

// An endpoint to view saved messages
app.get('/messages', (req, res) => {
  res.json(receivedWebhooks);
});
