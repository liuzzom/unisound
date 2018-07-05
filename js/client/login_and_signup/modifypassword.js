function validate(){
    // initially hide the password warning message and disable the submit button
    $('.invalid_password').hide();
    $('#submit').prop('disabled', true);
    $('#new_password').on('keyup', function(){
        var pass = $(this).val();
        if( pass.length < 8 || !hasUpperCase(pass) || !(/\d/.test(pass)) ){
            // show the password warning and disable the submit button
            $('.invalid_password').show();
            $('#submit').prop('disabled', true);
        }else{
            // hide the password warning and enable the submit button
            $('.invalid_password').hide();
            $('#submit').prop('disabled', false);
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