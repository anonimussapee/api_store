import express from 'express';

const error404 = express.Router();

// para desplegar todas las categorias
error404.get('/', (req, res)=>{

res.status(404).json({
  "message": `Cannot GET ${req.originalUrl }/`,
  "error": "Not Found",
  "statusCode": 404
})

});


export default error404;
