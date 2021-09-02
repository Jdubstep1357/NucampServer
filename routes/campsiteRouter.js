//CONTAINS CODE FOR HANDLING THE REST API ENDPOINTS FOR CAMPSITES AND 
// /CAMPSITESID

//require express in module
const express = require('express');
//sets up new express router
const campsiteRouter = express.Router();

//CONNECTS TO SERVERJS
campsiteRouter.route('/')

//app.all is a routing method that is a catch all for http verbs
.all((req, res, next) => {
    res.statusCode = 200;
    //setHeader -- sending plain text in response body
    res.setHeader('Content-Type', 'text/plain')
    //next passes control of application routing to relevant routing. Without it, the data would just stop here and not go anywhere
    next()
})
//A SEMICOLON SIGNALS END OF STATEMENT

//setting up endpoint for get request for campsites
//tales callback function
.get((req, res) => {
    //response status and header code already set up with app.all on line 14
    res.end('Will send all the campsites to you');
})

//takes information to next relevant information, after going through app.all
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`)
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})

//deletes campsites
.delete((req, res) => {
    res.end('Deleting all campsites')
});





//WEEK 1 WORKSHOP ASSIGNMENT
campsiteRouter.route('/:campsiteId')
.all((req, res, next) => {
    res.statusCode = 200;
    //setHeader -- sending plain text in response body
    res.setHeader('Content-Type', 'text/plain');
    //next passes control of application routing to relevant routing. Without it, the data would just stop here and not go anywhere
    next();
})


.get((req, res) => {
    res.end('Will send all the campsites to you')
})

.delete((req, res) => {
    res.end(`Will send details of whatever it is to you`)
})

.post((req, res) => {
    res.statusCode = 403
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`)
})

.put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`)
});


//exports campsiteRouter
module.exports = campsiteRouter;

