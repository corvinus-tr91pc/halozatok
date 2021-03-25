var kérdések;
var sorszám;
var ksorszám;

function letöltésBefejezedődött(d) {
    console.log("Sikeres letöltés!")
    console.log(d)
    kérdések = d
    kérdésMegjelenítés(kérdések, 0)
}

function letöltés() {
    fetch("questions.json")
        .then(response => response.json())
        .then(data => letöltésBefejezedődött(data))
}

function szinez() {

}

function kérdésMegjelenítés(kérdés, szám) {
    var ide = document.getElementById("kérdés_szöveg")
    ksorszám = szám;
    ide.innerHTML = kérdés[szám].questionText
    document.getElementById("válasz1").innerHTML = kérdés[szám].answer1
    document.getElementById("válasz2").innerHTML = kérdés[szám].answer2
    document.getElementById("válasz3").innerHTML = kérdés[szám].answer3
    var válasz1 = document.getElementById("válasz1")
    var válasz2 = document.getElementById("válasz2")
    var válasz3 = document.getElementById("válasz3")
    sorszám = szám;

    document.getElementById("gomb_vissza").addEventListener('click', event => {
        document.getElementById("válasz1").style.backgroundColor = "lavenderblush"
        document.getElementById("válasz2").style.backgroundColor = "lavenderblush"
        document.getElementById("válasz3").style.backgroundColor = "lavenderblush"
        var k = sorszám - 1
        var kszám = k % 3;
        ksorszám = kszám;
        if (kszám == 0) {
            ide.innerHTML = kérdés[kszám].questionText
            válasz1.innerHTML = kérdés[kszám].answer1
            válasz2.innerHTML = kérdés[kszám].answer2
            válasz3.innerHTML = kérdés[kszám].answer3
        }
        if (kszám == 1) {
            ide.innerHTML = kérdés[kszám].questionText
            válasz1.innerHTML = kérdés[kszám].answer1
            válasz2.innerHTML = kérdés[kszám].answer2
            válasz3.innerHTML = kérdés[kszám].answer3
        }
        if (kszám == 2) {
            ide.innerHTML = kérdés[kszám].questionText
            válasz1.innerHTML = kérdés[kszám].answer1
            válasz2.innerHTML = kérdés[kszám].answer2
            válasz3.innerHTML = kérdés[kszám].answer3
        }
        if (sorszám < 0) {
            sorszám = 0;
        }
        else {
            sorszám--;
        }
    });

    document.getElementById("gomb_előre").addEventListener('click', event => {
        document.getElementById("válasz1").style.backgroundColor = "lavenderblush"
        document.getElementById("válasz2").style.backgroundColor = "lavenderblush"
        document.getElementById("válasz3").style.backgroundColor = "lavenderblush"
        var k = sorszám + 1
        var kszám = k % 3;
        ksorszám = kszám;
        if (kszám == 0) {
            ide.innerHTML = kérdés[kszám].questionText
            válasz1.innerHTML = kérdés[kszám].answer1
            válasz2.innerHTML = kérdés[kszám].answer2
            válasz3.innerHTML = kérdés[kszám].answer3
            
        }
        if (kszám == 1) {
            ide.innerHTML = kérdés[kszám].questionText
            válasz1.innerHTML = kérdés[kszám].answer1
            válasz2.innerHTML = kérdés[kszám].answer2
            válasz3.innerHTML = kérdés[kszám].answer3
        }
        if (kszám == 2) {
            ide.innerHTML = kérdés[kszám].questionText
            válasz1.innerHTML = kérdés[kszám].answer1
            válasz2.innerHTML = kérdés[kszám].answer2
            válasz3.innerHTML = kérdés[kszám].answer3
        }
        sorszám++;
    });

    document.getElementById("válasz1").addEventListener('click', event => {
        var gomb = document.getElementById("válasz1")
        if (kérdés[ksorszám].correctAnswer == 1) {
            gomb.style.backgroundColor = "green";
        }
        else {
            gomb.style.backgroundColor = "red"
        }
    });

    document.getElementById("válasz2").addEventListener('click', event => {
        var gomb = document.getElementById("válasz2")
        if (kérdés[ksorszám].correctAnswer == 2) {
            gomb.style.backgroundColor = "green";
        }
        else {
            gomb.style.backgroundColor = "red"
        }
    });

    document.getElementById("válasz3").addEventListener('click', event => {
        var gomb = document.getElementById("válasz3")
        if (kérdés[ksorszám].correctAnswer == 3) {
            gomb.style.backgroundColor = "green";
        }
        else {
            gomb.style.backgroundColor = "red"
        }
    });
    
}
    
window.onload = () => {
    letöltés()
    
}

