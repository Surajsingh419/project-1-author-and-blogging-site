const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

//const middlewareGlobal=require('./middlewares/globalMiddleware.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

/*Middleware Global */
//app.use(middlewareGlobal.captureInfo)

mongoose.connect("mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/SubhadipaBanerjee_db?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 3000'))
    .catch(err => console.log(err))


app.use('/', route);//special kind of middleware where we terminate req and res
//app.use(middlewareGlobal.captureInfo)

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});