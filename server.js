const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables
const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON requests

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Define the port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}..`);
});
