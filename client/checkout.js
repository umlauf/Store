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