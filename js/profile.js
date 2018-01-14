$(document).ready(function() {
  /* Inicializador del botón del menu hamburguesa */
  $('.button-collapse').sideNav();

  /* Obteniendo la imagen del personaje*/
  var imgAvatar = localStorage.getItem('img-avatar');
  $('.user').attr('src', '../assets/images/friends/' + imgAvatar);
  console.log(imgAvatar);

  
  /* Para obetener los datos del formulario del personaje */
  var nameCharacter = JSON.parse(localStorage.getItem('name_pg'));
  var ageCharacter = JSON.parse(localStorage.getItem('age_pg'));
  var pgGenter = JSON.parse(localStorage.getItem('pg_gender'));
  $('#pg-name').html(nameCharacter);
  $('.history-name').html(nameCharacter);
  $('.history-age').html(ageCharacter);
  $('gender-text').html(pgGenter);


  /* Activando del textarea de Materialize */
  $('#textarea1').trigger('autoresize');
 

  /* Secci+on gallería */
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
    btn.prop('disabled', false);
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


    timeContainer.addClass('text-post');
    timeContainer.append(timeContent);  
    box.append(parrafo, timeContainer);
    postBox.append(box);
    $('.card-container').append(postBox);
    console.log(textArea.val());
    $(btn).prop('disabled', true); 
    textArea.val('');
  });

  /* Funcionalidad para las solicitudes de amistad */

  $('#menu').click(function() {
    $('.tap-target').tapTarget('open');
    $('.tap-target-origin', 'tap-target-wave').addClass('hide');    
    $('.friend').addClass('responsive-img circle');
    $('.nombre').text(friends[Math.floor(Math.random() * 4)]);
    $('.edad').text(edad[Math.floor(Math.random() * 4)] + ' años');
    $('.situacion').text(relación[Math.floor(Math.random() * 4)]);
    $('.tematica').text('Temática: ' + theme[Math.floor(Math.random() * 4)]);
    $('.friend').attr('src', '../assets/images/friends/' + profile[Math.floor(Math.random() * profile.length)]);
  });

  /* Funcionalidad para que el botón de sugerencia de amistad pulse cada 10 segundos */

  function pulse() {
    $('#menu').addClass('pulse');
  }
  setInterval(pulse, 10000);
  
  function pulseNo() {
    $('#menu').removeClass('pulse');
  }
  setInterval(pulseNo, 18000);
  

  /* Activando el modal */

  $('.modal').modal();
  $('select').material_select();

  /* Funcionalidad para guardar los datos ingresados en el modal */
  
  $('#title').keyup(function() {
    var starterTitle = $('#title').val();
    localStorage.setItem('title-starter', starterTitle);
  });

  $('#theme-select').change(function() {
    var starterTheme = $('#theme-select').val();
    localStorage.setItem('theme-starter', starterTheme);
  });


  /*
  $('.img-big').change(function(){
    debugger
      // Creamos la Imagen
     // var img = $('<img>');
      // Asignamos el atributo source , haciendo uso del método createObjectURL
      var imagen =  URL.createObjectURL(this.files);
      // Añadimos al Div
      localStorage.setItem('img-big-starter', imagen);
      console.log(imagen);
    
  }); 

  /*
  $('.img-big').change(function() {
    var imgBig = (this.files[0].name).toString();
    console.log(imgBig);
    localStorage.setItem('img-big-starter', '../assets/images/starter/' + imgBig);
  }); 

  $('.img-st').change(function() {
    if(this.files && this.files[0]) {
      var imgSt = URL.createObjectURL(this.files[0]);
     console.log(imgSt);
    }
    
  }); */

  $('#textarea-st').keyup(function() {
    var textStarter = $('#textarea-st').val();
    localStorage.setItem('text-st', textStarter);
  });

  $('#blockquote-st').keyup(function() {
    var blockquote = $('#blockquote-st').val();
    localStorage.setItem('blockquote', blockquote);
  });

  $('.img-st').keypress(function() {
    var imgSt = $('.img-st').val();
    localStorage.setItem('img-st', imgSt);
  });


  /* Redireccionando a la vista del starter */
  $('.modal-close').click(function() {
    window.location.href = '../views/starter.html';
  }); 


  /* Redireccionando a la vista del inicio*/
  $('.web').click(function() {
    window.location.href = '../views/inicio.html';
  });
});