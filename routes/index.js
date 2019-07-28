var express = require('express');
var router = express.Router();
var cors = require('cors');
var stripe = require('stripe')('sk_test_QzrGei1ds3DmaHr8qEqOEJnw00gs2fsqvA') ; 

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

router.get('/stripeTerminalGetToken', function(req, res, next) {

	stripe.terminal.connectionTokens.create().then(	token=>{
		res.status(200).json({
				
				secretToken : token.secret , 
				object : token.object
		});
});


});




router.post('/stripePaymentIntent', function(req, res, next) {
		const total  = Math.round(req.body.total);  
		console.log(total);
(async function() {
  const intent = await stripe.paymentIntents.create({
    amount: total*100,
    currency: 'usd',
    payment_method_types: ['card_present'],
    capture_method: 'manual',
	});
	res.status(200).json({
				
		intent
});
})();
});

router.get('/stripePaymentCapture/:paymentId', function(req, res, next) {
			const params = req.params ; 
			console.log(params.paymentId);
	(async () => {
		await stripe.paymentIntents.capture(params.paymentId);
		res.status(200).json({
				statusCode : '200' , 
				message : 'Payment Capture' 
		});
	})();
});

module.exports = router;
