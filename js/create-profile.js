$(document).ready(function() {
  $('select').material_select();

  /* Sección de creación de imagen seleccionada */
  $('#file-select').click(function() {
    event.preventDefault();
    $('#file').click();
  });

  $('#file').change(function() {
    var nameFile = (this.files[0].name).toString();
    var reader = new FileReader();
    $('#file-info').text('');
    $('#file-info').text(nameFile);

    reader.onload = function(e) {
      $('.preview  img').attr('src', e.target.result);
    };

    
    reader.readAsDataURL(this.files[0]);
    $('#file-select').addClass('hide');
    /* Añadiendo el botón de eliminar imagen */
    var imgDelate = $('<button class = "btn col l6 offset-l3 btn-delate-img red"></button');
    imgDelate.text('Eliminar');
    $('.container-pg').append(imgDelate);

    /* Funcionalidad del botón eliminar */
    imgDelate.click(function() {
      $('.preview  img').removeAttr('src');
      $('.btn-delate-img').addClass('hide');
      $('#file-select').toggleClass('hide');
      $('#file-info').text('Aún no haz seleccionado una foto');
    })
  });

  
  /* Código para obtener el valor de la imagen de usuario */
  $('#avatar-1').change(function() {
    var avatar = (this.files[0].name).toString();
    localStorage.setItem('img-avatar', avatar);
  });

  /* Código para elegir la fecha de nacimiento*/

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

  /* Validación del formulario de la creación del personaje*/
  var pgName = [],
    pgAge = [],
    pgDateBirdth = [],
    pgGenero = [],
    pgCountry = [],
    pgRelationship = [],
    pgTheme = [];

  $('.btn-start').click(function() {
    var pgNameVal = $('.pg-name').val();
    pgAgeVal = $('.pg-age').val();
    pgDateBirdthVal = $('.date-birth').val();
    pgGeneroVal = $('.genero').val();
    pgCountryVal = $('.country').val();
    pgRelationshipVal = $('.relationship').val();
    pgThemeVal = $('.thematic').val();

    pgName.push(pgNameVal);
    pgDateBirdth.push(pgAgeVal);
    pgGenero.push(pgGeneroVal);
    pgCountry.push(pgCountryVal);
    pgTheme.push(pgThemeVal);

    localStorage.setItem('name_pg', JSON.stringify(pgName));
    localStorage.setItem('age_pg', JSON.stringify(pgAge));    
    localStorage.setItem('pg_date_birth', JSON.stringify(pgDateBirdth));
    localStorage.setItem('pg_genero', JSON.stringify(pgCountry));
    localStorage.setItem('pg_country', JSON.stringify(pgRelationship));
    localStorage.setItem('pg_them', JSON.stringify(pgTheme));
  });    
   

  /* Validando el formulario de registro del personaje */

  function nameCharacterValid() {
    return $('.pg-name').val().length >= 2;
  }

  function ageCharacterValid() {
    return $('.pg-age').val();
  }

  function dateBirthCharacterValid() {
    return $('.date-birth').val();
  }

  function generoCharacterValid() {
    return $('.ganero').val();
  }

  function countryCharacterValid() {
    return $('.country').val();
  }

  function relationshipCharacterValid() {
    return $('.relationship').val();
  }

  function themeCharacterValid() {
    return $('.thematic').val();
  }

  function allOk() {
    return nameCharacterValid() && ageCharacterValid() && dateBirthCharacterValid() && generoCharacterValid() && countryCharacterValid() && relationshipCharacterValid() && themeCharacterValid();
  }

  /* Si ambos campos son correctos, se habilita el botón */
  $('.thematic').change(function allOk() {
    $('.btn-start').prop('disabled', false);
  });

  /* Código para enviar a la siguiente vista*/
  $('.btn-start').on('click', function() {
    window.location.href = 'profile.html';
  }); 
});

