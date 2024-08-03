import { Schema, model } from 'mongoose';
import { ICoinStat } from '../interfaces/coinStat.interface';

const coinStatSchema = new Schema(
  {
    code: String,
    rate: Number,
    volume: Number,
    cap: Number,
    delta: {
      hour: Number,
      day: Number,
      week: Number,
      month: Number,
      quarter: Number,
      year: Number
    }
  },
  {
    timestamps: true
  }
);

export default model<ICoinStat>('CoinStat', coinStatSchema);