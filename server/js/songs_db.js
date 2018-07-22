module.exports = {
    /**
     * @author Antonino Mauro Liuzzo
     * @description gestione della ricerca delle canzoni
     */
    searchSongs : function(response, connection, name){
        // query al db riguardo le canzoni che combaciano con il filtro
        connection.query('SELECT * FROM songs \
        WHERE `title` LIKE "%' + name + '%" OR `artist` LIKE "%' + name + '%" OR `album` LIKE "%' + name + '%";', function(error, result){
            console.log("query al db per ricerca brani");
            if(error){
                console.log("errore nella query ricerca brani");
                response.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                response.end("ERRORE: errore nella query ottenimento mail");
                return;
            }

            // invio di una risposta "affermativa"
            console.log("brani ottenuti con successo");
            response.statusCode = 200;
            response.json(result);
            response.end();
            return;
        });
    },   
}