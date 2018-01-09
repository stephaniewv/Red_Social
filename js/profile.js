$(document).ready(function() {

var inputName = localStorage.getItem('name');
$('#pg-name').html(inputName);


$('#textarea1').trigger('autoresize');

});