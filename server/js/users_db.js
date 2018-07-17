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
                response.end("ERROR: l'indirizzo " + email + " è stato già usato");
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
                    response.end("ERROR: errore durante la query di inserimento nel db");
                    return;
                }

                console.log("redirecting alla pagina login");
                // redirecting alla pagina di login
                response.redirect('index.html');
            });
        });
    }
    
}