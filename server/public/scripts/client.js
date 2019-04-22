$( document ).ready( onReady );

let currentEquation = {
    num0: null,
    num1: null,
    operator: null
}

function clearInputs(){
    $( '#num0In' ).val( '' );
    $( '#num1In' ).val( '' );
    currentEquation.num0 = null;
    currentEquation.num1 = null;
    currentEquation.operator = null;
}

function doMath(){
    // get user inputs for num0 & num 1 & put in currentEquation
    currentEquation.num0 = $( '#num0In' ).val();
    currentEquation.num1 = $( '#num1In' ).val();
    console.log( 'currentEquation:', currentEquation );
    // send to server via POST
    $.ajax({
        type: 'POST',
        url: '/calculate',
        data: currentEquation
    }).then( function( response ){
        console.log( 'back from calculate POST with:', response );
        // display answer on DOM
        $( '#answerOut' ).empty();
        $( '#answerOut' ).append( response.answer );
        // update history
        getHistory();
    })
}

function getHistory(){
    // AJAX GET call to /history
    $.ajax({
        type: 'GET',
        url: '/history'
    }).then( function( response ){
        console.log( 'back from GET /history with:', response );
        let el = $( '#historyOut' );
        el.empty();
        // loop through response
        for( let i=0; i<response.length; i++ ){
            // display each on the page
            el.append( `<p>${ response[i] }</p>`)
        }
    })
}

function onReady(){
    getHistory();
    $( '#clearInputsButton' ).on( 'click', clearInputs );
    $( '#equalsButton' ).on( 'click', doMath );
    $( '.setOperationButton' ).on( 'click', setOperation );
}

function setOperation(){
    console.log( 'in setOperation:', $( this ).text() );
    currentEquation.operator = $( this ).text();
}