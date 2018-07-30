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

                // verifica se l'utente ha già creato una playlist con il nome desiderato
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

    getPlaylistsWithoutThis : function(response, connection, email, song_id){
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

                connection.query('SELECT *\
                FROM playlists\
                WHERE playlist_id NOT IN (\
                SELECT playlists_playlist_id\
                FROM playlists_has_songs\
                WHERE songs_song_id = '+ song_id + ' ) AND users_user_id = ' + user_id + ';', function(error, result){

                    if(error){
                        console.log("errore nella query ottenimento playlist");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella query ottenimento playlist");
                        return;
                    }

                    // invio di una risposta "affermativa"
                    console.log("canzoni ottenute con successo");
                    response.statusCode = 200;
                    response.json(result);
                    response.end();
                    return;
                });
            }
        });     
    },

    getPlaylistsWithThis : function(response, connection, email, song_id){
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

                connection.query('SELECT * FROM (\
                    SELECT playlists_playlist_id\
                    FROM playlists_has_songs\
                    WHERE songs_song_id =' + song_id + '\
                ) AS subquery JOIN playlists ON subquery.playlists_playlist_id = playlists.playlist_id\
                WHERE users_user_id =' + user_id + ';', function(error, result){

                    if(error){
                        console.log("errore nella query ottenimento playlist");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella query ottenimento playlist");
                        return;
                    }

                    // invio di una risposta "affermativa"
                    console.log("canzoni ottenute con successo");
                    response.statusCode = 200;
                    response.json(result);
                    response.end();
                    return;
                });
            }
        });     
    },

    addToPlaylist : function(response, connection, song_id, playlist_id, song_length){
        // inserimento nella tabella playlist has songs
        connection.query('INSERT INTO playlists_has_songs (`playlists_playlist_id`, `songs_song_id`)\
        VALUES (' + playlist_id + ', ' + song_id + ');', function(error, result){
            if(error){
                console.log("errore nell'inserimento in playlist has songs");
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: errore nell'inserimento in playlist has songs");
                return;
            }

            // ottenimento della playlist a cui modificare la lunghezza
            connection.query('SELECT * FROM playlists WHERE playlist_id = ' + playlist_id + ';', function(error, result){
                if(error){
                    console.log("errore nell'ottenimento id playlist");
                    response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("ERRORE: errore nell'ottenimento id playlist");
                    return;
                }

                var old_length = Number(result[0].length);
                var new_length = Number(old_length) + Number(song_length);

                connection.query('UPDATE playlists SET `length` = ' + new_length + ' WHERE (`playlist_id` = ' + playlist_id + ');', function(error, result){
                    if(error){
                        console.log("errore nella modifica della lunghezza");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella modifica della lunghezza");
                        return;
                    }

                     // invio di una risposta "affermativa"
                    console.log("Brano aggiunto con successo");
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("Brano aggiunto con successo");
                    return;
                });
            });
        });
    },

    removeFromPlaylist : function(response, connection, song_id, playlist_id, song_length){
        // cancellazione dalla tabella playlist has songs
        connection.query('DELETE FROM playlists_has_songs WHERE (`playlists_playlist_id`= ' + playlist_id + ' AND `songs_song_id`= '+ song_id +');', function(error, result){
            if(error){
                console.log("errore nella cancellazione in playlist has songs");
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: errore nella cancellazione in playlist has songs");
                return;
            }

            // ottenimento della playlist a cui modificare la lunghezza
            connection.query('SELECT * FROM playlists WHERE playlist_id = ' + playlist_id + ';', function(error, result){
                if(error){
                    console.log("errore nell'ottenimento id playlist");
                    response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("ERRORE: errore nell'ottenimento id playlist");
                    return;
                }

                var old_length = Number(result[0].length);
                var new_length = Number(old_length) - Number(song_length);

                connection.query('UPDATE playlists SET `length` = ' + new_length + ' WHERE (`playlist_id` = ' + playlist_id + ');', function(error, result){
                    if(error){
                        console.log("errore nella modifica della lunghezza");
                        response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                        response.end("ERRORE: errore nella modifica della lunghezza");
                        return;
                    }

                     // invio di una risposta "affermativa"
                    console.log("Brano rimosso con successo");
                    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    response.end("Brano rimosso con successo");
                    return;
                });
            });
        });
    },
}