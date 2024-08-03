import { Document } from 'mongoose';

export interface ICoin extends Document {
    _id: string;
    code: string;
    name: string;
    symbol: string;
    rank: number;
    age: number;
    color: string;
    png32: string;
    png64: string;
    webp32: string;
    webp64: string;
    exchanges: number;
    markets: number;
    pairs: number;
    categories: [];
    allTimeHighUSD: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
    links: object;
}
