module.exports = {
    /**
     * @author Federico Augello
     * @description gestione della ricerca degli utenti, sia amici che non
     * 
     */
    searchUsers : function(response, connection, name, email){
        // query al db riguardo gli utenti che combaciano con il filtro
        connection.query('SELECT first_name, last_name, online FROM users \
        WHERE `first_name` LIKE "%' + name + '%" OR `last_name` LIKE "%' + name + '%" AND `email` != "' + email + '";', function(error, result){
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

    
}