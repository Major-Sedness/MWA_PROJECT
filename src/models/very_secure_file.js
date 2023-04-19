const { error } = require('jquery');
const mongoose = require('mongoose');
const validator  = require("validator")

const userschema = mongoose.Schema({
    
    name:{
        type:String,
        requried:true,
        minLength:4
    },
    email:{
        type:String,
        requried:true,
        validator(value){
            if(!validator.isEmail(value))
            throw new Error("Invalid Email ID");
        }
    },
    password:{
        type:String,
        requried:true,
        minLength:5
    }
})

//collection
const secure_user = mongoose.model("TOP_SECRET_INFO",userschema);
module.exports = secure_user;