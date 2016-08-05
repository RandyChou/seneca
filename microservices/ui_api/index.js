var seneca = require("seneca")();

seneca.use(require('./api'));

var express = require('express');
var app = express();
app.use(require("body-parser").json());
// This is how you integrate Seneca with Express
app.use(seneca.export('web'));
app.listen(3000);