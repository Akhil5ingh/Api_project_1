// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/timestamp/:date_string?',(req, res) => {
  let dateString = req.params.date_string;
  let date;
  
  if(dateString == undefined){
     date = new Date(); 
  }else if ( (date = new Date(dateString)) == 'Invalid Date' ){
     date = new Date(Number(dateString)); 
  }
  
  if(date == 'Invalid Date'){
    res.json({"error" : "Invalid Date"}); 
  }
  
  let result = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
  
  res.send(result);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});