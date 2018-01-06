import mongoose, { Schema } from 'mongoose';

const BetLimit = new Schema({
  currency: String,
  symbol: String,
  min: Number,
  max: Number
});

const VideoSnapshots = new Schema({
  size: { type: String, enum: ['S', 'M', 'L', 'XL'] },
  uri: String
});

const Table = new Schema(
  {
    name: { type: String, required: true },
    open: Boolean,
    dealer: String,
    results: Array,
    road: Array,
    players: Number,
    seatsTaken: Array,
    provider: { type: Schema.Types.ObjectId, ref: 'Provider' },
    tableId: { type: String, index: { unique: true } },
    gameType: String,
    betLimit: [BetLimit],
    video: [VideoSnapshots],
    platform: String,
    sites: {
      assigned: Array,
      blocked: Array
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Table', Table);
