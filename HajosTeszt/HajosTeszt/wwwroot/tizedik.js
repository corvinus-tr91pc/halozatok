var sorszam;
var kérdés;

var timeoutHandler;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion = 1;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában

myStorage = window.localStorage;

function szinez() {
    document.getElementById("válasz1").addEventListener('click', event => {
        var gomb = document.getElementById("válasz1")
        gomb.style.pointerEvents = "none";
        document.getElementById("válasz2").style.pointerEvents = "none";
        document.getElementById("válasz3").style.pointerEvents = "none";
        timeoutHandler = setTimeout(előre, 3000);
        if (kérdés.correctAnswer == 1) {
            gomb.style.backgroundColor = "green";
            hotList[displayedQuestion].goodAnswers++;
            kérdésCsere();
        }
        else {
            gomb.style.backgroundColor = "red"
            hotList[displayedQuestion].goodAnswers = 0;
        }
        localStorage.setItem('hotList', hotList);
    });

    document.getElementById("válasz2").addEventListener('click', event => {
        var gomb = document.getElementById("válasz2")
        gomb.style.pointerEvents = "none";
        document.getElementById("válasz3").style.pointerEvents = "none";
        document.getElementById("válasz1").style.pointerEvents = "none";
        timeoutHandler = setTimeout(előre, 3000);
        if (kérdés.correctAnswer == 2) {
            gomb.style.backgroundColor = "green";
            hotList[displayedQuestion].goodAnswers++;
            kérdésCsere();
        }
        else {
            gomb.style.backgroundColor = "red"
            hotList[displayedQuestion].goodAnswers = 0;
        }
        localStorage.setItem('hotList', hotList);
    });

    document.getElementById("válasz3").addEventListener('click', event => {
        var gomb = document.getElementById("válasz3")
        gomb.style.pointerEvents = "none";
        document.getElementById("válasz2").style.pointerEvents = "none";
        document.getElementById("válasz1").style.pointerEvents = "none";
        timeoutHandler = setTimeout(előre, 3000);
        if (kérdés.correctAnswer == 3) {
            gomb.style.backgroundColor = "green";
            hotList[displayedQuestion].goodAnswers++;
            kérdésCsere();
        }
        else {
            gomb.style.backgroundColor = "red"
            hotList[displayedQuestion].goodAnswers = 0;
        }
        localStorage.setItem('hotList', hotList);
    });


    function kérdésCsere() {
        if (hotList[displayedQuestion].goodAnswers == 3) {
            hotList[displayedQuestion] = nextQuestion;
            nextQuestion++;
        }
    }
}

function visszaszinez() {
    document.getElementById("válasz1").style.backgroundColor = "lavenderblush"
    document.getElementById("válasz2").style.backgroundColor = "lavenderblush"
    document.getElementById("válasz3").style.backgroundColor = "lavenderblush"
}






function kérdésMegjelenítés() {
    kérdés = hotList[displayedQuestion].question;  
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3

    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép").classList.add("rejtett")
    }




    szinez();

}

function kérdésBetöltés(id, destination) {
    fetch(`/questions/${id}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${id}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

window.onload = () => {
    init()
    kérdésBetöltés(0, hotList)

    document.getElementById("gomb_előre").addEventListener('click', event => {
        előre();
    });



    document.getElementById("gomb_vissza").addEventListener('click', event => {
        visszaszinez();
        if (sorszam > 1) {
            sorszam = sorszam - 1;
            kérdésBetöltés(sorszam);
        }
        else {
            kérdésBetöltés(1);
        }

    });
}

function előre() {
    if (displayedQuestion > hotList.length) {
        console.log("Véget ért a kérdéslista!");
    }
    else {
        clearTimeout(timeoutHandler)
        visszaszinez();
        displayedQuestion++;
        if (displayedQuestion == questionsInHotList)
            displayedQuestion = 0;
        kérdésMegjelenítés();
        document.getElementById("válasz1").style.pointerEvents = "auto";
        document.getElementById("válasz2").style.pointerEvents = "auto";
        document.getElementById("válasz3").style.pointerEvents = "auto";
    }

}
