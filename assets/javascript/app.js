var categoryList = {
    "Film": 11,
    "Music": 12,
    "Television": 14,
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
var correctAnswer = "";

$('document').ready(function () {
    window.onload = function () {
        $('#start').hide();
    }
});

function questionSearch() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log(data.results);
        for (var i = 0; i < ((data.results).length); i++) {
            gameData.push({
                question: data.results[i].question,
                answers:[
                    data.results[i].correct_answer,
                    data.results[i].incorrect_answers[0],
                    data.results[i].incorrect_answers[1],
                    data.results[i].incorrect_answers[2],
                ],
                correctAnswer : data.results[i].correct_answer
            })
        }
    })
}

$categoryAll.on('click', function () {
    category = $(this).text();
    queryURL = "https://opentdb.com/api.php?amount=10&category=" + categoryList[category] + "&difficulty=easy&type=multiple";
    $('#start').fadeIn('slow');
    $('.category').fadeOut('slow');
    questionSearch();
});

function timerCountdown() {
    if (time > 0) {
        time--
        console.log(time);
        $('#timer').text(time);
    }
    else if (time == 0) {
        time = 20;
        $('#timer').text(time);
        nextQuestion();
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

//---------------Start Button-----------------//
$('#start').on('click', function () {
    nextQuestion();
    $(this).fadeOut('slow');
    setInterval(timerCountdown, 1000);
});

$('.choices').on('click',function(){
    if($(this).text() == correctAnswer){
        alert("CORRECT");
    }else{
        alert("INCORRECT");
    }
});

function nextQuestion() {
    $('#mainDisplay').fadeOut('slow',function(){
        var questionOrder = shuffle([0,1,2,3]);
        correctAnswer = gameData[currentQuestion].correctAnswer;
        $question.html(gameData[currentQuestion].question);
        $choices.eq(0).html(gameData[currentQuestion].answers[questionOrder[0]]);
        $choices.eq(1).html(gameData[currentQuestion].answers[questionOrder[1]]);
        $choices.eq(2).html(gameData[currentQuestion].answers[questionOrder[2]]);
        $choices.eq(3).html(gameData[currentQuestion].answers[questionOrder[3]]);
        currentQuestion++;
        $(this).fadeIn('slow');
    })
};
