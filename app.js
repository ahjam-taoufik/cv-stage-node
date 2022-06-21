const http = require('http')

const server=http.createServer(function(req, res) {

   if(req.url==='/'){
    res.write('salam alikoum');
    res.end()
   }

   if(req.url==='/api'){
    res.write(JSON.stringify({id:1,name:'taoufik'}));
    res.end()
   }

})

server.listen(3000)
console.log('listing . . . . . . . .');