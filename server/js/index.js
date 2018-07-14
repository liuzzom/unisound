/**
 * @author Antonino Mauro Liuzzo
 * @author Federico Augello
 */

// import dei moduli
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

var port = 8080;

// configurazione parsing json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// messa in ascolto sulla porta specificata
app.listen(port, () => console.log('Server in ascolto sulla porta ' + port));

// richiesta della main page
app.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../', '../', 'index.html')); 
  console.log("redirecting sulla login page");
});

// to do: in base al parsing dei cookie dare la home page o la login page
app.get('/home.html', function(request, response){
  response.sendFile(path.join(__dirname, '../', '../', 'index.html')); 
  console.log("redirecting sulla login page");
});

app.use(express.static('./'));