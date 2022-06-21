function log(req, res, next) {
  console.log('you passed by here')
  next()
}

module.exports=log;