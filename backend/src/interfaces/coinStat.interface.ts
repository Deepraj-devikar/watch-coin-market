import { Document } from 'mongoose';

export interface ICoinStat extends Document {
    _id: string;
    code: string;
    rate: number;
    volume: number;
    cap: number;
    delta: {
        hour: number;
        day: number;
        week: number;
        month: number;
        quarter: number;
        year: number;
    };
}