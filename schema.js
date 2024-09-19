const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const MetricType = new GraphQLObjectType({
  name: 'Metric',
  fields: {
    name: { type: GraphQLString },
    value: { type: GraphQLInt },
  },
});

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    metrics: {
      type: new GraphQLList(MetricType),
      resolve(parent, args) {
        return metricsData;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
