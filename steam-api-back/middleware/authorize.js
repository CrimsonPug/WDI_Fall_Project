const jwt = require('jsonwebtoken');

//We export this function so that it can be used in our server.js file
module.exports = (req,res,next) => {
	//look for the token in the body, params and headers of the request
	//our client app places the token in the headers, but we check all 3 just in case
    let token = req.body.token || req.params.token || req.headers['authorization'];
	if (token) {
		//if a token is found, try to verify using our secret key
		jwt.verify(token, 'brainstationkey', function(err, decoded) {          
			if (err) {
				//If the token can't be verified with our secret key
				return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });      
			} else {
				//Store the decoded token in req.decoded so that it will be accessible later on in the endpoint
				req.decoded = decoded;  
				next(); //allow the request to proceed to the next step (in this case, to the endpoint)
			}
		});
		
	} else {
		//if a token was provided, respond with the appropriate message
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
    
};