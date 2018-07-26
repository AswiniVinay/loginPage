$(document).ready(function () {
    $('div.hidden').fadeIn(500).removeClass('hidden');

    $('.pass').on({
    'click': function(){
        $('.logo').attr('src','pass.jpeg');
    }
});

        $('.uid').on({
    'click': function(){
        $('.logo').attr('src','logo.jpeg');
    }
});

$('.login').click(function(){
  $.post('/', $("#formid").serialize(), function (data) {
 	console.log(data) //data is the response from the backend
  });
  event.preventDefault();
});
});
