const Joi = require('@hapi/joi');



//Validation
const registerValidation = (data) => {
   const  schema = Joi.object().keys( {
        name:Joi.string().trim().min(6).required(),
        email:Joi.string().trim().min(6).required().email(),
        password:Joi.string().min(6).required()
      });

    return  Joi.validate(data,schema);
}

const loginValidation = (data) => {
    const  schema = Joi.object().keys( {
         email:Joi.string().trim().min(6).required().email(),
         password:Joi.string().min(6).required()
       });

       return  Joi.validate(data,schema);
    }
module.exports.loginValidation = loginValidation;    
module.exports.registerValidation = registerValidation;