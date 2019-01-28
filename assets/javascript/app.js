var categoryList = {
    "Film": 11,
    "Music": 12,
    "Televsion": 14,
    "Video Games": 15,
    "Sports": 21
}

var gameData = [];
var time = 20;
var timerState = true;
var startButtState = true;
var randomNum = 0;
var $categoryAll = $('a');
var category = "";
var $question = $('#question');
var $choices = $('.choices');
var str = "";
var queryURL = "";
var currentQuestion = 0;

$('document').ready(function () {
    window.onload = function () {
        $('#start').hide();
    }
});

$categoryAll.on('click', function () {
    // debugger;
    category = $(this).text();
    queryURL = "https://opentdb.com/api.php?amount=10&category=" + categoryList[category] + "&difficulty=medium&type=multiple";
    $('#start').fadeIn('slow');
    $('.category').fadeOut('slow');
});

function timerCountdown() {
    if (time > 0) {
        time--
        console.log(time);
    }
    $('#timer').text(time);
}

function questionSearch() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        // debugger;
        
        setInterval(timerCountdown, 1000);
        console.log(time);
        while (currentQuestion < 10) {
            // debugger;
            $question.html(data.results[currentQuestion].question);
            $choices.eq(0).html(data.results[currentQuestion].correct_answer);
            $choices.eq(1).html(data.results[currentQuestion].incorrect_answers[0]);
            // debugger;
            $choices.eq(2).html(data.results[currentQuestion].incorrect_answers[1]);
            $choices.eq(3).html(data.results[currentQuestion].incorrect_answers[2]);
            currentQuestion++;
        }
    })
};


//---------------Start Button-----------------//
$('#start').on('click', function () {
    // debugger;
    $(this).fadeOut('slow',questionSearch());
});



// function questionSearch(){
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (data) {
//         console.log(data.results);
//         for(var i =0; i<((data.results).length); i++){

//             gameData.push({
//                 question : data.results[i].question,
//                 correct : data.results[i].correct_answer,
//                 incorrect1 : data.results[i].incorrect_answers[0],
//                 incorrect2 : data.results[i].incorrect_answers[1],
//                 incorrect3 : data.results[i].incorrect_answers[2],
//             })
//         }

//         while(currentQuestion<10){
//             $question.html(gameData[currentQuestion].question);
//             $choices.eq(0).html(gameData[currentQuestion].correct);
//             $choices.eq(1).html(gameData[currentQuestion].incorrect1);
//             $choices.eq(2).html(gameData[currentQuestion].incorrect2);
//             $choices.eq(3).html(gameData[currentQuestion].incorrect3);
//             currentQuestion++;
//             time = 20;
//             while(time>0){
//                 setInterval(timerCountdown, 500);
//             }
//         }
//     })
// }