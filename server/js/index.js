/**
 * @author Antonino Mauro Liuzzo
 * @author Federico Augello
 */

// import dei moduli
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// numero di porta connessione TCP
var port = 8080;

// configurazione parsing json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// frammenti di path utili
var prev_dir = '..';
var client = 'client';

// messa in ascolto sulla porta specificata
app.listen(port, () => console.log('Server in ascolto sulla porta ' + port));

// richiesta get della main page
app.get('/', function(request, response){
  console.log("ricevuta get alla root");
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html')); 
  console.log("redirecting sulla login page");
});

// richiesta get della schermata home
// to do: in base al parsing dei cookie dare la home page o la login page
app.get('/home.html', function(request, response){
  console.log("ricevuta get alla home");
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html')); 
  console.log("redirecting sulla login page");
});

// richiesta get della schermata modifica password
app.get('/modifypassword.html', function(request, response){
  console.log("ricevuta get alla schermata di modifica password");
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html')); 
  console.log("redirecting sulla login page");
});

// richiesta get della schermata modifica email
app.get('/modifyemail.html', function(request, response){
  console.log("ricevuta get alla schermata di modifica email");
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html')); 
  console.log("redirecting sulla login page");
});

// richiesta get della schermata di registrazione
app.get('/signup.html', function(request, response){
  console.log("ricevuta get alla schermata di resgistrazione");
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'signup.html')); 
  console.log("redirecting sulla signup page");
});

// richiesta post alla schermata home
// invocata durante il login
app.post('/home.html', function(request, response){
  console.log("ricevuta post alla schermata di home");
  console.log(request.body);
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'home.html')); 
  console.log("redirecting sulla home");
});

app.post('/index.html', function(request, response){
  console.log("ricevuta post alla schermata di home");
  console.log(request.body);
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html'));
  console.log("redirecting sulla root"); 
});

// gestione dei file statici (html, css, js, ecc...)
app.use(express.static('client'));