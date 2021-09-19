var express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
var cors = require('cors');

const favoriteRouter = express.Router();


favoriteRouter('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))


favoriteRouter('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authentivate.verifyUser, (req, res) => {
    Favorite.findById(req.params.campsiteId)

})

//ASK SAM FOR HELP WITH THIS
/*
.post(
    cors.corsWithOptions,
    authenticate.verifyUser,

    (req, res, next) => {
        Favorite.find({ user: req.uesr_id})
        .then((favorite) => {

            if(favorite) {

            }
            if (!favorite.campsites.includes(req.params.campsiteId)) {
                favrotie.campsites.push(req.params.campsiteId)
            } else {
                res.setHeader("Content-Type", "text/plain");
                res.end("That campsite is already in the list of favorites!");
            } 

            //look up 
            favorite.save().then((favorite)) {
            .then((favorite) => {
                console.log("Favorite Created ", favorite);
                res.statusCode = 200;
                res.setHeader("Content-Type", "applications/json");
                res.json(favorite);
            });
        })
        .catch((err) => next(err));
    }
)

.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ iser: req.user._id })
    .then((favorite) => {
        favorite.campsites.splice(indexof(req.params.campsiteId), 1);
        favorite.save()
        .then((favorite) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorite);
        })
        .catch((err) => next(err)); 
    })
  
})
*/