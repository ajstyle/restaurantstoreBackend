var express = require('express');
var router = express.Router();
var cors = require('cors');
var stripe = require('stripe')('sk_test_QzrGei1ds3DmaHr8qEqOEJnw00gs2fsqvs') ; 

var app = express()

app.use(cors());
router.all("*", cors());

/* GET home page. */
router.post('/payme', function(req, res, next) {
	console.log(req.body);
	 let total = Math.round(req.body.total*100); 
	 console.log(total) ; 
var charge = stripe.charges.create({
	amount: total,
	currency: 'usd',
	source : req.body.token
},(err,charge)=>{
	if(err) {
		console.log('error=====',err.raw.message);
		res.status(400).send({
			success : false ,
			message: err.raw.message
	 });
	 
	
	 
}
res.json({
	success : true , 
	message : 'payment Done'
});
});
});



module.exports = router;
