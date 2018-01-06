import GraphQLDate from 'graphql-date';
export const General = `
  scalar Date
`;

export const resolvers = {
  Date: GraphQLDate
};
