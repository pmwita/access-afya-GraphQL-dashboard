const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema'); // Ensure this points to your GraphQL schema

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Use environment variable for GraphQL server port
const PORT = process.env.PORT || 4000;

// Set up the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}..`);
});
