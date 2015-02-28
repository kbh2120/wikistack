var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('../models/index');


/* GET home page. */
router.get('/', function(req, res, next) {
  var Page = mongoose.model('Page');
  Page.find({}, function(err, pages) {
    if (err) console.log('Error searching pages: ' + err);
    console.log(pages);
    res.render('index', { title: 'Express', docs: pages});
  });
  
});

router.get('/wiki/:url', function(req, res) {
  var Page = mongoose.model('Page');
  var url_name = req.params.url;
  Page.findOne({url_name: url_name}, function(err, thisPage) {
    if (err) console.log('Error searching pages: ' + err);
    // console.log('thisPage: ' + thisPage.get('title'));
    res.render('show', { 
      my_title: thisPage.title, 
      my_body: thisPage.body,
      tags: thisPage.tags
    });
  });
  
});

module.exports = router;

  