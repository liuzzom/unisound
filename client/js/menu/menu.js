function menuToggle(){
    // flag per consentire la visualizzazione dei pannelli
    var playlist_shown = false, friends_shown = false;

    // click al pulsante playlist
    $('.playlist_button').on('click', function(){
        // il pannello degli amici è nascosto, visualizza quello delle playlist
        if(!friends_shown){
            $('.leftpane').slideToggle(400);
            $('.middlepane').slideToggle(400);
            document.getElementById('leftpane').style.height = "100%";
            document.getElementById('leftpane').style.width = "100%";
            if(!playlist_shown){
                playlist_shown = true;
            }else{
                playlist_shown = false;
            }
        }
    });

    // click al pulsante amici
    $('.friends_button').on('click', function(){
        // il pannello delle playlist è nascosto, visualizza quello degli amici
        if(!playlist_shown){
            $('.rightpane').slideToggle(400);
            $('.middlepane').slideToggle(400);
            document.getElementById('rightpane').style.height = "100%";
            document.getElementById('rightpane').style.width = "100%";
            if(!friends_shown){
                friends_shown = true;
            }else{
                friends_shown = false;
            }
        }
    });

    // callback per la media query che mostra i pannelli (ritorno a grandi dimensioni)
    function show_panes(screen_show){
        if(screen_show.matches){
            document.getElementById('leftpane').style.width = "20%";
            document.getElementById('rightpane').style.width = "20%";
            $('.leftpane').show();
            $('.rightpane').show();
        }
    }

    var screen_show = window.matchMedia("(min-width: 800px)");
    show_panes(screen_show); // Call listener function at run time
    screen_show.addListener(show_panes); // Attach listener function on state changes

    // callback per la media query che nasconde i pannelli (ritorno a piccole dimensioni)
    function hide_panes(screen_hide){
        if(screen_hide.matches){
            $('.leftpane').hide();
            $('.rightpane').hide();
        }
    }
    
    var screen_hide = window.matchMedia("(max-width: 800px)");
    hide_panes(screen_hide);
    screen_hide.addListener(hide_panes);

    // ottenimento delle playlist dal db
    getPlaylists();
}

$(document).ready(menuToggle);

// gestione del logout
$('.logout').on('click', function(event){
    event.preventDefault();

    $.get('/logout', function(){
        // rimozione dei cookie per l'intero sito
        $.cookie('email', '', { expires: -1, path: '/'});
        window.location.href = './index.html';
    });
})

// richiesta delle playlist dell'utente
function getPlaylists(){
    // invio di una richiesta get al server
    $.get('/getplaylists', function(response){
        var list = $('.playlists');
        $(list).empty();
        for(let i = 0; i < response.length; i++){
            console.log(response[i].name);
            // creazione dei vari elementi html
            var item = document.createElement("LI");
            var div = document.createElement("DIV");
            var span = document.createElement("SPAN");
            var img = document.createElement("IMG");
            
            // impostazione dei dati negli elementi html
            var name = document.createTextNode(response[i].name);
            $(span).append(name);
            $(img).attr('src', '../../images/delete_white.png');

            // "assemblaggio" degli elementi
            $(list).append(item);
            $(item).append(div);
            $(div).append(span);
            $(div).after(img);
        }
    });
}

// richiesta delle playlist dell'utente
$('.refresh_btn').on('click', function(event){
    event.preventDefault();
    getPlaylists();

});

// ricerca delle playlist
$('.playlist_form').on('submit', function(event){
    event.preventDefault();
     // invio di una richiesta al server

     var data = {
        name : $('#playlist_field').val()
    };

    $.post('/searchplaylists', data).done(function(response){
        var list = $('.playlists');
        $(list).empty();
        for(let i = 0; i < response.length; i++){
            console.log(response[i].name);
            // creazione dei vari elementi html
            var item = document.createElement("LI");
            var div = document.createElement("DIV");
            var span = document.createElement("SPAN");
            var img = document.createElement("IMG");
            
            // impostazione dei dati negli elementi html
            var name = document.createTextNode(response[i].name);
            $(span).append(name);
            $(img).attr('src', '../../images/delete_white.png');

            // "assemblaggio" degli elementi
            $(list).append(item);
            $(item).append(div);
            $(div).append(span);
            $(div).after(img);
        }
    }).fail(function(){
        console.log("errore nella ricerca delle playlist");
    });
});

// ricerca dei brani
$('.song_form').on('submit', function(event){
    event.preventDefault();
    // invio di una richiesta al server

    var data = {
        name : $('#song_field').val()
    };

    $.post('/searchsongs', data).done(function(response){
        var list = $('.songs');
        // cancella un'eventuale lista creata in precedenza
        $(list).empty();
        // ordinamento per nome
        response.sort(function(a, b) {
            var nameA = a.title.toUpperCase(); // ignore upper and lowercase
            var nameB = b.title.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // i nomi devono essere uguali
            return 0;
        });
        
        for(let i = 0; i < response.length; i++){
            console.log(response[i]);

            // creazione dei vari elementi html
            var item = document.createElement("LI");
            var div = document.createElement("DIV");
            var nomeBrano = document.createElement("SPAN");
            var artistaBrano = document.createElement("SPAN");
            var albumBrano = document.createElement("SPAN");
            var play = document.createElement("IMG");
            var aggiungiAPlaylist = document.createElement("IMG");
            var rimuoviDaPlaylist = document.createElement("IMG");

            // impostazione dei dati negli elementi html
            var title = document.createTextNode(response[i].title);
            var artist = document.createTextNode(response[i].artist);
            var album = document.createTextNode(response[i].album);
            $(nomeBrano).append(title);
            $(artistaBrano).append(artist);
            $(albumBrano).append(album);
            $(play).attr('src', '../../images/songs_buttons/play.png');
            $(aggiungiAPlaylist).attr('src', '../../images/songs_buttons/plus_black.png');
            $(rimuoviDaPlaylist).attr('src', '../../images/songs_buttons/minus.png');

            play.addEventListener('click', function(event){
                event.preventDefault();

                $('#song_name').html(response[i].title);
                $('#author').html(response[i].artist);
                $('#album').html(response[i].album);

                // $('#song_path').attr('src', response[i].path);
                var audio = document.getElementById('streaming_bar');
                audio.src = response[i].path;
                audio.play();
            });

            // "assemblaggio" degli elementi
            $(list).append(item);
            $(item).append(div);
            $(div).append(nomeBrano);
            $(nomeBrano).after(artistaBrano);
            $(artistaBrano).after(albumBrano);
            $(div).after(play);
            $(play).after(aggiungiAPlaylist);
            $(aggiungiAPlaylist).after(rimuoviDaPlaylist);
        }
    }).fail(function(){
        console.log("errore nella ricerca dei brani");
    });
});

// ricerca utenti
$('.friend_form').on('submit', function(event){
    event.preventDefault();
    // invio di una richiesta al server

    var data = {
        name : $('#friend_field').val()
    };

    $.post('/searchusers', data).done(function(response){
        var list = $('.friends');
        $(list).empty();
        for(let i = 0; i < response.length; i++){
            console.log(response[i]);

            // creazione dei vari elementi html
            var item = document.createElement("LI");
            var div = document.createElement("DIV");
            var amico = document.createElement("SPAN");
            var addOrRemove = document.createElement("IMG");

            // impostazione dei dati negli elementi html
            var nomeECognome = document.createTextNode(response[i].first_name + " " + response[i].last_name);
            $(addOrRemove).attr('src', '../../images/friends_buttons/follow.png');
            $(amico).append(nomeECognome);

            // "assemblaggio" degli elementi
            $(list).append(item);
            $(item).append(div);
            $(div).append(amico);
            $(div).after(addOrRemove);
        }
    }).fail(function(){
        console.log("errore nella ricerca dei brani");
    });
});