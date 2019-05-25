var express = require('express');
var router = express.Router();
const cors = require('cors');
const School = require('../models/school.js') ; 

var app = express()

app.use(cors());
router.all("*", cors());

/* GET home page. */
router.get('/getSchool', function(req, res, next) {
	
School.find({}).sort({createdAt : -1}).exec((err,schoolList)=>{
	if(err){
		return res.send(err) ; 
	}else{
			res.json(schoolList);

	}
})

});


router.post('/addSchool', function(req, res, next) {
	let address = req.body.address ; 
	const schoolSchema = new School({
		name : req.body.name , 
		registerStudent : req.body.registerStudent , 
		address : {
			street : address.street,
			subrub :  address.subrub , 
			postcode : address.postcode,
			state : address.state 
		}
	})
schoolSchema.save((err,data)=>{
	if(err){
		return  res.send(err)
	}else{
	res.json({result : data , message : 'add School Successfully'});

	}
})

});

module.exports = router;
