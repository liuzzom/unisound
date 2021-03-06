module.exports = {
    /**
     * @author Federico Augello
     * @description gestione della ricerca degli utenti, sia amici che non
     * 
     */
    searchUsers : function(response, connection, name, email){
        // query al db riguardo gli utenti che combaciano con il filtro
        connection.query('SELECT user_id, first_name, last_name, online FROM users \
        WHERE (`first_name` LIKE "%' + name + '%" OR `last_name` LIKE "%' + name + '%") AND `email` != "' + email + '";', function(error, result){
            console.log("query al db per ricerca utenti");
            if(error){
                console.log("errore nella query ricerca utenti");
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: errore nella query ottenimento mail");
                return;
            }

            // invio di una risposta "affermativa"
            console.log("utenti ottenuti con successo");
            response.statusCode = 200;
            response.json(result);
            response.end();
            return;
        });
    },

    /**
     * @author Antonino Mauro Liuzzo
     * @author Federico Augello
     * @description verifica se l'utente segue l'utente identificato da friend_id
     */
    verifyfriend : function(response, connection, email, friend_id){
        // verifichiamo se il db presenta un utente con la mail passata in input
        connection.query('SELECT user_id, email FROM users WHERE email = "' + email + '";', function(error, result){
            console.log("ottenute le mail dal db");
            console.log(result[0]);
            if(error){
                console.log("errore nella query ottenimento mail");
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: errore nella query ottenimento mail");
                return;
            }

            // esiste un utente con la mail passata in input
            if(result[0] !== undefined){
                var user_id = result[0].user_id;

                connection.query('SELECT * FROM friends\
                WHERE followed_id =' + friend_id + ' AND following_id =' + user_id + ';', function(error, result){
                    if(error){
                        console.log("errore nella query verifica amicizia");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella query verifica amicizia");
                        return;
                    }

                    // invio di una risposta "affermativa"
                    console.log("amicizia ottenuta con successo");
                    response.statusCode = 200;
                    response.json(result);
                    response.end();
                    return;
                });
            }
        });
    },

    follow : function(response, connection, email, friend_id){
        // verifichiamo se il db presenta un utente con la mail passata in input
        connection.query('SELECT user_id, email FROM users WHERE email = "' + email + '";', function(error, result){
            console.log("ottenute le mail dal db");
            console.log(result[0]);
            if(error){
                console.log("errore nella query ottenimento mail");
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: errore nella query ottenimento mail");
                return;
            }

            if(result[0] !== undefined){
                var user_id = result[0].user_id;
                console.log("friend id " + friend_id + " user_id " + user_id);

                connection.query('SELECT * FROM friends\
                WHERE followed_id =' + friend_id + ' AND following_id =' + user_id + ';', function(error, result){
                    if(error){
                        console.log("errore nella query verifica amicizia");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella query verifica amicizia");
                        return;
                    }

                    if(result[0] !== undefined){
                        console.log("errore nella query, follow già eseguito");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella query, follow già eseguito");
                        return;
                    }

                    connection.query('INSERT INTO `friends` (`following_id`, `followed_id`) VALUES (' + user_id +',' + friend_id +');', function(error, result){
                        if(error){
                            console.log("errore nella query follow");
                            response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                            response.end("ERRORE: errore nel follow");
                            return;
                        }

                        // invio di una risposta "affermativa"
                        console.log("Follow effettuato con successo");
                        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("Follow effettuato con successo");
                        return;
                    });
                }); 
            }
        });
    },

    unfollow : function(response, connection, email, friend_id){
        // verifichiamo se il db presenta un utente con la mail passata in input
        connection.query('SELECT user_id, email FROM users WHERE email = "' + email + '";', function(error, result){
            console.log("ottenute le mail dal db");
            console.log(result[0]);
            if(error){
                console.log("errore nella query ottenimento mail");
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: errore nella query ottenimento mail");
                return;
            }
            
            if(result[0] !== undefined){
                var user_id = result[0].user_id;
                console.log("friend id " + friend_id + " user_id " + user_id); 

                connection.query('SELECT * FROM friends\
                WHERE followed_id =' + friend_id + ' AND following_id =' + user_id + ';', function(error, result){
                    if(error){
                        console.log("errore nella query verifica amicizia");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella query verifica amicizia");
                        return;
                    }

                    if(result[0] === undefined){
                        console.log("errore nella query, unfollow già eseguito");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella query, unfollow già eseguito");
                        return;
                    }

                    connection.query('DELETE FROM `friends` \
                    WHERE (`following_id`='+ user_id + ' AND `followed_id`=' + friend_id + ');', function(error, result){
                        if(error){
                            console.log("errore nella query unfollow");
                            response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                            response.end("ERRORE: errore nel follow");
                            return;
                        }

                        // invio di una risposta "affermativa"
                        console.log("Unfollow effettuato con successo");
                        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("Unfollow effettuato con successo");
                        return;
                    });
                });
            }
        });
    }
}