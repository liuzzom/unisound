function Song(id, title, artist, album, length, path){

    Object.defineProperties(this, {
        'id' : {
            value : id,
            writable : false
        },

        'title' : {
            value : title,
            writable : false
        },

        'artist' : {
            value : artist,
            writable : false
        },

        'album' : {
            value : album,
            writable : false
        },

        'length' : {
            value : length,
            writable : false
        },
        
        'path' : {
            value : path,
            writable : false
        }
    });
    
}