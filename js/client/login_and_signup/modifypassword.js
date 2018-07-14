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
    })
}

// the function validate will be executed when the html file will be completely parsed
$(document).ready(validate);

function hasUpperCase(password){
    for(var i = 0; i < password.length; i++){
        if(password[i] === password[i].toUpperCase()){
            return true;
        }
    }
    return false;
}