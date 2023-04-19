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
    number:{
        type:Number,
        required:true,
        minLength:10
    },
    message:{
        type:String,
        requried:true,
        minLength:5
    }
})

//collection
const User = mongoose.model("User",userschema);
module.exports = User;