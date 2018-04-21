var puzzles = new Array();
puzzles[0] = "Dead Kennedys";
puzzles[1] = "The Adolescents";
puzzles[2] = "The Sex Pistols";
puzzles[3] = "The Dead Boys";
puzzles[4] = "Agent Orange";
puzzles[5] = "Ramones";

var div_used;
var div_puzzle;
var div_available;

var numStrikes = 0;
var puzzle;

var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function initializeGame(){
	div_used = document.getElementById('used');
	div_puzzle = document.getElementById('puzzle');
	div_available = document.getElementById('available');
	
	setupButtons();
}

function setupButtons(){
	for (var i = 0; i < alphabet.length; i++){
		var l = document.createElement('div');
		l.innerHTML = alphabet[i];
		l.className = 'btnLetter';
		l.onclick = function(){selectLetter(this);}
		div_available.appendChild(l);
	}
}

function selectLetter(selected){
	selected.style.display = 'none';
	
	var l = document.createElement('div');
	l.innerHTML = selected.innerHTML;
	l.className = 'lblUsed';
	div_used.appendChild(l);
	
	var letter = selected.innerHTML;
	var current = '';
	var correct = false;
	for(var i = 0; i < puzzle.length; i++){
		if (puzzle[i] == letter){
			document.getElementById('letter_' + i).innerHTML = letter;
			correct = true;
		} 
		if (document.getElementById('letter_' + i).innerHTML == '') current += ' ';
		else current += document.getElementById('letter_' + i).innerHTML;
	}
	
	if(current == puzzle) alert('You Won!');
	
	if(correct){
		document.getElementById('sndCorrect').currentTime = 0;
		document.getElementById('sndCorrect').play();
		l.style.backgroundColor = 'green';
	}
	else{
		document.getElementById('sndError').currentTime = 0;
		document.getElementById('sndError').play();
		l.style.backgroundColor = 'red';
		
		numStrikes++;
		document.getElementById('man').src = 'images/stick_' + numStrikes + '.png';
		if(numStrikes == 6) alert('You Lose. The Correct answer was: ' + puzzle);
	}
	
	if(current == puzzle){
		alert('You Won');
		newPuzzle();
		div_used.innerHTML = '';
		
		div_available.innerHTML = '';
		setupButtons();
	}

	
}

function startGame(){
	document.getElementById('splashScreen').style.display = 'none';
	document.getElementById('man').src = 'images/stick_0.png';
	newPuzzle();
}

function newPuzzle(){
	var puzzleID = Math.floor(Math.random() * puzzles.length);
	puzzle = puzzles[puzzleID].toUpperCase();
	//alert(puzzle);
	
	div_puzzle.innerHTML = '';
	
	for (var i = 0; i < puzzle.length; i++){
		var box = document.createElement('div');
		box.id = 'letter_' + i;
		
		if (puzzle[i] == ' '){
			box.className = 'box';
			//div_puzzle.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;';
		}
		else{
			box.className = 'box letter';
			//div_puzzle.innerHTML += ' _ ';
		}
		
		//box.innerHTML = puzzle[i];
		
		div_puzzle.appendChild(box);
	}
}
function hint(word){
	if (word == 'DEAD KENNEDYS'){
		alert('This is famous for their song Holiday in Cambodia');
	}
	else if(word == 'THE ADOLESCENTS'){
		alert('This band is famous for their blue self-titled album');
	}
	else if(word == 'THE SEX PISTOLS'){
		alert('This band is responsible for starting the punk movement in the UK');
	}
	else if(word == 'THE DEAD BOYS'){
		alert('This band was known to be one of the most violent punk bands in the late 70s');
	}
	else if(word == 'AGENT ORANGE'){
		alert('This band is named after herbicide and defoliant chemical used in Vietnam');
	}
	else if(word == 'RAMONES'){
		alert('This band is known for their matching leather jackets');
	}
}

