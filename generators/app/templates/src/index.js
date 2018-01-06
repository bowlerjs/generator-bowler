// @flow
import 'babel-register';
import 'babel-polyfill';
import 'clarify';
// npm modules
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import Config from 'config';
import logger from 'winston';
import cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

// local modules
import * as db from './database';
import { client, corsOptionsDelegate, language, wallet } from './middleware';
import schema, { buildDataloaders } from './schema';
//import './providers';

const subEndpoint = Config.get('graphql.subscriptions');
const endpointURL = Config.get('graphql.endpoint');
const port = Config.get('port');
const middleware = [bodyParser.json(), client, language, wallet];

async function Start() {
  const app = express();

  const buildOptions = async ({ client, wallet }) => ({
    schema,
    context: {
      client,
      loaders: buildDataloaders(db.mongo),
      db,
      wallet
    }
  });

  app
    // Configure security
    .use(helmet())
    .options('*', cors(corsOptionsDelegate))
    .use(cors(corsOptionsDelegate))
    // Configure GraphQL endpoint
    .use(endpointURL, ...middleware, graphqlExpress(buildOptions))
    // Configure GraphiQL endpoint
    .use(
      Config.get('graphql.graphiql'),
      graphiqlExpress({
        endpointURL,
        subscriptionsEndpoint: `ws://localhost:${port}${subEndpoint}`
      })
    )
    // Configure middleware for 404 and error handling
    .use(express.notFound())
    .use(express.errorHandler({ logger }));

  const ws = createServer(app);

  ws.listen(port, () => {
    console.log(`Server is running in ${app.get('env')} on port ${port}`);
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema
      },
      {
        server: ws,
        path: subEndpoint
      }
    );
  });
}
export default Start;
