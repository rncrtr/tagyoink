// include dependencies
var express    = require('express');
var app        = express();
var ip          = process.env.IP; 
var port     = process.env.PORT || 8080; // set our port
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var url = 'mongodb://rncrtr:t3rnary23#@ds061370.mlab.com:61370/plotlets';

mongoose.connect(url); 

// parsers
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

require('./routes.js')(app);
// START THE SERVER
// ====================================================
app.listen(port,ip);
console.log('Server running on ' + ip + ' port ' + port);