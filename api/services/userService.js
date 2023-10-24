import boom from '@hapi/boom';
import { users } from '../content/index.js';
import {idGen} from '../idGen/index.js';

class UsersService {

  constructor (){

    this.users = users;
  }

  async create(obj){
    return new Promise((resolve, reject) => {

      let newid;
      idGen(this.users, (err,id)=>{
        if(err){
          console.error('no se pudo generar un id para el post users: ', err);
          return false;
        }
        newid = id;
      })
      const newUser = {...obj, id:newid};
      this.users.push(newUser);
      const userCreated = this.users.find(user => user.id == newid);
      if(userCreated){
        resolve(newUser);
      }else{
        // reject(new Error('Bad request'));
        reject(boom.notFound('user not published'))
      }
    });


  }

  async find(){
    return new Promise((resolve, reject) => {
      resolve(this.users);
    });
  }

  async findOne(id){
    return new Promise((resolve, reject) => {
      const user = this.users.find(user => user.id == id);
      if(!user){
        reject(boom.notFound('User not found'));
      }else{
        resolve(user);
      }
    });
  }

  async findLimitOffset(limit,offset){

    return new Promise((resolve, reject) => {
      const userLimitsOffset = this.users.filter(user=> user.id >= offset);
      resolve(userLimitsOffset.slice(0,limit));
    })
  }

  async update(obj, id){

    return new Promise((resolve, reject) => {

      const userFinded = users.find(user => user.id == id);

      if(!userFinded){
        reject(boom.notFound('User not found'));
      }else{
        const userIndex = users.findIndex(user => user.id == id);
        const updateuser = {...obj, id}
        this.users.splice(userIndex, 1, updateuser);
        resolve(updateuser);

      }
    })



  }

  async patch(obj, id){
    return new Promise((resolve, reject) => {

      const userFinded = users.find(user => user.id == id);

      if(!userFinded){
        reject(boom.notFound('User not found'));
      }else{

        const userIndex = users.findIndex(user => user.id == id);
        const newUser = {...userFinded, ...obj, id};
        this.users.splice(userIndex, 1, newUser);
        resolve(obj);

    }
    })


  }


  async delete(id){

    return new Promise((resolve, reject) => {

      const userFinded = users.find(user => user.id == id);

      if(!userFinded){
        reject( boom.notFound('User not found'));
      }else{

        const userIndex = users.findIndex(user => user.id == id);
        this.users.splice(userIndex, 1);
        resolve(userIndex+1);
      }

    });

  }


}

export {UsersService};
