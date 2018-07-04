function validation(){
    // initially hide the email warning message and disable the submit button
    $('.invalid_mail').hide();
    $('#submit').prop('disabled', true);
    $('#email').on('keyup', function(){
        var mail = $('#email').val();
        if( mail == "" || !(/^[A-za-z0-9\.]+@[A-za-z]+\.[A-za-z]+$/.test(mail)) ){
            // show the email warning and disable the submit button 
            $('.invalid_mail').show();
            $('#submit').prop('disabled', true); 
        }else{
            // hide the email warning and enable the submit button
            $('.invalid_mail').hide();
            $('#submit').prop('disabled', false);
        }
    });
}

// the function validation will be executed when the html file will be completely parsed
$(document).ready(validation);