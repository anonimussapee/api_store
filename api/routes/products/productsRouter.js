import {ProductsService } from '../../services/productService.js';
import { validatorHandler } from '../../middlewares/validatorHandler.js';
import {createProductSchema, putProductSchema, patchProductSchema, getProductSchema, deleteProductSchema} from '../../schemas/productSchema.js';
import express from 'express';

const productRouter = express.Router();

const service = new ProductsService();

productRouter.get('/', async(req, res, next)=>{
  try {

    const {limit, offset} = req.query;
    if(limit && offset){
      const prodLimitOffset = await service.findLimitOffset(limit,offset);
      res.status(200).json(prodLimitOffset);
      res.end();
    }else{
      const listFind = await service.find();
      res.status(200).json(listFind);
      res.end();

    }
  } catch (error) {
    next(error);
  }

});

// para desplegar un solo producto por el id
productRouter.get('/:id',
validatorHandler(getProductSchema, 'params'),
async(req, res, next)=>{
  try {

    const {id} = req.params;
    const product = await service.findOne(id);
      res.status(200).json(product);
      res.end();
  } catch (error) {
    next(error);
  }

});

productRouter.post('/',
validatorHandler(createProductSchema, 'body'),
async(req, res, next)=>{
  try {

    const body = req.body;
    const posted =  await service.create(body);
    res.status(201).json({
      message: 'created',
      data : posted,
      id: posted.id
    });
    res.end();

  } catch (error) {
    next(error);
  }

})

productRouter.put('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(putProductSchema, 'body'),
async(req, res, next)=>{

  try {

    const {id} = req.params;

    const body = req.body;
    const productPut = await service.update(body,id);
    res.status(200).json({
      message: 'update',
      data: productPut,
    });
    res.end();

  } catch (error) {
    next(error);
  }

})


productRouter.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(patchProductSchema, 'body'),
async(req, res, next)=>{

  try {

    const {id} = req.params;

    const body = req.body;
    const productCreated = await service.patch(body, id);
    res.status(200).json({
      message: 'patch successfull',
      data: productCreated,
      id
    });
    res.end();

  } catch (error) {
    next(error);
  }
})



productRouter.delete('/:id',
validatorHandler(deleteProductSchema,'params'),
async(req, res, next)=>{

  try {

    const {id} = req.params;

    const productDelete = await service.delete(id) ;
    res.status(200).json({
        message: 'delete',
        data:productDelete
      })
      res.end();

  } catch (error) {
    next(error);
  }


})





export default productRouter;
