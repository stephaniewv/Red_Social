$(document).ready(function () {
  
  /* Si ambos campos son correctos, se habilita el botón */
  $('#password-log-in').keyup(function allOk() {
    var email = $('#email-log-in').val();
    var password = $('#password-log-in').val();

    if (email.trim().length > 0 && password.trim().length > 0) {
      $('.btn-log-in').prop('disabled', false);
    } else {
      $('.btn-log-in').prop('disabled', true);
    }
  });

  /* Enviando a la vista perfil del usuario que ya esta resgistrado*/
  $('.btn-log-in').click(function () {
    var email = $('#email-log-in').val();
    var password = $('#password-log-in').val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
      console.log(result);
      window.location = '/views/profile.html';

    }).catch(function (error) {
      console.log(error.code);
      console.log(error.message);
      switch (error.code) {
        case 'auth/user-not-found':
          $('#error-message').text("Usuario no registrado");
          break;
        case 'auth/invalid-email':
          $('#error-message').text("Formato de email inválido");
          break;
        case 'auth/wrong-password':
          $('#error-message').text("El usuario o el password es incorrecto");
          break;
      }

    });
  });

  /* Enviando a la vista home */
  $('.logo-rolling').on('click', function () {
    $(location).attr('href', 'home.html');
  });
});