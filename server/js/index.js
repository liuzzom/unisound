/**
 * @author Antonino Mauro Liuzzo
 * @author Federico Augello
 */

// import dei moduli per l'utilizzo di express, body-parser, path e cookie-parser
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

// import dei moduli contenenti le query al db
const users_db = require('./users_db.js');

// MySQL connection
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'gruppo5_admin',
  password : 'gruppo5',
  database : 'gruppo5'
});

// connessione al database
connection.connect(function(error){
  if (error) throw new Error('MYSQL: Error while connecting');
  console.log("Connesso al DB");
});

// numero di porta connessione TCP
var port = 8080;

// configurazione parsing json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// utilizzo dei cookie 
app.use(cookieParser());

// frammenti di path utili
var prev_dir = '..';
var client = 'client';

// messa in ascolto sulla porta specificata. Viene eseguita prima dell'esecuzione della connessione al DB
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

// handler della richiesta post relativa al login
app.post('/login', function(request, response){
  console.log("ricevuta post dal form di login");
  console.log(request.body);
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'home.html')); 
  console.log("redirecting sulla home");
});

// handler della richiesta post relativa alla registrazione
app.post('/signup', function(request, response){
  console.log("ricevuta post del form di registrazione");
  console.log(request.body);

  // dati ricevuti nella richiesta
  var fisrt_name = request.body.fisrt_name;
  var last_name = request.body.last_name;
  var email = request.body.email;
  var password = request.body.password;

  /**
   * @description Query al db per l'aggiunta dell'utente e invio risposta al client
   * La defininizione della query si trova nel file users_db
   */
  users_db.addUser(response, connection, fisrt_name, last_name, email, password);
});

// gestione dei file statici (html, css, js, ecc...)
app.use(express.static('client'));