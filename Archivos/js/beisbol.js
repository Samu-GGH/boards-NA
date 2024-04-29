var localBox = document.getElementById("score-local");
var visitBox = document.getElementById("score-visit");

var carrerasInnL = document.querySelectorAll(".carrera-l");
var carrerasInnV = document.querySelectorAll(".carrera-v");

var carrerasTotalesL = document.getElementById("carreras-l");
var carrerasTotalesV = document.getElementById("carreras-v");

var hitsL = document.getElementById("hits-l");
var hitsV = document.getElementById("hits-v");
var hitsAcumL = parseInt(hitsL.innerHTML), hitsAcumV = parseInt(hitsV.innerHTML);

var errorL = document.getElementById("errores-l");
var errorV = document.getElementById("errores-v");
var errorAcumL = parseInt(hitsL.innerHTML), errorAcumV = parseInt(hitsV.innerHTML);

var innBox = document.getElementById("inn-id");
var innInd = document.getElementById("inn-num");
var innSwitch = [document.querySelectorAll(".inn-arrow")[0],document.querySelectorAll(".inn-arrow")[1]];
var innAcum = 1;
var innAlto = true;

var teamName = document.querySelectorAll(".team-name");

var equipo = prompt("Primer equipo al bate");

if (equipo == 'l' || equipo == 'L') {
	teamName[0].innerHTML = `Local`;
	teamName[1].innerHTML = `Visitante`;
} else if (equipo == 'v' || equipo == 'V') {
	teamName[1].innerHTML = `Local`;
	teamName[0].innerHTML = `Visitante`;
}

var balls = [];
for (var i = 0; i < 3; i++) {
	balls[i] = document.querySelectorAll(".bola")[i];
}

var strikes = [];
var outs = [];
for (var j = 0; j < 2; j++) {
	strikes[j] = document.querySelectorAll(".strike")[j];
	outs[j] = document.querySelectorAll(".out")[j];
}

var code, x=0, y=0, z=0;

var chicharra = new Audio();
chicharra.src = "sonidos/chicharra_sound.mp3";

var arihorn1 = new Audio();
arihorn1.src = "sonidos/end To.mp3";

var intermedio = new Audio();
intermedio.src = "sonidos/intermedio.mp3";

var arihorn2 = new Audio();
arihorn2.src = "sonidos/TO.mp3";

var airhorn = new Audio('sonidos/Airhorn.mp3');

var carrerasAcumuladasLocal = 0; var carrerasAcumuladasVisit = 0;
var carrerasInnActualLocal = 0; var carrerasInnActualVisit = 0;
var inningact = 1;

const sumarPts = ()=>{
	if (innAlto == true) {
	carrerasInnActualLocal += 1;
	carrerasAcumuladasLocal += 1;
	carrerasInnL[innAcum-1].innerHTML = '' + carrerasInnActualLocal;
	carrerasTotalesL.innerHTML = '' + carrerasAcumuladasLocal;
	} else if (innAlto == false) {
	carrerasInnActualVisit += 1;
	carrerasAcumuladasVisit += 1;
	carrerasInnV[innAcum-1].innerHTML = '' + carrerasInnActualVisit;
	carrerasTotalesV.innerHTML = '' + carrerasAcumuladasVisit;	
	}
	return 0
}

const restarPts = (puntosAcumulados,team)=>{
	if (innAlto == true) {
	carrerasInnActualLocal -= 1;
	carrerasAcumuladasLocal -= 1;
	carrerasInnL[innAcum-1].innerHTML = '' + carrerasInnActualLocal;
	carrerasTotalesL.innerHTML = '' + carrerasAcumuladasLocal;
	} else if (innAlto == false) {
	carrerasInnActualVisit -= 1;
	carrerasAcumuladasVisit -= 1;
	carrerasInnV[innAcum-1].innerHTML = '' + carrerasInnActualVisit;
	carrerasTotalesV.innerHTML = '' + carrerasAcumuladasVisit;	
	}
	return 0
}

const sumarHits = ()=>{
	if (innAlto == true) {
		hitsAcumL += 1;
		hitsL.innerHTML = '' + hitsAcumL;
	} else if (innAlto == false) {
		hitsAcumV += 1;
		hitsV.innerHTML = '' + hitsAcumV;	
	}
	return 0
}

const restarHits = ()=>{
	if (innAlto == true) {
		hitsAcumL -= 1;
		if (hitsAcumL < 0) {
			hitsAcumL = 0;
		}
		hitsL.innerHTML = '' + hitsAcumL;
	} else if (innAlto == false) {
		hitsAcumV -= 1;
		if (hitsAcumV < 0) {
			hitsAcumV = 0;
		}
		hitsV.innerHTML = '' + hitsAcumV;	
	}
	return 0
}

const sumarErr = ()=>{
	if (innAlto == true) {
		errorAcumL += 1;
		errorL.innerHTML = '' + errorAcumL;
	} else if (innAlto == false) {
		errorAcumV += 1;
		errorV.innerHTML = '' + errorAcumV;	
	}
	return 0
}

const restarErr = ()=>{
	if (innAlto == true) {
		errorAcumL -= 1;
		if (errorAcumL < 0) {
			errorAcumL = 0;
		}
		errorL.innerHTML = '' + errorAcumL;
	} else if (innAlto == false) {
		errorAcumV -= 1;
		if (errorAcumV < 0) {
			errorAcumV = 0;
		}
		errorV.innerHTML = '' + errorAcumV;	
	}
	return 0
}

const aumentarInn = ()=>{
	if (innAlto == true) {
		innAlto = false;
		innSwitch[0].style.backgroundColor = "#000";
		innSwitch[1].style.backgroundColor = "#f00";

	} else if (innAlto == false) {
		innAcum += 1;
		innInd.innerHTML = innAcum;
		innAlto = true;
		innSwitch[1].style.backgroundColor = "#000";
		innSwitch[0].style.backgroundColor = "#f00";
	}
	if (innAcum>10) {
		innInd.innerHTML = "1";
		innAcum = 1;
	}	
	console.log("innAcum: " + innAcum)
}

innBox.addEventListener("click", ()=>{aumentarInn()});

document.addEventListener("keydown",(e)=>{
	code = e.which;
	if (code == 81) {
		if (inningact < innAcum) {
		carrerasInnActualLocal = 0;
		carrerasInnActualVisit = 0;
		inningact = innAcum;
	}
		sumarPts();
	}
	
	if (code == 87) {
		if (inningact < innAcum) {
		carrerasInnActualLocal = 0;
		carrerasInnActualVisit = 0;
		inningact = innAcum;
	}
		restarPts();
	}

	if (code == 84) {sumarHits();}
	if (code == 89) {restarHits();}

	if (code == 13){aumentarInn();}

	if (code == 79){sumarErr();}
	if (code == 80){restarErr();}


	if (code == 90) {
		balls[x].checked = true; 
		x++;
		if (x>2) {
			x=2;
		}
	}
	if (code == 77) {
		balls[x].checked = false; 
		x--;
		if (x<0) {
			x=0;
		}
	}

	if (code == 88) {
		strikes[y].checked = true; 
		y++;
		if (y>1) {
			y=1;
		}
	}
	if (code == 78) {
		strikes[y].checked = false; 
		y--;
		if (y<0) {
			y=0;
		}
	}

	if (code == 67) {
		outs[z].checked = true; 
		z++;
		if (z>1) {
			z=1;
		}
	}
	if (code == 66) {
		outs[z].checked = false; 
		z--;
		if (z<0) {
			z=0;
		}
	}

	if (code == 32) {intermedio.play();}
	if (code == 17) {airhorn.play();}
	
	if (code == 27) {
			balls[0].checked = balls[1].checked = balls[2].checked = false;
			strikes[0].checked = strikes[1].checked = false;
			outs[0].checked = outs[1].checked = false;
			x = y = z = 0;
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