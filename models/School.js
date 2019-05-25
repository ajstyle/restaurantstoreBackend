'use strict'

const mongoose = require('mongoose') ; 

const schema = new mongoose.Schema({
   name : String , 
   registerStudent : Number , 
   address : {
   	street : String , 
   	subrub : String ,
   	postcode : String , 
   	state : String , 

   } 
});

module.exports = mongoose.model('School', schema);