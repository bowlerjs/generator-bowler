export const defs = `
  ping: String!
`;

export const resolvers = {
  Query: {
    ping: (root, args, context, info) => 'pong'
  }
};
