function validation(){
    // initially hide every warning box and hide the signup button
    $('.warning_box').hide();
    $('.invalid_mail').hide();
    $('#signup').hide();

    var nameOk = false, surnameOk = false, emailOk = false, passOk = false;
    
    $('#name').on('keyup', function(){
        var name = $('#name').val();
        if(name = "" || !(/^[A-Za-z\s]*$/).test(name) ){
            // show the name warning and hide the signup button
            $('.invalid_name').show();
            $('#signup').hide();
            nameOk = false;
        }else{
            // hide the name warning and show the signup button
            $('.invalid_name').hide();
            nameOk = true;
            if(nameOk && surnameOk && emailOk && passOk){
                $('#signup').show();
            }  
        }
    });

    $('#surname').on('keyup', function(){
        var name = $('#surname').val();
        if(name = "" || !(/^[A-Za-z\s]*$/).test(name) ){
            // show the surname warning and hide the signup button
            $('.invalid_surname').show();
            $('#signup').hide();
            surnameOk = false;
        }else{
            // hide the surname warning and show the signup button
            $('.invalid_surname').hide();
            surnameOk = true;
            if(nameOk && surnameOk && emailOk && passOk){
                $('#signup').show();
            }
        }
    });

    $('#email').on('keyup', function(){
        var mail = $('#email').val();
        if( mail == "" || !(/^[A-Za-z0-9\.\-_]+@[A-Za-z0-9\.\-_]+\.[A-Za-z]+$/.test(mail)) ){
            // show the email warning and hide the signup button
            $('.invalid_mail').show();
            $('#signup').hide();
            emailOk = false; 
        }else{
            // hide the email warning and show the signup button
            $('.invalid_mail').hide();
            emailOk = true;
            if(nameOk && surnameOk && emailOk && passOk){
                $('#signup').show();
            }
        }
    });

    $('#password').on('keyup', function(){
        var pass = $('#password').val();
        if(pass = "" || pass.length < 8 || !hasUpperCase(pass) || !(/\d/.test(pass)) ){
            // show the password warning and hide the signup button
            $('.invalid_pass').show();
            $('#signup').hide();
            passOk = false;
        }else{
            // hide the password warning and show the signup button
            $('.invalid_pass').hide();
            passOk = true;
            if(nameOk && surnameOk && emailOk && passOk){
                $('#signup').show();
            }
        }
    })
}

// the function validate will be executed when the html file will be completely parsed
$(document).ready(validation);

function hasUpperCase(password){
    for(var i = 0; i < password.length; i++){
        if(password[i] === password[i].toUpperCase()){
            return true;
        }
    }
    return false;
}

// fa l'hash md5 (possibilità di utilizzare aes) della password
function encrypt() {
    var pass=document.getElementById('password').value;
    var hash = CryptoJS.MD5(pass);
    document.getElementById('password').value=hash;
    return true;
}

// invio dei dati e gestione della risposta
$('#signup_form').on('submit', function(event){
    event.preventDefault();
    encrypt();
    console.log("click ricevuto");

    var user = {
        fisrt_name : $('#name').val(),
        last_name : $('#surname').val(),
        email : $('#email').val(),
        password : $('#password').val(),
    };

    // richiesta post al server
    $.post('/signup', user)
        .done(function(){
            window.location.href = '/index.html';
        })
        .fail(function(){
            alert('ERRORE: Verifica i dati inseriti e riprova');
        });
});