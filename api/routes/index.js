import express from 'express';

import  productRouter from './products/productsRouter.js';
import  categoriesRouter from './category/categoriesRouter.js';
import  userRoutes from './users/userRouter.js';
import  firstRoutes from './first/firstRouter.js';
import error404 from './error/error.js';


function routerApi(app){

  const router = express.Router()

  app.use('/api/v1', router);

  router.use('/', firstRoutes);

  router.use('/products', productRouter);

  router.use('/categories', categoriesRouter);

  router.use('/users', userRoutes);

  router.use('/*', error404);


}

export {routerApi};

