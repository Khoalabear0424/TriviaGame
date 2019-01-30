var categoryList = {
    "Film": 11,
    "Music": 12,
    "Television": 14,
    "Video Games": 15,
    "Sports": 21
}

var gameData = [];
var time = 21;
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
var correctCount = 0;
var winCount = 0;
var loseCount = 0;


$('document').ready(function () {
    window.onload = function () {
        $('#start').hide();
        $('#timeDisplay').hide();
        $('#mainDisplay').hide();
        $('#score').hide();
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
                answers: [
                    data.results[i].correct_answer,
                    data.results[i].incorrect_answers[0],
                    data.results[i].incorrect_answers[1],
                    data.results[i].incorrect_answers[2],
                ],
                correctAnswer: data.results[i].correct_answer
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
    if (time < 22) {
        time--
        $('#timer').text(time);
    }
    else if (time == 0) {
        $('#timer').text(time);
        for(var i = 0; i<$choices.length; i++){
            $choices.eq(i).addClass('notChosen');
            if($choices.eq(i).text() == correctAnswer){
                $choices.eq(i).addClass('correct');
            } 
        }
        time = 22;
        setTimeout(nextQuestion,2000);
    } else {
        time--
    }
};

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
    $('#timeDisplay').fadeIn('slow');
    $('#mainDisplay').fadeIn('slow');
    setInterval(timerCountdown, 1000);
});

$('.choices').on('click', function () {
    if ($(this).text() == correctAnswer) {
        $(this).addClass('correct');
        setTimeout(nextQuestion, 2000);
        correctCount++;
        time = 22;
    } else {
        $(this).addClass('incorrect');
        setTimeout(function(){
            for(var i = 0; i<$choices.length; i++){
                $choices.eq(i).addClass('notChosen');
                if($choices.eq(i).text() == correctAnswer){
                    $choices.eq(i).addClass('correct');
                } 
            }
            setTimeout(nextQuestion, 1000);
            time = 22;
        },1000);      
    }
});

function nextQuestion() {
    $('#mainDisplay').fadeOut('slow', function () {
        var questionOrder = shuffle([0, 1, 2, 3]);
        correctAnswer = gameData[currentQuestion].correctAnswer;
        $question.html(gameData[currentQuestion].question);

        for (var i = 0; i < 4; i++) {
            $choices.eq(i).html(gameData[currentQuestion].answers[questionOrder[i]]);
            $choices.eq(i).removeClass('correct incorrect notChosen');
        }
        currentQuestion++;
        $(this).fadeIn('slow');
    })

    if (currentQuestion == gameData.length) {
        var result = correctCount + " Out of " + (gameData.length);
        $('#result').text(result);
        $('#score').fadeIn('slow');
    }
};
