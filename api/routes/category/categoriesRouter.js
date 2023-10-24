import { CategoriesService } from '../../services/categoryService.js';
import {createCategorySchema, putCategorySchema, patchCategorySchema, getCategorySchema, deleteCategorySchema} from '../../schemas/categorySchema.js';
import { validatorHandler } from '../../middlewares/validatorHandler.js';
import express from 'express';

const service = new CategoriesService();

const categoriesRouter = express.Router();

// para desplegar todas las categorias
categoriesRouter.get('/', async (req, res, next)=>{
  const {limit, offset} = req.query;
  if(limit && offset){

    const catLimitsOffset = await service.findLimitOffset(limit,offset);
    res.status(200).json(catLimitsOffset);
    res.end();

  }else{
    try {

      res.status(200).json(await service.find());
      res.end();

    } catch (error) {
      next(error)
    }

  }

});

// para desplegar una categoria por su id
categoriesRouter.get('/:id',
validatorHandler(getCategorySchema, 'params'),
async (req, res, next)=>{
  try {

    const {id} = req.params;
    const category = await service.findOne(id);
    res.status(200).json(category);

  } catch (error) {
    next(error);
  }

});

// para desplegar los productos que hay en una categoria
categoriesRouter.get('/:id/products',
validatorHandler(getCategorySchema, 'params'),
async (req, res, next)=>{

  try {

    const {id} = req.params;

    const productsByCategory = await service.filterForCategory(id);
    res.status(200).json(productsByCategory);

  } catch (error) {
    next(error)
  }


});

categoriesRouter.post('/',
validatorHandler(createCategorySchema, 'body'),
async (req, res, next)=>{
  try {

    const body = req.body;
    const categoryposted = await service.create(body);
    res.status(201).json({
    message: 'post successfull',
    data: categoryposted,
    });

  } catch (error) {
    next(error);
  }


});

categoriesRouter.put('/:id',
validatorHandler(getCategorySchema,'params'),
validatorHandler(putCategorySchema, 'body'),
async (req, res, next)=>{

  try {
    const {id} = req.params;
    const body = req.body;
    const category = await service.update(body, id);
    res.status(201).json({
      message: 'update successfull',
      data: category
    });

  } catch (error) {
    next(error);
  }

});

categoriesRouter.patch('/:id',
validatorHandler(getCategorySchema, 'params'),
validatorHandler(patchCategorySchema, 'body'),
async (req, res, next)=>{

  try {

    const {id} = req.params;
    const body = req.body;
    const categorypatched = await service.patch(body, id);
    res.status(201).json({
      message: 'patch successfull',
      data: categorypatched
    });
  } catch (error) {
    next(error);
  }


});

categoriesRouter.delete('/:id',
validatorHandler(deleteCategorySchema, 'params'),
async (req, res, next)=>{

  try {

    const {id} = req.params;
    const categoryDeleted =await service.delete(id);
    res.status(200).json({
      message: 'delete successful',
      id:categoryDeleted
    });

  } catch (error) {
    next(error);
  }


});

export default categoriesRouter;
