import {logErrors, errorHandler, boomErrorHandler } from './middlewares/errorHandler.js';
import { routerApi  } from './routes/index.js';
import cors from 'cors';
import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.on('ready', (res,req)=>{
  res.send('hello')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log(`mi port : http://localhost:${port}/api/v1`);
});






{
  // ruta de raiz

// app.get('/', (req, res)=>{

//   res.send('hola mi server en express');

// });

// // ruta de home

// app.get('/home', (req, res)=>{

//   res.send('<head>  <link rel="icon" href="https://images.pexels.com/photos/18313027/pexels-photo-18313027/free-photo-of-escritorio-mascota-mono-gato.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"><title>api con express</title></head><h1>soy el home</h1>');
// });
}

{// para desplegar todos los productos

// app.get('/products', (req, res)=>{

//   const {limit, offset} = req.query;
//   if(limit && offset){
//     const productsData = [];
//     products.forEach(product =>{
//       if(limit > productsData.length && offset <= product.id ){
//         productsData.push(product);
//       }
//     })
//     res.json(productsData);
//     res.end();
//   }else{

//     res.json(products);
//   }

// });

// // para desplegar un solo producto por el id
// app.get('/products/:id', (req, res)=>{

//   const {id} = req.params;
//   const product = products?.find(prod => prod.id==id );
//   console.log('products by id')
//   res.json(product);

// });

// // para desplegar todas las categorias
// app.get('/categories', (req, res)=>{
//   const {limit, offset} = req.query;
//   if(limit && offset){

//     const categoriesData = [];
//     categories.forEach(category =>{
//       if(categoriesData.length < limit && category.id >= offset){
//         categoriesData.push(category);
//       }
//     })
//     res.json(categoriesData);
//     res.end();
//   }else{

//     res.json(categories);
//   }

// });

// // para desplegar una categoria por su id
// app.get('/categories/:id', (req, res)=>{
//   const {id} = req.params;
//   const category = categories.find(category => category.id == id)
//   res.json(category);

// });

// // para desplegar los productos que hay en una categoria
// app.get('/categories/:id/products', (req, res)=>{

//   const {id} = req.params;

//   const productsByCategory = products.filter(prod => prod.category.id==id );
//   res.json(productsByCategory);

// });


// // esta parte te envia los usuarios y tambien te acepta opcionalmente queries

// app.get('/users', (req, res)=>{
//   const {limit, offset} = req.query;
//   if(limit && offset){

//     let listUsers = [];
//     users.forEach( user =>{
//       if(user.id >= offset && listUsers.length < limit  ){
//         listUsers.push(user);
//       }
//     })

//     res.json(listUsers);
//     res.end();
//   }else{

//     res.json(users);
//   }
// });

// app.get('/users/:id', (req, res)=>{

//   const { id } = req.params;
//   const user = users.find(user =>user.id == id);
//   if(user){

//     res.json(users);
//   }else{
//     res.json({"path":req.url,"timestamp":"2023-10-13T14:53:37.579Z","name":"EntityNotFoundError","message":`Could not find any entity of type \"${req.path.substring(0,req.path.indexOf('/',2)).replace('/', '')}\" matching: {\n    \"id\":${id} \n}`})
//   }

// });
}
