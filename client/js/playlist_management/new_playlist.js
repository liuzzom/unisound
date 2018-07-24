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
        if(name == ""){
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

// creazione di una nuova playlist
$('.new_playlist').on('submit', function(event){
    event.preventDefault();

    // nome della nuova playlist
    // la mail dell'utente viene recuperata lato server tramite i cookie
    var data = {
        name : $('#new_playlist_name').val(),
    };
    
    $.post('/newplaylist', data).done(function(){
        alert("Playlist creata. Si prega di premere l'apposito pulsante 'refresh'");
        document.getElementById('new_playlist_name').value = "";
    }).fail(function(){
        alert("Errore nella creazione della playlist");
        document.getElementById('new_playlist_name').value = "";
    });    
});
