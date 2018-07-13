var express = require('express')
var app = express();

app.use(express.static('./'));

app.listen(3000, function(error){
  if(error) throw error;
  console.log("server in ascolto sulla porta 3000");
});