var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET app page */
router.get('/', function(req, res, next) {
  res.render('add');
});

router.post('/submit', function(req, res) {
  var models = require('../models/');
  console.log(req.body);
  var title = req.body.pageName;
  var body = req.body.pageContent;
  console.log(title);
  console.log(body);
  var url_name = generateUrlName(title);
  var p = new models.Page({ "title": title, "body":body, "url_name":url_name });
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



module.exports = router;
