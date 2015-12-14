require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack!./bootstrap.config.js");
require("font-awesome-webpack");
var Price = require('format-price');

updateCart = function(produto_id) {
  var qtd = $("#nome-" + produto_id).val();

  $.ajax({
    method: "GET",
    url: "/carrinho/update/" + produto_id,
    data: { q: qtd }
  })
  .done(function( result ) {
    if(result.status == 'SUCCESS') {
      var valorUnitario = $("#nome-" + produto_id).attr("data-valor");
      var totalFormatado = Price.format( 'pt-BR', 'BRL', valorUnitario * qtd);
      $("#total-" + produto_id).fadeOut(function() {
        $("#total-" + produto_id).html(totalFormatado);
        $("#total-" + produto_id).fadeIn();
      });
      $("#total").fadeOut(function() {
        $("#total").html(result.totalFormatado);
        $("#total").fadeIn();
      });
    } else if (result.status == 'ERROR') {
      console.log( result.msg );
    }
  });
};
