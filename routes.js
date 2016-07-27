module.exports = function(app){

var osmosis = require('osmosis');
var Q = require('q');
var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyChvX2jm5udV2khPWiREHY0V9Os7Mtuw3w');
    
	var resultCount = 5;

  app.post('/api/search',function(req, res) {
  	var query = req.body.query;
  	//console.log(query);
		if (!query || typeof query!='string'){
			query = 'crazy ryvan';
		}else{
			// var d = Q.defer();
			// return d.promise;
			
			var getResults = function(query){
				var d = Q.defer();
				var searchresults = {};
				youTube.search(query, resultCount, function(error, result) {
					if (error){
						console.log(error);
					}else{
						// console.log(result);
						searchresults = Object.keys(result).map(function(k) { return result[k] });
						//console.log(searchresults);
						d.resolve(searchresults);
					}
				});
				
				return d.promise;
			};
				
			var getEachResult = function(searchresults){
				var d = Q.defer();
				var listing = [];
				searchresults.forEach(function(item){
				    if(typeof item=='object'){
						if(item.length > 2){
							listing = item;
							//console.log(listing);
							d.resolve(listing);
						}
					}
				});
				return d.promise;
			};
				
			var getEachVideoId = function(listing){
				var d = Q.defer();
				var listings = [];
				listing.forEach(function(listitem){
					//console.log(listitem.id.videoId);
					if(listitem.id.kind=='youtube#video'){
						listings.push(listitem.id.videoId);
					}
				});
				d.resolve(listings);
				return d.promise;
			};
			
			var getEachVideoKeywords = function(listings){
				var d = Q.defer();
				var kw = [];
				var cnt = 0;
				var maxCnt = 0;
				listings.forEach(function(listitem){
					if(listitem!='undefined'){
						maxCnt = maxCnt + 1;
						osmosis
							.get('https://youtube.com/watch?v='+listitem)
							.find('meta[name=keywords]')
							.set({'meta':'@content'})
							.data(function(data){
								if(data.meta){
									kw.push(data.meta);
									//console.log(kw);
								}
								cnt = cnt+1;
								//console.log(cnt);
								if(cnt==maxCnt){
									//console.log('resolve this, cnt is '+cnt);
									d.resolve(kw);	
								}else{
									//console.log('cnt is '+cnt+' and maxCnt is '+maxCnt);
								}
							});
					}
						
				});

				return d.promise;
			}
			
			getResults(query)
				.then(getEachResult)
				.then(getEachVideoId)
				.then(getEachVideoKeywords)
				.done(function(values){
					//console.log(values);
					return res.json(values);
				});
			
	} // end if
	
  }); // end api
  
	
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