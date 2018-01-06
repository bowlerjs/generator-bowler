import { PubSub } from 'graphql-subscriptions';
import { AmqpPubSub } from 'graphql-rabbitmq-subscriptions';
import Config from 'config';
import bunyan from 'bunyan';

const logger = bunyan.createLogger({ name: 'subscriptions' });

let pubSub;

if (process.env.NODE_ENV !== 'production') {
  pubSub = new PubSub();
} else {
  pubSub = new AmqpPubSub({
    config: Config.get('graphql.rabbitmq'),
    logger
  });
}
export default pubSub;
