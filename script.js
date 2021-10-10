console.log('script connected')

function changeBg () {
     // Array of Images
     var backgroundImg=["./gt1.jpg","./gt2.jpeg","./gt3.jpg","./gt4.jpg"]

     setInterval(changeImage, 5000);
     function changeImage() {   
     	var i = Math.floor((Math.random() * 3));

     	document.body.style.backgroundImage = "linear-gradient(to right, rgba(55,59,68, 0.4), rgba(66,134,244, 0.4))," + "url('"+backgroundImg[i]+"')";

     }
 }

 changeBg();

 $('.music-controls i').click(() => {
 	$('.music-controls i').toggleClass('fa-music fa-volume-mute');
 })

 var x = document.createElement("AUDIO");
 x.src = './theme.mp3'
 x.loop = true
//error loop pause play

$('.music-controls i').click(() => {
	if (x.paused) {
		x.play();
	}
	else {
		x.pause();
	}
})

const startButton = document.getElementById('start-btn');

var timeLeft = 60;
var elem = document.getElementById('timer');

$('.start-btn').click(() => {
	var timerId = setInterval(countdown, 1000);
})

function countdown() {
	if (timeLeft == 0) {
		clearTimeout(timerId);
	} else {
		elem.innerHTML = timeLeft + ' seconds';
		timeLeft--;
	}
}

//pre start alerts
var loopAlerts = document.getElementById('loopAlerts');

var res = Array.from(loopAlerts.childNodes).filter(function(v, i) {
	return i % 2 !== 0;
});

var alertElements = [];
alertElements.push(res);

var index = 1;

var btns = document.querySelectorAll('.alert-info button');

btns.forEach(btn => {
		btn.addEventListener('click',() => {
			if (index >= 5) {		
				$('.alert-info').css("display","none");
			}
		// $('.alert').style.display = "none";
		var element = alertElements[0][index]
		if (index > 0) {
			$('.alert-info').css("display","none")
		}
		showNextIndex(element,index);
		index = index + 1;
	})
})	


function showNextIndex(elem) {
	if (index >= 5) {
		return;
	}
	elem.style.display = "block";
}

const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons')
const welcomeTextElement = document.getElementById('welcomeText')

let shuffleQuestions,currentQuestionIndex;

startButton.addEventListener('click',startGame)

nextButton.addEventListener('click',() => {
	$('.alert').css("display","none");
	currentQuestionIndex++;
	setNextQuestion();
})

$('.close').click(() => {
	$('.alert').css("display","none");
})

function startGame() {
	startButton.classList.add('hide');
	welcomeTextElement.classList.add('hide');
	questionContainerElement.classList.remove('hide');
	shuffleQuestions = questions.sort(() => Math.random() - .5);
	currentQuestionIndex = 0;
	setNextQuestion();
}
function setNextQuestion(){
	resetState();
	showQuestion(shuffleQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
	questionElement.innerText = question.question; 
	question.answers.forEach(answer => {
		const button = document.createElement('button');
		button.innerText = answer.text
		button.classList.add('btn');

		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click',selectAnswer);
		answerButtonElement.appendChild(button);
	})
}

function selectAnswer(e) {
	$('.alert').css("display","none");
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	if (correct) {
		var el = parseInt($('#score').text());
		$('#score').text(el+20);
		$('.alert-success').css("display","block");
	}
	else if (!correct) {
		$('.alert-error').css("display","block");
	}
	Array.from(answerButtonElement.children).forEach(button => {
		setStatusClass(button,button.dataset.correct);
	})
	if (shuffleQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');
	}
	else {
		startButton.innerText = 'Restart';
		startButton.classList.remove('hide');
		$("#money-falling").show().delay(1000).fadeOut();
		$('#score').text(0);
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element)
	if(correct){
		element.classList.add('correct')
	} else {
		element.classList.add('wrong')
	}
}
function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}

function resetState() {
	nextButton.classList.add('hide');
	while (answerButtonElement.firstChild) {
		answerButtonElement.removeChild(answerButtonElement.firstChild)
	}
}

localStorage = window.localStorage;
var questionsSt = JSON.parse(localStorage.getItem('questions'));


const questions = [
{
	question: "What is the value of pie",
	answers: [
	{ text: "22/7", correct: true },
	{ text: "0.3", correct: false },
	{ text: "45", correct: false },
	{ text: "All of these", correct: false },
	]
},
{
	question: "What is the current number of states in India?",
	answers: [
	{ text: "15", correct: false },
	{ text: "28", correct: false },
	{ text: "30", correct: false },
	{ text: "29", correct: true },
	]
},
{
	question: "What is 2 + 2",
	answers: [
	{ text: "4", correct: true },
	{ text: "22", correct: false },
	{ text: "5", correct: false },
	{ text: "3", correct: false },
	]
},
{
	question: "Where are the Alps located?",
	answers: [
	{ text: "USA", correct: false },
	{ text: "Europe", correct: true },
	{ text: "England", correct: false },
	{ text: "India", correct: false },
	]
}
]

if (questionsSt) {
	questionsSt.forEach(question => {
	questions.push(question);
})
}