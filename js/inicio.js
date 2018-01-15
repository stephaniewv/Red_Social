// Enlazar imagen
$(document).ready(function () {
    $('.slider').slider({height: 700});
    $('.button-collapse').sideNav();

    var name;
    var lastName;
    var email;
    var uid;

    function redirectToProfile(profileId) {
        console.log(profileId);
        localStorage.setItem('profileId', profileId);
        window.location = "/views/profile.html";
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var photoURL = user.photoURL;
            email = user.email;
            uid = user.uid;

            var database = firebase.database();
            database.ref('/users/' + uid).child('/profiles').once('value', function (snapshot) {
                if (snapshot.val() != null) {
                    snapshot.forEach(function (childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        var a = $('<a></a>').attr('href', '#')
                            .data('profile',childKey)
                            .html(childData.roleName)
                            .click(function(){
                                localStorage.setItem('profileId', childKey);
                                window.location.href = '/views/profile.html';
                            })
                            .append('<i class="material-icons left">person</i>');
                        var li = $('<li></li>').append(a);
                        $('#user-profiles').append(li);
                    });
                }
            });

            if (user.displayName === null) {
                var database = firebase.database();
                database.ref('/users/' + uid).once('value').then(function (snapshot) {
                    $('#nombre').val(snapshot.val().name + ' ' + snapshot.val().lastName);
                    name = snapshot.val().name + ' ' + snapshot.val().lastName;
                    email = snapshot.val().email;
                });
            } else {
                name = user.displayName;
                $('#nombre').val(name);
            }

        } else {
            window.location = '/views/home.html';
        }
    });


    // Signout

    $('.signOut').click(function () {
        firebase.auth().signOut().then(function () {
            window.location = "/views/home.html";
        }).catch(function (error) {
            console.log(error.message);
        });
    });

})

// chat

var txtNombre = document.getElementById('nombre');
var txtMensaje = document.getElementById('mensaje');
var btnEnviar = document.getElementById('btnenviar')
var chatUl = document.getElementById('chatul')

btnEnviar.addEventListener('click', function () {
    var nombre = txtNombre.value;
    var mensaje = txtMensaje.value;
    var html = "<li><b>" + nombre + ": </b>" + mensaje + "</li>";
    chatUl.innerHTML += html;

    firebase.database().ref('chat').push({
        name: nombre,
        message: mensaje
    });
});

// Initialize collapse button
$(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
//$('.collapsible').collapsible();

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