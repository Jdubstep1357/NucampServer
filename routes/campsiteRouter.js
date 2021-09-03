//CONTAINS CODE FOR HANDLING THE REST API ENDPOINTS FOR CAMPSITES AND 
// /CAMPSITESID

//require express in module
const express = require('express');
//use campsite model that is exported from module
const Campsite = require('../models/campsite');
//sets up new express router
const campsiteRouter = express.Router();

//CONNECTS TO SERVERJS
campsiteRouter.route('/')

//app.all is a routing method that is a catch all for http verbs

//A SEMICOLON SIGNALS END OF STATEMENT

//setting up endpoint for get request for campsites
//tales callback function
.get((req, res, next) => {
    Campsite.find()
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application.json');
        res.json(campsites);
    })
    //pass error to overall error handler and let express handle error 
    .catch(err => next(err));
})

//takes information to next relevant information, after going through app.all
.post((req, res, next) => {
    Campsite.create(req.body)
    .then(campsite => {
        console.log('Campsite Created ', campsite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`)
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})

//deletes campsites
.delete((req, res, next) => {
    //results in every document getting deleted
    Campsite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response)
    })
    .catch(err => next(err));
});





//WEEK 1 WORKSHOP ASSIGNMENT
campsiteRouter.route('/:campsiteId')
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})



.post((req, res) => {
    res.statusCode = 403
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`)
})

.put((req, res, next) => {
    Campsite.findByIdAndUpdate(req.params.campsiteId, {
        $set: req.body
    }, { new: true })
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
    .delete((req, res, next) => {
        Campsite.findByIdAndDelete(req.params.campsiteId)
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
});


//USED IN PART LAST EXERCISE WEEK 2
campsiteRouter.route('/:campsiteId/comments')


.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application.json');
        res.json(campsite.comments);
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return(err);
        }
    })
    .catch(err => next(err));
})

.post((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite) {
            campsite.comments.push(req.body);
            //save method returns promise hence then
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application.json');
                res.json(campsite.comments);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return(err);
        }
    })
    .catch(err => next(err));
})

.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
})

.delete((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite) {
            //LOOK THIS UP AND EXAMINE IT
            for (let i = (campsite.comments.length-1); i >= 0; i--) {
                campsite.comments.id(campsite.comments[i]._id).remove();
            }
            campsite.save
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application.json');
                res.json(campsite.comments);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});





//this will handle requests for specific comment for specific campsite
campsiteRouter.route('/:campsiteId/comments/:commentId')


.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite && campsite.comments.id(req.params.commentId)) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application.json');
        res.json(campsite.comments.id(req.params.commendId));
        //continue to handle campsite if truthy but value is not 
    } else if (!campsite) {
        err = new Error(`Campsite ${req.params.campsiteId} not found`);
        err.status = 404;
        return(err);
        } else {
            err = new Error(`Campsite ${req.params.commentId} not found`);
            err.status = 404;
            return(err);
        }
    })
    .catch(err => next(err));
})

.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commendId}`);
})

.put((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if(campsite && campsite.comments.id(req.params.commentId)) {
            if (req.body.rating) {
                campsite.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.text) {
                campsite.comments.id(req.params.commentId).text = req.body.text;
            }
            campsite.save()
            .then(campsite => {
                res.statuCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err))
    } else if (!campsite) {
        err = new Error(`Campsite ${req.params.campsiteId} not found`);
        err.status = 404;
        return(err);
        } else {
            err = new Error(`Campsite ${req.params.commentId} not found`);
            err.status = 404;
            return(err);
        }
    })
    .catch(err => next(err));
})

.delete((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            campsite.comments.id(req.params.commentId).remove();
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

//exports campsiteRouter
module.exports = campsiteRouter;

