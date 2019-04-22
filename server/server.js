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
    res.send( 'meow' );
}) // end /calculate POST

app.get( '/history', ( req, res )=>{
    console.log( '/history GET hit' );
    res.send( history );
}) // end /history GET
