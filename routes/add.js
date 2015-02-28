var express = require('express');
var router = express.Router();

/* GET app page */
router.get('/', function(req, res, next) {
  res.render('add');
});

router.post('/submit', function(req, res) {
  var models = require('../models/');
  var title = req.body.pageName;
  var body = req.body.pageContent;
  var url_name = generateUrlName(title);
  var tags = generateTagsArray(req.body.tags);
  var p = new models.Page({ "title": title, "body":body, "url_name":url_name, "tags":tags });
  p.save();
  res.redirect('/');
});


var generateUrlName = function(name) {
  if (typeof name != "undefined" && name !== "") {
    // Removes all non-alphanumeric characters from name
    // And make spaces underscore
    return name.replace(/\s/ig,"_").replace(/\W/ig,"");
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2,7);
  }
};

var generateTagsArray = function(tagsString) {
  tagsString = tagsString.replace(',', '');
  return tagsString.split(' ');
};


module.exports = router;
