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
const playlists_db = require('./playlists_db.js');
const songs_db = require('./songs_db.js');

// MySQL connection
var mysql = require('mysql');
// connection viene utilizzato per la connesione al db e per le query
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
  if(request.cookies.email){
    console.log("cookie rilevati");
    response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'home.html')); 
    console.log("redirecting sulla home page");
  }else{
    console.log("cookie non rilevati");
    response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html')); 
    console.log("redirecting sulla login page");
  }
});

// richiesta get della schermata home
app.get('/home.html', function(request, response){
  console.log("ricevuta get alla home");
  if(request.cookies.email){
    console.log("cookie rilevati");
    response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'home.html')); 
    console.log("redirecting sulla home page");
  }else{
    console.log("cookie non rilevati");
    response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html')); 
    console.log("redirecting sulla login page");
  }
});

// richiesta get della schermata modifica password
app.get('/modifypassword.html', function(request, response){
  console.log("ricevuta get alla schermata di modifica password");
  if(request.cookies.email){
    console.log("cookie rilevati");
    response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'modifypassword.html')); 
    console.log("redirecting sulla pagina di modifica password");
  }else{
    console.log("cookie non rilevati");
    response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html')); 
    console.log("redirecting sulla login page");
  }
});

// richiesta get della schermata modifica email
app.get('/modifyemail.html', function(request, response){
  console.log("ricevuta get alla schermata di modifica email");
  if(request.cookies.email){
    console.log("cookie rilevati");
    response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'modifyemail.html')); 
    console.log("redirecting sulla pagina di modifica email");
  }else{
    console.log("cookie non rilevati");
    response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'index.html')); 
    console.log("redirecting sulla login page");
  }
});

// richiesta get della schermata di registrazione
app.get('/signup.html', function(request, response){
  console.log("ricevuta get alla schermata di registrazione");
  response.sendFile(path.join(__dirname, prev_dir, prev_dir, client, 'signup.html')); 
  console.log("redirecting sulla signup page");
});

// handler della richiesta post relativa al login
app.post('/login', function(request, response){
  console.log("ricevuta post dal form di login");
  console.log(request.body);

  // dati ricevuti nella richiesta
  var email = request.body.email;
  var password = request.body.password;

   /**
   * @description Query al db per la verifica dei dati e invio risposta al client
   * La defininizione della query si trova nel file users_db
   */
  users_db.login(response, connection, email, password);
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

/**
 * @author Antonino Liuzzo Mauro
 * @author Federico Augello
 * @description handler della richiesta get relativa al logout
 */
app.get('/logout', function(request, response){
  console.log("ricevuta get per il logout");
  console.log(request.cookies.email);

  var email = request.cookies.email;
  // rimuove l'utente dall'elenco degli utenti online e invia la risposta al client
  users_db.logout(response, connection, email); 
});

/**
 * @author Antonino Liuzzo Mauro
 * @author Federico Augello
 * @description handler della richiesta post relativa alla modifica della password
 */
app.post('/modifypassword', function(request, response){
  console.log("ricevuta post del form di registrazione");
  console.log(request.body);

  var email = request.cookies.email;
  var old_pass = request.body.old_pass;
  var new_pass = request.body.new_pass;

  // modifica della password e invio risposta al client
  users_db.modifypassword(response, connection, email, old_pass, new_pass);
});

/**
 * @author Antonino Mauro Liuzzo
 * @author Federico Augello
 * @description handler della richiesta post relativa alla modifica dell'email
 */
app.post('/modifyemail', function(request, response){
  console.log("ricevuta post del form di registrazione");
  console.log(request.body);

  var old_email = request.body.old_email;
  var new_email = request.body.new_email;

  // modifica dell'email e invio risposta al client
  users_db.modifyemail(response, connection, old_email, new_email);
});

/**
 * @author Antonino Mauro Liuzzo
 * @description handler della richiesta post relativa alla creazione di una nuova playlist
 */
app.post('/newplaylist', function(request, response){
  console.log("ricevuta post per la creazione di una nuova playlist");
  console.log(request.body.name);

  var name = request.body.name;
  var email = request.cookies.email;
  // richiesta di creazione di una nuova playlist
  playlists_db.newPlaylist(response, connection, email, name);
});

/**
 * @author Antonino Mauro Liuzzo
 * @author Federico Augello
 * @description handler della richiesta get relativa all'ottenimento delle playlist
 */
app.get('/getplaylists', function(request, response){
  console.log("ricevuta get per le playlist");

  var email = request.cookies.email;
  // query al db per ottenimento delle playlist
  playlists_db.getPlaylistsByMail(response, connection, email);
});

/**
 * @author Antonino Mauro Liuzzo
 * @description handler della ricerca delle playlist
 */
app.post('/searchplaylists', function(request, response){
  console.log("ricevuta get per le playlist");

  var name = request.body.name;
  var email = request.cookies.email;
  // query al db per ottenimento delle playlist
  playlists_db.searchPlaylists(response, connection, email, name);
});

/**
 * @author Antonino Mauro Liuzzo
 * @description handler della ricerca delle canzoni
 */
app.post('/searchsongs', function(request, response){
  console.log("ricevuta post per le canzoni");

  var name = request.body.name;

  //query al db per ottenimento delle canzoni che corrispondono al filtro
  songs_db.searchSongs(response, connection, name);
});

// gestione dei file statici (html, css, js, ecc...)
app.use(express.static('client'));
