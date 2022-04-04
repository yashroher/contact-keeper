const express = require('express')
const route = express.Router()
const {check,validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const Users = require('../model/Users');
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//@route POST api/auth
//@desc Auth user and get token
//@acces public

route.post('/',[
    check('email',"Please write email").isEmail(),
    check("password","Please write password").exists()
],async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email,password} = req.body
    
    try{
        const user = await Users.findOne({email});
        if(!user){
            return res.status(400).json({msg : "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg : "Invalid Credentials"});
        }

        const payload = {
            user :{
                id : user.id
            }
        }

        jwt.sign(payload,config.get("jwtSecret"),{
            expiresIn : 36000
        },(err,token) => {
            if(err) throw err;
            res.json({token});
        })

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route GET api/auth
//@desc  Get logged in user
//@acces private

route.get('/',auth,async (req,res) =>{
    try{
        const user = await Users.findById(req.user.id).select("-password");
        res.json(user)
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = route;