
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