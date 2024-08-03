import Coin from '../models/coin.model';
import { ICoin } from '../interfaces/coin.interface';
import axios from 'axios';
import { ServiceResponse } from '../interfaces/generic.interface';

const liveCoinWatchAxiosInstance = axios.create({
  baseURL: process.env.LIVE_COIN_WATCH_BASE_URL,
  timeout: 10000,
  headers: {
    'x-api-key': process.env.LIVE_COIN_WATCH_API_KEY,
    'content-type': 'application/json'
  }
});

class CoinService {

  //get all coins
  public getAllCoins = async (): Promise<ICoin[]> => {
    const data = await Coin.find();
    return data;
  };

  //create new coins
  public newCoin = async (): Promise<ServiceResponse> => {
    try {
      const coinsList = await liveCoinWatchAxiosInstance.post('/coins/list', {
        "currency": "USD",
        "sort": "rank",
        "order": "ascending",
        "meta": true
      });
      await Coin.insertMany(coinsList.data, {ordered: false});
      return {
        success: true,
        data: [],
        message: "Coins added Successfully"
      };
    } catch (error) {
      console.log(`error:- ${error}`);
      return {
        success: false,
        data: [],
        message: error.message
      }
    }
  };

  //get a single coin
  public getCoin = async (_id: string): Promise<ICoin> => {
    const data = await Coin.findById(_id);
    return data;
  };
}

export default CoinService;
