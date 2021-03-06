module.exports = {
    
    /**
     * @author Antonino Mauro Liuzzo
     * @description gestisce la richiesta di aggiunta di un nuovo utente
     * i console log vengono utilizzati per monitorare l'andamento del programma dal server
     */     
    addUser : function(response, connection, first_name, last_name, email, password){
        // verifichiamo se il db presenta un utente con la mail passata in input
        connection.query('SELECT email FROM users WHERE email = "' + email + '";', function(error, result, fields){
            console.log("ottenute le mail dal db");
            console.log(result[0]);
            if(error){
                console.log("errore nella query ottenimento mail");
                // codice di stato 500 : Internal Server Error
                response.sendStatus(500);
                return;
            }
            // esiste un utente con la mail passata in input
            if(result[0] !== undefined){
                console.log("mail inserita già utilizzata");
                // codice di stato 400 : Bad Request
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: l'indirizzo " + email + " è stato già usato");
                return;
            }

            // non ci sono utenti con la mail passata in input
            // si procede all'inserimento del nuovo utente nel db
            connection.query('INSERT INTO users (first_name, last_name, email, password, online) \
            VALUES ("' + first_name + '", "' + last_name + '", "' + email + '", "' + password + '", ' + 0 + ');', function(error, result, fields){
                console.log("inserimento nuovo utente nel db");
                if(error){
                    console.log("errore nella query di inserimento")
                    response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("ERRORE: errore durante la query di inserimento nel db");
                    return;
                }

                console.log("redirecting alla pagina login");
                // redirecting alla pagina di login
                response.redirect('index.html');
            });
        });
    },

    /**
     * @author Antonino Mauro Liuzzo
     * @description gestisce la richiesta di login
     * i console log vengono utilizzati per monitorare l'andamento del programma dal server
     */
    login : function(response, connection, email, password){
        // verifichiamo se le credenziali sono corrispondono a quelle di un utente presente 
        connection.query('SELECT * FROM users \
        WHERE email = "' + email + '" AND password = "' + password + '";', function(error, result, fields){
            console.log("ottenute le informazioni relative agli utenti");
            console.log(result[0]);
            
            if(error){
                console.log("errore nella query ottenimento info");
                // codice di stato 500 : Internal Server Error
                response.sendStatus(500);
                return;
            }    

            // se il primo campo è vuoto non ci sono utenti che corrispondono alle credenziali
            if(result[0] === undefined){
                console.log("mail e password non valide");
                // codice di stato 400 : Bad Request
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: email e password non valide");
                return;
            }

            // le credenziali sono corrette, si setta l'utente definito da esse come utente online
            console.log(result[0].user_id);
            connection.query('UPDATE users SET `online` = 1 WHERE (`user_id` = ' + result[0].user_id + ');', function(error, result, fields){
                if(error){
                    console.log("errore nella query di messa online");
                    // codice di stato 500 : Internal Server Error
                    response.sendStatus(500);
                    return;
                }
            });

            // invio di una risposta "affermativa"
            console.log("login eseguito con successo");
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.end("login eseguito con successo");
            return;
        });
    },
    
    /**
     * @author Antonino Mauro Liuzzo
     * @author Federico Augello
     * @description gestisce la richiesta di logout
     */
    logout : function(response, connection, email){
        connection.query('SELECT * FROM users \
        WHERE email = "' + email + '";', function(error, result, fields){
            console.log("ottenute le informazioni relative agli utenti");
            console.log(result[0]);
            
            if(error){
                console.log("errore nella query ottenimento info");
                // codice di stato 500 : Internal Server Error
                response.sendStatus(500);
                return;
            }
            
            // se il primo campo è vuoto non c'è utente che corrisponde alla mail
            if(result[0] === undefined){
                console.log("mail non valida");
                // codice di stato 400 : Bad Request
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: mail non presente");
                return;
            }

            // le credenziali sono corrette, si setta l'utente definito da esse come utente offline
            console.log(result[0].user_id);
            connection.query('UPDATE users SET `online` = 0 WHERE (`user_id` = ' + result[0].user_id + ');', function(error, result, fields){
                if(error){
                    console.log("errore nella query di messa online");
                    // codice di stato 500 : Internal Server Error
                    response.sendStatus(500);
                    return;
                }
            });

            // invio di una risposta "affermativa"
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            response.end("logout eseguito con successo");
            console.log("logout eseguito con successo");
            return;
        });
    },

    /**
     * @author Antonino Mauro Liuzzo
     * @author Federico Augello
     * @description gestisce la richiesta di modifica della password
     */
    modifypassword : function(response, connection, email, old_pass, new_pass){
        connection.query('SELECT * FROM users \
        WHERE email = "' + email + '" AND password = "' + old_pass + '";', function(error, result, fields){
            console.log("ottenute le informazioni relative agli utenti");
            console.log(result[0]);
            
            if(error){
                console.log("errore nella query ottenimento info");
                // codice di stato 500 : Internal Server Error
                response.sendStatus(500);
                return;
            }
            
            // se il primo campo è vuoto non c'è utente che corrisponde alla mail
            if(result[0] === undefined){
                console.log("mail e password non valide");
                // codice di stato 400 : Bad Request
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: mail non presente");
                return;
            }

            // le credenziali sono corrette, si setta la nuova password dell'utente
            console.log(result[0].user_id);
            connection.query('UPDATE `users`\
            SET `password` = "' + new_pass + '" WHERE (`user_id` = ' + result[0].user_id + ');', function(error, result, fields){
                if(error){
                    console.log("errore nella query di messa online");
                    // codice di stato 500 : Internal Server Error
                    response.sendStatus(500);
                    return;
                }
            });

            // si effettuano le query per il logout
            connection.query('SELECT * FROM users \
            WHERE email = "' + email + '";', function(error, result, fields){
                console.log("ottenute le informazioni relative agli utenti");
                console.log(result[0]);
                
                if(error){
                    console.log("errore nella query ottenimento info");
                    // codice di stato 500 : Internal Server Error
                    response.sendStatus(500);
                    return;
                }
                
                // se il primo campo è vuoto non c'è utente che corrisponde alla mail
                if(result[0] === undefined){
                    console.log("mail non valida");
                    // codice di stato 400 : Bad Request
                    response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("ERRORE: mail non presente");
                    return;
                }
    
                // le credenziali sono corrette, si setta l'utente definito da esse come utente offline
                console.log(result[0].user_id);
                connection.query('UPDATE users SET `online` = 0 WHERE (`user_id` = ' + result[0].user_id + ');', function(error, result, fields){
                    if(error){
                        console.log("errore nella query di messa online");
                        // codice di stato 500 : Internal Server Error
                        response.sendStatus(500);
                        return;
                    }
                    
                    // invio di una risposta "affermativa"
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("logout eseguito con successo");
                    console.log("logout eseguito con successo");
                    return;
                });
            });
        });
    },
    
     /**
     * @author Antonino Mauro Liuzzo
     * @author Federico Augello
     * @description gestisce la richiesta di modifica dell' email
     */
    modifyemail : function(response, connection, old_email, new_email){
        // verifica se un utente utilizza la vecchia email
        connection.query('SELECT * FROM users \
        WHERE email = "' + old_email + '";', function(error, result, fields){
            console.log("ottenute le informazioni relative agli utenti");
            console.log(result[0]);
            
            if(error){
                console.log("errore nella query ottenimento info");
                // codice di stato 500 : Internal Server Error
                response.sendStatus(500);
                return;
            }
            
            // se il primo campo è vuoto non c'è utente che corrisponde alla mail
            if(result[0] === undefined){
                console.log("mail non valida");
                // codice di stato 400 : Bad Request
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: mail non presente");
                return;
            }

            var id = result[0].user_id;
            console.log(id);
            // verifica se un utente utilizza la nuova mail
            connection.query('SELECT * FROM users \
            WHERE email = "' + new_email + '";', function(error, result, fields){
                if(error){
                    console.log("errore nella query ottenimento info");
                    // codice di stato 500 : Internal Server Error
                    response.sendStatus(500);
                    return;
                }

                // se il primo campo è vuoto non c'è utente che corrisponde alla mail
                if(result[0] !== undefined){
                    console.log("mail gia' utilizzata");
                    // codice di stato 400 : Bad Request
                    response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("ERRORE: mail gia' utilizzata");
                    return;
                }
                
                // le credenziali sono corrette, si setta la nuova email dell'utente
                connection.query('UPDATE `users`\
                SET `email` = "' + new_email + '" WHERE (`user_id` = ' + id + ');', function(error, result, fields){
                    if(error){
                        console.log("errore nella query di cambio email");
                        // codice di stato 500 : Internal Server Error
                        response.sendStatus(500);
                        return;
                    }

                    // si effettuano le query per il logout
                    connection.query('SELECT * FROM users \
                    WHERE email = "' + new_email + '";', function(error, result, fields){
                        console.log("ottenute le informazioni relative agli utenti");
                        console.log(result[0]);
                
                        if(error){
                            console.log("errore nella query ottenimento info");
                            // codice di stato 500 : Internal Server Error
                            response.sendStatus(500);
                            return;
                        }
                
                        // se il primo campo è vuoto non c'è utente che corrisponde alla mail
                        if(result[0] === undefined){
                            console.log("mail non valida");
                            // codice di stato 400 : Bad Request
                            response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                            response.end("ERRORE: mail non presente");
                            return;
                        }
    
                        // le credenziali sono corrette, si setta l'utente definito da esse come utente offline
                        console.log(result[0].user_id);
                        connection.query('UPDATE users SET `online` = 0 WHERE (`user_id` = ' + result[0].user_id + ');', function(error, result, fields){
                            if(error){
                                console.log("errore nella query di messa offline");
                                // codice di stato 500 : Internal Server Error
                                response.sendStatus(500);
                                return;
                            }
                            
                            // invio di una risposta "affermativa"
                            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                            response.end("logout eseguito con successo");
                            console.log("logout eseguito con successo");
                            return;
                        });                        
                    }); 
                });
            });
        });
    },
}