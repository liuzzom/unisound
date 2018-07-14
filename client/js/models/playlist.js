function Playlist(id, name, author, songs, length){
    Object.defineProperties(this, {
        'id' : {
            value : id,
            writable : false
        },

        'name' : {
            value : name,
            writable : false
        },

        'author' : {
            value : author,
            writable : false
        },

        'songs' : {
            value : songs,
            writable : false
        },

        'length' : {
            value : length,
            writable : false
        },

        'addSong': {
			value : function(song){
				this.songs.push(song);
			},
			writable : false
        },
        
		'removeSong': {
			value : function(id){
				var index = this.songs.indexOf(this.songs.find((x) => x.id == id));
				if (index != -1){
					this.songs.splice(index,1);
				}
				else {
					throw new Error ('Playlist.removeSong(' + id + '): No such song having such id');
				}
			},
			writable : false
        },
        
		'removeAllSongs': {
			value : function(){
				this.songs = [];
			}
        }
    });
}