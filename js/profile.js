$(document).ready(function() {

  /* Inicializador del botón del menu hamburguesa */
  $('.button-collapse').sideNav();

  /* Obteniendo datos del personaje, llenado por el usuario*/
  var inputName = localStorage.getItem('name');
  var inputAge = localStorage.getItem('age');
  /* Para obetener el nombre puesto en el form del personaje */
  $('#pg-name').html(inputName);
  $('.history-name').html(inputName);
  $('.history-age').html(inputAge);

  /* Activando del textarea de Materialize */
  $('#textarea1').trigger('autoresize');
 

  var imagesGallery = imgGallery; // el array de la galería
  var imagesStarter = imgStarter; // el array del starter
 
  /* Función para recorrer las imágenes de la galeria */
  for (var i = 0; i < imagesGallery.length; i++) {
    var img = $('<img>', {
      'class': 'responsive-img col s6',
    });
    img.attr('src', '../assets/images/gallery' + '/' + imagesGallery[i]);
    console.log(i);
    $('.container-gal').append(img);
  }

  /* Función para recorrer las imágenes de los starter */
  $('.btn-st').one('click', function() {
    $('.container-gal').addClass('hide');
    for (var i = 0; i < imagesStarter.length; i++) {
      var img = $('<img>', {
        'class': 'responsive-img col s6',
      });
      img.attr('src', '../assets/images/starter' + '/' + imagesStarter[i]);
      console.log(i);
      $('.container-starter').append(img);
    }
  });

  /* Mostrando y ocultando las imágenes */
  $('.btn-gal').one('click', function() {
    $('.container-starter').addClass('hide'); 
    $('.container-gal').removeClass('hide');
  });

  /* Código para la funcionalidad de los post */
  var btn = $('.btn-post');
  var textArea = $('#textarea-post');
  

  $(textArea).keypress(function(event) {
    btn.removeClass('disabled');
    var text = textArea.val();
    console.log(text); 
  });
  

  $(btn).click(function() {
    event.preventDefault();
    var postBox = $('<div class="card grey-text text-darken-4 text-post post-container col l12"></div>');
    var box = $('<div class= "card-content"></div>');
    var parrafo = $('<p/>', {
      'html': textArea.val()
    });

    var date = new Date();
    var strDate = date.getHours() + ':' + date.getMinutes(); 

    var timeContainer = $('<div/>', {
      'class': 'right-align'
    });
    var timeContent = $('<p/>', {
      'text': strDate,
    });


    /*
    var buttons = $('<div class="fixed-action-btn"></div>')
    var anchor = $('<a class= "btn-floating btn-large red ><i class= "large material-icons" >mode_edit</i></a>');
    var list = $('<ul/>');
    var items = $('<li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>');
    var item1 = $('<li><a class="btn-floating yellow darken-1"><i class="material-icons">grade</i></a></li>'); */

    timeContainer.addClass('text-post');
    timeContainer.append(timeContent);  
    box.append(parrafo, timeContainer);
    postBox.append(box);
    $('.card-container').append(postBox);
    console.log(textArea.val());
    textArea.val(''); 
  });

  $.each(friends, function(key, value) {
    /*  nombres de los personajes */
    var character = key;
    // console.log(restaurant); 

    //  los valores de cada key(personaje) 
    var content = value;
    // console.log(content);

    // contenido de la tematica. 
    var thematic = content.tematica;
    // console.log(location);

    var ageCharacter = content.edad;
    var relationship = content.situacion;

    var imagenes = content.profile;

    $('#menu').click(function() {
      $('.tap-target').tapTarget('open');
      $('.friend').attr('src', '../assets/images/friends/' + imagenes);
      $('.friend').addClass('responsive-img circle');
      $('.nombre').text(character);
      $('.edad').text(ageCharacter);
      $('.situacion').text(relationship);
      $('.tematica').text('Temática: ' + thematic);
    });
  });

  /* Redireccionando a la vista del starter */
  $('.btn-new-starter').click(function() {
    window.location.href = '../views/starter.html';
  });
});