import CoinStat from '../models/coinStat.model';
import { ICoinStat } from '../interfaces/coinStat.interface';
import axios from 'axios';
import { ServiceResponse } from '../interfaces/generic.interface';
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

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

  /**
   * Service to get a coinStat
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getCoinStat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
      res.writeHead(200, headers);
    
      const id = setInterval(() => {
        console.log("log entered");
        
        res.write("data: Deepraj\n\n");
      }, 2000);

      // can use change stream event with server send event
      // for this replica set mongodb database needed 
      const coinStatChangeStream = CoinStat.watch([
        {
          $match: {
            code: req.params.code
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $limit: 20
        }
      ]);

      coinStatChangeStream.on("change", next => {
        res.write("data: Deepraj\n\n");
      })

      req.on('close',async () => {
        // await coinStatChangeStream.close();  
        clearInterval(id);
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CoinStatService;
