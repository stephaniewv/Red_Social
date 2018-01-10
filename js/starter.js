$(document).ready(function() {
  /* Código para inicializar el chio (etiquetado) */  
  $('.chips').material_chip();
  /*
  $('.chips-initial').material_chip({
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  });*/
  $('.chips-placeholder').material_chip({
    placeholder: 'Agregar',
    secondaryPlaceholder: '+Tag',
  });
  $('.chips-autocomplete').material_chip({
    autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      },
      limit: Infinity,
      minLength: 1
    }
  });

  /* Activando del textarea de Materialize */
  $('#textarea1').trigger('autoresize');

  /* Función para crear los plots */
  $('.create-plot').click(function() {
    var row = $('<div class= "row row-display space"></div>');
    var column1 = $('<div class="col s12 m12 l3 offset-l1"> </div>');
    var input = $('<input type="file" id="files" name="files[]" class= "btn-img">');
    var output = $('<div class= "img-card" id="list" </div>');
    var column2 = $('<div class = "col s12 m12 l8 text-plot z-depth-3"></div>');
    var icon = $('<i class="material-icons prefix">mode_edit</i>');
    var textarea = $('<textarea id="icon_prefix2" class="materialize-textarea"></textarea>');
    var btn = $('<button class="btn waves-effect waves-light btn-post disabled" type="button" name="action">Crear</button>');

    row.append(column1, column2);
    column1.append(input, output);
    column2.append(icon, textarea, btn);
    $('.starter-body').append(row);

    /* Código para obtener la imagen que se toma del archivo del usuario */
    function archivo(evt) {
      var files = evt.target.files; // FileList object
      // Obtenemos la imagen del campo "file". 
      for (var i = 0, f; f = files[i]; i++) {         
        // Solo admitimos imágenes.
        if (!f.type.match('image.*')) {
          continue;
        }
       
        var reader = new FileReader();
        reader.onload = (function(theFile) {
          return function(e) {
            // Creamos la imagen.
            document.getElementById('list').innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
          };
        })(f);
        reader.readAsDataURL(f);
      }
    }      
    document.getElementById('files').addEventListener('change', archivo, false);

    
    /* Código para la funcionalidad de seguir la historia del starter */

    $(textarea).keypress(function(event) {
      if (input.val()) {
        btn.removeClass('disabled');
        var text = textarea.val();
        input.addClass('hide');
        console.log(text); 
      }
    });
  
    /* Evento de post */
    $(btn).click(function() {
      event.preventDefault();
      var parrafo = $('<p/>', {
        'html': textarea.val()
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
      column2.append(parrafo, timeContainer);
    
      icon.addClass('hide');
      textarea.addClass('hide');
      btn.addClass('hide');
      console.log(textarea.val());
      textarea.val(''); 
    });
  });
});

