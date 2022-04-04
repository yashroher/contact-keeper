const express = require('express')
const route = express.Router()
const {check,validationResult} = require("express-validator")
const Contacts = require('../model/Contacts')
const auth = require("../middleware/auth")
//@route GET api/contacts
//@desc  get all users contact
//@acces private

route.get('/',auth,async (req,res) =>{
    try{
        const contacts = await Contacts.find({user : req.user.id}).sort({date : -1}) 
        res.json(contacts)
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }  
});

//@route POST api/contacts
//@desc  Add a new contact
//@acces private

route.post('/',[auth,[
        check("name","Name is required").not().isEmpty()
    ]],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {name,email,phone,type} = req.body;

    try{
        const newContact = new Contacts({
            name,
            email,
            phone,
            type,
            user : req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});

//@route PUT api/contacts/:id
//@desc  Update contact
//@acces private

route.put('/:id',auth,async (req,res) => {
    const {name,email,phone,type} = req.body;
    const contactField = {};

    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.type = type;

    try{
        let contact = await Contacts.findById(req.params.id);
        if(!contact){
            return res.status(404).json({msg : "Contact Not Found!"});
        }

        if(contact.user.toString() !== req.user.id){
            return res.status(404).json({msg : "Not Authorized"});
        }

        contact = await Contacts.findByIdAndUpdate(req.params.id,
            {$set : contactField},{new : true});
        res.json(contact);

    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});

//@route DELETE api/contacts/:ID
//@desc  Delete contact
//@acces private

route.delete('/:id',auth,async (req,res) => {
    try{
        let contact = await Contacts.findById(req.params.id);
        if(!contact){
            return res.status(404).json({msg : "Contact Not Found!"});
        }

        if(contact.user.toString() !== req.user.id){
            return res.status(404).json({msg : "Not Authorized"});
        }
        await Contacts.findByIdAndDelete(req.params.id);

        res.json({msg : "Contact Deleted Successfully"});

    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = route;