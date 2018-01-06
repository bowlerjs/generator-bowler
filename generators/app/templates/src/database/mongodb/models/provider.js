import mongoose, { Schema } from 'mongoose';

const Provider = new Schema({
  name: String,
  provider: { type: String, index: { unique: true } }
});

export default mongoose.model('Provider', Provider);
