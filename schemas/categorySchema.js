import Joi from 'joi';

const id = Joi.string().id();
const name = Joi.string().min(3).max(15);
const image = Joi.string();


const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const putCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const patchCategorySchema = Joi.object({
  name: name,
  image: image,
});

const getCategorySchema = Joi.object({
  id: id.required()
});

const deleteCategorySchema = Joi.object({
  id: id.required()
});

export {createCategorySchema, putCategorySchema, patchCategorySchema, getCategorySchema, deleteCategorySchema};
