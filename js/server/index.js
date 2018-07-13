var express = require('express')
var app = express();

app.use(express.static('/'));

module.exports.start = function() {
    app.listen(3000, function() {
      console.log('Server started on port 3000');
    });
}