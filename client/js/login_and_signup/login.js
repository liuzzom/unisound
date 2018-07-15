function validation(){
    // initially hide the email warning message and hide the submit button
    $('.invalid_mail').hide();
    $('#submit').hide();

    var emailOK = false, passOk = false;

    $('#email').on('keyup', function(){
        var mail = $('#email').val();
        if( mail == "" || !(/^[A-Za-z0-9\.\-_]+@[A-Za-z0-9\.\-_]+\.[A-Za-z]+$/.test(mail)) ){
            // show the email warning and hide the submit button 
            $('.invalid_mail').show();
            $('#submit').hide(); 
            emailOK = false;
        }else{
            // hide the email warning and show the submit button
            $('.invalid_mail').hide();
            emailOK = true;
            if(emailOK && passOk){
                $('#submit').show();
            }
        }
    });
    $('#password').on('keyup', function(){
        var pass = $('#password').val();
        if(pass == ""){
            $('#submit').hide();
            passOk = false;
        }else{
            passOk = true;
            if(emailOK && passOk){
                $('#submit').show();
            }
        }
    });
}

// the function validation will be executed when the html file will be completely parsed
$(document).ready(validation);

// fa l'hash md5 (possibilità di utilizzare aes) della password
function encrypt() {
    var pass=document.getElementById('password').value;
    var hash = CryptoJS.MD5(pass);
    document.getElementById('password').value=hash;
    return true;
}