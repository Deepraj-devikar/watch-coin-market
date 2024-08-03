import express, { IRouter } from 'express';
const router = express.Router();
import coinStatRoute from './coinStat.route';
import CoinController from '../controllers/coin.controller';
import CoinStatController from '../controllers/coinStat.controller';
import coinRoute from './coin.route';

const coinController = new CoinController();
coinController.newCoin()
.then(isCoinAdded => {
  if (isCoinAdded) {
    console.log("Coins information added successfully");
  } else {
    console.log("Coins information not added");
  }
})
.catch(error => {
  console.log("Coins information not added");
});

const coinStatController = new CoinStatController();
setInterval(
  async () => {
    coinStatController.newCoinStat()
    .then(isCoinStatAdded => {
      if (isCoinStatAdded) {
        console.log("Coin stat added syuccessfully");
      } else {
        console.log("Coin stat not added");
      }
    })
    .catch(error => {
      console.log("Coin stat not added");
    });
  },
  3000
);

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });

  router.use('/coin', new coinRoute().getRoutes());

  router.use('/coin-stat', new coinStatRoute().getRoutes());
  return router;
};

export default routes;
