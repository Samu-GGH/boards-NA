var localBox = document.getElementById("score-local");
var visitBox = document.getElementById("score-visit");
var golesL = document.getElementById("goles-l");
var golesV = document.getElementById("goles-v");
var golesAcumL = parseInt(golesL.innerHTML), golesAcumV = parseInt(golesV.innerHTML);

var timerBox = document.getElementById("timer");
var timerClockMin = document.getElementById("tiempo-min");
var timerDiv = document.getElementById("divisor");
var timerClockSeg = document.getElementById("tiempo-seg");
var timerValue = [parseInt(timerClockMin.innerHTML),parseInt(timerClockSeg.innerHTML)];
var temporizador, stopClock = true, lastMinute = false;

var tExtraBox = document.getElementById("TE-container");
var tExtra = document.getElementById("tiempo-extra");

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

var airhorn = new Audio('sonidos/Airhorn.mp3');

const sumargoals = (golesAcumulados,team)=>{
	golesAcumulados += 1;
	team.innerHTML = '' + golesAcumulados;
	return 0
}

const restargoals = (golesAcumulados,team)=>{
	golesAcumulados -= 1;
	team.innerHTML = '' + golesAcumulados;
	return 0
}

const temporizadorCountDown = ()=>{
	if (timerValue[0] == 19 && timerValue[1] == 59 || timerValue[0] == 39 && timerValue[1] == 59) {
		timerBox.style.backgroundColor = "#fff"
		timerBox.style.color = "#222"
		lastMinute = true;
	}
	if (timerValue[1] == 59) {
			timerValue[0] += 1;
			timerValue[1] = -1;
		}
		timerValue[1] += 1;
		timerClockMin.innerHTML = timerValue[0];
		timerClockSeg.innerHTML = timerValue[1];
		if (timerValue[1] < 10) {
			timerClockSeg.innerHTML = '0' + timerValue[1];
		}
	}


const iniciarPararTemporizador = ()=>{
	if (stopClock == true) {
			temporizador = setInterval(temporizadorCountDown,1000);
			stopClock = false;
		} else if (stopClock == false) {
			clearInterval(temporizador);
			stopClock = true;
		}
}

const reiniciarTemporizador = ()=>{
	timerClockMin.innerHTML = '0';
	timerClockSeg.innerHTML = '00';
	timerDiv.innerHTML = ":";
	timerValue = [parseInt(timerClockMin.innerHTML),parseInt(timerClockSeg.innerHTML)];
	lastMinute = false;
	timerBox.style.backgroundColor = "#222"
	timerBox.style.color = "#fff"
}

const segundoTiempo = ()=>{
	timerClockMin.innerHTML = '20';
	timerClockSeg.innerHTML = '00';
	timerValue = [parseInt(timerClockMin.innerHTML),parseInt(timerClockSeg.innerHTML)];
	tExtraBox.classList.remove("show");
	tExtraBox.classList.add("hide");
	tExtra.innerHTML = '';
}

timerBox.addEventListener("click", ()=>{iniciarPararTemporizador();})

localBox.addEventListener("click", ()=>{
	sumargoals(golesAcumL,golesL);
	golesAcumL += 1;
});

visitBox.addEventListener("click", ()=>{
	sumargoals(golesAcumV,golesV);
	golesAcumV += 1;
});

document.addEventListener("keydown",(e)=>{
	code = e.which;
	if (code == 81) {
		sumargoals(golesAcumL,golesL);
		golesAcumL += 1;
	}
	if (code == 87) {
		restargoals(golesAcumL,golesL);
		golesAcumL -= 1;
		if (golesAcumL < 0) {
			golesAcumL = 0;
			golesL.innerHTML = '' + golesAcumL
		}
	}

	if (code == 80) {
		sumargoals(golesAcumV,golesV);
		golesAcumV += 1;
	}
	if (code == 79) {
		restargoals(golesAcumV,golesV);
		golesAcumV -= 1;
		if (golesAcumV < 0) {
			golesAcumV = 0;
			golesV.innerHTML = '' + golesAcumV
		}
	}

	if (code == 84){segundoTiempo();}

	if (code == 77){iniciarPararTemporizador();}
	if (code == 78){reiniciarTemporizador();}

	if (code == 32) {airhorn.play()}

	if (code == 17) {endTo.play();}

	if (code == 65) {
		toLocal[x].checked = false; 
		tOut.play()
		x++;
		if (x>2) {
			x=2;
		}
	}
	if (code == 83) {
		toLocal[x].checked = true; 
		x--;
		if (x<0) {
			x=0;
		}
	}
	if (code == 76) {
		toVisita[y].checked = false; 
		tOut.play()
		y++;
		if (y>2) {
			y=2;
		}
	}
	if (code == 75) {
		toVisita[y].checked = true; 
		y--;
		if (y<0) {
			y=0;
		}
	}
	if (code == 74) {
		for (var j = 0; j < 3; j++) {
	toLocal[j].checked = toVisita[j].checked = true;
		}
		x = y = 0;
	}

	if (code == 49) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+1'
	}
	if (code == 50) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+2'
	}
	if (code == 51) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+3'
	}
	if (code == 52) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+4'
	}
	if (code == 53) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+5'
	}
	if (code == 54) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+6'
	}
	if (code == 55) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+7'
	}
	if (code == 56) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+8'
	}
	if (code == 57) {
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+9'
	}
	if (code == 48) {
		tExtra.style.fontSize = '150px'
		tExtraBox.classList.add("show");
		tExtraBox.classList.remove("hide");
		tExtra.innerHTML = '+10'
	}
	if (code == 8) {
		tExtraBox.classList.remove("show");
		tExtraBox.classList.add("hide");
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
