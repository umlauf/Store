var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('usuarios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Usuario.find(function(err, usuarios){
    console.log(usuarios)
    res.render(
      'usuarios',
      {usuarios : usuarios}
    );
  });
});

module.exports = router;
