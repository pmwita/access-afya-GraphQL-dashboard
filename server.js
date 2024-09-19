const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON requests

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Server is running on port 4000..');
});
