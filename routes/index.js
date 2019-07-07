var express = require('express');
var router = express.Router();
var cors = require('cors');
var stripe = require('stripe')('sk_test_ZYQncSd0OaFljTBGbBobc7zO00qBScy41v') ; 

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
	throw err ; 
}
res.json({
	success : true , 
	message : 'payment Done'
});
});
});



module.exports = router;
