function szam() {
    for (var i = 0; i < 10; i++) {
        let szám = document.createElement("div")
        nagy.appendChild(szám)
        szám.innerText = i
        szám.classList.add("sorban")
        szám.style.backgroundColor = `rgb(${255 - 25 * i}, ${255 - 25 * i}, ${255 - 25 * i}`
    }

}


function faktoriális(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * faktoriális(n - 1);
    }
}

window.onload = () => {
    console.log("betöltődött")
    for (var sor = 0; sor < 10; sor++) {
        let s = document.createElement("div")
        s.classList.add("sor")
        pascal.appendChild(s)
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            let o = document.createElement("div")
            o.classList.add("elem")
            s.appendChild(o)
            o.innerText = faktoriális(sor)/(faktoriális(oszlop)*faktoriális(sor-oszlop))
        }
    }
}