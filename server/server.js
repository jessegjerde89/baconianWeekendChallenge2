// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = 5000;
let history = [];

// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
}); // end server up

// routes
app.post( '/calculate', ( req, res ) =>{
    console.log( '/calculate POST hit:', req.body );
    let answer;
    if( req.body.operator === '-'){
        answer = req.body.num0 - req.body.num1;
    }
    else if( req.body.operator === '*'){
        console.log( 'multiplication' )
        answer = req.body.num0 * req.body.num1;
    }
    else if( req.body.operator === '/'){
        console.log( 'division' )
        answer = req.body.num0 / req.body.num1;
    }
    else{
        console.log( 'addition' )
        answer = Number( req.body.num0 ) + Number( req.body.num1 );
    }
    console.log( 'answer:', answer );
    history.push( req.body.num0 + req.body.operator + req.body.num1 + '=' + answer );
    res.send( { answer: answer } );
}) // end /calculate POST

app.get( '/history', ( req, res )=>{
    console.log( '/history GET hit' );
    res.send( history );
}) // end /history GET
