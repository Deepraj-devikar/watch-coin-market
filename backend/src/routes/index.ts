import express, { IRouter } from 'express';
const router = express.Router();
import coinController from '../controllers/coin.controller';

import coinRoute from './coin.route';

const CoinController = new coinController();
CoinController.newCoin()
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

  return router;
};

export default routes;
