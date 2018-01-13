$(document).ready(function() {
  function nameValid() {
    return $('#first_name').val().length >= 3;
  }

  function lastNameValid() {
    return $('#last_name').val().length >= 3;
  }

  function emailValid() {
    return !$('#email').hasClass('invalid') && ($('#email').val().trim().length !== 0);
  }

  function passwordValid() {
    return $('#password').val().length >= 6;
  }

  function confirmPassword() {
    if($('#confirm-password').val().length >= 6 && $('#confirm-password').val() === $('#password').val()) {
      return true
    }
    alert('Tus contraseñas no son iguales. Por favor inténtalo nuevamente');
  }

  function checkboxValid() {
    return $('#filled-in-box').prop('checked');
  }

  function allOk() {
    return nameValid() && lastNameValid() && emailValid() && passwordValid() && confirmPassword();
  }

  $('#filled-in-box').on('change', function() {
    if (allOk()) {
      $('.btn-sign-up').prop('disabled', false);
    } else {
      $(this).prop('checked', false);
    }
  });

  /* Guardando los campos en el local storage */

  var name = [],
      lastName = [],
      email = [],
      password = [],
      equalPassword = [];
  
  $('.btn-sign-up').click(function () {
    var nameVal = $('#first_name').val();
        lastNameVal = $('#last_name').val();
        emailVal = $('#email').val();
        passwordVal = $('#password').val();
        confirmPasswordVal = $('#confirm-password').val();

        name.push(nameVal);
        lastName.push(lastNameVal);
        email.push(emailVal);
        password.push(passwordVal);
        equalPassword.push(confirmPasswordVal);

        localStorage.setItem('name_new_user', JSON.stringify(name));
        localStorage.setItem('last_name_new_user', JSON.stringify(lastName));
        localStorage.setItem('email_new_user', JSON.stringify(email));
        localStorage.setItem('password_new_user', JSON.stringify(password));
        localStorage.setItem('confirm_password_new_user', JSON.stringify(equalPassword));
  })    
  
  /* Enviando a la siguiente vista, una vez que se llenaron todos los campos */

  $('.btn-sign-up').on('click', function() {
    $(location).attr('href', 'create-profile.html');
  }); 

  


});