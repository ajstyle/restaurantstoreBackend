const mongoose = require('mongoose');

 let mongoDB = 'mongodb+srv://amitjain:amit1992@cluster0-5zwls.mongodb.net/test?retryWrites=true'
 ; 
 mongoose.connect(mongoDB,  {useNewUrlParser: true});
var db = mongoose.connection ; 

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

