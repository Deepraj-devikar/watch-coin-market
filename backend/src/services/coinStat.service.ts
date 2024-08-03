import CoinStat from '../models/coinStat.model';
import { ICoinStat } from '../interfaces/coinStat.interface';
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

class CoinStatService {

  //get all coinStats
  public getAllCoinStats = async (): Promise<ICoinStat[]> => {
    const data = await CoinStat.find();
    return data;
  };

  //create new coinStat
  public newCoinStat = async (): Promise<ServiceResponse> => {
    try {
      const coinsList = await liveCoinWatchAxiosInstance.post('/coins/list', {
        "currency": "USD",
        "sort": "rank",
        "order": "ascending",
        "meta": false
      });
      await CoinStat.insertMany(coinsList.data, {ordered: false});
      return {
        success: true,
        data: [],
        message: "Coin stats added Successfully"
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

  //get a single coinStat
  public getCoinStat = async (_id: string): Promise<ICoinStat> => {
    const data = await CoinStat.findById(_id);
    return data;
  };
}

export default CoinStatService;
