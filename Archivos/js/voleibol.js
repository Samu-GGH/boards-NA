var localBox = document.getElementById("score-local");
var visitBox = document.getElementById("score-visit");
var puntosL = document.getElementById("puntos-l");
var puntosV = document.getElementById("puntos-v");
var puntosAcumL = parseInt(puntosL.innerHTML); puntosAcumV = parseInt(puntosV.innerHTML);

var setBox = document.getElementById("set-id");
var setInd = document.getElementById("set");
var setAcum = 1;
var setLocalEnd = document.querySelectorAll(".set-score-local");
var setVisitEnd = document.querySelectorAll(".set-score-visit")
for (var i = 0; i < 5; i++) {
	setLocalEnd[i] = document.querySelectorAll(".set-score-local")[i];
	setVisitEnd[i] = document.querySelectorAll(".set-score-visit")[i];
}

var cantidadTOs = document.querySelectorAll(".time-out");
var toLocal = [];
var toVisita = [];
for (var i = 0; i < 3; i++) {
	toLocal[i] = document.querySelectorAll(".time-out")[i];
	toVisita[i] = document.querySelectorAll(".time-out")[i+3];
	toLocal[i].addEventListener("change",(e)=>{if (e.target.checked == false){tOut.play()}})
	toVisita[i].addEventListener("change",(e)=>{if (e.target.checked == false){tOut.play()}})
}

var code, x=0, y=0;

var chicharra = new Audio();
chicharra.src = "sonidos/chicharra_sound.mp3";

var endTo = new Audio();
endTo.src = "sonidos/end To.mp3";

var intermedio = new Audio();
intermedio.src = "sonidos/intermedio.mp3";

var tOut = new Audio();
tOut.src = "sonidos/TO.mp3";

const sumarPts = (puntosAcumulados,team)=>{
	puntosAcumulados += 1;
	if (puntosAcumulados<=9) {team.innerHTML = '0' + puntosAcumulados;}
	else if (puntosAcumulados>9) {team.innerHTML = '' + puntosAcumulados;}
	return 0
}

const restarPts = (puntosAcumulados,team)=>{
	puntosAcumulados -= 1;
	if (puntosAcumulados<=9) {team.innerHTML = '0' + puntosAcumulados;}
	else if (puntosAcumulados>9) {team.innerHTML = '' + puntosAcumulados;}
	return 0
}

const aumentarSet = ()=>{
	setAcum += 1;
	setInd.innerHTML = setAcum;
	setLocalEnd[setAcum-2].innerHTML = puntosL.innerHTML;
	setVisitEnd[setAcum-2].innerHTML = puntosV.innerHTML;
	puntosL.innerHTML = '00'; puntosV.innerHTML = '00';	
	puntosAcumL = 0; puntosAcumV = 0;
	if (setAcum>5) {
		setInd.innerHTML = "1";
		setAcum = 1;
	}
}

const disminuirSet = ()=>{
	setAcum -= 1;
	if (setAcum < 1) {
		setAcum = 5;
		setInd.innerHTML = setAcum;
	}
	setInd.innerHTML = setAcum;
	puntosL.innerHTML = setLocalEnd[setAcum-1].innerHTML;
	puntosV.innerHTML = setVisitEnd[setAcum-1].innerHTML;
	setLocalEnd[setAcum-1].innerHTML = '';
	setVisitEnd[setAcum-1].innerHTML = '';
	puntosAcumL = parseInt(puntosL.innerHTML); puntosAcumV = parseInt(puntosV.innerHTML);
}

localBox.addEventListener("click", ()=>{
	sumarPts(puntosAcumL,puntosL);
	puntosAcumL += 1;
});

visitBox.addEventListener("click", ()=>{
	sumarPts(puntosAcumV,puntosV);
	puntosAcumV += 1;
});

setBox.addEventListener("click", ()=>{aumentarSet()});


document.addEventListener("keydown",(e)=>{
	code = e.which;
	if (code == 81) {
		sumarPts(puntosAcumL,puntosL);
		puntosAcumL += 1;
	}
	if (code == 87) {
		restarPts(puntosAcumL,puntosL);
		puntosAcumL -= 1;
		if (puntosAcumL < 0) {
			puntosAcumL = 0;
			puntosL.innerHTML = '0' + puntosAcumL
		}
	}

	if (code == 80) {
		sumarPts(puntosAcumV,puntosV);
		puntosAcumV += 1;
	}
	if (code == 79) {
		restarPts(puntosAcumV,puntosV);
		puntosAcumV -= 1;
		if (puntosAcumV < 0) {
			puntosAcumV = 0;
			puntosV.innerHTML = '0' + puntosAcumV
		}
	}

	if (code == 13){aumentarSet();}
	if (code == 8){disminuirSet();}

	if (code == 32) {endTo.play();}

	if (code == 17) {chicharra.play();}

	if (code == 69) {
		toLocal[x].checked = false; 
		tOut.play()
		x++;
		if (x>2) {
			x=2;
		}
	}
	if (code == 82) {
		toLocal[x].checked = true; 
		x--;
		if (x<0) {
			x=0;
		}
	}
	if (code == 73) {
		toVisita[y].checked = false; 
		tOut.play()
		y++;
		if (y>2) {
			y=2;
		}
	}
	if (code == 85) {
		toVisita[y].checked = true; 
		y--;
		if (y<0) {
			y=0;
		}
	}
	if (code == 70) {
		for (var j = 0; j < 3; j++) {
	toLocal[j].checked = toVisita[j].checked = true;
		}
		x = y = 0;
	}
})

function onKeyDownHandler(event) {

    var codigo = event.which || event.keyCode;

    console.log("Presionada: " + codigo);
     
    if(codigo === 13){
      console.log("Tecla ENTER");
    }

    if(codigo >= 65 && codigo <= 90){
      console.log(String.fromCharCode(codigo));
    }

    //<input onkeydown="onKeyDownHandler(event);"/>
}