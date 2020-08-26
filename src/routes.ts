import { Router } from 'express';

import ProductController from './modules/products/controllers/ProductController'

const router = Router();
const productController = new ProductController;


router.get('/', function (_, res) {
  res.json({
    msg:
      'Welcome to API, to kwow details acess: ' +
      'https://github.com/PedroFelli/',
  });
});

router.post('/products', productController.create);

export default router;
