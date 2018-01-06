module.exports = function() {
  return {
    host: 'localhost',
    port: 9000,
    cors: {
      whitelist: null
    },
    graphql: {
      endpoint: '/graphql',
      graphiql: '/graphiql',
      subscriptions: '/subscriptions',
      rabbitmq: 'amqp://localhost:41014'
    },

    database: {
      mongodb: 'mongodb://localhost:27017/bowler'
    }
  };
};
