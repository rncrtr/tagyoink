var Plot = require('./models/plot');
var Card = require('./models/card');
var User = require('./models/user');

module.exports = function(app){

	// get all the plots
	app.get('/api/plots',function(req, res) {
		var userid = req.body.userid;
		Plot.find({'email':userid},function(err, plots) {
			if (err){
			    res.send(err);  
			} 
			res.json(plots);
		});
	});

	// create a plot (accessed at POST http://localhost:8080/plots)
	app.post('/api/plots',function(req, res) {
		var plot = new Plot();		// create a new instance of the Plot model
		plot.name = req.body.name;  // set the plots name (comes from the request)
		plot.desc = req.body.desc;
		plot.save(function(err) {
			if (err){
			    res.send(err);  
			} 
			Plot.find(function(err, plots) {
                if (err){
			        res.send(err);  
			    } 
            res.json(plots);
            });
		});
	})

	app.get('/api/plots/:plot_id',function(req, res){
		Plot.findById(req.params.plot_id, function(err, plot) {
			if (err){
			    res.send(err);  
			} 
			res.json(plot);
		});
	});

	// update the plot with this id
	app.put('/api/plots/:plot_id',function(req, res) {
		Plot.findById(req.params.plot_id, function(err, plot) {
			if (err){res.send(err);}
			plot.name = req.body.name;
			plot.desc = req.body.desc;
			plot.save(function(err) {
				if (err){res.send(err);}
				Plot.find(function(err, plots) {
	        if (err){res.send(err);}
	        res.json(plots);
	      });
				//res.json({ message: 'Plot updated!' });
			});
		});
	});

	// delete the plot with this id
	app.delete('/api/plots/:plot_id',function(req, res) {
		Plot.remove({
			_id: req.params.plot_id
		}, function(err, plot) {
			if (err){
			    res.send(err);  
			}
			// get and return all the todos after you create another
	    Plot.find(function(err, plots) {
	        if (err){
			    res.send(err);  
		    }
	      res.json(plots);
	    });
			//res.json({ message: 'Successfully deleted' });
		});
	});

/// CARDS APIs

	app.get('/api/cards',function(req, res) {
		Card.find(function(err, cards) {
			if (err){
			    res.send(err);  
			} 
			res.json(cards);
		});
	});


	// create a card (accessed at POST http://localhost:8080/cards)
	app.post('/api/cards',function(req, res) {
		var card = new Card();		// create a new instance of the Card model
		card.name = req.body.name;  // set the cards name (comes from the request)
		card.detail = req.body.detail;
		card.image_url = req.body.image_url;
		card.video_code = req.body.videocode;
		card.plotid = req.body.plotid;
		card.save(function(err) {
			if (err){
			    res.send(err);  
			}
			Card.find(function(err, cards) {
    	        if (err){
    			    res.send(err);  
    			}
	        res.json(cards);
	        });
		});
	});

	app.get('/api/cardplot/:plotid',function(req, res) {
		Card.find({'plotid':req.params.plotid},function(err, cards) {
			if (err){
			    res.send(err);  
			}
			res.json(cards);
		});
	});

	// get the card with that id
	app.get('/api/cards/:card_id',function(req, res) {
		Card.findById(req.params.card_id, function(err, card) {
			if (err){
			    res.send(err);  
			}
			res.json(card);
		});
	});

	// update the card with this id
	app.put('/api/cards/:card_id',function(req, res) {
		Card.findById(req.params.card_id, function(err, card) {
			if (err){res.send(err);}
			card.name = req.body.name;
			card.detail = req.body.detail;
			card.image_url = req.body.image_url;
			card.video_code = req.body.video_code;
			card.plotid = req.body.plotid;
			card.save(function(err) {
				if (err){res.send(err);}
				Card.find({'plotid':req.body.plotid},function(err, cards) {
					if (err){
			            res.send(err);  
			        }
					res.json(cards);
				});
			});
		});
	});

	// delete the card with this id
	app.delete('/api/cards/:plot_id/:card_id',function(req, res) {
		Card.remove({
			_id: req.params.card_id
		}, function(err, card) {
			if (err){res.send(err);}

	    Card.find({'plotid':req.params.plot_id},function(err, cards) {
    			if (err){
    			    res.send(err);  
    			}
				res.json(cards);
			});
			//res.json({ message: 'Successfully deleted' });
		});
	});

	app.post('/api/cards/:plotid/sort',function(req, res) {
		var cardspos = req.body.cardspos;
		cardspos = cardspos.split('&');
		var index;
		for (index = 0; index < cardspos.length; index++) {
			(function(index) {
			  setTimeout(function() {
			  	var thiscard = cardspos[index];
					var thiscard_arr = thiscard.split('=');
					var thislen = thiscard_arr[0].length;
					var thiskey = thiscard_arr[0].substr(0,thislen-2);
			  	Card.findById(thiskey,function(err,card){
						if (err){res.send(err);}
						card.position = index;
						card.save(function(err) {
							if (err){res.send(err);}
							console.log('saved model '+card._id);
						});
					});
			  }, 10);
			 })(index);
		}
		// find all cards for plot with newly updated positions
		Card.find({'plotid':req.params.plot_id}).sort({position:1},function(err, cards) {
			if (err){
			    res.send(err);  
			}
			res.json(cards);
		});
	});

	app.post('/api/signup',function(req,res){
		var user = new User();		// create a new instance of the User model
		user.email = req.body.email;
		user.password = req.body.password;
		User.find({'email':user.email},function(err, users) {
			if (err){
			    res.send(err);  
			}
			if(users.length > 0){
				//already there, forward to login
				console.log(users);
			}else{
				//save
				user.save(function(err) {
					if (err){
						res.send(err);  
					}else{
						res.sendStatus(200);
					}
				});
			}
		});
	});

	/* GET login screen. */
	app.post('/api/login', function(req, res) {
		var email = req.body.email;
		var pass = req.body.password;
	    User.find({'email':email,'password':pass},function(err, user) {
			if (err){
			    res.send(err);  
			}else{
				user.status = 200;
				res.json(user);
			}
		});
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