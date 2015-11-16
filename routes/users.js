var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users){
    console.log(users)
    res.render(
      'users',
      {users : users}
    );
  });
});

module.exports = router;
