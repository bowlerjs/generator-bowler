import mongoose from 'mongoose';
import Config from 'config';

mongoose.connect(Config.get('database.mongodb'));
mongoose.Promise = global.Promise;
const connection = mongoose.connection;

import * as models from './models';

export default connection;
