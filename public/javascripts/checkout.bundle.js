/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/javascripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./checkout.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./checkout.js":
/*!*********************!*\
  !*** ./checkout.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

checkEmail = function() {
  var email = $("#email").val();

  $("#emailGroup").removeClass("has-error");
  $("#helpEmail").html('');
  if(!validateEmail(email)) {
    $("#emailGroup").addClass("has-error");
    $("#helpEmail").html('Email inválido.');
    return;
  }

  $.ajax({
    method: "POST",
    url: "/conta/checkemail",
    data: { email: email }
  })
  .done(function( result ) {
    if( result.status === 'SUCCESS' ) {
      $("#loginSenha").fadeIn(300);
      $("#loginOpcoes").fadeIn(300);
      $("#btnEmail").fadeOut(300);
      $("#labelEmail").html("Email");
    } else {
      $("#emailcadastro").val(email);
      $("#emailForm").slideUp();
      $("#checkoutForm").slideDown();
    }
  })
  .fail(function(data,status,error) {
    $("#emailcadastro").val(email);
    $("#emailForm").slideUp();
    $("#checkoutForm").slideDown();
  });

};

validateEmail = function(email) {
  var g = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return g.test(email);
};

mostraCadastro = function() {
  var email = $("#email").val();
  $("#emailcadastro").val(email);
  $("#emailForm").slideUp();
  $("#checkoutForm").slideDown();
};

mostraLogin = function() {
  var email = $("#emailcadastro").val();
  $("#email").val(email);
  $("#emailForm").slideDown();
  $("#checkoutForm").slideUp();
  $("#loginSenha").fadeIn(300);
  $("#loginOpcoes").fadeIn(300);
  $("#btnEmail").fadeOut(300);
  $("#labelEmail").html("Email");
}

login = function() {
  // TODO
}


buscaCep = function() {
  // TODO Implementar calculo de frete.
  // npm install -save frete
  // https://www.npmjs.com/package/frete


  var f = $("#cep").val();
  var j = "";
  for (var e = 0; e < f.length; ++e) {
    var c = f.charAt(e);
    if (((c < "0") || (c > "9")) && c !== "") {
      var a = false
    } else {
      j = j + c
    }
  }

  if (j.length < 8) {
    return;
  }

  //var cep = $("#cep").val();

  // $("#cepGroup").removeClass("has-error");
  // if(cep.length < 8) {
  //   $("#cepGroup").addClass('has-error');
  //   return;
  // }

  $("#logradouro").val("").removeAttr("readonly");
  $("#bairro").val("").removeAttr("readonly");
  $("#cidade").val("").removeAttr("readonly");
  $("#estado").val("").removeAttr("readonly");
  $("#numero").val("");
  $("#complemento").val("");

  // $("#btnBuscaCep").html('<i class="fa fa-refresh fa-spin"></i>');
  // $("#btnBuscaCep").attr("disabled", "disabled");
  $("#cepProgress").html('<i class="fa fa-refresh fa-spin fa-2x"></i>');


  $.ajax({
    method: "GET",
    url: "http://api.postmon.com.br/v1/cep/" + j //cep
  })
  .done(function( result ) {
    if(result.statusText) {
      if(result.status == 404) {
        $("#cepHelperText").html("CEP não localizado");
        //$("#cepGroup").addClass('has-error');
      }
    } else {
      $("#logradouro").val(result.logradouro).attr("readonly", "readonly");
      $("#bairro").val(result.bairro).attr("readonly", "readonly");
      $("#cidade").val(result.cidade).attr("readonly", "readonly");
      $("#estado").val(result.estado).attr("readonly", "readonly");

      $.ajax({
        method: "POST",
        url: "/checkout/frete",
        data: { cep: j }
      })
      .done(function( result ) {
        if( result.status === 'SUCCESS' ) {
          // TODO Montar template com opções de envio
          var h = "";
          for(var i = 0; i < result.dados.length; i++) {
            h += "<p>" + result.dados[i].name + ": " + result.dados[i].prazoEntrega + " dia(s), R$" + result.dados[i].valor + "</p>";
          }
          $("#frete").html(h);
        } else {
          // TODO Melhorar mensagem de erro
          $("#frete").html("Erro");
        }
      })
      .fail(function(data, status, error) {
        // TODO Melhorar mensagem de erro
        $("#frete").html("Erro");
      });

    }
    // $("#btnBuscaCep").html('Buscar');
    // $("#btnBuscaCep").removeAttr("disabled");
    $("#cepProgress").html('');
  })
  .fail(function(data, status, error) {
    if(data.status == 404) {
      $("#cepHelperText").html("CEP não localizado");
      //$("#cepGroup").addClass('has-error');
    } else {
      $("#cepHelperText").html("Falha ao localizar CEP");
      //$("#cepGroup").addClass('has-error');
    }
    // $("#btnBuscaCep").html('Buscar');
    // $("#btnBuscaCep").removeAttr("disabled");
    $("#cepProgress").html('');
  });

}


/***/ })

/******/ });
//# sourceMappingURL=checkout.bundle.js.map