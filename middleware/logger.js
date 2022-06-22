function log(req, res, next) {
  console.log('you passed by logger middleware')
  next()
}

module.exports=log;