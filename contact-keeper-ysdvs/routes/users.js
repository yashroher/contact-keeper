const express = require('express')
const route = express.Router()
const {check,validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const Users = require('../model/Users');
const config = require("config");
const jwt = require("jsonwebtoken");

//@route POST api/users
//@desc register a user
//@acces public

route.post('/',[check('name','Please add name').not().isEmpty(),
    check('email',"Please add email").isEmail(),check("password","Please enter a password with 6 or more char").isLength({min : 6})],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {name,email,password} = req.body;

    try{
        
        let user = await Users.findOne({email})
        if(user){
            return res.status(400).json({msg : "User already exists"});
        }

        user = new Users({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();
        
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
        console.error(err.message)
        res.status(500).send("Server error");
    }
});

module.exports = route;