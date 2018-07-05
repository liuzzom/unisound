function validation(){
    // initially hide every warning box and disable the signup button
    $('.warning_box').hide();
    $('.invalid_mail').hide();
    $('#signup').prop('disabled', true);
    
    $('#name').on('keyup', function(){
        var name = $('#name').val();
        if(name = "" || !(/^[A-Za-z]*$/).test(name) ){
            // show the name warning and disable the signup button
            $('.invalid_name').show();
            $('#signup').prop('disabled', true);
        }else{
            // hide the name warning and enable the signup button
            $('.invalid_name').hide();
            $('#signup').prop('disabled', false);  
        }
    });

    $('#surname').on('keyup', function(){
        var name = $('#surname').val();
        if(name = "" || !(/^[A-Za-z]*$/).test(name) ){
            // show the surname warning and disable the signup button
            $('.invalid_surname').show();
            $('#signup').prop('disabled', true);
        }else{
            // hide the surname warning and enable the signup button
            $('.invalid_surname').hide();
            $('#signup').prop('disabled', false);  
        }
    });

    $('#email').on('keyup', function(){
        var mail = $('#email').val();
        if( mail == "" || !(/^[A-za-z0-9\.]+@[A-za-z]+\.[A-za-z]+$/.test(mail)) ){
            // show the email warning and disable the signup button
            $('.invalid_mail').show();
            $('#signup').prop('disabled', true); 
        }else{
            // hide the email warning and enable the signup button
            $('.invalid_mail').hide();
            $('#signup').prop('disabled', false);
        }
    });

    $('#password').on('keyup', function(){
        var pass = $('#password').val();
        if(pass = "" || pass.length < 8 || !hasUpperCase(pass) || !(/\d/.test(pass)) ){
            // show the password warning and disable the signup button
            $('.invalid_pass').show();
            $('#signup').prop('disabled', true);
        }else{
            // hide the password warning and enable the signup button
            $('.invalid_pass').hide();
            $('#signup').prop('disabled', false);
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