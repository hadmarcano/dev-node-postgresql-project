function logErrors (err, req, res, next){
  // console.log("logging error");
  // console.error(err);
  next(err);
};

function BoomErrorHandler (err, req, res, next){
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }else{
    next(err);
  }
};

function errorHandler (err, req, res, next){
  // console.log("handling error");
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
};



module.exports = {
  logErrors,
  errorHandler,
  BoomErrorHandler
}
