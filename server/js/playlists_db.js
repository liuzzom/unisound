module.exports = {

    /**
     * @author Antonino Mauro Liuzzo
     * @description Inserisce una nuova playlist vuota tra quelle dell'utente
     *              Tramite i cookie identifichiamo l'utente che sta creando la playlist
     */
    newPlaylist : function(response, connection, email, name){
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
                console.log(result[0].email + " " + user_id);

                connection.query('SELECT * FROM playlists WHERE name = "' + name + '" and users_user_id = ' + user_id + ';', function(error, result){
                    console.log("query di ottenimento playlist dal db");
                    if(error){
                        console.log("errore nella query di ottenimento playlist dal db");
                        // codice di stato 400 : Bad Request
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: il nome " + name + " è stato già usato");
                        return;
                    }

                    if(result[0] !== undefined){
                        console.log("errore nella query di inserimento playlist nel db");
                        // codice di stato 400 : Bad Request
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: il nome " + name + " è stato già usato");
                        return;
                    }

                    connection.query('INSERT INTO playlists (`name`, `length`, `users_user_id`) VALUES ("' + name + '", 0, ' + user_id + ');', function(error, result){
                        console.log("query di inserimento playlist nel db");
                        if(error){
                            console.log("errore nella query di inserimento playlist nel db");
                            // codice di stato 400 : Bad Request
                            response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                            response.end("ERRORE: il nome " + name + " è stato già usato");
                            return;
                        }
            
                        // invio di una risposta "affermativa"
                        console.log("Playlist creata con successo");
                        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("Playlist creata con successo");
                        return;
                    });
                });
            }
        });
    },

    getPlaylistsByMail : function(response, connection, email){
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
                console.log(result[0].email + " " + user_id);

                connection.query('SELECT * FROM playlists WHERE `users_user_id` =' + user_id + ';', function(error, result){
                    console.log("query ottenimento playlist");
                    if(error){
                        console.log("errore nella query di ottenimento playlist dal db");
                        // codice di stato 400 : Bad Request
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: il nome " + name + " è stato già usato");
                        return; 
                    }

                    // invio di una risposta "affermativa"
                    console.log("Playlist ottenute con successo");
                    response.statusCode = 200;
                    response.json(result);
                    response.end();
                    return;
                });
            }
        });
    },

    searchPlaylists : function(response, connection, email, name){
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
                console.log(result[0].email + " " + user_id);

                connection.query('SELECT * FROM playlists WHERE `users_user_id` =' + user_id + ' AND `name` LIKE "%' + name + '%";', function(error, result){
                    console.log("query ottenimento playlist");
                    if(error){
                        console.log("errore nella query di ottenimento playlist dal db");
                        // codice di stato 400 : Bad Request
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: il nome " + name + " è stato già usato");
                        return; 
                    }

                    // invio di una risposta "affermativa"
                    console.log("Playlist ottenute con successo");
                    response.statusCode = 200;
                    response.json(result);
                    response.end();
                    return;
                });
            }
        });
    },

    deletePlaylist : function(response, connection, playlist_id){
        // prima query che cancella le associazioni tra canzoni e la playlist da eliminare
        connection.query('DELETE FROM playlists_has_songs WHERE `playlists_playlist_id` = ' + playlist_id + ';', function(error, result){
            if(error){
                console.log("errore nella query di eliminazione associazioni");
                // codice di stato 400 : Bad Request
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: il nome " + name + " è stato già usato");
                return; 
            }
            
            // seconda query che cancella la playlist
            connection.query('DELETE FROM playlists WHERE playlist_id = ' + playlist_id + ';', function(error, result){
                if(error){
                    console.log("errore nella query di eliminazione playlist");
                    // codice di stato 400 : Bad Request
                    response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("ERRORE: il nome " + name + " è stato già usato");
                    return; 
                }
                
                // invio di una risposta "affermativa"
                console.log("Playlist eliminata con successo");
                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                response.end("Playlist eliminata con successo");
                return;  
            });
        });
    },

    getSongsOfPlaylist : function(response, connection, playlist_id){
        // query per l'ottenimento dei brani di una playlist
        connection.query('SELECT song_id, title, artist, album, length, path \
        FROM (\
            SELECT songs_song_id FROM playlists_has_songs WHERE playlists_playlist_id = ' + playlist_id + ')\
            AS subquery JOIN songs ON subquery.songs_song_id = songs.song_id;', function(error, result){

            if(error){
                console.log("errore nella query di ottenimento canzoni della playlist");
                // codice di stato 400 : Bad Request
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: il nome " + name + " è stato già usato");
                return; 
            }

            // invio di una risposta "affermativa"
            console.log("canzoni ottenute con successo");
            response.statusCode = 200;
            response.json(result);
            response.end();
            return;
        });
    },
}