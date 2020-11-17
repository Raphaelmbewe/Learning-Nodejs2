const router = require('express').Router();
const User = require('../model/User');
const varify = require('./privateroutes');


router.get('/',varify,(req,res)=>{
res.send(req.user);
User.findById({_id: req.user});
    
});


module.exports = router;