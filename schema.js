const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const MetricType = new GraphQLObjectType({
  name: 'Metric',
  fields: {
    name: { type: GraphQLString },
    value: { type: GraphQLInt },
  },
});

// Sample metrics data
const metricsData = [
  { name: 'Patient Satisfaction', value: 78 },
  { name: 'Efficiency', value: 85 },
  { name: 'Patient Visits per Week', value: 120 },
  { name: 'Treatment Success Rate', value: 90 },
  { name: 'Average Wait Time', value: 15 }, // in minutes
  { name: 'Patient Retention Rate', value: 70 },
  { name: 'Healthcare Access Rate', value: 60 },
  { name: 'Cost per Patient', value: 50 }, // in currency units
];

// Root query to fetch metrics
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    metrics: {
      type: new GraphQLList(MetricType),
      args: { name: { type: GraphQLString } }, // Optional filtering
      resolve(parent, args) {
        return args.name
          ? metricsData.filter(metric => metric.name.includes(args.name))
          : metricsData;
      },
    },
  },
});

// Mutation to add a new metric
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMetric: {
      type: MetricType,
      args: {
        name: { type: GraphQLString },
        value: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const newMetric = {
          name: args.name,
          value: args.value,
        };
        metricsData.push(newMetric);
        return newMetric;
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation, // Include mutation
});
