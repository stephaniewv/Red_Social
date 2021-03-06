$(document).ready(function () {
    /* Inicializador del botón del menu hamburguesa */
    $('.button-collapse').sideNav();

    var uid;
    var email;

    var profileId = localStorage.getItem('profileId');

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            email = user.email;
            console.log(email);
            uid = user.uid;
            var database = firebase.database();
            database.ref('/users/' + uid + '/profiles/' + profileId).once('value').then(function (snapshot) {
                // imagen del perfil
                console.log(snapshot);
                $('.user').attr('src', snapshot.val().photoURL);
                $('#pg-name').html(snapshot.val().roleName);
                $('.history-name').html(snapshot.val().roleName);
                $('.history-age').html(snapshot.val().age);
                $('gender-text').html(snapshot.val().gender);
            });
        } else {
            window.location = '/views/home.html';
        }
    });

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
    $('.btn-st').one('click', function () {
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
    $('.btn-gal').one('click', function () {
        $('.container-starter').addClass('hide');
        $('.container-gal').removeClass('hide');
    });

    /* Código para la funcionalidad de los post */
    var btn = $('.btn-post');
    var textArea = $('#textarea-post');


    $(textArea).keypress(function (event) {
        btn.prop('disabled', false);
        var text = textArea.val();
        console.log(text);
    });


    $(btn).click(function () {
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

    $('#menu').click(function () {
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

    $('#title').keyup(function () {
        var starterTitle = $('#title').val();
        localStorage.setItem('title-starter', starterTitle);
    });

    $('#theme-select').change(function () {
        var starterTheme = $('#theme-select').val();
        localStorage.setItem('theme-starter', starterTheme);
    });


    $('#textarea-st').keyup(function () {
        var textStarter = $('#textarea-st').val();
        localStorage.setItem('text-st', textStarter);
    });

    $('#blockquote-st').keyup(function () {
        var blockquote = $('#blockquote-st').val();
        localStorage.setItem('blockquote', blockquote);
    });

    $('.img-st').keypress(function () {
        var imgSt = $('.img-st').val();
        localStorage.setItem('img-st', imgSt);
    });

    $('#privacity').change(function () {
        var privacityState = $('#privacity').val();
        localStorage.setItem('privacity', privacityState);
    })

    /* Sección de creación de imagen seleccionada para portada*/
    $('#file-select-cover').click(function () {
        event.preventDefault();
        $('#file-input').click();
    });

    $('#file-input').change(function () {
        var nameFile = (this.files[0].name).toString();
        var reader = new FileReader();
        $('#file-info-cover').text('');
        $('#file-info-cover').text(nameFile);
        localStorage.setItem('imagen_cover', JSON.stringify(nameFile));
        console.log(nameFile);

        reader.onload = function (e) {
            $('.cover img').attr('src', e.target.result);
        };


        reader.readAsDataURL(this.files[0]);
        $('#file-select-cover').addClass('hide');
        /* Añadiendo el botón de eliminar imagen */
        var imgDelete = $('<button class = "btn col l6 offset-l3 offset-s4 btn-delate-img-cover red"></button>');
        imgDelete.text('Eliminar');
        $('.img-select').append(imgDelete);

        /* Funcionalidad del botón eliminar */
        imgDelete.click(function () {
            $('.cover img').removeAttr('src');
            $('.btn-delate-img-cover').addClass('hide');
            $('#file-select-cover').toggleClass('hide');
            $('#file-info-cover').text('Aún no haz seleccionado una foto');
        })
    });

    /* Sección de creación de imagen seleccionada para starter*/
    $('#file-select-character').click(function () {
        event.preventDefault();
        $('#file-character').click();
    });

    $('#file-character').change(function () {
        var nameFileSt = (this.files[0].name).toString();
        localStorage.setItem('imagen_st', JSON.stringify(nameFileSt));
        console.log(nameFileSt);
        var reader = new FileReader();
        $('#file-info-st').text('');
        $('#file-info-st').text(nameFileSt);

        reader.onload = function (e) {
            $('.character-st img').attr('src', e.target.result);
        };


        reader.readAsDataURL(this.files[0]);
        $('#file-select-character').addClass('hide');
        /* Añadiendo el botón de eliminar imagen */
        var imgDelete = $('<button class = "btn col l6 offset-l3 offset-s4 btn-delate-st-cover red space-down"></button>');
        imgDelete.text('Eliminar');
        $('.img-select-character').append(imgDelete);

        /* Funcionalidad del botón eliminar */
        imgDelete.click(function () {
            $('.character-st img').removeAttr('src');
            $('.btn-delate-st-cover').addClass('hide');
            $('#file-select-character').toggleClass('hide');
            $('#file-info-st').text('Aún no haz seleccionado una foto');
        });
    });

    $('.signOut').click(function () {
        firebase.auth().signOut().then(function () {
            window.location = "/views/home.html";
        }).catch(function (error) {
            console.log(error.message);
        });
    });

    /* Redireccionando a la vista del starter */
    $('.modal-close').click(function () {
        window.location.href = '../views/starter.html';
    });
});