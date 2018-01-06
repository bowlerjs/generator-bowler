import mongoose, { Schema } from 'mongoose';

const OpenSchema = new Schema({
  nextOpen: Date,
  nextClose: Date,
  open: Date,
  close: Date
});

const Game = new Schema(
  {
    gameId: { type: String, index: { unique: true } },
    name: String,
    status: String,
    provider: { type: Schema.Types.ObjectId, ref: 'Provider' },
    startType: String,
    freeplay: Boolean,
    openSchema: OpenSchema,
    regulatorNotice: Boolean,
    orientation: String,
    width: Number,
    height: Number,
    description: String,
    themeUrl: String,
    thumbnailUrl: String,
    helpUrl: String,
    trivia: Array,
    seoName: { type: String, index: { unique: true } }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Game', Game);
