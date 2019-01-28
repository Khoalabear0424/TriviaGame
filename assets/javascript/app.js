var gameData = [
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
    {
        question: "What is blah blh blah",
        answers: [
            {
                A: "NFD:OSN",
                state: false
            },
            {
                A: "LFDN:SO",
                state: false
            },
            {
                A: "FOINDSO:DF",
                state: false
            },
            {
                A: "FPIJDS",
                state: true
            }
        ]
    },
]

var time = 0;
var timerState = true;
var startButtState = true;
var randomNum = 0;
var $question = $('#question');
var $choices = $('.choices');

//-----------Timer Countdown----------//
function timerCountdown() {
    if (time > 0) {
        time--
    }
    $('#timer').text(time);
}

//-----------Check Answer-------------//
function checkAnswer() {
    var state = ($(this).attr('state') == 'true');
    if (state = true) {
        alert("correct!");
    } else {
        alert("incorrect!");
    }

}

//---------------Start Button-----------------//
$('#start').on('click', function () {
    //----------Timer Starts-----------//
    if (startButtState == true) {
        time = 20;
        setInterval(timerCountdown, 1000);
        startButtState = false;

        var randomNum = Math.floor(Math.random() * 11);
        $question.text(gameData[randomNum].question);
        for (var i = 0; i < 4; i++) {
            $choices.eq(i).text(gameData[randomNum].answers[i].A);
            $choices.eq(i).attr('state', gameData[randomNum].answers[i].state);
            $choices.eq(i).on('click', checkAnswer);
        }



    } else {
        return false;
    }
});



