// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Read comments.json file
var comments = require('./comments.json');

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set the port
app.set('port', (process.env.PORT || 3000));

// Set the static files location
app.use(express.static(__dirname + '/public'));

// Set the single page application
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

// Get all comments
app.get('/api/comments', function(request, response) {
    response.json(comments);
});

// Add a new comment
app.post('/api/comments', function(request, response) {
    var comment = {
        id: Date.now(),
