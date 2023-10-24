function logErrors (err, req, res, next){

  console.log('logerrors');

  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next){

  console.log('errorhandler');

  res.status(500).json({
    message : err.message,
    stack : err.stack,
  })
}

function boomErrorHandler (err, req, res, next){
  console.log("estoy en boomErrorHandler");

  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }else{
    next(err);
  }

}

export {logErrors, errorHandler, boomErrorHandler};
