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
            }
        });
    },

}