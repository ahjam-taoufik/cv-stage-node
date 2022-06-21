const express= require('express')
const app=express()

app.get('/',function(req,res){
    res.send('Home page')

})
app.get('/api',function(req,res){
    res.send([
        {id:1,name:'ahmed'},
        {id:2,name:'ali'},
        {id:3,name:'mohamed'},
    ])

})

app.listen(3000,function(){
    console.log('listen at port 3000');
})



