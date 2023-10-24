import Joi from 'joi';

const id = Joi.string().id();
const title = Joi.string().min(3).max(15);
const price = Joi.number().min(5);
const description = Joi.string().min(10);
const images = Joi.array();

const categoryId = Joi.object({id: id});

const createProductSchema = Joi.object({
  title: title.required(),
  price: price.required(),
  description: description.required(),
  images: images.required(),
  category: categoryId.required()
});

const putProductSchema = Joi.object({
  title: title.required(),
  price: price.required(),
  description: description.required(),
  images: images.required(),
  category: categoryId.required()
});

const patchProductSchema = Joi.object({
  title: title,
  price: price,
  description: description,
  images: images,
  category:categoryId
});

const getProductSchema = Joi.object({
  id: id.required()
});

const deleteProductSchema = Joi.object({
  id: id.required()
});

export {createProductSchema, putProductSchema, patchProductSchema, getProductSchema, deleteProductSchema};
