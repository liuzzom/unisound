function menuToggle(){
    // flag per consentire la visualizzazione dei pannelli
    var playlist_shown = false, friends_shown = false;
    // variabile che memorizza il brano corrente
    var current_song = undefined;
    // array che memorizza la coda di riproduzione
    var playing_queue = undefined;
    // memorizza l'indice della canzone corrente nella coda di riproduzione
    var current_song_index = undefined;

    // inizializzazione della coda di riproduzione e della canzone corrente
    init();

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

    // creazione della lista delle playlist senza il brano
    function showPlaylistsWithoutThis(response, song_id, song_length){
        if($(window).width() > 800){
            alert("selezionare una delle playlist della sezione a sinistra");
        }

        var list = $('.playlists');
        $(list).empty();
        for(let i = 0; i < response.length; i++){
            // creazione dei vari elementi html
            var item = document.createElement("LI");
            var div = document.createElement("DIV");
            var span = document.createElement("SPAN");
            var img = document.createElement("IMG");

            // coversione della lunghezza della playlist in mm : ss
            var minutes = Math.floor(response[i].length / 60);
            var seconds = response[i].length - minutes * 60;
            if(minutes < 10){
                minutes = "0" + minutes;
            }
            if(seconds < 10){
                seconds = "0" + seconds;
            }
            var length = minutes + ":" + seconds; 
        
            // impostazione dei dati negli elementi html
            var name = document.createTextNode(response[i].name + " (" + length + ")");
            $(span).append(name);
            $(img).attr('src', '../../images/plus_white.png');

            // gestione del click sul pulsante di aggiunta alla playlist
            img.addEventListener('click', function(event){
                event.preventDefault();

                var data = {
                    playlist_id : response[i].playlist_id,
                    song_id : song_id,
                    song_length : song_length
                };

                $.post('/addToPlaylist', data).done(function(){
                    alert("Canzone inserita nella playlist");
                    // nella schermata mobile, chiude la sezione playlist
                    if($(window).width() <= 800){
                        $('.playlist_button').click();
                    }
                    getPlaylists();
                }).fail(function(){
                    alert("Errore nell'inserimento nella playlist");
                });
            });

            // "assemblaggio" degli elementi
            $(list).append(item);
            $(item).append(div);
            $(div).append(span);
            $(div).after(img);
        }        
    }

    // creazione della lista delle playlist con il brano
    function showPlaylistsWithThis(response, song_id, song_length){
        if($(window).width() > 800){
            alert("selezionare una delle playlist della sezione a sinistra");
        }

        var list = $('.playlists');
        $(list).empty();
        for(let i = 0; i < response.length; i++){
            // creazione dei vari elementi html
            var item = document.createElement("LI");
            var div = document.createElement("DIV");
            var span = document.createElement("SPAN");
            var img = document.createElement("IMG");

            // coversione della lunghezza della playlist in mm : ss
            var minutes = Math.floor(response[i].length / 60);
            var seconds = response[i].length - minutes * 60;
            if(minutes < 10){
                minutes = "0" + minutes;
            }
            if(seconds < 10){
                seconds = "0" + seconds;
            }
            var length = minutes + ":" + seconds; 
        
            // impostazione dei dati negli elementi html
            var name = document.createTextNode(response[i].name + " (" + length + ")");
            $(span).append(name);
            $(img).attr('src', '../../images/minus_white.png');

            // gestione del click sul pulsante di aggiunta alla playlist
            img.addEventListener('click', function(event){
                event.preventDefault();

                var data = {
                    playlist_id : response[i].playlist_id,
                    song_id : song_id,
                    song_length : song_length
                };

                $.post('/removeFromPlaylist', data).done(function(){
                    alert("Canzone rimossa dalla playlist");
                    // nella schermata mobile, chiude la sezione playlist
                    if($(window).width() <= 800){
                        $('.playlist_button').click();
                    }
                    getPlaylists();
                }).fail(function(){
                    alert("Errore nella cancellazione dalla playlist");
                });
            });

            // "assemblaggio" degli elementi
            $(list).append(item);
            $(item).append(div);
            $(div).append(span);
            $(div).after(img);
        }        
    }

    // creazione della lista delle canzoni
    function fillSongsList(response){
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
            var add_to = document.createElement("DIV");
            var remove_from = document.createElement("DIV");

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

            // gestisce la pressione del tasto play
            play.addEventListener('click', function(event){
                event.preventDefault();

                current_song = response[i];
                $.cookie('current_song', JSON.stringify(current_song), { expires: 1, path: '/' });

                playing_queue = response;
                $.cookie('playing_queue', JSON.stringify(playing_queue), { expires: 1, path: '/' });

                current_song_index = i;

                $('#song_name').html(response[i].title);
                $('#author').html(response[i].artist);
                $('#album').html(response[i].album);

                var audio = document.getElementById('streaming_bar');
                audio.src = response[i].path;
                audio.play();
            });

            // gestisce la pressione del tasto aggiungi a playlist
            aggiungiAPlaylist.addEventListener('click', function(){
                console.log("premuto il tasto aggiungi");
                if($(window).width() <= 800){
                    $('.playlist_button').click();
                }

                var song_id = response[i].song_id;
                var song_length = response[i].length;
                var data = {
                    song_id : response[i].song_id
                };

                $.post('/getPlaylistsWithoutThis', data).done(function(response){
                    showPlaylistsWithoutThis(response, song_id, song_length);
                }).fail(function(){
                    alert("Errore");
                });
            });

             // gestisce la pressione del tasto rimuovi da playlist
             rimuoviDaPlaylist.addEventListener('click', function(){
                console.log("premuto il tasto rimuovi");
                if($(window).width() <= 800){
                    $('.playlist_button').click();
                }

                var song_id = response[i].song_id;
                var song_length = response[i].length;
                var data = {
                    song_id : response[i].song_id
                };

                $.post('/getPlaylistsWithThis', data).done(function(response){
                    showPlaylistsWithThis(response, song_id, song_length);
                }).fail(function(){
                    alert("Errore");
                });
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
            $(rimuoviDaPlaylist).after(add_to);
            $(add_to).after(remove_from);
        }
    }

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
                console.log(response[i]);
                // creazione dei vari elementi html
                var item = document.createElement("LI");
                var div = document.createElement("DIV");
                var span = document.createElement("SPAN");
                var img = document.createElement("IMG");

                // coversione della lunghezza della playlist in mm : ss
                var minutes = Math.floor(response[i].length / 60);
                var seconds = response[i].length - minutes * 60;
                if(minutes < 10){
                    minutes = "0" + minutes;
                }
                if(seconds < 10){
                    seconds = "0" + seconds;
                }
                var length = minutes + ":" + seconds; 

                // impostazione dei dati negli elementi html
                var name = document.createTextNode(response[i].name + " (" + length + ")");
                $(span).append(name);
                $(img).attr('src', '../../images/delete_white.png');

                // getstione eliminazione della playlist
                img.addEventListener('click', function(event){
                    event.preventDefault();

                    var data = {
                        playlist_id : response[i].playlist_id
                    };

                    // richiesta al server per la cancellazione della playlist
                    $.post('/deleteplaylist', data).done(function(){
                        alert("Playlist eliminata");
                        getPlaylists();
                    }).fail(function(){
                        alert('Errore nell\'eliminazione della playlist');
                    });
                });

                // gestione click sulla playlist
                div.addEventListener('click', function(event){
                    event.preventDefault();
                    console.log("Cliccato sulla playlist");

                    var data = {
                        playlist_id : response[i].playlist_id
                    };

                    // richiesta al server dei brani che fanno parte della playlist
                    $.post('/getSongsOfPlaylist', data).done(function(response){
                        fillSongsList(response);
                    }).fail(function(){
                        alert("Errore ottenimento canzoni della playlist");
                    });
                });

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
            
                var length = response[i].length / 60;
                length = length.toFixed(2);

                // impostazione dei dati negli elementi html
                var name = document.createTextNode(response[i].name + " (" + length + ")");
                $(span).append(name);
                $(img).attr('src', '../../images/delete_white.png');

                // getstione eliminazione della playlist
                img.addEventListener('click', function(event){
                    event.preventDefault();

                    var data = {
                        playlist_id : response[i].playlist_id
                    };

                    // richiesta al server per la cancellazione della playlist
                    $.post('/deleteplaylist', data).done(function(){
                        alert("Playlist eliminata");
                        getPlaylists();
                    }).fail(function(){
                        alert('Errore nell\'eliminazione della playlist');
                    });
                });

                // gestione click sulla playlist
                div.addEventListener('click', function(event){
                    event.preventDefault();
                    console.log("Cliccato sulla playlist");

                    var data = {
                        playlist_id : response[i].playlist_id
                    };

                    // richiesta al server dei brani che fanno parte della playlist
                    $.post('/getSongsOfPlaylist', data).done(function(response){
                        fillSongsList(response);
                    }).fail(function(){
                        alert("Errore ottenimento canzoni della playlist");
                    });
                });

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
            fillSongsList(response);
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

                var id = {
                    friend_id : response[i].user_id
                };

                $.post('/verifyfriend', id).done(function(result){
                    // creazione dei vari elementi html
                    var item = document.createElement("LI");
                    var div = document.createElement("DIV");
                    var amico = document.createElement("SPAN");
                    var add = document.createElement("IMG");
                    $(add).attr('src', '../../images/friends_buttons/follow.png');
                    var remove = document.createElement("IMG");
                    $(remove).attr('src', '../../images/friends_buttons/unfollow.png');

                    var online = "offline";
                    if(response[i].online === 1){
                        online = "online";   
                    }

                    // impostazione dei dati negli elementi html
                    var nomeECognome = document.createTextNode(response[i].first_name + " " + response[i].last_name + " (" + online + ")");
                    if(result[0] !== undefined){
                        $(add).hide();
                        $(remove).show();
                    }else{
                        $(remove).hide();
                        $(add).show(); 
                    }
                    $(amico).append(nomeECognome);

                    add.addEventListener('click', function(event){
                        event.preventDefault();

                        var id = {
                            friend_id : response[i].user_id
                        };
                        console.log(id);

                        $.post('/follow', id).done(function(){
                            alert("Adesso segui " + response[i].first_name);
                            $(add).hide();
                            $(remove).show();
                        }).fail(function(){
                            alert("Errore durante il follow: Segui già " +  response[i].first_name);
                        });
                        
                    });

                    remove.addEventListener('click', function(){
                        event.preventDefault();

                        var id = {
                            friend_id : response[i].user_id
                        };
                        console.log(id);

                        $.post('/unfollow', id).done(function(){
                            alert("Hai smesso di seguire " + response[i].first_name);
                            $(remove).hide();
                            $(add).show();
                        }).fail(function(){
                            alert("Errore durante l'unfollow: non segui " +  response[i].first_name);
                        });                        
                    });

                    // "assemblaggio" degli elementi
                    $(list).append(item);
                    $(item).append(div);
                    $(div).append(amico);
                    $(div).after(add);
                    $(add).after(remove);
                }).fail(function(){
                    alert("Errore");
                });
            }
        }).fail(function(){
            console.log("errore nella ricerca dei brani");
        });
    });

    // pressione tasto brano successivo
    $('#next_song').on('click', function(event){
        event.preventDefault();

        if(playing_queue !== undefined && playing_queue.length > 1){
            // aggiornamento del brano corrente e dell'indice
            current_song_index = (current_song_index + 1) % playing_queue.length;
            console.log(current_song_index);

            var audio = document.getElementById('streaming_bar');
            var paused = audio.paused;

            current_song = playing_queue[current_song_index];
            $('#song_name').html(current_song.title);
            $('#author').html(current_song.artist);
            $('#album').html(current_song.album);
            audio.src = current_song.path; 

            if(!paused){
                audio.play();
            }

            $.cookie('current_song', JSON.stringify(current_song), { expires: 1, path: '/' });
        }
    });

    // pressione tasto brano precedente
    $('#prev_song').on('click', function(event){
        event.preventDefault();

        if(playing_queue !== undefined){
            // aggiornamento del brano corrente e dell'indice
            current_song_index = ((current_song_index - 1) + playing_queue.length) % playing_queue.length;
            console.log(current_song_index);

            var audio = document.getElementById('streaming_bar');
            var paused = audio.paused;

            current_song = playing_queue[current_song_index];
            $('#song_name').html(current_song.title);
            $('#author').html(current_song.artist);
            $('#album').html(current_song.album);
            audio.src = current_song.path; 

            if(!paused){
                audio.play();
            }

            $.cookie('current_song', JSON.stringify(current_song), { expires: 1, path: '/' });
        }
    });

    // inizializzazione della pagina
    function init(){
        // ottiene il brano corrente dai cookie lo setta nella streaming bar
        current_song = $.parseJSON($.cookie('current_song'));
        // ottiene la coda di riproduzione dai cookie
        playing_queue = $.parseJSON($.cookie('playing_queue'));


        // se i cookie contengono un brano 
        if(current_song !== undefined){
            $('#song_name').html(current_song.title);
            $('#author').html(current_song.artist);
            $('#album').html(current_song.album);
    
            var audio = document.getElementById('streaming_bar');
            audio.src = current_song.path; 
        }

        // se i cookie contengono una coda di riproduzione
        if(playing_queue !== undefined){
            for(let i = 0; i < playing_queue.length; i++){
                console.log(playing_queue[i]);
            }
        }

        if(current_song !== undefined && playing_queue !== undefined){
            current_song_index = getIndexOf(current_song, playing_queue);
        }

        console.log(current_song_index);
    }

    // se la canzone termina, parte la successiva
    $('#streaming_bar').on('ended', function(event){
        event.preventDefault();
        $('#next_song').click();
        var audio = document.getElementById('streaming_bar');
        audio.play();
    });
}

$(document).ready(menuToggle);

function getIndexOf(current_song, playing_queue){
    for(let i = 0; i < playing_queue.length; i++){
        if(current_song.song_id === playing_queue[i].song_id){
            return i;
        }
    }
    return undefined;
}