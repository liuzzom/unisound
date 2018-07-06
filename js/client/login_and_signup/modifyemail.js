function validation(){
    // initially hide the email warning message and disable the submit button
    $('.invalid_mail').hide();
    $('#submit').hide();
    $('#new_email').on('keyup', function(){
        var mail = $('#new_email').val();
        if( mail == "" || !(/^[A-za-z0-9\.]+@[A-za-z]+\.[A-za-z]+$/.test(mail)) ){
            // show the email warning and disable the submit button 
            $('.invalid_mail').show();
            $('#submit').hide();
        }else{
            // hide the email warning and enable the submit button
            $('.invalid_mail').hide();
            $('#submit').show();
        }
    });
}

// the function validate will be executed when the html file will be completely parsed
$(document).ready(validation)