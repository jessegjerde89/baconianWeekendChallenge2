$( document ).ready( onReady );

function clearInputs(){
    $( '#num0In' ).val( '' );
    $( '#num1In' ).val( '' );
}

function getHistory(){
    // AJAX GET call to /history
    $.ajax({
        type: 'GET',
        url: '/history'
    }).then( function( response ){
        console.log( 'back from GET /history with:', response );
        // loop through response
        // display each on the page
    })
}

function onReady(){
    getHistory();
    $( '#clearInputsButton' ).on( 'click', clearInputs );
}