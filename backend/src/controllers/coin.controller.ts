/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import coinService from '../services/coin.service';

import { Request, Response, NextFunction } from 'express';

class CoinController {
  public CoinService = new coinService();

  /**
   * Controller to get all coins available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllCoins = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CoinService.getAllCoins();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All coins fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a coin
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getCoin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CoinService.getCoin(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Coin fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new coin
   */
  public newCoin = async (): Promise<boolean> => {
    try {
      const serviceResponse = await this.CoinService.newCoin();
      if (serviceResponse.success === false) {
        throw {
          code: HttpStatus.SERVICE_UNAVAILABLE,
          message: serviceResponse.message
        };
      }
      return true;
    } catch (error) {
      return false;
    }
  };
}

export default CoinController;
