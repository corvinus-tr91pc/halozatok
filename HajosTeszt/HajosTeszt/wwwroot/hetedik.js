var sorszam;
var kérdés;

function szinez() {
    document.getElementById("válasz1").addEventListener('click', event => {
        var gomb = document.getElementById("válasz1")
        if (kérdés.correctAnswer == 1) {
            gomb.style.backgroundColor = "green";
        }
        else {
            gomb.style.backgroundColor = "red"
        }
    });

    document.getElementById("válasz2").addEventListener('click', event => {
        var gomb = document.getElementById("válasz2")
        if (kérdés.correctAnswer == 2) {
            gomb.style.backgroundColor = "green";
        }
        else {
            gomb.style.backgroundColor = "red"
        }
    });

    document.getElementById("válasz3").addEventListener('click', event => {
        var gomb = document.getElementById("válasz3")
        if (kérdés.correctAnswer == 3) {
            gomb.style.backgroundColor = "green";
        }
        else {
            gomb.style.backgroundColor = "red"
        }
    });

}

function visszaszinez() {
    document.getElementById("válasz1").style.backgroundColor = "lavenderblush"
    document.getElementById("válasz2").style.backgroundColor = "lavenderblush"
    document.getElementById("válasz3").style.backgroundColor = "lavenderblush"
}






fetch('/questions/1')
    .then(response => response.json())
    .then(data => kérdésMegjelenítés(data)
    );

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    kérdés = kérdés;
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

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                sorszam = id;
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));

}

window.onload = () => {
    kérdésBetöltés(1)

    document.getElementById("gomb_előre").addEventListener('click', event => {
        visszaszinez();
        sorszam++;
        kérdésBetöltés(sorszam);
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