const express = require('express');

const instructors = require('./instructors');

const routes = express.Router();


routes.get('/', function(req, res) {
    return res.render('instructors/index');
});

routes.get('/instructors', function(req, res) {
    return res.send('instructors');
});

routes.get('/instructors/create', function(req, res) {
    return res.render('instructors/create');
});

routes.post('/instructors', instructors.post);

routes.get('/members', function(req, res) {
    return res.send('members');
});

module.exports = routes;