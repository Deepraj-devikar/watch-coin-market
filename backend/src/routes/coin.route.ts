import express, { IRouter } from 'express';
import coinController from '../controllers/coin.controller';

class CoinRoutes {
  private CoinController = new coinController();
  private router = express.Router();
  
  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all coins
    this.router.get('', this.CoinController.getAllCoins);

    //route to get a single coin
    this.router.get('/:_id', this.CoinController.getCoin);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CoinRoutes;
