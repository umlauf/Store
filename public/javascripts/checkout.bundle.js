/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/javascripts/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	checkEmail = function() {
	  var email = $("#email").val();

	  $("#emailGroup").removeClass("has-error");
	  $('#helpEmail').html('');
	  if(!validateEmail(email)) {
	    $("#emailGroup").addClass("has-error");
	    $('#helpEmail').html('Email inválido.');
	    return;
	  }

	  $.ajax({
	    method: "POST",
	    url: "/conta/checkemail",
	    data: { email: email }
	  })
	  .done(function( result ) {
	    if( result.status === 'SUCCESS' ) {
	      $('#loginSenha').fadeIn(300);
	      $('#loginOpcoes').fadeIn(300);
	      $('#btnEmail').fadeOut(300);
	      $('#labelEmail').html("Email");
	    } else {
	      $('#emailcadastro').val(email);
	      $('#checkoutForm').slideDown();
	      $('#emailForm').slideUp();
	    }
	  });

	};

	validateEmail = function(email) {
	  var g = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return g.test(email);
	};

	mostraCadastro = function() {
	  var email = $("#email").val();
	  $('#emailcadastro').val(email);
	  $('#emailForm').slideUp();
	  $('#checkoutForm').slideDown();
	};

	mostraLogin = function() {
	  var email = $("#emailcadastro").val();
	  $('#email').val(email);
	  $('#emailForm').slideDown();
	  $('#checkoutForm').slideUp();
	  $('#loginSenha').fadeIn(300);
	  $('#loginOpcoes').fadeIn(300);
	  $('#btnEmail').fadeOut(300);
	  $('#labelEmail').html("Email");
	}

	login = function() {
	  // TODO
	}

/***/ }
/******/ ]);