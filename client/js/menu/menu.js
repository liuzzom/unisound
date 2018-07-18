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
