function validate(){
    // initially hide the password warning message and hide the submit button
    $('.invalid_password').hide();
    $('#submit').hide();
    $('#new_password').on('keyup', function(){
        var pass = $(this).val();
        if( pass.length < 8 || !hasUpperCase(pass) || !(/\d/.test(pass)) ){
            // show the password warning and hide the submit button
            $('.invalid_password').show();
            $('#submit').hide();
        }else{
            // hide the password warning and show the submit button
            $('.invalid_password').hide();
            $('#submit').show();
        }
    });

    // verifica la presenza di caratteri maiuscoli
    function hasUpperCase(password){
        for(var i = 0; i < password.length; i++){
            if(password[i] === password[i].toUpperCase()){
                return true;
            }
        }
        return false;   
    }

    // fa l'hash md5 (possibilità di utilizzare aes) della nuova password
    function encrypt_new() {
        var pass=document.getElementById('new_password').value;
        var hash = CryptoJS.MD5(pass);
        document.getElementById('new_password').value=hash;
        return true;
    }

    // fa l'hash md5 (possibilità di utilizzare aes) della vecchia password
    function encrypt_old() {
        var pass=document.getElementById('old_password').value;
        var hash = CryptoJS.MD5(pass);
        document.getElementById('old_password').value=hash;
        return true;
    }

    // gestisce dell'evento modifica password
    $('#modifypassword_form').on('submit', function(event){
        event.preventDefault();
        encrypt_old();
        encrypt_new();

        var passwords = {
            old_pass : $('#old_password').val(),
            new_pass : $('#new_password').val(),
        };

        // invio della richiesta post
        $.post('/modifypassword', passwords).done(function(){
            // rimozione dei cookie per l'intero sito
            $.cookie('email', '', { expires: -1, path: '/'});
            alert("Password cambiata. accedi di nuovo");
            window.location.href = './index.html';
        }).fail(function(){
            alert('Errore nella modifica della password');
        });
    });
}

// the function validate will be executed when the html file will be completely parsed
$(document).ready(validate);
