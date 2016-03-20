var mongoose     = require('mongoose');
module.exports = mongoose.model('Card',{
	title: String,
	content: String,
	color: String,
	pos: Number
});