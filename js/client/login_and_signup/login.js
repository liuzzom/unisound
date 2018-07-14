function validation(){
    // initially hide the email warning message and hide the submit button
    $('.invalid_mail').hide();
    $('#submit').hide();
    $('#email').on('keyup', function(){
        var mail = $('#email').val();
        if( mail == "" || !(/^[A-za-z0-9\.]+@[A-za-z]+\.[A-za-z]+$/.test(mail)) ){
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

// the function validation will be executed when the html file will be completely parsed
$(document).ready(validation);