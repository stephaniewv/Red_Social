$(document).ready(function() {
  $('select').material_select();
 

  /* Código del plugin para que se muestre el efecto de cargo de imagen */        
  var btnCust = '<button type="button" class="btn btn-secondary" title="Add picture tags" ' + 
        'onclick="alert(\'Call your custom code here.\')">' +
        '<i class="glyphicon glyphicon-tag"></i>' +
        '</button>'; 

  $('#avatar-1').fileinput({
    overwriteInitial: true,
    maxFileSize: 5000,
    showClose: false,
    showCaption: false,
    browseLabel: '',
    removeLabel: '',
    browseIcon: '<i class="material-icons">add</i>',
    removeIcon: '<i class="material-icons">delete</i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors-1',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="/uploads/default_avatar_male.jpg" alt="Your Avatar">',
    layoutTemplates: {main2: '{preview} ' + btnCust + ' {remove} {browse}'},
    allowedFileExtensions: ['jpg', 'png', 'gif']
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
        
      
  /* Código para enviar a la siguiente vista*/
  $('.btn-start').on('click', function() {
    window.location.href = 'profile.html';
    var nameUser = $('.pg-name').val();
    localStorage.setItem('name', nameUser);
    var agePg = $('.pg-age').val();
    localStorage.setItem('age', agePg);
    console.log(nameUser);
  }); 
});

