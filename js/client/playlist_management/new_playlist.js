function newPlaylist(){
    // inizialmente nasconde il messaggio di errore e il pulsante
    $('.invalid_name').hide();
    $('.playlist_submit_button').hide();

    // toggle alla pressione del pulsante 'Nuova Playlist'
    $('.new_playlist_btn').on('click', function(){
        $('.new_playlist').slideToggle(400);
    });

    // controllo validità nome
    $('#new_playlist_name').on('keyup', function(){
        var name = $(this).val();
        if(name == "" || isUsed(name)){
            // nome non valido, viene mostrato l'errore e nascosto il pulsante
            $('.invalid_name').show();
            $('.playlist_submit_button').hide();
        }else{
            // nome valido, viene nascosto l'errore e mostrato il pulsante
            $('.invalid_name').hide();
            $('.playlist_submit_button').show();
        }
    });
}

$(document).ready(newPlaylist);

var usedNames = ['Playlist 1', 'Musica Italiana', 'Trap', 'Death Metal'];

function isUsed(name){
    for(let i = 0; i < usedNames.length; i++){
        if(name === usedNames[i]){
            return true;
        }
    }
    return false;
}