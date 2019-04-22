$( document ).ready( onReady );

let currentEquation = {
    num0: '',
    num1: '',
    operator: ''
}

function clearInputs(){
    currentEquation.num0 = '';
    currentEquation.num1 = '';
    currentEquation.operator = '';
    $( '#calculatorOut' ).val( '0' );
}

function doMath(){
    // get user inputs for num0 & num 1 & put in currentEquation
    console.log( 'currentEquation:', currentEquation );
    // send to server via POST
    $.ajax({
        type: 'POST',
        url: '/calculate',
        data: currentEquation
    }).then( function( response ){
        console.log( 'back from calculate POST with:', response );
        // display answer on DOM
        $( '#calculatorOut' ).val(response.answer);
        // update history
        currentEquation.num0 = '';
        currentEquation.num1 = '';
        currentEquation.operator = '';
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
    $( '.setNumberButton' ).on( 'click', setNumber );
}

function setNumber(){
    console.log( 'in setNumber' );
    if( currentEquation.operator === '' ){
        currentEquation.num0 += $( this ).text();
    }
    else{
        currentEquation.num1 += $( this ).text();
    }
    updateDisplay();
}

function setOperation(){
    console.log( 'in setOperation:', $( this ).text() );
    currentEquation.operator = $( this ).text();
    updateDisplay();
}

function updateDisplay(){
    $( '#calculatorOut' ).val( currentEquation.num0 + currentEquation.operator + currentEquation.num1 );
}