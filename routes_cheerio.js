module.exports = function(app){

var request = require('request');
var cheerio = require('cheerio');
var url = '';

	// get all the plots
	app.get('/api/search',function(req, res) {
		var q = req.body;
		console.log(q);
		////
		url = 'https://www.youtube.com/results?search_query='+q;
  
		request(url, function(error,response, html){
			if(!error){
			  var $ = cheerio.load(html);
			  var link, links = [], video_url, kwstr;
			  var json = {}
			  
			  setTimeout(function(){
				$('#results .item-section').filter(function(){
				    var data = $(this);
				    //link = data.children('li').find('h3').find('a').attr('href');
				    $(data).children().each(function(index, el){
				    	link = $(el).find('h3.yt-lockup-title').find('a').attr('href');
				    	links.push(link);
				    	console.log(link);
				  	});
			  	});
			  },2000);
			  
			
			// fs.writeFile('output.json',JSON.stringify(json,null,4),function(err){
			//   console.log('File successfully written! - Check your project directory for the output.json file');
			// });
			
			//res.send(links);
			}
		////
		});
	
		// getKeywords
		// // GET EACH VIDEO'S KEYWORDS
		// video_url = 'https://www.youtube.com'+link;
		
		// request(video_url, function(verror,vresponse, vhtml){
		// 	if(!verror){
		// 		var $$ = cheerio.load(vhtml);
		// 		$$('div#player-mole-container').first().filter(function(){
		// 			var data = $$(this);
		// 			kwstr = $$(data).find('script').eq(1).html();
		// 			//console.log(kwstr);
		// 			kwstr = kwstr.split('"keywords":"');
		// 			kwstr = kwstr[1].split('"');
		// 			kwstr = kwstr[0];
		// 			//.match(/\"keywords\"\:\"*\"/);
		// 			console.log(kwstr,'\n----------------------------------------------------------------');
		// 		});
				
		// 	}
		// });
	
	});



/////////////////////////

	// middleware to use for all requests
	app.use(function(req, res, next) {
		next();
	});

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	app.get('/api', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// allows us to use angular for views
	app.get('*', function(req, res) {
	  res.sendFile('index.html',{root: __dirname+'/app'}); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	
};