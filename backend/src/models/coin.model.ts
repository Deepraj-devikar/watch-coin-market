import { Schema, model } from 'mongoose';
import { ICoin } from '../interfaces/coin.interface';

const coinSchema = new Schema(
  {
    name: String,
    code: {
      type: String,
      required: true,
      unique: true
    },
    symbol: String,
    rank: Number,
    age: Number,
    color: String,
    png32: String,
    png64: String,
    webp32: String,
    webp64: String,
    exchanges: Number,
    markets: Number,
    pairs: Number,
    categories: [],
    allTimeHighUSD: Number,
    circulatingSupply: Number,
    totalSupply: Number,
    maxSupply: Number,
    links: {}
  },
  {
    timestamps: true
  }
);

export default model<ICoin>('Coin', coinSchema);
