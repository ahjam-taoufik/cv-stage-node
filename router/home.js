
const express=require('express');
const router=express.Router();


//Method Get Home page
router.get('/', (_, res) => res.send('Home page'));

module.exports = router