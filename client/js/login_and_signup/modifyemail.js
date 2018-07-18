function validation(){
    // initially hide the email warning message and hide the submit button
    $('.invalid_mail').hide();
    $('#submit').hide();
    $('#new_email').on('keyup', function(){
        var mail = $('#new_email').val();
        if( !mail || !(/^[A-Za-z0-9\.\-_]+@[A-Za-z0-9\.\-_]+\.[A-Za-z]+$/.test(mail)) ){
            // show the email warning and hide the submit button 
            $('.invalid_mail').show();
            $('#submit').hide(); 
        }else{
            // hide the email warning and show the submit button
            $('.invalid_mail').hide();
            $('#submit').show(); 
        }
    });
}

// the function validate will be executed when the html file will be completely parsed
$(document).ready(validation);

// gestisce dell'evento modifica email
$('#modifyemail_form').on('submit', function(event){
    event.preventDefault();

    var emails = {
        old_email : $('#old_email').val(),
        new_email : $('#new_email').val(),
    };

    // invio della richiesta post
    $.post('/modifyemail', emails).done(function(){
        // rimozione dei cookie per l'intero sito
        $.cookie('email', '', { expires: -1, path: '/'});
        alert("Email cambiata. accedi di nuovo");
        window.location.href = './index.html';
    }).fail(function(){
        alert('Errore nella modifica dell\' email');
    });
});
