const router = require('express').Router();
const User = require('../model/User');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register',async(req, res,)=>{
  //validate data
    const {error} = registerValidation(req.body);
      if(error)return res.status(400).send(error.details[0].message);

  //check if user is already there in the dasabase    

  const emailExist = await User.findOne({ email:req.body.email });
  if(emailExist) return res.status(400).send('Email is already exists');

  //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
  //new user to the data base  
      const user = new User({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword,
   }
   ); 
   try {
  user.save(function(err, result) {
    if (err){
      console.log(err);
    } else {
      res.send({result: user._id})
    }
  });

  } catch (error) {
    res.status(400).send({msg:`this is a bad host ${ error }`});
    
  }
     
});

router.post('/login',async (req,res) =>{
   //validate data
   const {error} = loginValidation(req.body);
   if(error)return res.status(400).send(error.details[0].message);

   //check if email exists   
   const user = await User.findOne({ email:req.body.email });
   if(!user) return res.status(400).send('Email or Password is not okay');

   //password correct
   const validPassword = await bcrypt.compare(req.body.password,user.password);
   if(!validPassword) return res.status(400).send('Invalid password');
  //create and assign token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token',token).send(token);

   //res.send('Logged In')
});


module.exports = router;
