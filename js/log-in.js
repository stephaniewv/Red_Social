$(document).ready(function () {
  // console.log(JSON.parse(localStorage.getItem('email_new_user'))); // array

  // /* Recuperando la información guardada en los array */  
  // var emailArray = JSON.parse(localStorage.getItem('email_new_user'));
  // var passwordArray = JSON.parse(localStorage.getItem('password_new_user'));

  // /* Comprobando que el email sea el mismo */
  // function email() {
  //   for (var i = 0; i < emailArray.length; i++) {
  //     return $('#email-log-in').val() === emailArray[i];
  //   }
  // } 

  // /* Comprobando que la contraseña sea la misma */
  // function password() {
  //   for (var i = 0; i < passwordArray.length; i++) {
  //     return $('#password-log-in').val() === passwordArray[i];
  //   }     
  // }

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
      window.location = '/views/inicio.html';

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