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
        if( mail == "" || !(/^[A-za-z0-9\.]+@[A-za-z]+\.[A-za-z]+$/.test(mail)) ){
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