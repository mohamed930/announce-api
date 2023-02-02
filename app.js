const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const r1 = require('.//announce');

// View engine setup
// app.engine('handlebars',exphbs());


// MARK:- TODO:- This Sektion For Body Parse & header cros.
// ------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req,res,next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  	}
  	next();
});
// ------------------------------------------------


// MARK:- TODO:- Add routes
// -------------------------------
app.use('/announce',r1);

// MARK:- TODO:- use morgan library
app.use(morgan('dev'));


// MARK:- TODO:- This Sektion For handle error in server
// --------------------------------------------
app.use((req,res,next) => {
	const error = new Error('Not found!');
	error.status = 404;
	next(error);
})

app.use((error,req,res,next) => {
	res.status(error.status || 500);
	res.json({
		status: '-1',
		error: {
			messageEng : error.message,
			messageAra: 'غير موجود'
		}
	});
});
// --------------------------------------------

module.exports = app;