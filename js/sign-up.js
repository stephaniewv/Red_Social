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

  
  $('.btn-sign-up').on('click', function() {
    $(location).attr('href', 'create-profile.html');
  }); 


});