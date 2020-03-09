const express = require('express');
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

routes.post('/instructors', function(req, res) {
    return res.send(req.body);
});

routes.get('/members', function(req, res) {
    return res.send('members');
});

module.exports = routes;