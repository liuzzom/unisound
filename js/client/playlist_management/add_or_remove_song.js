// SIMULAZIONE: La funzione deve poi essere fatta in base alla creazione dinamica
// Che Dio (o meglio ancora Cristian) ci aiuti!
function add_or_remove(){
    var add_shown = false, remove_shown = false;

    $('.add_test').on('click', function(){
        if(!remove_shown){
            $('.remove_from').hide();
            $('.add_to').slideToggle(400);
            if(!add_shown){
                add_shown = true;
            }else{
                add_shown = false;
            }
        }
    });

    $('.remove_test').on('click', function(){
        if(!add_shown){
            $('.add_to').hide();
            $('.remove_from').slideToggle(400);
            if(!remove_shown){
                remove_shown = true;
            }else{
                remove_shown = false;
            }
        }
    });
}

$(document).ready(add_or_remove);