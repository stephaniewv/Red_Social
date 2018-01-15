// Enlazar imagen
$(document).ready(function () {
  $('.slider').slider({ height: 700 });
  $('.button-collapse').sideNav();

  var name;
  var lastName;
  var email;
  var uid;

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var photoURL = user.photoURL;
      email = user.email;
      uid = user.uid;

      if (user.displayName === null) {
        var database = firebase.database();
        database.ref('/users/' + uid).once('value').then(function(snapshot) {
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
console.log(btn);
var textArea = $('#textarea-post');
console.log(textArea);


$(textArea).keypress(function (event) {
  btn.removeClass('disabled');
  var text = textArea.val();
  console.log(text);
});

$(btn).click(function () {
  event.preventDefault();
  var postBox = $('<div class="card grey-text text-darken-4 text-post post-container col l12"></div>');
  var box = $('<div class= "card-content"></div>');
  console.log(textArea.val());
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
  textArea.val('');

});

// Chat

// var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// var Messenger = function () {
//   function Messenger() {
//     _classCallCheck(this, Messenger);

//     this.messageList = [];
//     this.deletedList = [];

//     this.me = 1; // completely arbitrary id
//     this.them = 5; // and another one

//     this.onRecieve = function (message) {
//       return console.log('Recieved: ' + message.text);
//     };
//     this.onSend = function (message) {
//       return console.log('Sent: ' + message.text);
//     };
//     this.onDelete = function (message) {
//       return console.log('Deleted: ' + message.text);
//     };
//   }

//   _createClass(Messenger, [{
//     key: 'send',
//     value: function send() {
//       var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

//       text = this.filter(text);

//       if (this.validate(text)) {
//         var message = {
//           user: this.me,
//           text: text,
//           time: new Date().getTime()
//         };

//         this.messageList.push(message);

//         this.onSend(message);
//       }
//     }
//   }, {
//     key: 'recieve',
//     value: function recieve() {
//       var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

//       text = this.filter(text);

//       if (this.validate(text)) {
//         var message = {
//           user: this.them,
//           text: text,
//           time: new Date().getTime()
//         };

//         this.messageList.push(message);

//         this.onRecieve(message);
//       }
//     }
//   }, {
//     key: 'delete',
//     value: function _delete(index) {
//       index = index || this.messageLength - 1;

//       var deleted = this.messageLength.pop();

//       this.deletedList.push(deleted);
//       this.onDelete(deleted);
//     }
//   }, {
//     key: 'filter',
//     value: function filter(input) {
//       var output = input.replace('bad input', 'good output'); // such amazing filter there right?
//       return output;
//     }
//   }, {
//     key: 'validate',
//     value: function validate(input) {
//       return !!input.length; // an amazing example of validation I swear.
//     }
//   }]);

//   return Messenger;
// }();

// var BuildHTML = function () {
//   function BuildHTML() {
//     _classCallCheck(this, BuildHTML);

//     this.messageWrapper = 'message-wrapper';
//     this.circleWrapper = 'circle-wrapper';
//     this.textWrapper = 'text-wrapper';

//     this.meClass = 'me';
//     this.themClass = 'them';
//   }

//   _createClass(BuildHTML, [{
//     key: '_build',
//     value: function _build(text, who) {
//       return '<div class="' + this.messageWrapper + ' ' + this[who + 'Class'] + '">\n              <div class="' + this.circleWrapper + ' animated bounceIn"></div>\n              <div class="' + this.textWrapper + '">...</div>\n            </div>';
//     }
//   }, {
//     key: 'me',
//     value: function me(text) {
//       return this._build(text, 'me');
//     }
//   }, {
//     key: 'them',
//     value: function them(text) {
//       return this._build(text, 'them');
//     }
//   }]);

//   return BuildHTML;
// }();

// $(document).ready(function () {
//   var messenger = new Messenger();
//   var buildHTML = new BuildHTML();

//   var $input = $('#input');
//   var $send = $('#send');
//   var $content = $('#content');
//   var $inner = $('#inner');

//   function safeText(text) {
//     $content.find('.message-wrapper').last().find('.text-wrapper').text(text);
//   }

//   function animateText() {
//     setTimeout(function () {
//       $content.find('.message-wrapper').last().find('.text-wrapper').addClass('animated fadeIn');
//     }, 350);
//   }

//   function scrollBottom() {
//     $($inner).animate({
//       scrollTop: $($content).offset().top + $($content).outerHeight(true)
//     }, {
//       queue: false,
//       duration: 'ease'
//     });
//   }

//   function buildSent(message) {
//     console.log('sending: ', message.text);

//     $content.append(buildHTML.me(message.text));
//     safeText(message.text);
//     animateText();

//     scrollBottom();
//   }

//   function buildRecieved(message) {
//     console.log('recieving: ', message.text);

//     $content.append(buildHTML.them(message.text));
//     safeText(message.text);
//     animateText();

//     scrollBottom();
//   }

//   function sendMessage() {
//     var text = $input.val();
//     messenger.send(text);

//     $input.val('');
//     $input.focus();
//   }

//   messenger.onSend = buildSent;
//   messenger.onRecieve = buildRecieved;

//   setTimeout(function () {
//     messenger.recieve('Hello there!');
//   }, 1500);

//   setTimeout(function () {
//     messenger.recieve('Do you like this? If so check out more on my page...');
//   }, 5000);

//   setTimeout(function () {
//     messenger.recieve('Or maybe just give it a like!');
//   }, 7500);

//   $input.focus();

//   $send.on('click', function (e) {
//     sendMessage();
//   });

//   $input.on('keydown', function (e) {
//     var key = e.which || e.keyCode;

//     if (key === 13) {
//       // enter key
//       e.preventDefault();

//       sendMessage();
//     }
//   });
// });