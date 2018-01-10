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

    
  })

  $('.history-name').html(inputName);

});

