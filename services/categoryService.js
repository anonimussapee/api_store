import boom from '@hapi/boom';
import { categories, products } from '../content/index.js'
import { idGen } from '../idGen/index.js';
class CategoriesService {

  constructor (){

    this.categories = categories;
    this.products = products;
  }

  async create(obj){
    return new Promise((resolve, reject) => {
      let newId;
      idGen(this.categories, (err,id)=>{
        if(err){
          console.error('hubo un error en generar el id para el port de las categorias: ', err);
          return false;
        }
        newId = id;
      });
      const newCategory = {...obj, id: newId};
      this.categories.push(newCategory);
      if(!this.categories[this.categories.length-1].id == newId){

        reject(boom.badRequest('bad Request'));
      }else{
        resolve(newCategory);
      }

    });

  }

  async find(){
    return new Promise((resolve, reject) => {

      if(!this.categories){
        reject(boom.notFound('Product not found'));
      }else{

        resolve(this.categories);
      }

    })
  }

  async findOne(id){
    return new Promise((resolve, reject) => {
      const category = this.categories.find(category => category.id == id);
      if(!category){
        reject(boom.notFound('Category not found'));
      }else{
        resolve(category);
      }

    })

  }

  async filterForCategory(id){
    return new Promise((resolve, reject) => {
      if(this.categories.some(category => category.id == id)){
        const products = this.products.filter(prod => prod.category.id==id );
        resolve(products);
      }else{
        reject(boom.notFound('Category not found'));
      }
    });
  }

  async findLimitOffset(limit,offset){

    return new Promise((resolve, reject) => {
      const catLimitsOffset = this.categories.filter(category=> category.id >= offset);
      resolve(catLimitsOffset.slice(0,limit));

    })
  }

  async update(obj, id){

    return new Promise((resolve, reject) => {

      const categoryFinded = this.categories.find(category => category.id == id);

      if(!categoryFinded){

        reject(boom.notFound('Category not found'));

      }else{

        const categoryIndex = this.categories.findIndex(category => category.id == id);
        const objCreated = { ...obj, id};
        this.categories.splice(categoryIndex,1,objCreated);
        resolve(objCreated);
      }
    })


  }

  async patch(obj, id){

    return new Promise((resolve, reject) => {

      const categoryFinded = this.categories.find(category => category.id == id);

      if(!categoryFinded){

        reject(boom.notFound('Category not found'))

      }else{

        const categoryIndex = this.categories.findIndex(category => category.id == id);
        const objCreated = {...categoryFinded, ...obj, id};
        this.categories.splice(categoryIndex,1,objCreated);
        resolve(objCreated);

      }
    });

  }

  async delete(id){

    return new Promise((resolve, reject) => {

      const categoryFinded = this.categories.find(category => category.id == id);

      if(!categoryFinded){
        reject(boom.notFound('Category not found'));
      }else{
        const categoryIndex = this.categories.findIndex(category => category.id == id);
        this.categories.splice(categoryIndex, 1)
        resolve(id);
      }
    })


  }


}

export {CategoriesService};
