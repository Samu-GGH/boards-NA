var localBox = document.getElementById("score-local");
var visitBox = document.getElementById("score-visit");
var puntosL = document.getElementById("puntos-l");
var puntosV = document.getElementById("puntos-v");
var puntosAcumL = parseInt(puntosL.innerHTML), puntosAcumV = parseInt(puntosV.innerHTML);

var timerBox = document.getElementById("timer");
var timerClockMin = document.getElementById("tiempo-min");
var timerDiv = document.getElementById("divisor");
var timerClockSeg = document.getElementById("tiempo-seg");
var timerValue = [parseInt(timerClockMin.innerHTML),parseInt(timerClockSeg.innerHTML),0];
var temporizador, stopClock = true, lastMinute = false;

var shotClockBox = document.getElementById("shot-clock");
var shotClockSeg = document.getElementById("shot-seg");
var shotClockMs = document.getElementById("shot-ms");
var timerShotValue = [parseInt(shotClockSeg.innerHTML),parseInt(shotClockMs.innerHTML)];
var shottemporizador, stopShotClock = true;

var localFoulBox = document.getElementById("fouls-local");
var visitFoulBox = document.getElementById("fouls-visit");
var faltasL = document.getElementById("faltas-l");
var faltasV = document.getElementById("faltas-v");
var faltasAcumL = parseInt(faltasL.innerHTML), faltasAcumV = parseInt(faltasV.innerHTML);

var periodBox = document.getElementById("period-id");
var periodoInd = document.getElementById("periodo");
var periodoAcum = 1;

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

const sumarPtsx2 = (puntosAcumulados,team)=>{
	puntosAcumulados += 2;
	if (puntosAcumulados<=9) {team.innerHTML = '0' + puntosAcumulados;}
	else if (puntosAcumulados>9) {team.innerHTML = '' + puntosAcumulados;}
	return 0
}

const sumarPtsx3 = (puntosAcumulados,team)=>{
	puntosAcumulados += 3;
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

const temporizadorCountDown = ()=>{
	if (lastMinute == false) {
		if (timerValue[0] == 0) {
		timerValue[0] = 59;
		timerValue[1] = 10;
		timerValue[2] = 0;
		timerClockMin.innerHTML = timerValue[0];
		timerClockSeg.innerHTML = timerValue[1];
		timerDiv.innerHTML = ".";
		lastMinute = true;
	}
		if (timerValue[2] == 0) {
			if (timerValue[1] == 0) {
				timerValue[0] -= 1;
				timerValue[1] = 60;
			}
			timerValue[1] -= 1;
			timerValue[2] = 10;
		}
		timerValue[2] -= 1;
		timerClockMin.innerHTML = timerValue[0];
		timerClockSeg.innerHTML = timerValue[1];
		if (timerValue[1] < 10) {
			timerClockSeg.innerHTML = "0"+timerValue[1];
		}
	} else if (lastMinute == true) {
		if (timerValue[1] == 0) {
			timerValue[0] -=1;
			timerValue[1] = 10;
		}
		timerValue[1] -= 1;
		timerClockMin.innerHTML = timerValue[0];
		timerClockSeg.innerHTML = timerValue[1];
		if (timerValue[0] == 0 && timerValue[1] == 0) {
			clearInterval(temporizador);
			chicharra.play();
			timerBox.style.border = "6px solid #ff0000";
			timerBox.style.backgroundColor = "#b10005";
			timerBox.style.border = "6px solid #ff0000";
			timerBox.style.color = "#ff0000";
		}
		if (timerValue[0] < 0) {
			clearInterval(temporizador);
			reiniciarTemporizador();
		}
	}
}

const iniciarPararTemporizador = ()=>{
	if (stopClock == true) {
			temporizador = setInterval(temporizadorCountDown,100);
			stopClock = false;
		} else if (stopClock == false) {
			clearInterval(temporizador);
			stopClock = true;
		}
}

const reiniciarTemporizador = ()=>{
		timerClockMin.innerHTML = '10';
		timerClockSeg.innerHTML = '00';
		timerDiv.innerHTML = ":";
		timerValue = [parseInt(timerClockMin.innerHTML),parseInt(timerClockSeg.innerHTML),0];
		lastMinute = false;
		timerBox.style.border = "3px solid #fff";
		timerBox.style.backgroundColor = "#222";
		timerBox.style.color = "#ff0000";
}

const shotClockCountDown = ()=>{
	if (timerShotValue[1] == 0) {
		timerShotValue[0] -= 1;
		timerShotValue[1] = 10;
	}
	timerShotValue[1] -= 1;
	shotClockSeg.innerHTML = timerShotValue[0];
	shotClockMs.innerHTML = timerShotValue[1];
	if (timerShotValue[0] == 0 && timerShotValue[1] == 0) {
		clearInterval(shottemporizador);
		chicharra.play();
		shotClockBox.style.border = "6px solid #ff0000";
		shotClockBox.style.backgroundColor = "#b10005";
		shotClockBox.style.color = "#ff0000";
	}
}

const iniciarPararShotClock = ()=>{
	if (stopShotClock == true) {
		shottemporizador = setInterval(shotClockCountDown,100);
		stopShotClock = false;
	} else if (stopShotClock == false) {
		clearInterval(shottemporizador);
		stopShotClock = true;
	}
}

const reiniciarShotClock = ()=>{
		shotClockSeg.innerHTML = '24';
		shotClockMs.innerHTML = '0';
		timerShotValue = [parseInt(shotClockSeg.innerHTML),parseInt(shotClockMs.innerHTML)];
		shotClockBox.style.border = "3px solid #fff";
		shotClockBox.style.backgroundColor = "#222";
		shotClockBox.style.color = "#ff0000";
}

const aumentarPeriodo = ()=>{
	periodoAcum += 1;
	periodoInd.innerHTML = periodoAcum
	if (periodoAcum>4) {
		periodoInd.innerHTML = "1";
		periodoAcum = 1;
	}
}

timerBox.addEventListener("click", ()=>{iniciarPararTemporizador();})

localBox.addEventListener("click", ()=>{
	sumarPts(puntosAcumL,puntosL);
	puntosAcumL += 1;
});

visitBox.addEventListener("click", ()=>{
	sumarPts(puntosAcumV,puntosV);
	puntosAcumV += 1;
});

periodBox.addEventListener("click", ()=>{aumentarPeriodo()});

localFoulBox.addEventListener("click", ()=>{
	faltasAcumL += 1;
	faltasL.innerHTML = faltasAcumL;
});

visitFoulBox.addEventListener("click", ()=>{
	faltasAcumV += 1;
	faltasV.innerHTML = faltasAcumV;
});

shotClockBox.addEventListener("click", ()=>{iniciarPararShotClock();})

document.addEventListener("keydown",(e)=>{
	code = e.which;
	if (code == 81) {
		sumarPts(puntosAcumL,puntosL);
		puntosAcumL += 1;
	}
	if (code == 87) {
		sumarPtsx2(puntosAcumL,puntosL);
		puntosAcumL += 2;
	}
	if (code == 69) {
		sumarPtsx3(puntosAcumL,puntosL);
		puntosAcumL += 3;
	}
	if (code == 82) {
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
		sumarPtsx2(puntosAcumV,puntosV);
		puntosAcumV += 2;
	}
	if (code == 73) {
		sumarPtsx3(puntosAcumV,puntosV);
		puntosAcumV += 3;
	}
	if (code == 85) {
		restarPts(puntosAcumV,puntosV);
		puntosAcumV -= 1;
		if (puntosAcumV < 0) {
			puntosAcumV = 0;
			puntosV.innerHTML = '0' + puntosAcumV
		}
	}

	if (code == 13){aumentarPeriodo();}

	if (code == 77){iniciarPararTemporizador();}
	if (code == 78){reiniciarTemporizador();}

	if (code == 65){ faltasAcumL += 1;
	faltasL.innerHTML = faltasAcumL;}
	if (code == 83){ faltasAcumL -= 1;
		if (faltasAcumL<0) {faltasAcumL = 0;}
		faltasL.innerHTML = faltasAcumL;
	}
	if (code == 68){ faltasAcumL = 0;
	faltasL.innerHTML = faltasAcumL;}

	if (code == 76){ faltasAcumV += 1;
	faltasV.innerHTML = faltasAcumV;}
	if (code == 75){ faltasAcumV -= 1;
	if (faltasAcumV<0) {faltasAcumV = 0;}
	faltasV.innerHTML = faltasAcumV;
	}
	if (code == 74){ faltasAcumV = 0;
	faltasV.innerHTML = faltasAcumV;}

	if (code == 90){iniciarPararShotClock();}
	if (code == 88){reiniciarShotClock();}

	if (code == 32) {intermedio.play();}
	if (code == 17) {endTo.play();}


	if (code == 49) {
		toLocal[x].checked = false; 
		tOut.play()
		x++;
		if (x>2) {
			x=2;
		}
	}
	if (code == 50) {
		toLocal[x].checked = true; 
		x--;
		if (x<0) {
			x=0;
		}
	}
	if (code == 48) {
		toVisita[y].checked = false; 
		tOut.play()
		y++;
		if (y>2) {
			y=2;
		}
	}
	if (code == 57) {
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