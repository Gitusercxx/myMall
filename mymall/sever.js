var express = require('express');

var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({ extended: true });
var json = bodyparser.json();
var conf = require('./conf.js');
var get_meth = require('./getmethods.js');
var post_meth = require('./postmethods.js');
var db = require('mongodb');
var dburl = 'mongodb://127.0.0.1:27017/mymall'
// var urlencode = bodyparser.urlencoded({ extended: true });
var app = new express();
app.use(express.static('static_page'));
console.log(get_meth)
app.get('*',get_meth);
app.post('*',urlencode,post_meth);
app.listen(conf.port,conf.ip);

