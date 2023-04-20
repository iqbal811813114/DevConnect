const express=require('express')
const router=express.Router();
const {check,validationResult}=require("express-validator")
const gravatar=require('gravatar')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const config=require('config')
const User = require('../../models/User');

router.post('/',[
    check("name","Name is required").not().isEmpty(),
    check("email","Email is required").isEmail(),
    check("password","Enter a password with 6 or more characters").isLength({min:6})
],async (req,res) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }
    const { name, email , password}= req.body;
    try{
        // see if user exists already
// encrypt password with b crypt
// get users gravatar
// return json web token so that user can logged right away
     let user= await User.findOne({ email });
     if(user){
         res.status(400).json({ errors: [{ msg:'User already exists'}]});
     }
     const avatar=gravatar.url(email,{
         s:'200',
         r: 'pg',
         d: 'mm'
     })
     user= new User({
         name,
         email,
         avatar,
         password
     }) 
     const salt=await bcrypt.genSalt(10);
     user.password= await bcrypt.hash(password,salt);
     await user.save();
     const payload={
         user: {
             id: user.id
         }, 
     };
     jwt.sign(payload,
        config.get('jwtSecret'),
        { expiresIn: 360000},
        (err,token)=>{
         if(err) throw err;
         res.json({token});
     }
    );

    }catch(err){
     console.error(err.messege);
     res.status(500).send('server error');
    }

}) 
module.exports=router;
