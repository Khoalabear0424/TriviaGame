var categoryList = {
    "Film" : 11,
    "Music": 12,
    "Televsion": 14,
    "Video Games": 15,
    "Sports": 21
}

var gameData = [];
var time = 0;
var timerState = true;
var startButtState = true;
var randomNum = 0;
var $categoryAll = $('a');
var category = "";
var $question = $('#question');
var $choices = $('.choices');
var str = "";
var queryURL = "";

$categoryAll.on('click', function () {
    category = $(this).text();
    queryURL = "https://opentdb.com/api.php?amount=10&category=" + categoryList[category] +"&difficulty=medium&type=multiple";
});

function timerCountdown() {
    if (time > 0) {
        time--
    }
    $('#timer').text(time);
}

function questionSearch(){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        console.log(data.results[0].question);
        console.log((data.results).length);
        console.log(data.results);
        for(var i =0; i<((data.results).length); i++){
            
            gameData.push({
                question : data.results[i].question,
                correct : data.results[i].correct_answer,
                incorrect1 : data.results[i].incorrect_answers[0],
                incorrect2 : data.results[i].incorrect_answers[1],
                incorrect3 : data.results[i].incorrect_answers[2],
            })
        }
        var randomNum = Math.floor(Math.random() * 11);
        $question.html(gameData[randomNum].question);
        $choices.eq(0).html(gameData[randomNum].correct);
        $choices.eq(1).html(gameData[randomNum].incorrect1);
        $choices.eq(2).html(gameData[randomNum].incorrect2);
        $choices.eq(3).html(gameData[randomNum].incorrect3);
    })
}

//---------------Start Button-----------------//
$('#start').on('click', function () {
    if (startButtState == true) {
        time = 20;
        setInterval(timerCountdown, 1000);
        startButtState = false; 
        questionSearch();

    } else {
        return false;
    }
});

