//importing express
var express = require('express');
var app = express();
//initializing the project
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});
//setting up the server
app.get('/:date?', function(req, res){
	const input = req.params.date;
	const nrinp = parseInt(input);
	var date = nrinp ? new Date(nrinp): input !== '' ? new Date(input) : new Date();

	res.render('timeStamp', {c1:parseUnix(input), c2:parseDate(input)});
});

//function will check if the date input is valid

function checkDate(value){
	if(Object.prototype.toString.call(value) === "[object Date]"){
		return !isNaN(value.getTime());
	}else{
		return false;
	}
}

//function will parse into Unix format if the date is valid

function parseUnix(value){
	var date = null;
	if(!isNaN(value)){
		date= new Date(parseInt(value)*1000);
	} else {
		date = new Date(Date.parse(value));
	}
	return checkDate(date) ? date.getTime()/1000: null;
}

//function will parse into Date format if the date is valid

function parseDate(value){
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var date = null;
	if(isNaN(value)){
		date= new Date(Date.parse(value));
	} else {
		date = new Date(parseInt(value)*1000);
	}

	return checkDate(date) ? months[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear() : null;
}
//this was for me to check which port I am in
var listener = app.listen(process.env.PORT, function(){
	console.log("The port is "+listener.address().port);
});