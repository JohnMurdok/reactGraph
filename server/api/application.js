import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import request from 'request';
import schema from './graphql';

var app = express();

//Trace connection
app.use("*",function(req,res,next){
	console.info(req.ip + " " + req.originalUrl);
	next();
});

//Cross-origin bypass
app.use(function(req, res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
	// Check if preflight request
	if (req.method === 'OPTIONS') {
		res.status(200);
		res.end();
	}
	else {
		// Pass to next layer of middleware
		next();
	}
});

//Basic Handling error
app.use(function(err, req, res, next) {
  res.status(500).json({
	  error:err.stack
  });
});

// API server route
app.use('/api', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true
})));


//proxify requests
app.use('/proxy', function(req, res) {  
  var url = req.url.replace('/?url=','');
  req.pipe(request(url)).pipe(res);
});

// Connect mongo database
mongoose.connect('mongodb://127.0.0.1/convargo');
module.exports = app;