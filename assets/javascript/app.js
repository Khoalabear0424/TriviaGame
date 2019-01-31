var categoryList = {
    "Film": 11,
    "Music": 12,
    "Television": 14,
    "Video Games": 15,
    "Sports": 21
}

var gameData = [];
var time = 0;
var timerState = true;
var startButtState = true;
var choiceButtState = true;
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
        $('#start').fadeIn('slow');
    })
}


function timerCountdown() {
    if (time < 21 && time >13) {
        $('#timer').text(time);
        $('#timer').css('color','green');
    } else if(time <= 13 && time >5){
        $('#timer').css('color','rgb(209, 197, 91)');
        $('#timer').text(time);
    }else if(time<=5 && time >0){
        $('#timer').css('color','red');
        $('#timer').text(time);
    }
    else if (time == 0) {
        $('#timer').text(time);
        for (var i = 0; i < $choices.length; i++) {
            $choices.eq(i).addClass('notChosen');
            if ($choices.eq(i).text() == correctAnswer) {
                $choices.eq(i).addClass('correct');
            }
        }
        time = 23;
        setTimeout(nextQuestion, 2000);
    } 
    time--
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

function nextQuestion() {
    choiceButtState = true;
    $('#mainDisplay').fadeOut('slow', function () {
        var questionOrder = shuffle([0, 1, 2, 3]);
        correctAnswer = gameData[currentQuestion].correctAnswer;
        $question.html(gameData[currentQuestion].question);

        for (var i = 0; i < 4; i++) {
            $choices.eq(i).html(gameData[currentQuestion].answers[questionOrder[i]]);
            $choices.eq(i).removeClass('correct incorrect notChosen disabled');
        }
        currentQuestion++;
        $(this).fadeIn('slow');
    })

    if (currentQuestion == gameData.length) {
        var result = correctCount + " Out of " + (gameData.length);
        $('#result').text(result);
        $('#score').fadeIn('slow');
        $('#timeDisplay').fadeOut('slow');
    }
};

//--------------Category Button--------------//
$categoryAll.on('click', function () {
    category = $(this).text();
    queryURL = "https://opentdb.com/api.php?amount=10&category=" + categoryList[category] + "&difficulty=easy&type=multiple";
    $('.category').fadeOut('slow');
    questionSearch();
});

//---------------Start Button-----------------//
$('#start').on('click', function () {
    time = 20;
    $('#timeDisplay').fadeIn('slow');
    setInterval(timerCountdown, 1000);
    $('#timeDisplay').fadeIn('slow',function(){
        nextQuestion();
        $('#mainDisplay').fadeIn('slow');
    });
    $(this).fadeOut('slow');
});

$('.choices').on('click', function () {
    if(choiceButtState == false){
        return false;
    }

    for( var i = 0; i<$choices.length; i++){
        $choices.eq(i).addClass('disabled');
    }

    if ($(this).text() == correctAnswer) {
        $(this).addClass('correct');
        setTimeout(nextQuestion, 2000);
        correctCount++;
        time = 23;
        for (var i = 0; i < $choices.length; i++) {
            if ($choices.eq(i).text() != correctAnswer) {
                $choices.eq(i).addClass('notChosen');
            }
        }
    } else {
        $(this).addClass('incorrect');
        setTimeout(function () {
            for (var i = 0; i < $choices.length; i++) {
                $choices.eq(i).addClass('notChosen');
                if ($choices.eq(i).text() == correctAnswer) {
                    $choices.eq(i).addClass('correct');
                }
            }
            setTimeout(nextQuestion, 2000);
            time = 22;
        }, 1500);
    }
    choiceButtState = false;
});
