import express, { IRouter } from 'express';
import coinStatController from '../controllers/coinStat.controller';

class CoinStatRoutes {
  private CoinStatController = new coinStatController();
  private router = express.Router();
  
  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all coinStats
    this.router.get('', this.CoinStatController.getAllCoinStats);

    //route to create a new coinStat
    this.router.post(
      '',
      this.CoinStatController.newCoinStat
    );

    //route to get a single coinStat
    this.router.get(
      '/:code', 
      this.CoinStatController.CoinStatService.getCoinStat
    );

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CoinStatRoutes;
