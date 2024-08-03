/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import coinStatService from '../services/coinStat.service';

import { Request, Response, NextFunction } from 'express';

class CoinStatController {
  public CoinStatService = new coinStatService();

  /**
   * Controller to get all coinStats available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllCoinStats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CoinStatService.getAllCoinStats();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All coinStats fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a coinStat
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getCoinStat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CoinStatService.getCoinStat(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'CoinStat fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new coinStat
   */
  public newCoinStat = async (): Promise<any> => {
    try {
      const serviceResponse = await this.CoinStatService.newCoinStat();
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

export default CoinStatController;
