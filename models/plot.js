var mongoose = require('mongoose');
module.exports = mongoose.model('Plot', {
    name: String,
    desc: String
});