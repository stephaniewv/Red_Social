$(document).ready(function() {

  var inputName = localStorage.getItem('name');
  $('#pg-name').html(inputName);

  $('#textarea1').trigger('autoresize');
 
  var imgSta = imgStarter;
  console.log(imgSta);
  var $imgSt = $('<img>', {
    'class': 'responsive-img',
  });


  $('.btn-st').click(function() {
  
    for(var i = 0; i<imgSta.length; i++) {
       $imgSt.attr('src', '../assets/images/starter' + '/' + imgSta[i]);
       $('.gal-img', {
        'id': [i]
       });
      console.log(i);
    }

    //console.log(i);
    //console.log($imgSt);
    $('#'[i]).replaceWith($imgSt);   
  })

  $('.btn-gal').click(function() {
    $imgSt.hide();
  })

  $('.btn-floating').click(function() {
    event.preventDefault();
    var $imgProfile = $('<img>', {
      'class': 'activator',
      'src': '../assets/images/card-profile.jpg'
    })

    $('.card-image').append($imgProfile);
    $('.btn-floating').detach();
  })

  $('.btn-post').click(function() {
    event.preventDefault();
    newCard();
  })
  
  function newCard() {

    var span = $('<span class = "card-title activator grey-text text-darken-4">Mi Mundo</span>');
    var anchor = $('<a class= "btn-floating halfway-fab waves-effect waves-light red" ><i class= "material-icons" >add</i></a>');
    var textarea = $('<textarea id="textarea1" class= "materialize-textarea" placeholder= "¿Qué vas a crear hoy?"></textarea>')
    
    var container = $('<div class = "card-content"></div>');
    var card = $('<div class = "card col l12" ></div>');
    var cardImage = $('<div class= "card-image waves-effect waves-block waves-light"></div>');
    var bigContainer = $('.card-container');
    var btn = $('<button class="btn waves-effect waves-light btn-post" type="button" name="action">Crear<i class="material-icons right">border_color</i></button>');
    container.append(span, anchor, textarea, btn);
    card.append(cardImage, container);
    bigContainer.prepend(card);
  }

  $('.history-name').html(inputName);

});

